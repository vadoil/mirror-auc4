-- «Игристое со стилистом», 24.10.2026 (Voluminous, стилист Лена Голова): бесплатная запись.
-- Пишет только edge-функция igristoe-register (service role), читают админы.
create table if not exists public.stylist_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text not null check (char_length(phone) between 5 and 32),
  email text not null check (char_length(email) between 5 and 200),
  consent_pd boolean not null check (consent_pd),
  consent_ads boolean not null default false,
  source text, -- откуда пришла: site / wellness-mailing
  confirmation_sent_at timestamptz,
  reminder_sent_at timestamptz
);
create unique index if not exists stylist_registrations_email_key on public.stylist_registrations (lower(email));
alter table public.stylist_registrations enable row level security;
drop policy if exists "Admins can view stylist registrations" on public.stylist_registrations;
create policy "Admins can view stylist registrations" on public.stylist_registrations
  for select using (has_role(auth.uid(), 'admin'::app_role));
drop policy if exists "Admins can delete stylist registrations" on public.stylist_registrations;
create policy "Admins can delete stylist registrations" on public.stylist_registrations
  for delete using (has_role(auth.uid(), 'admin'::app_role));

-- рассылка-приглашение гостьям девичника: кому уже отправили
alter table public.wellness_registrations add column if not exists igristoe_invite_sent_at timestamptz;
