'use strict'
angular.module('app', [])
.controller('fetchNamesController', ['$scope','$http','$q','$log', function($scope, $http, $q, $log) {
	let baseurl = 'http://localhost:3000'
	
	$scope.names = [];
		
	$http({
	  method: 'GET',
	  url: baseurl + '/people'
	}).then(function onSuccess(response) {
		let people = [];
		
		people = response.data.data;		
		
		for (let i= 0; i< people.length; i++){
			
			$http({
			  method: 'GET',
			  url: baseurl+ people[i]._links
			}).then(function onSuccess(response){
					$scope.names.push(response.data.data.name);
				}, function onError(error) {
					$log.error("Id does not exist.\n" + error.status) ;
				});
			
		}				
	  }, function onError(error) {
		$log.error(error.data, error.status) ;
	  });
}]);