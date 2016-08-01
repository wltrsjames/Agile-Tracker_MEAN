angular.module('myApp').factory('loginService', ['$http', '$location', function($http, $location){
    var login = {};
    login.loggedin = false;
    login.userAccess = 1;

    login.authenticate = function(loginObj) {
        $http.post('http://localhost:3000/login', loginObj).success(function(user) {
            if(user._id) {
                login.loggedin = true;
                console.log(user);
                login.userAccess = user.UserLevel;
                login.userName = user.FirstName + " " + user.LastName;
                
                $location.path('/main');
            }

        });  
    }

    return login;
}]);