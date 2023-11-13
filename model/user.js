const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username:String,
    password:String,
    date:String,
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('users',userSchema);

module.exports = User;