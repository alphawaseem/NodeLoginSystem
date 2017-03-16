let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let SALT_WORK_FACTOR = 10;

let princiSchema = new mongoose.Schema({
    name : {
        type:String,
        required: true,
    } ,
    email : {
        type : String,
        required : true,
        unique : true
    } , 
    password : {
        type:String,
        required : true
    }
});

princiSchema.pre('save', function(next) {
     let princi = this;

     if(!princi.isModified('password')) 
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR,(err,salt) => {
        if(err) return next(err);

        bcrypt.hash(princi.password,salt,(err,hash) => {
            if(err) return next(err);
            
            princi.password = hash;
            next();
        });
    });
});


princiSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}
module.exports = mongoose.model('Principal',princiSchema);