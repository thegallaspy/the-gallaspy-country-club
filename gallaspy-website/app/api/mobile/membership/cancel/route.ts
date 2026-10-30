/** Authenticated, mobile-safe Standard Membership cancellation endpoint. */
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { cancelStandardMembership } from "@/lib/square/cancel-standard-membership";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = {
  "Access-Control-Allow-Origin": "capacitor://localhost",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
  "Cache-Control": "no-store",
  Vary: "Origin",
};

function respond(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: HEADERS });
}

async function context(request: NextRequest) {
  const token = request.headers.get("authorization")?.match(/^Bearer\s+(.+)$/i)?.[1]?.trim();
  if (!token || token.length > 8192) return null;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anon || !key) throw new Error("Membership cancellation unavailable");
  const options = { auth: { persistSession: false, autoRefreshToken: false } };
  const auth = createClient(url, anon, options);
  const { data: { user }, error } = await auth.auth.getUser(token);
  if (error || !user) return null;
  const admin = createClient(url, key, options);
  return { userId: user.id, admin };
}

export async function GET(request: NextRequest) {
  try {
    const session = await context(request);
    if (!session) return respond({ success: false, error: "Sign in required." }, 401);
    const { data, error } = await session.admin
      .from("gallaspy_standard_subscriptions")
      .select("subscription_status,cancel_at_period_end,current_period_end,square_subscription_id")
      .eq("user_id", session.userId)
      .maybeSingle();
    if (error) throw new Error("Subscription lookup failed");
    if (!data) return respond({ success: true, has_subscription: false });
    return respond({
      success: true,
      has_subscription: true,
      status: data.subscription_status,
      cancellation_scheduled: data.cancel_at_period_end === true,
      current_period_end: data.current_period_end,
      can_request_cancellation: Boolean(data.square_subscription_id) &&
        !data.cancel_at_period_end &&
        data.subscription_status === "active",
    });
  } catch {
    return respond({ success: false, error: "Cancellation status unavailable." }, 503);
  }
}

export async function POST(request: NextRequest) {
  try {
    // No client-supplied subscription/customer/payment IDs are accepted.
    const session = await context(request);
    if (!session) return respond({ success: false, error: "Sign in required." }, 401);
    if (request.headers.get("content-length") &&
        Number(request.headers.get("content-length")) > 0) {
      return respond({ success: false, error: "This request does not accept a body." }, 400);
    }
    const result = await cancelStandardMembership(session.admin, session.userId);
    return respond({ success: true, ...result,
      message: "Future Standard Membership renewals have been canceled at Square. Any verified, unrefunded paid-period benefits remain available until that period ends." });
  } catch (error) {
    console.error("Standard Membership cancellation needs verification:",
      error instanceof Error ? error.message : "Unexpected failure");
    return respond({ success: false,
      error: "Unable to confirm cancellation. Please retry or contact club support; do not start a new subscription." }, 503);
  }
}
