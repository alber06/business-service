'use strict';

module.exports = {
  'servedev': [
    'serve:dev'
  ],

  'servedist': [
    'serve:dist'
  ],

  'dev': [
    'preparetest',
    'karma:singleRun',
    'karma:background:start',
    'watch'
  ],

  'test': [
    'preparetest',
    'karma:singleRun'
  ],

  'coverage': [
    'test',
    'connect:coverage:keepalive'
  ],

  'deployS3': [
    'build:pre',
    'shell:awsS3clean',
    'shell:awsS3deploy'
  ],

  'dist': [
    'build:pro',
    'compress:dist'
  ],

  'default': [
    'usage'
  ]
};
