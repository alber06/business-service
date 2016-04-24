# business-service Makefile

NODE_MODULES = ./node_modules/.bin


MOCHA        = NODE_ENV=test $(NODE_MODULES)/mocha
MOCHA_COV    = $(NODE_MODULES)/istanbul cover $(NODE_MODULES)/_mocha
REPORT_DOCS  = docs/README.md
WORKING_DIR  = $(shell pwd)


DOCKER_VERSION      ?= latest
DOCKER_IMAGE         = dockerhub/business-service:$(DOCKER_VERSION)
DOCKER_IMAGE_STABLE  = dockerhub/business-service:stable
OS									 = $(shell uname)
DOCKER-MACHINE-IP		 = $(shell docker-machine ip)


default: test

install:
	npm cache clean
	npm install

dev-install:
	npm cache clean
	npm install --global nodemon jshint
	npm install

dev-start:
	nodemon server.js

dev-test:
	nodemon --exec "$(MOCHA) --reporter min"

test: pretest test-commands end-cleanup

test-commands:
	-$(MOCHA)

test-docs: pretest test-docs-commands end-cleanup

test-docs-commands:
	-rm -f $(REPORT_DOCS)
	-mkdir -p docs
	-$(MOCHA) --reporter markdown >> $(REPORT_DOCS)

test-unit: jshint test-unit-commands

test-unit-commands:
	-$(MOCHA) --invert --grep E2E

test-e2e: pretest test-e2e-commands end-cleanup

test-e2e-commands:
	-$(MOCHA) --grep E2E

ci-install:
	sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
	echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
	sudo apt-get update
	sudo apt-get install -y mongodb-org
	mongo --version


ci-test: jshint prereport precoverage
	NODE_ENV=citest $(MOCHA_COV)

ci-coveralls:
	cat ./coverage/lcov.info | coveralls

coverage: pretest precoverage
	NODE_ENV=test $(MOCHA_COV)

pretest: jshint docker-test-start

start-cleanup:
	$(if $(shell docker ps -a | grep 'mongo-test'),docker rm -vf mongo-test)

end-cleanup:
	$(if $(shell docker ps -a | grep 'mongo-test'),docker rm -vf mongo-test)

docker-test-start: start-cleanup
	docker run -p 27001:27017 --name mongo-test -d mongo:3.0.4 --smallfiles
	docker run --rm --link mongo-test:mongo-test aanand/wait

docker-test-stop: end-cleanup

docker-compose-start:
	docker-compose stop
	$(if $(shell docker ps -a -q),	docker rm $(shell docker ps -a -q))
	docker-compose up
prereport:
	rm -Rf report
	mkdir -p report

precoverage:
	rm -Rf coverage

jshint:
	jshint .

jscs:
	jscs .

release-docker-build: test
	docker build --tag $(DOCKER_IMAGE) .
	docker tag $(DOCKER_IMAGE) $(DOCKER_IMAGE_STABLE)

release-docker-push:
	docker push $(DOCKER_IMAGE)
	docker push $(DOCKER_IMAGE_STABLE)

.PHONY: test
