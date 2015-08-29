'use strict';


angular.module('xcloud.status', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/status', {
            templateUrl: '/status/status.html',
            controller: 'StatusController'
        });
    }])

    .controller('StatusController', function($scope, $location, config) {
        if(localStorage.getItem("auth") === null){
            $location.path('/login').replace();
            return;
        }

        $scope.user_preferences = "";
        $scope.loading = true;
        console.log(config);

        var auth = localStorage.getItem("auth");
        console.log(auth);
        $.ajax({
            type: "GET",
            url: config.xcloud_url + "/xcloud/fetch",
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", auth);
            },
            success: function(data){
                $scope.loading = false;
                if(data.errors === "true"){
                    $scope.error_message = "Could not fetch your extensions from the server.  Have you uploaded your extensions?";
                    console.log("We have errors.");
                    $scope.$apply();
                    return;
                }

                var xcloud_data = data.data;

                $scope.user_preferences = xcloud_data;

                xcloud_data = xcloud_data.substr(3, xcloud_data.length - 6);
                var extension_data = base64_decode(xcloud_data);
                var table_body = $('#extension-table-body');

                extension_data = JSON.parse(extension_data);
                $scope.extension_count = extension_data.settings.length;
                $scope.extension_size = Math.round(xcloud_data.length / 1024);

                $scope.$apply();


                table_body.html('');
                $.each(extension_data.settings, function(index, value){
                    console.log(value);

                    var extension_inner_data = base64_decode(value.preferences);
                    var valid_json = false;

                    console.log(extension_inner_data);

                    try{
                        var obj = JSON.parse(extension_inner_data);
                        if (obj && typeof obj === "object" && obj != null){
                            valid_json = true;
                        }
                    } catch (e) {}

                    var message = "";
                    var row_class = "";
                    if(! valid_json){
                        message = "Unable not validate this extension.";
                        row_class = 'class="danger"';
                    }

                    table_body.append(
                        "<tr " + row_class + ">" +
                            "<td>"+index+"</td>" +
                            "<td>"+value.extension+"</td>" +
                            "<td>"+value.preferences.length+" bytes</td>" +
                            "<td>" + message + "</td>"+
                        "</tr>");
                    });
                }
            });


        $scope.downloadPreferences = function(){
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent($scope.user_preferences));
            element.setAttribute('download', "xcloud_preferences.txt");

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }


    });
