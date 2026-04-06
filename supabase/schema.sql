create table if not exists experiences (
  id text primary key,
  title text not null,
  city text not null,
  duration_hours int not null check (duration_hours > 0),
  level text not null check (level in ('easy', 'intermediate', 'hard')),
  price_eur int not null check (price_eur > 0),
  image_url text not null,
  description text not null,
  tags text[] not null default '{}'
);

alter table experiences add column if not exists long_description text;
alter table experiences add column if not exists highlights text[] not null default '{}';

create table if not exists bookings (
  id bigint generated always as identity primary key,
  full_name text not null,
  email text not null,
  people int not null check (people > 0),
  booking_date date not null,
  experience_id text not null references experiences(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists purchases (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  experience_id text not null references experiences(id) on delete cascade,
  stripe_session_id text not null unique,
  amount_eur int not null check (amount_eur > 0),
  created_at timestamptz not null default now()
);

-- Lectura del catálogo desde la app (clave anon y usuarios autenticados).
alter table experiences enable row level security;

drop policy if exists "Public experiences are readable" on experiences;
create policy "Public experiences are readable"
  on experiences
  for select
  to anon, authenticated
  using (true);
