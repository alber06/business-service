(function () {
  'use strict';

  angular
    .module('dashboard.core')
    .config(translateConfig);

  /* @ngInject */
  function translateConfig($translateProvider) {
    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    $translateProvider.useStaticFilesLoader({
      prefix: 'locales/',
      suffix: '.json'
    });

    $translateProvider.determinePreferredLanguage(function () {
      return navigator.language.split('-')[0];
    });

    $translateProvider.fallbackLanguage('es');
  }

})();
