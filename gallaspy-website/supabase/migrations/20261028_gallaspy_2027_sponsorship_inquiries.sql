-- THE GALLASPY 2027
-- Sponsorship inquiry storage
-- Additive migration. Existing records remain unchanged.

create table if not exists
public.gallaspy_sponsorship_inquiries (
    id uuid primary key default gen_random_uuid(),

    application_reference text
        generated always as (
            'GAL27-' ||
            upper(replace(id::text, '-', ''))
        ) stored unique,

    submission_key uuid not null unique,

    event_code text not null
        default 'the-gallaspy-2027',

    company_name text not null,
    contact_name text not null,
    email text not null,
    phone text not null,
    website text,
    industry text not null,

    sponsorship_package text not null,
    estimated_budget text not null,
    partnership_type text not null,
    proposed_activation text,
    additional_information text,

    preferred_contact_method text not null
        check (
            preferred_contact_method in
            ('email', 'phone')
        ),

    contact_consent boolean not null
        default false,

    application_status text not null
        default 'new_inquiry'
        check (
            application_status in (
                'new_inquiry',
                'under_review',
                'contacted',
                'negotiating',
                'approved',
                'confirmed',
                'declined',
                'withdrawn'
            )
        ),

    internal_notes text,
    assigned_administrator uuid,
    follow_up_date date,

    notification_status text not null
        default 'pending'
        check (
            notification_status in (
                'pending',
                'sent',
                'failed'
            )
        ),

    created_at timestamptz not null
        default now(),

    updated_at timestamptz not null
        default now()
);

create index if not exists
gallaspy_sponsor_inquiries_status_idx
on public.gallaspy_sponsorship_inquiries
(application_status, created_at desc);

create index if not exists
gallaspy_sponsor_inquiries_email_idx
on public.gallaspy_sponsorship_inquiries
(lower(email));

create index if not exists
gallaspy_sponsor_inquiries_created_idx
on public.gallaspy_sponsorship_inquiries
(created_at desc);

-- No direct public database access.
-- Public submissions will pass through a validated
-- server-side API using privileged server credentials.
-- Administrative access will also be enforced server-side.

alter table public.gallaspy_sponsorship_inquiries
enable row level security;

revoke all on table
public.gallaspy_sponsorship_inquiries
from anon, authenticated;

grant select, insert, update
on table public.gallaspy_sponsorship_inquiries
to service_role;

-- No anon/authenticated RLS policies are created.
-- A public visitor cannot directly read applications.

-- No automatic payments.
-- No automatic sponsor approvals.
-- No changes to existing membership or event tables.
