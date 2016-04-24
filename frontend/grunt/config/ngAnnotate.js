'use strict';

module.exports = {

  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/concat/<%= yeoman.scripts %>',
      src: '*.js',
      dest: '.tmp/concat/<%= yeoman.scripts %>'
    }]
  },
  dev: {
    files: [{
      expand: true,
      cwd: 'app/scripts',
      src: '**/*.js',
      dest: '.tmp/<%= yeoman.scripts %>'
    }]
  }

};
