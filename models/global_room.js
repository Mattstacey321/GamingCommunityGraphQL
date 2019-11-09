const mongoose= require('mongoose')
const User=require('./user');
const Message= require('./message');
const globalRoom= mongoose.Schema({
    room_name:String,
    message:[{
        username:User.schema,
        message:String
    }]
})
module.exports= mongoose.model('GlobalRoom',globalRoom);