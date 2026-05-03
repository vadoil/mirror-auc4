#!/usr/bin/env bash
# Безопасная установка отразись.рф на VPS, где уже работают другие сайты.
# - НЕ трогает чужие конфиги nginx
# - НЕ переустанавливает Node (используется уже стоящий)
# - НЕ трогает ufw
# - НЕ удаляет default
# Запускать от root: bash setup-vps.sh
set -euo pipefail

REPO="https://github.com/vadoil/mirror-auc4.git"
APP_DIR="/var/www/mirror"
SUPABASE_HOST="mmuwfeiunaqjljnplpgh.supabase.co"

DOMAIN_PUNY="xn--80aafhd1akd.xn--p1ai"          # отразись.рф
API_PUNY="api.${DOMAIN_PUNY}"                    # api.отразись.рф
CONF_NAME="mirror-otrazis.conf"

echo "==> Проверка: домены ещё не заняты другими конфигами"
if grep -RIl --exclude="${CONF_NAME}" -E "server_name[^;]*(${DOMAIN_PUNY}|${API_PUNY})" /etc/nginx/sites-enabled/ 2>/dev/null; then
  echo "ОШИБКА: эти домены уже используются в других конфигах nginx (см. выше). Останавливаюсь."
  exit 1
fi

echo "==> Установка только недостающих пакетов (git, certbot)"
apt-get update -qq
DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  git certbot python3-certbot-nginx >/dev/null

echo "==> Node: $(node -v) — оставляю как есть"

echo "==> Клонирование/обновление репозитория"
mkdir -p "$(dirname "$APP_DIR")"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
else
  git -C "$APP_DIR" pull
fi

cd "$APP_DIR"
cp deploy/.env.vps .env.production

echo "==> Сборка фронта"
npm install --no-audit --no-fund
npm run build

echo "==> Nginx-конфиг (HTTP, для прохождения certbot)"
cat >/etc/nginx/sites-available/${CONF_NAME} <<EOF
# === Фронт отразись.рф ===
server {
  listen 80;
  listen [::]:80;
  server_name ${DOMAIN_PUNY} www.${DOMAIN_PUNY};

  root ${APP_DIR}/dist;
  index index.html;

  location / {
    try_files \$uri /index.html;
  }

  location ~* \.(?:js|css|png|jpg|jpeg|svg|webp|woff2?|mp4)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
    try_files \$uri =404;
  }
}

# === Прокси к Supabase: api.отразись.рф ===
server {
  listen 80;
  listen [::]:80;
  server_name ${API_PUNY};

  client_max_body_size 50m;

  location / {
    proxy_pass https://${SUPABASE_HOST};
    proxy_set_header Host ${SUPABASE_HOST};
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_ssl_server_name on;

    proxy_http_version 1.1;
    # WebSocket для realtime ставок
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_read_timeout 86400;
    proxy_send_timeout 86400;
  }
}
EOF

ln -sf /etc/nginx/sites-available/${CONF_NAME} /etc/nginx/sites-enabled/${CONF_NAME}

echo "==> Проверка конфига nginx"
nginx -t
systemctl reload nginx

echo "==> SSL через Let's Encrypt"
certbot --nginx --non-interactive --agree-tos --redirect \
  -m admin@${DOMAIN_PUNY} \
  -d ${DOMAIN_PUNY} -d www.${DOMAIN_PUNY} -d ${API_PUNY}

echo ""
echo "============================================"
echo "Готово!"
echo "  Фронт:  https://отразись.рф"
echo "  API:    https://api.отразись.рф"
echo "Чужие сайты не тронуты."
echo "Для обновлений: bash ${APP_DIR}/deploy/update.sh"
echo "============================================"
