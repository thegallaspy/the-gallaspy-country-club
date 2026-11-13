
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


-- SECTION 5: LEGAL ACCEPTANCE TABLE
-- Imported from original migration; review privileges and dependencies.

-- THE GALLASPY GOLF CLUB
-- Membership legal acceptance, draft implementation.
-- DO NOT APPLY until legal documents and enrollment integration
-- have been approved and tested.
--
-- Independent of existing monthly billing-consent records.
-- No changes to Square or existing memberships.

CREATE TABLE public.gallaspy_membership_legal_acceptances (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    user_id uuid NOT NULL
        -- Signed records must not be automatically erased when
    -- a member account is deleted. A legally reviewed
    -- retention/deletion workflow is required before launch.
    REFERENCES auth.users(id) ON DELETE RESTRICT,

    membership_plan text NOT NULL
        CHECK (membership_plan IN ('monthly', 'annual')),

    membership_agreement_version text NOT NULL
        CHECK (length(membership_agreement_version) BETWEEN 1 AND 120),

    club_rules_version text NOT NULL
        CHECK (length(club_rules_version) BETWEEN 1 AND 120),

    activity_waiver_version text NOT NULL
        CHECK (length(activity_waiver_version) BETWEEN 1 AND 120),

    -- Fingerprints of the exact approved documents presented
    -- to the signer. Server must verify against an approved registry.
    membership_agreement_sha256 text NOT NULL
        CHECK (membership_agreement_sha256 ~ '^[0-9a-f]{64}$'),

    club_rules_sha256 text NOT NULL
        CHECK (club_rules_sha256 ~ '^[0-9a-f]{64}$'),

    activity_waiver_sha256 text NOT NULL
        CHECK (activity_waiver_sha256 ~ '^[0-9a-f]{64}$'),

    signed_full_name text NOT NULL
        CHECK (length(btrim(signed_full_name)) BETWEEN 3 AND 180),

    electronic_signature_consent boolean NOT NULL
        CHECK (electronic_signature_consent IS TRUE),

    legal_terms_accepted boolean NOT NULL
        CHECK (legal_terms_accepted IS TRUE),

    accepted_at timestamptz NOT NULL DEFAULT now(),

    enrollment_attempt_id uuid NOT NULL UNIQUE
        REFERENCES public.gallaspy_standard_enrollment_attempts(id),

    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX gallaspy_legal_acceptances_user_idx
    ON public.gallaspy_membership_legal_acceptances
    (user_id, accepted_at DESC);

ALTER TABLE public.gallaspy_membership_legal_acceptances
    ENABLE ROW LEVEL SECURITY;

REVOKE ALL
    ON public.gallaspy_membership_legal_acceptances
    FROM PUBLIC, anon, authenticated;

GRANT SELECT, INSERT
    ON public.gallaspy_membership_legal_acceptances
    TO service_role;

-- No direct access for public or authenticated clients.
-- Future server logic must independently authenticate the
-- account and validate current approved document versions.

CREATE OR REPLACE FUNCTION
public.gallaspy_prevent_legal_acceptance_changes()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $function$
BEGIN
    RAISE EXCEPTION
        'Membership legal acceptance records cannot be changed';
END;
$function$;

REVOKE ALL ON FUNCTION
public.gallaspy_prevent_legal_acceptance_changes()
FROM PUBLIC, anon, authenticated;

CREATE TRIGGER gallaspy_legal_acceptances_protect
BEFORE UPDATE OR DELETE
ON public.gallaspy_membership_legal_acceptances
FOR EACH ROW
EXECUTE FUNCTION
public.gallaspy_prevent_legal_acceptance_changes();



-- SECTION 5A: ENROLLMENT OWNERSHIP AND PLAN INTEGRITY
-- Require legal records to match one actual enrollment attempt,
-- its owner, and the exact selected membership plan.

ALTER TABLE public.gallaspy_membership_legal_acceptances
  ADD CONSTRAINT gallaspy_legal_attempt_owner_plan_fk
  FOREIGN KEY (
    enrollment_attempt_id,
    user_id,
    membership_plan
  )
  REFERENCES public.gallaspy_standard_enrollment_attempts (
    id,
    user_id,
    selected_plan
  );

-- SECTION 6: LEGAL ACCEPTANCE RECORDING FUNCTION
-- Imported from original migration; review authorization and dependencies.

-- THE GALLASPY GOLF CLUB
-- DRAFT: Atomic membership legal-acceptance recording.
--
-- DO NOT APPLY YET.
-- Requires staging tests, approved legal documents,
-- validated signature consent, and a retention policy.
--
-- A server must validate approved document hashes, versions,
-- accepted disclosures, authenticated identity, and exact prices
-- BEFORE calling this function.
--
-- This function does not process payments or claim an enrollment.
-- A later billing integration must coordinate acceptance,
-- billing consent, claim status, and recovery safely.

CREATE FUNCTION public.gallaspy_record_membership_acceptance(
    p_user_id uuid,
    p_attempt_id uuid,
    p_plan text,
    p_signed_full_name text,
    p_agreement_version text,
    p_agreement_sha256 text,
    p_rules_version text,
    p_rules_sha256 text,
    p_waiver_version text,
    p_waiver_sha256 text,
    p_electronic_signature_consent boolean,
    p_legal_terms_accepted boolean
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $function$
DECLARE
    v_attempt record;
    v_acceptance_id uuid;
BEGIN
    IF p_user_id IS NULL
       OR p_attempt_id IS NULL
       OR p_plan NOT IN ('monthly', 'annual')
       OR p_plan IS NULL
    THEN
        RAISE EXCEPTION 'Invalid enrollment identity or plan';
    END IF;

    IF p_electronic_signature_consent IS DISTINCT FROM TRUE
       OR p_legal_terms_accepted IS DISTINCT FROM TRUE
    THEN
        RAISE EXCEPTION
            'Explicit legal and electronic signature consent required';
    END IF;

    IF p_signed_full_name IS NULL
       OR length(btrim(p_signed_full_name)) NOT BETWEEN 3 AND 180
       OR btrim(p_signed_full_name) !~ '[[:space:]]'
       OR p_signed_full_name ~ '[<>]'
    THEN
        RAISE EXCEPTION 'Invalid signature name';
    END IF;

    -- Lock this enrollment attempt until the transaction finishes.
    SELECT a.id, a.user_id, a.selected_plan, a.enrollment_status
    INTO v_attempt
    FROM public.gallaspy_standard_enrollment_attempts a
    WHERE a.id = p_attempt_id
      AND a.user_id = p_user_id
    FOR UPDATE;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Enrollment attempt ownership mismatch';
    END IF;

    IF v_attempt.selected_plan IS DISTINCT FROM p_plan
       OR v_attempt.enrollment_status <> 'reserved'
    THEN
        RAISE EXCEPTION 'Enrollment plan or status mismatch';
    END IF;

    IF EXISTS (
        SELECT 1
        FROM public.gallaspy_membership_legal_acceptances la
        WHERE la.enrollment_attempt_id = p_attempt_id
    ) THEN
        RAISE EXCEPTION
            'Legal acceptance already recorded for this attempt';
    END IF;

    -- Database constraints also validate document fingerprint
    -- format and the composite (attempt, owner, plan) relationship.
    INSERT INTO public.gallaspy_membership_legal_acceptances (
        user_id,
        enrollment_attempt_id,
        membership_plan,
        signed_full_name,
        membership_agreement_version,
        membership_agreement_sha256,
        club_rules_version,
        club_rules_sha256,
        activity_waiver_version,
        activity_waiver_sha256,
        electronic_signature_consent,
        legal_terms_accepted
    )
    VALUES (
        p_user_id,
        p_attempt_id,
        p_plan,
        btrim(p_signed_full_name),
        p_agreement_version,
        p_agreement_sha256,
        p_rules_version,
        p_rules_sha256,
        p_waiver_version,
        p_waiver_sha256,
        p_electronic_signature_consent,
        p_legal_terms_accepted
    )
    RETURNING id INTO v_acceptance_id;

    RETURN v_acceptance_id;
END;
$function$;

REVOKE ALL ON FUNCTION
public.gallaspy_record_membership_acceptance(
    uuid, uuid, text, text, text, text,
    text, text, text, text, boolean, boolean
)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
public.gallaspy_record_membership_acceptance(
    uuid, uuid, text, text, text, text,
    text, text, text, text, boolean, boolean
)
TO service_role;


-- END OF STAGING REHEARSAL
-- DO NOT EXECUTE AGAINST PRODUCTION.


-- SECTION 7: VERIFIED INITIATION PAYMENT LEDGER
-- THE GALLASPY GOLF CLUB
-- STEP 718: STANDARD MEMBERSHIP INITIATION PAYMENT LEDGER
-- STAGING DRAFT — DO NOT EXECUTE IN PRODUCTION
--
-- Requires Billing V2 plan-binding migration first.
-- Insert only after trusted Square payment verification.
-- Refunds must be verified with Square before updating.
--
-- REVIEW REQUIRED:
-- RLS, permissions, payment reconciliation, refund lifecycle,
-- duplicate handling, and activation integration.

CREATE TABLE public.gallaspy_standard_initiation_payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

    enrollment_attempt_id uuid NOT NULL UNIQUE
        REFERENCES public.gallaspy_standard_enrollment_attempts(id),

    user_id uuid NOT NULL
        REFERENCES auth.users(id) ON DELETE RESTRICT,

    membership_plan text NOT NULL DEFAULT 'monthly'
        CHECK (membership_plan = 'monthly'),

    square_payment_id text NOT NULL UNIQUE
        CHECK (length(square_payment_id) BETWEEN 6 AND 255),

    square_customer_id text NOT NULL
        CHECK (length(square_customer_id) BETWEEN 6 AND 255),

    amount_cents integer NOT NULL
        CHECK (amount_cents = 25000),

    currency text NOT NULL DEFAULT 'USD'
        CHECK (currency = 'USD'),

    payment_status text NOT NULL DEFAULT 'completed'
        CHECK (payment_status = 'completed'),

    refunded_amount_cents integer NOT NULL DEFAULT 0
        CHECK (
            refunded_amount_cents >= 0
            AND refunded_amount_cents <= amount_cents
        ),

    verified_at timestamptz NOT NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),

    CONSTRAINT gallaspy_initiation_owner_plan_fk
        FOREIGN KEY (
            enrollment_attempt_id,
            user_id,
            membership_plan
        )
        REFERENCES public.gallaspy_standard_enrollment_attempts (
            id,
            user_id,
            selected_plan
        )
);

CREATE INDEX gallaspy_initiation_user_idx
    ON public.gallaspy_standard_initiation_payments(user_id);

ALTER TABLE public.gallaspy_standard_initiation_payments
    ENABLE ROW LEVEL SECURITY;

REVOKE ALL
    ON public.gallaspy_standard_initiation_payments
    FROM PUBLIC, anon, authenticated;

GRANT SELECT, INSERT, UPDATE
    ON public.gallaspy_standard_initiation_payments
    TO service_role;

-- No public/client RLS policies.
-- Service-role usage must remain on trusted server code.
-- Payment identity and refund totals require provider verification.
--
-- This is an integration draft, not a finished payment ledger.
-- No changes persist when the rehearsal executes successfully.


-- FINAL STAGING TRANSACTION ROLLBACK

ROLLBACK;
