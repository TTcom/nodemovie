var  mongoose=require('mongoose')

var  Categeryschema=require('../schemas/categery')

var Categery=mongoose.model('Categery',Categeryschema)

module.exports = Categery
