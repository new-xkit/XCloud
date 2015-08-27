'use strict';

// Declare app level module which depends on views, and components
angular.module('xcloud', [
    'ngRoute',
    'ngStorage',
    'xcloud.login',
    'xcloud.home',
    'xcloud.status',
    'xcloud.migration'
])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});


    }])
    .value("config", {xcloud_url: "https://cloud.new-xkit.com"});
