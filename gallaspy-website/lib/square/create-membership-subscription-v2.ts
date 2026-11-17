import { isProductionMembershipEnrollmentEnabled } from "./membership-client";
import {
  getSquareMembershipConfig,
  sendSquareMembershipRequest,
} from "./membership-client";

import { getStandardMembershipSquarePlan } from "./standard-membership-config";
import { verifyStandardMembershipPlan } from "./verify-membership-plan";
import type { StandardMembershipPlan } from "../membership/standard-plan-policy";

export async function createMembershipSubscriptionV2(
  args: {
    plan: StandardMembershipPlan;
    attemptId: string;
    customerId: string;
    cardId: string;
  }
) {
  const config = getSquareMembershipConfig();

  if (
    (config.environment !== "sandbox" && !isProductionMembershipEnrollmentEnabled()) ||
    process.env.SQUARE_MEMBERSHIP_ENROLLMENT_ENABLED !== "true"
  ) {
    throw new Error("Sandbox enrollment required");
  }

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(args.attemptId)) {
    throw new Error("Invalid enrollment attempt");
  }

  const expected = getStandardMembershipSquarePlan(args.plan);

  await verifyStandardMembershipPlan(
    expected.planVariationId,
    args.plan
  );

  const response = await sendSquareMembershipRequest(
    "subscriptions",
    {
      idempotency_key: "sub-" + args.attemptId,
      location_id: config.locationId,
      customer_id: args.customerId,
      card_id: args.cardId,
      plan_variation_id: expected.planVariationId,
      timezone: "UTC",
    }
  ) as {
    subscription?: {
      id?: string;
      customer_id?: string;
      card_id?: string;
      location_id?: string;
      plan_variation_id?: string;
      status?: string;
      start_date?: string;
    };
  };

  const sub = response?.subscription;

  if (
    !sub?.id ||
    sub.customer_id !== args.customerId ||
    sub.card_id !== args.cardId ||
    sub.location_id !== config.locationId ||
    sub.plan_variation_id !== expected.planVariationId
  ) {
    throw new Error("Subscription requires reconciliation");
  }

  return {
    subscriptionId: sub.id,
    plan: args.plan,
    status: sub.status,
    startDate: sub.start_date,
    membershipActive: false,
  };
}
