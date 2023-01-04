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
                const foundDm = await dmSchema.find({userIds:[req.user.id,req.body.recipientId]})
                console.log(`number twenty ${foundrecipient}`)
                console.log(`number twentyone ${foundDm}`)
                if(foundDm != null){
                    console.log('in first set')
                    const createdDm = await dmSchema.create({
                        userIds : [req.user.id,req.body.recipientId],
                        userNames: [req.body.initiatorName,foundrecipient.Username]
                    })
                    console.log(createdDm)

                    const message = await dmMessageSchema.create({
                        senderId: req.user.id,
                        receiverId: req.body.recipientId,
                        senderName: req.body.initiatorName,
                        receiverName : req.body.recipientName,
                        message: req.body.message,
                        dmId : createdDm.id
    
                    })
                    console.log(message)
                    if(foundrecipient.socketId){
                        global.io.to(foundrecipient.socketId).emit('messageSent',`i love you user ${foundrecipient.socketId}`)
                    }
                }
                else{
                    console.log('na here werrey go stay')
                const message = await dmMessageSchema.create({
                    senderId: req.user.id,
                    receiverId: req.body.recipientId,
                    senderName: req.body.initiatorName,
                    receiverName : req.body.recipientName,
                    message: req.body.message,
                    dmId : foundDm.id

                })
                console.log(message)
                if(foundrecipient.socketId){
                    global.io.to(foundrecipient.socketId).emit('messageSent',`i love you user ${foundrecipient.socketId}`)
                }
                
            }}
    }
    catch(error){
        next(error)
    }
}

module.exports = createMessage