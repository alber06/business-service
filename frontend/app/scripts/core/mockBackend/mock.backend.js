(function () {
  'use strict';

  angular
    .module('dashboard.coree', [])
    .run(['$httpBackend',
      function ($httpBackend) {
        $httpBackend.whenGET('locales/es.json').passThrough();
        $httpBackend.whenGET(/.*.html/).passThrough();

        $httpBackend.whenGET(/.*payments/).passThrough();

        $httpBackend.whenGET(/.*booking/).passThrough();

        $httpBackend.whenGET(/.*orders/).respond(function() {
          var request = new XMLHttpRequest();

          request.open('GET', 'scripts/core/mockBackend/mockResources/ordersList.json', false);
          request.send(null);
          return [request.status, JSON.parse(request.response), {}];
        });

        $httpBackend.whenPOST('').respond(200, {});
      }]);
})();
