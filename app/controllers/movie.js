

var Movie=require('../models/movie')
var Comment=require('../models/comment')
var _=require('underscore')

//detail page
exports.detail=function(req,res){      //更新电影	
	
	var id= req.params.id                        
	Movie.findById(id,function(err,movie){        //根据id获取电影数据
		Comment
		  .find({movie:id})    //查找与movieid匹配的movie的对象，先找到与movieid相同的Comment
		  .populate('from','name')   //在user中查找与form相同的name，然后在筛选与from相同的userid fromid就是指userid
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
	
	res.render('admin',{
		title:"movie 后台录入页",
		movie:{
			title:'',
			doctor:'',
			country:'',
			year:'',
			poster:'',
			flash:'',
			summary:'',
			language:''
		}
	})
	
}

// admin update movie
exports.update=function(req,res){       //修改电影
	var id=req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'movie 后台更新页',
				movie:movie
			})
		})
	}
};

   // admin post movie
exports.save=function (req,res) {        //录入电影数据
    console.log(req.body);
    var id = req.body.movie._id;
    var movieObj =req.body.movie;
    var _movie;
    if(id !='undefined'){
   
        Movie.findById(id,function (err, movie) {
            if (err){
                console.log(err)
            }
            _movie=_.extend(movie,movieObj);
            _movie.save(function (err, movie) {
                if(err){
                    console.log(err)
                }
                res.redirect('/movie/'+movie._id);
            })
        })
    }else {
        _movie=new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            lan:movieObj.lan,
            year:movieObj.year,
            poster:movieObj.poster,
            summary:movieObj.summary,
            flash:movieObj.flash
        });
        _movie.save(function (err, movie) {
            if(err){
                console.log(err)
            }else{
            	
            }
            res.redirect('/movie/'+movie._id);
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