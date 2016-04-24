'use strict';

module.exports = {

  dist: {
    options: {
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeCommentsFromCDATA: true,
      removeOptionalTags: true
    },
    files: [{
      expand: true,
      cwd: '<%= yeoman.www %>',
      src: ['*.html', 'scripts/**/*.html'],
      dest: '<%= yeoman.www %>'
    }]
  }

};
