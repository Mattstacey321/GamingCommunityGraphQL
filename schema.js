
const graphql_tools= require('graphql-tools')
const resolvers= require('./resolver')
const { GraphQLUpload } = require('graphql-upload');


//query chua nhung lenh ma minh muon tao
const typeDefs=`
    scalar Upload
    type Query{
        allMessage:[ListMessage]
        allRoom:[Room]
        allUser:[User]
        allGlobalRoom(qty:Int,name:String):[GlobalMessage]
        RmvMbFrRoom(type:String!,idUser:String,idRoom:String):Result
        EditRoom(idRoom:ID!,newData:RoomInput):Result
        ChangeHost(oldHost:String!,newHost:String!):[Room]
        getRoomByUser(idUser:String,name:String):[Room]
        allRoomChat:[RoomChat]
        getRoomJoin(UserID:String):[Room]
        onJoinRoomChat(id_room:String,id_user:String):JoinRoomResult
        addMember(id_room:String!,id_user:String!):Result
        onChatGroup(id_room:String!,chat_message:MessageInput):Result
        getAllMessage(id_room:String!):RoomChat
        findRoomByName(room_name:String!):[Room]
        getListGame(limit:Int):[Game]
    }
    type Room{
        _id:ID!
        room_name:String!
        id_user:String
        isPrivate:Boolean
        password:String
        description:String
        member:[String]
    }
    type Game{
        _id:ID
        game_name:String
        genres:[String]
        platforms:[String]
        popularity:String
        logo:String
        image:[String]
    }
    type User{
        _id:ID!
        username:String!
        avatar:String!
        isHost:Boolean
    }

    type Message{
        _id:ID
        id_user:String
        text:String
        image:String
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
    type CreateResult{
            id_room:String
            result:Boolean
    }
    
    type JoinRoomResult{
        data:RoomChat
        statusCode:String
        result:Boolean
    }
    type RoomChat{
        _id:ID!
        id_room:String
        member:[String]
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
        _id:ID
        room_name:String!
        isPrivate:Boolean
        id_user:String
        password:String
        description:String
        member:[String]
        
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
    input GameInput{
        _id:ID
        game_name:String
        genres:[String]
        platforms:[String]
        popularity:String
        tag:[String]
        logo:String
        image:[String]
    }
    
    
    
    type Mutation{
        createGame(input:GameInput):Game
        createRoomChat(input:RoomChatInput):RoomChat
        createRoom(userID:String,chatInput:RoomChatInput,roomInput: RoomInput):CreateResult
        RemoveRoom(id:ID!):ResultCRUD
        
        createUser(input:UserInput):User
        onChatGlobal(which_game:String!,input:
            
            MessageGlobalInput
            
        ):GlobalMessage
        onChat(input:newMessage):ListMessage
        onChatUpdate(name:String!,input:MessageInput):ListMessage
        onJoinRoom(id_room:String!,id_user:String):JoinRoomResult
        createChatGlobal(input:
           MessageGlobalInput ):GlobalMessage
        uploadImage(name: String!, file: Upload!): Boolean

    }
`;
//uploadImage(name: String!, file: Upload!): Boolean
const schema= graphql_tools.makeExecutableSchema({
 
    /*typeDefs,resolvers:{
        Upload: GraphQLUpload,  
    },*/
    typeDefs,resolvers
});
module.exports = schema;
