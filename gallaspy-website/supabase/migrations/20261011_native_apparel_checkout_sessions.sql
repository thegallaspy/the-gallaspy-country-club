CREATE TABLE IF NOT EXISTS public.native_apparel_checkout_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text NOT NULL UNIQUE,
  items jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '15 minutes'),
  consumed_at timestamptz,
  payment_state text NOT NULL DEFAULT 'ready',
  payment_attempt_id uuid,
  square_payment_id text,
  payment_started_at timestamptz,
  payment_completed_at timestamptz,
  CONSTRAINT native_checkout_payment_state
    CHECK (
      payment_state IN (
        'ready',
        'processing',
        'completed',
        'needs_review'
      )
    ),
  CONSTRAINT native_checkout_items_array
    CHECK (jsonb_typeof(items) = 'array')
);

CREATE INDEX IF NOT EXISTS native_checkout_expiry_idx
  ON public.native_apparel_checkout_sessions (expires_at);

ALTER TABLE public.native_apparel_checkout_sessions
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.native_apparel_checkout_sessions
  FROM PUBLIC, anon, authenticated;

-- Atomically reserve a native checkout session before contacting Square.
-- Only the server-side service role may execute this function.
CREATE OR REPLACE FUNCTION public.claim_native_apparel_checkout(
  p_token_hash text,
  p_items jsonb
)
RETURNS TABLE (
  claimed boolean,
  attempt_id uuid,
  claim_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_session public.native_apparel_checkout_sessions%ROWTYPE;
  v_attempt uuid;
BEGIN
  SELECT *
  INTO v_session
  FROM public.native_apparel_checkout_sessions
  WHERE token_hash = p_token_hash
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN QUERY SELECT false, NULL::uuid, 'not_found'::text;
    RETURN;
  END IF;

  IF v_session.payment_state <> 'ready' THEN
    RETURN QUERY SELECT false, NULL::uuid, v_session.payment_state;
    RETURN;
  END IF;

  IF v_session.expires_at <= now() THEN
    RETURN QUERY SELECT false, NULL::uuid, 'expired'::text;
    RETURN;
  END IF;

  IF v_session.consumed_at IS NOT NULL THEN
    RETURN QUERY SELECT false, NULL::uuid, 'consumed'::text;
    RETURN;
  END IF;

  IF v_session.items <> p_items THEN
    RETURN QUERY SELECT false, NULL::uuid, 'cart_mismatch'::text;
    RETURN;
  END IF;

  v_attempt := gen_random_uuid();

  UPDATE public.native_apparel_checkout_sessions
  SET payment_state = 'processing',
      payment_attempt_id = v_attempt,
      payment_started_at = now()
  WHERE id = v_session.id;

  RETURN QUERY SELECT true, v_attempt, 'processing'::text;
END;
$$;

REVOKE ALL ON FUNCTION public.claim_native_apparel_checkout(
  text, jsonb
) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.claim_native_apparel_checkout(
  text, jsonb
) TO service_role;

-- Record a confirmed Square payment for the claimed attempt.
CREATE OR REPLACE FUNCTION public.complete_native_apparel_checkout(
  p_token_hash text,
  p_attempt_id uuid,
  p_square_payment_id text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_updated integer;
BEGIN
  IF p_square_payment_id IS NULL
     OR length(trim(p_square_payment_id)) = 0 THEN
    RETURN false;
  END IF;

  UPDATE public.native_apparel_checkout_sessions
  SET payment_state = 'completed',
      square_payment_id = p_square_payment_id,
      payment_completed_at = now(),
      consumed_at = now()
  WHERE token_hash = p_token_hash
    AND payment_attempt_id = p_attempt_id
    AND payment_state = 'processing';

  GET DIAGNOSTICS v_updated = ROW_COUNT;

  RETURN v_updated = 1;
END;
$$;

REVOKE ALL ON FUNCTION public.complete_native_apparel_checkout(
  text, uuid, text
) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.complete_native_apparel_checkout(
  text, uuid, text
) TO service_role;
