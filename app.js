require('./config/database').connect();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const User = require('./model/user');
const Blog = require('./model/blog')
const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser((user,done)=>{
    done(null,user.id);
});
passport.deserializeUser((id,done)=>{
    User.findById(id)
        .then(user=>{
            done(null,user);
        })
        .catch(err=>{
            done(err,null)
        })
});

app.use('/user',userRouter);
app.use('/',indexRouter);

app.listen(port,()=>{
    console.log(`Server running on port ${port} ...`)
})