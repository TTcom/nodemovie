var Comment=require('../models/comment')
var _=require('underscore');

   // comment
exports.save=function (req,res) {        //录入

    
     console.log(req.body)
    var _comment=req.body.comment;
    var movieId=_comment.movie;
    if(_comment.cid){       
    	   Comment.findById(_comment.cid, function(err,comment){
    	   	   var reply={
    	   	   	 from:_comment.from,   
    	   	   	 to:_comment.tid,     //
    	   	   	 content:_comment.content   //内容
    	   	   }
    	   	   comment.reply.push(reply)
    	   	   comment.save(function(err,comment){
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
