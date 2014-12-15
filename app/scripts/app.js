'use strict';



var inventoryApp = angular.module('inventoryApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.sortable',
    'myAbout',
    'myMain',
    'testService',
    'userService',
    'ui.bootstrap',
    'nvd3ChartDirectives',
    'uiGmapgoogle-maps'
,  ]);


inventoryApp.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
       })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

inventoryApp.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
});
