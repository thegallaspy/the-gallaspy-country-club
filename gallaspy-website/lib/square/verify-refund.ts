export type VerifiedSquareRefund = {
  id: string;
  paymentId: string;
  status: string;
  amountCents: number;
  currency: string;
};

type SquareRefundResponse = {
  refund?: {
    id?: string;
    payment_id?: string;
    status?: string;
    amount_money?: {
      amount?: number;
      currency?: string;
    };
  };
};

export async function verifySquareRefund(
  refundId: string
): Promise<VerifiedSquareRefund> {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  const environment =
    process.env.SQUARE_ENVIRONMENT ?? "sandbox";

  if (!accessToken) {
    throw new Error("Square access token is not configured");
  }

  if (!/^[A-Za-z0-9_-]{1,255}$/.test(refundId)) {
    throw new Error("Invalid Square refund ID");
  }

  const baseUrl =
    environment === "production"
      ? "https://connect.squareup.com"
      : "https://connect.squareupsandbox.com";

  const response = await fetch(
    `${baseUrl}/v2/refunds/${encodeURIComponent(refundId)}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Square-Version": "2026-07-15",
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(
      `Square refund verification failed: HTTP ${response.status}`
    );
  }

  const data =
    (await response.json()) as SquareRefundResponse;

  const refund = data.refund;

  if (
    !refund ||
    refund.id !== refundId ||
    !refund.payment_id ||
    !refund.status ||
    !Number.isSafeInteger(refund.amount_money?.amount) ||
    (refund.amount_money?.amount ?? 0) <= 0 ||
    refund.amount_money?.currency !== "USD"
  ) {
    throw new Error("Square returned invalid refund information");
  }

  return {
    id: refund.id,
    paymentId: refund.payment_id,
    status: refund.status,
    amountCents: refund.amount_money!.amount!,
    currency: refund.amount_money.currency,
  };
}
