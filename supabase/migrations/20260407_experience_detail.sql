alter table public.experiences add column if not exists long_description text;
alter table public.experiences add column if not exists highlights text[] not null default '{}';
