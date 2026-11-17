import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";

export async function verifyMembershipInitiation(
  paymentId: string,
  customerId: string,
  attemptId: string
) {
  const config = getSquareMembershipConfig();

  const response = await retrieveSquareMembershipRecord(
    "payments",
    paymentId
  ) as {
    payment?: {
      id?: string;
      status?: string;
      customer_id?: string;
      location_id?: string;
      reference_id?: string;
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

  const payment = response?.payment;

  if (
    !payment ||
    payment.id !== paymentId ||
    payment.status !== "COMPLETED" ||
    payment.customer_id !== customerId ||
    payment.location_id !== config.locationId ||
    payment.reference_id !== attemptId ||
    payment.amount_money?.amount !== 25000 ||
    payment.amount_money?.currency !== "USD" ||
    (payment.refunded_money != null &&
      (payment.refunded_money.amount !== 0 ||
       payment.refunded_money.currency !== "USD")) ||
    !payment.created_at ||
    !Number.isFinite(Date.parse(payment.created_at))
  ) {
    throw new Error(
      "Initiation payment verification failed"
    );
  }

  return {
    paymentId,
    customerId,
    attemptId,
    amountCents: 25000,
    currency: "USD" as const,
    paidAt: payment.created_at,
  };
}
