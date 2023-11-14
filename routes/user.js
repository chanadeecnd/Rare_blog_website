const express = require('express');
const User = require('../model/user');
const Blog = require('../model/blog');
const passport = require('passport');
const router = express.Router();
const { dateFormat } = require('../public/js/date.js')

//CRU*

router.get('/', async (req, res, next) => {
    if (req.user) {
        const userLogin = await User.findById(req.user.id);
        if (req.user.image) {
            res.locals.dataImage = userLogin.image;
        }
        res.locals.dataUser = {
            email:req.user.username,
            author:`${req.user.firstName} ${req.user.lastName}`
        }
        // res.locals.dataAuthor = `${req.user.firstName} ${req.user.lastName}`;
        // console.log(`Path image ${userLogin.image}`);
    }
    next()
}, async (req, res) => {
    const blog = await Blog.find().populate('userId');
    const user = await User.find()
    // console.log('-------------------------------');
    // console.log(blog);
    // console.log('-------------------------------');
    if (req.isAuthenticated()) {
        console.log('User active');
        return res.render('home', { data: blog, user: user})
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
            //console.log(err)
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
    //console.log(user)
    req.logIn(user, (err) => {
        if (err) {
            //console.log(err)
            return res.json({ message: "login fails" })
        }
        passport.authenticate('local', {
            failureRedirect: '/user/',
            successRedirect: '/user/'
        })(req, res, () => {
            //console.log('Login successfully')
        })
    })
})

//register
router.post('/register', (req, res) => {
    const { username, password, confirmPassword, firstName, lastName } = req.body;
    //console.log(req.body)
    if (password == confirmPassword) {
        User.register({
            username: username,
            firstName: firstName,
            lastName: lastName,
            date: dateFormat()
        },
            password, (err, user) => {
                //console.log(user)
                if (err) {
                    //console.log(err)
                    return res.json({ message: 'Register Fails' })
                }
                passport.authenticate('local', {
                    failureRedirect: '/user/',
                    successRedirect: '/user/',
                })(req, res, () => {
                    //console.log('Register successfully.')
                })
            })
    } else {
        res.status(404).redirect('/user/')
    }
})

//profile
router.get('/profile',async (req, res, next) => {
    if (req.user) {
        const userLogin = await User.findById(req.user.id);
        if (req.user.image) {
            res.locals.dataImage = userLogin.image;
        }
        res.locals.dataUser = {
            email:req.user.username,
            author:`${req.user.firstName} ${req.user.lastName}`,
            firstName : req.user.firstName,
            lastName : req.user.lastName
        }
        // res.locals.dataAuthor = `${req.user.firstName} ${req.user.lastName}`;
        // console.log(`Path image ${userLogin.image}`);
    }
    next()
}
,async(req,res)=>{
    console.log(req.user)
    if(req.user){
        const user = await User.findOne({username:req.user.username}).populate('blogs');
        return res.render('profile',{data:user});
    }
    return res.redirect('/user/')
})

//logout

module.exports = router;