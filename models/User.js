var mongoose = require('mongoose');

var Schema = mongoose.Schema;


var UserSchema = new Schema({
    userName: {type: String, required: true },
    Password: {type:String,required:true}
});

/**
 * Statics
 */
UserSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).exec(cb);
    }
};

var User = mongoose.model('User', UserSchema);