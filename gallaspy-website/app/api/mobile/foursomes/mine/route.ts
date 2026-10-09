import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function reply(body: unknown, status = 200) {
  return NextResponse.json(body, { status, headers });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers });
}

export async function GET(request: NextRequest) {
  const token = request.headers.get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return reply({ success: false, error: "Sign in required." }, 401);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anon || !secret) {
    console.error("Mobile Calendar configuration missing:", {
      url: !url,
      anonKey: !anon,
      secretKey: !secret,
    });
    return reply({ success: false, error: "Service unavailable." }, 503);
  }

  try {
    const options = {
      auth: { persistSession: false, autoRefreshToken: false },
    };

    const auth = createClient(url, anon, options);
    const admin = createClient(url, secret, options);

    const { data: identity, error: authError } =
      await auth.auth.getUser(token);

    if (authError || !identity.user?.email) {
      return reply({ success: false, error: "Invalid session." }, 401);
    }

    const { data: player, error: playerError } = await admin
      .from("gallaspy_players")
      .select("id")
      .eq("email", identity.user.email.toLowerCase())
      .maybeSingle();

    if (playerError || !player) {
      return reply(
        { success: false, error: "Player profile required." },
        403
      );
    }

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const { data: hosted, error: hostedError } = await admin
      .from("gallaspy_foursomes")
      .select(
        "id, course_name, round_date, tee_time, playing_style, max_players, status"
      )
      .eq("host_player_id", player.id)
      .gte("round_date", today)
      .order("round_date", { ascending: true })
      .order("tee_time", { ascending: true })
      .limit(100);

    if (hostedError) {
      return reply(
        { success: false, error: "Unable to load hosted rounds." },
        500
      );
    }

    const hostedIds = (hosted ?? []).map(round => round.id);

    let incoming: Array<{
      id: string;
      foursome_id: string;
      player_id: string;
      status: string;
      created_at: string;
    }> = [];

    if (hostedIds.length) {
      const { data, error } = await admin
        .from("gallaspy_foursome_requests")
        .select("id, foursome_id, player_id, status, created_at")
        .in("foursome_id", hostedIds)
        .order("created_at", { ascending: true })
        .limit(501);

      if (error) {
        return reply(
          { success: false, error: "Unable to load join requests." },
          500
        );
      }

      if ((data ?? []).length > 500) {
        return reply(
          {
            success: false,
            error: "Too many join requests to display. Please contact club support."
          },
          503
        );
      }

      incoming = data ?? [];
    }

    const { data: myRequests, error: requestError } = await admin
      .from("gallaspy_foursome_requests")
      .select("id, foursome_id, status, created_at")
      .eq("player_id", player.id)
      .order("created_at", { ascending: false })
      .limit(100);

    if (requestError) {
      return reply(
        { success: false, error: "Unable to load your requests." },
        500
      );
    }

    const requestedIds = [
      ...new Set((myRequests ?? []).map(item => item.foursome_id))
    ];

    let requestedRounds: Array<{
      id: string;
      course_name: string;
      round_date: string;
      tee_time: string;
      playing_style: string;
      status: string;
    }> = [];

    if (requestedIds.length) {
      const { data, error } = await admin
        .from("gallaspy_foursomes")
        .select(
          "id, course_name, round_date, tee_time, playing_style, status"
        )
        .in("id", requestedIds)
        .gte("round_date", today);

      if (error) {
        return reply(
          { success: false, error: "Unable to load requested rounds." },
          500
        );
      }

      requestedRounds = data ?? [];
    }

    const roundById = new Map(
      requestedRounds.map(round => [round.id, round])
    );

    const joined = (myRequests ?? [])
      .filter(item => roundById.has(item.foursome_id))
      .map(item => ({
        ...item,
        round: roundById.get(item.foursome_id)
      }));

    const requesterIds = [
      ...new Set(incoming.map(item => item.player_id))
    ];

    let requesterNames: Array<{
      id: string;
      first_name: string | null;
      last_name: string | null;
    }> = [];

    if (requesterIds.length) {
      const { data, error } = await admin
        .from("gallaspy_players")
        .select("id, first_name, last_name")
        .in("id", requesterIds)
        .limit(500);

      if (error) {
        return reply(
          { success: false, error: "Unable to load member names." },
          500
        );
      }

      requesterNames = data ?? [];
    }

    const nameById = new Map(
      requesterNames.map(member => [
        member.id,
        [member.first_name, member.last_name]
          .filter(Boolean)
          .join(" ")
          .trim() || "Gallaspy Member"
      ])
    );

    const hosting = (hosted ?? []).map(round => {
      const requests = incoming
        .filter(item => item.foursome_id === round.id)
        .map(({ player_id, ...item }) => ({
          ...item,
          member_name: nameById.get(player_id) || "Gallaspy Member"
        }));

      return {
        ...round,
        confirmed_players:
          1 + requests.filter(item => item.status === "approved").length,
        requests
      };
    });

    return reply({
      success: true,
      hosting,
      joined
    });
  } catch {
    return reply(
      { success: false, error: "Unable to load your foursomes." },
      500
    );
  }
}
