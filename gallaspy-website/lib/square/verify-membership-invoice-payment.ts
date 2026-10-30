/**
 * Stage B2B: verified Square invoice-to-payment linkage.
 * No database writes, membership activation, or payment creation.
 * The event handler must still verify the signed webhook and select an
 * existing Gallaspy enrollment before calling this function.
 */
import { getSquareMembershipConfig, retrieveSquareMembershipRecord } from "./membership-client";
import { verifyStandardMembershipBilling } from "./verify-membership-billing";

type SquareOrder = {
  id?: string;
  location_id?: string;
  tenders?: Array<{ id?: string; payment_id?: string; amount_money?: { amount?: number; currency?: string } }>;
};

export async function verifyStandardMembershipInvoicePayment(
  invoiceId: string,
  subscriptionId: string,
  customerId: string
) {
  // The invoice-to-order-to-payment chain cannot be trusted based on a
  // webhook payload alone. Re-fetch all records from Square.
  const invoiceResponse = await retrieveSquareMembershipRecord("invoices", invoiceId) as {
    invoice?: { id?: string; subscription_id?: string; order_id?: string; location_id?: string; primary_recipient?: { customer_id?: string }; status?: string };
  };
  const invoice = invoiceResponse?.invoice;
  const config = getSquareMembershipConfig();
  if (!invoice || invoice.id !== invoiceId ||
      invoice.subscription_id !== subscriptionId ||
      invoice.location_id !== config.locationId ||
      invoice.primary_recipient?.customer_id !== customerId ||
      invoice.status !== "PAID" ||
      !invoice.order_id || !/^[A-Za-z0-9_-]+$/.test(invoice.order_id)) {
    throw new Error("Invoice is not a paid, linked Gallaspy subscription invoice");
  }
  const orderResponse = await retrieveSquareMembershipRecord("orders", invoice.order_id) as {
    order?: SquareOrder;
  };
  const order = orderResponse?.order;
  if (!order || order.id !== invoice.order_id ||
      order.location_id !== config.locationId ||
      !Array.isArray(order.tenders) || order.tenders.length !== 1) {
    throw new Error("Order does not contain exactly one eligible Square tender");
  }
  const tender = order.tenders[0];
  // Square Order tenders may carry payment_id. Use only that verified ID,
  // not a guess based on customer name, order number or webhook content.
  const paymentId = tender.payment_id;
  if (!paymentId || !/^[A-Za-z0-9_-]+$/.test(paymentId) ||
      tender.amount_money?.amount !== 10000 ||
      tender.amount_money?.currency !== "USD") {
    throw new Error("Order tender cannot establish a $100 Square payment");
  }
  const verified = await verifyStandardMembershipBilling(
    subscriptionId, customerId, invoiceId, paymentId
  );
  if (verified.invoice.order_id !== order.id ||
      verified.payment.order_id !== order.id) {
    throw new Error("Square invoice and payment do not reference the same order");
  }
  return {
    squareSubscriptionId: subscriptionId,
    squareCustomerId: customerId,
    squareInvoiceId: invoiceId,
    squarePaymentId: paymentId,
    paidAt: verified.payment.created_at,
    amountCents: 10000,
    currency: "USD" as const,
  };
}
