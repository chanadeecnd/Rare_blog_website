const express = require('express');
const User = require('../model/user');
const passport = require('passport');
const router = express.Router();

//CRU*

router.get('/',(req,res)=>{
    console.log(req.user)
    if(req.isAuthenticated()){
        return res.render('home');
    }
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
    const {username, password, confirm_password} = req.body;
    console.log(req.body)
    if(password === confirm_password){
        User.register({username:username},
            password,(err,user)=>{
                if(err){
                    console.log(err)
                    return res.json({message:'Register Fails'})
                }
                passport.authenticate('local')(req,res,()=>{
                    res.redirect('/user/')
                })
            })
    }else{
        res.status(404).redirect('/')
    }
})

//logout

module.exports = router;