import type {
  StandardMembershipPlan
} from "../membership/standard-plan-policy";

export function getStandardMembershipSquarePlan(
  plan: StandardMembershipPlan
) {
  const monthly =
    process.env.SQUARE_STANDARD_MONTHLY_PLAN_VARIATION_ID ||
    process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;

  const annual =
    process.env.SQUARE_STANDARD_ANNUAL_PLAN_VARIATION_ID;

  if (plan !== "monthly" && plan !== "annual") {
    throw new Error("Invalid membership plan");
  }

  if (!monthly || !annual || monthly === annual) {
    throw new Error("Membership plan configuration incomplete");
  }

  const planVariationId = plan === "monthly" ? monthly : annual;

  if (!/^[A-Za-z0-9_-]+$/.test(planVariationId)) {
    throw new Error("Invalid Square plan variation ID");
  }

  return {
    plan,
    planVariationId,
    currency: "USD" as const,
    initiationFeeCents: plan === "monthly" ? 25000 : 0,
    renewalAmountCents: plan === "monthly" ? 10000 : 100000,
    renewalInterval: plan,
    initialPaymentCents: plan === "monthly" ? 35000 : 100000,
  };
}
