CREATE OR REPLACE FUNCTION
public.gallaspy_claim_standard_enrollment(
  p_user_id uuid,
  p_attempt_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
DECLARE
  v_claimed boolean := false;
BEGIN
  IF p_user_id IS NULL OR p_attempt_id IS NULL THEN
    RETURN false;
  END IF;

  UPDATE public.gallaspy_standard_enrollment_attempts a
  SET
    enrollment_status = 'processing',
    updated_at = now()
  WHERE a.id = p_attempt_id
    AND a.user_id = p_user_id
    AND a.enrollment_status = 'reserved'
    AND a.square_subscription_id IS NULL
    AND EXISTS (
      SELECT 1
      FROM public.gallaspy_membership_applications m
      WHERE m.user_id = p_user_id
        AND m.application_status = 'approved'
        AND m.reviewed_by IS NOT NULL
        AND m.reviewed_at IS NOT NULL
        AND m.rules_accepted_at IS NOT NULL
        AND NULLIF(trim(m.rules_version), '') IS NOT NULL
    )
    AND NOT EXISTS (
      SELECT 1
      FROM public.gallaspy_standard_subscriptions s
      WHERE s.user_id = p_user_id
        AND s.square_subscription_id IS NOT NULL
    )
    AND NOT EXISTS (
      SELECT 1
      FROM public.gallaspy_memberships gm
      WHERE gm.user_id = p_user_id
        AND (
          gm.membership_type = 'falcon_society'
          OR gm.membership_status IN ('approved', 'suspended')
        )
    );

  v_claimed := FOUND;

  RETURN v_claimed;
END;
$function$;

REVOKE ALL ON FUNCTION
  public.gallaspy_claim_standard_enrollment(uuid, uuid)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_claim_standard_enrollment(uuid, uuid)
  TO service_role;
