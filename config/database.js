require('dotenv').config();
const mongoose = require('mongoose');
const {MONGO_URI} = process.env;

exports.connect = () =>{
    mongoose.connect(MONGO_URI,{
        useNewUrlParser : true,
        useUnifiedTopology : true
    })
    .then(()=>{
        console.log('connect to database successfully');
    })
    .catch(err=>{
        console.log('Error connecting to database!');
        process.exit(1);
    })
}