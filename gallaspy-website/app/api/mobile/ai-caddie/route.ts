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
  const token = request.headers
    .get("authorization")
    ?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    return reply({ success: false, error: "Sign in required." }, 401);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return reply({ success: false, error: "Service unavailable." }, 503);
  }

  const auth = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await auth.auth.getUser(token);

  if (error || !data.user) {
    return reply({ success: false, error: "Invalid session." }, 401);
  }

  let input: unknown;

  try {
    input = await request.json();
  } catch {
    return reply({ success: false, error: "Invalid request." }, 400);
  }

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return reply({ success: false, error: "Invalid request." }, 400);
  }

  const shot = input as Record<string, unknown>;
  const distance = Number(shot.distance);
  const lies = ["fairway", "tee", "rough", "bunker", "recovery"];
  const winds = ["unknown", "calm", "headwind", "tailwind", "crosswind"];

  if (
    !Number.isFinite(distance) ||
    distance < 1 ||
    distance > 600 ||
    !lies.includes(String(shot.lie)) ||
    !winds.includes(String(shot.wind)) ||
    typeof shot.question !== "string" ||
    shot.question.length > 1000
  ) {
    return reply({ success: false, error: "Invalid shot details." }, 400);
  }

  if (!process.env.OPENAI_API_KEY) {
    return reply({
      success: false,
      error: "AI Caddie is not configured yet.",
    }, 503);
  }

  const secret = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!secret) {
    return reply({
      success: false,
      error: "AI Caddie is temporarily unavailable.",
    }, 503);
  }

  const admin = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: allowed, error: usageError } = await admin.rpc(
    "claim_gallaspy_ai_caddie_request",
    {
      p_user_id: data.user.id,
      p_daily_limit: 20,
    }
  );

  if (usageError) {
    console.error("AI Caddie usage check failed:", usageError.message);

    return reply({
      success: false,
      error: "Unable to verify AI Caddie availability.",
    }, 503);
  }

  if (allowed !== true) {
    return reply({
      success: false,
      error: "Daily AI Caddie limit reached. Try again tomorrow.",
    }, 429);
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        store: false,
        max_output_tokens: 350,
        instructions: [
          "You are Gallaspy AI Caddie, a practical on-course golf advisor.",
          "Give concise, useful golf shot strategy.",
          "Consider distance, lie, wind direction, and the player's question.",
          "Do not invent GPS data, hazards, wind speed, or course conditions.",
          "Do not assume the player's personal club distances.",
          "If suggesting a club, explain that the correct choice depends",
          "on the player's actual carry distances.",
          "Prioritize safe targets, realistic shot selection, and pace of play.",
          "Use clear language suitable for beginners and experienced golfers.",
          "Keep advice brief enough to read during a round."
        ].join(" "),
        input: JSON.stringify({
          distance_yards: distance,
          lie: shot.lie,
          wind: shot.wind,
          question: shot.question,
        }),
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) {
      console.error("AI Caddie provider error:", response.status);
      return reply({
        success: false,
        error: "AI Caddie is temporarily unavailable. Please try again.",
      }, 503);
    }

    const result = await response.json();

    const advice = (result.output ?? [])
      .flatMap((item: {
        content?: Array<{ type?: string; text?: string }>
      }) => item.content ?? [])
      .filter((part: { type?: string }) => part.type === "output_text")
      .map((part: { text?: string }) => part.text ?? "")
      .join("\n")
      .trim();

    if (!advice) {
      return reply({
        success: false,
        error: "AI Caddie could not generate advice. Please try again.",
      }, 503);
    }

    return reply({ success: true, advice });
  } catch (error) {
    console.error("AI Caddie request failed:", error);
    return reply({
      success: false,
      error: "Unable to reach AI Caddie. Please try again.",
    }, 503);
  }
}
