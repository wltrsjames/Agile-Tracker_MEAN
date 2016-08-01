angular.module('myApp').factory('projectService', ['$http', function($http){
    var project = {};

    project.getAll = function(callback) {
        $http.get('http://localhost:3000/projects').success(function(projects) {
            callback(projects);
        });   
    };

    project.update = function(projectData, callback) {
        $http.post('http://localhost:3000/updateproject', projectData).success(function(info) {
            callback(info);
        });
    };

    project.addproject = function(projectData, callback) {
        $http.post('http://localhost:3000/addproject', projectData).success(function(info) {
            callback(info);
        });
    };    

    project.addmilestone = function(projectData, callback) {
        $http.post('http://localhost:3000/addmilestone', projectData).success(function(info) {
            callback(info);
        });
    };
    
    project.adduserstory = function(projectData, callback) {
        $http.post('http://localhost:3000/adduserstory', projectData).success(function(info) {
            callback(info);
        });
    };
    project.getProjectById = function(id, callback) {
        $http.post('http://localhost:3000/projectbyid', id).success(function(info) {
            callback(info);
        });
    };    

    project.updateMilestone = function(mileObj, callback) {
        $http.post('http://localhost:3000/updatemilestone', mileObj).success(function(info) {
            callback(info);
        });
    };
    
    project.updateStory = function(storyObj, callback) {
        $http.post('http://localhost:3000/updateuserstory', storyObj).success(function(info) {
            callback(info);
        });
    };

    return project;
}]);