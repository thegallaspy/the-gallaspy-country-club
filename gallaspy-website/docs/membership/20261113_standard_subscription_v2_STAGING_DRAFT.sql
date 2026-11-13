-- THE GALLASPY GOLF CLUB
-- STANDARD MEMBERSHIP SUBSCRIPTIONS V2
--
-- STAGING DRAFT ONLY. DO NOT APPLY TO PRODUCTION.
-- Review existing schema, records and migration history first.
-- Test rollback and all dependent application code in staging.
--
-- This migration must not be deployed independently of updated
-- mobile entitlement verification, invoice reconciliation,
-- Square plan validation, refunds, and cancellation handling.

BEGIN;

-- 1. Preserve existing monthly subscriptions while adding
--    explicit billing information for both membership plans.

ALTER TABLE public.gallaspy_standard_subscriptions
  ADD COLUMN membership_plan text NOT NULL DEFAULT 'monthly',
  ADD COLUMN renewal_amount_cents integer NOT NULL DEFAULT 10000,
  ADD COLUMN renewal_interval text NOT NULL DEFAULT 'monthly';

-- Existing monthly records inherit:
-- membership_plan = monthly
-- renewal_amount_cents = 10000
-- renewal_interval = monthly

-- 2. Retain legacy monthly_amount_cents for compatibility.
--    Annual subscriptions must use NULL for that legacy field,
--    not a misleading $100 monthly amount.

ALTER TABLE public.gallaspy_standard_subscriptions
  ALTER COLUMN monthly_amount_cents DROP NOT NULL;

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

-- 3. Extend recurring billing consent to annual membership.
--    Original monthly-only constraints must be reviewed
--    and explicitly replaced before applying this section.
--    Do not guess the names of deployed constraints.

-- PRE-IMPLEMENTATION REQUIRED:
-- Identify existing CHECK constraints on:
-- gallaspy_membership_billing_consents.amount_cents
-- gallaspy_membership_billing_consents.billing_interval
--
-- Replace monthly-only constraints before annual consent
-- can be inserted. Do not remove them without installing
-- equivalent plan-specific constraints.

ALTER TABLE public.gallaspy_membership_billing_consents
  ADD COLUMN membership_plan text NOT NULL DEFAULT 'monthly';

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

-- 4. Existing ownership, RLS, payment identity and
-- subscription lifecycle constraints remain unchanged.

COMMIT;

-- IMPORTANT:
-- This is a design draft, NOT a deployable migration.
-- Existing monthly-only billing consent constraints still
-- prevent annual inserts. Resolve them in staging first.
-- Square webhook and mobile consumers must be updated.
-- No enrollment should activate from this file alone.
