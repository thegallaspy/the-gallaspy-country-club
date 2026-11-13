/**
 * THE GALLASPY GOLF CLUB
 * Standard Membership pricing policy.
 *
 * Prices are approved business terms.
 * Payment and legal-signature integration are NOT approved for launch.
 *
 * Never treat this file as evidence that Square can safely charge
 * the displayed initial or renewal amounts.
 */

export type StandardMembershipPlan = "monthly" | "annual";

export type StandardMembershipQuote = Readonly<{
  plan: StandardMembershipPlan;
  initiationFeeCents: number;
  initialPaymentCents: number;
  renewalAmountCents: number;
  renewalInterval: "monthly" | "annual";
  currency: "USD";
}>;

const STANDARD_MEMBERSHIP_QUOTES = {
  monthly: {
    plan: "monthly",
    initiationFeeCents: 25000,
    initialPaymentCents: 35000,
    renewalAmountCents: 10000,
    renewalInterval: "monthly",
    currency: "USD",
  },
  annual: {
    plan: "annual",
    initiationFeeCents: 0,
    initialPaymentCents: 100000,
    renewalAmountCents: 100000,
    renewalInterval: "annual",
    currency: "USD",
  },
} as const satisfies Record<
  StandardMembershipPlan,
  StandardMembershipQuote
>;

/**
 * This must remain false until legal documents, signature evidence,
 * Square pricing, initial charges, renewals, webhooks, and recovery
 * have been reviewed and tested.
 */
export const STANDARD_MEMBERSHIP_LIVE_ENROLLMENT_READY = false;

export function isStandardMembershipPlan(
  value: unknown
): value is StandardMembershipPlan {
  return value === "monthly" || value === "annual";
}

export function getStandardMembershipQuote(
  plan: StandardMembershipPlan
): StandardMembershipQuote {
  return STANDARD_MEMBERSHIP_QUOTES[plan];
}

export function assertStandardMembershipQuote(
  plan: unknown,
  initialPaymentCents: unknown,
  renewalAmountCents: unknown
): StandardMembershipQuote {
  if (!isStandardMembershipPlan(plan)) {
    throw new Error("Unsupported Standard Membership plan");
  }

  const expected = getStandardMembershipQuote(plan);

  if (
    initialPaymentCents !== expected.initialPaymentCents ||
    renewalAmountCents !== expected.renewalAmountCents
  ) {
    throw new Error("Standard Membership pricing mismatch");
  }

  return expected;
}
