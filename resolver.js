const Message= require('./models/message');
const Room= require('./models/room')
const User= require('./models/user')
const GlobalRoom= require('./models/global_room');
module.exports= resolvers= {
    Query:{
        async allMessage(){
            return await Message.find();
        },
        async allRoom(){
            return await Room.find();
        },
        async allUser(){
            return await User.find();
        },
        async findRoom(root,{name}){
            return await Room.find({"room_name":name});
        },
        async allGlobalRoom(root,{qty,name}){
            
            if(qty ==0 || null)
            {
                return await GlobalRoom.find();
            }
            else
            {
                return await GlobalRoom.find({"room_name":name});
            }
        },
        async findUser(root, {username}){
            return await User.find({"username":username},(err,res)=>{
                console.log(res);
                console.log(res[0]._id)
                
            });
        },
        async RmvMbFrRoom(root,{idUser,idRoom}){
            return Room.updateOne({"_id":idRoom},{$pull:{"member":{"_id":idUser}}});
        },
        async EditRoom(root,{idRoom,roomName}){
            return Room.findOneAndUpdate({"_id":idRoom},{$set:{"room_name":roomName}})
        },
        async ChangeHost(root,{}){
            
        },
        async getRoomByUser(root,{idUser,name}){
            return Room.aggregate([{$match:{"host_name.username":name}}],(err,res)=>{
                
            })
        }
        

    },
    Mutation:{
        async createRoom(root,{
            input,username
        }){
            Room.create(input);
            
            User.findOne({"username":username},async (err,res)=>{
              co
               // var userInfo={"username":username,avatar:"","_id":res._id};
                return await Room.findOneAndUpdate({"room_name":input.room_name},{$push:{"member":res,"host_name":res}},(err,res)=>{
                  console.log(res)
                });
            });
        },
        async RemoveRoom(root,{id}){
           Room.deleteOne({"_id":id}).then((result)=>{
               return result.ok
           });
        },
        async createUser(root,{
            input
        }){
            return await User.create(input);
        },
        async onChat(root,{input}){
            return await Message.create(input);
        },
        async onChatUpdate(root,{name,input}){
       /*Message.findOne({username:name},async (err,docs)=>{
                if(docs)
                {
                    console.log(docs);
                    return await Message.updateOne({username:name},{$set:{input}});
                }
                else return await Message.create(input);
                
            })*/
            Message.findOneAndUpdate({username:name},{$push:{"listmessage":input}},{upsert:true},async (err,doc,res)=>{   
            })
            return await Message;
        },
        async onJoinRoom(root,{roomName,input}){
            var val;
            Room.findOneAndUpdate({"room_name":roomName},{$push:{"member":input}},{
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                rawResult: true,
              },async (err,doc,res)=>{
                  if(doc.ok==1)
                  {
                      val=1;
                  }
                  else{
                      val=0;
                  }
                //console.log(res);
            })
            return await Room;
        },
        async onChatGlobal({name,input}){
            GlobalRoom.findOneAndUpdate({room_name:name},{$push:{message:input}},{upsert:true,rawResult:true},(err,doc)=>{
                console.log(doc.ok);
            })
        },
        async createChatGlobal(root,{input}){
            return await GlobalRoom.create(input);
        }

        
    }
    
};