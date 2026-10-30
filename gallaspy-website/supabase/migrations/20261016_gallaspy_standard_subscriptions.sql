-- The Gallaspy Golf Club
-- Standard Membership: $100 per month.
-- Falcon Society remains application-based.

CREATE TABLE IF NOT EXISTS public.gallaspy_standard_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE
    REFERENCES auth.users(id) ON DELETE CASCADE,
  square_customer_id text,
  square_subscription_id text UNIQUE,
  subscription_status text NOT NULL DEFAULT 'pending'
    CHECK (subscription_status IN (
      'pending', 'active', 'past_due', 'canceled', 'expired'
    )),
  monthly_amount_cents integer NOT NULL DEFAULT 10000
    CHECK (monthly_amount_cents = 10000),
  currency text NOT NULL DEFAULT 'USD'
    CHECK (currency = 'USD'),
  current_period_start timestamptz,
  current_period_end timestamptz,
  cancel_at_period_end boolean NOT NULL DEFAULT false,
  canceled_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Protect subscription and billing records.
ALTER TABLE public.gallaspy_standard_subscriptions
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.gallaspy_standard_subscriptions
  FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.gallaspy_standard_subscriptions
  TO authenticated;

CREATE POLICY "Subscribers can read their own subscription"
  ON public.gallaspy_standard_subscriptions
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Subscription creation and updates must use trusted
-- server operations after payment verification.

-- Active subscriptions require provider identification
-- and a valid recorded billing period.
ALTER TABLE public.gallaspy_standard_subscriptions
  ADD CONSTRAINT gallaspy_active_subscription_check
  CHECK (
    subscription_status <> 'active'
    OR (
      square_subscription_id IS NOT NULL
      AND length(trim(square_subscription_id)) > 0
      AND current_period_start IS NOT NULL
      AND current_period_end IS NOT NULL
      AND current_period_end > current_period_start
    )
  );

-- Prevent reversed billing periods in any status.
ALTER TABLE public.gallaspy_standard_subscriptions
  ADD CONSTRAINT gallaspy_subscription_period_check
  CHECK (
    current_period_start IS NULL
    OR current_period_end IS NULL
    OR current_period_end > current_period_start
  );

-- Verified Standard Membership payment history.
-- Only trusted server operations may record payments.
CREATE TABLE IF NOT EXISTS public.gallaspy_subscription_payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id uuid NOT NULL
    REFERENCES public.gallaspy_standard_subscriptions(id),
  square_payment_id text NOT NULL UNIQUE,
  square_invoice_id text,
  billing_period_start timestamptz,
  billing_period_end timestamptz,
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  currency text NOT NULL DEFAULT 'USD',
  payment_status text NOT NULL
    CHECK (payment_status IN ('completed', 'refunded', 'partially_refunded')),
  paid_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Protect subscription payment history.
ALTER TABLE public.gallaspy_subscription_payments
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.gallaspy_subscription_payments
  FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.gallaspy_subscription_payments
  TO authenticated;

CREATE POLICY "Members can read their own subscription payments"
  ON public.gallaspy_subscription_payments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1
      FROM public.gallaspy_standard_subscriptions s
      WHERE s.id = subscription_id
        AND s.user_id = (SELECT auth.uid())
    )
  );

-- Standard Membership payments use USD.
ALTER TABLE public.gallaspy_subscription_payments
  ADD CONSTRAINT gallaspy_subscription_payment_currency_check
  CHECK (currency = 'USD');

-- Record the actual Square payment amount.
-- The $100 subscription price is enforced separately
-- when creating and verifying the billing subscription.

-- End-of-period cancellation requires a known period end.
ALTER TABLE public.gallaspy_standard_subscriptions
  ADD CONSTRAINT gallaspy_cancellation_period_check
  CHECK (
    cancel_at_period_end = false
    OR current_period_end IS NOT NULL
  );

-- Cancellation timestamps are recorded from verified
-- Square subscription events.

-- Reject invalid payment billing periods.
-- Allow missing dates until verified billing data is available.
ALTER TABLE public.gallaspy_subscription_payments
  ADD CONSTRAINT gallaspy_payment_billing_period_check
  CHECK (
    billing_period_start IS NULL
    OR billing_period_end IS NULL
    OR billing_period_end > billing_period_start
  );

-- Support reconciliation of Square invoices and payments.
-- Invoice IDs are not unique because an invoice may
-- be associated with more than one payment event.
CREATE INDEX IF NOT EXISTS
  gallaspy_subscription_payments_invoice_idx
  ON public.gallaspy_subscription_payments
  (square_invoice_id)
  WHERE square_invoice_id IS NOT NULL;
