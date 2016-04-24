# Business Dashboard


## Overview
- [Software Requirements](#software-requirements)
- [Installation](#installation)
- [Grunt](#grunt)
- [Unit Tests](#unit-tests)
- [HTTP Ports](#http-ports)


## Software Requirements

### Mandatory
- NodeJS + global modules
  + Grunt
  + Bower
- Ruby + gems
  + Compass
- Git


## Installation
To download all NPM and Bower dependencies run:

    npm install
    bower install


## Unit Tests
The project uses [Karma](http://karma-runner.github.io) and [Jasmine](http://jasmine.github.io/) for unit testing.

All tests, helper modules and configuration are located under `test` folder:
- `test/karma.conf.js` main Karma config file. When running from Grunt, this might be overridden by `grunt/config/karma.js`
- `test/mocks` folder contains the helper Angular module `dashboard.test`. Take a look into its utility services for promises, resources and other tricky-to-test stuff.
- `test/specs` folder contains the actual Jasmine specs. Every file in this folder is named after some file in `app/scripts`, but with `.spec.js` suffix, eg: `app/scripts/cities/cities.service.js` and `test/specs/cities/cities.service.spec.js`


## HTTP Ports
- `9000` for `grunt servedev`
- `9002` for `grunt coverage`
- `9876` for Karma server
# dashboard
