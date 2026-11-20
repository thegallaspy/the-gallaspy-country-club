create table if not exists public.gallaspy_members_locker_codes (
  user_id uuid primary key references auth.users(id) on delete cascade,
  code_digest text not null unique check (code_digest ~ '^[0-9a-f]{64}$'),
  revoked_at timestamptz,
  failures integer not null default 0,
  blocked_until timestamptz
);
alter table public.gallaspy_members_locker_codes enable row level security;
revoke all on public.gallaspy_members_locker_codes from anon, authenticated;

create or replace function public.verify_members_locker_code(p_user uuid, p_digest text)
returns boolean language plpgsql security definer set search_path = ''
as $$
declare entry public.gallaspy_members_locker_codes%rowtype;
begin
  if not exists (
    select 1 from public.gallaspy_memberships
    where user_id = p_user and membership_status = 'approved'
      and membership_type = 'falcon_society' and founder_number is not null
  ) then return false; end if;
  select * into entry from public.gallaspy_members_locker_codes
    where user_id = p_user for update;
  if not found or entry.revoked_at is not null then return false; end if;
  if entry.blocked_until > now() then return false; end if;
  if entry.code_digest = p_digest then
    update public.gallaspy_members_locker_codes set failures=0, blocked_until=null where user_id=p_user;
    return true;
  end if;
  update public.gallaspy_members_locker_codes
    set failures=case when entry.blocked_until is not null then 1 else entry.failures+1 end,
        blocked_until=case when entry.blocked_until is null and entry.failures>=4 then now()+interval '15 minutes' else null end
    where user_id=p_user;
  return false;
end;
$$;
revoke all on function public.verify_members_locker_code(uuid,text) from public, anon, authenticated;
grant execute on function public.verify_members_locker_code(uuid,text) to service_role;
