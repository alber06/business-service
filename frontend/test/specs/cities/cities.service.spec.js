'use strict';

describe('CitiesService', function () {

  var CitiesService,
    $httpBackend;

  beforeEach(module(
    'dashboard.core',
    'dashboard.cities',
    'dashboard.test',
    'dashboard.test.templates',
    'dashboard.test.locales'
  ));

  beforeEach(inject(function(ToDeepEqualMatcher, _CitiesService_, _$httpBackend_) {
    CitiesService = _CitiesService_;
    $httpBackend = _$httpBackend_;

    jasmine.addMatchers(ToDeepEqualMatcher);
  }));

  describe('getAll()', function () {
    it('should fetch all cities', function () {
      var cities = [
        { country: 'ES', city: 'Madrid', businesses: [] },
        { country: 'ES', city: 'Barcelona', businesses: [] }
      ], response;

      $httpBackend
        .expectGET('city')
        .respond(200, cities);

      response = CitiesService.getAll();

      response.then(function(data) {
        expect(data).toDeepEqual(cities);
      });

      $httpBackend.flush();
    });
  });
});
