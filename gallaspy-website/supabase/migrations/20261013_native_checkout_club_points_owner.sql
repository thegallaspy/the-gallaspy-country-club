-- Associate native apparel checkout sessions with verified
-- Gallaspy accounts. Guest sessions retain a NULL user_id.

ALTER TABLE public.native_apparel_checkout_sessions
ADD COLUMN IF NOT EXISTS user_id uuid
REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS native_checkout_user_idx
ON public.native_apparel_checkout_sessions (user_id)
WHERE user_id IS NOT NULL;

-- Existing RLS and service-role-only access remain unchanged.
