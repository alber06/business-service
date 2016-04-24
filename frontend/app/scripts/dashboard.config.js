(function () {
  'use strict';

  angular
    .module('dashboard')
    .config(['$compileProvider', 'ENV',
      function($compileProvider, ENV) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|content):|data:image\//);
        $compileProvider.debugInfoEnabled(ENV.debugInfoEnabled);
      }])
    .run(uiRouterStateChangeErrorLoggerInitialization)
    .run(uiRouterPreviousStateSupport);

  /* ngInject */
  function uiRouterStateChangeErrorLoggerInitialization(UiRouterStateChangeErrorLoggerInitializer) {
    UiRouterStateChangeErrorLoggerInitializer.activate();
  }

  /* ngInject */
  function uiRouterPreviousStateSupport($rootScope, $state) {
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
      $state.previous = fromState;
    });
  }

})();
