'use strict';
var userService = angular.module('userService',[]);

userService.factory('userFactory',
	function($http,$q){
 
		var users = {};
		var urlBase = 'http://localhost/inventory_symfony/Symfony/web/app_dev.php/api/user/';

	 	// Liste de tous les utilisateurs
		users.getUsers = function(){
			var urlSpecifique = 'all';
			var deferred = $q.defer();

			$http.get(urlBase+urlSpecifique).
		        success(function(data) {
		          deferred.resolve(data);
		        }).
		        error(function(err) {
		          deferred.reject(err);
		    	});

		     return deferred.promise;
	 	};


	 	// ajout d'un utilisateur
	 	users.addUser = function(search){
	 		var urlSpecifique = 'new';
			var deferred = $q.defer();
			$http.post(urlBase+urlSpecifique,{
				 email:search.email,username: search.username
			})
				.success(function(data) {
		          deferred.resolve(data);
		        })
		        .error(function(err) {	
		          deferred.reject(err);
		    	});

			return  deferred.promise;
	 	};

	 	// modification d'un utilisateur
	 	users.updateUser = function(user){
	 		var urlSpecifique = 'update';
			var deferred = $q.defer();
			$http.post(urlBase+urlSpecifique,{
				 email:user.email,username: user.username,id:user.id
			})
				.success(function(data) {
		          deferred.resolve(data);
		        })
		        .error(function(err) {	
		          deferred.reject(err);
		    	});

			return  deferred.promise;
	 	};

	 	users.deleteUser = function(username){
	 		var urlSpecifique = username+'/delete';
			var deferred = $q.defer();
			$http.delete(urlBase+urlSpecifique).
		        success(function(data) {
		          deferred.resolve(data);
		        }).
		        error(function(err) {
		          deferred.reject(err);
		    	});

		     return deferred.promise;
	 	};


	 	 	// Données de la course 
		users.getHR = function(){
			var urlSpecifique = 'hr';
			var deferred = $q.defer();

			$http.get(urlBase+urlSpecifique).
		        success(function(data) {
		          deferred.resolve(data);
		        }).
		        error(function(err) {
		          deferred.reject(err);
		    	});

		     return deferred.promise;
	 	};

	 		 	 	// Données de la course 
		users.getCandence = function(){
			var urlSpecifique = 'cadence';
			var deferred = $q.defer();

			$http.get(urlBase+urlSpecifique).
		        success(function(data) {
		          deferred.resolve(data);
		        }).
		        error(function(err) {
		          deferred.reject(err);
		    	});

		     return deferred.promise;
	 	};

	 	users.getCoord = function(){
			var urlSpecifique = 'coord';
			var deferred = $q.defer();

			$http.get(urlBase+urlSpecifique).
		        success(function(data) {
		          deferred.resolve(data);
		        }).
		        error(function(err) {
		          deferred.reject(err);
		    	});

		     return deferred.promise;
	 	};


	 		


		return users;
	}
);