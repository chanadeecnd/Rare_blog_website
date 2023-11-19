const mongoose = require('mongoose');
const User = require('./user');
const Blog = require('./blog');

const librarySchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    blogId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }],
    date:{
        type:String
    }
});

const Library = mongoose.model('Library',librarySchema);

module.exports = Library;