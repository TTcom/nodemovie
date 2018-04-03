var Movie=require('../models/movie')
var Categery=require('../models/categery')
exports.index=function(req,res){           //获取全部的电影
  Categery
    .find({})
    .populate({path:'movies', options:{limit:5}})
    .exec(function(err,categeries){
    	  if(err){
    	  	console.log(err)
    	  }
    })
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{       //启动的页面和数据的传递
			title:"movie 首页",
			categeries:categeries
		
	 })
  })
	
}
