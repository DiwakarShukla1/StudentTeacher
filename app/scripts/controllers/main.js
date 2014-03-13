'use strict';

angular.module('angularApp')
  .controller('MainCtrl',['$scope','$http','$location','UserRole', function ($scope,$http,$location,UserRole) {
       $scope.user={'userName':'teacher','Password':'teacher'};

        init();
        function init()
        {
        }

        $scope.login=function(){
            $http.post('/Login',$scope.user)
                .success(function(data,status,headers,config){
                    UserRole.setRole(data);
                   $location.path("/"+data);

                }).error(function(data,status,headers,config){
                    console.log(status);
                });

        }
  }]);
