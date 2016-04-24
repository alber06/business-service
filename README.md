business-service
==============
business-service server

### Mandatory
- NodeJS + global modules

## Basic Usage

- use `npm install` to download dependencies
- use `npm test` or `make` to run unit and E2E tests
- use `npm start` to run the service

Check `package.json` and `Makefile` to see available scripts and build targets. NPM run scripts are mostly aliases to their Make counterparts.

## Tests

To run the tests, you need to have [docker-engine](https://docs.docker.com/engine/installation/) installed in case of Linux, or run the test inside a [docker-machine](https://docs.docker.com/machine/install-machine/) in case of OSX or Windows:



All tests, helper modules and configuration are located under `test` folder:
- `test/mocha.opts` main Mocha config file.
- `test/helpers` folder contains the server and validation helpers.
- `test/routes` folder contains cors and locale headers helpers.
- `test` folder contains the actual Mocha specs.
