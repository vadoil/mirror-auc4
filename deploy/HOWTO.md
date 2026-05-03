# Инструкция: добавить новый сайт на VPS, где уже работают другие сайты

VPS: nginx + несколько сайтов с SSL Let's Encrypt. Цель — поднять ещё один сайт (фронт + опционально api-прокси) **не сломав остальные**.

---

## 0. Что должно быть готово до начала

- SSH-доступ к серверу под root
- Домен зарегистрирован
- IP сервера известен (`curl ifconfig.me`)

---

## 1. DNS у регистратора

Добавь A-записи и **дождись пропагации** (5–30 мин):

| Тип | Имя | Значение |
|---|---|---|
| A | @ | IP сервера |
| A | www | IP сервера |

Проверка:
```bash
dig +short твойдомен.ru
```

Для кириллических доменов используй punycode-форму (`xn--...`) во всех конфигах nginx и certbot.
Получить punycode: `idn2 отразись.рф` или онлайн.

---

## 2. Подготовка папки сайта

```bash
mkdir -p /var/www/<project>/dist
chown -R www-data:www-data /var/www/<project>
```

Сюда будет деплоиться билд (через GitHub Actions, scp, rsync — как удобнее).

---

## 3. Конфиг nginx — ГЛАВНОЕ ПРАВИЛО

> **Все `listen 443 ssl` директивы на сервере ДОЛЖНЫ быть одинаковыми по флагам.**
> Если на одном сайте `listen 443 ssl http2;`, то на ВСЕХ должно быть `listen 443 ssl http2;`.
> Иначе nginx ругается «protocol options redefined» и ломает SSL у соседей (`ERR_SSL_VERSION_OR_CIPHER_MISMATCH`).

Проверь, что используется на других сайтах:
```bash
grep -RE "listen 443" /etc/nginx/sites-enabled/
```

И используй те же флаги в новом конфиге.

### Шаблон фронта (SPA) — `/etc/nginx/sites-available/<project>-frontend.conf`

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name твойдомен.ru www.твойдомен.ru;
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name твойдомен.ru www.твойдомен.ru;

  # certbot подставит ssl_certificate сам

  root /var/www/<project>/dist;
  index index.html;

  location / {
    try_files $uri /index.html;
  }

  location ~* \.(?:js|css|png|jpg|jpeg|svg|webp|woff2?|mp4)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
    try_files $uri =404;
  }
}
```

### Шаблон api-прокси (если бэк на другом порту) — `<project>-api-proxy.conf`

```nginx
server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name api.твойдомен.ru;

  location / {
    proxy_pass http://127.0.0.1:<PORT>;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

### Активация

```bash
ln -sf /etc/nginx/sites-available/<project>-frontend.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

---

## 4. SSL через certbot

```bash
certbot --nginx -d твойдомен.ru -d www.твойдомен.ru
```

Для кириллических — только punycode:
```bash
certbot --nginx -d xn--80aodvkjc9f.xn--p1ai -d www.xn--80aodvkjc9f.xn--p1ai
```

Certbot сам допишет блоки ssl в конфиг.

**После certbot обязательно**:
```bash
nginx -t
```
Если в выводе есть `[warn] protocol options redefined for ...` — у тебя рассинхрон флагов `http2` между сайтами. Чини (см. п.6).

Автообновление уже настроено systemd-таймером, проверка:
```bash
systemctl list-timers | grep certbot
```

---

## 5. Деплой через GitHub Actions (для Vite/React)

`.github/workflows/deploy.yml`:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci && npm run build
      - name: Upload to server
        uses: appleboy/scp-action@v0.1.7
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          source: "dist/*"
          target: "/var/www/<project>/"
          strip_components: 0
          rm: true
```

Секреты в репо: `SSH_HOST`, `SSH_USER` (root или deploy-юзер), `SSH_KEY` (приватный ключ, публичный — в `~/.ssh/authorized_keys` на сервере).

---

## 6. Типовые поломки и как чинить

### `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` на одном из соседних сайтов после добавления нового
**Причина**: разные флаги в `listen 443 ssl ...` между конфигами.
**Фикс**: привести ВСЕ конфиги к одинаковым флагам:
```bash
sed -i 's|listen 443 ssl;|listen 443 ssl http2;|g; s|listen \[::\]:443 ssl;|listen [::]:443 ssl http2;|g' \
  /etc/nginx/sites-enabled/*.conf
nginx -t && systemctl reload nginx
```

### `conflicting server name "..." ignored`
**Причина**: один и тот же `server_name` в двух разных конфигах.
**Фикс**:
```bash
grep -RIl "твойдомен" /etc/nginx/sites-enabled/
```
Удалить дубликат.

### Сайт открывается, но отдаёт чужую страницу
**Причина**: твой `server` без SSL-сертификата, и nginx ловит запрос дефолтным сервером.
**Фикс**: запустить certbot для домена.

### certbot: `Failed authorization` / DNS
**Причина**: A-запись ещё не пропагировалась или указывает не на этот IP.
**Фикс**: подождать, проверить `dig +short домен`.

### 404 на роутах SPA после refresh
**Причина**: нет `try_files $uri /index.html;`
**Фикс**: добавить в `location /`.

### Кириллический домен не работает
**Причина**: использовал юникод вместо punycode.
**Фикс**: везде в nginx и certbot — `xn--...` форма.

---

## 7. Чек-лист перед коммитом конфига

- [ ] Имя файла `<project>-*.conf`, не пересекается с другими
- [ ] `grep -RIl "твойдомен" /etc/nginx/sites-enabled/` показывает только твой файл
- [ ] Флаги `listen 443 ssl ...` совпадают с остальными сайтами
- [ ] После certbot `nginx -t` без warning'ов «protocol options redefined»
- [ ] Соседние сайты ещё открываются (`curl -I https://соседний.ru`)
- [ ] GitHub secrets добавлены, Actions проходит зелёным
- [ ] Жёсткое обновление в браузере (Ctrl+F5)

---

## 8. Полезные команды

```bash
# что слушает 80/443
ss -tlnp | grep -E ':80|:443'

# все server_name на сервере
grep -RIE "server_name" /etc/nginx/sites-enabled/

# тест конфига без перезагрузки
nginx -t

# мягкий reload (без даунтайма)
systemctl reload nginx

# логи
tail -f /var/log/nginx/error.log
tail -f /var/log/nginx/access.log

# список сертификатов
certbot certificates
```
