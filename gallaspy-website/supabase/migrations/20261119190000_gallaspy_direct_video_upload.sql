BEGIN;
UPDATE storage.buckets SET file_size_limit=20000000 WHERE id='gallaspy-community-videos' AND public=false;
ALTER TABLE public.gallaspy_community_videos DROP CONSTRAINT gallaspy_community_videos_byte_size_check;
ALTER TABLE public.gallaspy_community_videos ADD CONSTRAINT gallaspy_community_videos_byte_size_check CHECK (byte_size BETWEEN 12 AND 20000000);

CREATE TABLE public.gallaspy_video_upload_reservations (
  post_id uuid PRIMARY KEY,
  actor uuid NOT NULL,
  byte_size integer NOT NULL CHECK (byte_size BETWEEN 3500001 AND 20000000),
  created_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);
ALTER TABLE public.gallaspy_video_upload_reservations ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.gallaspy_video_upload_reservations FROM PUBLIC,anon,authenticated;
GRANT SELECT,INSERT,UPDATE ON public.gallaspy_video_upload_reservations TO service_role;
CREATE INDEX gallaspy_video_reservation_actor_time ON public.gallaspy_video_upload_reservations(actor,created_at);

CREATE FUNCTION public.gallaspy_reserve_video_upload(p_actor uuid,p_post uuid,p_bytes integer)
RETURNS text LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE r public.gallaspy_video_upload_reservations%ROWTYPE;
BEGIN
  IF p_actor IS NULL OR p_post IS NULL OR p_bytes IS NULL OR p_bytes NOT BETWEEN 3500001 AND 20000000 THEN RAISE EXCEPTION 'Invalid upload'; END IF;
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_actor::text,0));
  IF NOT EXISTS (SELECT 1 FROM public.gallaspy_community_profiles WHERE user_id=p_actor) THEN RAISE EXCEPTION 'Create a clubhouse username first'; END IF;
  SELECT * INTO r FROM public.gallaspy_video_upload_reservations WHERE post_id=p_post;
  IF FOUND THEN
    IF r.actor<>p_actor OR r.byte_size<>p_bytes THEN RAISE EXCEPTION 'Invalid upload'; END IF;
    IF r.published_at IS NOT NULL THEN RETURN 'published'; END IF;
    IF r.created_at <= now()-interval '15 minutes' THEN RETURN 'finalize_only'; END IF;
    RETURN 'reserved';
  END IF;
  IF (SELECT count(*) FROM public.gallaspy_video_upload_reservations WHERE actor=p_actor AND created_at>now()-interval '24 hours')>=5 THEN RAISE EXCEPTION 'Daily large video upload limit reached'; END IF;
  IF (SELECT count(*) FROM public.gallaspy_video_upload_reservations WHERE actor=p_actor AND published_at IS NULL)>=10 THEN RAISE EXCEPTION 'Unfinished upload limit reached; contact club support'; END IF;
  INSERT INTO public.gallaspy_video_upload_reservations(post_id,actor,byte_size) VALUES(p_post,p_actor,p_bytes);
  RETURN 'reserved';
END;
$$;
REVOKE ALL ON FUNCTION public.gallaspy_reserve_video_upload(uuid,uuid,integer) FROM PUBLIC,anon,authenticated;
GRANT EXECUTE ON FUNCTION public.gallaspy_reserve_video_upload(uuid,uuid,integer) TO service_role;

CREATE OR REPLACE FUNCTION public.gallaspy_publish_community_video(actor uuid, post uuid, caption text, bytes integer)
RETURNS uuid LANGUAGE plpgsql SECURITY INVOKER SET search_path='' AS $$
DECLARE path text := actor::text || '/' || post::text || '.mp4';
BEGIN
  IF actor IS NULL OR post IS NULL OR caption IS NULL OR length(btrim(caption))>3000 OR bytes IS NULL OR bytes NOT BETWEEN 12 AND 20000000 THEN RAISE EXCEPTION 'Invalid video'; END IF;
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(actor::text,0));
  IF EXISTS (SELECT 1 FROM public.gallaspy_community_videos WHERE post_id=post AND storage_path=path) THEN RETURN post; END IF;
  IF bytes>3500000 AND NOT EXISTS (SELECT 1 FROM public.gallaspy_video_upload_reservations r WHERE r.post_id=post AND r.actor=$1 AND r.byte_size=bytes AND r.published_at IS NULL AND r.created_at>now()-interval '3 hours') THEN RAISE EXCEPTION 'Invalid or expired upload reservation'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.gallaspy_community_profiles WHERE user_id=actor) THEN RAISE EXCEPTION 'Create a clubhouse username first'; END IF;
  IF EXISTS (SELECT 1 FROM public.gallaspy_community_posts WHERE user_id=actor AND published_at>now()-interval '60 seconds') THEN RAISE EXCEPTION 'Please wait 60 seconds before posting again'; END IF;
  IF (SELECT count(*) FROM public.gallaspy_community_posts WHERE user_id=actor AND published_at>now()-interval '24 hours')>=20 THEN RAISE EXCEPTION 'Daily posting limit reached'; END IF;
  IF NOT EXISTS (SELECT 1 FROM storage.objects WHERE bucket_id='gallaspy-community-videos' AND name=path AND metadata->>'mimetype'='video/mp4' AND metadata->>'size'=bytes::text) THEN RAISE EXCEPTION 'Video upload could not be verified'; END IF;
  INSERT INTO public.gallaspy_community_posts(id,user_id,body,published_at) VALUES(post,actor,btrim(caption),now());
  INSERT INTO public.gallaspy_community_videos(post_id,storage_path,byte_size) VALUES(post,path,bytes);
  UPDATE public.gallaspy_video_upload_reservations r SET published_at=now() WHERE r.post_id=post AND r.actor=$1;
  RETURN post;
END;
$$;
COMMIT;
