/**
 * Current calendar date in Atlanta, Georgia.
 * Automatically handles Eastern Standard and Daylight Time.
 */
export function getAtlantaTodayISO(
  now: Date = new Date(),
): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);

  const get = (type: string) =>
    parts.find((part) => part.type === type)?.value;

  const year = get("year");
  const month = get("month");
  const day = get("day");

  if (!year || !month || !day) {
    throw new Error("Cannot determine Atlanta date.");
  }

  return `${year}-${month}-${day}`;
}
