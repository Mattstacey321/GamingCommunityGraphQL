const mongoose= require('mongoose');

const User= mongoose.Schema({
    username:String,
    avatar:String,
    isHost:{
      type:Boolean,
      default: false
    },
})
module.exports = mongoose.model('user',User);