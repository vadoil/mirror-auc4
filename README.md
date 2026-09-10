# Отражение добра — отразись.рф

Благотворительный аукцион. Vite + React + TypeScript + shadcn/ui, бэкенд — self-hosted Supabase.

## Инфраструктура

- Сервер `159.194.222.73`, nginx.
- Фронт: `/var/www/mirror/dist`, домен `отразись.рф` (`xn--80aodvkjc9f.xn--p1ai`).
- API: `api.отразись.рф` → локальный Supabase (`/opt/supabase`, docker compose): Postgres, Auth, REST, Storage, Edge Functions.
- Подробности и рабочие команды — в `/var/www/mirror/CLAUDE.md` на сервере и в `deploy/`.

## Разработка

```sh
npm i
npm run dev
```

Переменные окружения: `.env` (dev) и `deploy/.env.vps` (prod, копируется в `.env.production` при деплое).
Анонимный ключ и URL указывают на self-hosted API.

## Деплой

Push в `main` → GitHub Actions (`.github/workflows/deploy.yml`) собирает `dist/` и заливает его на сервер по rsync.
См. `deploy/GITHUB-ACTIONS.md`.

## Edge-функции

Лежат в `supabase/functions/`, на сервере — `/opt/supabase/volumes/functions/`. Секреты — `volumes/functions/secrets.env`.
Письма отправляются через `send-email-smtp` (SMTP Beget), Telegram — через `notify-telegram`.
