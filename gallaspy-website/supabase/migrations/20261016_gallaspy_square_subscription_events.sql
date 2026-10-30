-- The Gallaspy Golf Club
-- Square subscription webhook event tracking.
-- Only trusted server operations may access these records.

CREATE TABLE IF NOT EXISTS
  public.gallaspy_square_subscription_events (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    square_event_id text NOT NULL UNIQUE,
    event_type text NOT NULL,
    processing_status text NOT NULL DEFAULT 'pending'
      CHECK (processing_status IN (
        'pending', 'processing', 'completed', 'failed'
      )),
    attempt_count integer NOT NULL DEFAULT 0
      CHECK (attempt_count >= 0),
    processing_started_at timestamptz,
    last_error text,
    received_at timestamptz NOT NULL DEFAULT now(),
    processed_at timestamptz
  );

ALTER TABLE public.gallaspy_square_subscription_events
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.gallaspy_square_subscription_events
  FROM PUBLIC, anon, authenticated;

CREATE INDEX IF NOT EXISTS
  gallaspy_square_subscription_events_status_idx
  ON public.gallaspy_square_subscription_events
  (processing_status, received_at);
