-- Gallaspy Community: create unpublished photo-post drafts.

CREATE FUNCTION public.gallaspy_create_community_draft()
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  actor_id uuid;
  new_post_id uuid;
BEGIN
  actor_id := auth.uid();

  IF actor_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM auth.users
    WHERE id = actor_id
      AND deleted_at IS NULL
  ) THEN
    RAISE EXCEPTION 'Active account required';
  END IF;

  -- Prevent excessive unfinished drafts.
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(actor_id::text, 1)
  );

  IF (
    SELECT count(*)
    FROM public.gallaspy_community_posts
    WHERE user_id = actor_id
      AND published_at IS NULL
      AND deleted_at IS NULL
  ) >= 5 THEN
    RAISE EXCEPTION 'Maximum unfinished drafts reached';
  END IF;

  INSERT INTO public.gallaspy_community_posts (
    user_id,
    body,
    published_at
  )
  VALUES (
    actor_id,
    '',
    NULL
  )
  RETURNING id INTO new_post_id;

  RETURN new_post_id;
END;
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_create_community_draft()
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_create_community_draft()
  TO authenticated;
