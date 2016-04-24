'use strict';

module.exports = {

  options: {
    port: 9000,
    // Change this to '0.0.0.0' to access the server from outside.
    hostname: '0.0.0.0',
    livereload: 35729
  },
  livereload: {
    options: {
      open: true,
      base: [
        '.tmp',
        '<%= yeoman.app %>'
      ]
    }
  },
  dist: {
    options: {
      port: 9009,
      livereload: false,
      base: ['<%= yeoman.www %>']
    }
  },
  coverage: {
    options: {
      port: 9002,
      open: true,
      base: ['reports/coverage']
    }
  }

};
