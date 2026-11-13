/**
 * The Gallaspy Golf Club — Stage B2D, sandbox enrollment.
 * Intentionally unreachable unless both an explicit feature switch AND the
 * Square Sandbox environment are configured. No browser checkout is enabled.
 *
 * Square can charge a stored card immediately when creating a subscription.
 * Recover partially completed attempts manually; never blindly create a
 * second subscription on a timeout. All Square creates use stable idempotency.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSquareMembershipConfig, sendSquareMembershipRequest } from "./membership-client";
import { verifyStandardMembershipPlan } from "./verify-membership-plan";

export const STANDARD_BILLING_TERMS_VERSION = "standard-monthly-2026-10-v1";
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const SQUARE_ID = /^[A-Za-z0-9_:-]{6,255}$/;
const SQUARE_CARD_ID = /^ccof:[A-Za-z0-9_:-]{6,255}$/;

type Admin = Pick<SupabaseClient, "rpc" | "from">;
type Attempt = {
  attempt_id: string;
  idempotency_key: string;
  enrollment_status: string;
};
type SquareCustomer = {id?: string; email_address?: string};
type SquareCard = {id?: string; customer_id?: string; enabled?: boolean};
type SquareSubscription = {
  id?: string; customer_id?: string; card_id?: string;
  location_id?: string; plan_variation_id?: string;
  status?: string; start_date?: string; timezone?: string;
  price_override_money?: unknown;
};

type EnrollmentRequest = {
  userId: string;
  email: string;
  fullName: string;
  sourceId: string;
  consent: true;
};

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

function splitName(value: string) {
  const name = value.trim().replace(/\s+/g, " ");
  assert(name.length >= 3 && name.length <= 180 && !/[<>\r\n]/.test(name), "A valid full name is required");
  const first = name.split(" ")[0];
  const last = name.slice(first.length).trim();
  assert(last.length >= 1, "First and last name are required");
  return {given_name: first, family_name: last};
}

/** Initial period only, anchored to the UTC start_date returned by Square.
 * Renewal reconciliation must separately advance period boundaries. */
export function initialMonthlyUtcPeriod(startDate: string, now = new Date()) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(startDate), "Invalid Square start date");
  const first = new Date(`${startDate}T00:00:00.000Z`);
  assert(Number.isFinite(first.getTime()) && first.toISOString().slice(0,10) === startDate, "Invalid Square calendar date");
  assert(first.toISOString().slice(0,10) === now.toISOString().slice(0,10), "Square start date must match enrollment UTC date");
  const y = first.getUTCFullYear();
  const m = first.getUTCMonth();
  const d = first.getUTCDate();
  const daysNextMonth = new Date(Date.UTC(y,m + 2,0)).getUTCDate();
  const end = new Date(Date.UTC(y,m + 1,Math.min(d,daysNextMonth)));
  assert(end.getTime() > first.getTime(), "Invalid billing period");
  return {start: first.toISOString(), end: end.toISOString()};
}

async function mustRecordProgress(admin: Admin, userId: string, attemptId: string, updates: {
  customerId?: string; cardId?: string; subscriptionId?: string;
}) {
  const {data, error} = await admin.rpc("gallaspy_record_standard_enrollment_progress", {
    p_user_id: userId,
    p_attempt_id: attemptId,
    p_customer_id: updates.customerId ?? null,
    p_card_id: updates.cardId ?? null,
    p_subscription_id: updates.subscriptionId ?? null,
  });
  assert(!error && data === true, "Could not durably record Square enrollment progress; manual reconciliation required");
}

async function establishLocalSubscription(admin: Admin, userId: string, values: {
  square_customer_id: string; square_subscription_id: string;
  current_period_start: string; current_period_end: string;
}) {
  const {data: previous, error: lookupError} = await admin.from("gallaspy_standard_subscriptions")
    .select("id,user_id,square_subscription_id,subscription_status")
    .eq("user_id", userId).maybeSingle();
  assert(!lookupError, "Could not inspect local subscription");
  const payload = {
    user_id: userId, ...values,
    subscription_status: "pending", monthly_amount_cents: 10000, currency: "USD",
  };
  if (previous) {
    assert(previous.subscription_status === "pending" && !previous.square_subscription_id,
      "Existing membership subscription requires manual review");
    const {data, error} = await admin.from("gallaspy_standard_subscriptions")
      .update(payload).eq("id", previous.id).eq("user_id", userId)
      .eq("subscription_status", "pending")
      .is("square_subscription_id", null).select("id").maybeSingle();
    assert(!error && data?.id === previous.id, "Could not safely link local subscription; manual reconciliation required");
  } else {
    const {error} = await admin.from("gallaspy_standard_subscriptions").insert(payload);
    assert(!error, "Could not link local subscription; manual reconciliation required");
  }
}

/**
 * RETIRED LEGACY ENROLLMENT SERVICE.
 *
 * The previous implementation charged $100/month without accounting
 * for the required $250 initiation fee and did not support Annual
 * Membership.
 *
 * This function is deliberately disabled. It must not be used for
 * payment processing or membership activation.
 */
export async function enrollStandardMemberSandbox(
  _admin: Admin,
  _args: EnrollmentRequest
): Promise<{
  status: "awaiting_verified_payment";
  subscriptionId: string;
}> {
  throw new Error(
    "Legacy Standard Membership enrollment is retired; verified plan-aware enrollment is required"
  );
}
