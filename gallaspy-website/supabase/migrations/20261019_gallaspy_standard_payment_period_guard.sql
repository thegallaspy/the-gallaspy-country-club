-- The Gallaspy Golf Club: Stage B2C.
-- Enforce at most one Square membership payment entry for any known local
-- billing period. This is intentionally conservative: multiple charges in
-- a period, including replacement charges after a refund, require review.
-- Requires manual review and execution in Supabase SQL Editor. The installer
-- only copies this file; it DOES NOT apply database changes.
-- A unique payment ID constraint already exists separately.
CREATE UNIQUE INDEX IF NOT EXISTS
  gallaspy_standard_payment_one_per_period_idx
ON public.gallaspy_subscription_payments
  (subscription_id, billing_period_start, billing_period_end)
WHERE billing_period_start IS NOT NULL
  AND billing_period_end IS NOT NULL;
