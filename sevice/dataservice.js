//import jwt
const jwt = require('jsonwebtoken')

db={
    100:{"acno":100,"username":"Ronaldo","password":101,"balance":10000,transaction:[]},
    101:{"acno":101,"username":"messi","password":102,"balance":1000,transaction:[]},
    102:{"acno":102,"username":"neymar","password":103,"balance":100,transaction:[]},
    103:{"acno":103,"username":"xavi","password":104,"balance":10600,transaction:[]},
    104:{"acno":104,"username":"lewandosky","password":105,"balance":100600,transaction:[]}
  }
//login
const login=(acno,pass)=>{
  
  if(acno in db){
    if(pass==db[acno]["password"]){
  curentUser=db[acno]["username"]
  curentAcno=acno

token = jwt.sign({
  //store acno inside token
  curentAcno:acno
},'secretkey123')
     return {
      status:true,
      message: "login success",
      statusCode:200,
      curentAcno,
      token

     }
    
}
    else{ 
   
      return {
        status:false,
        message: "incorrect password",
        statusCode:401
      }
    }
  }
  else { 
    return {
      status:false,
      message: "acno does not exist!!",
      statusCode:401
    }
  }
  }

 //register
  var register=(username,acno,pass)=>{

    if(acno in db){
      return {
        status:false,
        message: "already existed...please log in",
        statusCode:401
      }
    }
    else{ 
      db[acno]={acno,
        username,
        password:pass,
        balance:0,
        transaction:[]
      }
    }
console.log(db);
    return {
      status:true,
      message:"register success",
      statusCode:200
    }
  }
  
  
  //withdraw


 var withdraw=(acno,pass,amt)=>{
    var amount=parseInt(amt)
    

    if(acno in db){
      if(pass ==db[acno]["password"]){

        if(db[acno]["balance"]>amount){
          db[acno]["balance"]-=amount
          // db[acno].transaction.push({
          //   type: "DEBIT",
          //   amount:amount
          // })
          
          return {
            status:true,
              message:amount+"cash withdrawed new balance is"+ db[acno]["balance"],
              statusCode:200
          }
         

        }
        else{
       
          return {
            status:false,
            message: "insufficent balance",
            statusCode:422
          }
        }
        
      }
      else{
       
        return {
          status:false,
          message: "incorrect password",
          statusCode:401
        }
      }

    }
    else{
    
      return {
        status:false,
        message: "user does not exist",
        statusCode:401
      }
    }

  }





       //deposit

      const deposit=(acno,password,amt)=>{
        var amount=parseInt(amt)
     
    if(acno in db){
          if(password ==db[acno]["password"]){
            db[acno]["balance"]+=amount
            db[acno].transaction.push({
              type: "CREDIT",
              amount:amount
            })
            
            return {
              status:true,
              message:amount+"deposited new balance is"+ db[acno]["balance"],
              statusCode:200
            }
           
          }
          else{
            return {
              status:false,
              message: "incorrect password",
              statusCode:401
            }
          }
    
        }
        else{
          return {
            status:false,
            message: "user doesnot exist",
            statusCode:401
          }
        }
       
    
      }
      //
      const getTransaction=(acno)=>{
        if(acno in db){
        return {
          status:true,
          statusCode:200,
          transaction:db[acno].transaction
        }
      }
      else{
        return {
          status:false,
          message: "user does not exist",
          statusCode:401
        }
      }
      }
  //export
  module.exports ={
      register,
      login,
      deposit,
      withdraw,
      getTransaction
    }