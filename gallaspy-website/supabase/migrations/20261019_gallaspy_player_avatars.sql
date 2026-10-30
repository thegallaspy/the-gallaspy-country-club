-- Stage V5A: separate avatar storage from public Community usernames.
-- Apply in Supabase SQL Editor before deploying avatar APIs.
CREATE TABLE IF NOT EXISTS public.gallaspy_player_avatars (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  storage_path text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT gallaspy_avatar_path_owner_check CHECK (
    split_part(storage_path, '/', 1) = user_id::text
    AND storage_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.jpg$'
  )
);
ALTER TABLE public.gallaspy_player_avatars ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.gallaspy_player_avatars FROM PUBLIC, anon, authenticated;
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('gallaspy-avatars', 'gallaspy-avatars', false, 1048576, ARRAY['image/jpeg'])
ON CONFLICT (id) DO NOTHING;
-- Verify storage.buckets.public = false if bucket existed earlier.
