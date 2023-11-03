const express = require('express');
const User = require('../model/user');
const router = express.Router();

//CRU*

router.get('/',(req,res)=>{
    res.json({message:"ok"})
});

//login

//register

//logout

module.exports = router;