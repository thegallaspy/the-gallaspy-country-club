
-- Gallaspy Community: secure soft deletion

CREATE OR REPLACE FUNCTION public.gallaspy_delete_community_post(
  target_post_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
  BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  UPDATE public.gallaspy_community_posts
  SET deleted_at = now(),
      updated_at = now()
  WHERE id = target_post_id
    AND user_id = (SELECT auth.uid())
    AND deleted_at IS NULL;
  RETURN FOUND;
  END;
$$;

CREATE OR REPLACE FUNCTION public.gallaspy_delete_community_comment(
  target_comment_id uuid
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
  BEGIN
  IF auth.uid() IS NULL THEN
    RETURN false;
  END IF;
  UPDATE public.gallaspy_community_comments
  SET deleted_at = now()
  WHERE id = target_comment_id
    AND user_id = (SELECT auth.uid())
    AND deleted_at IS NULL;
  RETURN FOUND;
  END;
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_delete_community_post(uuid)
  FROM PUBLIC, anon, authenticated;

REVOKE ALL ON FUNCTION
  public.gallaspy_delete_community_comment(uuid)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_delete_community_post(uuid)
  TO authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_delete_community_comment(uuid)
  TO authenticated;
