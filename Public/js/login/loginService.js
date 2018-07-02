angular.module("sarApp").service('loginService', function($http) {

  this.register = function(user) {
    return $http({
      method: 'post',
      url: '/api/register',
      data: user
    })
  }

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: '/api/login',
      data: user
    }).then(function(response) {
      return response;
    });
  };


});
