(function() {
  'use strict';

  angular
    .module('dashboard.core')
    .factory('AuthenticationService', AuthenticationService);

  /* @ngInject */
  function AuthenticationService($resource, $state, SessionService) {
    var loginResource = $resource(
      'security/login/'
    );

    var logoutResource = $resource(
      'security/logout'
    );

    var forgotPasswordResource = $resource(
      'security/password/forgot/'
    );

    var changePasswordResource = $resource(
      'security/password/reset/'
    );

    var emailSignupResource = $resource(
      'security/user/emailsignup'
    );

    var service = {
      doSignin: doSignin,
      doSignout: doSignout,
      recoverPassword: recoverPassword,
      registerUser: registerUser,
      changePassword: changePassword,
    };
    return service;

    function doSignin(credentials) {
      return loginResource.save(credentials).$promise;
    }

    function recoverPassword(email) {
      return forgotPasswordResource.save({ email: email }).$promise;
    }

    function doSignout() {
      logoutResource.save().$promise
        .finally(function() {
          SessionService.clearSession();
          $state.go('signin');
        });
    }

    function registerUser(credentials) {
      return emailSignupResource.save({skiplogin: true}, credentials).$promise;
    }

    function changePassword(userId, newPassword) {
      return changePasswordResource.save({userId: userId, newPassword: newPassword}).$promise;
    }
  }
})();
