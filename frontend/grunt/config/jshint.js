'use strict';

module.exports = {

  options: {
    jshintrc: '.jshintrc',
    reporter: require('jshint-stylish')
  },
  all: [
    'Gruntfile.js',
    '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'
  ],
  test: {
    options: {
      jshintrc: 'test/.jshintrc'
    },
    src: ['test/**/*.js']
  }

};
