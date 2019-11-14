
const graphql_tools= require('graphql-tools')
const resolvers= require('./resolver')

//query chua nhung lenh ma minh muon tao
const typeDefs=`
    
    type Query{
        allMessage:[ListMessage]
        allRoom:[Room]
        allUser:[User]
        findUser(username:String!):[User]
        findRoom(input:RoomInput):[Room]
        allGlobalRoom(qty:Int,name:String):[GlobalMessage]
        RmvMbFrRoom(idUser:String!,idRoom:String!):[Room]
        EditRoom(idRoom:String!,roomName:String):[Room]
        ChangeHost:[Room]
    
    
    }
    type Room{
        _id:ID!
        room_name:String!
        host_name:String
        member:[User!]
    }
    type User{
        _id:ID!
        username:String
        avatar:String!
        isHost:Boolean
    }

    type Message{
        _id:ID!
        message:String!
        datetime:String!
    }
    type ListMessage{
        username:String!
        listmessage:[Message]
    }
    type MessageGlobal{
        username:User
        message:Message
    }
    type GlobalMessage{
        room_name:String
        message:[    
            MessageGlobal
        ]

    }
   
    input newMessage{
        username:String!
        listmessage:[
            MessageInput
        ]
    }
    input RoomInput{
        room_name:String!
        isPrivate:Boolean!
        hostName:String!
        password:String
        member:[UserInput]
        
    }
    input UserInput{
        username:String!
        avatar:String!
        isHost:Boolean=false
    }
    input MessageInput{
        message:String!
        datetime:String!
    }
    input MessageGlobalInput1{
        username:UserInput
        message:String
    }
    input MessageGlobalInput{
        room_name:String,
        message:[
            MessageGlobalInput1
        ]
    }
    
    
    type Mutation{
        createRoom(username:String,input: RoomInput):Room
        RemoveRoom(id:ID!):Room
        
        createUser(input:UserInput):User
        onChatGlobal(which_game:String!,input:
            
            MessageGlobalInput
            
        ):GlobalMessage
        onChat(input:newMessage):ListMessage
        onChatUpdate(name:String!,input:MessageInput):ListMessage
        onJoinRoom(roomName:String!,input:UserInput):Room
        createChatGlobal(input:MessageGlobalInput):GlobalMessage
    }
`;
const schema= graphql_tools.makeExecutableSchema({
    typeDefs,resolvers
});
module.exports = schema;
