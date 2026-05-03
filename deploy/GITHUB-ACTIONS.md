# Автодеплой через GitHub Actions

При каждом push в ветку `main` workflow `.github/workflows/deploy.yml`:
1. собирает проект в чистом окружении Ubuntu (Node 20),
2. заливает готовую папку `dist/` на VPS по SSH через `rsync`.

На сервере **не** запускается ни `npm install`, ни `npm run build` —
обновляется только статика. Чужие сайты не затрагиваются.

---

## Шаг 1. Подготовка пользователя `deploy` на сервере

Выполнить **один раз** на VPS под root:

```bash
# 1. Создать пользователя (если ещё нет)
id deploy &>/dev/null || adduser --disabled-password --gecos "" deploy

# 2. Дать ему права на папку с фронтом
mkdir -p /var/www/mirror/dist
chown -R deploy:www-data /var/www/mirror
chmod -R g+rX /var/www/mirror

# 3. Сгенерировать ключ для GitHub Actions (без пароля)
sudo -u deploy ssh-keygen -t ed25519 -N "" -f /home/deploy/.ssh/github_actions -C "github-actions@mirror"

# 4. Разрешить вход по этому ключу
sudo -u deploy bash -c 'cat /home/deploy/.ssh/github_actions.pub >> /home/deploy/.ssh/authorized_keys'
chmod 600 /home/deploy/.ssh/authorized_keys

# 5. Показать ПРИВАТНЫЙ ключ — его положим в GitHub Secrets
cat /home/deploy/.ssh/github_actions
```

Скопируй вывод последней команды (включая строки `-----BEGIN ...-----`
и `-----END ...-----`) — это значение для секрета `DEPLOY_SSH_KEY`.

> Ключ используется **только** для деплоя этого сайта. Доступ ограничен
> пользователем `deploy`, у которого нет sudo и нет прав на чужие папки.

---

## Шаг 2. Секреты в GitHub

Открыть https://github.com/vadoil/mirror-auc4/settings/secrets/actions
и добавить четыре `Repository secrets`:

| Имя              | Значение                                       |
|------------------|------------------------------------------------|
| `DEPLOY_HOST`    | `159.194.222.73`                               |
| `DEPLOY_USER`    | `deploy`                                       |
| `DEPLOY_PATH`    | `/var/www/mirror/dist`                         |
| `DEPLOY_SSH_KEY` | приватный ключ из шага 1 (целиком, с заголовками) |

---

## Шаг 3. Запуск

- Любой push в `main` (Lovable пушит автоматически) → деплой стартует.
- Можно запустить вручную: вкладка **Actions** → `Deploy to VPS` → **Run workflow**.

Проверить статус: https://github.com/vadoil/mirror-auc4/actions

---

## Откат

В Actions у каждого запуска есть кнопка **Re-run jobs** —
можно перезапустить любой предыдущий успешный коммит.
Либо локально `git revert <sha> && git push` — деплой пересоберётся автоматически.

---

## Что НЕ меняется этим деплоем

- nginx-конфиги других сайтов на сервере;
- база Supabase, Edge Functions, секреты;
- SSL-сертификаты Let's Encrypt;
- сам файл nginx-конфига `mirror-otrazis.conf` (его при необходимости
  правит `deploy/setup-vps.sh` вручную).
