import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";
import { parseSquarePaymentTimestamp } from "./verify-membership-timestamps";

type SquarePayment = {
  id?: string;
  status?: string;
  location_id?: string;
  order_id?: string;
  customer_id?: string;
  created_at?: string;
  updated_at?: string;
  refunded_money?: { amount?: number; currency?: string };
  amount_money?: {
    amount?: number;
    currency?: string;
  };
};

export async function verifyStandardMembershipPayment(
  paymentId: string
): Promise<SquarePayment> {
  const response = await retrieveSquareMembershipRecord(
    "payments",
    paymentId
  );

  if (!response || typeof response !== "object") {
    throw new Error("Invalid Square payment response");
  }

  const payment = (response as {
    payment?: SquarePayment;
  }).payment;

  if (!payment) {
    throw new Error("Square payment record missing");
  }

  const config = getSquareMembershipConfig();

  if (
    payment.id !== paymentId ||
    payment.status !== "COMPLETED" ||
    payment.location_id !== config.locationId ||
    payment.amount_money?.amount !== 10000 ||
    payment.amount_money?.currency !== "USD" ||
    (payment.refunded_money?.amount ?? 0) > 0 ||
    (payment.refunded_money != null &&
      (!Number.isSafeInteger(payment.refunded_money.amount) ||
       payment.refunded_money.amount! < 0 ||
       payment.refunded_money.currency !== "USD"))
  ) {
    throw new Error(
      "Square payment does not meet membership requirements"
    );
  }

  parseSquarePaymentTimestamp(
    payment.created_at,
    "payment creation timestamp"
  );

  return payment;
}
