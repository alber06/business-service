'use strict';

module.exports = {

  html: ['<%= yeoman.www %>/**/*.html'],
  css: ['<%= yeoman.www %>/<%= yeoman.styles %>/**/*.css'],
  options: {
    assetsDirs: ['<%= yeoman.www %>']
  }

};
