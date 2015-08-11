'use strict';


angular.module('xcloud.status', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/status', {
            templateUrl: '/status/status.html',
            controller: 'StatusController'
        });
    }])

    .controller('StatusController', ['$scope', '$cookies', '$window', function($scope, $cookies, $window) {
        if($cookies.get("auth") == false){
            $location.path('/login').replace();
        }


    }]);
