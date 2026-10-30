-- The Gallaspy Golf Club
-- Standard Membership recurring billing consent

CREATE TABLE IF NOT EXISTS public.gallaspy_membership_billing_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  enrollment_attempt_id uuid NOT NULL
    REFERENCES public.gallaspy_standard_enrollment_attempts(id),
  terms_version text NOT NULL,
  amount_cents integer NOT NULL DEFAULT 10000
    CHECK (amount_cents = 10000),
  currency text NOT NULL DEFAULT 'USD'
    CHECK (currency = 'USD'),
  billing_interval text NOT NULL DEFAULT 'monthly'
    CHECK (billing_interval = 'monthly'),
  accepted_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT gallaspy_billing_consent_attempt_unique
    UNIQUE (enrollment_attempt_id)
);

ALTER TABLE public.gallaspy_membership_billing_consents
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.gallaspy_membership_billing_consents
  FROM PUBLIC, anon, authenticated;

GRANT SELECT, INSERT, UPDATE, DELETE
  ON public.gallaspy_membership_billing_consents
  TO service_role;
