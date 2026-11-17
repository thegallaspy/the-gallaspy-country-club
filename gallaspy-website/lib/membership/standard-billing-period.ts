import type {
  StandardMembershipPlan
} from "./standard-plan-policy";

export function getInitialStandardBillingPeriod(
  plan: StandardMembershipPlan,
  startDate: string
) {
  if (plan !== "monthly" && plan !== "annual") {
    throw new Error("Invalid membership plan");
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(startDate)) {
    throw new Error("Invalid billing start date");
  }

  const start = new Date(startDate + "T00:00:00.000Z");

  if (
    !Number.isFinite(start.getTime()) ||
    start.toISOString().slice(0, 10) !== startDate
  ) {
    throw new Error("Invalid calendar date");
  }

  const months = plan === "monthly" ? 1 : 12;

  const year = start.getUTCFullYear();
  const month = start.getUTCMonth();
  const day = start.getUTCDate();

  const lastDay = new Date(
    Date.UTC(year, month + months + 1, 0)
  ).getUTCDate();

  const end = new Date(
    Date.UTC(
      year,
      month + months,
      Math.min(day, lastDay)
    )
  );

  return {
    periodStart: start.toISOString(),
    periodEnd: end.toISOString(),
    plan,
  };
}
