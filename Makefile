APP          = tandeform
BUILD_NUMBER ?= "local"

build:
	@docker-compose up --build -d
migrate:
	docker-compose exec ${APP} /usr/local/bin/php /var/www/html/artisan migrate --seed
unit-test:
	@docker run --rm ${APP} /usr/local/bin/php /var/www/html/vendor/bin/phpunit /var/www/html/tests  --do-not-cache-result --configuration /var/www/html/phpunit.xml