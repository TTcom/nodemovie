var mongoose= require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId

var Categeryschema= new Schema({
	name:String,
	movies:[{
		type:ObjectId,
		ref:"Movie"
	}],
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

Categeryschema.pre('save',function(next){   //更新插入数据
	
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt=Date.now()
	}else{
		this.meta.updateAt=Date.now()
	}
	
	next()
})

Categeryschema.statics={
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
module.exports=Categeryschema
