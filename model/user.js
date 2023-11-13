const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Blog = require('./blog')

const userSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    username:String,
    password:String,
    image:String,
    date:String,
    blogs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }]
})

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);

module.exports = User;