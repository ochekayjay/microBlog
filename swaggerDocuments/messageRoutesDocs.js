

const messagePaths = {
    "/message":{
        post:{
            tags:['Messages'],
            security:[
                {bearerAuth: []}
            ],
            description: 'Create a message',
            requestBody:{
                description: "payload of a created message",
                content:{
                    "application/json":
                        {schema:{
                            $ref: '#/components/schemas/CreateMessage'}},
                    "application/x-www-form-urlencoded":
                        {schema:{
                            $ref: '#/components/schemas/CreateMessage'}}},
                required: true},
            responses:
                {'200':{
                    description: "Successful operation",
                    content:
                        {"application/json":{
                            schema:{
                                $ref: '#/components/schemas/CreatedMessage'
                                    }
                                            }         
                        }
                        }
                ,
                '400':{
                    description: "kindly fill in verified ids and names"},
                },
                
            }},

            "/message/getDm":{
                get:{
                    tags:['Messages'],
                    security:[
                        {bearerAuth: []}
                    ],
                    description: 'Get the chatIds for al the chats you have had with various people',
                   
                    responses:
                        {'200':{
                            description: "Successful operation",
                            content:
                                {"application/json":{
                                    schema:{
                                        $ref: '#/components/schemas/getChatIds'
                                            }
                                                    }         
                                }
                                }
                        ,
                        '400':{
                            description: "kindly fill in verified ids and names"},
                        },
                        
                    }},
                    "/message/{dmId}":{
                        get:{
                                                                    
                            security:[
                                {bearerAuth: []}
                            ],
                            parameters:[
                            {name: "dmId",
                                in: "path",
                                description: '_id value gotten from the getDm api',
                                required: true,
                                schema:{
                                    type: 'string',}}
                                    ],
                            tags:['Messages'],
                            description: 'Gives all the chat that exists between you and another person',
                                                                   
                                responses:
                                    {'200':{
                                        description: "Successful operation",
                                        content:
                                            {"application/json":{
                                                schema:{
                                                    $ref: '#/components/schemas/CreatedMessage'
                                                        }
                                                                }         
                                            }
                                            } ,
                                                                        
                                                                        
                                    },
                                                                        
                                    }
                                },
                                "/message/{id}":{
                                    delete:{
                                                                                
                                        security:[
                                            {bearerAuth: []}
                                        ],
                                        parameters:[
                                        {name: "id",
                                            in: "path",
                                            description: '_id of the message you want to delete',
                                            required: true,
                                            schema:{
                                                type: 'string',}}
                                                ],
                                        tags:['Messages'],
                                        description: 'Delete a message.',
                                                                               
                                            responses:
                                                {'200':{
                                                    description: "Successful operation",
                                                    content:
                                                        {"application/json":{
                                                            schema:{
                                                                $ref: '#/components/schemas/DeletedMessage'
                                                                    }
                                                                            }         
                                                        }
                                                        } ,
                                                                                    
                                                                                    
                                                },
                                                                                    
                                                }
                                            },
}




const messageSwagSchema = {
    CreateMessage:{
        type: 'object',
        properties:{
            senderId: {
                type: 'string',
                example: '98fu8frfue9dfdf'
            },
            receiverId: {
                type: 'string',
                example: '98dfdfdfwewe9dfdf'
            },
            senderName: {
                type: 'string',
                example: 'iyanu'
            },
            receiverName : {
                type: 'string',
                example: 'Isreal'
            },
            message: {
                type: 'string',
                example: 'Isreal how are you, this is iyanu.'
            },
                },
            },

    getChatIds : {
        type: 'object',
        properties : {
            _id : {
                type : 'string',
                example : 'dfj47y478548df84'
            },
            userIds : {
                type : 'array',
                example : ['4u8fdfd9uijeij9djc','dfhdf848dfuhef'],
            },
            userNames : {
                type : 'array',
                example : ['iyanu','Isreal'],
            } 
        },
    },
        
    DeletedMessage: {
        type: 'object',
        properties : {
            message : {
                type : 'string',
                example : 'message deleted succesfully.'
            }
        }
    },
    CreatedMessage : {
        type: 'object',
        properties:{
            id: {
                type: 'string',
                example : 'ajjije9fu3rjefdjfna'
            },
            chatId: {
                type: 'string',
                example : 'ajjije9fu3rjefdjfna'
            },
            senderId: {
                type: 'string',
                example: '98fu8frfue9dfdf'
            },
            receiverId: {
                type: 'string',
                example: '98dfdfdfwewe9dfdf'
            },
            senderName: {
                type: 'string',
                example: 'iyanu'
            },
            receiverName : {
                type: 'string',
                example: 'Isreal'
            },
            message: {
                type: 'string',
                example: 'Isreal how are you, this is iyanu.'
            },
                },
    }
}


module.exports = {messagePaths,messageSwagSchema}