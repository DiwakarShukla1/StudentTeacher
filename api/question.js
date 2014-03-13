/**
 * Created by samphal on 11/3/14.
 */

exports.publish=function(req,res){
    console.log(req.data);
    req.io.broadcast("published",req.data);
}