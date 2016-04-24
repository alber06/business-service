'use strict';

describe('CurrencyService', function () {

  var CurrencyService;

  beforeEach(module(
    'dashboard.core'
  ));

  beforeEach(inject(function(_CurrencyService_) {
    CurrencyService = _CurrencyService_;
  }));

  describe('formatCurrency', function () {
    it('should format the currency', function () {
      var currencyFormatted = CurrencyService.formatCurrency('EUR');

      expect(currencyFormatted).toEqual(' €');

      currencyFormatted = CurrencyService.formatCurrency('GBP');
      expect(currencyFormatted).toEqual('£ ');
    });
  });
});
