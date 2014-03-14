/**
 * Created by samphal on 11/3/14.
 */
var fs=require('fs');

exports.publish=function(req,res){
    console.log(req.data);
    console.log(req.sessionID);
    fs.writeFile("./data/Questions.txt",JSON.stringify(req.data),function(err){
       if(err){
           console.log(err);
       } else{
           console.log("Saved.....");
       }
    });
    req.io.broadcast("published",req.data);
}

exports.publishOne=function(req,res){
    console.log(req);
    fs.readFile("./data/Questions.txt", 'utf8', function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
        }
        data = JSON.parse(data);
        console.log(data);
        req.io.emit("published",data);
    });
}