var Movie=require('../models/movie')
var User=require('../models/user')
var _=require('underscore')
module.exports=function(app){
	

//pre handle user
app.use(function(req,res,next){
	var _user=req.session.user;
    if(_user){
    	   res.locals.user=_user;
    }
		return next();   //运行下一个函数

   
})
app.get('/',function(req,res){           //获取全部的电影
	console.log('user in session:')
	console.log(req.session.user)
		
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
		res.render('index',{       //启动的页面和数据的传递
			title:"movie 首页",
			movies:movies
		
	 })
  })
	
})

// signup
app.post('/user/signup', function(req,res){
	var _user=req.body.user;
	
	
	User.findOne({name:_user.name}, function(err,user){
		if(err){
			console.log(err)
		}
		if(user){
			return res.redirect('/')
		}else{
			var user=new User(_user);
	
	       user.save(function(err,user){
		if(err){
			console.log(err)
		}
	//	console.log(user)
		res.redirect('/admin/userlist');
		
	})
	
	console.log(_user);
		}
	})
})

//signin
app.post('/user/signin',function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;
	
	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/');
		}
		user.comparePassword(password,function(err,isMatch){     //user实例方法比对密码是否正确
			if(err){
				console.log(err)
			}
			if(isMatch){
				req.session.user=user;
				console.log('密码正确1w1')
				return res.redirect('/');
			}else{
				console.log('密码错误')
			}
			
		})
		
	})
	
})

//logout
app.get('/logout',function(req,res){
	delete req.session.user;
	delete res.locals.user;
	res.redirect('/');
})
//userlist
app.get('/admin/userlist',function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
	res.render('userlist',{
		title:"用户列表页",
		users:users
	  })
	})
	
	
})


app.get('/movie/:id',function(req,res){      //更新电影
	
	var id= req.params.id                        
	Movie.findById(id,function(err,movie){        //根据id获取电影数据
	res.render('detail',{
		title:"movie "+movie.title,
		movie:movie
		
	})

	})
	
})
app.get('/admin/movie',function(req,res){      
	
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
	
})

// admin uodata movie
app.get('/admin/update/:id',function(req,res){       //修改电影
	var id=req.params.id
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'movie 后台更新页',
				movie:movie
			})
		})
	}
})
   // admin post movie
app.post('/admin/movie/new',function (req,res) {        //录入电影数据
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
});

app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err)
		}
	res.render('list',{
		title:"movie 列表页",
		movies:movies
	  })
	})
	
	
})
//list delete
app.delete('/admin/list',function (req, res) {          //电影删除
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
})
}