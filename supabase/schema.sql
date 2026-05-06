-- J. Gunnell Law, LLC — SMS consent submissions
-- Run in Supabase SQL Editor or via migration tooling.

create table if not exists public.sms_consent_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text null,
  consent_choice text not null check (consent_choice in ('opt_in', 'opt_out')),
  consent_checkbox_confirmed boolean not null default false,
  consent_text text not null,
  consent_text_version text not null default 'v1.0',
  source_page text not null default '/sms-consent',
  ip_address text null,
  user_agent text null,
  created_at timestamptz not null default now()
);

create index if not exists sms_consent_submissions_phone_idx
  on public.sms_consent_submissions (phone);

create index if not exists sms_consent_submissions_consent_choice_idx
  on public.sms_consent_submissions (consent_choice);

create index if not exists sms_consent_submissions_created_at_idx
  on public.sms_consent_submissions (created_at desc);

alter table public.sms_consent_submissions enable row level security;

-- Block anon/authenticated REST access; server inserts use service role (bypasses RLS).
create policy "sms_consent_deny_anon_select"
  on public.sms_consent_submissions
  for select
  to anon
  using (false);

create policy "sms_consent_deny_anon_insert"
  on public.sms_consent_submissions
  for insert
  to anon
  with check (false);

create policy "sms_consent_deny_anon_update"
  on public.sms_consent_submissions
  for update
  to anon
  using (false);

create policy "sms_consent_deny_anon_delete"
  on public.sms_consent_submissions
  for delete
  to anon
  using (false);

create policy "sms_consent_deny_authenticated_select"
  on public.sms_consent_submissions
  for select
  to authenticated
  using (false);

create policy "sms_consent_deny_authenticated_insert"
  on public.sms_consent_submissions
  for insert
  to authenticated
  with check (false);

create policy "sms_consent_deny_authenticated_update"
  on public.sms_consent_submissions
  for update
  to authenticated
  using (false);

create policy "sms_consent_deny_authenticated_delete"
  on public.sms_consent_submissions
  for delete
  to authenticated
  using (false);

-- Latest row per phone (for operational review; still respect RLS when queried with non–service-role).
create or replace view public.sms_latest_consent_status as
select distinct on (phone)
  phone,
  full_name,
  email,
  consent_choice,
  created_at,
  consent_text_version
from public.sms_consent_submissions
order by phone, created_at desc;

comment on table public.sms_consent_submissions is 'SMS opt-in/opt-out captured via /sms-consent; inserts only from server API (service role).';

-- Contact page message submissions (server API + service role only)
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text null,
  message text not null,
  ip_address text null,
  user_agent text null,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists contact_submissions_email_idx
  on public.contact_submissions (email);

alter table public.contact_submissions enable row level security;

create policy "contact_sub_deny_anon_select"
  on public.contact_submissions for select to anon using (false);

create policy "contact_sub_deny_anon_insert"
  on public.contact_submissions for insert to anon with check (false);

create policy "contact_sub_deny_anon_update"
  on public.contact_submissions for update to anon using (false);

create policy "contact_sub_deny_anon_delete"
  on public.contact_submissions for delete to anon using (false);

create policy "contact_sub_deny_auth_select"
  on public.contact_submissions for select to authenticated using (false);

create policy "contact_sub_deny_auth_insert"
  on public.contact_submissions for insert to authenticated with check (false);

create policy "contact_sub_deny_auth_update"
  on public.contact_submissions for update to authenticated using (false);

create policy "contact_sub_deny_auth_delete"
  on public.contact_submissions for delete to authenticated using (false);

comment on table public.contact_submissions is 'Contact form on /contact; inserts only from server API (service role).';
