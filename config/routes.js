var Index=require('../app/controllers/index')
var User=require('../app/controllers/user')
var Comment=require('../app/controllers/comment')
var Movie=require('../app/controllers/movie')
var Categery=require('../app/controllers/categery')
module.exports=function(app){
	

//pre handle user
app.use(function(req,res,next){
	var _user=req.session.user;
   
    	   res.locals.user=_user;
   
	      next();   //运行下一个函数

   
})
app.get('/',Index.index)

// signup注册
app.post('/user/signup', User.signup);

//signin登录
app.post('/user/signin',User.signin)
app.get('/signin',User.showSignin);
app.get('/signup',User.showSignup)
//logout
app.get('/logout',User.logout);

//userlist
app.get('/admin/user/list',User.signinRequired,User.adminRequired,User.list)


app.get('/movie/:id',Movie.detail)
app.get('/admin/movie/new',User.signinRequired,User.adminRequired,Movie.new)   //电影录入也

// admin update movie
app.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,Movie.update)
   // admin post movie
app.post('/admin/movie',User.signinRequired,User.adminRequired,Movie.savePoster,Movie.save);

app.get('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.list)
//list delete
app.delete('/admin/movie/list',User.signinRequired,User.adminRequired,Movie.del)
//comment
app.post('/user/comment',User.signinRequired,Comment.save);

app.get('/admin/categery/new',User.signinRequired,User.adminRequired,Categery.new)//电影分类录入也

app.post('/admin/categery',User.signinRequired,User.adminRequired,Categery.save);

app.get('/admin/categery/list',User.signinRequired,User.adminRequired,Categery.list);

//results 分页
app.get('/results',Index.search)

}






