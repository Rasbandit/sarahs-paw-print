angular.module("sarApp").controller('homeCtrl', function($scope, $interval) {

   $scope.homeImage = "https://s3-us-west-2.amazonaws.com/sarahgreggportfolio/portraits/BusterMedium.jpg";

   $interval(rotateImage, 4250);

   function rotateImage() {
      var num = parseInt((Math.random() * $scope.petPortraits.length - 1) + 1);
      while ($scope.petPortraits[num].medium === $scope.homeImage) {
         num = parseInt((Math.random() * $scope.petPortraits.length - 1) + 1);
      }
      $scope.homeImage = $scope.petPortraits[num].medium;
   }

});
