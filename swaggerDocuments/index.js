const { userPaths }  = require('./userRoutesDocs')
const { postPaths } = require('./postRoutesDocs')
const { commentPaths } = require('./commentRoutesDocs')
const { notif } = require('./notificationRoutesDocs')
const { messagePaths } = require('./messageRoutesDocs')
const swaggerSchema = require('./swaggerSchema')

const swaggerdocs = {
    openapi: '3.0.3',
    info: {
        title: "Swagger mini-Blog&LiveChat App - OpenAPI 3.0" ,
  description: 
    "This application helps you interact with different people on the platform, you follow them, make posts, react to their posts by liking, disliking, tagging, notifications are sent in real time. It also comes with a chat section, where you can send dms to anyone provided you have the necessary data. The messages aswell are sent in real time and stored if the recipient of the message is offline. Since swagger-ui has the structural incapacity to sustain Stateless connection, i made a documentation on the stateless connections as regards getting dms and notifications in real time    'https://github.com/ochekayjay/microBlog'   ",
  
  contact: {
    email: "josephigoche777@gmail.com"}
},
servers:[
{url : "https://livechat-1iyd.onrender.com"},
{url: " http://localhost:4000"}
]
  ,
tags: [
    {name: "User",
description: "Everything about signing-in and signing-up as a user, deleting an account, following and unfollowing an account"},
{name: "Post",
description: "Includes creating, deleting, liking, unliking, get a post or posts"},
{name: "Comment",
description: "Includes creating, deleting, liking, unliking, get a comment or comments"},
{name: "Messages",
description: "Includes getting,sending and deleting messages to a particular end user."},
{name: "Notifications",
description: "Includes getting notified when your post is liked,commented on or you ate tagged on a post or comment."}
],

paths: {
  ...userPaths,
  ...postPaths,
  ...commentPaths,
  ...notif,
  ...messagePaths

},
...swaggerSchema
}

module.exports = swaggerdocs