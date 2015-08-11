'use strict';

// Declare app level module which depends on views, and components
angular.module('xcloud', [
    'ngRoute',
    'ngStorage',
    'xcloud.login',
    'xcloud.home',
    'xcloud.status'
]).
    config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true).hashPrefix('!');

    }]);
