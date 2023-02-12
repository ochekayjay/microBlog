const commentPaths = {
  
    "/comment/{parent}":{
        post:{
            tags:['Comment'],
            security:[
                {bearerAuth: []}
                    ],
            description: 'create a comment on the platform',
            parameters:[
                {name: "parent",
                    in: "path",
                    description: ' id to follow',
                    required: true,
                    schema:{
                        type: 'string',}},
                {name: "type",
                    in: "header",
                    description: 'comment to a direct post or a comment,{comment/post}',
                    required: true,
                    schema:{
                        type: 'string',}}
                        ],
                        requestBody:{
                            description: "payload of a created comment",
                            content:{
                                "application/json":
                                    {schema:{
                                        $ref: '#/components/schemas/CreateComment'}},
                                "application/x-www-form-urlencoded":
                                    {schema:{
                                        $ref: '#/components/schemas/CreateComment'}}},
                            required: true},
            responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedComment'
                                    }
                                            }         
                        }
                        }
                                            ,
                '400':{
                    description: "invalid postid/user"},
                                           
                },
                                            
                }
            },
    "/comment/{id}":{
        get:{
                                                    
            security:[
                {bearerAuth: []}
            ],
            parameters:[
            {name: "id",
                in: "path",
                description: 'id of the comment you are trying to load',
                required: true,
                schema:{
                    type: 'string',}}
                    ],
            tags:['Comment'],
            description: 'get a comment, its parent comment and post aswell',
                                                   
                responses:
                    {'200':{
                        description: "Successful operation",
                        content:
                            {"application/json":{
                                schema:{
                                    $ref: '#/components/schemas/DeletedComment'
                                        }
                                                }         
                            }
                            } ,
                                                        
                                                        
                    },
                                                        
                    }
                },
                "/comment/delete/{id}":{
                    delete:{
                                                                
                        security:[
                            {bearerAuth: []}
                        ],
                        parameters:[
                        {name: "id",
                            in: "path",
                            description: 'comment id to delete',
                            required: true,
                            schema:{
                                type: 'string',}}
                                ],
                        tags:['Comment'],
                        description: 'delete a comment you created on the platform',
                                                               
                            responses:
                                {'200':{
                                    description: "Successful operation",
                                    content:
                                        {"application/json":{
                                            schema:{
                                                $ref: '#/components/schemas/DeletedComment'
                                                    }
                                                            }         
                                        }
                                        } ,
                                                                    
                                                                    
                                },
                                                                    
                                }
                            },

    "/comment/like/{id}":{
        get:{
                                                            
            security:[
                {bearerAuth: []}
                    ], 
            parameters:[
                {name: "id",
                in: "path",
                description: 'id of comment you want to like',
                required: true,
                schema:{
                    type: 'string',}}
                    ],
                tags:['Comment'],
                description: 'like a comment created',
                responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedComment'
                                    }
                                            }         
                        }
                        },                                                                
                },
        }
    }
                            
                }

const commentSwagSchema = {
    CreateComment:{
        type: 'object',
        properties:{
            message:{
                type: 'string',
                example: 'trying out my first post'}
                },
            },
    CreatedComment: {
        type: 'object',
        properties:{
               
            id:{
                type: 'string',
                example: 'n45tkrnmknm566kdf0'},
            user:{
                type: 'string',
                example: 'n45tkrnmknm566kdf0'},
            parent_post_id:{
                type: 'string',
                example: '67i60hi60dhf74f488'
            },
            message:{
                type: 'string',
                example: 'my first post'},
            child_Comments:{type: 'Array',
            example: ['67i60hi60dhf74f488','djfiehrieh9f9eh']
            },
            parent_Comments:{type: 'Array',
            example: ['67i60hi60dhf74f488','djfiehrieh9f9eh']
            },
            like:{
                    type: 'Array',
                    example: ['67i60hi60dhf74f488','djfiehrieh9f9eh']
                }
                },
            
    },
   
         DeletedComment: {
        type : 'object',
        properties : {
            message : {
                type: 'string',
            example: 'comment succesfully deleted'
            }
        }
    }
   
}


module.exports = {commentPaths,commentSwagSchema}