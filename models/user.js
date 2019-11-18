const mongoose= require('mongoose');

const User= mongoose.Schema({
    username:String,
    avatar:String,
    isHost:Boolean
})
module.exports = mongoose.model('user',User);