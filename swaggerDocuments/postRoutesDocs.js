const postPaths = {
    "/post":{
        post:{
            tags:['Post'],
            security:[
                {Bearer: []}
            ],
            description: 'Create posts on the platform',
            requestBody:{
                description: "payload of a created post",
                content:{
                    "application/json":
                        {schema:{
                            $ref: '#/components/schemas/CreatePost'}},
                    "application/x-www-form-urlencoded":
                        {schema:{
                            $ref: '#/components/schemas/CreatePost'}}},
                required: true},
            responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedPost'
                                    }
                                            }         
                        }
                        }
                ,
                '400':{
                    description: "fill in message"},
                },
                
            }
                    ,
    
        get:{               
            security:[
                {Bearer: []}
                    ],
            
            tags:['Post'],
            description: 'get your posts on the platform',                           
                responses:
                    {'200':{
                        description: "Successful operation",
                                    
                            content:
                                {"application/json":{
                                    schema:{
                                        $ref: '#/components/schemas/CreatedPost'
                                            }
                                                }         
                                }
                                    
                            },
                                
                    },
                                
                }
            },
    "/post/{postid}":{
        get:{
            tags:['Post'],
            security:[
                {Bearer: []}
                    ],
            description: 'get a post created on the platform',
            parameters:[
                {name: "postid",
                    in: "path",
                    description: 'post id to follow',
                    required: true,
                    schema:{
                        type: 'string',}}
                        ],
            responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedPost'
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
    "/post/{id}":{
        delete:{
                                                    
            security:[
                {Bearer: []}
            ],
            parameters:[
            {name: "id",
                in: "path",
                description: 'post id to delete',
                required: true,
                schema:{
                    type: 'string',}}
                    ],
            tags:['Post'],
            description: 'delete a post you created on the platform',
                                                   
                responses:
                    {'200':{
                        description: "Successful operation",
                        content:
                            {"application/json":{
                                schema:{
                                    $ref: '#/components/schemas/DeletedPost'
                                        }
                                                }         
                            }
                            } ,
                                                        
                                                        
                    },
                                                        
                    }
                },
    "post/search":{
        get:{
                                                            
            security:[
                {Bearer: []}
                    ], 
            parameters:[
                {name: "message",
                in: "query",
                description: 'content you like to use in filtering all posts',
                required: true,
                schema:{
                    type: 'string',}}
                    ],
                tags:['Post'],
                description: 'search for a post',
                responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedPost'
                                    }
                                            }         
                        }
                        },                                                                
                },
        }
    },
    "post/searchUser/{userid}":{
        get:{
                                                            
            security:[
                {Bearer: []}
                    ], 
            parameters:[
                {name: "message",
                in: "query",
                description: 'content you like to use in filtering all posts',
                required: true,
                schema:{
                    type: 'string',}},
                    {name: "userid",
                in: "path",
                description: "the user's id to which you want to filter posts by",
                required: true,
                schema:{
                    type: 'string',}}
                    ],
                tags:['Post'],
                description: 'search for a post created by a specific user',
                responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedPost'
                                    }
                                            }         
                        }
                        },                                                                
                },
        }
    },
    "post/likepost/{id}":{
        get:{
                                                            
            security:[
                {Bearer: []}
                    ], 
            parameters:[
                {name: "id",
                in: "path",
                description: 'id of post you want to like',
                required: true,
                schema:{
                    type: 'string',}}
                    ],
                tags:['Post'],
                description: 'like a post created',
                responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedPost'
                                    }
                                            }         
                        }
                        },                                                                
                },
        }
    },
    "post/postfeed":{
        get:{
                                                            
            security:[
                {Bearer: []}
                    ], 
                tags:['Post'],
                description: 'posts on your feed',
                responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedPost'
                                    }
                                            }         
                        }
                        },                                                                
                },
        }
    }
                            
                }

const postSwagSchema = {
    CreatePost:{
        type: 'object',
        properties:{
            message:{
                type: 'string',
                example: 'trying out my first post'}
                },
            },
    CreatedPost: {
        type: 'object',
        properties:{
               
            id:{
                type: 'string',
                example: 'n45tkrnmknm566kdf0'},
            userId:{
                type: 'string',
                example: 'n45tkrnmknm566kdf0'},
            message:{
                type: 'string',
                example: 'my first post'},
            comments:{
                    type: 'Array',
                    example: ['67i60hi60dhf74f488','djfiehrieh9f9eh']
                },
            like:{
                    type: 'Array',
                    example: ['67i60hi60dhf74f488','djfiehrieh9f9eh']
                }
                },
            
    },
   
         DeletedPost: {
        type : 'object',
        properties : {
            message : {
                type: 'string',
            example: 'post succesfully deleted'
            }
        }
    }
   
}


module.exports = {postPaths,postSwagSchema}