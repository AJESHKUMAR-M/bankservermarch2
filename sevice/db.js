//import mongoose
const mongoose = require('mongoose')
//create connection string 
mongoose.connect('mongodb://localhost:27017/bankApp',{ 
    useNewUrlParser:true
})
//model
const User = mongoose.model('User',{
    acno:Number,
    username:String,
    password:String,
    balance:Number,
    transaction:[]
})
module.exports={
    User
}