'use strict';


angular.module('xcloud.status', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/status', {
            templateUrl: '/status/status.html',
            controller: 'StatusController'
        });
    }])

    .controller('StatusController', function($scope, $location) {
        if(localStorage.getItem("auth") === null){
            $location.path('/login').replace();
            return;
        }



        var auth = localStorage.getItem("auth");
        console.log(auth);
        $.ajax({
            type: "GET",
            url: "/xcloud/fetch",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", auth);
            },
            success: function(data){
                console.log(data);
            }
        });


    });
