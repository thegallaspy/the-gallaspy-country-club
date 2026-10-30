import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const ALLOWED_ORIGIN = "capacitor://localhost";

function respond(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
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
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Cache-Control": "no-store",
      Vary: "Origin",
    },
  });
}

export async function GET(request: NextRequest) {
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    return respond(
      { success: false, error: "Authentication required." },
      401
    );
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    return respond(
      { success: false, error: "Authentication required." },
      401
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return respond(
      { success: false, error: "Membership service unavailable." },
      503
    );
  }

  try {
    const supabase = createClient(url, anonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return respond(
        { success: false, error: "Invalid authentication." },
        401
      );
    }

    const { data: membership, error } = await supabase
      .from("gallaspy_memberships")
      .select(
        "membership_number, membership_status, membership_type, founder_number, approved_at"
      )
      .eq("user_id", user.id)
      .maybeSingle();

    if (error) {
      console.error("Membership lookup failed:", error.message);

      return respond(
        { success: false, error: "Unable to load membership." },
        503
      );
    }

    const approved = membership?.membership_status === "approved";
    const falcon = approved &&
      membership?.membership_type === "falcon_society" &&
      membership.founder_number != null;

    let standardActive = false;

    if (approved && membership?.membership_type === "standard") {
      const { data: subscription, error: subscriptionError } =
        await supabase
          .from("gallaspy_standard_subscriptions")
          .select("id, subscription_status, monthly_amount_cents, current_period_start, current_period_end")
          .eq("user_id", user.id)
          .maybeSingle();

      if (subscriptionError) {
        console.error("Subscription verification failed:", subscriptionError.message);
      } else if (
        subscription != null &&
        ["active", "canceled"].includes(
          subscription.subscription_status
        ) &&
        subscription.monthly_amount_cents === 10000 &&
        subscription.current_period_start &&
        subscription.current_period_end &&
        new Date(subscription.current_period_start).getTime() <= Date.now() &&
        new Date(subscription.current_period_end).getTime() > Date.now()
      ) {
        const { data: payment, error: paymentError } = await supabase
          .from("gallaspy_subscription_payments")
          .select("id")
          .eq("subscription_id", subscription.id)
          .eq("payment_status", "completed")
          .eq("amount_cents", 10000)
          .eq("currency", "USD")
          .eq("billing_period_start", subscription.current_period_start)
          .eq("billing_period_end", subscription.current_period_end)
          .limit(1)
          .maybeSingle();

        if (paymentError) {
          console.error("Membership payment verification failed:", paymentError.message);
        } else {
          standardActive = Boolean(payment);
        }
      }
    }

    const officialMember = falcon || standardActive;

    return respond({
      success: true,
      membership_found: Boolean(membership),
      membership: membership
        ? {
            status: membership.membership_status,
            access_status: officialMember
              ? "active"
              : membership.membership_status === "suspended"
                ? "suspended"
                : "inactive",
            type: membership.membership_type,
            membership_number: membership.membership_number,
            founder_number: membership.founder_number,
            approved_at: membership.approved_at,
            is_official_member: officialMember,
            is_falcon_society_member: falcon,
          }
        : null,
    });
  } catch {
    return respond(
      { success: false, error: "Membership service unavailable." },
      503
    );
  }
}
