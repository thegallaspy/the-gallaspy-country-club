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

    const { data, error } = await admin
      .from("gallaspy_community_posts")
      .select("id, user_id, body, created_at")
      .is("deleted_at", null)
      .not("published_at", "is", null)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Community feed error:", error.message);
      return respond(
        { success: false, error: "Unable to load Community." },
        500,
      );
    }

    return respond({
      success: true,
      posts: data ?? [],
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
