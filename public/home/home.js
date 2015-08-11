'use strict';

angular.module('xcloud.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/', {
        templateUrl: '/home/home.html',
        controller: 'HomerController'
      });
    }])

    .controller('HomerController', [function() {

    }]);