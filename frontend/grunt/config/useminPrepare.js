'use strict';

module.exports = {

  html: '<%= yeoman.app %>/index.html',
  options: {
    dest: '<%= yeoman.www %>',
    flow: {
      html: {
        steps: {
          js: ['concat', 'uglifyjs'],
          css: ['cssmin']
        },
        post: {}
      }
    }
  }

};
