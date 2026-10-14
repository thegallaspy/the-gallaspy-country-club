-- Gallaspy Club Points
-- Every balance is derived from an immutable transaction ledger.

CREATE TABLE IF NOT EXISTS public.gallaspy_points_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  points integer NOT NULL CHECK (points <> 0),
  transaction_type text NOT NULL CHECK (
    transaction_type IN ('earn', 'redeem', 'adjustment', 'reversal')
  ),
  source_type text NOT NULL,
  source_id text NOT NULL,
  description text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT gallaspy_points_source_unique
    UNIQUE (user_id, source_type, source_id),
  CONSTRAINT gallaspy_points_direction_check CHECK (
    (transaction_type = 'earn' AND points > 0)
    OR (transaction_type = 'redeem' AND points < 0)
    OR (transaction_type IN ('adjustment', 'reversal'))
  )
);

CREATE INDEX IF NOT EXISTS gallaspy_points_user_created_idx
  ON public.gallaspy_points_ledger (user_id, created_at DESC);

ALTER TABLE public.gallaspy_points_ledger
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.gallaspy_points_ledger
  FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.gallaspy_points_ledger
  TO authenticated;

CREATE POLICY "Users can read their own points"
  ON public.gallaspy_points_ledger
  FOR SELECT
  TO authenticated
  USING ((SELECT auth.uid()) = user_id);

-- Prevent ordinary app accounts from inserting, editing,
-- or deleting points transactions.
-- Awards and redemptions must go through trusted server logic.

CREATE OR REPLACE VIEW public.gallaspy_points_balances
WITH (security_invoker = true)
AS
SELECT
  user_id,
  COALESCE(SUM(points), 0)::bigint AS available_points,
  COALESCE(
    SUM(CASE WHEN points > 0 AND transaction_type = 'earn'
      THEN points ELSE 0 END), 0
  )::bigint AS lifetime_earned
FROM public.gallaspy_points_ledger
GROUP BY user_id;

REVOKE ALL ON public.gallaspy_points_balances
  FROM PUBLIC, anon, authenticated;

GRANT SELECT ON public.gallaspy_points_balances
  TO authenticated;

-- Serialize balance changes per user and prevent overspending.
CREATE OR REPLACE FUNCTION public.gallaspy_points_guard()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_balance bigint;
BEGIN
  -- Lock the account so concurrent transactions cannot
  -- independently spend the same available points.
  PERFORM 1
  FROM auth.users
  WHERE id = NEW.user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Points account does not exist';
  END IF;

  SELECT COALESCE(SUM(points), 0)
  INTO current_balance
  FROM public.gallaspy_points_ledger
  WHERE user_id = NEW.user_id;

  IF current_balance + NEW.points < 0 THEN
    RAISE EXCEPTION 'Insufficient Club Points balance';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE ALL ON FUNCTION public.gallaspy_points_guard()
  FROM PUBLIC, anon, authenticated;

CREATE TRIGGER gallaspy_points_balance_guard
BEFORE INSERT ON public.gallaspy_points_ledger
FOR EACH ROW
EXECUTE FUNCTION public.gallaspy_points_guard();

-- Preserve the transaction history.
CREATE OR REPLACE FUNCTION public.gallaspy_points_prevent_changes()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  RAISE EXCEPTION
    'Club Points transactions are immutable; create a reversal instead';
END;
$$;

REVOKE ALL ON FUNCTION public.gallaspy_points_prevent_changes()
  FROM PUBLIC, anon, authenticated;

CREATE TRIGGER gallaspy_points_immutable
BEFORE UPDATE OR DELETE ON public.gallaspy_points_ledger
FOR EACH ROW
EXECUTE FUNCTION public.gallaspy_points_prevent_changes();
