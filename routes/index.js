const express = require('express');
const router = express.Router();
const Blog = require('../model/blog')

//CR*D
//read blog
router.get('/',(req,res)=>{
    res.render('index')
})

// router.get('/index',(req,res)=>{
//     res.render('index')
// })

//read blog spectify
router.get('/blog',(req,res)=>{
    res.render('blog')
})

//create blog
router.get('/write',(req,res)=>{
    res.render('write')
})

router.post('/write',(req,res)=>{
    const {title, content} = req.body
    console.log(`title : ${title}`);
    console.log(`content : ${content}`);
    res.redirect('/')
})
//delete blog

module.exports = router;