const Message = require('./models/message');
const Room = require('./models/room')
const User = require('./models/user')
const GlobalRoom = require('./models/global_room');
const RoomChat = require('./models/chat_room')
const ListGame= require('./models/list_game');
module.exports = resolvers = {
    Query: {
        async allMessage() {
            return await Message.find();
        },
        async allRoom() {
            return await Room.find();
        },
        async allRoomChat(){
            return await RoomChat.find();
        },
        async allUser() {
            return await User.find();
        },
        async findRoom(root, { name }) {
            return await Room.find({ "room_name": name });
        },
        async getRoomByID(root, { idRoom }) {
            return await Room.findOne({"_id":idRoom});
        },

        async allGlobalRoom(root, { qty, name }) {

            if (qty == 0 || null) {
                return await GlobalRoom.find();
            }
            else {
                return await GlobalRoom.find({ "room_name": name });
            }
        },
        async findUser(root, { username }) {
            return await User.find({ "username": username }, (err, res) => {
                console.log(res);
                console.log(res[0]._id)

            });
        },
        async RmvMbFrRoom(root, {type ,idUser, idRoom }) {
            if(type == "all"){
                //removeAllMemberExceptHost
                return Room.updateMany({"_id":idRoom},{$pull:{"member":{"member.$[].isHost":false}}},{multi:true},(err,raw)=>{
                    console.log("raw "+raw);

                }).then(value=>{

                    return {"data":value,"result":true}
                }).catch(err=>{
                    return {"data":err,"result":false}
                });
            }else if(type == "once")
            {
                //remove specify member
                return Room.findOneAndUpdate({_id:idRoom}, { $pull: { "member": {"_id":{$in:[idUser]}} } },{rawResult:true}).then(value=>{
                    console.log(value);
                    if(value){return {"data":value,"result":true}}
                }).catch(err=>{
                    console.log("err "+err);
                    
                    return { err, "result": false }});
            }
            
        },
        async EditRoom(root, { idRoom, newData }) {
            return Room.findOneAndUpdate({ "_id": idRoom }, { $set: { "room_name": newData.room_name, "isPrivate": newData.isPrivate, "password": newData.password, "description": newData.description } }, { upsert: true, 'new': true }).then(res => {
                return { "data": res, "result": true }
            }).catch(err => {
                return { err, "result": false }
            })
        },
        async ChangeHost(root, { }) {

        },
        async getRoomByUser(root, { idUser, name }) {
            return Room.aggregate([{ $match: { "host_name.username": name } }], (err, res) => {

            })
        },
        async getRoomJoin(root,{UserID}){
            return Room.find(
                {"member._id":UserID},)
        },
        async onJoinRoomChat(root,{id_room,id_user}){
            return User.findById(id_user).then( async v=>{
                return RoomChat.findOneAndUpdate({"id_room":id_room},{$push:{member:v}},{upsert:true,new:true}).then(value=>{
                    console.log(value)
                    return {"data":value,"result": true };
                }).catch(err=>{
                    return {"data":err,"result": false};
                })
        })
        },
        async onJoinRoom(root,{id_room,id_user,pwd}){
            return Room.findById(id_room).then(async value=>{
                
                if(value.isPrivate==true && value.password == pwd){
                    return User.findById(id_user).then(async res=>{
                        return RoomChat.findByIdAndUpdate({"id_room":id_room},{$push:{"member":res}},{upsert:true,new:true}).then(v=>{
                          return Room.findByIdAndUpdate(id_room,{$push:{"member":res}},{upsert:true,new:true},(err,res)=>{
                        }).then(val=>{
                            return  { "data": val, "result": true };
                        }).catch(err=>{
                            return { "data": err, "result": false };
                        })
                      });   
                    })
                }
                else if(value.password != pwd){
                    return { "status": "Wrong password", "result": false };
                }
                else{
                    return User.findById(id_user).then(async res=>{
                        return RoomChat.findOneAndUpdate({"id_room":id_room},{$push:{"member":res}},{upsert:true,new:true}).then(v=>{
                          return Room.findByIdAndUpdate(id_room,{$push:{"member":res}},{upsert:true,new:true},(err,res)=>{
                        }).then(val=>{
                            return  { "data": val, "result": true };
                        }).catch(err=>{
                            return { "data": err, "result": false };
                        })
                      });   
                    })
                }
                
            })
            
    
        },
        async addMember(root,{id_room,id_user}){
            return User.findById(id_user).then(value=>{
                return Room.findByIdAndUpdate(id_room,{$push:{member:value}},{upsert:true,new:true}).then(result=>{
                    console.log(result);
                    if(value){return {"data":result,"result":true}}
                }).catch(err=>{return {"data":err,"result":false}})
            })
                
        },
        
        async onChatGroup(root,{id_room,chat_message}){
            
            return RoomChat.findOneAndUpdate({"id_room":id_room},{$push:{messages:chat_message}}).then(v=>{
              return v;
                //console.log(v.messages[0].time);
            })
            /*return RoomChat.findByIdAndUpdate(id_room,{$push:{messages:chat_message}},{upsert:true,new:true}).then(result=>{
                console.log(result);
                return {"data":result,"result":true}
            }).catch(err=>{return {"data":err,"result":false}});*/
        },
        async getAllMessage(root,{id_room,sl}){
          
            return RoomChat.findOne({"id_room":id_room}).then(result=>{
                return result
            })
        },
       async findRoomByName(root,{room_name}){
            return Room.find({"room_name":{'$regex': room_name,$options:'i'}});
        },
        async getListGame(root,{input}){
            //return ListGame.create(input);
            return await ListGame.find();
        }
    },
    Mutation: {
        
       /* async createRoom(root,{
            input,username
        }){
            Room.create(input);
            
            User.findOne({"username":username},async (err,res)=>{
                await Room.findOneAndUpdate({"room_name":input.room_name},{$push:{"member":res}},{upsert:true});
            });
        },*/
        async createGame(root,{input}){
            return ListGame.create(input).then((value)=>{
                return value;
            });
        }
        ,
        async RemoveRoom(root,{id}){
            Room.deleteOne({"_id":id});
        },
        async createRoom(root, {inputRoom,
            input, username
        }) {
            return RoomChat.create(inputRoom).then((value)=>{
                console.log("RoomChat _id"+value._id);
                return User.findOne({ "username": username }).then(async res => {
                    console.log(res)
                    res.isHost = true
                    
                    // var userInfo={"username":username,avatar:"","_id":res._id};
                    return Room.findOneAndUpdate({ "room_name": input.room_name }, { $set: { "member": res, "host_name": res, "password": input.password, "isPrivate": input.isPrivate, "description": input.description } }, { upsert: true, 'new': true }).then(async (f) => {
                        console.log("Room find one update: "+ f._id);
                         return RoomChat.findOneAndUpdate({"_id":value._id},{$set:{"member":res,"id_room":f._id}},{rawResult: true,new:true}).then((doc)=>{
                             console.log(doc);
                             if(doc.ok){
                                return { "id_room":f._id, "result": true }
                             }
                             else
                             {
                                return { "id_room":"", "result": false }
                             }
                         })
                            
      
                    }).catch(err => {
                        return { err, "result": false }
                    })
                })
            });
            
            
        },
        async RemoveRoom(root, { id }) {
            return Room.remove({ "_id": id }).then(result => {

                if (result.deletedCount > 0) {
                    return { "statusCode": "200", "result": true }
                }
                else {
                    return { "statusCode": "400", "result": false }
                }

            }).catch(err => {
                return { "statusCode": "400", "result": false }
            });

        },
        async createUser(root, {
            input
        }) {
            return await User.create(input);
        },
        async onChat(root, { input }) {
            return await Message.create(input);
        },
        async onChatUpdate(root, { name, input }) {
            /*Message.findOne({username:name},async (err,docs)=>{
                     if(docs)
                     {
                         console.log(docs);
                         return await Message.updateOne({username:name},{$set:{input}});
                     }
                     else return await Message.create(input);
                     
                 })*/
            Message.findOneAndUpdate({ username: name }, { $push: { "listmessage": input } }, { upsert: true }, async (err, doc, res) => {
            })
            return Message;
        },
        async onJoinRoom(root, { roomName, input }) {

            return Room.findOneAndUpdate({ "room_name": roomName }, { $push: { "member": input } }, {
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                rawResult: true,
            }, async (err, doc, res) => {
                if (doc.ok == 1) {
                    return { "join": "Success" }
                }
                else {
                    return { "join": "Fail" }
                }
                //console.log(res);
            })

        },
        async onChatGlobal({ name, input }) {
            GlobalRoom.findOneAndUpdate({ room_name: name }, { $push: { message: input } }, { upsert: true, rawResult: true }, (err, doc) => {
                console.log(doc.ok);
            })
        },
        async createChatGlobal(root, { input }) {
            return await GlobalRoom.create(input);
        },
        


    }

};