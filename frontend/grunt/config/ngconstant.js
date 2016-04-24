'use strict';

module.exports = {

  options: {
    space: ' ',
    deps: false,
    wrap: '\'use strict\';\n\n{%= __ngModule %}',
    name: 'dashboard.core',
    dest: '<%= yeoman.app %>/<%= yeoman.scripts %>/core/env.constant.js'
  },
  dev: {
    constants: {
      ENV: {
        name: 'development',
        apiEndpoint: 'http://192.168.99.100:8080/',
        debugInfoEnabled: true,
        pageSize: 20
      }
    }
  },
  dist: {
    constants: {
      ENV: {
        name: 'dist-development',
        apiEndpoint: 'http://192.168.99.100:8080/',
        debugInfoEnabled: true,
        pageSize: 20
      }
    }
  },
  pre: {
    constants: {
      ENV: {
        name: 'pre-production',
        apiEndpoint: 'http://192.168.99.100:8080/',
        debugInfoEnabled: true,
        pageSize: 20
      }
    }
  },
  pro: {
    constants: {
      ENV: {
        name: 'production',
        apiEndpoint: 'http://192.168.99.100:8080/',
        debugInfoEnabled: false,
        pageSize: 20
      }
    }
  }

};
