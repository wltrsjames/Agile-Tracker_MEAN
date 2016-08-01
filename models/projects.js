var mongoose = require('mongoose');

var MilestoneSchema = mongoose.Schema({
    MilestoneDescription:{
        type: String,
        required: true
    },
    EstimatedHours:{
        type: Number,
        required: true
    },
    Status:{
        type: Number,
        required: true
    },
    HoursSpent:{
        type: Number,
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    }
});

var UserStories = mongoose.Schema({
    UserRole:{
        type: String,
        required: true
    },
    Request:{
        type: String,
        required: true
    },
    Purpose:{
        type: String,
        required: true
    },
    AcceptanceCriteria:{
        type: String,
        required: true
    },
    MVP:{
        type: Boolean,
        required: true
    },
    createDate:{
        type: Date,
        default: Date.now
    }
});

var projectSchema = mongoose.Schema({
    ProjectName:{
        type: String,
        required: true
    },
    Definition:{
        type: String,
        required: true
    },
    Outline:{
        type: String,
        required: true
    },
    Customer:{
        type: String
    },
    Owner:{
        type: String
    },
    CreateDate:{
        type: Date,
        default: Date.now
    },
    Milestones: [MilestoneSchema],
    UserStories: [UserStories]
});

var Projects = module.exports = mongoose.model('Projects', projectSchema);

 //create
module.exports.addProject = function(projectObject, callback) {
    Projects.create(projectObject, callback);
}

// get
module.exports.getProjects = function(callback,limit) {
    Projects.find(callback).limit(limit);
}

module.exports.getProjectById = function(projectId, callback) {
    Projects.find({'_id': projectId}, callback);   
}

module.exports.getProjectByName = function(projectName, callback) {
    Projects.find({'ProjectName': projectName}, callback);   
}

// delete all
module.exports.clearAll = function(callback) {
    Projects.remove(callback);
}

module.exports.deleteProject = function(id, callback) {
    Projects.remove({'_id': id}, callback);
}

module.exports.updateProject = function(id, projectObject, callback) {
    Projects.update({'_id': id}, projectObject, callback);
}

// milestone
module.exports.addMilestone = function(id, milestone, callback) {
    Projects.findByIdAndUpdate(id, {$push: {Milestones:milestone}},{upsert:true}, callback);
}

module.exports.updateMilestoneById = function(projectId, milestoneId, milestoneObj, callback) {
    //Projects.findByIdAndUpdate(projectId,{$set: {"Milestones.$.:{'_id': milestoneId}}},milestoneObj, callback);
    Projects.findOneAndUpdate({"_id":projectId, "Milestones._id":milestoneId}, {$set:{ 
        "Milestones.$._id":milestoneObj._id,
        "Milestones.$.MilestoneDescription":milestoneObj.MilestoneDescription,
        "Milestones.$.EstimatedHours":milestoneObj.EstimatedHours,    
        "Milestones.$.Status":milestoneObj.Status,
        "Milestones.$.HoursSpent":milestoneObj.HoursSpent,
        "Milestones.$.CreateDate":milestoneObj.CreateDate
    }}, callback); 
}

module.exports.updateUserStoryById = function(projectId, storyId, storyObj, callback) {
    //Projects.findByIdAndUpdate(projectId,{$set: {"Milestones.$.:{'_id': milestoneId}}},milestoneObj, callback);
    Projects.findOneAndUpdate({"_id":projectId, "UserStories._id":storyId}, {$set:{ 
        "UserStories.$._id":storyObj._id,
        "UserStories.$.UserRole":storyObj.UserRole,
        "UserStories.$.Request":storyObj.Request,    
        "UserStories.$.Purpose":storyObj.Purpose,
        "UserStories.$.AcceptanceCriteria":storyObj.AcceptanceCriteria,
        "UserStories.$.MVP":storyObj.MVP,
        "UserStories.$.CreateDate":storyObj.CreateDate
    }}, callback); 
}

module.exports.deleteMilestoneById = function(projectId, milestoneId, callback) {
    Projects.findByIdAndUpdate(projectId,{$pull: {Milestones:{'_id': milestoneId}}}, callback);
}

// user story
module.exports.addUserStory = function(id, userStory, callback) {
    Projects.findByIdAndUpdate(id, {$push: {UserStories:userStory}},{upsert:true}, callback);
}

module.exports.removeUserStory = function(projectId, userStoryId, callback) {
    Projects.findByIdAndUpdate(projectId,{$pull: {UserStories:{'_id': userStoryId}}}, callback);
}