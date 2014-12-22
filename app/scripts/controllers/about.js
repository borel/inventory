'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inventoryApp
 */

var myAbout = angular.module('myAbout',[]);

myAbout.controller('AboutCtrl',function($scope,userFactory,uiGmapGoogleMapApi,$timeout) {



 	 var initHR = function(){
       userFactory.getHR($scope.gw,$scope.dateDebut,$scope.dateFin,$scope.heureDebut,$scope.heureFin,$scope.minDebut,$scope.minFin)
        .then(function(value){
            
              // On charge les informations de l'utilisateurs
             $scope.hrData = [
        		     	{
        		 	        "key": "Heart Rate",
        		             "values": value
        		 		}
        		 	];

             },function(message) {

              $scope.hrData = [];
         
             });
      };


   var initEnergy = function(){
       userFactory.getEnergy($scope.gw,$scope.dateDebut,$scope.dateFin,$scope.heureDebut,$scope.heureFin,$scope.minDebut,$scope.minFin)
        .then(function(value){
            
              // On charge les informations de l'utilisateurs
             $scope.energyData = [
                  {
                      "key": "Energy",
                         "values": value
                }
              ];

             },function(message) {

              $scope.energyData = [];
         
             });
      };


    var initCadence = function(){
        userFactory.getCandence($scope.gw,$scope.dateDebut,$scope.dateFin,$scope.heureDebut,$scope.heureFin,$scope.minDebut,$scope.minFin)
        .then(function(value){
            
              // On charge les informations de l'utilisateurs
             $scope.cadenceData = [
                  {
                      "key": "Cadence",
                         "values": value
                }
              ];

             },function(message) {

              $scope.cadenceData = [];
         
             });
      };


     var initMap = function(){
        userFactory.getCoord($scope.gw,$scope.dateDebut,$scope.dateFin,$scope.heureDebut,$scope.heureFin,$scope.minDebut,$scope.minFin)
        .then(function(coordonnee){
             

              $scope.map = {center: {latitude: coordonnee[0]['latt'], longitude: coordonnee[0]['long']}, zoom: 17 };
              $scope.options = {scrollwheel: true};

              //marker
              $scope.marker = {
                  id: 0,
                  coords: {
                    latitude: coordonnee[0]['latt'],
                    longitude: coordonnee[0]['long']
                  },
              };

              //markers de la course 
              var markers = [];
              var paths = [];
           
                for (var i = 0; i<coordonnee.length; i++) {
                  var mark = createMarker(i,coordonnee[i]['latt'],coordonnee[i]['long']);
                  markers.push(mark);

                   var path = createPoly(coordonnee[i]['latt'],coordonnee[i]['long']);
                   paths.push(path);
                }
  
              $scope.markersCourse = markers;
        
              console.log(markers);
              //Polyline
              $scope.polylines = [
                {
                    id: 1,
                    path: paths
                    ,
                    stroke: {
                        color: '#6060FB',
                        weight: 3
                    },
                    editable: true,
                    draggable: true,
                    geodesic: true,
                    visible: true,
                    icons: [{
                        icon: {
                            path: google.maps.SymbolPath.BACKWARD_OPEN_ARROW
                        },
                        offset: '25px',
                        repeat: '50px'
                    }]
                }];




             },function(message) {

               
                console.log("erreur");
                $scope.map = {center: {latitude: 45.7230052, longitude: 4.8293659}, zoom: 17 };
                $scope.options = {scrollwheel: true};

                $scope.polylines = [];
                $scope.markersCourse = [];

         
             });
        
      };


      var createPoly = function(lat,lon){
        var ret = {
          latitude: lat,
          longitude: lon
        };
        return ret;
      };


     var createMarker = function(i, lat, lon) {
        var latitude = lat;
        var longitude = lon;

        var ret = {
          latitude: latitude,
          longitude: longitude,
          title: 'm' + i,
          id: i
        };
        return ret;
    };

    var getDate = function(){
      var dateJour = new Date();
      var hour = dateJour.getHours();
      var minute = dateJour.getMinutes();
      var seconde = dateJour.getSeconds();

      return dateJour.getHours()+":"+dateJour.getMinutes()+":"+dateJour.getSeconds();

    }

    $scope.start = function(){
      $scope.dateStart = getDate();
      loadLive();
    }

    var promise;

    var loadLive = function(bool){
      $scope.dateMaj = getDate();
      initHR();
      initCadence();
      initEnergy();
      initMap();
      promise = $timeout(loadLive, 1000);
   }

    $scope.stop = function(){
      $scope.dateMaj = getDate();
      $timeout.cancel(promise);
    }

    $scope.update = function(){
      $scope.dateStart = '';
      $scope.dateMaj = getDate();
      $timeout.cancel(promise);
      initHR();
      initCadence();
      initMap();
      initEnergy();
    }


    $scope.colorEnergyFunction = function() {
      return function(d, i) {
          return '#31B404'
        };
    }


      $scope.colorHeartRateFunction = function() {
      return function(d, i) {
          return '#E01B5D'
        };
    }




    $scope.xAxisTickFormatFunction = function(){
       return function(d) {
          return d3.time.format(" %Hh%Mm%Ss %m/%d/%Y")(new Date(d/1000));
        };
    };



    $scope.today = function() {
      $scope.dateDebut = new Date();
    };
   

    $scope.clear = function () {
      $scope.dateDebut = null;
    };


    $scope.open = function($event,opened) {
      $event.preventDefault();
      $event.stopPropagation();
      $scope[opened] = true;
    };

    $scope.today_fin = function() {
      $scope.dateFin = getDate();
    };
   

    $scope.clear_fin = function () {
      $scope.dateFin = null;
    };

    var initIHM = function(){
      $scope.gw = "GW1417029"

    }


    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd.MM.yyyy'];
    $scope.format = $scope.formats[0];
    $scope.paramIsCollapsed = false;
    initIHM();
 	
});