import { createHmac, timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "@/lib/square/membership-client";
import { reconcileStandardMembershipInvoice } from "@/lib/square/reconcile-membership-invoice";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const NOTIFICATION_URL =
  process.env.SQUARE_SUBSCRIPTION_WEBHOOK_URL ??
  "https://thegallaspy.com/api/square/subscriptions/webhook";

const TRACKED_EVENTS = new Set([
  "subscription.created",
  "subscription.updated",
  "invoice.payment_made",
]);

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function verifySignature(body: string, signature: string, key: string) {
  if (!/^[A-Za-z0-9+/]+={0,2}$/.test(signature)) return false;
  const expected = createHmac("sha256", key)
    .update(NOTIFICATION_URL + body, "utf8")
    .digest();
  const received = Buffer.from(signature, "base64");
  return received.length === expected.length &&
    timingSafeEqual(received, expected);
}

type SquareWebhook = {
  event_id: string;
  type: string;
  data?: {
    id?: string;
    type?: string;
    object?: { subscription?: { id?: string }; invoice?: { id?: string } };
  };
};

type SquareSubscription = {
  id?: string;
  customer_id?: string;
  location_id?: string;
  plan_variation_id?: string;
  status?: string;
  price_override_money?: unknown;
};

type LocalSubscription = {
  id: string;
  square_subscription_id: string;
  square_customer_id: string | null;
  subscription_status: string;
  current_period_start: string | null;
  current_period_end: string | null;
};

function validPeriod(s: LocalSubscription) {
  const start = Date.parse(s.current_period_start ?? "");
  const end = Date.parse(s.current_period_end ?? "");
  return Number.isFinite(start) && Number.isFinite(end) &&
    start <= Date.now() && end > Date.now();
}

/**
 * Conservative mapping. A Square ACTIVE state is NOT proof of payment.
 * CANCELED remains eligible for an already verified, still-paid period,
 * subject to the membership API's separate payment check.
 */
function localStatus(squareStatus: string, hasPaidCurrentPeriod: boolean) {
  switch (squareStatus) {
    case "ACTIVE": return hasPaidCurrentPeriod ? "active" : "pending";
    case "PENDING":
    case "PAUSED": return "pending";
    case "CANCELED": return "canceled";
    case "DEACTIVATED":
    case "COMPLETED": return "expired";
    default: throw new Error("Unsupported Square subscription status");
  }
}

export async function POST(request: NextRequest) {
  const key = process.env.SQUARE_SUBSCRIPTION_WEBHOOK_KEY;
  const signature = request.headers.get("x-square-hmacsha256-signature");
  if (!key) return json({ error: "Webhook unavailable" }, 503);

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return json({ error: "Invalid request body" }, 400);
  }
  if (raw.length > 262144) return json({ error: "Request too large" }, 413);
  if (!signature || !verifySignature(raw, signature, key)) {
    return json({ error: "Invalid signature" }, 401);
  }

  let event: SquareWebhook;
  try {
    event = JSON.parse(raw) as SquareWebhook;
  } catch {
    return json({ error: "Invalid webhook JSON" }, 400);
  }
  if (!event || typeof event !== "object" ||
      typeof event.event_id !== "string" || !event.event_id.trim() ||
      typeof event.type !== "string" || !event.type.trim()) {
    return json({ error: "Invalid webhook event" }, 400);
  }

  // Only the two supported subscription events and invoice.payment_made are
  // processed. All other signed Square events are safely ignored.
  if (!TRACKED_EVENTS.has(event.type)) {
    return json({ success: true, ignored: true });
  }

  const invoiceEvent = event.type === "invoice.payment_made";
  const objectId = invoiceEvent
    ? event.data?.object?.invoice?.id
    : event.data?.object?.subscription?.id;
  if (event.data?.type !== (invoiceEvent ? "invoice" : "subscription") ||
      typeof objectId !== "string" ||
      !(invoiceEvent
        ? /^inv:[A-Za-z0-9_:-]+$/.test(objectId)
        : /^[A-Za-z0-9_-]+$/.test(objectId)) ||
      objectId.length > 255 ||
      (event.data.id && event.data.id !== objectId)) {
    return json({ error: "Invalid Square resource event" }, 400);
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secret = process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !secret) return json({ error: "Webhook unavailable" }, 503);

  const admin = createClient(url, secret, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: attempt, error: claimError } = await admin.rpc(
    "gallaspy_claim_square_subscription_event",
    { p_event_id: event.event_id, p_event_type: event.type }
  );
  if (claimError) {
    console.error("Square event claim failed:", claimError.code);
    return json({ error: "Processing unavailable" }, 503);
  }
  if (!Number.isInteger(attempt) || attempt < 1) {
    const { data: existing, error } = await admin
      .from("gallaspy_square_subscription_events")
      .select("processing_status")
      .eq("square_event_id", event.event_id)
      .maybeSingle();
    if (!error && existing?.processing_status === "completed") {
      return json({ success: true, duplicate: true });
    }
    return json({ error: "Event processing in progress" }, 503);
  }

  let succeeded = false;
  try {
    if (invoiceEvent) {
      // This branch uses the exact same signed-event idempotency functions.
      // Other merchant invoices are ignored after a fresh Square lookup.
      await reconcileStandardMembershipInvoice(admin, objectId);
      succeeded = true;
    } else {
      const subscriptionId = objectId;
      const config = getSquareMembershipConfig();
      const response = await retrieveSquareMembershipRecord(
        "subscriptions", subscriptionId
      ) as { subscription?: SquareSubscription };
      const square = response?.subscription;
      if (!square || square.id !== subscriptionId ||
          square.location_id !== config.locationId ||
          typeof square.customer_id !== "string" ||
          typeof square.status !== "string") {
        throw new Error("Square subscription verification failed");
      }

      // Events for other subscription plans must never affect club membership.
      const approvedPlan = process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;
      if (!approvedPlan) throw new Error("Membership plan not configured");
      if (square.plan_variation_id !== approvedPlan) {
        succeeded = true;
      } else {
        if (square.price_override_money != null) {
          throw new Error("Unexpected Square membership price override");
        }
        const { data, error } = await admin
          .from("gallaspy_standard_subscriptions")
          .select("id, square_subscription_id, square_customer_id, subscription_status, current_period_start, current_period_end")
          .eq("square_subscription_id", subscriptionId)
          .maybeSingle();
        if (error || !data) {
          // Keep this retryable: an enrollment may not yet have linked its
          // Square subscription ID. Never create a membership from a webhook.
          throw new Error("Linked standard subscription not yet available");
        }
        const local = data as LocalSubscription;
        if (local.square_customer_id !== square.customer_id) {
          throw new Error("Subscription customer mismatch");
        }

        let paid = false;
        if (square.status === "ACTIVE" && validPeriod(local)) {
          const { data: payment, error: paymentError } = await admin
            .from("gallaspy_subscription_payments")
            .select("id")
            .eq("subscription_id", local.id)
            .eq("payment_status", "completed")
            .eq("amount_cents", 10000)
            .eq("currency", "USD")
            .eq("billing_period_start", local.current_period_start)
            .eq("billing_period_end", local.current_period_end)
            .limit(1)
            .maybeSingle();
          if (paymentError) throw new Error("Payment lookup failed");
          paid = Boolean(payment);
        }

        const nextStatus = localStatus(square.status, paid);
        const { data: updated, error: updateError } = await admin
          .from("gallaspy_standard_subscriptions")
          .update({ subscription_status: nextStatus, updated_at: new Date().toISOString() })
          .eq("id", local.id)
          .eq("square_subscription_id", subscriptionId)
          .eq("square_customer_id", square.customer_id)
          .select("id")
          .maybeSingle();
        if (updateError || !updated) {
          throw new Error("Subscription status reconciliation failed");
        }
        // Lifecycle notifications only reconcile subscription status; invoice
        // payment events independently verify payment and activation.
        succeeded = true;
      }
    }
  } catch (error) {
    console.error("Square billing event failed:",
      error instanceof Error ? error.message : "Unexpected failure");
  }

  const { data: finished, error: finishError } = await admin.rpc(
    "gallaspy_finish_square_subscription_event",
    {
      p_event_id: event.event_id,
      p_success: succeeded,
      p_error: succeeded ? null : "Square billing reconciliation failed",
      p_attempt: attempt,
    }
  );
  if (finishError || finished !== true || !succeeded) {
    return json({ error: "Square billing event processing incomplete" }, 503);
  }
  return json({ success: true });
}
