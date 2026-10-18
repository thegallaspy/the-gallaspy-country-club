
-- Gallaspy Community: controlled publishing
-- Part 1: function definition and authentication.

CREATE FUNCTION public.gallaspy_publish_community_post(
  post_body text
)
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

  IF post_body IS NULL
     OR length(btrim(post_body)) = 0
     OR length(post_body) > 3000 THEN
    RAISE EXCEPTION 'Invalid post content';
  END IF;

  -- Serialize publishing attempts for this account.
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(actor_id::text, 0)
  );

  IF EXISTS (
    SELECT 1
    FROM public.gallaspy_community_posts
    WHERE user_id = actor_id
      AND published_at > now() - interval '60 seconds'
  ) THEN
    RAISE EXCEPTION 'Please wait 60 seconds before posting again';
  END IF;

  IF (
    SELECT count(*)
    FROM public.gallaspy_community_posts
    WHERE user_id = actor_id
      AND published_at > now() - interval '24 hours'
  ) >= 20 THEN
    RAISE EXCEPTION 'Daily posting limit reached';
  END IF;

  INSERT INTO public.gallaspy_community_posts (
    user_id,
    body,
    published_at
  )
  VALUES (
    actor_id,
    btrim(post_body),
    now()
  )
  RETURNING id INTO new_post_id;

  RETURN new_post_id;
END;
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_publish_community_post(text)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_publish_community_post(text)
  TO authenticated;
