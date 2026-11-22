create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  venue text not null default '',
  city text not null default 'Алексеевка',
  starts_at timestamptz not null,
  description text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.events add column if not exists ticket_url text not null default '';

alter table public.admin_users enable row level security;
alter table public.events enable row level security;

grant select on public.admin_users to anon, authenticated;
grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;

create policy "admins can read admin list" on public.admin_users for select to authenticated
  using (user_id = auth.uid());
create policy "public can read published events" on public.events for select to anon, authenticated
  using (published = true or exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
create policy "admins can insert events" on public.events for insert to authenticated
  with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
create policy "admins can update events" on public.events for update to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()))
  with check (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
create policy "admins can delete events" on public.events for delete to authenticated
  using (exists (select 1 from public.admin_users a where a.user_id = auth.uid()));
