#!/usr/bin/env bash
# Поднимает прокси api.отразись.рф -> mmuwfeiunaqjljnplpgh.supabase.co
# Запускать на сервере под root ОДИН РАЗ, после того как DNS-запись api -> 159.194.222.73 пропагировалась.
# Скрипт безопасен: пишет ТОЛЬКО в свой конфиг, чужие сайты не трогает.
set -euo pipefail

SUPABASE_HOST="mmuwfeiunaqjljnplpgh.supabase.co"
DOMAIN_PUNY="xn--80aodvkjc9f.xn--p1ai"      # отразись.рф
API_PUNY="api.${DOMAIN_PUNY}"
CONF_NAME="mirror-api-proxy.conf"

echo "==> Проверка: домен api ещё не используется в других конфигах"
if grep -RIl --exclude="${CONF_NAME}" -E "server_name[^;]*${API_PUNY}" /etc/nginx/sites-enabled/ 2>/dev/null; then
  echo "ОШИБКА: ${API_PUNY} уже используется в другом конфиге nginx (см. выше)."
  exit 1
fi

echo "==> Проверка DNS"
RESOLVED=$(dig +short "${API_PUNY}" | tail -n1)
SERVER_IP=$(curl -s ifconfig.me || echo "")
if [ -n "$SERVER_IP" ] && [ "$RESOLVED" != "$SERVER_IP" ]; then
  echo "ВНИМАНИЕ: ${API_PUNY} резолвится в '${RESOLVED}', а IP сервера '${SERVER_IP}'."
  echo "Если ещё не пропагировалось — подожди и запусти заново."
  read -p "Продолжить всё равно? (y/N) " ans
  [ "$ans" = "y" ] || exit 1
fi

echo "==> Установка certbot (если нет)"
if ! command -v certbot >/dev/null; then
  apt-get update -qq
  DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    certbot python3-certbot-nginx >/dev/null
fi

echo "==> Пишу nginx-конфиг"
cat >/etc/nginx/sites-available/${CONF_NAME} <<EOF
# Прокси к Supabase: api.отразись.рф (SSL поставит certbot ниже)
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

echo "==> Получаю SSL через Let's Encrypt"
certbot --nginx --non-interactive --agree-tos --redirect \
  -m admin@${DOMAIN_PUNY} \
  -d ${API_PUNY}

echo ""
echo "============================================"
echo "Готово! Прокси работает:"
echo "  https://api.отразись.рф  ->  https://${SUPABASE_HOST}"
echo "Проверка:"
echo "  curl -I https://api.отразись.рф"
echo "============================================"
