# Tande Form App

A simple recruitment examplary excercise

## Prerequities
1. Docker Engine installed and running
2. Npm and Node installed.

## Installation

1. Download or git clone this project
2. `cd` into the folder where the project is located
3. Run: `cp .env.example .env`
4. Run: `docker-compose up --build -d`
5. Run: `docker run --rm -v $(pwd):/app composer install`
5. Run: `docker-compose exec tandeform /usr/local/bin/php /var/www/html/artisan migrate --seed`
6. Run: `npm install && npm run dev` 
7. App should be available at `localhost:8080`
8. Credentials to be used to see results email: admin@example.com password: password

