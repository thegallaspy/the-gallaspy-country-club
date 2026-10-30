CREATE OR REPLACE FUNCTION public.gallaspy_reserve_standard_enrollment(
  p_user_id uuid
)
RETURNS TABLE (
  attempt_id uuid,
  idempotency_key uuid,
  enrollment_status text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $function$
BEGIN
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'User ID is required';
  END IF;

  PERFORM 1
  FROM auth.users
  WHERE id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User does not exist';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM public.gallaspy_membership_applications a
    WHERE a.user_id = p_user_id
      AND a.application_status = 'approved'
      AND a.reviewed_by IS NOT NULL
      AND a.reviewed_at IS NOT NULL
      AND a.rules_accepted_at IS NOT NULL
      AND NULLIF(trim(a.rules_version), '') IS NOT NULL
  ) THEN
    RAISE EXCEPTION
      'Approved membership application required';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.gallaspy_memberships m
    WHERE m.user_id = p_user_id
      AND (
        m.membership_type = 'falcon_society'
        OR m.membership_status IN ('approved', 'suspended')
      )
  ) THEN
    RAISE EXCEPTION
      'Existing membership requires review before enrollment';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM public.gallaspy_standard_subscriptions s
    WHERE s.user_id = p_user_id
      AND s.square_subscription_id IS NOT NULL
  ) THEN
    RAISE EXCEPTION
      'Existing subscription requires review before enrollment';
  END IF;

  INSERT INTO public.gallaspy_standard_enrollment_attempts (
    user_id
  )
  VALUES (p_user_id)
  ON CONFLICT (user_id) DO NOTHING;

  RETURN QUERY
  SELECT
    a.id,
    a.idempotency_key,
    a.enrollment_status
  FROM public.gallaspy_standard_enrollment_attempts a
  WHERE a.user_id = p_user_id;
END;
$function$;

REVOKE ALL ON FUNCTION
  public.gallaspy_reserve_standard_enrollment(uuid)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_reserve_standard_enrollment(uuid)
  TO service_role;
