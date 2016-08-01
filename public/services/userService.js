angular.module('myApp').factory('userService', ['$http', function($http){
    var user = {};

    user.getAll = function(callback) {
        $http.get('http://localhost:3000/users').success(function(users) {
            callback(users);
        });   
    };

    user.update = function(userData, callback) {
        $http.post('http://localhost:3000/updateuser', userData).success(function(info) {
            callback(info);
        });
    };
    user.addUser = function(userObj, callback) {
        $http.post('http://localhost:3000/adduser', userObj).success(function(info) {
            callback(info);
        });   
    };

    return user;
}]);