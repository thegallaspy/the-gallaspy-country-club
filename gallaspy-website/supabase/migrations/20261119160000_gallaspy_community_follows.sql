BEGIN;

CREATE TABLE public.gallaspy_community_follows (
  follower_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  followed_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (follower_id, followed_id),
  CHECK (follower_id <> followed_id)
);
CREATE INDEX gallaspy_community_follows_incoming_idx ON public.gallaspy_community_follows(followed_id, created_at DESC);
ALTER TABLE public.gallaspy_community_follows ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.gallaspy_community_follows FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, DELETE ON public.gallaspy_community_follows TO service_role;

-- Serialize block/follow changes for the same unordered pair. Blocking removes both edges.
CREATE FUNCTION public.gallaspy_remove_blocked_follows() RETURNS trigger
LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(least(NEW.blocker_id, NEW.blocked_id)::text || greatest(NEW.blocker_id, NEW.blocked_id)::text, 0));
  DELETE FROM public.gallaspy_community_follows
    WHERE (follower_id = NEW.blocker_id AND followed_id = NEW.blocked_id)
       OR (follower_id = NEW.blocked_id AND followed_id = NEW.blocker_id);
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.gallaspy_remove_blocked_follows() FROM PUBLIC, anon, authenticated;
CREATE TRIGGER gallaspy_remove_blocked_follows AFTER INSERT ON public.gallaspy_community_blocks
FOR EACH ROW EXECUTE FUNCTION public.gallaspy_remove_blocked_follows();

CREATE FUNCTION public.gallaspy_set_community_follow(viewer uuid, target uuid, enabled boolean) RETURNS boolean
LANGUAGE plpgsql SECURITY INVOKER SET search_path = '' AS $$
BEGIN
  IF viewer IS NULL OR target IS NULL OR viewer = target OR enabled IS NULL THEN RETURN false; END IF;
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(least(viewer, target)::text || greatest(viewer, target)::text, 0));
  IF NOT enabled THEN
    DELETE FROM public.gallaspy_community_follows WHERE follower_id = viewer AND followed_id = target;
    RETURN true;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.gallaspy_community_profiles WHERE user_id = viewer)
     OR NOT EXISTS (SELECT 1 FROM public.gallaspy_community_profiles WHERE user_id = target)
     OR EXISTS (SELECT 1 FROM public.gallaspy_community_blocks WHERE (blocker_id = viewer AND blocked_id = target) OR (blocker_id = target AND blocked_id = viewer)) THEN RETURN false; END IF;
  -- Serialize outgoing additions too, so the launch limit cannot be raced.
  PERFORM pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended('gallaspy-follow-limit:' || viewer::text, 0));
  IF EXISTS (SELECT 1 FROM public.gallaspy_community_follows WHERE follower_id = viewer AND followed_id = target) THEN RETURN true; END IF;
  IF (SELECT count(*) FROM public.gallaspy_community_follows WHERE follower_id = viewer) >= 100 THEN RETURN false; END IF;
  INSERT INTO public.gallaspy_community_follows(follower_id, followed_id) VALUES(viewer, target) ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.gallaspy_set_community_follow(uuid, uuid, boolean) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gallaspy_set_community_follow(uuid, uuid, boolean) TO service_role;

-- Only the requesting golfer's connections are returned; blocked pairs are excluded again on read.
CREATE FUNCTION public.gallaspy_community_connections(viewer uuid, incoming boolean, page_offset integer DEFAULT 0)
RETURNS TABLE(user_id uuid, username text) LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT p.user_id, p.username::text
  FROM public.gallaspy_community_follows f
  JOIN public.gallaspy_community_profiles p ON p.user_id = CASE WHEN incoming THEN f.follower_id ELSE f.followed_id END
  WHERE (CASE WHEN incoming THEN f.followed_id ELSE f.follower_id END) = viewer
  AND NOT EXISTS (SELECT 1 FROM public.gallaspy_community_blocks b WHERE (b.blocker_id = viewer AND b.blocked_id = p.user_id) OR (b.blocker_id = p.user_id AND b.blocked_id = viewer))
  ORDER BY f.created_at DESC, p.user_id
  LIMIT 100 OFFSET greatest(0, page_offset);
$$;
REVOKE ALL ON FUNCTION public.gallaspy_community_connections(uuid, boolean, integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gallaspy_community_connections(uuid, boolean, integer) TO service_role;

COMMIT;
