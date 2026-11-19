const allowedDestinations = new Set([
  "/my-gallaspy/home",
  "/my-gallaspy/rewards",
  "/my-gallaspy/benefits",
  "/host-a-round",
  "/membership/checkout",
  "/membership/checkout?plan=monthly",
  "/membership/checkout?plan=annual",
]);

export function myGallaspyDestination(requested: string | null, fallback: string) {
  if (!requested) return fallback;
  const sharedRound = /^\/host-a-round\?round=[a-f0-9]{8}(?:-[a-f0-9]{4}){3}-[a-f0-9]{12}#open-rounds$/i;
  return allowedDestinations.has(requested) || sharedRound.test(requested)
    ? requested
    : fallback;
}
