#!/usr/bin/env bash
# Первичная настройка VPS под отразись.рф
# Запускать от root: bash setup-vps.sh
set -euo pipefail

REPO="https://github.com/vadoil/mirror-auc4.git"
APP_DIR="/var/www/mirror"
SUPABASE_HOST="mmuwfeiunaqjljnplpgh.supabase.co"

# Punycode для отразись.рф
DOMAIN_PUNY="xn--80aafhd1akd.xn--p1ai"
API_PUNY="api.${DOMAIN_PUNY}"

echo "==> 1/6 Установка пакетов"
apt-get update
apt-get install -y curl ca-certificates gnupg git nginx certbot python3-certbot-nginx ufw

echo "==> 2/6 Node.js 20"
if ! command -v node >/dev/null || ! node -v | grep -q "^v20"; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "==> 3/6 Firewall"
ufw allow OpenSSH || true
ufw allow 'Nginx Full' || true
ufw --force enable || true

echo "==> 4/6 Клонирование и сборка"
mkdir -p "$APP_DIR"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO" "$APP_DIR"
fi
cd "$APP_DIR"
git pull
cp deploy/.env.vps .env.production
npm ci
npm run build

echo "==> 5/6 Nginx конфиг"
cat >/etc/nginx/sites-available/mirror.conf <<EOF
# --- Фронт ---
server {
  listen 80;
  listen [::]:80;
  server_name ${DOMAIN_PUNY} www.${DOMAIN_PUNY};

  root ${APP_DIR}/dist;
  index index.html;

  location / {
    try_files \$uri /index.html;
  }

  # длинный кеш для статики
  location ~* \.(js|css|png|jpg|jpeg|svg|webp|woff2?)$ {
    expires 30d;
    add_header Cache-Control "public, immutable";
  }
}

# --- Прокси к Supabase ---
server {
  listen 80;
  listen [::]:80;
  server_name ${API_PUNY};

  # увеличиваем размер для загрузки изображений в Storage
  client_max_body_size 50m;

  location / {
    proxy_pass https://${SUPABASE_HOST};
    proxy_set_header Host ${SUPABASE_HOST};
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_ssl_server_name on;

    proxy_http_version 1.1;
    # WebSocket для realtime
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
    proxy_send_timeout 86400;
  }
}
EOF

ln -sf /etc/nginx/sites-available/mirror.conf /etc/nginx/sites-enabled/mirror.conf
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

echo "==> 6/6 SSL (Let's Encrypt)"
echo "ВАЖНО: убедитесь что DNS уже указывает на этот сервер."
echo "Запускаю certbot..."
certbot --nginx --non-interactive --agree-tos -m admin@${DOMAIN_PUNY} \
  -d ${DOMAIN_PUNY} -d www.${DOMAIN_PUNY} -d ${API_PUNY} \
  --redirect

echo ""
echo "==> Готово!"
echo "Фронт:  https://отразись.рф"
echo "API:    https://api.отразись.рф"
