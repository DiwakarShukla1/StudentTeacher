/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    User = mongoose.model('User'),
    mongodb=require('mongodb'),
    _ = require('underscore');

exports.Login=function(req,res){

    var username=req.body.userName;
    var password=req.body.Password;
    console.log("Aaaya...........");
    console.log(req.body);
    var val={'value':''};
    if(username=='teacher' && password=='teacher')
    {
        req.session.user="teacher111";
        res.end(val.value='teacher');
    }
    else if(username=="student" && password=="student")
    {
        req.session.user="student111";
        res.end(val.value="student");
    }
    else
        res.end(val.value="invalid");

//    req.io.route("Hello");
}

exports.Logout=function(req,res)
{
    console.log("Logout.......");
    req.session.user="";
    req.session.destroy();
    res.end();
}