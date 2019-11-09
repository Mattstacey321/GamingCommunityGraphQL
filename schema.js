
const graphql_tools= require('graphql-tools')
const resolvers= require('./resolver')

//query chua nhung lenh ma minh muon tao
const typeDefs=`
    
    type Query{
        allMessage:[ListMessage]
        allRoom:[Room]
        allUser:[User]
        findRoom(input:RoomInput):[Room]
        allGlobalRoom(qty:Int,name:String):[GlobalMessage]
    }
    type Room{
        _id:ID!
        room_name:String!
        host_name:User
        member:[User!]
    }
    type User{
        _id:ID!
        username:String!
        avatar:String!
    }

    type Message{
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
        password:String
        member:[UserInput]
    }
    input UserInput{
        username:String!
        avatar:String!
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
        createRoom(input: RoomInput):Room
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
