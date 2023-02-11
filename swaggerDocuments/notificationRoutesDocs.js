const notif = {
    "/notifications":{
    get:{
        tags:['get'],
        security:[
            {bearerAuth: []}
                ],
        description: 'get all your notifications, tagged posts,comments etc. ',
        responses:
            {'200':{
                description: "Successful operation",
                content:
                    {"application/json":{
                        schema:{
                            $ref: '#/components/schemas/notifications'
                                }
                                        }         
                    }
                    }
                                        ,
            '400':{
                description: "no notifications"},
                                       
            },
                                        
            }
        },
    }

    const notificationSwagSchema = {
        notifications : {
            type: 'object',
        properties:{
               
            id:{
                type: 'string',
                example: 'n45tkrnmknm566kdf0'},
            userId:{
                type: 'string',
                example: 'n45tkrnmknm566kdf0'},
            postId:{
                type: 'object',
                example: {
                    _id: 'n45tkrnmknm566kdf0',
                    userId: 'n45tkrnmknm566kdf0',
                    message:'created this post',
                    comments: ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                    like : ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                    hidden : false
                }},
            commentId : {
                type: 'Array',
                example:[ {
                    _id: 'n45tkrnmknm566kdf0',
                    user: 'n45tkrnmknm566kdf0',
                    parent_post_id : 'n45tkrnmknm566kdf0',
                    message:'created this post',
                    child_Comments: ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                    parent_Comments : ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                    like : ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                    hidden : false
            },
            {
                _id: 'kgfg79966kdf0',
                user: 'mknm56sdserfdf0',
                parent_post_id : 'rkmvio9k0f0f0',
                message:'created this post',
                child_Comments: ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                parent_Comments : ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                like : ['67i60hi60dhf74f488','djfiehrieh9f9eh'],
                hidden : false
        }]},
     
            },
        }
    }

    module.exports = {notif,notificationSwagSchema}