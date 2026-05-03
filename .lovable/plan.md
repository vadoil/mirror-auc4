
# План переноса аукциона на ваш VPS

GitHub: `https://github.com/vadoil/mirror-auc4.git`
Сервер: `159.194.222.73`
Домены: `отразись.рф` (фронт) + `api.отразись.рф` (прокси к Supabase)

---

## Архитектура после миграции

```text
Пользователь из РФ
        │
        ▼
   отразись.рф ──► nginx на VPS ──► статика React (dist/)
                          │
                          └──► /functions/* и /rest/* и /auth/*
                                       │
                                       ▼
                          api.отразись.рф (тот же nginx)
                                       │
                                       ▼ proxy_pass
                          mmuwfeiunaqjljnplpgh.supabase.co
                          (Supabase остаётся как есть — БД, Auth, Storage, Edge Functions)
```

Важно: **сама база Supabase никуда не переезжает** — она остаётся на supabase.co. Мы только ставим nginx-прокси на вашем российском VPS, чтобы браузер пользователя из РФ ходил не на заблокированный supabase.co, а на ваш `api.отразись.рф`. Это самый быстрый и безопасный путь — без миграции данных, без переустановки Postgres, без переноса Storage.

---

## Шаги (буду делать по одному, жду подтверждения после каждого)

### Шаг 1 — DNS (вы, 5 минут)
В панели регистратора домена `отразись.рф` создать **две A-записи**:
- `отразись.рф` (или `@`) → `159.194.222.73`
- `api.отразись.рф` (или `api`) → `159.194.222.73`

Сказать мне, когда сделаете. Проверю через `dig`.

### Шаг 2 — GitHub-связка с Lovable (вы, 2 минуты)
Репозиторий `vadoil/mirror-auc4` уже есть. Нужно подключить его к Lovable:
- В Lovable: **Connectors → GitHub → Connect project**
- Авторизовать Lovable GitHub App на аккаунт `vadoil`
- Выбрать существующий репозиторий `mirror-auc4`

После этого любые изменения в Lovable автоматически попадают в GitHub, а с GitHub — на ваш VPS (через `git pull` в Шаге 5).

### Шаг 3 — Подготовка кода под прокси (делаю я в Lovable)
Изменения в коде, чтобы фронт ходил на `api.отразись.рф`:
1. В `.env.production` (новый файл) поставить:
   ```
   VITE_SUPABASE_URL=https://api.отразись.рф
   VITE_SUPABASE_PUBLISHABLE_KEY=<тот же anon key>
   VITE_SUPABASE_PROJECT_ID=mmuwfeiunaqjljnplpgh
   ```
   На preview.lovable.app оставим старый `.env` — там продолжит работать через supabase.co напрямую.
2. Проверить, что нигде в коде нет хардкода `mmuwfeiunaqjljnplpgh.supabase.co` (должно идти всё через `import.meta.env.VITE_SUPABASE_URL`).
3. Закоммитить — изменения уйдут в GitHub автоматически.

### Шаг 4 — Первичная настройка VPS (вы, по моему скрипту, ~15 минут)
Я дам один bash-скрипт, который:
- ставит `nginx`, `certbot`, `nodejs 20`, `git`
- клонирует репозиторий в `/var/www/mirror`
- делает `npm ci && npm run build`
- кладёт конфиг nginx для двух доменов
- запускает `certbot` для SSL (Let's Encrypt) на оба домена

Вы зайдёте на сервер по SSH (`ssh root@159.194.222.73` или какой у вас пользователь) и запустите скрипт. Я проведу за руку.

### Шаг 5 — nginx-конфиг (даю я в Шаге 4, привожу здесь для понимания)

```nginx
# фронт
server {
  listen 443 ssl http2;
  server_name отразись.рф xn--80aafhd1akd.xn--p1ai;
  root /var/www/mirror/dist;
  index index.html;
  location / { try_files $uri /index.html; }
}

# прокси к Supabase
server {
  listen 443 ssl http2;
  server_name api.отразись.рф api.xn--80aafhd1akd.xn--p1ai;

  location / {
    proxy_pass https://mmuwfeiunaqjljnplpgh.supabase.co;
    proxy_set_header Host mmuwfeiunaqjljnplpgh.supabase.co;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_ssl_server_name on;
    proxy_http_version 1.1;
    # WebSocket для realtime (ставки в реальном времени)
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
  }
}
```

### Шаг 6 — Авто-деплой при пуше в GitHub (опционально, делаем после)
GitHub Actions workflow, который при push в main:
- по SSH заходит на VPS
- делает `git pull && npm ci && npm run build && nginx -s reload`

Это уже после того как всё заработает руками.

### Шаг 7 — Проверка
- `https://отразись.рф` — открывается главная
- DevTools → Network: запросы идут на `api.отразись.рф`, статус 200
- Логин, ставки, реалтайм — работают

---

## Что нужно от вас прямо сейчас

Подтвердите план — и я начну с **Шага 3** (правки кода под прокси), параллельно вы делаете **Шаг 1** (две DNS-записи) и **Шаг 2** (подключение GitHub в Lovable).

Когда DNS пропишутся (обычно 5–30 минут), я дам скрипт для **Шага 4** и проведу за руку по SSH.

---

## Технические заметки

- Supabase Auth работает по `${SUPABASE_URL}/auth/v1/*` — прокси перехватит автоматически.
- Realtime по WebSocket — конфиг nginx уже включает `Upgrade/Connection`.
- Edge Functions `${SUPABASE_URL}/functions/v1/*` — тоже через прокси.
- ЮKassa webhook продолжает прилетать на supabase.co напрямую (это сервер→сервер, блокировок нет) — менять не нужно.
- Email-хуки и cron'ы остаются на Supabase — не трогаем.
- Для домена в кириллице используем оба варианта: `отразись.рф` и Punycode `xn--80aafhd1akd.xn--p1ai` (Let's Encrypt требует второй).
