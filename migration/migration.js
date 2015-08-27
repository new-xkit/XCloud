'use strict';

angular.module('xcloud.migration', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/migration', {
        templateUrl: '/migration/migration.html',
        controller: 'MigrationController'
      });
    }])

    .controller('MigrationController', function($scope, $location) {
        if(localStorage.getItem("auth") === null){
            $location.path('/login').replace();
        }

        $scope.go = function(path){
            $location.path(path).replace();
        }
    });