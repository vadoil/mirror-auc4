# Деплой на VPS отразись.рф

Сервер: `159.194.222.73`
Домены: `отразись.рф` (фронт), `api.отразись.рф` (прокси к self-hosted Supabase на `127.0.0.1:8000`)

## Архитектура

Браузер пользователя → nginx на VPS → или статика React, или прокси на локальный Supabase (`/opt/supabase`, docker compose). База данных, Auth, Storage и Edge Functions работают на этом же сервере.

## Шаг 1. DNS

В панели регистратора `отразись.рф` создать две A-записи:
- `@` → `159.194.222.73`
- `api` → `159.194.222.73`

Подождать пропагации (5–30 минут). Проверить:
```bash
dig +short xn--80aodvkjc9f.xn--p1ai
dig +short api.xn--80aodvkjc9f.xn--p1ai
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

## Шаг 3. Обновление

Push в `main` деплоится через GitHub Actions автоматически. Вручную на сервере:
```bash
bash /var/www/mirror/deploy/update.sh
```

## Замечания

- `.env.production` берётся из `deploy/.env.vps` — там `VITE_SUPABASE_URL` и анонимный ключ указывают на self-hosted API `api.отразись.рф`.
- Webhook CloudPayments настроен на `https://api.отразись.рф/functions/v1/cloudpayments-webhook` (локальный Supabase).
- Redirect URLs для Auth задаются в `/opt/supabase/.env` (`ADDITIONAL_REDIRECT_URLS`), SMTP для писем Auth — там же (`SMTP_*`).
