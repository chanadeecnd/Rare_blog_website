const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate')
const Blog = require('./blog')

const userSchema = new mongoose.Schema({
    googleId:String,
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
userSchema.plugin(findOrCreate);
userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',userSchema);

module.exports = User;