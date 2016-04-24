(function () {
  'use strict';

  angular
    .module('dashboard.test.locales')
    .run(LoadLocales);

  function LoadLocales($httpBackend) {
    $httpBackend.whenGET('locales/es.json').respond('');
    $httpBackend.whenGET('locales/en.json').respond('');
    $httpBackend.whenGET('locales/C.json').respond('');
  }

})();
