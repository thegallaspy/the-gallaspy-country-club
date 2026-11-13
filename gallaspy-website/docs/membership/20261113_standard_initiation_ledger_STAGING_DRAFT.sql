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

BEGIN;

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

ROLLBACK;
