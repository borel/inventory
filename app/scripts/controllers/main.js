'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var myMain = angular.module('myMain',[]);

myMain.controller('MainCtrl', function ($scope, $http , $templateCache ,testFactory,userFactory) {
    
    $scope.method = 'GET';    //$scope.method = 'jsonp';

    $scope.url = 'http://localhost/inventory_symfony/Symfony/web/app_dev.php/api/user/all';
   //$scope.url = 'https://angularjs.org/greet.php?callback=JSON_CALLBACK&name=Super%20Hero'

    //var moment = require('moment');
   //$scope.testDate = moment('19/05/2014', 'DD/MM/YYYY');

  // $scope.name = testFactory.getNom();
   $scope.variable = userFactory.getName();
   
   userFactory.getUsers($http,$scope,$templateCache);
   
   /*
    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
        success(function(data, status) {
          $scope.status = status;
          $scope.users = data;

        }).
        error(function(data, status) {
          $scope.data = data ;
          $scope.status = status;
    });
  */
    $scope.addTodo = function () {
      $scope.users.push($scope.todo);
      $scope.todo = '';
    };

    $scope.removeTodo = function (index) {
      $scope.users.splice(index, 1);
    };
   
  });