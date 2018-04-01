var Movie=require('../models/movie')

exports.index=function(req,res){           //获取全部的电影
	//console.log('user in session:')
	//console.log(req.session.user)
		
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{       //启动的页面和数据的传递
			title:"movie 首页",
			movies:movies
		
	 })
  })
	
}
