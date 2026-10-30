-- The Gallaspy Golf Club
-- Unique numbering for Standard Membership.
-- Falcon Society founder numbering remains separate.

CREATE SEQUENCE IF NOT EXISTS
  public.gallaspy_standard_member_number_seq
  START WITH 1
  INCREMENT BY 1;

REVOKE ALL ON SEQUENCE
  public.gallaspy_standard_member_number_seq
  FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION
  public.gallaspy_next_standard_member_number()
RETURNS text
LANGUAGE sql
VOLATILE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT 'GGC-' ||
    lpad(
      nextval(
        'public.gallaspy_standard_member_number_seq'::regclass
      )::text,
      6,
      '0'
    );
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_next_standard_member_number()
  FROM PUBLIC, anon, authenticated;

-- Trusted server operations will call this function
-- when activating a paid Standard Membership.
-- Sequence values are unique but may contain gaps.

-- Start after the highest existing Standard Membership number.
-- Prevents collisions if numbers were issued before this migration.
DO $$
DECLARE
  highest_number bigint;
BEGIN
  SELECT MAX(
    substring(membership_number FROM 5)::bigint
  )
  INTO highest_number
  FROM public.gallaspy_memberships
  WHERE membership_type = 'standard'
    AND membership_number ~ '^GGC-[0-9]{6,}$';

  IF highest_number IS NOT NULL THEN
    PERFORM setval(
      'public.gallaspy_standard_member_number_seq',
      GREATEST(
        highest_number,
        (
          SELECT last_value + CASE WHEN is_called THEN 0 ELSE -1 END
          FROM public.gallaspy_standard_member_number_seq
        )
      ),
      true
    );
  END IF;
END;
$$;
