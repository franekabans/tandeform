APP          = tandeform
BUILD_NUMBER ?= "local"

build:
	@docker-compose up --build -d
migrate:
	docker-compose exec ${APP} /usr/local/bin/php /var/www/html/artisan migrate --seed