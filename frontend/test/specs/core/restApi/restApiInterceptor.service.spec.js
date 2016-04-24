'use strict';

describe('RestApiInterceptorService', function () {

  var RestApiInterceptorService;

  beforeEach(module(
    'dashboard.core',
    function($provide) {
      $provide.constant('ENV', {name:'test', apiEndpoint:'http://test.afernandezgom.com/'});
    }
  ));

  beforeEach(inject(function(_RestApiInterceptorService_) {
    RestApiInterceptorService = _RestApiInterceptorService_;
  }));

  it('should transform REST API URLs', function () {
      var restUri = RestApiInterceptorService.request({url: 'api/something'});

      expect(restUri).toEqual({url: 'http://test.afernandezgom.com/api/something'});
  });

  it('must bypass non REST API URLs', function () {
    var restUri = RestApiInterceptorService.request({url: 'views/something.html'});

    expect(restUri).toEqual({url: 'views/something.html'});
  });

});
