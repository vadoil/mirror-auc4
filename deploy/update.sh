#!/usr/bin/env bash
# Обновление приложения на VPS после изменений в GitHub
# Запускать: bash /var/www/mirror/deploy/update.sh
set -euo pipefail
cd /var/www/mirror
git pull
cp deploy/.env.vps .env.production
npm ci
npm run build
systemctl reload nginx
echo "Готово."
