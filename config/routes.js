var Index=require('../app/controllers/index')
var User=require('../app/controllers/user')
var Movie=require('../app/controllers/movie')
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
app.get('/admin/userlist',User.list)


app.get('/movie/:id',Movie.detail)
app.get('/admin/movie',Movie.new)

// admin update movie
app.get('/admin/update/:id',Movie.update)
   // admin post movie
app.post('/admin/movie/new',Movie.save);

app.get('/admin/list',Movie.list)
//list delete
app.delete('/admin/list',Movie.del)

}






