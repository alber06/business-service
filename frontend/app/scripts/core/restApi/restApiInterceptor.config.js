(function () {
  'use strict';

  angular
    .module('dashboard.core')
    .config(restApiInterceptorConfig);

  /* @ngInject */
  function restApiInterceptorConfig($httpProvider) {
    $httpProvider.interceptors.push('RestApiInterceptorService');
  }
})();
