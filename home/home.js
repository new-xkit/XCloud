'use strict';

angular.module('xcloud.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: '/home/home.html',
        controller: 'HomeController'
      });
    }])

    .controller('HomeController', function($scope, $location) {
        if(localStorage.getItem("auth") === null){
            $location.path('/login').replace();
        }

        $scope.go = function(path){
            $location.path(path).replace();
        }
    });