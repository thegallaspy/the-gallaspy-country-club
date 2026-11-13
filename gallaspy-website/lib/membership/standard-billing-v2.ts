/**
 * THE GALLASPY GOLF CLUB
 * Shared Standard Membership billing model.
 *
 * Pure functions only. No payments or database writes.
 * Does not activate enrollment.
 */

import {
  getStandardMembershipQuote,
  isStandardMembershipPlan,
  type StandardMembershipPlan,
} from "./standard-plan-policy";

export type StandardBillingInterval = "monthly" | "annual";

export type StandardBillingDetails = Readonly<{
  plan: StandardMembershipPlan;
  initiationFeeCents: number;
  initialPaymentCents: number;
  renewalAmountCents: number;
  renewalInterval: StandardBillingInterval;
  currency: "USD";
}>;

export function getStandardBillingDetails(
  plan: StandardMembershipPlan
): StandardBillingDetails {
  const quote = getStandardMembershipQuote(plan);

  const expected = plan === "monthly"
    ? {
        initiationFeeCents: 25000,
        initialPaymentCents: 35000,
        renewalAmountCents: 10000,
        renewalInterval: "monthly" as const,
      }
    : {
        initiationFeeCents: 0,
        initialPaymentCents: 100000,
        renewalAmountCents: 100000,
        renewalInterval: "annual" as const,
      };

  if (
    quote.initiationFeeCents !== expected.initiationFeeCents ||
    quote.initialPaymentCents !== expected.initialPaymentCents ||
    quote.renewalInterval !== expected.renewalInterval
  ) {
    throw new Error("Standard Membership policy mismatch");
  }

  return Object.freeze({
    plan,
    ...expected,
    currency: "USD" as const,
  });
}

export function resolveStandardBillingDetails(
  value: unknown
): StandardBillingDetails | null {
  if (!isStandardMembershipPlan(value)) return null;
  return getStandardBillingDetails(value);
}

export function matchesStandardBilling(
  plan: StandardMembershipPlan,
  input: {
    initiationFeeCents: unknown;
    initialPaymentCents: unknown;
    renewalAmountCents: unknown;
    renewalInterval: unknown;
  }
): boolean {
  const expected = getStandardBillingDetails(plan);

  return (
    input.initiationFeeCents === expected.initiationFeeCents &&
    input.initialPaymentCents === expected.initialPaymentCents &&
    input.renewalAmountCents === expected.renewalAmountCents &&
    input.renewalInterval === expected.renewalInterval
  );
}
