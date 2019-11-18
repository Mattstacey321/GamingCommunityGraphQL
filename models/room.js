const mongoose= require('mongoose');
const User= require('./user')
const Room= mongoose.Schema({
    //id:BigInt,
    room_name:String,
    isPrivate:Boolean,
    host_name:[User.schema],
    member:[User.schema],

})
const roomList= mongoose.Schema({
    //id:BigInt,
    list:[Room]
})
module.exports= mongoose.model('roomList',Room);
