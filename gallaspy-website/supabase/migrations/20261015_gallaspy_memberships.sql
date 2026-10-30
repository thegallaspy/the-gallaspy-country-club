-- The Gallaspy Golf Club
-- Official membership registry.
-- An app account or player record does not automatically grant membership.

CREATE TABLE IF NOT EXISTS public.gallaspy_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),

  user_id uuid NOT NULL UNIQUE
    REFERENCES auth.users(id) ON DELETE CASCADE,

  membership_number text UNIQUE,

  membership_status text NOT NULL DEFAULT 'pending'
    CHECK (
      membership_status IN (
        'pending',
        'approved',
        'suspended',
        'inactive'
      )
    ),

  membership_type text NOT NULL DEFAULT 'standard'
    CHECK (
      membership_type IN (
        'standard',
        'falcon_society'
      )
    ),

  founder_number integer UNIQUE
    CHECK (founder_number BETWEEN 1 AND 100),

  approved_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),

  CONSTRAINT gallaspy_founder_type_check
    CHECK (
      founder_number IS NULL
      OR membership_type = 'falcon_society'
    ),

  CONSTRAINT gallaspy_approved_membership_check
    CHECK (
      membership_status <> 'approved'
      OR (
        membership_number IS NOT NULL
        AND length(trim(membership_number)) > 0
        AND approved_at IS NOT NULL
        AND (
          membership_type <> 'falcon_society'
          OR founder_number IS NOT NULL
        )
      )
    )
);

ALTER TABLE public.gallaspy_memberships
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.gallaspy_memberships
  FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.gallaspy_memberships
  TO authenticated;

CREATE POLICY "Members can read their own membership"
  ON public.gallaspy_memberships
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Membership creation and approval must be performed
-- by trusted administrative server operations only.
-- Ordinary authenticated users cannot insert, update,
-- or delete official membership records.
