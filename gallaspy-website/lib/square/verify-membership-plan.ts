import { retrieveSquareMembershipPlan } from "./membership-client";

export type StandardMembershipBillingPlan =
  | "monthly"
  | "annual";

const APPROVED_PLANS = {
  monthly: {
    cadence: "MONTHLY",
    amountCents: 10000,
  },
  annual: {
    cadence: "ANNUAL",
    amountCents: 100000,
  },
} as const;

/**
 * Verify the actual Square Catalog subscription plan
 * before allowing the enrollment process to create
 * a subscription.
 *
 * Existing callers default to the approved $100/month
 * plan. Annual enrollment must explicitly request "annual".
 *
 * This does not collect payments or activate membership.
 */
export async function verifyStandardMembershipPlan(
  planVariationId: string,
  billingPlan: StandardMembershipBillingPlan = "monthly"
): Promise<void> {
  if (
    typeof planVariationId !== "string" ||
    !/^[A-Za-z0-9_-]+$/.test(planVariationId)
  ) {
    throw new Error("Invalid Square membership plan ID");
  }

  const expected = APPROVED_PLANS[billingPlan];

  if (!expected) {
    throw new Error("Unsupported membership billing plan");
  }

  const response = await retrieveSquareMembershipPlan(
    planVariationId
  );

  if (!response || typeof response !== "object") {
    throw new Error("Invalid Square Catalog response");
  }

  const object = (
    response as {
      object?: Record<string, unknown>;
    }
  ).object;

  if (
    !object ||
    object.id !== planVariationId ||
    object.type !== "SUBSCRIPTION_PLAN_VARIATION" ||
    object.is_deleted === true
  ) {
    throw new Error("Invalid Square membership plan variation");
  }

  const variation = object.subscription_plan_variation_data as
    | { phases?: unknown }
    | undefined;

  const phases = variation?.phases;

  if (!Array.isArray(phases) || phases.length !== 1) {
    throw new Error(
      "Membership plan must have exactly one recurring billing phase"
    );
  }

  const phase = phases[0] as
    | {
        cadence?: string;
        periods?: number | null;
        pricing?: {
          type?: string;
          price_money?: {
            amount?: number;
            currency?: string;
          };
        };
      }
    | null
    | undefined;

  if (
    !phase ||
    phase.cadence !== expected.cadence ||
    phase.pricing?.type !== "STATIC" ||
    phase.pricing.price_money?.amount !== expected.amountCents ||
    phase.pricing.price_money.currency !== "USD" ||
    phase.periods != null
  ) {
    throw new Error(
      `Square plan does not match approved ${billingPlan} Standard Membership billing terms`
    );
  }
}
