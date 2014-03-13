'use strict';

angular.module('angularApp', [
  'ngResource',
  'ui.bootstrap',
  'ngRoute'
]).factory('socket', function ($rootScope) {
//        var io=new
    var socket = io.connect("http://192.168.0.104:9001");
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
            templateUrl: 'views/main.html'
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
        redirectTo: '/'
      });
  }]);
