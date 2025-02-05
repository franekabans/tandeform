FROM composer:2.6 AS composer
COPY . ./
RUN composer install --prefer-dist --no-dev --optimize-autoloader

FROM php:8.2-fpm-bullseye
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libwebp-dev \
    libxpm-dev \
    libfreetype6-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install gd zip pdo_pgsql pgsql \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*


COPY . /var/www/html/
COPY --from=composer /app/vendor /var/www/html/vendor

RUN chown -R www-data:www-data /var/www/html/
RUN touch /var/www/html/storage/logs/laravel.log

USER www-data

EXPOSE 9000

CMD ["php-fpm"]