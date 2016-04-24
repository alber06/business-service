(function() {
'use strict';

angular
    .module('dashboard.cities')
    .controller('CitiesListController', CitiesListController);

/* @ngInject */
function CitiesListController($filter, $uibModal, cities, logger, BusinessesService) {
  /* jshint validthis: true */
  var vm = this;

  vm.api = {
    activate: activate,
    showBusinesses: showBusinesses,
    showBusinessDetails: showBusinessDetails,
    select: select,
    onFilterChange: onFilterChange,
    onNumPerPageChange: onNumPerPageChange,
    onOrderChange: onOrderChange,
    search: search,
    order: order,
    resetTable: resetTable
  };

  activate();

  ////////////////

  function activate() {
    vm.cities = cities;
    vm.businesses = {};
    vm.api.resetTable();
  }

  function showBusinesses(cityName, index) {
    if(!vm.businesses[index]) {
      BusinessesService.getByCity(cityName)
        .then(function(_businesses) {
          vm.showingCity = index;
          vm.businesses[index] = _businesses;
        });
    } else {
      vm.showingCity = index;
    }

  }

  function showBusinessDetails(business, index) {
    var modalInstance = $uibModal.open({
      templateUrl: 'scripts/businesses/business.detail.modal.html',
      controller: 'BusinessDetailModalController as vm',
      resolve: {
        business: business
      }
    });

    modalInstance.result
      .then(function(_business) {
        BusinessesService.updateAddress(_business)
          .then(function() {
            logger.logSuccess('The business has been updated');
          });
      })
      .catch(function(_remove) {
        if (_remove) {
          BusinessesService.remove(business.id)
            .then(function() {
              vm.businesses[vm.showingCity].splice(index, 1);
              logger.logSuccess('The business has been removed');
            });
        }
      });
  }

  function select(page) {
    var end, start;

    vm.businesses = [];
    vm.showingCity = undefined;
    start = (page - 1) * vm.numPerPage;
    end = start + vm.numPerPage;
    vm.currentPageData = vm.filteredData.slice(start, end);
  }

  function onFilterChange() {
    vm.api.select(1);
    vm.currentPage = 1;
    vm.row = '';
  }

  function onNumPerPageChange() {
    vm.api.select(1);
    vm.currentPage = 1;
  }

  function onOrderChange() {
    vm.api.select(1);
    vm.currentPage = 1;
  }

  function search() {
    vm.filteredData = $filter('filter')(vm.cities, vm.searchKeywords);
    vm.api.onFilterChange();
  }

  function order(rowName) {
    if (vm.row === rowName) {
      return;
    }
    vm.row = rowName;
    vm.filteredData = $filter('orderBy')(vm.cities, rowName);
    vm.api.onOrderChange();
  }

  function resetTable() {
    vm.searchKeywords = '';
    vm.filteredData = [];
    vm.row = '';
    vm.numPerPageOpt = [3, 5, 10, 20];
    vm.numPerPage = vm.numPerPageOpt[2];
    vm.currentPage = 1;
    vm.currentPageStores = [];
    vm.api.search(vm.data);
    vm.api.select(vm.currentPage);
  }
}
})();
