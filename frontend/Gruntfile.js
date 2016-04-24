'use strict';

module.exports = function (grunt) {

  var path = require('path');

  require('load-grunt-config')(grunt, {
    configPath: [
      path.join(process.cwd(), 'grunt'),
      path.join(process.cwd(), 'grunt/config')
    ],
    data: {
      yeoman: {
        app: 'app',
        scripts: 'scripts',
        styles: 'styles',
        images: 'images',
        test: 'test',
        docker: 'docker',
        dist: 'dist',
        www: 'www',
        version: process.env.VERSION || 'snapshot',
      }
    }
  });

};
