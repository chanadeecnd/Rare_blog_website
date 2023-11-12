const express = require('express');
const router = express.Router();
const Blog = require('../model/blog')

//CR*D
//read blog
router.get('/',(req,res)=>{
    res.render('home')
})
router.get('/index',(req,res)=>{
    res.render('index')
})

//read blog spectify
router.get('/blog',(req,res)=>{
    res.render('blog')
})

//create blog
router.get('/write',(req,res)=>{
    res.render('write')
})

//delete blog

module.exports = router;