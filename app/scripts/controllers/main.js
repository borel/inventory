'use strict';

/**
 * @ngdoc function
 * @name inventoryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the inventoryApp
 */
var myMain = angular.module('myMain',[]);


myMain.controller('MainCtrl',function($scope,userFactory) {


  $scope.isCollapsed = true;
  $scope.retourAction = null;
  
      $scope.createUser = function(){
           userFactory.addUser($scope.search)
            .then(function(value){
              loadUserList();
              $scope.retourAction = 'Utilisateur Créé';
              $scope.search = null;  
              $scope.errorDisplay=true;   
          },function(message) {
              $scope.retourAction = 'Une erreur s est produite verifier les informations saisies';
              $scope.error = message;
              $scope.isCollapsed = false;
              $scope.errorDisplay=false;   
             });
      };


      $scope.updateUser = function(user){
        userFactory.updateUser(user)
        .then(function(value){
            
              // On charge les informations de l'utilisateurs
              loadUserList();
              $scope.retourAction = 'Utilisateur Modifié';
              $scope.search = null;  
              $scope.errorDisplay=true;   

             },function(message) {

              $scope.retourAction = 'Une erreur s est produite verifier les informations saisies';
              $scope.error = message;
              $scope.isCollapsed = false;
              $scope.errorDisplay=false;   
             });
      };


      $scope.deleteUser = function(user){
        userFactory.deleteUser(user.username)
        .then(function(value){
            
              // On charge les informations de l'utilisateurs
              loadUserList();
              $scope.retourAction = 'Utilisateur Supprimé';
              $scope.search = null;  
              $scope.errorDisplay=true;   

             },function(message) {

              $scope.retourAction = 'Une erreur s est produite verifier les informations saisies';
              $scope.error = message;
              $scope.isCollapsed = false;
              $scope.errorDisplay=false;   
             });
      };





      //function de chargement de liste
      var loadUserList =  function loadUserList(){
        userFactory.getUsers()
            .then(function(value){
              $scope.users = value;
              $scope.errorDisplay=true;  

             },function(message) {
              $scope.error = message;
              $scope.isCollapsed = false;
              $scope.errorDisplay=false;   
            });         
      };

      
      var initIHMValue = function(){
          $scope.errorDisplay=true;   
      };


      
      // On charge les utilisateurs à l'ouveture de la page
      loadUserList();
      initIHMValue();
     
});





