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
   
			Movie.fetch(function(err,movies){
				if(err){
					console.log(err)
				}
				res.render('index',{       //启动的页面和数据的传递
					title:"movie 首页",
					categeries:categeries
				
			 })
		  })
	 })
}
// search
exports.search=function(req,res){           //获取全部的电影
	

	var catId=req.query.cat;
	var q	=req.query.q;
	var count=2;
	var page=parseInt(req.query.p,10) || 0;
	var index=page * count;  //查询起始条数数据
	if(catId)	{
		Categery
		    .find({_id:catId})
		    .populate({path:'movies'})
		    .exec(function(err,categeries){
		    	  if(err){
		    	  	console.log(err)
		    	  }
		         var categery=categeries[0] || {};  
		         var movies=categery.movies || [];  
		         var results=movies.slice(index,index+count);
						res.render('results',{     
							title:"movie 结果列表页",
							keyword:categery.name,
							currentPage:(page+1),
							query:'cat='+catId,
							totalPage:Math.ceil(movies.length/count),
							movies:results
					 })
			 })
		 }else{
			  Movie
			    .find({title:new RegExp(q+ '.*','i')})
			    .exec(function(err,movies){
			    	
		    	  if(err){
		    	  	console.log(err)
		    	  }
		        
		         var results=movies.slice(index,index+count);
						res.render('results',{     
							title:"movie 结果列表页",
							keyword:q,
							currentPage:(page+1),
							query:'q='+q,
							totalPage:Math.ceil(movies.length/count),
							movies:results
					 })
			    	
			    })
		 	
		 	
		 }
}
