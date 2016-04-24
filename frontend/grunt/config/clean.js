'use strict';

module.exports = {

  dist: {
    files: [{
      dot: true,
      src: [
        '.tmp',
        '<%= yeoman.www %>/*'
      ]
    }]
  },
  server: '.tmp',
  reports: 'reports/*',
  coverage: 'coverage/*',
  docker: [
    'dist/dashboard-docker.zip',
    'dist/dashboard-docker'
  ]
};
