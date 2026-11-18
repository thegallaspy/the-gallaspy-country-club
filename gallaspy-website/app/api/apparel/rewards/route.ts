import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createClient as createSessionClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: NextRequest) {
  try {
    const enabled =
      process.env.GALLASPY_REWARDS_CHECKOUT_ENABLED === "true" &&
      (process.env.SQUARE_ENVIRONMENT ?? "sandbox") === "sandbox" &&
      process.env.VERCEL_ENV !== "production";

    if (!enabled) {
      return respond({ success: true, enabled: false });
    }

    const origin = request.headers.get("origin");

    if (!origin || origin !== request.nextUrl.origin) {
      return respond({
        success: false,
        error: "Invalid checkout origin.",
      }, 403);
    }

    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      return respond({
        success: false,
        error: "Rewards temporarily unavailable.",
      }, 503);
    }

    const admin = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const body = await request.json();
    const token = body?.nativeCheckoutToken;

    let userId: string | null = null;

    if (token !== undefined && token !== null) {
      if (
        typeof token !== "string" ||
        !/^[a-f0-9]{64}$/.test(token)
      ) {
        return respond({
          success: false,
          error: "Invalid checkout session.",
        }, 400);
      }

      const tokenHash = createHash("sha256")
        .update(token)
        .digest("hex");

      const { data: session, error } = await admin
        .from("native_apparel_checkout_sessions")
        .select(
          "user_id,expires_at,consumed_at,payment_state"
        )
        .eq("token_hash", tokenHash)
        .maybeSingle();

      if (
        error ||
        !session ||
        session.consumed_at ||
        session.payment_state !== "ready" ||
        new Date(session.expires_at).getTime() <= Date.now()
      ) {
        return respond({
          success: false,
          error: "Checkout session unavailable.",
        }, 409);
      }

      userId = session.user_id;
    } else {
      const sessionClient = await createSessionClient();

      const { data: { user }, error } =
        await sessionClient.auth.getUser();

      if (!error && user?.id && user.email_confirmed_at) {
        userId = user.id;
      }
    }

    if (!userId) {
      return respond({
        success: true,
        enabled: true,
        authenticated: false,
      });
    }

    const { data: balance, error: balanceError } =
      await admin
        .from("gallaspy_points_balances")
        .select("available_points,lifetime_earned")
        .eq("user_id", userId)
        .maybeSingle();

    if (balanceError) {
      throw new Error("Rewards balance lookup failed");
    }

    const { data: refunds, error: refundError } =
      await admin
        .from("gallaspy_apparel_refunds")
        .select("points_to_reverse,points_reversed")
        .eq("user_id", userId)
        .eq("refund_status", "completed");

    if (refundError) {
      throw new Error("Rewards obligations lookup failed");
    }

    const outstanding = (refunds ?? []).reduce(
      (sum, refund) =>
        sum + Math.max(
          0,
          refund.points_to_reverse - refund.points_reversed
        ),
      0
    );

    const available = Math.max(
      0,
      Number(balance?.available_points ?? 0)
    );

    const redeemable = Math.max(
      0,
      available - outstanding
    );

    return respond({
      success: true,
      enabled: true,
      authenticated: true,
      availablePoints: available,
      redeemablePoints: redeemable,
      lifetimeEarned: balance?.lifetime_earned ?? 0,
      minimumRedemption: 500,
      pointsPerDollar: 100,
    });
  } catch {
    return respond({
      success: false,
      error: "Rewards temporarily unavailable.",
    }, 503);
  }
}
