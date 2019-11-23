
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
<<<<<<< HEAD
        EditRoom(idRoom:ID!,newData:RoomInput):Result
        ChangeHost:[Room]
        getRoomByUser(idUser:String,name:String):[Room]
        getRoomByID(idRoom:String):Room
        allRoomChat:[RoomChat]
=======
        EditRoom(idRoom:String!,roomName:String):[Room]
        ChangeHost:[Room]
    
    
>>>>>>> 79b34f911cb7cafe1cffafde6ff1d64ca75c96d9
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
<<<<<<< HEAD
        _id:ID
        IDUser:String
        text:String
        datetime:String
=======
        _id:ID!
        message:String!
        datetime:String!
>>>>>>> 79b34f911cb7cafe1cffafde6ff1d64ca75c96d9
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
<<<<<<< HEAD
        isPrivate:Boolean
        host_name:[UserInput]
=======
        isPrivate:Boolean!
        hostName:String!
>>>>>>> 79b34f911cb7cafe1cffafde6ff1d64ca75c96d9
        password:String
        description:String
        member:[UserInput]
        
    }
    input UserInput{
        _id:ID
        username:String!
        avatar:String!
<<<<<<< HEAD
        isHost:Boolean
=======
        isHost:Boolean=false
>>>>>>> 79b34f911cb7cafe1cffafde6ff1d64ca75c96d9
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
<<<<<<< HEAD
        createRoomChat(input:RoomChatInput):RoomChat
        createRoom(username:String,inputRoom:RoomChatInput,input: RoomInput,userInput:UserInput):Result
        RemoveRoom(id:ID!):ResultCRUD
=======
        createRoom(username:String,input: RoomInput):Room
        RemoveRoom(id:ID!):Room
>>>>>>> 79b34f911cb7cafe1cffafde6ff1d64ca75c96d9
        
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
