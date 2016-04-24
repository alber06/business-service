(function () {
  'use strict';

  angular.module('dashboard.cities')
    .config(config);

    /* @ngInject */
    function config ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/citiesList');

      $stateProvider
        .state('citiesList', {
          url: '/citiesList',
          templateUrl: 'scripts/cities/cities.list.html',
          controller: 'CitiesListController as vm',
          resolve: {
            cities: getCities
          }
        });
    }

    /* @ngInject */
    function getCities(CitiesService) {
      return CitiesService.getAll();
    }
})();
