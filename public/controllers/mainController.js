angular.module('myApp').controller('mainController', ['$scope', '$rootScope','$http', '$anchorScroll', '$location', 'projectService', 'userService', 'customerService', 'loginService', 'dataPass', function($scope, $rootScope, $http, $anchorScroll, $location, projectService, userService, customerService, loginService, dataPass) {
    var login = loginService;

    if(login.loggedin === true) {
        if(login.userAccess == 1) {
            $scope.fullAccess = false;   
        }else if(login.userAccess == 2) {
            $scope.fullAccess = true;
        }
        
        $rootScope.user = login.userName;
        $rootScope.showUser = true;

        $scope.addProjectMode = false;
        $scope.addUserMode = false;
        $scope.addCustomerMode = false;

        $scope.editUserMode = false;
        $scope.editCustMode = false;

        $scope.newProject = {};
        $scope.newUser = {};
        $scope.newCustomer = {};

        $scope.thisUserEdit = {
            customfields: {
                "FirstName": "",
                "LastName": ""
            }
        };

        //get Data
        var Project = projectService;
        Project.getAll(function(allProjects) {
            $scope.projects = allProjects;
        });

        var User = userService;
        User.getAll(function(allUsers) {
            console.log(allUsers);
            $scope.users = allUsers;
        });

        var Customer = customerService;
        Customer.getAll(function(allCustomers) {
            $scope.customers = allCustomers;
        });

        //handle click events
        $scope.thisProject = function(index) {
            var thisProject = $scope.projects[index]; 
            dataPass.setProperty(thisProject);
            $location.path('/project');
        }

        $scope.addProject = function() {
            $scope.addProjectMode = true;
        };

        $scope.addProjectSave = function() {
            Project.addproject($scope.newProject, function(data) {
                Project.getAll(function(allProjects) {
                    $scope.projects = allProjects;
                    $scope.addProjectMode = false;
                    $scope.newProject = {};
                    
                });
            });
        };

        $scope.addUser = function() {
            $scope.addUserMode = true;
        };

        $scope.addUserSave = function() {
            if(!$scope.newUser.UserLevel) {
                $scope.newUser.UserLevel = 1;
            }
            User.addUser($scope.newUser, function(data) {
                User.getAll(function(allUsers) {
                    $scope.users = allUsers;
                    $scope.addUserMode = false;
                    $scope.newUser = {};
                });
            });
        };

        $scope.addCustomer = function() {
            $scope.addCustomerMode = true;
        };

        $scope.addCustomerSave = function() {
            Customer.addCustomer($scope.newCustomer, function(data) {
                Customer.getAll(function(allCust) {
                    $scope.customers = allCust;
                    $scope.addCustomerMode = false;
                    $scope.newCustomer = {};
                });
            });
        };

        $scope.userEdit = function(index) {

            $scope.userToEdit = index;
            $scope.editUserMode = true;
        };

        $scope.thisUserCheck = function(index) {
            if (index == $scope.userToEdit) {
                return true;
            }
        }

        $scope.custEdit = function(index) {

            $scope.custToEdit = index;
            $scope.editCustMode = true;
        }

        $scope.thisCustCheck = function(index) {
            if (index == $scope.custToEdit) {
                return true;
            }
        }


        $scope.saveEditUser = function(index, id) {
            var userObj = {
                _id: id,
                FirstName : document.getElementById('FirstName'+index).value,
                LastName : document.getElementById('LastName'+index).value,
                Email : document.getElementById('Email'+index).value,
                UserLevel : document.getElementById('UserLevel'+index).value

            };
            if(userObj.UserLevel == "") {
                userObj.UserLevel = 1;
            }
            User.update(userObj, function(info) {
                User.getAll(function(users) {
                    $scope.users = users;
                    $scope.editUserMode = false;
                });
            });
        }
        $scope.saveEditCust = function(index, id) {
            var custObj = {
                _id: id,
                CustomerName : document.getElementById('CustomerName'+index).value,
                Email : document.getElementById('Email'+index).value,
                Mobile : document.getElementById('Mobile'+index).value,
                CompanyName : document.getElementById('CompanyName'+index).value,
                CompanyPhone : document.getElementById('CompanyPhone'+index).value,
                CompanyAddress : document.getElementById('CompanyAddress'+index).value,
                CompanyPostcode : document.getElementById('CompanyPostcode'+index).value
            };
            Customer.update(custObj, function(info) {
                Customer.getAll(function(customers) {
                    $scope.customers = customers;
                    $scope.editCustMode = false;
                });
            });
        }
    }else{
        $location.path('/');
    }
}]);