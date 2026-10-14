import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const headers = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
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

export async function POST(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceKey) {
    return reply(
      { success: false, error: "Verification service unavailable." },
      503,
    );
  }

  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return reply(
      { success: false, error: "Sign in required." },
      401,
    );
  }

  try {
    const options = {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    };

    const auth = createClient(url, anonKey, options);
    const admin = createClient(url, serviceKey, options);

    const { data: identity, error: authError } =
      await auth.auth.getUser(token);

    if (authError || !identity.user) {
      return reply(
        { success: false, error: "Invalid session." },
        401,
      );
    }

    const { data: administrator, error: adminError } =
      await admin
        .from("gallaspy_admin_users")
        .select("role")
        .eq("user_id", identity.user.id)
        .maybeSingle();

    if (adminError) {
      console.error("Admin authorization failed:", adminError.message);
      return reply(
        { success: false, error: "Authorization unavailable." },
        503,
      );
    }

    if (!administrator || !["owner", "admin"].includes(administrator.role)) {
      return reply(
        { success: false, error: "Administrator access required." },
        403,
      );
    }

    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return reply(
        { success: false, error: "Invalid request." },
        400,
      );
    }

    const input = body as Record<string, unknown>;
    const eventId = input.event_id;
    const playerId = input.player_id;
    const isHost = input.is_host;

    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    if (
      typeof eventId !== "string" ||
      !/^[a-zA-Z0-9_-]{1,120}$/.test(eventId) ||
      typeof playerId !== "string" ||
      !uuidPattern.test(playerId) ||
      typeof isHost !== "boolean"
    ) {
      return reply(
        { success: false, error: "Invalid verification details." },
        400,
      );
    }

    const { data, error } = await admin.rpc(
      "gallaspy_verify_round_completion",
      {
        p_event_id: eventId,
        p_player_id: playerId,
        p_is_host: isHost,
      },
    );

    if (error) {
      console.error("Round verification failed:", error.message);

      return reply(
        {
          success: false,
          error: "Unable to verify this round. Check its eligibility.",
        },
        409,
      );
    }

    const result = Array.isArray(data) ? data[0] : data;

    return reply({
      success: true,
      event_id: eventId,
      player_id: playerId,
      verified: true,
      rewards: {
        hosts_awarded: result?.hosts_awarded ?? 0,
        attendees_awarded: result?.attendees_awarded ?? 0,
        points_awarded: result?.points_awarded ?? 0,
      },
    });
  } catch (error) {
    console.error("Admin round verification error:", error);

    return reply(
      { success: false, error: "Invalid request or service unavailable." },
      400,
    );
  }
}
