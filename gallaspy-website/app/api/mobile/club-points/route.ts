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
  return NextResponse.json(body, { status, headers: corsHeaders() });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return respond({ success: false, error: "Authentication required." }, 401);
  }

  const token = authorization.slice(7).trim();
  if (!token) {
    return respond({ success: false, error: "Authentication required." }, 401);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const secretKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !secretKey) {
    return respond({ success: false, error: "Club Points service unavailable." }, 503);
  }

  try {
    const authClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: authData, error: authError } = await authClient.auth.getUser(token);
    if (authError || !authData.user?.id) {
      return respond({ success: false, error: "Invalid authentication." }, 401);
    }

    const userId = authData.user.id;

    const client = createClient(url, secretKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: balance, error: balanceError } = await client
      .from("gallaspy_points_balances")
      .select("available_points, lifetime_earned")
      .eq("user_id", userId)
      .maybeSingle();

    if (balanceError) {
      console.error("Club Points balance lookup failed:", balanceError.message);
      return respond({ success: false, error: "Unable to load Club Points." }, 500);
    }

    const { data: transactions, error: historyError } = await client
      .from("gallaspy_points_ledger")
      .select("id, points, transaction_type, source_type, description, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(20);

    if (historyError) {
      console.error("Club Points history lookup failed:", historyError.message);
      return respond({ success: false, error: "Unable to load Club Points history." }, 500);
    }

    return respond({
      success: true,
      available_points: balance?.available_points ?? 0,
      lifetime_earned: balance?.lifetime_earned ?? 0,
      transactions: transactions ?? [],
    });
  } catch {
    return respond({ success: false, error: "Club Points service unavailable." }, 503);
  }
}
