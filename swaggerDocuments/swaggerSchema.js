const { userSwagSchema } = require('./userRoutesDocs')

module.exports = {
    components:{
        schemas:{
           ...userSwagSchema
    },
    securitySchemes:{
        BearerAuth:{
            type: "http",
            scheme: "bearer"
        }
    }
    }
}