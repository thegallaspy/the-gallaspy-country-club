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

    const body: unknown = await request.json();

    const id = body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>).foursome_id
      : null;

    if (typeof id !== "string" ||
        !/^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(id)) {
      return reply({ success: false, error: "Invalid foursome ID." }, 400);
    }

    const { data: round, error: roundError } = await admin
      .from("gallaspy_foursomes")
      .select("id, host_player_id, round_date, status")
      .eq("id", id)
      .maybeSingle();

    if (roundError || !round) {
      return reply({ success: false, error: "Round not found." }, 404);
    }

    if (round.host_player_id === player.id) {
      return reply({ success: false, error: "You host this round." }, 409);
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

    const { data, error } = await admin
      .from("gallaspy_foursome_requests")
      .insert({
        foursome_id: id,
        player_id: player.id,
        status: "pending",
      })
      .select("id, foursome_id, status")
      .single();

    if (error) {
      if (error.code === "23505") {
        return reply({ success: false, error: "Request already exists." }, 409);
      }

      console.error("Foursome request failed:", error.message);
      return reply({ success: false, error: "Request failed." }, 500);
    }

    return reply({
      success: true,
      message: "Request sent to host.",
      request: data,
    }, 201);
  } catch {
    return reply({ success: false, error: "Invalid request or service unavailable." }, 400);
  }
}
