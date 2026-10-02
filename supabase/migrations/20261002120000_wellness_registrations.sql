-- Велнес-девичник 25.10.2026: бесплатная регистрация.
-- Пишет только edge-функция wellness-register (service role), читают админы.
create table if not exists public.wellness_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  telegram text check (char_length(telegram) <= 64),
  email text not null check (char_length(email) between 5 and 200),
  age int check (age between 14 and 100),
  phone text not null check (char_length(phone) between 5 and 32),
  training text check (training in ('libido', 'abs', 'bowls')),
  consent_pd boolean not null check (consent_pd),
  consent_ads boolean not null default false,
  confirmation_sent_at timestamptz,
  reminder_week_sent_at timestamptz,
  reminder_day_sent_at timestamptz,
  utm jsonb
);

create unique index if not exists wellness_registrations_email_key
  on public.wellness_registrations (lower(email));

alter table public.wellness_registrations enable row level security;

drop policy if exists "Admins can view wellness registrations" on public.wellness_registrations;
create policy "Admins can view wellness registrations" on public.wellness_registrations
  for select using (has_role(auth.uid(), 'admin'::app_role));

drop policy if exists "Admins can delete wellness registrations" on public.wellness_registrations;
create policy "Admins can delete wellness registrations" on public.wellness_registrations
  for delete using (has_role(auth.uid(), 'admin'::app_role));
