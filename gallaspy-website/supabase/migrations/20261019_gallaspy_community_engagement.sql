-- Gallaspy Community V6. Apply only after reviewing the previously-installed Community migrations.
-- Blocking is enforced by the server feed and interaction APIs; do not call their service-role
-- readers from other routes without also considering this table.
CREATE TABLE IF NOT EXISTS public.gallaspy_community_blocks (
  blocker_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  blocked_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (blocker_id, blocked_id),
  CONSTRAINT gallaspy_community_no_self_block CHECK (blocker_id <> blocked_id)
);
CREATE INDEX IF NOT EXISTS gallaspy_community_blocks_target_idx
  ON public.gallaspy_community_blocks (blocked_id, blocker_id);
ALTER TABLE public.gallaspy_community_blocks ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.gallaspy_community_blocks FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, DELETE ON public.gallaspy_community_blocks TO authenticated;
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies
      WHERE schemaname='public' AND tablename='gallaspy_community_blocks'
      AND policyname='Golfer can view their blocks') THEN
    CREATE POLICY "Golfer can view their blocks" ON public.gallaspy_community_blocks
    FOR SELECT TO authenticated USING (blocker_id = (SELECT auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies
      WHERE schemaname='public' AND tablename='gallaspy_community_blocks'
      AND policyname='Golfer can block another account') THEN
    CREATE POLICY "Golfer can block another account" ON public.gallaspy_community_blocks
    FOR INSERT TO authenticated WITH CHECK (
      blocker_id = (SELECT auth.uid()) AND blocked_id <> (SELECT auth.uid()));
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies
      WHERE schemaname='public' AND tablename='gallaspy_community_blocks'
      AND policyname='Golfer can unblock an account') THEN
    CREATE POLICY "Golfer can unblock an account" ON public.gallaspy_community_blocks
    FOR DELETE TO authenticated USING (blocker_id = (SELECT auth.uid()));
  END IF;
END $$;

-- Batched engagement metrics: RLS applied to posts/likes/comments, no private-account data returned.
CREATE OR REPLACE FUNCTION public.gallaspy_community_engagement(p_post_ids uuid[])
RETURNS TABLE (post_id uuid, likes_count bigint, comments_count bigint, viewer_liked boolean)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT p.id,
    (SELECT count(*) FROM public.gallaspy_community_likes l WHERE l.post_id = p.id),
    (SELECT count(*) FROM public.gallaspy_community_comments c
      WHERE c.post_id = p.id AND c.deleted_at IS NULL),
    EXISTS (SELECT 1 FROM public.gallaspy_community_likes mine
      WHERE mine.post_id = p.id AND mine.user_id = (SELECT auth.uid()))
  FROM public.gallaspy_community_posts p
  WHERE (SELECT auth.uid()) IS NOT NULL
    AND cardinality(p_post_ids) BETWEEN 1 AND 20
    AND p.id = ANY(p_post_ids)
    AND p.published_at IS NOT NULL AND p.deleted_at IS NULL;
$$;
REVOKE ALL ON FUNCTION public.gallaspy_community_engagement(uuid[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.gallaspy_community_engagement(uuid[]) TO authenticated;

-- Server-side anti-spam guard for replies; database lock makes rate limits
-- resistant to two concurrent POST requests from the same account.
CREATE OR REPLACE FUNCTION public.gallaspy_guard_community_comment()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = '' AS $$
BEGIN
  IF (SELECT auth.uid()) IS NULL OR NEW.user_id <> (SELECT auth.uid()) THEN
    RAISE EXCEPTION 'Authenticated comment ownership required';
  END IF;
  PERFORM pg_catalog.pg_advisory_xact_lock(
    pg_catalog.hashtextextended(NEW.user_id::text, 17));
  IF EXISTS (
    SELECT 1 FROM public.gallaspy_community_comments c
    WHERE c.user_id = NEW.user_id AND c.created_at > now() - interval '10 seconds'
  ) THEN
    RAISE EXCEPTION 'Please wait before commenting again';
  END IF;
  IF (
    SELECT count(*) FROM public.gallaspy_community_comments c
    WHERE c.user_id = NEW.user_id AND c.created_at > now() - interval '24 hours'
  ) >= 100 THEN
    RAISE EXCEPTION 'Daily comment limit reached';
  END IF;
  RETURN NEW;
END;
$$;
REVOKE ALL ON FUNCTION public.gallaspy_guard_community_comment() FROM PUBLIC, anon, authenticated;
DROP TRIGGER IF EXISTS gallaspy_guard_community_comment_before_insert
  ON public.gallaspy_community_comments;
CREATE TRIGGER gallaspy_guard_community_comment_before_insert
  BEFORE INSERT ON public.gallaspy_community_comments
  FOR EACH ROW EXECUTE FUNCTION public.gallaspy_guard_community_comment();
