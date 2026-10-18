-- Gallaspy Community photo permissions
-- Requires the Community tables migration.

GRANT SELECT, INSERT ON public.gallaspy_community_photos TO authenticated;

CREATE POLICY "Community photo records are readable"
ON public.gallaspy_community_photos
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts p
    WHERE p.id = post_id AND p.published_at IS NOT NULL AND p.deleted_at IS NULL
  )
);

CREATE POLICY "Post owners can attach photos"
ON public.gallaspy_community_photos
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts p
    WHERE p.id = post_id
      AND p.user_id = (SELECT auth.uid())
      AND p.published_at IS NULL
      AND p.deleted_at IS NULL
  )
  AND split_part(storage_path, chr(47), 1) = (SELECT auth.uid())::text
  AND split_part(storage_path, chr(47), 2) = post_id::text
  AND public.gallaspy_verify_community_photo(
    post_id,
    storage_path
  )
);

CREATE POLICY "Golfers can upload their own community images"
ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'gallaspy-community'
  AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
  AND EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts p
    WHERE p.id::text = (storage.foldername(name))[2]
      AND p.user_id = (SELECT auth.uid())
      AND p.published_at IS NULL
      AND p.deleted_at IS NULL
  )
);

CREATE POLICY "Signed-in golfers can view community images"
ON storage.objects
FOR SELECT TO authenticated
USING (
  bucket_id = 'gallaspy-community'
  AND (
    EXISTS (
      SELECT 1
      FROM public.gallaspy_community_photos photo
      JOIN public.gallaspy_community_posts post
        ON post.id = photo.post_id
      WHERE photo.storage_path = name
        AND post.published_at IS NOT NULL
        AND post.deleted_at IS NULL
    )
    OR EXISTS (
      SELECT 1
      FROM public.gallaspy_community_posts post
      WHERE post.id::text = (storage.foldername(name))[2]
        AND (storage.foldername(name))[1] = (SELECT auth.uid())::text
        AND post.user_id = (SELECT auth.uid())
        AND post.published_at IS NULL
        AND post.deleted_at IS NULL
    )
  )
);


CREATE POLICY "Owners can read their own draft photo records"
ON public.gallaspy_community_photos
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.gallaspy_community_posts p
    WHERE p.id = post_id
      AND p.user_id = (SELECT auth.uid())
      AND p.published_at IS NULL
      AND p.deleted_at IS NULL
  )
);
