
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ORIGIN = "capacitor://localhost";
const PROFILE_TABLE = "gallaspy_community_profiles";
const CHANGE_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000;

const RESERVED = new Set([
  "admin",
  "administrator",
  "moderator",
  "support",
  "thegallaspy",
  "gallaspy",
  "gallaspyofficial",
  "gallaspygolfclub",
]);

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Cache-Control": "no-store",
      Vary: "Origin",
    },
  });
}

export async function OPTIONS() {
  return respond({ success: true });
}

async function getContext(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice(7).trim();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secretKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_SECRET_KEY;

  if (!token || !url || !anonKey || !secretKey) {
    return null;
  }

  const auth = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { data: authData, error: authError } =
    await auth.auth.getUser(token);

  if (authError || !authData.user) {
    return null;
  }

  const admin = createClient(url, secretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return {
    userId: authData.user.id,
    admin,
  };
}

export async function GET(request: NextRequest) {
  try {
    const context = await getContext(request);

    if (!context) {
      return respond(
        { success: false, error: "Authentication required." },
        401
      );
    }

    const { data, error } = await context.admin
      .from(PROFILE_TABLE)
      .select("username, username_updated_at")
      .eq("user_id", context.userId)
      .maybeSingle();

    if (error) {
      return respond(
        { success: false, error: "Unable to load profile." },
        500
      );
    }

    return respond({
      success: true,
      profile: data ?? null,
    });
  } catch {
    return respond(
      { success: false, error: "Community unavailable." },
      503
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const context = await getContext(request);

    if (!context) {
      return respond(
        { success: false, error: "Authentication required." },
        401
      );
    }

    let payload: unknown;

    try {
      payload = await request.json();
    } catch {
      return respond(
        { success: false, error: "Invalid request." },
        400
      );
    }

    const requestedUsername =
      payload &&
      typeof payload === "object" &&
      "username" in payload
        ? (payload as { username: unknown }).username
        : null;

    if (typeof requestedUsername !== "string") {
      return respond(
        { success: false, error: "Username is required." },
        400
      );
    }

    const username = requestedUsername.trim();

    if (!/^[A-Za-z0-9_.]{3,20}$/.test(username)) {
      return respond(
        {
          success: false,
          error:
            "Use 3–20 letters, numbers, underscores, or periods.",
        },
        400
      );
    }

    if (RESERVED.has(username.toLowerCase())) {
      return respond(
        { success: false, error: "Username is reserved." },
        400
      );
    }

    const { data: existing, error: lookupError } =
      await context.admin
        .from(PROFILE_TABLE)
        .select("username, username_updated_at")
        .eq("user_id", context.userId)
        .maybeSingle();

    if (lookupError) {
      return respond(
        { success: false, error: "Unable to check profile." },
        500
      );
    }

    if (existing) {
      if (existing.username === username) {
        return respond({
          success: true,
          profile: existing,
          unchanged: true,
        });
      }

      const lastChange = new Date(
        existing.username_updated_at
      ).getTime();

      const nextChange =
        lastChange + CHANGE_INTERVAL_MS;

      if (Date.now() < nextChange) {
        return respond(
          {
            success: false,
            error: "Username can only change every 30 days.",
            next_change_at: new Date(nextChange).toISOString(),
          },
          409
        );
      }

      const { data, error } = await context.admin
        .from(PROFILE_TABLE)
        .update({
          username,
          username_updated_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", context.userId)
        .eq("username_updated_at", existing.username_updated_at)
        .select("username, username_updated_at")
        .maybeSingle();

      if (error?.code === "23505") {
        return respond(
          { success: false, error: "Username already taken." },
          409
        );
      }

      if (error || !data) {
        return respond(
          { success: false, error: "Unable to update username." },
          409
        );
      }

      return respond({ success: true, profile: data });
    }

    const { data, error } = await context.admin
      .from(PROFILE_TABLE)
      .insert({
        user_id: context.userId,
        username,
      })
      .select("username, username_updated_at")
      .single();

    if (error?.code === "23505") {
      return respond(
        { success: false, error: "Username unavailable." },
        409
      );
    }

    if (error) {
      return respond(
        { success: false, error: "Unable to create username." },
        500
      );
    }

    return respond(
      { success: true, profile: data },
      201
    );
  } catch {
    return respond(
      { success: false, error: "Community unavailable." },
      503
    );
  }
}
