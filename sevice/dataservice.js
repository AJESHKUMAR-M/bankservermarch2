//import jwt
const jwt = require('jsonwebtoken')
//import db.js
const db= require('./db')
// db={
//     100:{"acno":100,"username":"Ronaldo","password":101,"balance":10000,transaction:[]},
//     101:{"acno":101,"username":"messi","password":102,"balance":1000,transaction:[]},
//     102:{"acno":102,"username":"neymar","password":103,"balance":100,transaction:[]},
//     103:{"acno":103,"username":"xavi","password":104,"balance":10600,transaction:[]},
//     104:{"acno":104,"username":"lewandosky","password":105,"balance":100600,transaction:[]}
//   }
//login
const login=(acno,pass)=>{
   
  return db.User.findOne({
    acno,
   pass
  }).then(user=>{
    if(user){
      curentUser=user.username
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
        message: "acno or password incorrect!!",
        statusCode:401
      }
    }
  })
}
//   if(acno in db){
//     if(pass==db[acno]["password"]){
 
    
// }
//     else{ 
   
//       return {
//         status:false,
//         message: "incorrect password",
//         statusCode:401
//       }
//     }
//   }
//   else { 
   
//   }
 

 //register
  const register=(username,acno,pass)=>{
return db.User.findOne({
  acno
}).then(user=>{
  if(user){
    return {
      status:false,
      message: "already existed...please log in",
      statusCode:401
    }
  }
  else{ 
    const newUser = new db.User({
      acno,
      username,
      password:pass,
      balance:0,
      transaction:[]
    })
    newUser.save()
    return {
      status:true,
      message:"register success",
      statusCode:200
    }
    
  }
})
}
    
 

  
  
  
  
  //withdraw


 var withdraw=(acno,pass,amt)=>{
    var amount=parseInt(amt)
    return db.User.findOne({
      acno,pass
    }).then(user=>{
      if(user){
        if(user.balance>amount){
        user.balance-=amount
       user.transaction.push({
          type: "DEBIT",
          amount:amount
        })
        user.save()
        return {
          status:true,
            message:amount+"cash withdrawed new balance is"+ user.balance,
            statusCode:200
        }
      }
      else{
        return {
          status:false,
          message: "insufficient balance",
          statusCode:401
        }
      }
    }
  
      else{
        return {
          status:false,
          message: "username or password does not exist",
          statusCode:401
        }
      }
    })
    

    // if(acno in db){
    //   if(pass ==db[acno]["password"]){

    //     if(db[acno]["balance"]>amount){
         
         

    //     }
    //     else{
       
    //       return {
    //         status:false,
    //         message: "insufficent balance",
    //         statusCode:422
    //       }
    //     }
        
    //   }
    //   else{
       
    //     return {
    //       status:false,
    //       message: "incorrect password",
    //       statusCode:401
    //     }
    //   }

    // }
    // else{
    
    //   return {
    //     status:false,
    //     message: "user does not exist",
    //     statusCode:401
    //   }
    // }

  }





       //deposit-asynchronus

      const deposit=(acno,password,amt)=>{
        var amount=parseInt(amt)
        return db.User.findOne({
          acno,
          password
        }).then(user=>{
      if(user){
       user.balance+=amount
        user.transaction.push({
          type: "CREDIT",
          amount:amount
        })
        user.save()
        
        return {
          status:true,
          message:amount+"deposited new balance is"+user.balance,
          statusCode:200
        }
      }
      else{
        return {
          status:false,
          message: "username or password doesnot exist",
          statusCode:401
        }
      }
        })
       
     
    // if(acno in db){
    //       if(password ==db[acno]["password"]){
           
           
    //       }
    //       else{
    //         return {
    //           status:false,
    //           message: "incorrect password",
    //           statusCode:401
    //         }
    //       }
    
    //     }
    //     else{
         
    //     }
       
    
      }
      //transaction api
      const getTransaction=(acno)=>{
        return db.User.findOne({
          acno
        }).then(user=>{
          if(user){
          return {
            status:true,
            statusCode:200,
            transaction:user.transaction
          }
        }
        else{
          return {
            status:false,
            message: "user does not exist",
            statusCode:401
          }
        }
    
        
        })
      //   if(acno in db){
      
      // }
      // else{
        
      // }
      }
  //export
  module.exports ={
      register,
      login,
      deposit,
      withdraw,
      getTransaction
    }