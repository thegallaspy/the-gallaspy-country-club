/**
 * THE GALLASPY GOLF CLUB — Billing V2
 * Pure billing-intent model. No Square requests or database writes.
 *
 * This is not a payment authorization or executable enrollment.
 * Provider IDs and verified payments must be persisted separately.
 */
import {
  getStandardBillingDetails
} from "./standard-billing-v2";

import type {
  StandardMembershipPlan
} from "./standard-plan-policy";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type StandardSquareBillingIntent = Readonly<{
  plan: StandardMembershipPlan;
  attemptId: string;
  currency: "USD";
  initialTotalCents: number;
  subscription: Readonly<{
    firstPeriodCents: number;
    renewalAmountCents: number;
    renewalInterval: "monthly" | "annual";
    idempotencyKey: string;
  }>;
  initiation: null | Readonly<{
    amountCents: 25000;
    idempotencyKey: string;
  }>;
}>;

export function buildStandardSquareBillingIntent(
  plan: StandardMembershipPlan,
  attemptId: string
): StandardSquareBillingIntent {
  if (typeof attemptId !== "string" || !UUID.test(attemptId)) {
    throw new Error("Valid enrollment attempt ID required");
  }

  const billing = getStandardBillingDetails(plan);

  const subscription = Object.freeze({
    firstPeriodCents: billing.renewalAmountCents,
    renewalAmountCents: billing.renewalAmountCents,
    renewalInterval: billing.renewalInterval,
    idempotencyKey: "sub-" + attemptId,
  });

  const initiation = billing.initiationFeeCents === 25000
    ? Object.freeze({
        amountCents: 25000 as const,
        idempotencyKey: "init-" + attemptId,
      })
    : null;

  const total = subscription.firstPeriodCents
    + (initiation?.amountCents ?? 0);

  if (total !== billing.initialPaymentCents) {
    throw new Error("Initial membership billing mismatch");
  }

  return Object.freeze({
    plan,
    attemptId,
    currency: "USD" as const,
    initialTotalCents: total,
    subscription,
    initiation,
  });
}
