-- THE GALLASPY GOLF CLUB
-- STEP 694: STAGING REVIEW COPY
-- DO NOT EXECUTE IN PRODUCTION
-- Requires project verification, schema reconciliation,
-- staging tests, and coordinated billing deployment.
--
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
