-- The Gallaspy Golf Club
-- Community Feed: posts, photos, likes, comments and reports.
-- All content is owned by an authenticated Supabase user.

CREATE TABLE public.gallaspy_community_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL DEFAULT ''
    CHECK (char_length(body) <= 3000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz,
  deleted_at timestamptz,
  CONSTRAINT community_post_content_check
    CHECK (char_length(body) <= 3000)
);

CREATE INDEX community_posts_feed_idx
  ON public.gallaspy_community_posts (created_at DESC)
  WHERE deleted_at IS NULL;

CREATE TABLE public.gallaspy_community_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL
    REFERENCES public.gallaspy_community_posts(id) ON DELETE CASCADE,
  storage_path text NOT NULL UNIQUE,
  position integer NOT NULL DEFAULT 0
    CHECK (position BETWEEN 0 AND 3),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (post_id, position)
);

CREATE TABLE public.gallaspy_community_likes (
  post_id uuid NOT NULL
    REFERENCES public.gallaspy_community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE public.gallaspy_community_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL
    REFERENCES public.gallaspy_community_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  body text NOT NULL
    CHECK (
      char_length(trim(body)) > 0
      AND char_length(body) <= 1000
    ),
  created_at timestamptz NOT NULL DEFAULT now(),
  deleted_at timestamptz
);

CREATE INDEX community_comments_post_idx
  ON public.gallaspy_community_comments (post_id, created_at);

CREATE TABLE public.gallaspy_community_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid NOT NULL
    REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id uuid
    REFERENCES public.gallaspy_community_posts(id) ON DELETE CASCADE,
  comment_id uuid
    REFERENCES public.gallaspy_community_comments(id) ON DELETE CASCADE,
  reason text NOT NULL
    CHECK (char_length(trim(reason)) BETWEEN 5 AND 500),
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'reviewed', 'dismissed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT community_report_target_check
    CHECK (num_nonnulls(post_id, comment_id) = 1)
);

-- Prevent the same golfer from repeatedly reporting the same content.
CREATE UNIQUE INDEX community_reports_unique_post
  ON public.gallaspy_community_reports (reporter_id, post_id)
  WHERE post_id IS NOT NULL;

CREATE UNIQUE INDEX community_reports_unique_comment
  ON public.gallaspy_community_reports (reporter_id, comment_id)
  WHERE comment_id IS NOT NULL;

-- Enable RLS before exposing any Community tables.
ALTER TABLE public.gallaspy_community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_community_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_community_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_community_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallaspy_community_reports ENABLE ROW LEVEL SECURITY;

-- No client access until ownership, visibility and
-- moderation policies are installed and tested.
REVOKE ALL ON public.gallaspy_community_posts FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.gallaspy_community_photos FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.gallaspy_community_likes FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.gallaspy_community_comments FROM PUBLIC, anon, authenticated;
REVOKE ALL ON public.gallaspy_community_reports FROM PUBLIC, anon, authenticated;


-- COMMUNITY ACCESS POLICIES V1
-- Authenticated users may interact with visible posts.
-- Reports are write-only for ordinary users.

GRANT SELECT
ON public.gallaspy_community_posts TO authenticated;

GRANT SELECT, INSERT, DELETE
ON public.gallaspy_community_likes TO authenticated;

GRANT SELECT, INSERT
ON public.gallaspy_community_comments TO authenticated;

GRANT INSERT
ON public.gallaspy_community_reports TO authenticated;

CREATE POLICY "Community posts are readable"
ON public.gallaspy_community_posts
FOR SELECT TO authenticated
USING (
  published_at IS NOT NULL
  AND deleted_at IS NULL
);

-- Posts are created only through controlled SECURITY DEFINER
-- publishing and draft functions. No direct client INSERT access.


CREATE POLICY "Community likes are readable"
ON public.gallaspy_community_likes
FOR SELECT TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts p
    WHERE p.id = post_id AND p.published_at IS NOT NULL AND p.deleted_at IS NULL
  )
);

CREATE POLICY "Users like visible posts"
ON public.gallaspy_community_likes
FOR INSERT TO authenticated
WITH CHECK (
  user_id = (SELECT auth.uid())
  AND EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts p
    WHERE p.id = post_id AND p.published_at IS NOT NULL AND p.deleted_at IS NULL
  )
);

CREATE POLICY "Users remove their own likes"
ON public.gallaspy_community_likes
FOR DELETE TO authenticated
USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Community comments are readable"
ON public.gallaspy_community_comments
FOR SELECT TO authenticated
USING (
  deleted_at IS NULL
  AND EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts p
    WHERE p.id = post_id AND p.published_at IS NOT NULL AND p.deleted_at IS NULL
  )
);

CREATE POLICY "Users comment on visible posts"
ON public.gallaspy_community_comments
FOR INSERT TO authenticated
WITH CHECK (
  user_id = (SELECT auth.uid())
  AND deleted_at IS NULL
  AND EXISTS (
    SELECT 1 FROM public.gallaspy_community_posts p
    WHERE p.id = post_id AND p.published_at IS NOT NULL AND p.deleted_at IS NULL
  )
);


CREATE POLICY "Users report community content"
ON public.gallaspy_community_reports
FOR INSERT TO authenticated
WITH CHECK (
  reporter_id = (SELECT auth.uid())
  AND status = 'pending'
  AND (
    (
      post_id IS NOT NULL
      AND EXISTS (
        SELECT 1 FROM public.gallaspy_community_posts p
        WHERE p.id = post_id
          AND p.published_at IS NOT NULL
          AND p.deleted_at IS NULL
      )
    )
    OR
    (
      comment_id IS NOT NULL
      AND EXISTS (
        SELECT 1
        FROM public.gallaspy_community_comments c
        JOIN public.gallaspy_community_posts p
          ON p.id = c.post_id
        WHERE c.id = comment_id
          AND c.deleted_at IS NULL
          AND p.published_at IS NOT NULL
          AND p.deleted_at IS NULL
      )
    )
  )
);


-- COMMUNITY PHOTO STORAGE V1
-- Private bucket. Photo access policies will be added separately.

INSERT INTO storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
VALUES (
  'gallaspy-community',
  'gallaspy-community',
  false,
  5242880,
  ARRAY[
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
ON CONFLICT (id) DO NOTHING;


CREATE POLICY "Owners can read their own Community drafts"
ON public.gallaspy_community_posts
FOR SELECT TO authenticated
USING (
  user_id = (SELECT auth.uid())
  AND published_at IS NULL
  AND deleted_at IS NULL
);
