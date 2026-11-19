BEGIN;
INSERT INTO storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
VALUES ('gallaspy-community-videos','gallaspy-community-videos',false,3500000,ARRAY['video/mp4']);
-- Even if another permissive storage policy exists, clients cannot directly access this bucket.
CREATE POLICY gallaspy_video_service_only ON storage.objects AS RESTRICTIVE FOR ALL TO anon, authenticated
USING (bucket_id <> 'gallaspy-community-videos') WITH CHECK (bucket_id <> 'gallaspy-community-videos');

CREATE TABLE public.gallaspy_community_videos (
  post_id uuid PRIMARY KEY REFERENCES public.gallaspy_community_posts(id) ON DELETE CASCADE,
  storage_path text NOT NULL UNIQUE,
  byte_size integer NOT NULL CHECK (byte_size BETWEEN 12 AND 3500000)
);
ALTER TABLE public.gallaspy_community_videos ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.gallaspy_community_videos FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT ON public.gallaspy_community_videos TO service_role;

CREATE FUNCTION public.gallaspy_publish_community_video(actor uuid, post uuid, caption text, bytes integer)
RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
DECLARE path text := actor::text || '/' || post::text || '.mp4';
BEGIN
  IF actor IS NULL OR post IS NULL OR caption IS NULL OR length(btrim(caption)) > 3000 OR bytes IS NULL OR bytes NOT BETWEEN 12 AND 3500000 THEN RAISE EXCEPTION 'Invalid video'; END IF;
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(actor::text,0));
  IF NOT EXISTS (SELECT 1 FROM public.gallaspy_community_profiles WHERE user_id=actor) THEN RAISE EXCEPTION 'Create a clubhouse username first'; END IF;
  IF EXISTS (SELECT 1 FROM public.gallaspy_community_posts WHERE user_id=actor AND published_at > now()-interval '60 seconds') THEN RAISE EXCEPTION 'Please wait 60 seconds before posting again'; END IF;
  IF (SELECT count(*) FROM public.gallaspy_community_posts WHERE user_id=actor AND published_at > now()-interval '24 hours') >= 20 THEN RAISE EXCEPTION 'Daily posting limit reached'; END IF;
  IF NOT EXISTS (SELECT 1 FROM storage.objects WHERE bucket_id='gallaspy-community-videos' AND name=path AND metadata->>'mimetype'='video/mp4' AND metadata->>'size'=bytes::text) THEN RAISE EXCEPTION 'Video upload could not be verified'; END IF;
  INSERT INTO public.gallaspy_community_posts(id,user_id,body,published_at) VALUES(post,actor,btrim(caption),now());
  INSERT INTO public.gallaspy_community_videos(post_id,storage_path,byte_size) VALUES(post,path,bytes);
  RETURN post;
END;
$$;
REVOKE ALL ON FUNCTION public.gallaspy_publish_community_video(uuid,uuid,text,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.gallaspy_publish_community_video(uuid,uuid,text,integer) TO service_role;

CREATE FUNCTION public.gallaspy_visible_community_videos(viewer uuid, posts uuid[])
RETURNS TABLE(post_id uuid,storage_path text) LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT v.post_id,v.storage_path FROM public.gallaspy_community_videos v
  JOIN public.gallaspy_community_posts p ON p.id=v.post_id
  WHERE p.id=ANY(posts) AND p.published_at IS NOT NULL AND p.deleted_at IS NULL
  AND NOT EXISTS (SELECT 1 FROM public.gallaspy_community_blocks b WHERE (b.blocker_id=viewer AND b.blocked_id=p.user_id) OR (b.blocked_id=viewer AND b.blocker_id=p.user_id));
$$;
REVOKE ALL ON FUNCTION public.gallaspy_visible_community_videos(uuid,uuid[]) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.gallaspy_visible_community_videos(uuid,uuid[]) TO service_role;
COMMIT;
