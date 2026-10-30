import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";
import { verifyStandardMembershipPlan } from "./verify-membership-plan";
import { parseSquareBillingDate } from "./verify-membership-dates";

export type VerifiedSquareSubscription = {
  id: string;
  customer_id: string;
  location_id: string;
  status: string;
  plan_variation_id?: string;
  start_date?: string;
  charged_through_date?: string;
  canceled_date?: string;
  price_override_money?: {
    amount?: number;
    currency?: string;
  };
};

export async function verifyStandardMembershipSubscription(
  subscriptionId: string,
  expectedCustomerId: string
): Promise<VerifiedSquareSubscription> {
  const response = await retrieveSquareMembershipRecord(
    "subscriptions",
    subscriptionId
  );

  if (!response || typeof response !== "object") {
    throw new Error("Invalid Square subscription response");
  }

  const subscription = (
    response as { subscription?: Record<string, unknown> }
  ).subscription;

  if (!subscription || typeof subscription !== "object") {
    throw new Error("Square subscription record missing");
  }

  const config = getSquareMembershipConfig();
  const approvedPlanId =
    process.env.SQUARE_STANDARD_MEMBERSHIP_PLAN_VARIATION_ID;

  if (!approvedPlanId) {
    throw new Error("Approved Square membership plan is not configured");
  }

  if (
    subscription.id !== subscriptionId ||
    subscription.customer_id !== expectedCustomerId ||
    subscription.location_id !== config.locationId ||
    subscription.plan_variation_id !== approvedPlanId ||
    subscription.price_override_money != null ||
    subscription.status !== "ACTIVE"
  ) {
    throw new Error(
      "Square subscription does not meet membership requirements"
    );
  }

  await verifyStandardMembershipPlan(approvedPlanId);

  parseSquareBillingDate(
    subscription.start_date as string | undefined,
    "subscription start date"
  );

  if (subscription.charged_through_date != null) {
    parseSquareBillingDate(
      subscription.charged_through_date as string,
      "charged-through date"
    );
  }

  return subscription as VerifiedSquareSubscription;
}
