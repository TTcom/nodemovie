var mongoose= require('mongoose');
var bcrypt = require('bcryptjs'); //密码加密加盐
var SALT_WORK_FACTOR=10;

var Userschema= new mongoose.Schema({
	
	name:{
		unique:true,
		type:String
	},
	password:String,
	// user
	// admin
	//super admin  //0 :nomaluser //1:verified user //2:professonal user
	 // >10: adimn //>50 :superadmin
	role:{
		type:Number,
	    default:0
	},
	meta:{
		createAt:{        //创建时间
			type:Date,
			default:Date.now()
		},
		updateAt:{       //更新时间
			type:Date,
			default:Date.now()
		}
	}
	
})

Userschema.pre('save',function(next){   //更新插入数据
	var user=this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}
	 bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
	 	  if(err) return next(err)
	 	  
	 	  bcrypt.hash(user.password,salt,function(err,hash){
	 	  	   if(err) return next(err)
	 	  	   
	 	  	   user.password=hash;
	 	  	   next();
	 	  })
	 })

})

Userschema.methods={
	comparePassword:function(_password,cb){
		bcrypt.compare(_password,this.password,function(err,isMatch){
			if(err) return cb(err)
			
			cb(null,isMatch)
			
		})
	}
}


Userschema.statics={
	fetch:function(cb){  //取出数据库中的数据
		return this
		   .find({})
		   .sort('meta.updateAt')
		   .exec(cb)
		   
	},
	findById:function(id,cb){  //查询单条数据
		return this
		.findOne({_id:id})
		.exec(cb)
	}
}
module.exports=Userschema
