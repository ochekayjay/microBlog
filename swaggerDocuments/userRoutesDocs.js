const userPaths = {
    "/user/register":{
        post:{
            tags:['User'],
            description: 'Register on the platform',
            requestBody:{
                description: "create a user account",
                content:{
                    "application/json":
                        {schema:{
                            $ref: '#/components/schemas/User'}},
                    "application/x-www-form-urlencoded":
                        {schema:{
                            $ref: '#/components/schemas/User'}}},
                required: true},
            responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedUser'
                                    }
                                            }         
                        }
                        }
                ,
                '400':{
                    description: "Fill all fields"},
                '404':{
                    description: "Email already exists"},
                '405':{
                    description: "Username already exists"}

                },
                
            }
                    },
                    "/user/delete/{id}":{
                        delete:{
                            
                            security:[
                                {bearerAuth: []}
                            ],
                            parameters:[
                            {name: "id",
                                in: "path",
                                description: 'User id to delete',
                                required: true,
                                schema:{
                                    type: 'string',}}
                                    ],
                            tags:['User'],
                            description: 'delete your account from the platform',
                           
                            responses:
                                {'200':{
                                    description: "Successful operation",
                                    
                                        content:
                                        {"application/json":{
                                            schema:{
                                                $ref: '#/components/schemas/DeletedUser'
                                                    }
                                                            }         
                                        }
                                    
                                        }
                                ,
                                
                                },
                                
                            }
                                },
                                "/user/signin":{
                                    post:{
                                        tags:['User'],
                                        description: 'log into the platform',
                                        requestBody:{
                                            description: "create access to account",
                                            content:{
                                                "application/json":
                                                    {schema:{
                                                        $ref: '#/components/schemas/UserSignIn'}},
                                                "application/x-www-form-urlencoded":
                                                    {schema:{
                                                        $ref: '#/components/schemas/UserSignIn'}}},
                                            required: true},
                                        responses:
                                            {'200':{
                                                description: "Successful operation",
                                                content:
                                                    {"application/json":{
                                                        schema:{
                                                            $ref: '#/components/schemas/CreatedUser'
                                                                }
                                                                        }         
                                                    }
                                                    }
                                            ,
                                            '400':{
                                                description: "Fill all fields"},
                                            '404':{
                                                description: "Email already exists"},
                                            '405':{
                                                description: "Username already exists"}
                            
                                            },
                                            
                                        }
                                            },
                                            "/user/follow/{accId}":{
                                                get:{
                                                    
                                                    security:[
                                                        {bearerAuth: []}
                                                    ],
                                                    parameters:[
                                                    {name: "accId",
                                                        in: "path",
                                                        description: 'User id to follow',
                                                        required: true,
                                                        schema:{
                                                            type: 'string',}}
                                                            ],
                                                    tags:['User'],
                                                    description: 'follow a desired account from the platform',
                                                   
                                                    responses:
                                                        {'200':{
                                                            description: "Successful operation",
                                                            content:
                                                                {"application/json":{
                                                                    schema:{
                                                                        $ref: '#/components/schemas/CreatedUser'
                                                                            }
                                                                                    }         
                                                                }
                                                                }
                                                        ,
                                                        
                                                        
                                                        },
                                                        
                                                    }},
                                                    "/user/unfollow/{accId}":{
                                                        get:{
                                                            
                                                            security:[
                                                                {bearerAuth: []}
                                                            ], 
                                                            parameters:[
                                                                {name: "accId",
                                                                    in: "path",
                                                                    description: 'User id to unfollow',
                                                                    required: true,
                                                                    schema:{
                                                                        type: 'string',}}
                                                                        ],
                                                                tags:['User'],
                                                                description: 'unfollow a desired account from the platform',
                                                                responses:
                                                                {'200':{
                                                                    description: "Successful operation",
                                                                    content:
                                                                        {"application/json":{
                                                                            schema:{
                                                                                $ref: '#/components/schemas/CreatedUser'
                                                                                    }
                                                                                            }         
                                                                        }
                                                                        }
                                                                ,
                                                                
                                                                
                                                                },
                                                        }
                                                    }
                            
                }

const userSwagSchema = {
    User:{
        type: 'object',
        properties:{
               
            Username:{
            type: 'string',
            example: 'newComer'},
            name:{
                type: 'string',
                example: 'John'
                },
            Password:{
                    type: 'string',
                    example: 'abcdef'},
            Email:{
                type: 'string',
                example: 'joe@gmail.com'}
                },
            },
            UserSignIn:{
                type: 'object',
                properties:{
                       
                    Password:{
                            type: 'string',
                            example: 'abcdef'},
                    Email:{
                        type: 'string',
                        example: 'joe@gmail.com'}
                        },
                    },

    CreatedUser: {
        type: 'object',
        properties:{
               
            Username:{
            type: 'string',
            example: 'newComer'},
            name:{
                type: 'string',
                example: 'John'
                },
            Email:{
                type: 'string',
                example: 'joe@gmail.com'},
                Followerids:{
                    type: 'Array',
                    example: ['dbh3ghdhffdft568','djfiehrieh9f9eh']
                },
                Followingids:{
                    type: 'Array',
                    example: ['67i60hi60dhf74f488','djfiehrieh9f9eh']
                },
                chatIds:{
                    type: 'Array',
                    example: ['dbh3ghdhf74f488','dj45454ieh9f9eh']
                },
                socketId:{
                    type: 'string',
                    example: 'dbh3ghdhf74f488'
                }
                },
            
    },
   
         DeletedUser: {
        type : 'object',
        properties : {
            message : {
                type: 'string',
            example: 'User succesfully deleted'
            }
        }
    }
   
}


module.exports = {userPaths,userSwagSchema}