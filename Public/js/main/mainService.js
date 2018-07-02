angular.module("sarApp").service('mainService', function($http) {

this.getPetPictures = function() {
      return $http({
         method: 'GET',
         url: '/api/getPortraits'
      }).then(function(response) {
         return response.data;
      });
   };

   this.getOtherPictures = function() {
         return $http({
            method: 'GET',
            url: '/api/getOthers'
         }).then(function(response) {
            return response.data;
         });
      };

});
