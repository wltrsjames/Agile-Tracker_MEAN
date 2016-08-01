module.exports.addtestData = function(Users, Projects, Customers) {

    function addUser(FirstName, LastName, Email, Password, UserLevel) {
        var userObj = {
            FirstName:FirstName,
            LastName:LastName,
            Email:Email,
            Password:Password,
            UserLevel:UserLevel
        };

        Users.addUser(userObj, function(err, data) {
            //        console.log(data);
        });
    }

    function addProject(ProjectName, Definition, Outline, callback) {
        var projectObj = {
            ProjectName:ProjectName,
            Definition:Definition,
            Outline:Outline
        };

        Projects.addProject(projectObj, function() {
            Projects.getProjectByName(ProjectName, function(err,data) {
                callback(data[0]._id);
            });
        });
    }

    function addCustomer(CustomerName, CompanyName, CompanyAddress, CompanyPostcode, CompanyPhone, Mobile, Email) {
        var customerObj = {
            CustomerName:CustomerName,
            CompanyName:CompanyName,
            CompanyAddress: CompanyAddress,
            CompanyPostcode: CompanyPostcode,
            CompanyPhone: CompanyPhone,
            Mobile: Mobile,
            Email: Email
        };

        Customers.addCustomer(customerObj, function(err, data) {
            //        console.log(err, data);
        });
    }

    function addMilestone(ProjectId, MilestoneDescription, EstimatedHours, Status, HoursSpent) {
        var milestoneObj = {
            MilestoneDescription:MilestoneDescription,
            EstimatedHours:EstimatedHours,
            Status:Status,
            HoursSpent:HoursSpent
        };

        Projects.addMilestone(ProjectId, milestoneObj, function(err, data) {
            //        console.log(err, data);     
        });
    }

    function addUserStory(ProjectId, UserRole, Request, Purpose, AcceptanceCriteria, MVP) {
        var userStoryObj = {
            UserRole:UserRole,
            Request:Request,
            Purpose:Purpose,
            AcceptanceCriteria:AcceptanceCriteria,
            MVP:MVP
        };

        Projects.addUserStory(ProjectId, userStoryObj, function(err, data) {
            //        console.log(err, data);     
        });
    }

    function addtestData() {
        //reset

        Users.clearAll(function() {});
        Projects.clearAll(function() {});
        Customers.clearAll(function() {});


        //users
        addUser("James","Walters", "wltrsjames@gmail.com","test123","1");
        addUser("Nick","Walters","wltrsnick@gmail.com","test1234","2");
        addUser("Bill","Gates","bill@microsoft.com","gates","2");



        //Projects
        addProject("Rate a Trait","An app to rate things","The app will be used mainly for agriculture. Where livestock and other yield can be measured", function(projectId) {
            addMilestone(projectId,"Create Prototype App",12,2,6);
            addMilestone(projectId,"Document Prototype results",4,2,3);

            addUserStory(projectId,"Farmer","Need the ability for the app to work with no Internet connection","In rural areas there may be little to no signal","Make the app work offline",true);
            addUserStory(projectId,"Software analyst","App dev environment needs to be portable ","more than one developer may be working on this, or may need handover","Make the app easily moveable",true);
        });
        addProject("Crisp Packet","It's a bag to hold crisps","The packet will be waterproof and hold nitrogen to keep the contents fresh", function(projectId) {
            addMilestone(projectId,"Design new packet",4,2,3);

            addUserStory(projectId,"Crisp Professional","Crisps need to be kept crunchy ","Soft crisps are bad","Add nitrogen to keep them fresh",false);
        });

        addProject("Metal Gear","It's a gear or 'cog' to move other gears","Will have 36 teeth and will turn anti-clockwise", function(projectId) {
            addMilestone(projectId,"Evaluate already existing technology",5,1,7);

        });

        addProject("Menus Count","A website to present and plan dietary information","Will be tailored for hospitals and care homes", function(projectId) {
            addMilestone(projectId,"Present Prototype to customer",2,2,0);

            addUserStory(projectId,"Care home resident","Needs extra amount of calories in diet","Some residents need a calorie heavy diet","Allow functionality to add 'fortified' meals to the menu",true);
        });

        //Customers
        addCustomer("Ben Williams","Ben inc.","Need 123 Ben Street","NP4BEN","01495123456","01495123456","ben@beninc.com");
        addCustomer("Larry","Tofaen Council","Civic centre","NP4123","01495112345","01495123476","Larry@torfaen.com");
        addCustomer("Lucy","Tofaen Council","Civic centre","NP4123","01495112345","01495123476","Lucy@torfaen.com");
        addCustomer("James","SRS","SRS","NP4155","01495112355","01495123475","james@srs.com");


        var milestoneUpdate = {
            MilestoneDescription:"Updated again",
            EstimatedHours: 12,
            Status: 2,
            HoursSpent: 50
        };

    }

    addtestData();
}