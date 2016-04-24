(function () {
  'use strict';

  angular
    .module('dashboard.core')
    .config(loadingInterceptorConfig);

  /* @ngInject */
  function loadingInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('LoadingInterceptor');
  }
})();
