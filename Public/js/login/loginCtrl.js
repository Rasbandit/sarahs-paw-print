angular.module("sarApp").controller('loginCtrl', function($scope, $state, $rootScope, loginService) {

    $scope.login = function(user) {
        loginService.login(user).then(function(response) {
            if (!response.data) {
                swal("Unable to log in", "Please check the username and password and try again", "error");
                $scope.user.password = '';
            } else {
               $rootScope.loggedIn = true;
               console.log($rootScope);
               $scope.user.password = '';
               $state.go('admin');
            }
        }).catch(function(err) {
           swal("Unable to log in!", "Please check the Username and Password and try again.", "error");
           $scope.user.password = '';
        });
    };

});
