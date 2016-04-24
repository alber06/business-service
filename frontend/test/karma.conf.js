'use strict';

module.exports = function(config) {

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // reporters to use (dots/progress/coverage/...)
    reporters: ['spec', 'coverage'],

    // list of files/patterns to load in the browser
    files: [
      // bower:js
      'app/bower_components/modernizr/modernizr.js',
      'app/bower_components/jquery/dist/jquery.js',
      'app/bower_components/angular/angular.js',
      'app/bower_components/angular-animate/angular-animate.js',
      'app/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/bower_components/angular-loading-bar/build/loading-bar.js',
      'app/bower_components/angular-local-storage/dist/angular-local-storage.js',
      'app/bower_components/angular-resource/angular-resource.js',
      'app/bower_components/angular-sanitize/angular-sanitize.js',
      'app/bower_components/angular-scroll/angular-scroll.js',
      'app/bower_components/angular-toastr/dist/angular-toastr.tpls.js',
      'app/bower_components/angular-translate/angular-translate.js',
      'app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'app/bower_components/angular-ui-router/release/angular-ui-router.js',
      'app/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
      'app/bower_components/jquery.slimscroll/jquery.slimscroll.js',
      'app/bower_components/jquery.easing/js/jquery.easing.js',
      'app/bower_components/jquery-steps/build/jquery.steps.js',
      'app/bower_components/moment/moment.js',
      'app/bower_components/toastr/toastr.js',
      'app/bower_components/underscore/underscore.js',
      // endbower
      'app/bower_components/socket.io-client/socket.io.js',
      'app/bower_components/angular-mocks/angular-mocks.js',

      'app/scripts/**/*.module.js',
      'app/scripts/**/!(httpBasicAuthenticationInterceptor.*|dashboard.config|restApiInterceptor.config|mock.backend).js',
      'app/scripts/**/*.html',

      'test/helpers/**/*.module.js',
      'test/helpers/**/*.js',
      'test/specs/**/*.js'
    ],

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // misc
    colors: true,
    reportSlowerThan : 500,

    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // urlRoot: '/_karma_/'

    preprocessors: {
      'app/scripts/**/*.html': ['ng-html2js'],
      'app/scripts/**/*.js': ['coverage']
    },

    junitReporter: {
      outputFile: 'reports/unit-test-results.xml',
      suite: ''
    },

    coverageReporter: {
      type : 'lcovonly',
      dir : 'coverage/',
      subdir: '.'
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'app/',
      moduleName: 'dashboard.test.templates'
    }
  });
};
