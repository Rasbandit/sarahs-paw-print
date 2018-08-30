angular.module('sarApp').controller('contactCtrl', ($scope, contactService, $http) => {
  $scope.sending = false;
  $scope.fileName = 'Upload a picture';

  $scope.submit = function() {
    $scope.sending = true;
    const formData = new FormData();
    console.log(formData);
    Object.keys($scope.email).forEach(key => {
      console.log(key);
      formData.append(key, $scope.email[key]);
      console.log(formData);
    });

    $http
      .post('/api/email', formData, {
        transformRequest: angular.identity,
        headers: { 'Content-Type': undefined },
      })
      .then(
        (data, status) => {
          $scope.email = {};
          $scope.sending = false;
          $scope.fileName = 'Upload a picture';
          swal(
            'Thank you!',
            'Your message has been delivered. Please allow for 48 business hours for a response',
            'success'
          );
        },
        (data, status) => {
          $scope.sending = false;
          swal(
            'Message not sent',
            'We were unable to send your message. Please make sure the file is under 25MB and try again',
            'error'
          );
        }
      );
  };

  const inputs = document.querySelectorAll('.inputfile');
  Array.prototype.forEach.call(inputs, input => {
    let label = input.nextElementSibling,
      labelVal = label.innerHTML;

    input.addEventListener('change', function(e) {
      let fileName = '';
      if (this.files && this.files.length > 1)
        fileName = (this.getAttribute('data-multiple-caption') || '').replace('{count}', this.files.length);
      else fileName = e.target.value.split('\\').pop();

      if (fileName) $scope.fileName = fileName;
      else label.innerHTML = labelVal;
    });
  });
});
