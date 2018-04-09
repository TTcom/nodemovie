

var Movie=require('../models/movie')
var Comment=require('../models/comment')
var Categery=require('../models/categery')
var _=require('underscore')   //Underscore 是一个 JavaScript 工具库，它提供了一整套函数式编程的实用功能
var fs=require('fs');
var path=require('path')

//detail page
exports.detail=function(req,res){      //更新电影	
	
	var id= req.params.id    
	Movie.update({_id:id},{$inc:{pv:1}},function(err){
		if(err){
			console.log(err)
		}
		
		
	});
	Movie.findById(id,function(err,movie){        //根据id获取电影数据
		Comment
		  .find({movie:id})    //查找与movieid匹配的movie的对象，先找到与movieid相同的Comment
		  .populate('from','name')   //在user中查找与form相同的name，然后在筛选与from相同的userid fromid就是指userid 并将其中的对象和id转为from
		  .populate('reply.from','name')
		  .populate('reply.to','name')
		  .exec(function(err,comments){     //将符合条件的comments插入
			res.render('detail',{
				title:"movie 详情页"+movie.title,
				movie:movie,
				comments:comments
				
			})
       })
	})
	
}

//adimin new
exports.new=function(req,res){     
	
	Categery.find({},function(err,categeries){
		
	res.render('admin',{
		title:"movie 后台录入页",
		categeries:categeries,
		movie:{}
	  })
	})
}

// admin update movie
exports.update=function(req,res){       //修改电影
	var id=req.params.id
	if(id){
		
		Movie.findById(id,function(err,movie){
		Categery.find({},function(err,categeries){
			res.render('admin',{
				title:'movie 后台更新页',
				movie:movie,
				categeries:categeries
			})
		})
	  })
	}
};
//savePoster
exports.savePoster=function (req,res,next) {        
	
	var posterData=req.files.uploadPoster;
	var filepath=posterData.path;
	var originalFilename=posterData.originalFilename;

	if(originalFilename){
		fs.readFile(filepath,function(err,data){
			
		 var timestamp=Date.now();
		 var type=posterData.type.split('/')[1];
		 var poster=timestamp +'.'+ type;
		 var newPath=path.join(__dirname, '../../', '/public/upload/' +poster)
		 
		 fs.writeFile(newPath,data,function(err){
		 	req.poster=poster;
		 	next();
		 })
			
		})
	}else{
		next()
		}
	
}
   // admin post movie
exports.save=function (req,res) {        //录入电影数据
    console.log(req.body);
    var id = req.body.movie._id;
    var movieObj =req.body.movie;
    var _movie;
    
    if(req.poster){
    	movieObj.poster=req.poster
    }
    if(id){
   
        Movie.findById(id,function (err, movie) {
            if (err){
                console.log(err)
            }
            _movie=_.extend(movie,movieObj);       //复制movieObj对象中的所有属性覆盖到movie对象上，并且返回 movie 对象.
           
             var categeryId=_movie.categery;
              var namer=_movie.categeryname;
		Categery
		    .find({name:namer})
		    .exec(function(err,categeries){
              	console.log(categeries);console.log(categeries[0]._id)
              	var ttid=categeries[0]._id;
              	if(categeries._id!=_movie.categery){
              		 Categery.update({_id:categeries[0]._id},{$pull:{"movies":_movie._id}},function (err, categery) { //更新删除数组中的某条数据
              		 	
              		 	if(err){
              		 		console.log(err);
              		 	}
			            Categery.findById(categeryId,function(err,categery){
			               	
			            	   categery.movies.push(_movie._id)
			            	    	categery.save(function(err,categery){
				          _movie.categeryname=categery.name;
			            	
				             _movie.save(function (err, movie) {
				                if(err){
				                    console.log(err)
				                }
				                res.redirect('/movie/'+movie._id);
				            })
              		   });
              		 })
              		 }) 
              	}else{
              		
		             _movie.save(function (err, movie) {
		                if(err){
		                    console.log(err)
		                }
		                res.redirect('/movie/'+movie._id);
		            })
		              		
              		
              	}
                
                	
                	
              })
        })
    }else {

        _movie=new Movie(movieObj);
        
        var categeryId=_movie.categery;
        var categeryName=movieObj.categeryName;
      
        _movie.save(function (err, movie) {
            if(err){
                console.log(err)
            }
   
           if(categeryId) {
           	
            Categery.findById(categeryId,function(err,categery){
            	categery.movies.push(movie._id)
            	categery.save(function(err,categery){
           	 	   movie.categeryname=categery.name;
           	 	  
           	 	   movie.save(function(err,movie){   //存入电影
           	 	   	res.redirect('/movie/'+movie._id);
           	 	   })
            	})
            })
            
           
           }else if(categeryName){
           	 var categery=new Categery({
           	 	name:categeryName,
           	 	movies:[movie._id]
           	 })
           	 categery.save(function(err,categery){   //存入分类
          	 	   movie.categery=categery._id;
           	 	   movie.categeryname=categery.name;
           	 	   
           	 	   movie.save(function(err,movie){   //存入电影
           	 	   	res.redirect('/movie/'+movie._id);
           	 	   })
            		
            	})
           }
        })
    }
};

exports.list=function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
	res.render('list',{
		title:"movie 列表页",
		movies:movies
	  })
	})
	
	
}
//list delete
exports.del=function (req, res) {          //电影删除
    var id=req.query.id;
    if(id){
        Movie.remove({_id:id},function (err, movie) {
            if(err){
                console.log(err)
            }else {
                res.json({success:1})
            }
        })
    }
}