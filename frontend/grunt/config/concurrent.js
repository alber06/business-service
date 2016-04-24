'use strict';

module.exports = {

  server: [
    'compass:server',
    'copy:styles',
    'copy:fonts'
  ],
  dist: [
    'compass:dist',
    'copy:styles',
    'copy:fonts'
  ]

};
