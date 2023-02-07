const express = require('express')
const User = require('../models/userSchema')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const errorClass = require('./errorControl')
const userSchema = require('../models/userSchema')


const register = async(req,res,next)=>{
try{
    if(!req.body.Email || !req.body.Password || !req.body.Username || !req.body.name){
        res.status(400)
        throw new errorClass('Fill all fields',400)
    }
   const {Username,Password,Email,name} = req.body
   const exisitingEmail = await User.findOne({Email})
   const exisitingUsername = await User.findOne({Username})
   if(exisitingEmail || exisitingUsername){
       if(exisitingEmail){
        throw new errorClass('Email already exists',404)
       }
       else{
        throw new errorClass('Username already exists',405)
       }
       
   }

   const seed = await bcrypt.genSalt(10)
   const hashedpassword = await bcrypt.hash(Password,seed)
   let userdata = await User.create({
       Username : `@${Username}`,
       Password:hashedpassword,
       Email,
       name
   })
  

   res.status(200).json({
       _id:userdata.id,
       Username:userdata.Username,
       Email:userdata.Email,
       name: userdata.name,
       Token:generateToken(userdata._id),
       socket : userdata.socketId,
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
            name:exisitingUser.name,
            Email:exisitingUser.Email,
            followers:exisitingUser?.followerIds,
            Token:generateToken(exisitingUser._id),
            followingIds: exisitingUser?.followingIds,
            chatIds : exisitingUser?.chatIds})
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



    const userSearch = async(req,res,next)=>{
        try{
        const foundData = await userSchema.aggregate([
            {$match:{$text: 
                {$search: req.query.text}
            }},{
                $sort:{
                    count:{$meta:"textScore"},
                    _id: -1
                }
            }])
        res.json(foundData)
        }
        catch(error){
            next(error)
        }
    }



    const followAccount = async(req,res,next)=>{

        await userSchema.findByIdAndUpdate(req.params.accId,{
            $push:{
                'followerIds':req.user.id 
            }
        },{new:true})

        const follow = await userSchema.findByIdAndUpdate(req.user.id,{
            $push:{
                'followingIds':req.params.accId 
            }
        },{new:true})

        console.log(follow)

        if( follow.followingIds.includes(req.params.accId)){
            const checker = follow.followingIds.includes(req.params.accId)
            console.log(typeof checker)
            res.json( {_id:follow.id,
                Username:follow.Username,
                name:follow.name,
                followers:follow?.followerIds,
                followingIds: follow?.followingIds})
        }
        
        
    }

    const unfollowAccount = async(req,res,next)=>{
         await userSchema.findByIdAndUpdate(req.params.accId,{
            $pull:{
                'followerIds':req.user.id 
            }
        },{new:true})

        const follow = await userSchema.findByIdAndUpdate(req.user.id,{
            $pull:{
                'followingIds':req.params.accId 
            }
        })


        if(  !follow.followerIds.includes(req.params.accId)){
            res.json({_id:follow.id,
                Username:follow.Username,
                name:follow.name,
                followers:follow?.followerIds,
                followingIds: follow?.followingIds})
        }
        
        
    }


    module.exports = {register,login,deleteUser,followAccount,unfollowAccount,userSearch}