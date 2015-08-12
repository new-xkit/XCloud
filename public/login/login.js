'use strict';


angular.module('xcloud.login', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: '/login/login.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', ['$scope', '$window', function($scope, $window) {
        //localStorage.removeItem("auth");
        $scope.user =  {username: "", password:"", password_confirm: ""};

        $scope.xc_code = "";
        $scope.error_message = "";

        $scope.login = function(){
            $scope.xc_code = "";
            var auth = "Basic " + btoa($scope.user.username + ":" + md5($scope.user.password));

            if(! $scope.validate(true)){
                return;
            }

            $.ajax({
                type: "GET",
                url: "/xcloud/auth",
                beforeSend: function (xhr) {
                    xhr.setRequestHeader ("Authorization", auth);
                },
                success: function(data){
                    console.log(data);
                    if(data.errors == "false"){
                        localStorage.setItem("auth", auth);
                        localStorage.setItem("username", $scope.user.username);
                        $window.location.href = "/";
                    }
                    else {
                        $scope.xc_code = data.error_code;
                        $scope.$apply();
                    }
                }
            });
        };


        $scope.register = function(){
            $scope.xc_code = "";

            if(! $scope.validate(false)){
                return;
            }

            var auth = "Basic " + btoa($scope.user.username + ":" + md5($scope.user.password));
            $.ajax({
                type: "POST",
                url: "/xcloud/register",
                data: {"username":$scope.user.username,"password":md5($scope.user.password)},
                success: function(data){
                    console.log(data);
                    if(data.errors == "false"){
                        localStorage.setItem("auth", auth);
                        localStorage.setItem("username", $scope.user.username);
                        $window.location.href = "/";
                    }
                    else {
                        $scope.xc_code = data.error_code;
                        $scope.$apply();
                    }
                }
            });
        };

        $scope.validate = function(isLogin){

            if($scope.user.password !== $scope.user.password_confirm && ! isLogin){
                $scope.xc_code = '000';
                $scope.error_message = "Sorry, your passwords do not match.";
                return false;
            }

            if($scope.user.password.length === 0){
                $scope.xc_code = '000';
                $scope.error_message = "Please enter a password.";
                return false;
            }

            if($scope.user.password.length <= 5){
                $scope.xc_code = '000';
                $scope.error_message = "Please enter a password atleast 6 characters long.";
                return false;
            }

            if($scope.user.username === 0){
                $scope.xc_code = '000';
                $scope.error_message = "Please enter a username.";
                return false;
            }

            return true;
        };




        $(function() {
            $('#login-form-link').click(function(e) {
                $("#login-form").delay(100).fadeIn(100);
                $("#register-form").fadeOut(100);
                $('#register-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });
            $('#register-form-link').click(function(e) {
                $("#register-form").delay(100).fadeIn(100);
                $("#login-form").fadeOut(100);
                $('#login-form-link').removeClass('active');
                $(this).addClass('active');
                e.preventDefault();
            });

        });

    }]);
