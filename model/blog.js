const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:String,
    author:String,
    content:String,
    category:String,
    date:String
});

const Blog = mongoose.model('blog',blogSchema);

module.exports = Blog;