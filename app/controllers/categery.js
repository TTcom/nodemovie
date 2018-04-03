

var Categery=require('../models/categery')
var _=require('underscore')   //Underscore 是一个 JavaScript 工具库，它提供了一整套函数式编程的实用功能


//adimin new
exports.new=function(req,res){      
	
	res.render('categery_admin',{
		title:"movie 后台分类录入页",
		categery:{}
	})
	
}


exports.save=function (req,res) {        //录入电影数据
	
    var _categery = req.body.categery;
    var categery=new Categery(_categery)

        categery.save(function (err, categery) {
            if(err){
                console.log(err)
            }
            res.redirect('/admin/categery/list');
        })
    
};

exports.list=function(req,res){

	Categery.fetch(function(err,categeries){
		if(err){
			console.log(err)
		}
	res.render('categerylist',{
		title:"电影分类列表页",
		categeries:categeries
	  })
	})

}