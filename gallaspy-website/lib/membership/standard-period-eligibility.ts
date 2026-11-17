/**
 * THE GALLASPY GOLF CLUB
 * Pure paid-period eligibility checks.
 *
 * A local payment record must first be verified against Square
 * by the existing trusted reconciliation workflow.
 *
 * Does not authorize membership activation on its own.
 */

import {
  getStandardBillingDetails,
} from "./standard-billing-v2";

import type {
  StandardMembershipPlan,
} from "./standard-plan-policy";

type PaidPeriod = Readonly<{
  plan: StandardMembershipPlan;
  renewalAmountCents: number;
  renewalInterval: "monthly" | "annual";
  currency: string;
  subscriptionStatus: string;
  periodStart: string;
  periodEnd: string;
  paymentStatus: string;
  paymentAmountCents: number;
  paymentCurrency: string;
  paymentPeriodStart: string;
  paymentPeriodEnd: string;
}>;

export function isEligibleStandardPaidPeriod(
  input: PaidPeriod,
  now: number = Date.now()
): boolean {
  if (input.plan !== "monthly" && input.plan !== "annual") {
    return false;
  }

  const expected = getStandardBillingDetails(input.plan);

  if (
    input.renewalAmountCents !== expected.renewalAmountCents ||
    input.renewalInterval !== expected.renewalInterval ||
    input.currency !== "USD" ||
    !["active", "canceled"].includes(input.subscriptionStatus) ||
    input.paymentStatus !== "completed" ||
    input.paymentAmountCents !== expected.renewalAmountCents ||
    input.paymentCurrency !== "USD"
  ) {
    return false;
  }

  const start = Date.parse(input.periodStart);
  const end = Date.parse(input.periodEnd);
  const paidStart = Date.parse(input.paymentPeriodStart);
  const paidEnd = Date.parse(input.paymentPeriodEnd);

  return (
    Number.isFinite(now) &&
    Number.isFinite(start) &&
    Number.isFinite(end) &&
    Number.isFinite(paidStart) &&
    Number.isFinite(paidEnd) &&
    start < end &&
    start <= now &&
    now < end &&
    paidStart === start &&
    paidEnd === end
  );
}
