var async = require('async');

module.exports = function(app) {
    var Users=require('../api/user');
    var question=require('../api/question');
    app.post('/Login',Users.Login);
    app.get('/Logout',Users.Logout);


//    app.io.route('Hello',function(req){
//        console.log("Login Hello...");
//        req.io.broadcast('talk', "Bye Bye");
//    });

//    app.io.route("first",function(req){
//        console.log("User Pagal Aayya");
//        req.io.emit("Yes","You Got me Now");
//    });

    app.io.route("publish",question.publish);

};