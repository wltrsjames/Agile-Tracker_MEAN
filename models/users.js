var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
    FirstName:{
        type: String,
        required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Email:{
        type: String,
        required: true
    },
    Password:{
        type: String,
        required: false
    },
    UserLevel:{
        type: Number,
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    }
});

var Users = module.exports = mongoose.model('Users', usersSchema);

module.exports.getUsers = function(callback, limit) {
    Users.find(callback).limit(limit);   
}

module.exports.login = function(userEmail, password, callback) {
    Users.findOne({Email:userEmail, Password:password}, callback);   
}

module.exports.addUser = function(userObject, callback) {
    Users.create(userObject, callback);
}

module.exports.updateUser = function(id, userObject, callback) {
    Users.update({'_id': id}, userObject, callback);
}

module.exports.clearAll = function(callback) {
    Users.remove(callback);
}
