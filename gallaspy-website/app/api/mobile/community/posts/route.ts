import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGIN = "capacitor://localhost";

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Cache-Control": "no-store",
      Vary: "Origin",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
    },
  });
}

async function authenticateCommunityUser(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice(7).trim();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!token || !url || !anonKey) {
    return null;
  }

  const client = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data, error } = await client.auth.getUser(token);

  if (error || !data.user) {
    return null;
  }

  return data.user;
}

export async function GET(request: NextRequest) {
  try {
    const user = await authenticateCommunityUser(request);

    if (!user) {
      return respond(
        { success: false, error: "Authentication required." },
        401,
      );
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const secretKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.SUPABASE_SECRET_KEY;

    if (!url || !secretKey) {
      return respond(
        { success: false, error: "Community unavailable." },
        503,
      );
    }

    const admin = createClient(url, secretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    // Enforce user blocks before selecting feed posts, not only in UI.
    // Both directions are hidden to prevent unwanted contact.
    const { data: blocked, error: blockError } = await admin
      .from("gallaspy_community_blocks")
      .select("blocker_id,blocked_id")
      .or(`blocker_id.eq.${user.id},blocked_id.eq.${user.id}`);
    if (blockError || !Array.isArray(blocked)) {
      return respond({success:false,error:"Community unavailable."},503);
    }
    const hiddenIds = [...new Set(blocked.map(entry =>
      entry.blocker_id === user.id ? entry.blocked_id : entry.blocker_id
    ))];

    const query = admin
      .from("gallaspy_community_posts")
      .select("id, user_id, body, created_at")
      .is("deleted_at", null)
      .not("published_at", "is", null);
    if (hiddenIds.length) {
      // UUIDs originate from authenticated records; no user input is interpolated.
      // PostgREST filter builders modify their URL and return themselves.
      // Avoid reassigning the generic builder: TS can recurse on that type.
      query.not("user_id", "in", `(${hiddenIds.join(",")})`);
    }
    const {data,error} = await query.order("created_at", { ascending: false }).limit(20);

    if (error) {
      console.error("Community feed error:", error.message);
      return respond(
        { success: false, error: "Unable to load Community." },
        500,
      );
    }

    const posts = data ?? [];
    if (posts.length === 0) {
      return respond({ success: true, posts: [] });
    }

    const authorIds = [...new Set(posts.map((post) => post.user_id))];

    const { data: profiles, error: profileError } = await admin
      .from("gallaspy_community_profiles")
      .select("user_id, username")
      .in("user_id", authorIds);

    if (profileError) {
      console.error("Community username lookup error:", profileError.message);
      return respond(
        { success: false, error: "Unable to load Community." },
        500,
      );
    }

    const usernames = new Map(
      (profiles ?? []).map((profile) => [profile.user_id, profile.username]),
    );

    // Avatar records are separate from public Community usernames.
    // Only authors of published posts are ever queried here.
    const { data: avatars, error: avatarError } = await admin
      .from("gallaspy_player_avatars")
      .select("user_id, storage_path")
      .in("user_id", authorIds);
    if (avatarError) {
      console.error("Community avatar lookup failed");
      return respond({ success: false, error: "Unable to load Community." }, 500);
    }

    const authorPhotos = new Map<string, string>();
    await Promise.all((avatars ?? []).map(async (avatar) => {
      if (typeof avatar.storage_path !== "string" ||
          !avatar.storage_path.startsWith(`${avatar.user_id}/`)) return;
      try {
        const { data } = await admin.storage.from("gallaspy-avatars")
          .createSignedUrl(avatar.storage_path, 1800);
        if (data?.signedUrl) authorPhotos.set(avatar.user_id, data.signedUrl);
      } catch {
        // A missing/unavailable photo cannot take the entire feed offline.
      }
    }));

    // Only sign photos for published posts remaining after mutual-block filtering.
    const visiblePostIds = posts.map((post) => post.id);
    const { data: photoRecords, error: photoError } = await admin
      .from("gallaspy_community_photos")
      .select("post_id,storage_path,position")
      .in("post_id", visiblePostIds)
      .order("position", { ascending: true });
    if (photoError) {
      console.error("Community feed photo lookup failed");
      return respond({ success: false, error: "Unable to load Community." }, 503);
    }

    const postOwners = new Map(posts.map(post => [post.id, post.user_id]));
    const verifiedPaths: { post_id: string; storage_path: string; position: number }[] = [];
    for (const photo of photoRecords ?? []) {
      const owner = postOwners.get(photo.post_id);
      if (!owner || !Number.isInteger(photo.position) ||
          photo.position < 0 || photo.position > 3 ||
          typeof photo.storage_path !== "string" ||
          !photo.storage_path.startsWith(`${owner}/${photo.post_id}/`) ||
          !/^[-0-9a-f]+\.jpe?g$/i.test(photo.storage_path.split("/").pop() || "")) continue;
      verifiedPaths.push(photo);
    }
    const signedPaths = new Map<string, string>();
    if (verifiedPaths.length) {
      const { data: signed, error: signError } = await admin.storage
        .from("gallaspy-community")
        .createSignedUrls(verifiedPaths.map(photo => photo.storage_path), 600);
      if (signError) {
        console.error("Community feed photo signing failed");
        return respond({ success: false, error: "Unable to load Community." }, 503);
      }
      (signed ?? []).forEach((item) => {
        if (typeof item.path === "string" && typeof item.signedUrl === "string") {
          signedPaths.set(item.path, item.signedUrl);
        }
      });
    }
    const photosByPost = new Map<string, { url: string; position: number }[]>();
    verifiedPaths.forEach(photo => {
      const url = signedPaths.get(photo.storage_path);
      if (!url) return;
      const existing = photosByPost.get(photo.post_id) ?? [];
      existing.push({ url, position: photo.position });
      photosByPost.set(photo.post_id, existing);
    });

    return respond({
      success: true,
      posts: posts.map((post) => ({
        ...post,
        username: usernames.get(post.user_id) ?? null,
        avatar_url: authorPhotos.get(post.user_id) ?? null,
        photos: photosByPost.get(post.id) ?? [],
      })),
    });
  } catch {
    return respond(
      { success: false, error: "Community unavailable." },
      503,
    );
  }
}
export async function POST(request: NextRequest) {
  const user = await authenticateCommunityUser(request);
  if (!user) {
    return respond({ success: false, error: "Authentication required." }, 401);
  }
  try {
    const raw = await request.text();

    if (raw.length > 12000) {
      return respond({ success: false, error: "Request too large." }, 413);
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().startsWith("application/json")) {
      return respond({ success: false, error: "JSON content required." }, 415);
    }

    let payload: unknown;

    try {
      payload = JSON.parse(raw);
    } catch {
      return respond({ success: false, error: "Invalid JSON request." }, 400);
    }

    const text = validateCommunityPost(payload);

    if (!text) {
      return respond({ success: false, error: "Post must contain 1 to 3,000 characters." }, 400);
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const token = request.headers.get("authorization")?.slice(7).trim();

    if (!url || !anonKey || !token) {
      return respond({ success: false, error: "Community unavailable." }, 503);
    }

    const client = createClient(url, anonKey, {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: postId, error } = await client.rpc(
      "gallaspy_publish_community_post",
      { post_body: text },
    );

    if (error) {
      if (error.message.includes("Please wait 60 seconds")) {
        return respond({ success: false, error: error.message }, 429);
      }

      if (error.message.includes("Daily posting limit reached")) {
        return respond({ success: false, error: error.message }, 429);
      }

      console.error("Community publish error:", error.message);
      return respond({ success: false, error: "Unable to publish post." }, 500);
    }

    return respond({ success: true, post: { id: postId, user_id: user.id, body: text } }, 201);
  } catch (error) {
    console.error("Community POST unexpected error:", error);
    return respond({ success: false, error: "Unable to publish post." }, 503);
  }
}

function validateCommunityPost(payload: unknown): string | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const body = (payload as Record<string, unknown>).body;

  if (typeof body !== "string") {
    return null;
  }

  const text = body.trim();

  if (!text || text.length > 3000) {
    return null;
  }

  return text;
}
