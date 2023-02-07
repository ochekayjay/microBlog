const { userSwagSchema } = require('./userRoutesDocs')
const { postSwagSchema } = require('./postRoutesDocs')
const { commentSwagSchema } = require('./commentRoutesDocs')
module.exports = {
    components:{
        schemas:{
           ...userSwagSchema,
           ...postSwagSchema,
           ...commentSwagSchema
    },
    securitySchemes:{
        BearerAuth:{
            type: "http",
            scheme: "bearer"
        }
    }
    }
}