'use strict';

module.exports = {

  js: {
    options: {
      ignorePath: 'app',
      addRootSlash: false
    },
    files: {
      '<%= yeoman.app %>/index.html': [
        '<%= yeoman.app %>/<%= yeoman.scripts %>/*.module.js',
        '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.module.js',
        '<%= yeoman.app %>/<%= yeoman.scripts %>/*.js',
        '<%= yeoman.app %>/<%= yeoman.scripts %>/**/*.js'
      ]
    }
  }

};
