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


# Copy existing application directory contents
COPY . /var/www/html/

# Set ownership and permissions for the /var/www/html directory to www-data
RUN chown -R www-data:www-data /var/www/html/

USER www-data

EXPOSE 9000

CMD ["php-fpm"]