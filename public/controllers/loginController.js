angular.module('myApp').controller('loginController', ['$scope', '$rootScope','$http', '$anchorScroll', '$location', 'projectService', 'userService', 'customerService', 'loginService', 'dataPass', function($scope, $rootScope, $http, $anchorScroll, $location, projectService, userService, customerService, loginService, dataPass) {
    $scope.user = {};
    var login = loginService;

    $scope.loginAttempt = function() {
        login.authenticate($scope.user);
    }
}]);