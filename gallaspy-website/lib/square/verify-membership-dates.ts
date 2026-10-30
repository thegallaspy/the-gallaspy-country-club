export function parseSquareBillingDate(
  value: string | undefined,
  fieldName: string
): string {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`Invalid Square ${fieldName}`);
  }

  const parsed = new Date(`${value}T00:00:00.000Z`);

  if (
    Number.isNaN(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== value
  ) {
    throw new Error(`Invalid Square ${fieldName}`);
  }

  return value;
}
