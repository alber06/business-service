(function () {
  'use strict';

  angular
    .module('dashboard.core')
    .factory('LoadingInterceptor', LoadingInterceptor);

  /* @ngInject */
  function LoadingInterceptor($rootScope, $q) {
    var blackList = [
      'scripts/', 'locales/'
    ];

    var service = {
      request: request,
      response: response,
      responseError: responseError
    };
    return service;

    function request(httpRequest) {
      var found = false;

      angular.forEach(blackList, function (url) {
        var regExp = new RegExp(url);

        if((httpRequest.url === 'lastActiveOffers' && httpRequest.params.offset) || regExp.test(httpRequest.url)) {
          found = true;
          return;
        }
      });

      if(!found) {
        $rootScope.$broadcast('loading:show');
      }
      return httpRequest;
    }

    function response(httpResponse) {
      var found = false;

      angular.forEach(blackList, function (url) {
        var regExp = new RegExp(url);

        if(regExp.test(httpResponse.config.url)) {
          found = true;
          return;
        }
      });

      if(!found) {
        $rootScope.$broadcast('loading:hide');
      }

      return httpResponse;
    }

    function responseError(rejection) {
      $rootScope.$broadcast('loading:hide');

      return $q.reject(rejection);
    }
  }

})();
