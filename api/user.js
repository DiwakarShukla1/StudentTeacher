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
    if(username==="teacher" && password==="teacher"){
        req.session.user=username;
        console.log(req.session.user);
        res.end(val.value='teacher');   
    }else if(username===password){
        req.session.user=username;
        console.log(req.session.user);
        res.end(val.value='student');
    }else{
        var err=new Error("Invalid UserName or Password");
        res.statusCode=401;
        res.end();
    }

//    req.io.route("Hello");
}

exports.Logout=function(req,res)
{
    console.log("Logout.......");
    req.session.user="";
    req.session.destroy();
    res.end();
}