'use strict';

module.exports = {

  dist: {
    files: [
      {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.app %>',
        dest: '<%= yeoman.www %>',
        src: [
          'images/**/*.{png,jpg,jpeg,gif,webp,svg}',
          '*.html',
          'scripts/**/*.html',
          'fonts/*',
          'locales/*'
        ]
      },
      {
        expand: true,
        cwd: '.tmp/<%= yeoman.images %>',
        dest: '<%= yeoman.www %>/<%= yeoman.images %>',
        src: ['generated/*']
      }
    ]
  },
  styles: {
    expand: true,
    cwd: '<%= yeoman.app %>/<%= yeoman.styles %>',
    dest: '.tmp/<%= yeoman.styles %>/',
    src: '{,*/}*.css'
  },
  fonts: {
    expand: true,
    flatten: true,
    cwd: '<%= yeoman.app %>/bower_components/',
    dest: '<%= yeoman.app %>/fonts/',
    src: [
      'ionic/release/fonts/*',
      'font-awesome/fonts/*'
    ]
  },
  docker: {
    files: [
      {
        expand: true,
        cwd: '<%= yeoman.docker %>',
        dest: '<%= yeoman.dist %>/dashboard-docker',
        src: ['**']
      },
      {
        expand: true,
        cwd: '<%= yeoman.www %>',
        dest: '<%= yeoman.dist %>/dashboard-docker/www',
        src: ['**']
      }
    ]
  }
};
