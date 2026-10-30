-- The Gallaspy Golf Club
-- Privileged Standard Membership activation.
-- Payment verification must occur before this function is called.

CREATE OR REPLACE FUNCTION public.gallaspy_activate_standard_member(
  p_user_id uuid
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_number text;
  v_type text;
  v_status text;
  v_attempts integer := 0;
BEGIN
  IF p_user_id IS NULL THEN
    RAISE EXCEPTION 'User ID is required';
  END IF;

  -- Serialize activation attempts for the same account.
  PERFORM 1
  FROM auth.users
  WHERE id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'User does not exist';
  END IF;

  -- Require an administratively approved membership application.
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
      'Approved membership application required for activation';
  END IF;

  -- Require a recorded, completed payment for the current period.
  -- Payment records must originate from trusted Square verification.
  IF NOT EXISTS (
    SELECT 1
    FROM public.gallaspy_standard_subscriptions sub
    JOIN public.gallaspy_subscription_payments pay
      ON pay.subscription_id = sub.id
    WHERE sub.user_id = p_user_id
      AND sub.subscription_status IN ('active', 'canceled')
      AND sub.monthly_amount_cents = 10000
      AND sub.currency = 'USD'
      AND sub.square_subscription_id IS NOT NULL
      AND sub.current_period_start <= now()
      AND sub.current_period_end > now()
      AND pay.payment_status = 'completed'
      AND pay.amount_cents = 10000
      AND pay.currency = 'USD'
      AND pay.billing_period_start = sub.current_period_start
      AND pay.billing_period_end = sub.current_period_end
  ) THEN
    RAISE EXCEPTION 'Verified current subscription payment required';
  END IF;


  SELECT membership_type, membership_status
  INTO v_type, v_status
  FROM public.gallaspy_memberships
  WHERE user_id = p_user_id;

  IF v_type = 'falcon_society' THEN
    RAISE EXCEPTION 'Falcon Society membership cannot be overwritten';
  END IF;

  IF v_status = 'suspended' THEN
    RAISE EXCEPTION 'Suspended membership requires administrator review';
  END IF;

  SELECT membership_number
  INTO v_number
  FROM public.gallaspy_memberships
  WHERE user_id = p_user_id;

  IF v_number IS NULL THEN
    LOOP
      v_attempts := v_attempts + 1;

      IF v_attempts > 100 THEN
        RAISE EXCEPTION
          'Unable to allocate a unique Standard Membership number';
      END IF;

      v_number := public.gallaspy_next_standard_member_number();

      EXIT WHEN NOT EXISTS (
        SELECT 1
        FROM public.gallaspy_memberships
        WHERE membership_number = v_number
      );
    END LOOP;
  ELSIF v_number !~ '^GGC-[0-9]{6,}$' THEN
    RAISE EXCEPTION
      'Existing Standard Membership number requires administrator review';
  END IF;

  INSERT INTO public.gallaspy_memberships (
    user_id, membership_number, membership_type,
    membership_status, approved_at
  )
  VALUES (
    p_user_id, v_number, 'standard',
    'approved', now()
  )
  ON CONFLICT (user_id) DO UPDATE SET
    membership_number = EXCLUDED.membership_number,
    membership_status = 'approved',
    approved_at = COALESCE(
      public.gallaspy_memberships.approved_at,
      now()
    ),
    updated_at = now();

  RETURN v_number;
END;
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_activate_standard_member(uuid)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_activate_standard_member(uuid)
  TO service_role;
