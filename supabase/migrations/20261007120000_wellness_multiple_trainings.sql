-- Девичник: гостья может выбрать несколько тренировок. Старое поле training оставлено для истории.
alter table public.wellness_registrations
  add column if not exists trainings text[] not null default '{}'
    check (trainings <@ array['libido', 'abs', 'bowls']::text[]);

update public.wellness_registrations
set trainings = array[training]
where training is not null and trainings = '{}';
