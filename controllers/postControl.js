const postschema = require('../models/postSchema')
const errorHolder = require('../controllers/errorControl')
const userSchema = require('../models/userSchema')

const createPost = async(req,res,next)=>{
    try{

        if(!req.body.message){
            throw new errorHolder('fill in message',400)
        }
        const post =  await postschema.create({
            message: req.body.message,
            userId:req.user.id
        })
        res.json({post})
    }

    catch(error){
        next(error)
    }
}


const getPost = async(req,res,next)=>{
    try{
        userPosts = await postschema.find({userId : req.params.postid})
        if(!userPosts){
            throw new errorHolder('invalid user',400)
        }
        console.log('it works')
        res.json(userPosts)
    }
    catch(error){
        next(error)
    }
}

const getAllPosts = async(req,res,next)=>{
    try{
        userPosts = await postschema.find({userId : req.user.id})
        if(!userPosts){
            throw new errorHolder('invalid user',400)
        }
        console.log('it works')
        res.json(userPosts)
    }
    catch(error){
        next(error)
    }
}

const deletePost = async(req,res,next)=>{
    try{
        const post = await postschema.findByIdAndDelete(req.params.id)
        if(post){
            res.json({message:'post succesfully deleted'})
           }
        

    }
    catch(error){
        next(error)
    }
}

//searches every existing posts on the site and rates them according to their text weight
const querySearch = async(req,res,next)=>{
    try{
    const foundData = await postschema.aggregate([
        {$match:{$text: 
            {$search: req.query.message}
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


//searches through only posts created by a particular account and rates them according to their text weight
const querySearchUser = async(req,res,next)=>{
    try{
    const foundData = await postschema.aggregate([
        {$match:{
            $and : [
                {userId:
                    req.params.userid},
                {$text: 
            {$search: req.query.message}
        }]}},{
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



//feed of posts to be rendered on a users end on entry.

const postsFeed = async(req,res,next)=>{
    const User = await userSchema.findById(req.user.id)
    try{
        
        const allFeeds = await postschema.findById(User.followerIds).sort({timestamps:-1})
       
        /*
            const allFeeds = await postschema.aggregate([
            {
                $match : {
                 userId   : {$in : User.followerIds}
                }
            },
            {
                $unwind : $documents
            },
            {
                $sort : {timestamps: -1}
            }
        ])
        */

        res.json({feeds:allFeeds})
    }
    catch(error){
        next(error)
    }
}









const likepost = async(req,res,next)=>{
    try{
        console.log('a')
        const likedpost = await postschema.findByIdAndUpdate(req.params.id,
            {$inc:{like:1}},{new:true})
        res.json(likedpost)
    }
    catch(error){
        next(error)
    }
}

const unlikepost = async(req,res,next)=>{
    try{
        const unlikedpost = await postschema.findByIdAndUpdate(req.params.id,
            {$inc:{like: -1}},{new:true})
        res.json(unlikedpost)
    }
    catch(error){
        next(error)
    }
}


module.exports = {createPost,getPost,getAllPosts,deletePost,querySearch,querySearchUser,likepost,unlikepost,postsFeed} 