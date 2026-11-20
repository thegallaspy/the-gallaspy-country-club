import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GET as membership } from "@/app/api/mobile/membership/route";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ORIGIN = "capacitor://localhost";
const UUID =
  /^[a-f\d]{8}-[a-f\d]{4}-[1-8][a-f\d]{3}-[89ab][a-f\d]{3}-[a-f\d]{12}$/i;

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Cache-Control": "private, no-store",
      Vary: "Origin",
    },
  });
}

export function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      Vary: "Origin",
    },
  });
}

export async function GET(request: NextRequest) {
  try {
    const authorization = request.headers.get("authorization") ?? "";

    if (!/^Bearer\s+\S+$/i.test(authorization)) {
      return respond(
        { success: false, error: "Authentication required." },
        401,
      );
    }

    const token = authorization.replace(/^Bearer\s+/i, "");

    if (token.length > 4096) {
      return respond(
        { success: false, error: "Authentication required." },
        401,
      );
    }

    const targetId = request.nextUrl.searchParams.get("user_id");
    const search = request.nextUrl.searchParams.get("q");
    const username = search?.trim().replace(/^@/, "") ?? "";

    if (search !== null ? (targetId !== null || !/^[A-Za-z0-9_.]{3,20}$/.test(username)) : (!targetId || !UUID.test(targetId))) {
      return respond(
        { success: false, error: "Invalid golfer." },
        400,
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !anon || !secret) {
      return respond(
        { success: false, error: "Community unavailable." },
        503,
      );
    }

    const options = {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    };

    const auth = createClient(url, anon, options);

    const { data: authData, error: authError } =
      await auth.auth.getUser(token);

    if (authError || !authData.user) {
      return respond(
        { success: false, error: "Authentication required." },
        401,
      );
    }

    const viewerId = authData.user.id;
    const admin = createClient(url, secret, options);

    if (search !== null) {
      const verification = await membership(request);
      if (!verification.ok) return respond({success:false,error:"Membership verification unavailable."},verification.status);
      if ((await verification.json()).membership?.is_official_member !== true) return respond({success:false,error:"Active club membership required."},403);
      const {data: blocked, error: blockError} = await admin
        .from("gallaspy_community_blocks").select("blocker_id,blocked_id")
        .or(`blocker_id.eq.${viewerId},blocked_id.eq.${viewerId}`);
      if (blockError || !blocked) return respond({success:false,error:"Golfer search unavailable."},503);
      const hidden = [...new Set([viewerId,...blocked.map(row=>row.blocker_id===viewerId?row.blocked_id:row.blocker_id)])];
      const {data: golfers, error: searchError} = await admin
        .from("gallaspy_community_profiles").select("user_id,username")
        .ilike("username", username.replace(/_/g,"\\_")+"%")
        .not("user_id","in",`(${hidden.join(",")})`)
        .order("username").limit(20);
      if (searchError) return respond({success:false,error:"Golfer search unavailable."},503);
      return respond({success:true,golfers:golfers ?? []});
    }
    if (!targetId) return respond({success:false,error:"Invalid golfer."},400);

    // Blocking must be enforced server-side in both directions.
    const { data: blocks, error: blockError } = await admin
      .from("gallaspy_community_blocks")
      .select("blocker_id,blocked_id")
      .or(
        `and(blocker_id.eq.${viewerId},blocked_id.eq.${targetId}),` +
        `and(blocker_id.eq.${targetId},blocked_id.eq.${viewerId})`
      )
      .limit(1);

    if (blockError || !blocks) {
      return respond(
        { success: false, error: "Community unavailable." },
        503,
      );
    }

    if (blocks.length) {
      return respond(
        { success: false, error: "Golfer unavailable." },
        404,
      );
    }

    const { data: profile, error: profileError } = await admin
      .from("gallaspy_community_profiles")
      .select("user_id,username")
      .eq("user_id", targetId)
      .maybeSingle();

    if (profileError) {
      return respond(
        { success: false, error: "Unable to load golfer." },
        503,
      );
    }

    if (!profile) {
      return respond(
        { success: false, error: "Golfer unavailable." },
        404,
      );
    }

    const { data: avatar, error: avatarError } = await admin
      .from("gallaspy_player_avatars")
      .select("storage_path")
      .eq("user_id", targetId)
      .maybeSingle();

    if (avatarError) {
      return respond(
        { success: false, error: "Unable to load golfer." },
        503,
      );
    }

    let avatarUrl: string | null = null;
    const path = avatar?.storage_path;

    if (
      typeof path === "string" &&
      path.startsWith(`${targetId}/`)
    ) {
      try {
        const { data: signed, error: signError } =
          await admin.storage
            .from("gallaspy-avatars")
            .createSignedUrl(path, 1800);

        if (!signError && signed?.signedUrl) {
          avatarUrl = signed.signedUrl;
        }
      } catch {
        // A missing avatar should not make the profile unavailable.
      }
    }

    return respond({
      success: true,
      profile: {
        user_id: profile.user_id,
        username: profile.username,
        avatar_url: avatarUrl,
      },
    });
  } catch {
    return respond(
      { success: false, error: "Community unavailable." },
      503,
    );
  }
}
