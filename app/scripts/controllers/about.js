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
        userFactory.getHR()
        .then(function(value){
            
              // On charge les informations de l'utilisateurs
             $scope.hrData = [
        		     	{
        		 	        "key": "Heat Rate",
        		             "values": value
        		 		}
        		 	];

             },function(message) {

              $scope.hrData = [];
         
             });
      };


    var initCadence = function(){
        userFactory.getCandence()
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
        userFactory.getCoord()
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


    $scope.start = function(){
       loadLive();
    }

    var promise;

    var loadLive = function(){
      $scope.counter = $scope.counter + 1;
      initHR();
      initCadence();
      initMap();
      promise = $timeout(loadLive, 1000);
   }

    $scope.stop = function(){
        $timeout.cancel(promise);
    }

    $scope.update = function(){
      $scope.counter = 0;
        initHR();
       initCadence();
     initMap();
    }


    $scope.colorFunction = function() {
      return function(d, i) {
          return '#E01B5D'
        };
    }

   
    $scope.counter = 0;
    initHR();
    initCadence();
    initMap();


  


 	
});