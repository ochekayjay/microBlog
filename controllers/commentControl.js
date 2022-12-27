const commentSchema = require('../models/commentSchema')
const errorClass = require('../controllers/errorControl')
const postSchema = require('../models/postSchema')


const createComment = async(req,res,next)=>{
    try{
        if(!req.body.message){
            throw new errorClass('write comment',400)
        }
        else{
            const comment = await commentSchema.create({
                user:req.user.id,
                message:req.body.message,
                parent_id: req.params.parent
            })

            const post = await postSchema.findByIdAndUpdate(req.params.parent,{
                $push:{'comments':comment._id}
                },{new:true})
            if(post.comments.includes(comment._id)){
                res.json(comment)
            }else{
                throw new errorClass('could not make post',500)
            }
        }
    }
    catch(error){
        next(error)
    }
}


const getComment = async(req,res)=>{
    try{
        if(!req.params.id){
            throw new errorClass('invalid id sent',400)
        }
        else{
            const comment = await commentSchema.findById(req.params.id)
            res.json(comment)
        }
    }
    catch(error){
        next(error)
    }
}


const deleteComment = async(req,res,next)=>{
    try{
        if(!req.params.id){
            throw new errorClass('invalid id',400)
        }
        else{//checkout what a promise from a delete on mongoose looks like
            const comment = await commentSchema.findByIdAndDelete(req.params.id)
            const post = await postSchema.findByIdAndUpdate(comment.parent_id,{
                $pull:{'comments':comment._id}
                },{new:true})
        if(!post.comments.includes(req.params.id)){
            res.json({message:'post succesfully deleted'})
           }
        else{
            throw new errorClass('something went wrong, try again',500)
        }
        }
    }
    catch(error){
        next(error)
    }
}

const likeComment = async(req,res,next)=>{
    try{
        
        const likedpost = await commentSchema.findByIdAndUpdate(req.params.id,
            {$inc:{like:1}},{new:true})
        res.json(likedpost)
    }
    catch(error){
        next(error)
    }
}

const unlikeComment = async(req,res,next)=>{
    try{
        const unlikedpost = await commentSchema.findByIdAndUpdate(req.params.id,
            {$inc:{like: -1}},{new:true})
        res.json(unlikedpost)
    }
    catch(error){
        next(error)
    }
}


module.exports = {createComment,getComment,deleteComment,likeComment,unlikeComment}