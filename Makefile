APP          = tandeform
BUILD_NUMBER ?= "local"
TAG          := $$(cat VERSION)-build.${BUILD_NUMBER}.$$(git log -1 --pretty=%h)

build:
	@docker-compose up --build -d
migrate:
	docker-compose exec ${APP} /usr/local/bin/php /var/www/html/artisan migrate --seed
unit-test:
	@docker run --rm ${APP}:${TAG} /usr/local/bin/php /var/www/html/vendor/bin/phpunit /var/www/html/tests  --do-not-cache-result --configuration /var/www/html/phpunit.xml