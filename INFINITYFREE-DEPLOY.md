# InfinityFree Deployment Guide

## Prerequisites

- FTP client (FileZilla recommended)
- phpMyAdmin access (via InfinityFree control panel)
- Local PHP 8.3+ with Composer

## Step 1: Local Preparation

### 1.1 Install production Composer dependencies

```bash
composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader
```

### 1.2 Verify Vite build exists

```bash
ls public/build/manifest.json
```

If missing, run `npm run build`.

### 1.3 Generate a fresh APP_KEY locally

```bash
php artisan key:generate
```

Copy the generated `APP_KEY=base64:...` value — you'll paste it into the server `.env`.

## Step 2: Create .env on Server

Create `.env` in `public_html/` via InfinityFree file manager:

```ini
APP_NAME="User Management"
APP_ENV=production
APP_KEY=<paste the key from step 1.3>
APP_DEBUG=false
APP_URL=https://yourdomain.infinityfree.app

DB_CONNECTION=mysql
DB_HOST=sql105.infinityfree.com
DB_PORT=3306
DB_DATABASE=if0_42906803_usermanagement
DB_USERNAME=if0_42906803
DB_PASSWORD=<your InfinityFree MySQL password>

SESSION_DRIVER=database
SESSION_LIFETIME=120
SESSION_ENCRYPT=false
SESSION_PATH=/
SESSION_DOMAIN=null
SESSION_SECURE_COOKIE=true

CACHE_STORE=database
QUEUE_CONNECTION=sync

LOG_CHANNEL=stack
LOG_LEVEL=error

BCRYPT_ROUNDS=12
MAIL_MAILER=log
```

## Step 3: Import Database via phpMyAdmin

1. Open phpMyAdmin in InfinityFree control panel
2. Select database `if0_42906803_usermanagement`
3. Click **Import** tab
4. Choose `database/schema-infinityfree.sql`
5. Click **Go**

This creates all 9 required tables and seeds the admin user.

## Step 4: Upload Files via FTP

Upload the **entire project root** to `public_html/`:

```
public_html/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/              ← Laravel's public dir
├── resources/
├── routes/
├── storage/
├── vendor/              ← From composer install --no-dev
├── .htaccess            ← Root .htaccess (rewrites to public/)
├── composer.json
├── composer.lock
├── artisan
├── .env                 ← Created in step 2
└── ...
```

**Important**: Upload `public/build/` (Vite assets) — already built locally.

### Upload order (recommended):

1. `.htaccess` (root) — first, so routing works immediately
2. `vendor/` — largest directory, upload first
3. `public/build/` — frontend assets
4. `app/`, `bootstrap/`, `config/`, `database/`, `resources/`, `routes/`
5. `storage/` — ensure `storage/` and `bootstrap/cache/` are writable
6. Everything else (`composer.json`, `composer.lock`, `artisan`)

## Step 5: Set Permissions

Via FTP file manager, set these directories to `0755` or `0775`:

- `storage/`
- `bootstrap/cache/`

## Step 6: Verify

1. Visit `https://yourdomain.infinityfree.app/login`
2. Login with `admin@example.com` / `password`
3. Test dashboard, user CRUD, logout
4. **Change the admin password immediately**

## Troubleshooting

### 500 Error
- Check `storage/logs/laravel.log`
- Verify `.env` values are correct
- Ensure `APP_KEY` is set

### Blank Page
- Verify `public/build/manifest.json` exists
- Check PHP version (must be 8.3+)
- Enable `APP_DEBUG=true` temporarily to see errors

### Database Connection Error
- Verify MySQL credentials in `.env`
- Check phpMyAdmin can connect
- InfinityFree MySQL host is `sql105.infinityfree.com`

### Assets Not Loading
- Verify `public/build/` was uploaded
- Check `APP_URL` matches your domain

## How It Works

The root `.htaccess` rewrites all requests to `public/`:

```
https://example.com/login
  → Apache reads public_html/.htaccess
  → Rewrites to public_html/public/login
  → public/.htaccess routes to public/index.php
  → Laravel handles the request
```

## Security Notes

- `.env` is protected by root `.htaccess` (`FilesMatch` deny + RewriteCond)
- Hidden files (`.env`, `.git`, etc.) are blocked by `RewriteRule`
- `APP_DEBUG=false` in production
- `vendor/`, `config/`, `database/`, `app/` are not web-accessible (only `public/` is)
- Change admin password after first login
- No secrets are committed to git
