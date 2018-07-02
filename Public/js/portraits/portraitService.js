angular.module("sarApp").service('portraitService', function($http) {

this.getPetPictures = function(id, prodid, amount, size) {
      return $http({
         method: 'GET',
         url: '/api/getPortraits'
      }).then(function(response) {
         return response.data;
      });
   };

});
