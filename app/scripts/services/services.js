'use strict';
var services = angular.module('testService',[]);
services.factory('testFactory',
	[ function(){
		var test = {};

		test.getNom = function() {
    		return 'test';
  		};

	
	 return test;
}]);


 