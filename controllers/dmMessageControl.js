const dmSchema = require('../models/dmSchema')
const messageSchema = require('../models/dmMessageSchema')
const errorHolder = require('../controllers/errorControl')
const userSchema = require('../models/userSchema')
const dmMessageSchema = require('../models/dmMessageSchema')


const createMessage = async(req,res,next)=>{
    try{

        
            if(!req.body.initiatorName || !req.body.recipientName || !req.body.recipientId || !req.body.message){
                throw new errorHolder('no user credential',400)
            }
            else{
                //this first searches for the recipient by the recipient's id, gets the id,username and socket_id of that recipient
                //...and stores all of that info into the newly created Dm document.
                const foundrecipient = await userSchema.findById(req.body.recipientId)
                const foundDm = await dmSchema.findOne({userIds:[req.user.id,req.body.recipientId]})
              
                
                if(foundDm === null){
                    
                    const createdDm = await dmSchema.create({
                        userIds : [req.user.id,req.body.recipientId],
                        userNames: [req.body.initiatorName,foundrecipient.Username]
                    })
                

                    await userSchema.findByIdAndUpdate(req.user.id,{
                        $push:{'chatIds': createdDm.id}
                        //this only pushes to the chatIds of the user creating the chat, it doesn;t populate that 
                        //of the receiver
                    })

                    const message = await dmMessageSchema.create({
                        senderId: req.user.id,
                        receiverId: req.body.recipientId,
                        senderName: req.body.initiatorName,
                        receiverName : req.body.recipientName,
                        message: req.body.message,
                        chatId : createdDm.id
    
                    })
                    console.log(message)
                    if(foundrecipient.socketId){
                        global.io.to(foundrecipient.socketId).emit('messageSent',message)
                    }
                }
                else{
                    
                const message = await dmMessageSchema.create({
                    senderId: req.user.id,
                    receiverId: req.body.recipientId,
                    senderName: req.body.initiatorName,
                    receiverName : req.body.recipientName,
                    message: req.body.message,
                    chatId : foundDm.id

                })
                console.log(message)
                if(foundrecipient.socketId && message.message){
                    global.io.to(foundrecipient.socketId).emit('messageSent',message)
                }
                
            }}
    }
    catch(error){
        next(error)
    }
}


const getDms = async(req,res,next)=>{
    const user = await userSchema.findById(req.user.id)
    try{
        //this doesn't fetch all messages linked to a particular user, it only fetches one message,
        //an array containning the chatId of all dms related to a user would be used to run through the entire 
        //message schema collection.
        const dms = await dmSchema.find({_id:{$in: user.chatIds}})
        res.json({Dm_details : dms})
    }
    catch(error){
        next(error)
    }
}



const getMessage = async(req,res,next)=>{
    try{
        //this doesn't fetch all messages linked to a particular user, it only fetches one message,
        //an array containning the chatId of all dms related to a user would be used to run through the entire 
        //message schema collection.
        const messages = await dmMessageSchema.find({chatIds:req.params.chatId})
        res.json({message_details : messages})
    }
    catch(error){
        next(error)
    }
}

const deleteMessage = async(req,res,next)=>{
    try{
        const messages = await dmMessageSchema.findByIdAndDelete(req.params.id)
        if(messages){
            res.json({status:'message deleted'})
        }
    }
    catch(error){
        next(error)
    }
}

module.exports = {createMessage,getMessage,deleteMessage,getDms}