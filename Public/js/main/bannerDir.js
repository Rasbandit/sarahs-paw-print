angular.module('sarApp').directive('banner', function() {

   return {
      restrict: 'E',
      templateUrl: './views/bannerDir.html',
      scope: {
         state: '='
      }
   };
});
