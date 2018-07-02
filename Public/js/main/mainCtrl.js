 angular.module("sarApp").controller('mainCtrl', function($scope, $state, $timeout, $rootScope, mainService) {

   $scope.stateName = "about";
   $scope.loggedIn = false;
   $scope.petPortraits = [];
   $scope.otherPictures = [];
   $scope.showModal = false;

   $scope.getPetPictures = function() {
      mainService.getPetPictures().then(function(response) {
         $scope.petPortraits = response;
      });
   };

   $scope.getOtherPictures = function() {
      mainService.getOtherPictures().then(function(response) {
         $scope.otherPictures = response;
      });
   };

   $scope.getPetPictures();
   $scope.getOtherPictures();

   $scope.getLogginStatus = function() {
     return $scope.loggedIn;
   }

   $scope.checkState = function() {
       $scope.stateName = $state.current.name;
   };

   var stateChecker = setInterval($scope.checkState, 50);
});
