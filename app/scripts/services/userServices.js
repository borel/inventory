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
		users.getHR = function(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin){
			var urlSpecifique = 'hr';
			return buildWS(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin,urlSpecifique);
			
	 	};

	 		 	 	// Données de la course 
		users.getCandence = function(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin){
			var urlSpecifique = 'cadence';
			return buildWS(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin,urlSpecifique);
	 	};

	 	users.getCoord = function(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin){
			var urlSpecifique = 'coord';
			return buildWS(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin,urlSpecifique);
	 	};

	 	users.getEnergy = function(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin){
			var urlSpecifique = 'energy';
			return buildWS(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin,urlSpecifique);
	 	};


	 	var buildWS = function(gw,dateDebut,dateFin,heureDebut,heureFin,minuteDebut,minuteFin,urlSpecifique){
	 		// Gestion de l'url 
			var urlGW ='';
			if(gw != null){
				urlGW ='?gw='+gw;
			}

			// Gestion de la date de debut -- format à respecter 2014-12-11T19:25:00.000Z --
			if(heureDebut == null){
				heureDebut = '00';
			}

			if(minuteDebut == null){
				minuteDebut = '00';
			}

			var monthDebut = dateDebut.getMonth() + 1;
			var datDebWS = dateDebut.getFullYear()+'-'+monthDebut+'-'+dateDebut.getDate()+'T'+heureDebut+':'+minuteDebut+':00.000Z';
			
			var urlDateDeb = '&dateDebut='+datDebWS;

			// Gestion de la date de fin
			if(heureFin == null){
				heureFin = '00';
			}

			if(minuteFin == null){
				minuteFin = '00';
			}

			var monthFin = dateFin.getMonth() + 1;
			var datFinWS = dateFin.getFullYear()+'-'+monthFin+'-'+dateFin.getDate()+'T'+heureFin+':'+minuteFin+':00.000Z';
			var urlDateFin = '&dateFin='+datFinWS;


			var deferred = $q.defer();
			$http.get(urlBase+urlSpecifique+urlGW+urlDateDeb+urlDateFin).
		        success(function(data) {
		          deferred.resolve(data);
		        }).
		        error(function(err) {
		          deferred.reject(err);
		    	});

		     return deferred.promise;
	 	}

	 		


		return users;
	}
);