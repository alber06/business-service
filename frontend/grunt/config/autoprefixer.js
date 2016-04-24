'use strict';

module.exports = {

  options: {
    browsers: ['last 1 version']
  },
  dist: {
    files: [{
      expand: true,
      cwd: '.tmp/<%= yeoman.styles %>/',
      src: '{,*/}*.css',
      dest: '.tmp/<%= yeoman.styles %>/'
    }]
  }

};
