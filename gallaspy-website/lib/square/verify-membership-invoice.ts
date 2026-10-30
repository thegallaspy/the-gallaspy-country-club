import {
  getSquareMembershipConfig,
  retrieveSquareMembershipRecord,
} from "./membership-client";

type SquareInvoice = {
  id?: string;
  subscription_id?: string;
  location_id?: string;
  order_id?: string;
  scheduled_at?: string;
  payment_requests?: Array<{
    request_type?: string;
    total_completed_amount_money?: { amount?: number; currency?: string };
    due_date?: string;
    computed_amount_money?: {
      amount?: number;
      currency?: string;
    };
  }>;
  primary_recipient?: {
    customer_id?: string;
  };
  status?: string;
};

export async function verifyStandardMembershipInvoice(
  invoiceId: string,
  subscriptionId: string,
  customerId: string
): Promise<SquareInvoice> {
  const response = await retrieveSquareMembershipRecord(
    "invoices",
    invoiceId
  );

  if (!response || typeof response !== "object") {
    throw new Error("Invalid Square invoice response");
  }

  const invoice = (
    response as { invoice?: SquareInvoice }
  ).invoice;

  if (!invoice) {
    throw new Error("Square invoice record missing");
  }

  const config = getSquareMembershipConfig();

  if (
    invoice.id !== invoiceId ||
    invoice.subscription_id !== subscriptionId ||
    invoice.location_id !== config.locationId ||
    invoice.primary_recipient?.customer_id !== customerId ||
    invoice.status !== "PAID" ||
    !Array.isArray(invoice.payment_requests) ||
    invoice.payment_requests.length !== 1 ||
    invoice.payment_requests[0]?.request_type !== "BALANCE" ||
    invoice.payment_requests[0]?.computed_amount_money?.amount !== 10000 ||
    invoice.payment_requests[0]?.computed_amount_money?.currency !== "USD" ||
    invoice.payment_requests[0]?.total_completed_amount_money?.amount !== 10000 ||
    invoice.payment_requests[0]?.total_completed_amount_money?.currency !== "USD"
  ) {
    throw new Error(
      "Square invoice does not meet membership requirements"
    );
  }

  return invoice;
}
