'use strict';

module.exports = {

  docker: {
    options: {
      archive: 'dist/dashboard-docker.zip'
    },
    files: [
      {
        expand: true,
        cwd: '<%= yeoman.dist %>/dashboard-docker',
        src: ['**']
      }
    ]
  },

  dist: {
    options: {
      archive: 'dist/dashboard-<%= yeoman.version %>.zip'
    },
    files: [
      {
        expand: true,
        cwd: '<%= yeoman.www %>',
        src: ['**']
      }
    ]
  }
};
