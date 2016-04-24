'use strict';

module.exports = {

  options: {
    configFile: 'test/karma.conf.js'
  },
  background: {
    background: true,
    browsers: ['PhantomJS'],
    reporters: ['spec']
  },
  singleRun: {
    singleRun: true,
    browsers: ['PhantomJS'],
    reporters: ['spec', 'coverage'],
    colors: false
  }

};
