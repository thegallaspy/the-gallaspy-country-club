-- Verify a Community draft photo without exposing private storage objects.

CREATE FUNCTION public.gallaspy_verify_community_photo(
  target_post_id uuid,
  target_storage_path text
)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT
    auth.uid() IS NOT NULL
    AND EXISTS (
      SELECT 1
      FROM public.gallaspy_community_posts p
      JOIN storage.objects obj
        ON obj.bucket_id = 'gallaspy-community'
       AND obj.name = target_storage_path
      WHERE p.id = target_post_id
        AND p.user_id = auth.uid()
        AND p.published_at IS NULL
        AND p.deleted_at IS NULL
        AND split_part(target_storage_path, '/', 1) = auth.uid()::text
        AND split_part(target_storage_path, '/', 2) = p.id::text
    );
$$;

REVOKE ALL ON FUNCTION
  public.gallaspy_verify_community_photo(uuid, text)
  FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION
  public.gallaspy_verify_community_photo(uuid, text)
  TO authenticated;
