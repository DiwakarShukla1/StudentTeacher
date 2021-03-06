/**
 * Created by samphal on 10/3/14.
 */
'use strict';

angular.module('angularApp')
    .controller('StudentCtrl',['$scope','$http','$location','UserRole','socket','$cookieStore',function ($scope,$http,$location,UserRole,socket,$cookieStore) {
        $scope.msg="";
        $scope.quesSet=[];
        $scope.result={correct:0,incorrect:0};
        $scope.flag=false;
        $scope.key=-1;
        $scope.buttonText="Next";
        $scope.timeRemains=0;
        $scope.timer_is_on=0;
        $scope.time;

        init();
        function init()
        {
           console.log("User Name "+ JSON.stringify($cookieStore.get('userInfo')));
            if(typeof $cookieStore.get("userInfo") !=="undefined" && $cookieStore.get("userInfo").role==="student"){
                $scope.userName=$cookieStore.get("userInfo").userName;
            }else{
                console.log("Dkk......");
                $location.path("/login");
                $location.replace();
            }
            socket.emit("takeQuestion","Please Give Me");
//            socket.emit("first","Hello");
        }

        socket.on("published",function(msg){
            console.log("ja Re Ja.....");
            $scope.quesSet=msg;
            $scope.key=0;
        });


        $scope.logout=function(){
            $http.get('/Logout')
                .success(function(data,status,headers,config){
                    console.log("logout");
                    $cookieStore.remove("userInfo");
                    $location.path("/login");
                    $location.replace();

                }).error(function(data,status,headers,config){
                    console.log(status);
                });
        }

        $scope.startQuiz=function(){
            if($scope.key<0){
                window.alert("There is No Question TO Show");
            }else{
            $scope.flag=true;
            $scope.key=0;
            $scope.startCount();
            }
        }

        $scope.startCount=function(){
            $scope.timeRemains=$scope.quesSet[$scope.key].time;
            window.alert($scope.timeRemains);
            if(!$scope.timer_is_on){
                $scope.timer_is_on=1;
                $scope.timedCount();
            }
        }

        $scope.timedCount=function(){
            $scope.timeRemains--;
            $scope.$apply;
            $scope.time=setTimeout(function(){$scope.timedCount()},1000);
            if($scope.timeRemains==0){
                $scope.next();
            }
        }

        $scope.stopCount=function(){
            clearTimeout($scope.time);
            $scope.timer_is_on=0;
        }

       $scope.generateResult=function(){
            angular.forEach($scope.quesSet,function(value,key){
                if(value.Ans==value.correct){
                    $scope.result.correct++;
                }else{
                    $scope.result.incorrect++;
                }
            });
            window.alert("Result--- Correct :"+$scope.result.correct+", Incorrect : "+$scope.result.incorrect);
        }

        $scope.next=function(){
            $scope.stopCount();
            $scope.key++;
            if($scope.key==$scope.quesSet.length){
                $scope.flag=false;
                $scope.key=-1;
                $scope.generateResult();
                $scope.quesSet=[];
                return;
            }
            if($scope.key==$scope.quesSet.length-1){
                $scope.buttonText="Finish";
            }
            $scope.startCount();
        }

    }]);
