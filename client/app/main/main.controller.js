'use strict';

angular.module('fruitsofthespiritApp')
  .controller('MainCtrl', function ($scope, $http) {

    $http.get('/api/fruits').success(function(fruits) {
      $scope.fruits = fruits;
    });
  });