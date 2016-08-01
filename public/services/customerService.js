angular.module('myApp').factory('customerService', ['$http', function($http){
    var customer = {};

    customer.getAll = function(callback) {
        $http.get('http://localhost:3000/customers').success(function(customers) {
            callback(customers);
        });   
    };

    customer.addCustomer = function(custObj, callback) {
        $http.post('http://localhost:3000/addcustomer', custObj).success(function(info) {
            callback(info);
        });   
    };

    customer.update = function(custData, callback) {
        $http.post('http://localhost:3000/updatecustomer', custData).success(function(info) {
            callback(info);
        });
    };

    return customer;
}]);