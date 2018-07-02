angular.module("sarApp").controller('adminCtrl', function($scope, $http, $rootScope, $state) {
  console.log($rootScope);
  if($rootScope.loggedIn === false) {
    $state.go('login')
  };

   $scope.sending = false;
   $scope.fileName = 'Upload a picture';

   $scope.submit = function() {
      $scope.sending = true;
       var formData = new FormData();
       Object.keys($scope.upload).forEach(function(key) {
           formData.append(key, $scope.upload[key]);
       });

       $http.post('/api/upload', formData, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
       }).then(function(data, status) {
           $scope.upload = {};
           $scope.sending = false;
           $scope.fileName = 'Upload a picture';
           swal("Thank you!", "Your message has been delivered. Please allow for 48 business hours for a response", "success");
       }, function(data, status) {
           $scope.sending = false;
           swal("Message not sent", "We were unable to send your message. Please make sure the file is under 25MB and try again", "error");
       });
   };

});
