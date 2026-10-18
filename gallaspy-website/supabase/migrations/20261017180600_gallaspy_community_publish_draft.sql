-- Publish a completed Gallaspy Community photo post.

CREATE OR REPLACE FUNCTION public.gallaspy_publish_community_draft(
  target_post_id uuid,
  post_body text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  actor_id uuid := auth.uid();
  photo_count integer;
BEGIN
  IF actor_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = actor_id AND deleted_at IS NULL
  ) THEN
    RAISE EXCEPTION 'Active account required';
  END IF;

  IF post_body IS NULL OR length(btrim(post_body)) > 3000 THEN
    RAISE EXCEPTION 'Invalid post content';
  END IF;

  -- Serialize publishing attempts across text and photo posts.
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(actor_id::text, 0)
  );

  IF NOT EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts
    WHERE id = target_post_id
      AND user_id = actor_id
      AND published_at IS NULL
      AND deleted_at IS NULL
    FOR UPDATE
  ) THEN
    RAISE EXCEPTION 'Draft not found';
  END IF;

  SELECT count(*) INTO photo_count
  FROM public.gallaspy_community_photos
  WHERE post_id = target_post_id;

  IF photo_count < 1 OR photo_count > 4 THEN
    RAISE EXCEPTION 'A photo post requires 1 to 4 photos';
  END IF;

  -- Recheck every registered photo before publishing.
  IF EXISTS (
    SELECT 1
    FROM public.gallaspy_community_photos photo
    WHERE photo.post_id = target_post_id
      AND NOT public.gallaspy_verify_community_photo(
        target_post_id,
        photo.storage_path
      )
  ) THEN
    RAISE EXCEPTION 'One or more photos could not be verified';
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts
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

  UPDATE public.gallaspy_community_posts
  SET body = btrim(post_body),
      published_at = now()
  WHERE id = target_post_id
    AND user_id = actor_id
    AND published_at IS NULL
    AND deleted_at IS NULL;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Unable to publish draft';
  END IF;

  RETURN target_post_id;
END;
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_publish_community_draft(uuid, text)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_publish_community_draft(uuid, text)
  TO authenticated;
