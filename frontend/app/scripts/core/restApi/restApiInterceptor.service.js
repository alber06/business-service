(function () {
  'use strict';

  angular
    .module('dashboard.core')
    .factory('RestApiInterceptorService', RestApiInterceptorService);

  /* @ngInject */
  function RestApiInterceptorService(ENV) {
    var service = {
      request: request
    };
    return service;

    function request(httpRequest) {
      if (!(/.*\.html/.test(httpRequest.url)) && !(/.*\.js/.test(httpRequest.url))) {
        httpRequest.url = ENV.apiEndpoint + httpRequest.url;
      }

      return httpRequest;
    }
  }
})();
