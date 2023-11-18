async function readUser(req,res,next){
    if (req.user) {
        const userLogin = await User.findById(req.user.id);
        if(userLogin.image){
            res.locals.dataImage = userLogin.image;
        }
        res.locals.dataUser = {
            email:req.user.username,
            author:`${req.user.firstName} ${req.user.lastName}`,
            firstName : req.user.firstName,
            lastName : req.user.lastName,
        }
    }
    next()
}

module.exports = {readUser}