angular.module('myApp').service('dataPass', [function(){
    var property = '';

    return {
        getProperty: function () {
            return property;
        },
        setProperty: function(value) {
            property = value;
        }
    };
}]);