angular.module("sarApp").service('contactService', function($http) {

this.sendEmail = function(message) {
      return $http({
         method: 'POST',
         url: '/api/email',
         data: message
      }).then(function(data, status) {
        console.log("Sent ok");
    }, function(data, status) {
        console.log("Error");
      });
   };

});
