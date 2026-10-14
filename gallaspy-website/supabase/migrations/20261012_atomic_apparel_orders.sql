CREATE OR REPLACE FUNCTION public.save_atomic_apparel_order(
  p_order jsonb,
  p_items jsonb
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
DECLARE
  v_order_id uuid;
  v_item jsonb;
  v_items_subtotal bigint;
BEGIN
  IF p_order IS NULL
     OR jsonb_typeof(p_order) IS DISTINCT FROM 'object'
     OR p_items IS NULL
     OR jsonb_typeof(p_items) IS DISTINCT FROM 'array'
     OR jsonb_array_length(p_items) = 0
  THEN
    RAISE EXCEPTION 'Invalid apparel order payload';
  END IF;

  IF NULLIF(TRIM(p_order->>'square_payment_id'), '') IS NULL
     OR p_order->>'payment_status' IS DISTINCT FROM 'completed'
     OR NULLIF(TRIM(p_order->>'order_reference'), '') IS NULL
  THEN
    RAISE EXCEPTION 'Invalid confirmed payment information';
  END IF;

  IF (p_order->>'subtotal_cents')::bigint IS NULL
     OR (p_order->>'subtotal_cents')::bigint < 0
     OR (p_order->>'shipping_cents')::bigint IS NULL
     OR (p_order->>'shipping_cents')::bigint < 0
     OR (p_order->>'tax_cents')::bigint IS NULL
     OR (p_order->>'tax_cents')::bigint < 0
     OR (p_order->>'total_cents')::bigint IS NULL
     OR (p_order->>'total_cents')::bigint < 0
     OR (p_order->>'total_cents')::bigint <>
        (p_order->>'subtotal_cents')::bigint
        + (p_order->>'shipping_cents')::bigint
        + (p_order->>'tax_cents')::bigint
  THEN
    RAISE EXCEPTION 'Invalid apparel order totals';
  END IF;

  IF EXISTS (
    SELECT 1
    FROM jsonb_array_elements(p_items) AS item
    WHERE jsonb_typeof(item) IS DISTINCT FROM 'object'
       OR (item->>'quantity')::integer IS NULL
       OR (item->>'quantity')::integer <= 0
       OR (item->>'unit_price_cents')::bigint IS NULL
       OR (item->>'unit_price_cents')::bigint < 0
       OR (item->>'line_total_cents')::bigint IS NULL
       OR (item->>'line_total_cents')::bigint <>
          (item->>'quantity')::bigint
          * (item->>'unit_price_cents')::bigint
  ) THEN
    RAISE EXCEPTION 'Invalid apparel order item';
  END IF;

  SELECT SUM(
    (item->>'line_total_cents')::bigint
  )
  INTO v_items_subtotal
  FROM jsonb_array_elements(p_items) AS item;

  IF v_items_subtotal IS DISTINCT FROM
     (p_order->>'subtotal_cents')::bigint
  THEN
    RAISE EXCEPTION 'Apparel order subtotal mismatch';
  END IF;

  INSERT INTO public.apparel_orders_v2 (
    order_reference,
    square_payment_id,
    square_receipt_url,
    payment_status,
    first_name,
    last_name,
    email,
    phone,
    shipping_address_1,
    shipping_address_2,
    shipping_city,
    shipping_state,
    shipping_postal_code,
    shipping_country,
    subtotal_cents,
    shipping_cents,
    tax_cents,
    total_cents,
    fulfillment_status
  )
  VALUES (
    p_order->>'order_reference',
    p_order->>'square_payment_id',
    p_order->>'square_receipt_url',
    p_order->>'payment_status',
    p_order->>'first_name',
    p_order->>'last_name',
    p_order->>'email',
    p_order->>'phone',
    p_order->>'shipping_address_1',
    p_order->>'shipping_address_2',
    p_order->>'shipping_city',
    p_order->>'shipping_state',
    p_order->>'shipping_postal_code',
    p_order->>'shipping_country',
    (p_order->>'subtotal_cents')::integer,
    (p_order->>'shipping_cents')::integer,
    (p_order->>'tax_cents')::integer,
    (p_order->>'total_cents')::integer,
    p_order->>'fulfillment_status'
  )
  RETURNING id INTO v_order_id;

  FOR v_item IN
    SELECT value
    FROM jsonb_array_elements(p_items)
  LOOP
    INSERT INTO public.apparel_order_items (
      order_id,
      product_slug,
      product_name,
      category,
      color,
      mark,
      size,
      image,
      quantity,
      unit_price_cents,
      line_total_cents
    )
    VALUES (
      v_order_id,
      v_item->>'product_slug',
      v_item->>'product_name',
      v_item->>'category',
      v_item->>'color',
      v_item->>'mark',
      v_item->>'size',
      v_item->>'image',
      (v_item->>'quantity')::integer,
      (v_item->>'unit_price_cents')::integer,
      (v_item->>'line_total_cents')::integer
    );
  END LOOP;

  RETURN v_order_id;
END;
$$;

REVOKE ALL ON FUNCTION public.save_atomic_apparel_order(
  jsonb, jsonb
) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.save_atomic_apparel_order(
  jsonb, jsonb
) TO service_role;
