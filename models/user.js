const mongoose= require('mongoose');

const User= mongoose.Schema({
    username:String,
    avatar:String
})
module.exports = mongoose.model('user',User);