const express = require('express');
const router = express.Router();
const Blog = require('../model/blog')

//CR*D
//read blog
router.get('/',(req,res)=>{
    res.json({message:'home page'})
})

//read blog spectify

//create blog

//delete blog

module.exports = router;