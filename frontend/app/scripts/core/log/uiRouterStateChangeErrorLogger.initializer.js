(function () {
  'use strict';

  angular
    .module('dashboard.core')
    .factory('UiRouterStateChangeErrorLoggerInitializer', UiRouterStateChangeErrorLoggerInitializer);

  /* @ngInject */
  function UiRouterStateChangeErrorLoggerInitializer($rootScope, $log) {
    var initializer = {
      activate: activate
    };
    return initializer;

    function activate() {
      $rootScope.$on('$stateChangeError',
        function (event, toState, toParams, fromState, fromParams, error) {
          $log.error('Error changing route state: ', error);
        });
    }
  }

})();
