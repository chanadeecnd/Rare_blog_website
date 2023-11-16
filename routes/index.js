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


//get data
router.get('/read',async(req,res)=>{
    const data = req.query.data;
    const user = User.find()
    console.log(data)
    switch (data) {
        case 'user':
            User.find()
            .then()
            .catch(err=>res.json({message:"Error to read user!"}))
            break;
        
        case 'blog':
            Blog.find()
            .then(data=>res.status(200).json({blog:data}))
            .catch(err=>res.status(404).json({message:"error to read blog!"}))
        default:

            console.log('Noting')
            break;
    }
})


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

//update blog page

router.post('/write',async(req,res)=>{
    const author = req.user.id;
    const {title, content} = req.body
    if(!(title && content && author)){
        return res.sendStatus(404)
    }
    const newBlog = new Blog({
        userId: author,
        title:title,
        content:content,
        date:dateFormat()
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

//update profile
router.post('/profile',upload.single('newImage'),async(req,res)=>{
    const {id, currentImage, firstName, lastName, email} = req.body
    let image = `/image/${currentImage}`
    if(req.file){
        image = `/uploads/${req.file.filename}`
    }
    User.findByIdAndUpdate(id,{
        firstName:firstName,
        lastName:lastName,
        username:email,
        image: image
    })
    .then(()=>res.status(200).redirect('/user/'))
    
    res.sendStatus(202);
})

//update blog
router.post('/update',(req,res)=>{
    const id = req.body.id;
    if(id){
        Blog.findById(id)
        .then(data=>res.status(200).render('update',{data:data}))
        .catch(err=> res.status(404).json({message:'Error to update blog.'}))
    }
    else{res.redirect('/user/')}
})

//updated blog
router.post('/update/blog',(req,res)=>{
    const {title, content, id} = req.body;
    Blog.findByIdAndUpdate(id,{title:title,content:content})
    .then(data=>{
        console.log(`Updated : ${data}`)
        res.redirect('/user/profile')
    })
})

//delete blog
router.get('/delete/:id',(req,res)=>{
    const id = req.params.id;
    console.log(id)
    Blog.findOneAndDelete({_id:id})
    .then(data=>{
        console.log('Delete blog successfully.');
        res.status(200).redirect('/user/profile');
    })
    .catch(err=>console.log(`Error to delete : ${err}`))
})

module.exports = router;