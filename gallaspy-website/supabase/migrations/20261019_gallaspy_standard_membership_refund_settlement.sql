-- The Gallaspy Golf Club / Stage R1
-- Atomic, idempotent records for COMPLETED Square Standard Membership refunds.
-- REVIEW before applying in Supabase SQL Editor; do not auto-apply.
CREATE TABLE IF NOT EXISTS public.gallaspy_standard_membership_refunds (
  square_refund_id text PRIMARY KEY,
  subscription_payment_id uuid NOT NULL
    REFERENCES public.gallaspy_subscription_payments(id) ON DELETE RESTRICT,
  refund_amount_cents integer NOT NULL CHECK (refund_amount_cents > 0 AND refund_amount_cents <= 10000),
  currency text NOT NULL DEFAULT 'USD' CHECK (currency = 'USD'),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT gallaspy_standard_refund_id_format CHECK
    (square_refund_id ~ '^[A-Za-z0-9_-]{1,255}$')
);
CREATE INDEX IF NOT EXISTS gallaspy_standard_membership_refunds_payment_idx
  ON public.gallaspy_standard_membership_refunds(subscription_payment_id);
ALTER TABLE public.gallaspy_standard_membership_refunds ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.gallaspy_standard_membership_refunds FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT ON public.gallaspy_standard_membership_refunds TO service_role;

CREATE OR REPLACE FUNCTION public.gallaspy_settle_standard_membership_refund(
  p_refund_id text, p_payment_id text, p_amount_cents integer
) RETURNS text
LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
DECLARE
  v_payment public.gallaspy_subscription_payments%ROWTYPE;
  v_existing public.gallaspy_standard_membership_refunds%ROWTYPE;
  v_total bigint;
  v_next text;
BEGIN
  IF p_refund_id IS NULL OR p_refund_id !~ '^[A-Za-z0-9_-]{1,255}$'
    OR p_payment_id IS NULL OR p_payment_id !~ '^[A-Za-z0-9_-]{1,255}$'
    OR p_amount_cents IS NULL OR p_amount_cents < 1 OR p_amount_cents > 10000 THEN
    RAISE EXCEPTION 'Invalid membership refund attributes';
  END IF;
  -- Lock the payment row to serialize concurrent partial refunds for one charge.
  SELECT * INTO v_payment
  FROM public.gallaspy_subscription_payments
  WHERE square_payment_id = p_payment_id FOR UPDATE;
  IF NOT FOUND OR v_payment.amount_cents <> 10000 OR v_payment.currency <> 'USD'
    OR v_payment.payment_status NOT IN ('completed','partially_refunded','refunded') THEN
    RAISE EXCEPTION 'No eligible verified Standard Membership payment';
  END IF;
  -- Detect a replay without creating a second adjustment. Conflicts are errors.
  SELECT * INTO v_existing FROM public.gallaspy_standard_membership_refunds
  WHERE square_refund_id = p_refund_id;
  IF FOUND THEN
    IF v_existing.subscription_payment_id <> v_payment.id
      OR v_existing.refund_amount_cents <> p_amount_cents THEN
      RAISE EXCEPTION 'Conflicting Square refund replay';
    END IF;
    RETURN 'duplicate';
  END IF;
  SELECT COALESCE(SUM(refund_amount_cents),0) INTO v_total
  FROM public.gallaspy_standard_membership_refunds
  WHERE subscription_payment_id = v_payment.id;
  IF v_total + p_amount_cents > 10000 THEN
    RAISE EXCEPTION 'Refund exceeds recorded membership payment';
  END IF;
  -- Do not infer earlier refunds if a pre-existing reversed state lacks ledger rows.
  IF v_payment.payment_status <> 'completed' AND v_total = 0 THEN
    RAISE EXCEPTION 'Previous refund state requires manual reconciliation';
  END IF;
  INSERT INTO public.gallaspy_standard_membership_refunds
    (square_refund_id,subscription_payment_id,refund_amount_cents)
  VALUES (p_refund_id,v_payment.id,p_amount_cents);
  v_next := CASE WHEN v_total + p_amount_cents = 10000
    THEN 'refunded' ELSE 'partially_refunded' END;
  UPDATE public.gallaspy_subscription_payments
  SET payment_status = v_next WHERE id = v_payment.id;
  -- Leave subscription and member master rows intact: entitlement API checks
  -- completed payment for the current billing period. No past refund should
  -- erase a different, valid newer billing period.
  RETURN v_next;
END;
$$;
REVOKE ALL ON FUNCTION public.gallaspy_settle_standard_membership_refund(text,text,integer)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gallaspy_settle_standard_membership_refund(text,text,integer)
  TO service_role;
