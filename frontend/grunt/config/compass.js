'use strict';

module.exports = {

  options: {
    sassDir: '<%= yeoman.app %>/<%= yeoman.styles %>',
    cssDir: '.tmp/<%= yeoman.styles %>',
    generatedImagesDir: '.tmp/<%= yeoman.images %>/generated',
    imagesDir: '<%= yeoman.app %>/<%= yeoman.images %>',
    javascriptsDir: '<%= yeoman.app %>/<%= yeoman.scripts %>',
    fontsDir: '<%= yeoman.app %>/<%= yeoman.styles %>/fonts',
    importPath: '<%= yeoman.app %>/bower_components',
    httpImagesPath: '/<%= yeoman.images %>',
    httpGeneratedImagesPath: '/<%= yeoman.images %>/generated',
    httpFontsPath: '/<%= yeoman.styles %>/fonts',
    relativeAssets: false,
    assetCacheBuster: false,
    raw: 'Sass::Script::Number.precision = 10\n'
  },
  dist: {
    options: {
      generatedImagesDir: '<%= yeoman.dist %>/<%= yeoman.images %>/generated'
    }
  },
  server: {
    options: {
      debugInfo: true
    }
  }

};
