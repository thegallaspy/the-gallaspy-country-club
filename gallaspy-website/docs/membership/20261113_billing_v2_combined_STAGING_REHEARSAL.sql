
-- THE GALLASPY GOLF CLUB
-- BILLING V2 COORDINATED STAGING REHEARSAL
--
-- DO NOT APPLY TO PRODUCTION.
-- Execute only against a verified disposable staging database.
-- No payment activation or membership authorization.
--
BEGIN;

DO $guard$
BEGIN
  IF to_regclass(
    'public.gallaspy_standard_enrollment_attempts'
  ) IS NULL
  OR to_regclass(
    'public.gallaspy_standard_subscriptions'
  ) IS NULL
  OR to_regclass(
    'public.gallaspy_membership_billing_consents'
  ) IS NULL
  THEN
    RAISE EXCEPTION 'Missing required membership tables';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.gallaspy_standard_enrollment_attempts
  ) OR EXISTS (
    SELECT 1
    FROM public.gallaspy_standard_subscriptions
  ) OR EXISTS (
    SELECT 1
    FROM public.gallaspy_membership_billing_consents
  )
  THEN
    RAISE EXCEPTION 'Rehearsal requires empty staging tables';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'gallaspy_standard_enrollment_attempts'
      AND column_name = 'selected_plan'
  )
  THEN
    RAISE EXCEPTION 'Plan binding may already be installed';
  END IF;
END;
$guard$;

-- SECTION 1: ENROLLMENT PLAN BINDING
-- THE GALLASPY GOLF CLUB
-- DRAFT: Plan-specific enrollment binding
--
-- DO NOT APPLY YET.
-- Requires staged migration testing and review of existing attempts.
-- No existing attempts are automatically assigned a plan.

ALTER TABLE public.gallaspy_standard_enrollment_attempts
    ADD COLUMN selected_plan text,
    ADD COLUMN initiation_fee_cents integer,
    ADD COLUMN initial_payment_cents integer,
    ADD COLUMN renewal_amount_cents integer,
    ADD COLUMN renewal_interval text;

ALTER TABLE public.gallaspy_standard_enrollment_attempts
ADD CONSTRAINT gallaspy_enrollment_plan_pricing_check
CHECK (
    (
        selected_plan IS NULL
        AND initiation_fee_cents IS NULL
        AND initial_payment_cents IS NULL
        AND renewal_amount_cents IS NULL
        AND renewal_interval IS NULL
    )
    OR
    (
        selected_plan IS NOT NULL
        AND initiation_fee_cents IS NOT NULL
        AND initial_payment_cents IS NOT NULL
        AND renewal_amount_cents IS NOT NULL
        AND renewal_interval IS NOT NULL
        AND selected_plan = 'monthly'
        AND initiation_fee_cents = 25000
        AND initial_payment_cents = 35000
        AND renewal_amount_cents = 10000
        AND renewal_interval = 'monthly'
    )
    OR
    (
        selected_plan IS NOT NULL
        AND initiation_fee_cents IS NOT NULL
        AND initial_payment_cents IS NOT NULL
        AND renewal_amount_cents IS NOT NULL
        AND renewal_interval IS NOT NULL
        AND selected_plan = 'annual'
        AND initiation_fee_cents = 0
        AND initial_payment_cents = 100000
        AND renewal_amount_cents = 100000
        AND renewal_interval = 'annual'
    )
);

-- Enables later composite ownership-and-plan checks
-- when linking signed acceptance to an attempt.
ALTER TABLE public.gallaspy_standard_enrollment_attempts
ADD CONSTRAINT gallaspy_enrollment_attempt_owner_plan_unique
UNIQUE (id, user_id, selected_plan);

-- Once a plan is recorded, it cannot be silently changed
-- or cleared, regardless of enrollment status.
CREATE FUNCTION public.gallaspy_protect_enrollment_plan()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
    IF OLD.selected_plan IS NOT NULL
       AND (
           NEW.selected_plan IS DISTINCT FROM OLD.selected_plan
           OR NEW.initiation_fee_cents
               IS DISTINCT FROM OLD.initiation_fee_cents
           OR NEW.initial_payment_cents
               IS DISTINCT FROM OLD.initial_payment_cents
           OR NEW.renewal_amount_cents
               IS DISTINCT FROM OLD.renewal_amount_cents
           OR NEW.renewal_interval
               IS DISTINCT FROM OLD.renewal_interval
       )
    THEN
        RAISE EXCEPTION
            'Enrollment plan and pricing cannot be changed';
    END IF;

    -- First binding permitted only for a reserved attempt.
    IF OLD.selected_plan IS NULL
       AND NEW.selected_plan IS NOT NULL
       AND OLD.enrollment_status <> 'reserved'
    THEN
        RAISE EXCEPTION
            'Only reserved enrollment attempts may select a plan';
    END IF;

    RETURN NEW;
END;
$function$;

REVOKE ALL ON FUNCTION
public.gallaspy_protect_enrollment_plan()
FROM PUBLIC, anon, authenticated;

CREATE TRIGGER gallaspy_enrollment_plan_protect
BEFORE UPDATE
ON public.gallaspy_standard_enrollment_attempts
FOR EACH ROW
EXECUTE FUNCTION public.gallaspy_protect_enrollment_plan();


-- SECTION 2: STANDARD SUBSCRIPTION BILLING V2

ALTER TABLE public.gallaspy_standard_subscriptions
  ADD COLUMN membership_plan text NOT NULL DEFAULT 'monthly',
  ADD COLUMN renewal_amount_cents integer NOT NULL DEFAULT 10000,
  ADD COLUMN renewal_interval text NOT NULL DEFAULT 'monthly';

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

-- SECTION 3: RECURRING BILLING CONSENT V2

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

-- SECTION 4: TRANSACTIONAL REHEARSAL ONLY

-- No changes persist after successful execution.
ROLLBACK;
