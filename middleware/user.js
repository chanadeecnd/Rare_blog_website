const User = require('../model/user');
async function readUser(req,res,next){
    // console.log(`This is middleware : ${req.user}`)
    if (req.user) {
        const userLogin = await User.findById(req.user.id);
        if(userLogin.image){
            res.locals.dataImage = userLogin.image;
        }
        if(req.user.googleId){
            // console.log(`let's go !!`);
            // console.log(`google id : ${req.user.googleId}`);
            // console.log(`google image : ${req.user.image}`);
            res.locals.dataGoogle = req.user.image;
        }
        res.locals.dataUser = {
            email:req.user.username,
            author:`${req.user.firstName} ${req.user.lastName}`,
            firstName : req.user.firstName,
            lastName : req.user.lastName
        }
    }
    next()
}

module.exports = {readUser}