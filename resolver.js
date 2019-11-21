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
      async getRoomByID(root,{idRoom}){
        return await Room.findById(idRoom);
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
        async EditRoom(root,{idRoom,newData}){
            return Room.findOneAndUpdate({"_id":idRoom},{$set:{"room_name":newData.roomName}})
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
            return User.findOne({"username":username}).then(async res=>{
              console.log(res)
               res.isHost=true
               // var userInfo={"username":username,avatar:"","_id":res._id};
                 return Room.findOneAndUpdate({"room_name":input.room_name},{$set:{"member":res,"host_name":res}},{upsert:true,'new': true}).then(async (f)=>{
                   
                   return {"data":f,"result":"OK"}
                 }).catch(err=>{
                   return {err,"result":"Fail"}
                 })
            })
          
          
              
            
        },
        async RemoveRoom(root,{id}){
           return Room.remove({"_id":id}).then(result=>{
             
             if(result.deletedCount >0)
               {
                 return {"statusCode":"200","result":"OK"}
               }
             else
               {
                 return {"statusCode":"400","result":"Fail"}
               }
               
           }).catch(err=>{
             return {"statusCode":"400","result":"Fail"}
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
            
            return Room.findOneAndUpdate({"room_name":roomName},{$push:{"member":input}},{
                upsert: true,
                new: true,
                runValidators: true,
                setDefaultsOnInsert: true,
                rawResult: true,
              },async (err,doc,res)=>{
                  if(doc.ok==1)
                  {
                      return {"join":"Success"}
                  }
                  else{
                      return {"join":"Fail"}
                  }
                //console.log(res);
            })
            
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