(function(){
angular.module('contactsApp', [])
.controller('contactsController', ['$http', function($http) {
	var ctrl = this;
	
	$http({
	  method: 'GET',
	  url: 'http://localhost:8000/contacts'
	}).then( function onSuccess(response) {
			  ctrl.contacts = response.data; // response data 
			});
			
	ctrl.selectContact = function(contact){
		ctrl.selectedContact = contact;
		ctrl.isContactSelected = true;
	}
	
}])
.directive('contactInfo', function(){
	return{
		require: 'E',
		templateUrl: 'contact-info.html',
		scope:{
			info: '='
		}
	}
})
.directive('contactDetail', function(){
	return{
		require: 'E',
		templateUrl: 'contact-detail.html',
		scope:{
			detail: '='
		}
	}
});
})();