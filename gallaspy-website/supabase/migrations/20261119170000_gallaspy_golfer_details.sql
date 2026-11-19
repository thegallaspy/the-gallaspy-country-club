BEGIN;
CREATE TABLE public.gallaspy_golfer_details (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  bio text NOT NULL DEFAULT '' CHECK (char_length(bio) <= 300),
  home_course text NOT NULL DEFAULT '' CHECK (char_length(home_course) <= 100),
  experience text NOT NULL DEFAULT '' CHECK (experience IN ('','beginner','recreational','competitive')),
  playing_style text NOT NULL DEFAULT '' CHECK (playing_style IN ('','casual','practice','competition')),
  personal_highlight text NOT NULL DEFAULT '' CHECK (char_length(personal_highlight) <= 180),
  share_details boolean NOT NULL DEFAULT false,
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.gallaspy_golfer_details ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.gallaspy_golfer_details FROM PUBLIC, anon, authenticated;
GRANT SELECT, INSERT, UPDATE ON public.gallaspy_golfer_details TO service_role;

-- Return optional profile fields only when the owner opted in and neither golfer blocked the other.
CREATE FUNCTION public.gallaspy_read_golfer_details(viewer uuid, target uuid)
RETURNS TABLE(bio text, home_course text, experience text, playing_style text, personal_highlight text, share_details boolean)
LANGUAGE sql STABLE SECURITY INVOKER SET search_path = '' AS $$
  SELECT d.bio, d.home_course, d.experience, d.playing_style, d.personal_highlight, d.share_details
  FROM public.gallaspy_golfer_details d
  JOIN public.gallaspy_community_profiles p ON p.user_id = d.user_id
  WHERE d.user_id = target AND (viewer = target OR d.share_details)
  AND NOT EXISTS (SELECT 1 FROM public.gallaspy_community_blocks b
    WHERE (b.blocker_id = viewer AND b.blocked_id = target) OR (b.blocker_id = target AND b.blocked_id = viewer));
$$;
REVOKE ALL ON FUNCTION public.gallaspy_read_golfer_details(uuid,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.gallaspy_read_golfer_details(uuid,uuid) TO service_role;
COMMIT;
