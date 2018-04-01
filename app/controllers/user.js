
var User=require('../models/user')
// signup注册


exports.showSignup=function(req,res){

	res.render('signup',{
		title:"注册页面",
	  })

	
}

exports.showSignin=function(req,res){

	res.render('signin',{
		title:"登录页面",
	  })

	
}



exports.signup=function(req,res){
	var _user=req.body.user;
	
	
	User.findOne({name:_user.name}, function(err,user){
		if(err){
			console.log(err)
		}
		if(user.name){
			console.log('以注册过')
			return res.redirect('/signin')
			
		}else{
			var user=new User(_user);
	
	       user.save(function(err,user){
		if(err){
			console.log(err)
		}
		console.log(user)
		res.redirect('/');
		
	})
	
	             console.log(_user);
		}
	})
}

//signin登录
exports.signin=function(req,res){
	var _user=req.body.user;
	var name=_user.name;
	var password=_user.password;
	
	User.findOne({name:name},function(err,user){
		if(err){
			console.log(err);
		}
		if(!user){
			return res.redirect('/signup');
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
				return res.redirect('/signin');
				console.log('密码错误')
			}
			
		})
		
	})
	
}

//logout
exports.logout=function(req,res){
	delete req.session.user;
	//delete res.locals.user;
	res.redirect('/');
}
//userlist
exports.list=function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err)
		}
	res.render('userlist',{
		title:"用户列表页",
		users:users
	  })
	})
	
	
}
