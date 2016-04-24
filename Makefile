docker-compose-up:
	docker-compose stop
	$(if $(shell docker ps -a -q),	docker rm $(shell docker ps -a -q))
	docker-compose up

.PHONY: test
