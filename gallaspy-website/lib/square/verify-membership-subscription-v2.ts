import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";

import { getStandardMembershipSquarePlan } from "./standard-membership-config";
import { verifyStandardMembershipPlan } from "./verify-membership-plan";
import type { StandardMembershipPlan } from "../membership/standard-plan-policy";

export async function verifyMembershipSubscriptionV2(
  subscriptionId: string,
  customerId: string,
  plan: StandardMembershipPlan
) {
  const config = getSquareMembershipConfig();
  const expected = getStandardMembershipSquarePlan(plan);

  await verifyStandardMembershipPlan(
    expected.planVariationId,
    plan
  );

  const response = await retrieveSquareMembershipRecord(
    "subscriptions",
    subscriptionId
  ) as {
    subscription?: {
      id?: string;
      customer_id?: string;
      location_id?: string;
      plan_variation_id?: string;
      status?: string;
      start_date?: string;
      charged_through_date?: string;
      price_override_money?: unknown;
    };
  };

  const sub = response?.subscription;

  if (
    !sub ||
    sub.id !== subscriptionId ||
    sub.customer_id !== customerId ||
    sub.location_id !== config.locationId ||
    sub.plan_variation_id !== expected.planVariationId ||
    sub.price_override_money != null ||
    sub.status !== "ACTIVE"
  ) {
    throw new Error("Membership subscription verification failed");
  }

  return {
    subscription: sub,
    plan,
    renewalAmountCents: expected.renewalAmountCents,
    renewalInterval: expected.renewalInterval,
    currency: expected.currency,
  };

  function subscription() {
    return sub;
  }
}
