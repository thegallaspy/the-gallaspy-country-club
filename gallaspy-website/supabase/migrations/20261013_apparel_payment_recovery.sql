CREATE TABLE public.apparel_payment_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  native_session_id uuid REFERENCES
    public.native_apparel_checkout_sessions(id),
  idempotency_key uuid NOT NULL UNIQUE,
  order_reference text NOT NULL UNIQUE,
  order_payload jsonb NOT NULL,
  order_items jsonb NOT NULL,
  amount_cents integer NOT NULL CHECK (amount_cents > 0),
  payment_state text NOT NULL DEFAULT 'prepared'
    CHECK (payment_state IN (
      'prepared',
      'processing',
      'completed',
      'needs_review'
    )),
  square_payment_id text UNIQUE,
  square_receipt_url text,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  payment_started_at timestamptz,
  payment_completed_at timestamptz,
  reconciled_at timestamptz,
  CONSTRAINT apparel_attempt_order_object
    CHECK (jsonb_typeof(order_payload) = 'object'),
  CONSTRAINT apparel_attempt_items_array
    CHECK (
      jsonb_typeof(order_items) = 'array'
      AND jsonb_array_length(order_items) > 0
    )
);

CREATE INDEX apparel_payment_attempts_state_idx
  ON public.apparel_payment_attempts (
    payment_state,
    created_at
  );

CREATE INDEX apparel_payment_attempts_session_idx
  ON public.apparel_payment_attempts (
    native_session_id
  );

ALTER TABLE public.apparel_payment_attempts
  ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.apparel_payment_attempts
  FROM PUBLIC, anon, authenticated;

GRANT SELECT, INSERT, UPDATE
  ON public.apparel_payment_attempts
  TO service_role;

CREATE UNIQUE INDEX apparel_payment_attempts_native_session_unique
  ON public.apparel_payment_attempts (native_session_id)
  WHERE native_session_id IS NOT NULL;
