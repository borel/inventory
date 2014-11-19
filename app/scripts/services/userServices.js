'use strict';
var userService = angular.module('userService',[]);
userService.factory('userFactory',function($http, $templateCache){
 
	var users = {};
 
	users.getUsers = function(){
		var url = 'http://localhost/inventory_symfony/Symfony/web/app_dev.php/api/user/all';
		 $http.get(url).
	        success(function(data) {
	        	console.log(data);
	         return data;
	        }).
	        error(function(err) {
	          return err;
	    	});
 	};
 
	 return users;
});