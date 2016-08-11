var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");


    var refresh = function() {
        $http.get("/datalist").success(function(response) {
            console.log("I got the data I requested");
            $scope.datalist = response;
            $scope.data = "";
        });
    };

    refresh();

    $scope.addOrder = function() {
        console.log($scope.data);
        $http.post("/datalist", $scope.data).success(function(response) {
            console.log(response);
            refresh();
        });
    };


    $scope.addDriver = function() {
        console.log($scope.data);
        $http.post("/datalist", $scope.data).success(function(response){
            console.log(response);
            refresh();
        })
    }

    $scope.remove = function(id) {
        console.log(id);
        $http.delete("/datalist/" + id).success(function(response) {
            refresh();
        });
    };

    $scope.edit = function(id) {
        console.log(id);
        $http.get("/datalist/" + id).success(function(response) {
            $scope.data = response;
        });
    };

    $scope.update = function() {
        console.log($scope.data._id);
        $http.put("/datalist/" + $scope.data._id, $scope.data).success(function(response) {
            refresh();
        });
    };


    $scope.deselect = function() {
        $scope.data = "";
    };

}]);
