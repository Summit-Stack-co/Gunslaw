-- Run in Supabase SQL Editor if inserts fail (e.g. column "name" does not exist).
-- Older schema used `full_name` and optional `source_page`; the app expects `name` only.

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'contact_submissions'
      and column_name = 'full_name'
  ) then
    if exists (
      select 1
      from information_schema.columns
      where table_schema = 'public'
        and table_name = 'contact_submissions'
        and column_name = 'name'
    ) then
      update public.contact_submissions
      set name = coalesce(nullif(trim(name), ''), full_name)
      where name is null or trim(name) = '';

      alter table public.contact_submissions drop column full_name;
    else
      alter table public.contact_submissions rename column full_name to name;
    end if;
  end if;
end $$;

alter table public.contact_submissions drop column if exists source_page;

-- Fails if any row has null name — fix data first, then run:
alter table public.contact_submissions alter column name set not null;
