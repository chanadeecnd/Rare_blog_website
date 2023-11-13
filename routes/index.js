const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('../model/user');
const Blog = require('../model/blog');
const {dateFormat,generateKey} = require('../public/js/date.js');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        const name = `${generateKey()}${Date.now()}.jpg`;
        cb(null,name);
    }
})
const upload = multer({storage:storage})

//CR*D
//read blog
router.get('/',async(req,res)=>{
    // const blog = await Blog.find().populate('userId')
    // console.log('-------------------------------');
    // console.log(blog);
    // console.log('-------------------------------');
    res.redirect('/user/')
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

router.post('/write',upload.single('image'),async(req,res)=>{
    const author = req.user.id;
    const {title, content} = req.body
    const img = req.file.filename;
    if(!(img && title && content && author)){
        return res.sendStatus(404)
    }
    const newBlog = new Blog({
        userId: author,
        title:title,
        content:content,
        date:dateFormat(),
        image:img
    })
    newBlog.save()
    .then(data=>{
        console.log(`0000000=${data}`);
        User.updateOne({_id:author},{$push:{blogs:data._id}})
        .then(data=>{
            console.log(`After update : ${data}`)
        });
        console.log(`Heloowirdo: ${data._id}`);
    })
    res.redirect('/user/');
    
})
//delete blog

module.exports = router;