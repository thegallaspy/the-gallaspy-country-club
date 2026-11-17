import type { SupabaseClient } from "@supabase/supabase-js";

import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";

import { getStandardMembershipSquarePlan } from "./standard-membership-config";
import { reconcileMembershipInvoiceV2 } from "./reconcile-membership-invoice-v2";

export async function dispatchMembershipInvoiceV2(
  admin: SupabaseClient,
  invoiceId: string
) {
  const config = getSquareMembershipConfig();

  if (
    config.environment !== "sandbox" ||
    process.env.GALLASPY_MEMBERSHIP_V2_WEBHOOK_ENABLED !== "true"
  ) {
    throw new Error("Billing V2 webhook testing disabled");
  }

  const response = await retrieveSquareMembershipRecord(
    "invoices", invoiceId
  ) as {
    invoice?: {
      id?: string;
      subscription_id?: string;
    };
  };

  const invoice = response.invoice;

  if (!invoice || invoice.id !== invoiceId) {
    throw new Error("Invoice identity verification failed");
  }

  if (!invoice.subscription_id) {
    return "ignored";
  }

  const subscriptionId = invoice.subscription_id;

  const subResponse = await retrieveSquareMembershipRecord(
    "subscriptions", subscriptionId
  ) as {
    subscription?: {
      id?: string;
      location_id?: string;
      plan_variation_id?: string;
    };
  };

  const sub = subResponse.subscription;

  if (
    !sub ||
    sub.id !== subscriptionId ||
    sub.location_id !== config.locationId
  ) {
    throw new Error("Subscription identity verification failed");
  }

  const monthly = getStandardMembershipSquarePlan("monthly");
  const annual = getStandardMembershipSquarePlan("annual");

  if (
    sub.plan_variation_id !== monthly.planVariationId &&
    sub.plan_variation_id !== annual.planVariationId
  ) {
    return "ignored";
  }

  const result = await reconcileMembershipInvoiceV2(
    admin,
    invoiceId,
    subscriptionId
  );

  if (!result.membershipActive) {
    throw new Error(
      "Verified membership payment requires reconciliation"
    );
  }

  return result.paymentStatus;
}
