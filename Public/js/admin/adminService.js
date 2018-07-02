angular.module('sarApp').service('dataService', function($http) {
  this.storeImage = function(imageData, fileName) {
    var imageExtension = imageData.split(';')[0].split('/')
    imageExtension = imageExtension[imageExtension.length - 1];

    var newImage = {
      imageName: fileName,
      imageBody: imageData,
      imageExtension: imageExtension,
      userEmail: 'todd.rasband@gmail.com'
   };

    return $http({
         method: 'POST',
         url: '/api/email',
         data: newImage
      }).then(function(response) {
        console.log(response);
      });
 };
});
