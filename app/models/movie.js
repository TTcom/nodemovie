var  mongoose=require('mongoose')

var  movieschema=require('../schemas/movie')

var movie=mongoose.model('movie',movieschema)

module.exports = movie
