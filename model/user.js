const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    username:String,
    password:String
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('users',userSchema);

module.exports = User;