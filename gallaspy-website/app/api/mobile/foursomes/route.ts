import { NextRequest, NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ORIGIN = "capacitor://localhost";

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
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": ORIGIN,
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      Vary: "Origin",
    },
  });
}

function clients() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secretKey = process.env.SUPABASE_SECRET_KEY;

  if (!url || !anonKey || !secretKey) {
    throw new Error("Foursome service unavailable.");
  }

  const options = {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  };

  return {
    auth: createClient(url, anonKey, options),
    admin: createClient(url, secretKey, options),
  };
}

async function authenticatedPlayer(
  request: NextRequest,
  auth: SupabaseClient,
  admin: SupabaseClient,
) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return null;
  }

  const token = authorization.slice(7).trim();

  if (!token) return null;

  const { data, error } = await auth.auth.getUser(token);

  if (error || !data.user?.email) return null;

  const { data: player, error: playerError } = await admin
    .from("gallaspy_players")
    .select("id")
    .eq("email", data.user.email.toLowerCase())
    .maybeSingle();

  if (playerError || !player) return null;

  return player;
}

export async function GET(request: NextRequest) {
  try {
    const { auth, admin } = clients();

    const player = await authenticatedPlayer(request, auth, admin);

    if (!player) {
      return respond(
        { success: false, error: "Verified player sign-in required." },
        401,
      );
    }

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const { data, error } = await admin
      .from("gallaspy_foursomes")
      .select(
        "id, host_player_id, course_name, round_date, tee_time, playing_style, max_players, status",
      )
      .gte("round_date", today)
      .in("status", ["open", "full"])
      .order("round_date", { ascending: true })
      .order("tee_time", { ascending: true })
      .limit(100);

    if (error) {
      console.error("Foursome discovery failed:", error.message);
      return respond(
        { success: false, error: "Unable to load foursomes." },
        500,
      );
    }

    const rounds = data ?? [];
    const roundIds = rounds.map(round => round.id);

    const approvedCount = new Map<string, number>();

    if (roundIds.length) {
      const counts = await Promise.all(
        roundIds.map(async roundId => {
          const { count, error } = await admin
            .from("gallaspy_foursome_requests")
            .select("id", { count: "exact", head: true })
            .eq("foursome_id", roundId)
            .eq("status", "approved");

          if (error || count === null) {
            throw new Error("Unable to count approved golfers.");
          }

          return [roundId, count] as const;
        })
      );

      for (const [roundId, count] of counts) {
        approvedCount.set(roundId, count);
      }
    }

    return respond({
      success: true,
      foursomes: rounds.map(round => {
        const confirmedPlayers =
          1 + (approvedCount.get(round.id) ?? 0);

        const spotsLeft = Math.max(
          0,
          round.max_players - confirmedPlayers,
        );

        return {
          ...round,
          confirmed_players: confirmedPlayers,
          spots_left: round.status === "open" ? spotsLeft : 0,
        };
      }),
      player_id: player.id,
    });
  } catch {
    return respond(
      { success: false, error: "Foursome service unavailable." },
      503,
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { auth, admin } = clients();

    const player = await authenticatedPlayer(request, auth, admin);

    if (!player) {
      return respond(
        { success: false, error: "Verified player sign-in required." },
        401,
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return respond(
        { success: false, error: "Invalid request." },
        400,
      );
    }

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return respond(
        { success: false, error: "Invalid round details." },
        400,
      );
    }

    const input = body as Record<string, unknown>;

    const course =
      typeof input.course_name === "string"
        ? input.course_name.trim()
        : "";

    const date =
      typeof input.round_date === "string"
        ? input.round_date
        : "";

    const time =
      typeof input.tee_time === "string"
        ? input.tee_time
        : "";

    const style =
      typeof input.playing_style === "string"
        ? input.playing_style
        : "social";

    const validStyles = [
      "social",
      "beginner",
      "competitive",
      "all",
    ];

    const validDate = /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      !Number.isNaN(Date.parse(date)) &&
      new Date(date + "T00:00:00Z").toISOString().slice(0, 10) === date;

    const validTime = /^([01]\d|2[0-3]):[0-5]\d$/.test(time);

    if (
      course.length < 2 ||
      course.length > 100 ||
      !validDate ||
      !validTime ||
      !validStyles.includes(style)
    ) {
      return respond(
        { success: false, error: "Check the course, date, tee time, and playing style." },
        400,
      );
    }

    const today = new Intl.DateTimeFormat("en-CA", {
      timeZone: "America/New_York",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    if (date < today) {
      return respond(
        { success: false, error: "Choose a future round date." },
        400,
      );
    }

    const { data, error } = await admin
      .from("gallaspy_foursomes")
      .insert({
        host_player_id: player.id,
        course_name: course,
        round_date: date,
        tee_time: time,
        playing_style: style,
        max_players: 4,
        status: "open",
      })
      .select(
        "id, course_name, round_date, tee_time, playing_style, status",
      )
      .single();

    if (error) {
      console.error("Foursome hosting failed:", error.message);
      return respond(
        { success: false, error: "Unable to host this round." },
        500,
      );
    }

    return respond({ success: true, foursome: data }, 201);
  } catch {
    return respond(
      { success: false, error: "Foursome service unavailable." },
      503,
    );
  }
}
