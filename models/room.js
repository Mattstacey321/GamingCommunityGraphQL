const mongoose= require('mongoose');
const User= require('./user')
const Room= mongoose.Schema({
    //id:BigInt,
    
    room_name:String,
    member:[User.schema],

})
const roomList= mongoose.Schema({
    //id:BigInt,
    list:[Room]
})
module.exports= mongoose.model('roomList',Room);
