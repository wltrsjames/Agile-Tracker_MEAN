angular.module('myApp').controller('userController', ['$scope', '$rootScope','$http', '$location', 'projectService', 'customerService', 'userService','loginService','dataPass', function($scope, $rootScope, $http, $location, projectService, customerService, userService, loginService, dataPass) {
    $rootScope.user = "";
    $rootScope.showUser = false;
    $scope.logout = function() {
        location.reload();
    }
}]);