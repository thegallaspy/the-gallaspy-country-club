CREATE OR REPLACE FUNCTION public.award_apparel_club_points(
  p_order_reference text
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id uuid;
  v_subtotal_cents integer;
  v_points integer;
  v_inserted_points integer;
BEGIN
  SELECT s.user_id, o.subtotal_cents
  INTO v_user_id, v_subtotal_cents
  FROM public.apparel_orders_v2 o
  JOIN public.apparel_payment_attempts a
    ON a.order_reference = o.order_reference
   AND a.square_payment_id = o.square_payment_id
  JOIN public.native_apparel_checkout_sessions s
    ON s.id = a.native_session_id
   AND s.square_payment_id = o.square_payment_id
  WHERE o.order_reference = p_order_reference
    AND o.payment_status = 'completed'
    AND a.payment_state = 'completed'
    AND s.payment_state = 'completed'
    AND s.user_id IS NOT NULL;

  IF NOT FOUND THEN
    RETURN 0;
  END IF;

  v_points := v_subtotal_cents / 100;

  IF v_points <= 0 THEN
    RETURN 0;
  END IF;

  INSERT INTO public.gallaspy_points_ledger (
    user_id,
    points,
    transaction_type,
    source_type,
    source_id,
    description
  )
  VALUES (
    v_user_id,
    v_points,
    'earn',
    'apparel_order',
    p_order_reference,
    'Gallaspy apparel purchase'
  )
  ON CONFLICT (user_id, source_type, source_id)
  DO NOTHING
  RETURNING points INTO v_inserted_points;

  RETURN COALESCE(v_inserted_points, 0);
END;
$$;

REVOKE ALL ON FUNCTION public.award_apparel_club_points(text)
FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.award_apparel_club_points(text)
TO service_role;
