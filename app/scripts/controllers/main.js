

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var myMain = angular.module('myMain',[]);

myMain.controller('MainCtrl', ['$scope','userFactory', function($scope,userFactory) {
    console.log(userFactory.getUsers());
   $scope.users = userFactory.getUsers();
     console.log(userFactory.getUsers());

}]);