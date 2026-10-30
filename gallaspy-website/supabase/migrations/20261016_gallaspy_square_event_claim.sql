-- The Gallaspy Golf Club
-- Claim new Square subscription events for processing.

CREATE OR REPLACE FUNCTION
  public.gallaspy_claim_square_subscription_event(
    p_event_id text,
    p_event_type text
  )
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_attempt integer;
BEGIN
  IF NULLIF(trim(p_event_id), '') IS NULL
     OR NULLIF(trim(p_event_type), '') IS NULL THEN
    RAISE EXCEPTION 'Square event ID and type are required';
  END IF;

  INSERT INTO public.gallaspy_square_subscription_events (
    square_event_id,
    event_type,
    processing_status,
    attempt_count,
    processing_started_at
  )
  VALUES (
    p_event_id,
    p_event_type,
    'processing',
    1,
    now()
  )
  ON CONFLICT (square_event_id) DO UPDATE
  SET processing_status = 'processing',
      attempt_count =
        public.gallaspy_square_subscription_events.attempt_count + 1,
      last_error = NULL,
      processing_started_at = now()
  WHERE
    (
      public.gallaspy_square_subscription_events.processing_status = 'failed'
      OR (
        public.gallaspy_square_subscription_events.processing_status = 'processing'
        AND public.gallaspy_square_subscription_events.processing_started_at
          < now() - interval '5 minutes'
      )
    )
    AND public.gallaspy_square_subscription_events.event_type =
      EXCLUDED.event_type
  RETURNING attempt_count INTO v_attempt;

  RETURN v_attempt;
END;
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_claim_square_subscription_event(text, text)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_claim_square_subscription_event(text, text)
  TO service_role;
