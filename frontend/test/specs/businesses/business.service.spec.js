'use strict';

describe('BusinessesService', function () {

  var BusinessesService,
    $httpBackend;

  beforeEach(module(
    'dashboard.core',
    'dashboard.businesses',
    'dashboard.test',
    'dashboard.test.templates',
    'dashboard.test.locales'
  ));

  beforeEach(inject(function(ToDeepEqualMatcher, _BusinessesService_, _$httpBackend_) {
    BusinessesService = _BusinessesService_;
    $httpBackend = _$httpBackend_;

    jasmine.addMatchers(ToDeepEqualMatcher);
  }));

  describe('getByCity()', function () {
    it('should fetch businesses by city', function () {
      var businesses = [
        { id: 'MAD12345', name: 'name1', address: 'address1' },
        { id: 'MAD67890', name: 'name2', address: 'address2' }
      ],
      city = 'Madrid',
      response;

      $httpBackend
        .expectGET('business?city=Madrid')
        .respond(200, businesses);

      response = BusinessesService.getByCity(city);

      response.then(function(data) {
        expect(data).toDeepEqual(businesses);
      });

      $httpBackend.flush();
    });
  });

  describe('updateAddress()', function () {
    it('should update the business address in backend', function () {
      var business = {
          id: '123456'
        },
        response;

      $httpBackend
        .expectPUT('business/123456/address')
        .respond(200, {});

      response = BusinessesService.updateAddress(business);

      response.then(function(data) {
        expect(data).toDeepEqual({});
      });

      $httpBackend.flush();
    });
  });

  describe('remove()', function () {
    it('should delete a business in backend', function () {
      var business = {
          id: '123456'
        },
        response;

      $httpBackend
        .expectDELETE('business/123456')
        .respond(200, {});

      response = BusinessesService.remove(business.id);

      response.then(function(data) {
        expect(data).toDeepEqual({});
      });

      $httpBackend.flush();
    });
  });
});
