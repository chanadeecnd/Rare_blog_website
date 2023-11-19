const express = require('express');
const User = require('../model/user');
const Blog = require('../model/blog');
const passport = require('passport');
const router = express.Router();
const { dateFormat } = require('../public/js/date.js')
const { readUser } = require('../middleware/user.js');

//CRU*

router.get('/', readUser, async (req, res) => {
    const blog = await Blog.find().populate('userId');
    const user = await User.find()
    if (req.isAuthenticated()) {
        console.log('User active');
        return res.render('home', { data: blog, user: user })
    }
    console.log('No User')
    return res.render('index', { data: blog, user: user });
});

router.get('/login', (req, res) => {
    res.send("Login Page")
})

//Logout
router.get('/logout', (req, res) => {
    req.logOut((err) => {
        if (err) {
            return -1;
        }
        res.redirect('/user/')
    })
})

//login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = new User({
        username: username,
        password: password
    })
    req.logIn(user, (err) => {
        if (err) {
            return res.json({ message: "login fails" })
        }
        passport.authenticate('local', {
            failureRedirect: '/user/',
            successRedirect: '/user/'
        })(req, res, () => {
        })
    })
})

//register
router.post('/register', (req, res) => {
    const { username, password, confirmPassword, firstName, lastName } = req.body;
    if (password == confirmPassword) {
        User.register({
            username: username,
            firstName: firstName,
            lastName: lastName,
            date: dateFormat()
        },
            password, (err, user) => {
                if (err) {
                    return res.json({ message: 'Register Fails' })
                }
                passport.authenticate('local', {
                    failureRedirect: '/user/',
                    successRedirect: '/user/',
                })(req, res, () => {
                })
            })
    } else {
        res.status(404).redirect('/user/')
    }
})

//seach
router.post('/search',readUser ,async (req, res) => {
    const text = req.body.text;
    const foundBlogs = await Blog.find({
        $or: [
            { title: { $regex: text.replace(/\s+/g, '\\s+'), $options: 'i' } },
            { content: { $regex: text.replace(/\s+/g, '\\s+'), $options: 'i' } }
        ]
    }).populate('userId');

    res.render('search',{data:foundBlogs,text:text});
})


//profile
router.get('/profile', readUser, async (req, res) => {
    console.log(req.user)
    if (req.user) {
        const user = await User.findById(req.user._id).populate('blogs');
        // console.log('-----------------Profile.ejs-------------------');
        // console.log(user);
        // console.log('-----------------------------------------------')
        return res.render('profile', { data: user });
    }
    return res.redirect('/user/')
})

//logout

module.exports = router;