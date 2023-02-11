const { userPaths }  = require('./userRoutesDocs')
const { postPaths } = require('./postRoutesDocs')
const { commentPaths } = require('./commentRoutesDocs')
const { notif } = require('./notificationRoutesDocs')
const { messagePaths } = require('./messageRoutesDocs')
const swaggerSchema = require('./swaggerSchema')

const swaggerdocs = {
    openapi: '3.0.3',
    info: {
        title: "Swagger Petstore - OpenAPI 3.0" ,
  description: 
    "This is a sample Pet Store Server based on the OpenAPI 3.0 specification.  You can find out more about",
  
  contact: {
    email: "josephigoche777@gmail.com"}
},
servers:[
{url: " http://localhost:4000"},
{url : "https://petstore3.swagger.io/api/v3"}
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