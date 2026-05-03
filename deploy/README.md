# Деплой на VPS отразись.рф

Сервер: `159.194.222.73`
Домены: `отразись.рф` (фронт), `api.отразись.рф` (прокси к Supabase)

## Архитектура

Браузер пользователя → nginx на VPS → или статика React, или прокси на `mmuwfeiunaqjljnplpgh.supabase.co`. База данных, Auth, Storage и Edge Functions остаются на Supabase — переезжает только точка входа.

## Шаг 1. DNS

В панели регистратора `отразись.рф` создать две A-записи:
- `@` → `159.194.222.73`
- `api` → `159.194.222.73`

Подождать пропагации (5–30 минут). Проверить:
```bash
dig +short xn--80aafhd1akd.xn--p1ai
dig +short api.xn--80aafhd1akd.xn--p1ai
```

## Шаг 2. Первичная настройка сервера

Зайти на VPS по SSH под root:
```bash
ssh root@159.194.222.73
```

Скачать и запустить скрипт:
```bash
curl -fsSL https://raw.githubusercontent.com/vadoil/mirror-auc4/main/deploy/setup-vps.sh -o setup-vps.sh
bash setup-vps.sh
```

Скрипт ставит nginx, Node.js 20, certbot, клонирует репозиторий, собирает фронт, настраивает nginx и оформляет SSL.

## Шаг 3. Обновление при новых изменениях в Lovable

Lovable пушит в GitHub автоматически. На сервере:
```bash
bash /var/www/mirror/deploy/update.sh
```

## Замечания

- `.env.production` берётся из `deploy/.env.vps` — там `VITE_SUPABASE_URL` указывает на `api.отразись.рф`. Сборка в Lovable Published этот файл не использует — там работает обычный `.env` с прямым адресом supabase.co.
- ЮKassa webhook прилетает напрямую на `mmuwfeiunaqjljnplpgh.supabase.co/functions/v1/yookassa-webhook` — менять не нужно.
- В Supabase Dashboard → Authentication → URL Configuration добавить в **Redirect URLs**: `https://отразись.рф/*` и `https://api.отразись.рф/*`. Это нужно для подтверждения почты и сброса пароля.
