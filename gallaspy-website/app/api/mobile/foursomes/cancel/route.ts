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
  return new NextResponse(null, {
    status: 204,
    headers,
  });
}

const UUID = /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i;

export async function POST(request: NextRequest) {
  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(\S+)$/i)?.[1];

  if (!token) {
    return reply({
      success: false,
      error: "Sign in required.",
    }, 401);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anon || !secret) {
    return reply({
      success: false,
      error: "Round management is unavailable.",
    }, 503);
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return reply({
      success: false,
      error: "Invalid request.",
    }, 400);
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return reply({
      success: false,
      error: "Invalid request.",
    }, 400);
  }

  const roundId = (
    body as Record<string, unknown>
  ).foursome_id;

  if (typeof roundId !== "string" ||
      !UUID.test(roundId)) {
    return reply({
      success: false,
      error: "Invalid round identifier.",
    }, 400);
  }

  try {
    const options = {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
        detectSessionInUrl: false,
      },
    };

    const auth = createClient(url, anon, options);
    const admin = createClient(url, secret, options);

    // Verify the supplied access token with Supabase Auth.
    const { data: identity, error: authError } =
      await auth.auth.getUser(token);

    if (authError || !identity.user?.email) {
      return reply({
        success: false,
        error: "Valid sign-in required.",
      }, 401);
    }

    // Resolve the authenticated Gallaspy player.
    const { data: player, error: playerError } =
      await admin
        .from("gallaspy_players")
        .select("id")
        .eq(
          "email",
          identity.user.email.toLowerCase()
        )
        .maybeSingle();

    if (playerError || !player) {
      return reply({
        success: false,
        error: "Verified player profile required.",
      }, 403);
    }

    // Only the actual host may manage the round.
    const { data: round, error: roundError } =
      await admin
        .from("gallaspy_foursomes")
        .select("id, host_player_id, status")
        .eq("id", roundId)
        .maybeSingle();

    if (roundError) {
      return reply({
        success: false,
        error: "Unable to retrieve the round.",
      }, 503);
    }

    // Do not reveal other golfers' private round details.
    if (!round ||
        round.host_player_id !== player.id) {
      return reply({
        success: false,
        error: "Round not found.",
      }, 404);
    }

    if (round.status === "cancelled") {
      return reply({
        success: true,
        status: "cancelled",
        already_cancelled: true,
      });
    }

    if (!["open", "full"].includes(round.status)) {
      return reply({
        success: false,
        error: "This round can no longer be cancelled.",
      }, 409);
    }

    // Conditional update prevents cancellation if the
    // host or status changed after the earlier read.
    // Database support for "cancelled" must be verified
    // BEFORE enabling the client-side cancellation action.
    const { data: cancelled, error: updateError } =
      await admin
        .from("gallaspy_foursomes")
        .update({ status: "cancelled" })
        .eq("id", roundId)
        .eq("host_player_id", player.id)
        .in("status", ["open", "full"])
        .select("id, status")
        .maybeSingle();

    if (updateError) {
      console.error(
        "Gallaspy round cancellation failed:",
        updateError.message
      );

      return reply({
        success: false,
        error: "Unable to cancel this round.",
      }, 503);
    }

    if (!cancelled) {
      return reply({
        success: false,
        error: "Round status changed. Refresh and try again.",
      }, 409);
    }

    return reply({
      success: true,
      foursome: cancelled,
    });
  } catch (error) {
    console.error(
      "Gallaspy round cancellation error:",
      error
    );

    return reply({
      success: false,
      error: "Round management is unavailable.",
    }, 503);
  }
}
