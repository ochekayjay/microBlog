const { userSwagSchema } = require('./userRoutesDocs')
const { postSwagSchema } = require('./postRoutesDocs')
const { commentSwagSchema } = require('./commentRoutesDocs')
const { notificationSwagSchema } = require('./notificationRoutesDocs')
const { messageSwagSchema } = require('./messageRoutesDocs')
module.exports = {
    components:{
        schemas:{
           ...userSwagSchema,
           ...postSwagSchema,
           ...commentSwagSchema,
           ...notificationSwagSchema,
           ...messageSwagSchema
    },
    securitySchemes:{
        bearerAuth:{
            type: "http",
            bearerFormat: "JWT",
            scheme: "bearer"
        }
    }
    }
}