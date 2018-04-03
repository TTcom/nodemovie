var  mongoose=require('mongoose')

var  Movieschema=require('../schemas/movie')

var Movie=mongoose.model('Movie',Movieschema)

module.exports = Movie
