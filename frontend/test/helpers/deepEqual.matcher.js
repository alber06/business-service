(function () {
  'use strict';

  angular
    .module('dashboard.test')
    .factory('ToDeepEqualMatcher', ToDeepEqualMatcher);

  function ToDeepEqualMatcher() {
    return {
      toDeepEqual: function () {
        return {
          compare: function(actual, expected) {
            var passed = (angular.equals(actual, expected));
            var actualJson = angular.toJson(actual);
            var expectedJson = angular.toJson(expected);
            return {
              pass: passed,
              message: 'Expected ' + actualJson + (passed ? ' not' : '') + ' to deep equal ' + expectedJson
            };
          }
        };
      }
    };
  }

})();
