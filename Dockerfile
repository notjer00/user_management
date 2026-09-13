# Stage 1: Build frontend assets
FROM node:20-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --prefer-offline --no-audit --no-fund

COPY . .
RUN npm run build

# Stage 2: PHP runtime
FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_sqlite mbstring exif pcntl bcmath gd zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy application source
COPY . .

# Copy built frontend assets from stage 1
COPY --from=frontend /app/public/build ./public/build
COPY --from=frontend /app/node_modules ./node_modules

# Install PHP dependencies (no dev for production)
RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Create SQLite database and set permissions
RUN mkdir -p /var/data \
    && touch /var/data/database.sqlite \
    && touch database/database.sqlite \
    && mkdir -p storage/framework/{cache,sessions,testing,views} \
    && mkdir -p storage/logs \
    && mkdir -p bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache /var/data \
    && chown -R www-data:www-data storage bootstrap/cache /var/data

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
