$(function(){
	
	$('.comment').click(function(e){
		console.log(4564)
		var target=$(this);
		var toId=target.data('tid');     //评论者user的id
		var commentId =target.data('cid');  //该评论的id
		if($('#toId').length>0){      //切换id
			$('#toId').val(toId);
		}else{
			$('<input>').attr({
			type:'hidden',
			id:"toId",
			name:'comment[tid]',
			value:toId
		}).appendTo('#commentForm')
		}
		
		if($('#commentId').length>0){
			$('#commentId').val(commentId);
			
		}else{
				$('<input>').attr({
				type:'hidden',
				id:"commentId",
				name:'comment[cid]',
				value:commentId
			}).appendTo('#commentForm')
		}
		
		
	})
	
})