/**
 * Created by samphal on 10/3/14.
 */
'use strict';

angular.module('angularApp')
    .controller('TeacherCtrl',['$scope','$http','$location', 'UserRole','socket','$window','$cookieStore',function ($scope,$http,$location,UserRole,socket,$window,$cookieStore) {
        $scope.userName="";
        $scope.question="";
        $scope.questions=[[{ques:'What is Your Name ?',opt1:'Sachin',opt2:'Dravid',opt3:'Sahrukh',opt4:'Mahesh',correct:'Mahesh',time:"20"},{ques:'2+2 ?',opt1:'4',opt2:'8',opt3:'5',opt4:'6',correct:'4',time:"9"}],[{ques:'2*2 ?',opt1:'4',opt2:'8',opt3:'5',opt4:'6',correct:'4',time:"15"}]];
        $scope.sets=["Math",'Science'];
        $scope.setName="";
        $scope.flag=true;
        $scope.quesSet={};
        $scope.arr=[];

        init();
        function init()
        {
            console.log("User Name "+ JSON.stringify($cookieStore.get('userInfo')));
            if(!(UserRole.Role==="teacher")){
                $location.path("/invalid");
                $location.replace();
            }else{
                $scope.userName=$cookieStore.get("userInfo").userName;
            }
        }

        $scope.addQuestion=function(key)
        {
           console.log(key);
            $scope.arr[key]=true;
            $scope.quesSet={};
        }

        $scope.publishQuestion=function(key)
        {
            console.log($scope.questions[key]);
            socket.emit("publishToAll",$scope.questions[key]);
        }


        $scope.logout=function(){
//            window.alert("chal bye");
            $http.get('/Logout')
                .success(function(data,status,headers,config){
                    console.log("logout");
                    console.log(UserRole.Role);
                    UserRole.setRole("");
                    $cookieStore.remove("userInfo");
                    $location.path("/login");
                    $location.replace();

                }).error(function(data,status,headers,config){
                    console.log(status);
                });

        }

        $scope.saveSetName=function(){
            $scope.sets.push($scope.setName);
            $scope.setName="";
            var a=[];
            $scope.questions.push(a);
            $scope.flag=true;
        }

        $scope.createNewSet=function()
        {
            $scope.flag=false;
        }

        $scope.saveQuestions=function(key){
            $scope.questions[key].push($scope.quesSet);
            $scope.arr[key]=false;
        }
    }]);
