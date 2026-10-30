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

/** Returns PENDING only. Never activates a membership or stores raw card data. */
export async function enrollStandardMemberSandbox(admin: Admin, args: EnrollmentRequest): Promise<{
  status: "awaiting_verified_payment"; subscriptionId: string;
}> {
  const square = getSquareMembershipConfig();
  assert(square.environment === "sandbox" && process.env.SQUARE_MEMBERSHIP_ENROLLMENT_ENABLED === "true",
    "Standard enrollment not enabled for sandbox testing");
  assert(UUID.test(args.userId), "Invalid user identity");
  assert(args.consent === true, "Recurring billing consent required");
  assert(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.email) && args.email.length <= 254, "Verified email required");
  assert(typeof args.sourceId === "string" && /^[A-Za-z0-9:._-]{8,512}$/.test(args.sourceId),
    "Secure Square card token required");
  const person = splitName(args.fullName);
  const planId = process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;
  assert(!!planId && SQUARE_ID.test(planId), "Approved Standard Membership plan not configured");
  // Fail closed before creating a customer, saving a card or charging anything.
  await verifyStandardMembershipPlan(planId);

  const {data: reservation, error: reservationError} = await admin.rpc(
    "gallaspy_reserve_standard_enrollment", {p_user_id: args.userId}
  );
  assert(!reservationError && Array.isArray(reservation) && reservation.length === 1,
    "Enrollment reservation unavailable");
  const attempt = reservation[0] as Attempt;
  assert(attempt.enrollment_status === "reserved", "Enrollment is already in progress or requires review");
  assert(UUID.test(attempt.attempt_id) && UUID.test(attempt.idempotency_key),
    "Enrollment attempt cannot be identified safely");

  // Consent is saved BEFORE a claim and BEFORE any external Square creation.
  const {data: consent, error: consentReadError} = await admin.from("gallaspy_membership_billing_consents")
    .select("id,user_id,enrollment_attempt_id,terms_version,amount_cents,currency,billing_interval")
    .eq("enrollment_attempt_id", attempt.attempt_id).maybeSingle();
  assert(!consentReadError, "Could not verify saved billing consent");
  if (consent) {
    assert(consent.user_id === args.userId &&
      consent.terms_version === STANDARD_BILLING_TERMS_VERSION &&
      consent.amount_cents === 10000 && consent.currency === "USD" && consent.billing_interval === "monthly",
      "Billing consent conflict requires manual review");
  } else {
    const {error: consentError} = await admin.from("gallaspy_membership_billing_consents").insert({
      user_id: args.userId,
      enrollment_attempt_id: attempt.attempt_id,
      terms_version: STANDARD_BILLING_TERMS_VERSION,
      amount_cents: 10000,
      currency: "USD",
      billing_interval: "monthly",
    });
    assert(!consentError, "Could not record recurring billing consent");
  }

  const {data: claimed, error: claimError} = await admin.rpc("gallaspy_claim_standard_enrollment", {
    p_user_id: args.userId, p_attempt_id: attempt.attempt_id,
  });
  assert(!claimError && claimed === true, "Enrollment was already claimed or requires review");
  const baseKey = attempt.idempotency_key;
  // Each create call has a stable per-attempt key; no speculative re-creation
  // after timeouts. Recovery must reconcile Square using those same keys.
  const customerResult = await sendSquareMembershipRequest("customers", {
    idempotency_key: `cust-${baseKey}`,
    email_address: args.email, ...person, reference_id: args.userId,
  }) as {customer?: SquareCustomer};
  const customer = customerResult?.customer;
  assert(customer && typeof customer.id === "string" && SQUARE_ID.test(customer.id) &&
    customer.email_address?.toLowerCase() === args.email.toLowerCase(),
    "Square returned an unexpected customer; manual reconciliation required");
  await mustRecordProgress(admin,args.userId,attempt.attempt_id,{customerId: customer.id});

  const cardResult = await sendSquareMembershipRequest("cards", {
    idempotency_key: `card-${baseKey}`,
    source_id: args.sourceId,
    card: {customer_id: customer.id, cardholder_name: args.fullName.trim()},
  }) as {card?: SquareCard};
  const card = cardResult?.card;
  assert(card && typeof card.id === "string" && SQUARE_CARD_ID.test(card.id) &&
    card.customer_id === customer.id && card.enabled !== false,
    "Square returned an unexpected saved card; manual reconciliation required");
  await mustRecordProgress(admin,args.userId,attempt.attempt_id,{cardId: card.id});

  // Square may charge immediately here. Never activate based on this response.
  const subscriptionResult = await sendSquareMembershipRequest("subscriptions", {
    idempotency_key: baseKey,
    location_id: square.locationId,
    customer_id: customer.id,
    card_id: card.id,
    plan_variation_id: planId,
    timezone: "UTC",
  }) as {subscription?: SquareSubscription};
  const sub = subscriptionResult?.subscription;
  assert(sub && typeof sub.id === "string" && SQUARE_ID.test(sub.id) &&
    sub.customer_id === customer.id && sub.card_id === card.id &&
    sub.location_id === square.locationId && sub.plan_variation_id === planId &&
    sub.price_override_money == null &&
    ["ACTIVE","PENDING"].includes(sub.status ?? "") && sub.timezone === "UTC",
    "Square returned an unexpected subscription; manual reconciliation required");
  // Record provider ID first, so a timeout linking the local record can be
  // recovered without accidentally generating another charge.
  await mustRecordProgress(admin,args.userId,attempt.attempt_id,{subscriptionId:sub.id});
  const dates = initialMonthlyUtcPeriod(sub.start_date ?? "");
  await establishLocalSubscription(admin,args.userId,{
    square_customer_id: customer.id,
    square_subscription_id: sub.id,
    current_period_start: dates.start,
    current_period_end: dates.end,
  });
  return {status: "awaiting_verified_payment", subscriptionId: sub.id};
}
