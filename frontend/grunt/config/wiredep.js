'use strict';

module.exports = {

  app: {
    src: ['<%= yeoman.app %>/index.html'],
    exclude: [
      'bower_components/bcryptjs/dist/bcrypt-isaac.js',
    ],
    ignorePath:  /\.\.\//
  },
  karma: {
    src: ['<%= yeoman.test %>/karma.conf.js'],
    exclude: [
      'bower_components/bcryptjs/dist/bcrypt-isaac.js',
      'bower_components/ionic/release/css/ionic.css',
      /cryptojslib/
    ],
    ignorePath:  /\.\.\//
  },
  sass: {
    src: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
    exclude: [
    ],
    ignorePath: /(\.\.\/){1,2}bower_components\//
  }

};
