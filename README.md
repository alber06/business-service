business-service
==============
business-service app using Node with KrakenJS, AngularJS, MongoDB and Docker Compose


# Frontend

### Overview
- [Software Requirements](#software-requirements)
- [Installation](#installation)
- [Grunt](#grunt)
- [Unit Tests](#unit-tests)
- [HTTP Ports](#http-ports)


### Software Requirements

#### Mandatory
- NodeJS + global modules
  + Grunt
  + Bower
- Ruby + gems
  + Compass
- Git


### Installation
To download all NPM and Bower dependencies run:

    npm install
    bower install


### Unit Tests
The project uses [Karma](http://karma-runner.github.io) and [Jasmine](http://jasmine.github.io/) for unit testing.

All tests, helper modules and configuration are located under `test` folder:
- `test/karma.conf.js` main Karma config file. When running from Grunt, this might be overridden by `grunt/config/karma.js`
- `test/mocks` folder contains the helper Angular module `dashboard.test`. Take a look into its utility services for promises, resources and other tricky-to-test stuff.
- `test/specs` folder contains the actual Jasmine specs. Every file in this folder is named after some file in `app/scripts`, but with `.spec.js` suffix, eg: `app/scripts/cities/cities.service.js` and `test/specs/cities/cities.service.spec.js`


### HTTP Ports
- `9000` for `grunt servedev`
- `9009` for `grunt serve:dist`
- `9002` for `grunt coverage`
- `9876` for Karma server



# Backend

### Software Requirements

#### Mandatory
- NodeJS + global modules

### Basic Usage

- use `npm install` to download dependencies
- use `npm test` or `make` to run unit and E2E tests
- use `npm start` to run the service

Check `package.json` and `Makefile` to see available scripts and build targets. NPM run scripts are mostly aliases to their Make counterparts.

### Docker

You can start the server with the Mongo database just running `make docker-compose-up` inside the `backend\` folder.

### Tests

To run the tests, you need to have [docker-machine](https://docs.docker.com/machine/install-machine/)



All tests, helper modules and configuration are located under `test` folder:
- `test/mocha.opts` main Mocha config file.
- `test/helpers` folder contains the server and validation helpers.
- `test/routes` folder contains cors and locale headers helpers.
- `test` folder contains the actual Mocha specs.

# Docker

To run all the app, just run `make docker-compose-up` in the root folder `\`. You will need to have installed the [docker-machine](https://docs.docker.com/machine/install-machine/) in order to run the app inside of it. You can access the app in your browser in `192.168.99.100:9009`.
