CREATE OR REPLACE FUNCTION
public.gallaspy_record_standard_enrollment_progress(
  p_user_id uuid,
  p_attempt_id uuid,
  p_customer_id text DEFAULT NULL,
  p_card_id text DEFAULT NULL,
  p_subscription_id text DEFAULT NULL
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_updated boolean := false;
BEGIN
  IF p_user_id IS NULL OR p_attempt_id IS NULL THEN
    RETURN false;
  END IF;

  IF p_customer_id IS NULL
     AND p_card_id IS NULL
     AND p_subscription_id IS NULL THEN
    RETURN false;
  END IF;

  IF (
    p_customer_id IS NOT NULL
    AND NULLIF(trim(p_customer_id), '') IS NULL
  ) OR (
    p_card_id IS NOT NULL
    AND NULLIF(trim(p_card_id), '') IS NULL
  ) OR (
    p_subscription_id IS NOT NULL
    AND NULLIF(trim(p_subscription_id), '') IS NULL
  ) THEN
    RETURN false;
  END IF;

  UPDATE public.gallaspy_standard_enrollment_attempts a
  SET
    square_customer_id =
      COALESCE(p_customer_id, a.square_customer_id),
    square_card_id =
      COALESCE(p_card_id, a.square_card_id),
    square_subscription_id =
      COALESCE(p_subscription_id, a.square_subscription_id),
    enrollment_status =
      CASE
        WHEN p_subscription_id IS NOT NULL
          THEN 'subscription_created'
        ELSE a.enrollment_status
      END,
    updated_at = now()
  WHERE a.id = p_attempt_id
    AND a.user_id = p_user_id
    AND a.enrollment_status = 'processing'
    AND (
      p_customer_id IS NULL
      OR a.square_customer_id IS NULL
      OR a.square_customer_id = p_customer_id
    )
    AND (
      p_card_id IS NULL
      OR a.square_card_id IS NULL
      OR a.square_card_id = p_card_id
    )
    AND (
      p_subscription_id IS NULL
      OR a.square_subscription_id IS NULL
      OR a.square_subscription_id = p_subscription_id
    )
    AND (
      p_card_id IS NULL
      OR p_customer_id IS NOT NULL
      OR a.square_customer_id IS NOT NULL
    )
    AND (
      p_subscription_id IS NULL
      OR (
        COALESCE(p_customer_id, a.square_customer_id)
          IS NOT NULL
        AND COALESCE(p_card_id, a.square_card_id)
          IS NOT NULL
      )
    );

  v_updated := FOUND;
  RETURN v_updated;
END;
$function$;

REVOKE ALL ON FUNCTION
  public.gallaspy_record_standard_enrollment_progress(
    uuid, uuid, text, text, text
  )
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_record_standard_enrollment_progress(
    uuid, uuid, text, text, text
  )
  TO service_role;
