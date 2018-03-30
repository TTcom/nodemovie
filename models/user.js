var  mongoose=require('mongoose')

var  Userschema=require('../schemas/user')

var User=mongoose.model('User',Userschema)  //创建User模型

module.exports = User
