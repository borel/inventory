'use strict';
var userService = angular.module('userService',[]);
userService.factory('userFactory',
	[function(){

	var users = {};

	users.getUsers = function($http,$scope,$templateCache){
		 $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
	        success(function(data) {
	          $scope.users =  data ;
	        }).
	        error(function(data) {
	          $scope.users =  data ;
	    	});
 	};


	users.getName = function(){
		return 'borel';
	}
	
	

	 return users;
}]);
