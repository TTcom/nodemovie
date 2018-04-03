var Comment=require('../models/comment')
var _=require('underscore');

   // comment
exports.save=function (req,res) {        //录入

    
     console.log(req.body)
    var _comment=req.body.comment;
    var movieId=_comment.movie;
    if(_comment.cid){    //如果点击了评论者的头像则该评论的id cid将存在于表单中   
    	   Comment.findById(_comment.cid, function(err,comment){  //根据id在数据库表中查询是否存在该评论
    	   	   var reply={                  //若果存在则创建一个reply对象
    	   	   	 from:_comment.from,       //登陆者的id
    	   	   	 to:_comment.tid,     //评论者的id
    	   	   	 content:_comment.content   //内容
    	   	   }
    	   	   comment.reply.push(reply)   //将对象插入reply数组中
    	   	   comment.save(function(err,comment){     //将数据存入数据库中
	    	   	   	if(err){
	                console.log(err)
	            }
	            res.redirect('/movie/'+movieId);
    	   	   })
    	   })
    }else{
    var comment=new Comment(_comment);
        comment.save(function (err,comment) {
            if(err){
                console.log(err)
            }
            res.redirect('/movie/'+movieId);
        })
    }
};
