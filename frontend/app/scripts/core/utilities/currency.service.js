(function() {
  'use strict';

  angular
    .module('dashboard.core')
    .factory('CurrencyService', CurrencyService);

  /* @ngInject */
  function CurrencyService() {
    var service = {
      formatCurrency: formatCurrency
    };
    return service;

    function formatCurrency(currency) {
      if(currency === 'GBP') {
        currency = '£';
      }
      return currency === 'EUR' ? ' €' :  currency + ' ';
    }
  }
})();
