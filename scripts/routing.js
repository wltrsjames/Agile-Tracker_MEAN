module.exports.getRoutes = function(app, Projects, Users, Customers) {
    //get all
    app.get('/projects', function(req, res){
        Projects.getProjects(function(err,data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });
    });
    app.post('/projectbyid', function(req, res){
        var projId = req.body;
        Projects.getProjectById(projId, function(err,data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });
    });

    app.get('/users', function(req, res){
        Users.getUsers(function(err,data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });
    });
    app.get('/customers', function(req, res){
        Customers.getCustomers(function(err,data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });
    });

    //add
    app.post('/addproject', function(req, res) {
        var projectObj = req.body;
        Projects.addProject(projectObj, function(err, data) {
            if(err) {
                console.log(err);    
            }
            res.send(data);
        });

    });

    app.post('/adduser', function(req, res) {
        var userObj = req.body;
        Users.addUser(userObj, function(err, data) {
            if(err) {
                console.log(err);    
            }
            res.send(data);
        });

    });

    app.post('/addcustomer', function(req, res) {
        var custObj = req.body;
        Customers.addCustomer(custObj, function(err, data) {
            if(err) {
                console.log(err);    
            }
            res.send(data);
        });

    });

    app.post('/addcustomer', function(req, res) {
        var custObj = req.body;
        Customers.addCustomer(custObj, function(err, data) {
            if(err) {
                console.log(err);    
            }
            res.send(data);
        });

    });

    app.post('/addmilestone', function(req, res) {
        var mileObj = req.body;
        Projects.addMilestone(mileObj.projId, mileObj, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });

    app.post('/adduserstory', function(req, res) {
        var userObj = req.body;
        Projects.addUserStory(userObj.projId, userObj, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });
    //update
    app.post('/updateproject', function(req, res) {
        var projObj = req.body;
        Projects.updateProject(projObj._id, projObj, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });

    app.post('/updateuser', function(req, res) {
        var userObj = req.body;
        Users.updateUser(userObj._id, userObj, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });

    app.post('/updatecustomer', function(req, res) {
        var custObj = req.body;
        Customers.updateCustomer(custObj._id, custObj, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });

    app.post('/updatemilestone', function(req, res) {
        var mileObj = req.body;
        Projects.updateMilestoneById(mileObj.projectId, mileObj._id, mileObj, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });

    app.post('/updateuserstory', function(req, res) {
        var storyObj = req.body;
        Projects.updateUserStoryById(storyObj.projectId, storyObj._id, storyObj, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });

    app.post('/login', function(req, res) {
        var loginObj = req.body;
        Users.login(loginObj.email, loginObj.password, function(err, data) {
            if(err) {
                console.log(data);    
            }
            res.send(data);
        });

    });

}

