export function parseSquarePaymentTimestamp(
  value: string | undefined,
  fieldName: string
): string {
  if (!value || typeof value !== "string") {
    throw new Error(`Missing Square ${fieldName}`);
  }

  if (
    !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(value)
  ) {
    throw new Error(`Invalid Square ${fieldName} format`);
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`Invalid Square ${fieldName}`);
  }

  return parsed.toISOString();
}
