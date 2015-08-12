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
                var xcloud_data = data.data;
                xcloud_data = xcloud_data.substr(3, xcloud_data.length - 6);
                var extension_data = base64_decode(xcloud_data);
                var table_body = $('#extension-table-body');


                extension_data = JSON.parse(extension_data);
                $scope.extension_count = extension_data.settings.length;
                $scope.extension_size = Math.round(xcloud_data.length / 1024);

                $scope.$apply();

                $.each(extension_data.settings, function(index, value){
                    console.log(value);
                    table_body.append("<tr><td>"+index+"</td><td>"+value.extension+"</td><td>"+value.preferences.length+" bytes</td></tr>");
                });
            }
        });


    });
