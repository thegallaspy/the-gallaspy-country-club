import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGIN = "capacitor://localhost";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Cache-Control": "no-store",
    Vary: "Origin",
  };
}

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: corsHeaders(),
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return respond(
      { success: false, error: "Authentication required." },
      401,
    );
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return respond(
      { success: false, error: "Authentication required." },
      401,
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !secretKey) {
    console.error("Mobile Player configuration missing:", {
      url: !url,
      anonKey: !anonKey,
      secretKey: !secretKey,
    });
    return respond(
      { success: false, error: "Player service unavailable." },
      503,
    );
  }

  try {
    const authClient = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const {
      data: { user },
      error: authError,
    } = await authClient.auth.getUser(token);

    if (authError || !user?.email) {
      return respond(
        { success: false, error: "Invalid authentication." },
        401,
      );
    }

    const admin = createClient(url, secretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const { data: player, error: playerError } = await admin
      .from("gallaspy_players")
      .select(
        "id, golf_id_number, first_name, last_name, city, state, ghin_number, handicap_index",
      )
      .eq("email", user.email.toLowerCase())
      .maybeSingle();

    if (playerError) {
      console.error("Mobile player lookup failed:", playerError.message);

      return respond(
        { success: false, error: "Unable to load player profile." },
        500,
      );
    }

    if (!player) {
      return respond({
        success: true,
        player_found: false,
        player: null,
      });
    }

    return respond({
      success: true,
      player_found: true,
      player,
    });
  } catch {
    return respond(
      { success: false, error: "Player service unavailable." },
      503,
    );
  }
}
