angular.module('angularApp').
    controller("Ctrl",function Ctrl($scope) {
        $scope.items = ['settings', 'home', 'other'];
        $scope.selection = $scope.items[0];
    });


