'use strict'
angular.module('app', [])
.controller('fetchNamesController', ['$http','$q','$log', function($http, $q, $log) {
	let baseurl = 'http://localhost:3000';
	
	let ctrl = this; //using controllerAs syntax
	
	ctrl.names = [];
		
	function getPeople(){
		var promise = $http({
					  method: 'GET',
					  url: baseurl + '/people'
					});
		return promise;
	}
	
	function getPerson(person){
		return $http({
			  method: 'GET',
			  url: baseurl+ person._links
			});
	}
	
	function onGetPeopleSuccess(response) {
		let people = [];
		let personPromises = [];
		
		people = response.data.data;		
		
		//get person info for each instance in people
		for (let i= 0; i< people.length; i++){
			
			personPromises.push(getPerson(people[i]));
		}
		
		return $q.all(personPromises);
	}
	
	function onGetPersonSuccess(responses){
		for (let i=0; i< responses.length; i++){
			ctrl.names.push(responses[i].data.data.name);
		}
	}
	
	function onError(error) {
		$log.error(error.data, error.status) ;
	}	
	
	getPeople()
	.then(onGetPeopleSuccess, onError)
	.then(onGetPersonSuccess, onError) ;
	
}]);