const express = require('express')
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorClass = require('./errorControl')
const userSchema = require('../models/userSchema')

const register = async(req,res,next)=>{
try{
    if(!req.body.Email || !req.body.Password || !req.body.Username){
        res.status(400)
        throw new errorClass('Fill all fields',400)
    }
   const {Username,Password,Email} = req.body
   const exisitingUser = await User.findOne({Email})
   if(exisitingUser){
       
       throw new errorClass('User already exists',400)
       
   }

   const seed = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(Password,seed)
   let userdata = await User.create({
       Username,
       Password:hashedpassword,
       Email
   })
  
  console.log(userdata.id)
  userdata = await User.findByIdAndUpdate(userdata.id,{
    $push : {"followerIds":userdata.id}
  },{new : true})
   
  

   res.status(200).json({
       _id:userdata.id,
       Username:userdata.Username,
       Email:userdata.Email,
       followers:userdata.followerIds,
       Token:generateToken(userdata._id)
   })

}

catch(error){
    next(error)
}
}


const login = async(req,res,next)=>{
    try{
        
        if(!req.body.Email || !req.body.Password ){
            
            throw new errorClass('Fill all fields',400)
        }
       const {Password,Email} = req.body
       const exisitingUser = await User.findOne({Email:Email})
       if(exisitingUser && (await bcrypt.compare(Password,exisitingUser.Password))){
           res.status(200).json({
            _id:exisitingUser.id,
            Username:exisitingUser.Username,
            Email:exisitingUser.Email,
            followers:exisitingUser.followerIds,
            Token:generateToken(exisitingUser._id)})
       }

       else{
           throw new errorClass('User does not exist',400)
       }
    }
    
    catch(error){
        next(error)
    }
    }

    const getme = async(req,res,next)=>{
        
    }

    const deleteUser = async(req,res,next)=>{
        try{
           const deletedAccount = await userSchema.findByIdAndDelete(req.params.id)
           if(deletedAccount){
            res.json({message:'user succesfully deleted'})
           }
          
        }
        
        catch(error){
             next(error)
        
    }}

    const generateToken = (id) =>{
        return jwt.sign({id},'abc123',{expiresIn:'3d'})
    }

    module.exports = {register,login,deleteUser}