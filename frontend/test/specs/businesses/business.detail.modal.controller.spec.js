'use strict';

describe('BusinessDetailModalController', function () {

  var vm,
    business,
    $modalInstance,
    $rootScope,
    $q;

  beforeEach(module(
    'dashboard.core',
    'dashboard.businesses',
    'dashboard.test',
    'dashboard.test.templates',
    'dashboard.test.locales'
  ));

  beforeEach(inject(function ($controller, ToDeepEqualMatcher, _$rootScope_, _$q_) {
    business = 'business';

    $q = _$q_;
    $rootScope = _$rootScope_;
    $modalInstance = {
        close: jasmine.createSpy('modalInstance.close'),
        dismiss: jasmine.createSpy('modalInstance.dismiss'),
        result: {
          then: jasmine.createSpy('modalInstance.result.then')
        }
      };

    vm = $controller('BusinessDetailModalController', {
      business: business,
      $modalInstance: $modalInstance
    });

    jasmine.addMatchers(ToDeepEqualMatcher);
  }));

  describe('activate()', function () {
    it('should set initial data', function () {
      vm.api.activate();

      expect(vm.business).toDeepEqual('business');
    });
  });

  describe('ok()', function () {
    it('should close the modal sending the business', function () {
      vm.api.ok(business);

      expect($modalInstance.close).toHaveBeenCalledWith(business);
    });
  });

  describe('cancel()', function () {
    it('should close the modal without making a remove business request', function () {
      vm.api.cancel();

      expect($modalInstance.dismiss).toHaveBeenCalledWith(false);
    });
  });

  describe('remove()', function () {
    it('should close the modal making a remove business request', function () {
      vm.api.remove();

      expect($modalInstance.dismiss).toHaveBeenCalledWith(true);
    });
  });
});
