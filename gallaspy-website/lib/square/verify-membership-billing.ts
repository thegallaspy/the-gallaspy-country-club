import { verifyStandardMembershipPayment } from "./verify-membership-payment";
import { verifyStandardMembershipInvoice } from "./verify-membership-invoice";
import { verifyStandardMembershipSubscription } from "./verify-membership-subscription";

export async function verifyStandardMembershipBilling(
  subscriptionId: string,
  customerId: string,
  invoiceId: string,
  paymentId: string
) {
  const subscription = await verifyStandardMembershipSubscription(
    subscriptionId,
    customerId
  );

  const invoice = await verifyStandardMembershipInvoice(
    invoiceId,
    subscriptionId,
    customerId
  );

  const payment = await verifyStandardMembershipPayment(paymentId);

  if (
    !invoice.order_id ||
    !payment.order_id ||
    invoice.order_id !== payment.order_id ||
    !payment.customer_id ||
    payment.customer_id !== subscription.customer_id
  ) {
    throw new Error(
      "Square payment, invoice, and subscription do not match"
    );
  }

  return { subscription, invoice, payment };
}
