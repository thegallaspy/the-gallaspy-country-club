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
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anon || !secret) {
    return reply({ success: false, error: "Service unavailable." }, 503);
  }

  const token = request.headers.get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return reply({ success: false, error: "Sign in required." }, 401);
  }

  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return reply({ success: false, error: "Invalid request." }, 400);
    }

    const input = body as Record<string, unknown>;
    const requestId = input.request_id;
    const decision = input.decision;

    if (
      typeof requestId !== "string" ||
      !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(requestId) ||
      (decision !== "approved" && decision !== "declined")
    ) {
      return reply({ success: false, error: "Invalid decision." }, 400);
    }

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
      return reply({ success: false, error: "Player profile required." }, 403);
    }

    const { data: joinRequest, error: lookupError } = await admin
      .from("gallaspy_foursome_requests")
      .select("id, foursome_id, status")
      .eq("id", requestId)
      .maybeSingle();

    if (lookupError || !joinRequest) {
      return reply({ success: false, error: "Request not found." }, 404);
    }

    const { data: round, error: roundError } = await admin
      .from("gallaspy_foursomes")
      .select("host_player_id, round_date, status")
      .eq("id", joinRequest.foursome_id)
      .maybeSingle();

    if (roundError || !round) {
      return reply({ success: false, error: "Round not found." }, 404);
    }

    if (round.host_player_id !== player.id) {
      return reply({ success: false, error: "Host access required." }, 403);
    }

    if (joinRequest.status !== "pending") {
      return reply({ success: false, error: "Request already processed." }, 409);
    }

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    if (round.status !== "open" || round.round_date < today) {
      return reply({ success: false, error: "Round unavailable." }, 409);
    }

    const { data: updated, error: updateError } = await admin
      .from("gallaspy_foursome_requests")
      .update({ status: decision })
      .eq("id", requestId)
      .eq("status", "pending")
      .select("id, foursome_id, status")
      .maybeSingle();

    if (updateError) {
      console.error("Foursome approval failed:", updateError.message);

      return reply({
        success: false,
        error: "Unable to process request. The foursome may be full.",
      }, 409);
    }

    if (!updated) {
      return reply({
        success: false,
        error: "Request already processed.",
      }, 409);
    }

    return reply({ success: true, request: updated });
  } catch {
    return reply({
      success: false,
      error: "Invalid request or service unavailable.",
    }, 400);
  }
}
