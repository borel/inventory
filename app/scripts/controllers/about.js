'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the inventoryApp
 */

var myAbout = angular.module('myAbout',[]);

myAbout.controller('AboutCtrl', ['$scope', function($scope) {
      $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
}]);