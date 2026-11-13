-- THE GALLASPY GOLF CLUB
-- BILLING V2 - EXACT CONSTRAINT MIGRATION
--
-- REVIEW ONLY. DO NOT APPLY TO PRODUCTION.
-- Requires verified staging project, approved legal
-- documents, tested enrollment and webhook consumers.
--
-- This draft preserves all existing user, membership,
-- subscription, and payment records.

BEGIN;

-- 1. Extend subscription records.

ALTER TABLE public.gallaspy_standard_subscriptions
  ADD COLUMN membership_plan text NOT NULL DEFAULT 'monthly',
  ADD COLUMN renewal_amount_cents integer NOT NULL DEFAULT 10000,
  ADD COLUMN renewal_interval text NOT NULL DEFAULT 'monthly';

-- Legacy field is retained for monthly compatibility.
-- Annual subscriptions use NULL, never a false $100 amount.

ALTER TABLE public.gallaspy_standard_subscriptions
  ALTER COLUMN monthly_amount_cents DROP NOT NULL,
  ALTER COLUMN monthly_amount_cents DROP DEFAULT;

ALTER TABLE public.gallaspy_standard_subscriptions
  DROP CONSTRAINT
    gallaspy_standard_subscriptions_monthly_amount_cents_check;

ALTER TABLE public.gallaspy_standard_subscriptions
  ADD CONSTRAINT gallaspy_subscription_plan_v2_check
  CHECK (
    (
      membership_plan = 'monthly'
      AND renewal_amount_cents = 10000
      AND renewal_interval = 'monthly'
      AND monthly_amount_cents = 10000
    )
    OR
    (
      membership_plan = 'annual'
      AND renewal_amount_cents = 100000
      AND renewal_interval = 'annual'
      AND monthly_amount_cents IS NULL
    )
  );

-- 2. Extend recurring billing consent.

ALTER TABLE public.gallaspy_membership_billing_consents
  ADD COLUMN membership_plan text NOT NULL DEFAULT 'monthly';

ALTER TABLE public.gallaspy_membership_billing_consents
  DROP CONSTRAINT
    gallaspy_membership_billing_consents_amount_cents_check;

ALTER TABLE public.gallaspy_membership_billing_consents
  DROP CONSTRAINT
    gallaspy_membership_billing_consents_billing_interval_check;

ALTER TABLE public.gallaspy_membership_billing_consents
  ADD CONSTRAINT gallaspy_billing_consent_plan_v2_check
  CHECK (
    (
      membership_plan = 'monthly'
      AND amount_cents = 10000
      AND billing_interval = 'monthly'
    )
    OR
    (
      membership_plan = 'annual'
      AND amount_cents = 100000
      AND billing_interval = 'annual'
    )
  );

-- 3. Existing RLS, foreign keys, uniqueness constraints,
-- payment history, and membership safeguards remain intact.

-- REHEARSAL ONLY: all changes are rolled back.
ROLLBACK;
