var async = require('async');

module.exports = function(app) {
    var Users=require('../api/user');
    var question=require('../api/question');
    app.post('/Login',Users.Login);
    app.get('/Logout',Users.Logout);

    app.io.route("publishToAll",question.publish);
    app.io.route("publishToOne",question.publishOne);
    app.io.route("takeQuestion",function(req){
       req.io.route("publishToOne");
    });

};