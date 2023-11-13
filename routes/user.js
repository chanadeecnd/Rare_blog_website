const express = require('express');
const User = require('../model/user');
const passport = require('passport');
const router = express.Router();
const dateFormat = require('../public/js/date.js')

//CRU*

router.get('/',(req,res)=>{
    // console.log(req)
    console.log(req.user)
    if(req.isAuthenticated()){
        console.log('User active')
        return res.render('home');
    }
    console.log('No User')
    return res.render('index');
});

router.get('/login',(req,res)=>{
    res.send("Login Page")
})

//Logout
router.get('/logout',(req,res)=>{
    req.logOut((err)=>{
        if(err){
            console.log(err)
            return -1;
        }
        res.redirect('/user/')
    })
})

//login
router.post('/login',(req,res)=>{
    const {username, password} = req.body;
    const user = new User({
        username:username,
        password:password
    })
    console.log(user)
    req.logIn(user,(err)=>{
        if(err){
            console.log(err)
            return res.json({message:"login fails"})
        }
        passport.authenticate('local',{
            failureRedirect:'/user/login',
            successRedirect:'/user/'
        })(req,res,()=>{
            console.log('Login successfully')
        })
    })
})

//register
router.post('/register',(req,res)=>{
    const {username, password, confirmPassword, firstName, lastName} = req.body;
    console.log(req.body)
    if(password == confirmPassword){
        User.register({
            username:username,
            firstName:firstName,
            lastName:lastName,
            date:dateFormat()
        },
            password,(err,user)=>{
                console.log(user)
                if(err){
                    console.log(err)
                    return res.json({message:'Register Fails'})
                }
                passport.authenticate('local',{
                    failureRedirect:'/user/',
                    successRedirect:'/user/',
                })(req,res,()=>{
                    console.log('Register successfully.')
                })
            })
    }else{
        res.status(404).redirect('/user/')
    }
})

//logout

module.exports = router;