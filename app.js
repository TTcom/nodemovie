 
var express=require('express')
var path=require('path');
var port = process.env.PORT || 3000;
var app = express()
var mongoose=require('mongoose')
var _=require('underscore')
var Movie=require('./models/movie')

var bodyParser = require('body-parser')

mongoose.connect('mongodb://127.0.0.1:27017/test');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({limit: '1mb'}));
//app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')))
app.locals.moment=require('moment');
app.set('views','./views/pages')
app.set('view engine','jade');
app.listen(port)

console.log('movie started on port' +port)


app.get('/',function(req,res){           //获取全部的电影
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