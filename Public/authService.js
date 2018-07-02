angular.module('app').service('authService', function authService(lock, authManager) {

    function login() {
      lock.show();
    }

    // Set up the logic for when a user authenticates
    // This method is called from app.run.js
    function registerAuthenticationListener() {
      lock.on('authenticated', function (authResult) {
        localStorage.setItem('id_token', authResult.idToken);
        authManager.authenticate();
      });

      lock.on('authorization_error', function (err) {
        console.log(err);
      });
    }

    return {
      login: login,
      registerAuthenticationListener: registerAuthenticationListener
    }
  }
