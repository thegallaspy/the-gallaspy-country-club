import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";

import { getStandardMembershipSquarePlan } from "./standard-membership-config";
import { verifyMembershipSubscriptionV2 } from "./verify-membership-subscription-v2";
import type { StandardMembershipPlan } from "../membership/standard-plan-policy";

export async function verifyMembershipInvoicePaymentV2(
  invoiceId: string,
  subscriptionId: string,
  customerId: string,
  plan: StandardMembershipPlan
) {
  const cfg = getSquareMembershipConfig();
  const expected = getStandardMembershipSquarePlan(plan);

  await verifyMembershipSubscriptionV2(
    subscriptionId,
    customerId,
    plan
  );

  const subscriptionResponse =
    await retrieveSquareMembershipRecord(
      "subscriptions", subscriptionId
    ) as {
      subscription?: {
        id?: string;
        invoice_ids?: string[];
        start_date?: string;
        charged_through_date?: string;
        timezone?: string;
        customer_id?: string;
        location_id?: string;
        status?: string;
        price_override_money?: unknown;
      };
    };

  if (
    subscriptionResponse.subscription?.id !== subscriptionId ||
    !subscriptionResponse.subscription.invoice_ids?.includes(invoiceId)
  ) {
    throw new Error("Invoice subscription mismatch");
  }

  const billing = subscriptionResponse.subscription;

  if (
    !billing ||
    billing.customer_id !== customerId ||
    billing.location_id !== cfg.locationId ||
    billing.status !== "ACTIVE" ||
    billing.price_override_money != null ||
    billing.timezone !== "UTC" ||
    typeof billing.start_date !== "string" ||
    typeof billing.charged_through_date !== "string"
  ) {
    throw new Error("Subscription billing evidence unavailable");
  }

  function parseCalendarDate(value: string): Date {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      throw new Error("Invalid provider billing date");
    }

    const date = new Date(value + "T00:00:00.000Z");

    if (
      !Number.isFinite(date.getTime()) ||
      date.toISOString().slice(0, 10) !== value
    ) {
      throw new Error("Invalid provider calendar date");
    }

    return date;
  }

  const subscriptionStart = parseCalendarDate(
    billing.start_date
  );

  const chargedThrough = parseCalendarDate(
    billing.charged_through_date
  );

  const exclusivePeriodEnd = new Date(
    chargedThrough.getTime() + 86400000
  );

  if (
    exclusivePeriodEnd.getTime() <= subscriptionStart.getTime()
  ) {
    throw new Error("Invalid Square billing period");
  }

  const invoiceResponse = await retrieveSquareMembershipRecord(
    "invoices", invoiceId
  ) as {
    invoice?: {
      id?: string;
      location_id?: string;
      subscription_id?: string;
      order_id?: string;
      status?: string;
      created_at?: string;
      primary_recipient?: {
        customer_id?: string;
      };
    };
  };

  const invoice = invoiceResponse.invoice;

  if (
    !invoice ||
    invoice.id !== invoiceId ||
    invoice.location_id !== cfg.locationId ||
    invoice.subscription_id !== subscriptionId ||
    invoice.primary_recipient?.customer_id !== customerId ||
    invoice.status !== "PAID" ||
    !invoice.order_id ||
    !invoice.created_at ||
    !Number.isFinite(Date.parse(invoice.created_at))
  ) {
    throw new Error("Invoice verification failed");
  }

  const orderResponse = await retrieveSquareMembershipRecord(
    "orders", invoice.order_id
  ) as {
    order?: {
      id?: string;
      location_id?: string;
      tenders?: Array<{
        payment_id?: string;
        amount_money?: {
          amount?: number;
          currency?: string;
        };
      }>;
    };
  };

  const order = orderResponse.order;

  if (
    !order ||
    order.id !== invoice.order_id ||
    order.location_id !== cfg.locationId ||
    !Array.isArray(order.tenders) ||
    order.tenders.length !== 1
  ) {
    throw new Error("Order verification failed");
  }

  const tender = order.tenders[0];

  if (
    !tender.payment_id ||
    tender.amount_money?.amount !== expected.renewalAmountCents ||
    tender.amount_money?.currency !== "USD"
  ) {
    throw new Error("Membership payment amount mismatch");
  }

  const paymentResponse = await retrieveSquareMembershipRecord(
    "payments", tender.payment_id
  ) as {
    payment?: {
      id?: string;
      order_id?: string;
      customer_id?: string;
      location_id?: string;
      status?: string;
      created_at?: string;
      amount_money?: {
        amount?: number;
        currency?: string;
      };
      refunded_money?: {
        amount?: number;
        currency?: string;
      };
    };
  };

  const payment = paymentResponse.payment;

  if (
    !payment ||
    payment.id !== tender.payment_id ||
    payment.order_id !== invoice.order_id ||
    payment.customer_id !== customerId ||
    payment.location_id !== cfg.locationId ||
    payment.status !== "COMPLETED" ||
    payment.amount_money?.amount !== expected.renewalAmountCents ||
    payment.amount_money?.currency !== "USD" ||
    (payment.refunded_money != null &&
      (payment.refunded_money.amount !== 0 ||
       payment.refunded_money.currency !== "USD")) ||
    !payment.created_at ||
    !Number.isFinite(Date.parse(payment.created_at))
  ) {
    throw new Error("Completed dues verification failed");
  }

  return {
    plan,
    squareSubscriptionId: subscriptionId,
    squareCustomerId: customerId,
    squareInvoiceId: invoiceId,
    squarePaymentId: payment.id,
    invoicedAt: invoice.created_at,
    subscriptionStart: subscriptionStart.toISOString(),
    providerPeriodEnd: exclusivePeriodEnd.toISOString(),
    isLatestInvoice: billing.invoice_ids?.[0] === invoiceId,
    paidAt: payment.created_at,
    amountCents: expected.renewalAmountCents,
    currency: "USD" as const,
  };
}
