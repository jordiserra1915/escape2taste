create table if not exists public.experiences (
  id text primary key,
  title text not null,
  description text not null,
  price_eur integer not null check (price_eur > 0),
  city text not null,
  duration_hours integer not null default 3,
  level text not null default 'easy',
  image_url text not null default '',
  tags text[] not null default '{}'
);

create table if not exists public.purchases (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  experience_id text not null references public.experiences(id) on delete cascade,
  stripe_session_id text not null unique,
  amount_eur integer not null check (amount_eur > 0),
  created_at timestamptz not null default now()
);

alter table public.experiences enable row level security;
alter table public.purchases enable row level security;

drop policy if exists "Public experiences are readable" on public.experiences;
create policy "Public experiences are readable"
  on public.experiences
  for select
  to authenticated, anon
  using (true);

drop policy if exists "Users can read own purchases" on public.purchases;
create policy "Users can read own purchases"
  on public.purchases
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert own purchases" on public.purchases;
create policy "Users can insert own purchases"
  on public.purchases
  for insert
  to authenticated
  with check (auth.uid() = user_id);
