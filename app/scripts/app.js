'use strict';

angular.module('angularApp', [
  'ngResource',
  'ui.bootstrap',
  'ngRoute',
  'ngCookies'
]).factory('socket', function ($rootScope) {
    var socket = io.connect("http://192.168.0.100:9001");
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
}).config(['$routeProvider',function ($routeProvider) {
    $routeProvider
       .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'MainCtrl'
       })
        .when('/',{
            redirectTo: '/login'
        })
        .when('/teacher',{
            templateUrl: 'views/teacher.html',
            controller:'TeacherCtrl'
        })
        .when('/student',{
            templateUrl: 'views/student.html',
            controller:'StudentCtrl'
        })
        .when('/invalid',{
            templateUrl: 'views/invalid.html'
        })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
