(function(){
angular.module('contactsApp', [])
.controller('contactsController', ['$scope', '$http', function($scope, $http) {
	
	$http({
	  method: 'GET',
	  url: 'http://localhost:8000/contacts'
	}).then( function onSuccess(response) {
			  $scope.contacts = response.data; // response data 
			});
			
	$scope.selectContact = function(contact){
		for(i=0;i<$scope.contacts.length;i++)
		{
			$scope.contacts[i].isSelected = false;
		}
		contact.isSelected = true;
		$scope.selectedContact = contact;
		$scope.isContactSelected = true;
	}
	
}]);
})();