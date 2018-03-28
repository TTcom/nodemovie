var mongoose= require('mongoose');

var movieschema= new mongoose.Schema({
	
	doctor:String,
	title:String,
	language:String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
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

movieschema.pre('save',function(next){   //更新插入数据
	
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}
	
	next()
})

movieschema.statics={
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
module.exports=movieschema
