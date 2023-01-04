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
{url: "https://petstore3.swagger.io/api/v3"},
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
description: "Includes getting,sending and deleting messages to a particular end user."}
],


}