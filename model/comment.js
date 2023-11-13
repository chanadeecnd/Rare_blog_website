const mongoose = require('mongoose');
const User = require('./user');
const Blog = require('./blog');

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    blogId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    content:String,
    date:{
        type:Date,
        default:Date.now
    }
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment;