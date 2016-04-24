test:
	grunt test

ci-install:
	npm install -g bower karma grunt-cli jshint
	gem install compass
	npm install
	bower install

ci-build:
	grunt build:dev

ci-coveralls:
	cat coverage/lcov.info | coveralls

.PHONY: test
