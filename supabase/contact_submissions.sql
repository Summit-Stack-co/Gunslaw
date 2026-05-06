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

-- No public access. Server-side inserts use service role key (bypasses RLS).
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
