'use strict';

module.exports = {

  bower: {
    files: ['bower.json'],
    tasks: ['wiredep']
  },
  js: {
    files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'],
    tasks: ['newer:jshint:all', 'ngAnnotate:dev', 'injector:js'],
    options: {
      livereload: true
    }
  },
  //karma : {
  //  files: ['<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js', '<%= yeoman.test %>/**/*.js'],
  //  tasks: ['newer:jshint:test', 'karma:background:run']
  //},
  compass: {
    files: ['<%= yeoman.app %>/<%= yeoman.styles %>/**/*.{scss,sass}'],
    tasks: ['compass:server', 'autoprefixer']
  },
  gruntfile: {
    files: ['Gruntfile.js'],
    tasks: ['ngconstant:dev']
  },
  livereload: {
    options: {
      livereload: '<%= connect.options.livereload %>'
    },
    files: [
      '<%= yeoman.app %>/*.html',
      '<%= yeoman.app %>/scripts/**/*.html',
      '.tmp/<%= yeoman.styles %>/**/*.css',
      '<%= yeoman.app %>/<%= yeoman.images %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
    ]
  }

};
