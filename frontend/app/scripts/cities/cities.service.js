(function() {
  'use strict';

  angular
    .module('dashboard.cities')
    .factory('CitiesService', CitiesService);

  /* @ngInject */
  function CitiesService($resource) {
    var cityResource = $resource(
      'city'
    );

    var service = {
      getAll: getAll
    };

    return service;

    function getAll() {
      return cityResource.query({}).$promise;
    }
  }
})();
