-- The Gallaspy Golf Club
-- Record the outcome of a claimed Square webhook event.

CREATE OR REPLACE FUNCTION
  public.gallaspy_finish_square_subscription_event(
    p_event_id text,
    p_success boolean,
    p_error text DEFAULT NULL,
    p_attempt integer DEFAULT NULL
  )
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_updated integer;
BEGIN
  IF NULLIF(trim(p_event_id), '') IS NULL
     OR p_success IS NULL
     OR p_attempt IS NULL
     OR p_attempt < 1 THEN
    RAISE EXCEPTION 'Event ID and result are required';
  END IF;

  UPDATE public.gallaspy_square_subscription_events
  SET processing_status =
        CASE WHEN p_success THEN 'completed' ELSE 'failed' END,
      last_error =
        CASE WHEN p_success THEN NULL ELSE left(p_error, 500) END,
      processed_at =
        CASE WHEN p_success THEN now() ELSE NULL END,
      processing_started_at = NULL
  WHERE square_event_id = p_event_id
    AND processing_status = 'processing'
    AND attempt_count = p_attempt
    AND processing_started_at IS NOT NULL
    AND processing_started_at >= now() - interval '5 minutes';

  GET DIAGNOSTICS v_updated = ROW_COUNT;

  RETURN v_updated = 1;
END;
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_finish_square_subscription_event(text, boolean, text, integer)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_finish_square_subscription_event(text, boolean, text, integer)
  TO service_role;
