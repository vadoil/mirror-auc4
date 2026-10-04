-- Велнес-девичник: платная регистрация (440 ₽ через CloudPayments).
-- pending — анкета заполнена, ждём оплату; paid — оплачено; free — зарегистрирован до введения оплаты.
alter table public.wellness_registrations
  add column if not exists payment_status text not null default 'pending'
    check (payment_status in ('pending', 'paid', 'free')),
  add column if not exists amount numeric(10, 2),
  add column if not exists paid_at timestamptz,
  add column if not exists transaction_id text;

-- регистрации, сделанные до введения оплаты, остаются действительными
update public.wellness_registrations set payment_status = 'free' where payment_status = 'pending' and created_at < '2026-10-04';

-- для нумерации мест: у бесплатных регистраций «дата оплаты» = дата регистрации
update public.wellness_registrations set paid_at = created_at where payment_status = 'free' and paid_at is null;
