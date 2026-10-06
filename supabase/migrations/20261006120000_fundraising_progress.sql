-- Плавающий блок «Сколько собрали»: цель и сумма, собранная вне сайта, редактируются здесь.
create table if not exists public.fundraising_settings (
  id int primary key default 1 check (id = 1),
  goal numeric(14, 2) not null default 20000000,
  offline_amount numeric(14, 2) not null default 0, -- собрано вне сайта (например, итоги аукционов, которых нет в базе)
  updated_at timestamptz not null default now()
);
insert into public.fundraising_settings (id) values (1) on conflict (id) do nothing;
alter table public.fundraising_settings enable row level security;
drop policy if exists "Admins manage fundraising settings" on public.fundraising_settings;
create policy "Admins manage fundraising settings" on public.fundraising_settings
  for all using (has_role(auth.uid(), 'admin'::app_role)) with check (has_role(auth.uid(), 'admin'::app_role));

-- Собрано = оплаченные лоты аукционов + успешные оплаты через сайт + сумма вне сайта.
-- Отдаёт только агрегаты, поэтому доступна всем.
create or replace function public.fundraising_progress()
returns json
language sql
stable
security definer
set search_path = public
as $$
  select json_build_object(
    'goal', s.goal,
    'raised',
      coalesce((
        select sum((r->>'price')::numeric)
        from lots l,
             jsonb_array_elements(case when jsonb_typeof(l.archive_results) = 'array' then l.archive_results else '[]'::jsonb end) r
        where (r->>'paid')::boolean
      ), 0)
      + coalesce((select sum(amount) from payments where status in ('completed', 'succeeded')), 0)
      + s.offline_amount
  )
  from fundraising_settings s
  where s.id = 1
$$;
grant execute on function public.fundraising_progress() to anon, authenticated;
