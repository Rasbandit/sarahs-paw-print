angular.module("sarApp").controller('otherCtrl', function($scope) {

  $scope.startIndex = 0;
  $scope.modal = {};
  $scope.large =  $scope.otherPictures[0];
  $scope.hideNine = true;
  $scope.hideSix = true;

  if($scope.otherPictures.length <= 9) {
    $scope.hideNine = false;
  }

  if($scope.otherPictures.length <= 6) {
    $scope.hideSix = false;
  }

  $scope.getSubArraySix = function (start) {
     return $scope.otherPictures.slice(start, start + 6);
  };

  $scope.getSubArrayNine = function (start) {
     return $scope.otherPictures.slice(start, start + 9);
  };

  $scope.showMoreSix = function (incOrDec) {
     if (incOrDec === '+') {
        if($scope.startIndex + 6 >= $scope.otherPictures.length) {
           $scope.startIndex = 0;
        }
        else {
           $scope.startIndex += 6;
        }
     }
     if (incOrDec === '-') {
        if($scope.startIndex - 6 < 0) {
           $scope.startIndex = $scope.otherPictures.length - 6;
        }
        else {
           $scope.startIndex -= 6;
        }
     }
  };

  $scope.showMoreNine = function (incOrDec) {
     if (incOrDec === '+') {
        if($scope.startIndex + 9 >= $scope.otherPictures.length) {
           $scope.startIndex = 0;
        }
        else {
           $scope.startIndex += 9;
        }
     }
     if (incOrDec === '-') {
        if($scope.startIndex - 9 < 0) {
           $scope.startIndex = $scope.otherPictures.length - 9;
        }
        else {
           $scope.startIndex -= 9;
        }
     }
  };

  $scope.loadModal = function (id) {
     for (var i = 0; i < $scope.otherPictures.length; i++) {
        if (id === $scope.otherPictures[i].ID) {
           $scope.modal = $scope.otherPictures[i];
        }
     }
     $scope.showModal = true;
  };

  $scope.setLarge = function(id) {
     for (var i = 0; i < $scope.otherPictures.length; i++) {
        if (id === $scope.otherPictures[i].ID) {
           $scope.large = $scope.otherPictures[i];
        }
     }
  };

  $scope.setLarge(1);

  wheelzoom(document.querySelectorAll('.zoom'))
});
