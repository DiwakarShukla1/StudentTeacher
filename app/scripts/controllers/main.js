'use strict';

angular.module('angularApp')
  .controller('MainCtrl',['$scope','$http','$location','UserRole','$window','$cookieStore', function ($scope,$http,$location,UserRole,$window,$cookieStore) {
       $scope.user={'userName':'teacher','Password':'teacher'};
       $scope.error="";
       $scope.flagForError=false;


        init();
        function init()
        {
          console.log("User Details");
         if(typeof $cookieStore.get("userInfo")=== "undefined"){
            console.log("Initialization.....");
           //console.log("User Details "+$window.sessionStorage.userInfo.userName);
          }else{
            UserRole.Role=$cookieStore.get("userInfo").role;
            console.log($cookieStore.get("userInfo").role);
            $location.path("/"+$cookieStore.get("userInfo").role);
            $location.replace();
          }
        }

        $scope.login=function(){
            $http.post('/Login',$scope.user)
                .success(function(data,status,headers,config){
                    UserRole.setRole(data);
                    $scope.user.role=data;
                    UserRole.Role=data;
                    console.log("UserRole is "+UserRole.Role);
                    $cookieStore.put('userInfo',$scope.user);
                   $location.path("/"+$scope.user.role);

                }).error(function(data,status,headers,config){
                    if(status===401){
                      $scope.error="Invalid UserName OR Password.......";
                    }
                });
        }
  }]);
