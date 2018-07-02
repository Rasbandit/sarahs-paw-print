angular.module("sarApp").controller('contactCtrl', function($scope, contactService, $http) {

   $scope.sending = false;
   $scope.fileName = 'Upload a picture';

   $scope.submit = function() {
      $scope.sending = true;
       var formData = new FormData();
       console.log(formData);
       Object.keys($scope.email).forEach(function(key) {
         console.log(key);
           formData.append(key, $scope.email[key]);
           console.log(formData);
       });

       $http.post('/api/email', formData, {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}
       }).then(function(data, status) {
           $scope.email = {};
           $scope.sending = false;
           $scope.fileName = 'Upload a picture';
           swal("Thank you!", "Your message has been delivered. Please allow for 48 business hours for a response", "success");
       }, function(data, status) {
           $scope.sending = false;
           swal("Message not sent", "We were unable to send your message. Please make sure the file is under 25MB and try again", "error");
       });
   };

   var inputs = document.querySelectorAll( '.inputfile' );
   Array.prototype.forEach.call( inputs, function( input )
   {
   	var label	 = input.nextElementSibling,
   		labelVal = label.innerHTML;

   	input.addEventListener( 'change', function( e )
   	{
   		var fileName = '';
   		if( this.files && this.files.length > 1 )
   			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
   		else
   			fileName = e.target.value.split( '\\' ).pop();

   		if( fileName )
   			$scope.fileName = fileName;
   		else
   			label.innerHTML = labelVal;
   	});
   });

});
