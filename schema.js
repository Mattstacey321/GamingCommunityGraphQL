
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
        RmvMbFrRoom(type:String!,idUser:String,idRoom:String):Result
        EditRoom(idRoom:ID!,newData:RoomInput):Result
        ChangeHost:[Room]
        getRoomByUser(idUser:String,name:String):[Room]
        getRoomByID(idRoom:String):Room
        allRoomChat:[RoomChat]
        getRoomJoin(UserID:String):[RoomChat]
        onJoinRoomChat(id_room:String,id_user:String):Result

        onJoinRoom(id_room:String,id_user:String,pwd:String):Result
        addMember(id_room:String!,id_user:String!):Result
    }
    type Room{
        _id:ID!
        room_name:String!
        host_name:[User]
        isPrivate:Boolean
        password:String
        description:String
        member:[User!]
    }
    type User{
        _id:ID!
        username:String!
        avatar:String!
        isHost:Boolean
    }

    type Message{
        _id:ID
        IDUser:String
        text:String
        datetime:String
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
    type Result{
      data:Room
      status:String
      result:Boolean
    }
    type ResultCRUD{
        statusCode:String
        result:String
    }
    type RoomChat{
        _id:ID!
        id_room:String
        member:[User]
        messages:[
            Message
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
        isPrivate:Boolean
        host_name:[UserInput]
        password:String
        description:String
        member:[UserInput]
        
    }
    input UserInput{
        _id:ID
        username:String!
        avatar:String!
        isHost:Boolean
    }
    input MessageInput{
        IDUser:String
        text:String
        datetime:String
    }
    input MessageGlobalInput1{
        username:UserInput
        message:String
    }
    input MessageGlobalInput{
        room_name:String
        message:[
            MessageGlobalInput1
        ]
    }
    input RoomChatInput{
        
        id_room:String
        member:[
            UserInput
        ]
        messages:[
            MessageInput
        ]
    }
    
    
    
    type Mutation{
        createRoomChat(input:RoomChatInput):RoomChat
        createRoom(username:String,inputRoom:RoomChatInput,input: RoomInput,userInput:UserInput):Result
        RemoveRoom(id:ID!):ResultCRUD
        
        createUser(input:UserInput):User
        onChatGlobal(which_game:String!,input:
            
            MessageGlobalInput
            
        ):GlobalMessage
        onChat(input:newMessage):ListMessage
        onChatUpdate(name:String!,input:MessageInput):ListMessage
        onJoinRoom(roomName:String!,input:UserInput):Room
        createChatGlobal(input:
           MessageGlobalInput ):GlobalMessage
        
    }
`;
const schema= graphql_tools.makeExecutableSchema({
    typeDefs,resolvers
});
module.exports = schema;
