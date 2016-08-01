var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    CustomerName:{
        type: String,
        required: true
    },
    CompanyName:{
        type: String,
        required: true
    },
    CompanyAddress:{
        type: String,
        required: true
    },
    CompanyPostcode:{
        type: String,
        required: true
    },
    CompanyPhone:{
        type: String,
        required: true
    },
    Mobile:{
        type: String,
        required: true
    },
    CompanyPhone:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
     createDate:{
        type: Date,
        default: Date.now
    }
});

var Customers = module.exports = mongoose.model('Customers', customerSchema);

module.exports.getCustomers = function(callback,limit) {
    Customers.find(callback).limit(limit);
}

module.exports.updateCustomer = function(id, custObject, callback) {
    Customers.update({'_id': id}, custObject, callback);
}

module.exports.addCustomer = function(customerObject, callback) {
    Customers.create(customerObject, callback);
}

module.exports.getCustomer = function(callback) {
    Customers.find(callback);
}

module.exports.clearAll = function(callback) {
    Customers.remove(callback);
}