const userSchema = require('../models/userSchema')

class socketClass {
    
    connection(client) {
      // event fired after user signs in succesfully
      client.on("addSocketid", async function(userId){
        console.log('inside socket')
        try{
           const userData = await userSchema.findByIdAndUpdate(userId,{
            $set:{socketId:client.id}
          },{upsert:true,new:true})
  
          console.log(userData)
        }
        catch(error){
          console.log(error)
        }
        
        
      });


      // event fired when the chat room is disconnected
      client.on("disconnect", async function(userId){
        console.log('inside socket')
        try{
           const userData = await userSchema.findByIdAndUpdate(userId,{
            $set:{socketId:null}
          },{upsert:true})
  
          global.io.broadcast.emit('disconnectedChat', `${userData.socketId} is disconnected from chat`)
          console.log(userData)
        }
        catch(error){
          console.log(error)
        }
        
        
      });
      // add identity of user mapped to the socket id
      client.on("identity", (userId) => {
        this.users.push({
          socketId: client.id,
          userId: userId,
        });
      });
      // subscribe person to chat & other user as well
      client.on("subscribe", (room, otherUserId = "") => {
        this.subscribeOtherUser(room, otherUserId);
        client.join(room);
      });
      // mute a chat room
      client.on("unsubscribe", (room) => {
        client.leave(room);
      });
    }
  
    subscribeOtherUser(room, otherUserId) {
      const userSockets = this.users.filter(
        (user) => user.userId === otherUserId
      );
      userSockets.map((userInfo) => {
        const socketConn = global.io.sockets.connected(userInfo.socketId);
        if (socketConn) {
          socketConn.join(room);
        }
      });
    }
  }
  
  module.exports =  new socketClass();