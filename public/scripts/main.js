angular.module('myApp',['ngRoute']).config(['$routeProvider',function($routeProvider) {

    $routeProvider
        .when('/', {
        templateUrl : 'views/login.html',
        controller  : 'loginController'
    })
        .when('/main', {
        templateUrl : 'views/main.html',
        controller  : 'mainController'
    })
        .when('/project', {
        templateUrl : 'views/project.html',
        controller  : 'projectController'
    })
        .otherwise({
        redirectTo:'/'
    });
}]);