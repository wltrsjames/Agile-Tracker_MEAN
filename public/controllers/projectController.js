angular.module('myApp').controller('projectController', ['$scope','$http', '$location', 'projectService', 'customerService', 'userService','loginService','dataPass', function($scope, $http, $location, projectService, customerService, userService, loginService, dataPass) {
    var login = loginService;
    if(login.loggedin === true) {
        if(login.userAccess == 1) {
            $scope.fullAccess = false;   
        }else if(login.userAccess == 2) {
            $scope.fullAccess = true;
        }
        $scope.editMode = false;
        $scope.addMileMode = false;
        $scope.addStoryMode = false;

        $scope.editMileMode = false;
        $scope.editStoryMode = false;

        $scope.newMile = {};
        $scope.newStory = {};

        var project = projectService;
        var customer = customerService;
        var user = userService;

        customer.getAll(function(customerData) {
            $scope.customers = customerData;
        });

        user.getAll(function(userData) {
            $scope.users = userData;
        });

        $scope.project = dataPass.getProperty();
        console.log($scope.project);
        if($scope.project == "" ) {
            $location.path('/main');
        }else{
        }
        $scope.editProject = function() {
            $scope.editMode = true;
        };

        $scope.saveProject = function() {
            project.update($scope.project, function(info) {
                $location.path('/main');
            });
        };

        $scope.addMile = function() {
            $scope.addMileMode = true;
        };

        $scope.addMileSave = function() {
            $scope.newMile.projId = $scope.project._id;

            project.addmilestone($scope.newMile, function(info) {

                updateProject();
            });
        }

        $scope.addStorySave = function() {
            $scope.newStory.projId = $scope.project._id;

            project.adduserstory($scope.newStory, function(info) {

                updateProject();
            });
        }

        $scope.addStory = function() {
            $scope.addStoryMode = true;
        };


        $scope.mileEdit = function(index) {
            $scope.mileToEdit = index;
            $scope.editMileMode = true;
        }

        $scope.thisMileCheck = function(index) {
            if (index == $scope.mileToEdit) {
                return true;
            }
        }

        $scope.storyEdit = function(index) {
            $scope.storyToEdit = index;
            $scope.editStoryMode = true;
        }

        $scope.thisStoryCheck = function(index) {
            if (index == $scope.storyToEdit) {
                return true;
            }
        }

        $scope.saveEditMile = function(index, id) {
            var userObj = {
                projectId : $scope.project._id,
                _id: id,
                MilestoneDescription : document.getElementById('MilestoneDescription'+index).value,
                EstimatedHours : document.getElementById('EstimatedHours'+index).value,
                HoursSpent : document.getElementById('HoursSpent'+index).value,
                Status : document.getElementById('Status'+index).value

            };
            project.updateMilestone(userObj, function(data) {
                updateProject();
            });

        }

        $scope.saveEditStory = function(index, id) {
            var userObj = {
                projectId : $scope.project._id,
                _id: id,
                Request : document.getElementById('Request'+index).value,
                UserRole : document.getElementById('UserRole'+index).value,
                Purpose : document.getElementById('Purpose'+index).value,
                AcceptanceCriteria : document.getElementById('AcceptanceCriteria'+index).value,
                MVP : document.getElementById('MVP'+index).checked

            };
            project.updateStory(userObj, function(data) {
                updateProject();
            });

        }

        $scope.back = function() {
            $location.path('/main');   
        }

        function updateProject() {
            project.getProjectById($scope.project, function(thisproject) {
                $scope.project = thisproject[0];
                $scope.addMileMode = false;
                $scope.addStoryMode = false;
                $scope.editMileMode = false
                $scope.editStoryMode = false
            });   
        }
    }else{
        $location.path('/'); 
    }
}]);