const mongoose = require('mongoose');
const User = require('./user');

const blogSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    title:String,
    content:String,
    image:String,
    date:{
        type:String,
    }
});

const Blog = mongoose.model('Blog',blogSchema);

module.exports = Blog;
