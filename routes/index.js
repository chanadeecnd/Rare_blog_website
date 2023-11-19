const express = require('express');
const multer = require('multer');
const router = express.Router();
const User = require('../model/user');
const Blog = require('../model/blog');
const { dateFormat, generateKey } = require('../public/js/date.js');
const { readUser } = require('../middleware/user.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads');
    },
    filename: (req, file, cb) => {
        const name = `${generateKey()}${Date.now()}.jpg`;
        cb(null, name);
    }
})
const upload = multer({ storage: storage })


//get user
router.get('/api-user', async (req, res) => {
    if (req.isAuthenticated()) {
        User.find()
            .then(data => {
                res.status(200).json({ data: data, user: req.user.username });
            })
            .catch(err => res.status(404).json({ message: 'Error to read user.' }))
    } else { res.json({ message: 'Not authenticate!' }) }

})


//get data
router.get('/read', async (req, res) => {
    const data = req.query.data;
    const user = User.find()
    console.log(data)
    switch (data) {
        case 'user':
            User.find()
                .then()
                .catch(err => res.json({ message: "Error to read user!" }))
            break;

        case 'blog':
            Blog.find()
                .then(data => res.status(200).json({ blog: data }))
                .catch(err => res.status(404).json({ message: "error to read blog!" }))
        default:

            console.log('Noting')
            break;
    }
})


//CR*D
//read blog
router.get('/', async (req, res) => {
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
router.get('/blog',readUser, async(req, res) => {
    try {
        const blog = await Blog.findById(req.query.read).populate('userId');
        res.render('blog',{data:blog});
    } catch (err) {
        
    }
    
})

//create blog
router.get('/write', async(req, res) => {
    try {
        const userId = await User.findById(req.user._id);
        res.render('write',{data:userId})
    } catch (err) {
        
    }
    
})

//update blog page

router.post('/write', async (req, res) => {
    try {
        const author = req.user.id;
        const { title, content } = req.body
        if (!(title && content && author)) {
            return res.sendStatus(404)
        }
        const newBlog = new Blog({
            userId: author,
            title: title,
            content: content,
            date: dateFormat()
        })
        newBlog.save()
            .then(data => {
                console.log(`0000000=${data}`);
                User.updateOne({ _id: author }, { $push: { blogs: data._id } })
                    .then(data => {
                        console.log(`After update : ${data}`)
                    });
                console.log(`Heloowirdo: ${data._id}`);
            })
        res.redirect('/user/');
    } catch (err) {
        console.log(err);
        res.redirect('/user/');
    }


})

//update profile
router.post('/profile', upload.single('newImage'), async (req, res) => {
    const { id, currentImage, firstName, lastName, email } = req.body
    let image;
    if (req.file) {
        image = req.file.filename;
    } else { image = currentImage }
    User.findByIdAndUpdate(id, {
        firstName: firstName,
        lastName: lastName,
        username: email,
        image: image
    })
        .then(() => res.status(200).redirect('/user/'))

})

//update blog
router.post('/update', (req, res) => {
    const id = req.body.id;
    if (id) {
        Blog.findById(id).populate('userId')
            .then(data => res.status(200).render('update', { data: data }))
            .catch(err => res.status(404).json({ message: 'Error to update blog.' }))
    }
    else { res.redirect('/user/') }
})

//updated blog
router.post('/update/blog', (req, res) => {
    const { title, content, id } = req.body;
    Blog.findByIdAndUpdate(id, { title: title, content: content })
        .then(data => {
            console.log(`Updated : ${data}`)
            res.redirect('/user/profile')
        })
})

//delete blog
router.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    console.log(id)
    Blog.findOneAndDelete({ _id: id })
        .then(data => {
            console.log('Delete blog successfully.');
            res.status(200).redirect('/user/profile');
        })
        .catch(err => console.log(`Error to delete : ${err}`))
})

module.exports = router;