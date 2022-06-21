//server creation

//package.jason creation
//import express 
const  express = require('express')
//import jwt
const jwt = require('jsonwebtoken')
//import dataservice
const dataService = require('./sevice/dataservice')
//sever application
const bankapp = express()
bankapp.use(express.json())
//application speciffic middleware
const appMiddleware =(req,res,next)=>{
    console.log("application speciffic middleware");
    next()
}
//use of application speciffic middleware
bankapp.use(appMiddleware)
//jwt middleware
const jwtMiddleware =(req,res,next)=>{
  try { //fetch token
    token= req.headers['access-token']
    //verify token
  const data =  jwt.verify(token,'secretkey123')
console.log(data);
next()
}
catch{
    res.status(401).json({
        status:false,
        statusCode:401,
        message:'please login'
    })
}
}

//bankapp server
bankapp.post('/register',(req, res) => {
    console.log(req.body);
    //register solving
const result= dataService.register(req.body.username,req.body.acno,req.body.pass)

res.status(result.statusCode).json(result)
// if(result){
//     res.send("register success")
// }
// else{
//     res.send("already existed...please log in")
// }
})
bankapp.post('/login',(req, res) => {
    console.log(req.body);
    //register solving
const result= dataService.login(req.body.acno,req.body.pass)

res.status(result.statusCode).json(result)
})
//withdraw
bankapp.post('/withdraw',jwtMiddleware,(req, res) => {
    console.log(req.body);
    //register solving
const result= dataService.withdraw(req.body.acno,req.body.pass,req.body.amt)

res.status(result.statusCode).json(result)
})


//deposit
bankapp.post('/deposit',jwtMiddleware,(req, res) => {
    console.log(req.body);
    //register solving
const result= dataService.deposit(req.body.acno,req.body.password,req.body.amt)

res.status(result.statusCode).json(result)
})
//transaction
bankapp.post('/transaction',jwtMiddleware,(req, res) => {
    console.log(req.body);
    //register solving
const result= dataService.getTransaction(req.body.acno)

res.status(result.statusCode).json(result)
})



//user reqst and resolve
//FETCH DATA 
bankapp.get('/',(req,res)=>{
    res.send("GET request")
})
//CREATE DATA
bankapp.post('/',(req,res)=>{
    res.send("POST request")
})
//MODIFY ENTIRE DATA
bankapp.put('/',(req,res)=>{
    res.send("PUT request")
})
//PARTIALLY MODIFY DATA
bankapp.patch('/',(req,res)=>{
    res.send("PATCH request")
})
//DELETE DATA
bankapp.delete('/',(req,res)=>{
    res.send("DELETE request")
})

//setup port number
bankapp.listen(3000,()=>{console.log("server starts at 3000");})