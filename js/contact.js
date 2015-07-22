/*
 * Nam Pham Photography Website
 * Contact Page JS
 */

// Set up and sync app and controller 
var myApp = angular.module('myApp', [])
myApp.controller('myCtrl', function($scope){
  $scope.master = {}
  $scope.user = {}
  $scope.class = "glyphicon-send";
  $scope.sent = false;
  $scope.submit = function() {
  	$scope.class = "glyphicon-ok";
  	$scope.sent = true;
  };
  $scope.reset = function() {
    $scope.user = angular.copy($scope.master);
    if ($scope.form) $scope.form.$setPristine();
  };
})

