import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGIN = "capacitor://localhost";

function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
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
  return playerRequest(request);
}

export async function POST(request: NextRequest) {
  return playerRequest(request);
}

async function playerRequest(request: NextRequest) {
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

    const email = user.email.toLowerCase();
    if (request.method === "POST") {
      if (!user.email_confirmed_at) {
        return respond({ success: false, error: "Verify your email first." }, 403);
      }

      const input = await request.json().catch(() => null);
      const firstName = typeof input?.first_name === "string" ? input.first_name.trim() : "";
      const lastName = typeof input?.last_name === "string" ? input.last_name.trim() : "";
      if (!firstName || !lastName || firstName.length > 80 || lastName.length > 80) {
        return respond({ success: false, error: "Enter your first and last name." }, 400);
      }

      const { error } = await admin.from("gallaspy_players").upsert(
        { email, first_name: firstName, last_name: lastName },
        { onConflict: "email", ignoreDuplicates: true },
      );
      if (error) {
        console.error("Player setup failed:", error.message);
        return respond({ success: false, error: "Unable to save your player profile. Please try again." }, 500);
      }
    }

    const { data: player, error: playerError } = await admin
      .from("gallaspy_players")
      .select(
        "id, golf_id_number, first_name, last_name, city, state, ghin_number, handicap_index",
      )
      .eq("email", email)
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
