const mongoose= require('mongoose');
const User= require('./user');
const roomChat= mongoose.Schema({
    id_room:String,
    member:[User.schema],
    messages:[
        {
            IDUser:String,
            text:String,
            time:Date
        }   
    ]
})
module.exports= mongoose.model('roomChat',roomChat);