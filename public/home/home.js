'use strict';

angular.module('xcloud.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: '/home/home.html',
        controller: 'HomeController'
      });
    }])

    .controller('HomeController', ['$scope', '$cookies', '$location', function($scope, $cookies, $location) {
        if($cookies.get("auth") == false){
            $location.path('/login').replace();
        }

        $scope.go = function(path){
            $location.path(path).replace();
        }
    }]);