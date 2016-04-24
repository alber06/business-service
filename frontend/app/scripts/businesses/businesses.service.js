(function() {
  'use strict';

  angular
    .module('dashboard.businesses')
    .factory('BusinessesService', BusinessesService);

  /* @ngInject */
  function BusinessesService($resource) {
    var businessResource = $resource(
      'business/:id/:suffix',
      {},
      {
        update: { method:'PUT' }
      }
    );

    var service = {
      getByCity: getByCity,
      updateAddress: updateAddress,
      remove: remove
    };

    return service;

    function getByCity(city) {
      return businessResource.query({ city: city }).$promise;
    }

    function updateAddress(business) {
      return businessResource.update({ id: business.id, suffix: 'address' }, { address: business.address }).$promise;
    }

    function remove(businessId) {
      return businessResource.delete({ id: businessId }).$promise;
    }
  }
})();
