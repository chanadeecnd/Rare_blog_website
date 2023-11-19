require('./config/database').connect();
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const morgan = require('morgan');
const User = require('./model/user');
const Blog = require('./model/blog');
const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');
const { dateFormat } = require('./public/js/date');
const clientID = '5280873552-dpg3e6p1eut1objqueknohmo54d9osh2.apps.googleusercontent.com';
const clientSecret = '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';
const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            done(err, null)
        })
});

passport.use(new GoogleStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: "https://rareblogwebsite-production.up.railway.app/auth/google/home",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
},
    async function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        const user = await User.findOne({googleId:profile.id});
        if(!user){
            const newUser = new User({
                username:profile.emails[0].value,
                googleId:profile.id,
                firstName:profile.name.givenName,
                lastName:profile.name.familyName,
                image:profile.photos[0].value,
                date:dateFormat()
            });
            newUser.save()
            .then(user=>{
                return cb(null,user)
            })
            .catch(err=>cb(err))
        }else{return cb(null,user)}
    }
));
app.use(morgan('combined'))
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile','email'] }));

app.get('/auth/google/home',
    passport.authenticate('google', { failureRedirect: '/' }),
    function (req, res) {
        // Successful authentication, redirect home.
        console.log(`Gooel login : ${req.user}`)
        res.redirect('/user/');
    });
app.use('/user', userRouter);
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port} ...`)
})