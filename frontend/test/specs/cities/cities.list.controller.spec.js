'use strict';

describe('CitiesListController', function () {

  var vm,
    cities,
    businesses,
    logger,
    BusinessesService,
    $uibModal,
    $rootScope,
    $q;

  beforeEach(module(
    'dashboard.core',
    'dashboard.cities',
    'dashboard.businesses',
    'dashboard.test',
    'dashboard.test.templates',
    'dashboard.test.locales'
  ));

  beforeEach(inject(function ($controller, ToDeepEqualMatcher, _BusinessesService_, _$rootScope_, _logger_, _$uibModal_, _$q_) {
    cities = [
      { country: 'ES', city: 'Madrid', businesses: [] },
      { country: 'ES', city: 'Barcelona', businesses: [] }
    ];
    businesses = [{id: 'id1'}, {id: 'id2'}];
    logger = _logger_;

    BusinessesService = _BusinessesService_;
    $q = _$q_;
    $rootScope = _$rootScope_;
    $uibModal = _$uibModal_;

    vm = $controller('CitiesListController', {
      BusinessesService: _BusinessesService_,
      cities: cities
    });

    jasmine.addMatchers(ToDeepEqualMatcher);
  }));

  describe('activate()', function () {
    it('should set initial data', function () {
      spyOn(vm.api, 'resetTable');
      vm.api.activate();

      expect(vm.cities).toDeepEqual(cities);
      expect(vm.businesses).toDeepEqual({});
      expect(vm.api.resetTable).toHaveBeenCalledWith();
    });
  });

  describe('showBusinesses()', function () {
    it('should get the businesses of a city from server if not cached', function () {
      var city = 'city',
        index = 1;

      spyOn(BusinessesService, 'getByCity').and.returnValue($q.when(cities));

      vm.api.activate();
      vm.api.showBusinesses(city, index);

      $rootScope.$apply();
      expect(vm.showingCity).toEqual(index);
      expect(vm.businesses[index]).toDeepEqual(cities);
      expect(BusinessesService.getByCity).toHaveBeenCalledWith(city);
    });

    it('should show the businesses of a city if cached', function () {
      var city = 'city',
        index = 1;

      vm.businesses[index] = cities;
      vm.api.showBusinesses(city, index);

      expect(vm.showingCity).toEqual(index);
      expect(vm.businesses[index]).toDeepEqual(cities);
    });
  });

  describe('showBusinessDetail()', function () {
    it('should open the business modal', function () {
      var business = 'business',
        index = 1;

      spyOn($uibModal, 'open').and.returnValue({ result: $q.when(businesses) });

      vm.api.activate();
      vm.api.showBusinessDetails(business, index);

      expect($uibModal.open).toHaveBeenCalledWith({
        templateUrl: 'scripts/businesses/business.detail.modal.html',
        controller: 'BusinessDetailModalController as vm',
        resolve: {
          business: business
        }
      });
    });

    it('should update the business address if selected to', function () {
      var business = 'business',
        index = 1;

      spyOn(logger, 'logSuccess');
      spyOn($uibModal, 'open').and.returnValue({ result: $q.when(businesses) });
      spyOn(BusinessesService, 'updateAddress').and.returnValue($q.when(true));

      vm.api.activate();
      vm.api.showBusinessDetails(business, index);

      $rootScope.$apply();
      expect(BusinessesService.updateAddress).toHaveBeenCalledWith(businesses);
      expect(logger.logSuccess).toHaveBeenCalledWith('The business has been updated');
    });

    it('should delete the business selected to', function () {
      var business = {id: 'id'},
        index = 1;

      spyOn(logger, 'logSuccess');
      spyOn($uibModal, 'open').and.returnValue({ result: $q.reject(true) });
      spyOn(BusinessesService, 'remove').and.returnValue($q.when(true));

      vm.businesses[vm.showingCity] = [];
      vm.api.showBusinessDetails(business, index);

      $rootScope.$apply();
      expect(BusinessesService.remove).toHaveBeenCalledWith(business.id);
      expect(logger.logSuccess).toHaveBeenCalledWith('The business has been removed');
    });
  });
});
