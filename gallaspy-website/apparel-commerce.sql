create extension if not exists pgcrypto;

create table if not exists public.apparel_orders_v2 (
  id uuid primary key default gen_random_uuid(),
  order_reference text not null unique,
  square_payment_id text not null unique,
  square_receipt_url text,
  payment_status text not null default 'completed',

  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,

  shipping_address_1 text not null,
  shipping_address_2 text,
  shipping_city text not null,
  shipping_state text not null,
  shipping_postal_code text not null,
  shipping_country text not null default 'US',

  subtotal_cents integer not null,
  shipping_cents integer not null default 0,
  tax_cents integer not null default 0,
  total_cents integer not null,

  fulfillment_status text not null default 'unfulfilled',
  created_at timestamptz not null default now()
);

create table if not exists public.apparel_order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null
    references public.apparel_orders_v2(id)
    on delete cascade,

  product_slug text not null,
  product_name text not null,
  category text not null,
  color text not null,
  mark text not null,
  size text,
  image text,

  quantity integer not null check (quantity > 0),
  unit_price_cents integer not null,
  line_total_cents integer not null,

  created_at timestamptz not null default now()
);

create index if not exists apparel_orders_v2_email_idx
  on public.apparel_orders_v2(email);

create index if not exists apparel_orders_v2_created_at_idx
  on public.apparel_orders_v2(created_at desc);

create index if not exists apparel_order_items_order_id_idx
  on public.apparel_order_items(order_id);

alter table public.apparel_orders_v2 enable row level security;
alter table public.apparel_order_items enable row level security;
