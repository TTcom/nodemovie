$(function(){
	
	$('.del').click(function(e){
		
		var target=$(e.target);
		var id=target.data('id');
		var tr =$('.item-id-' +id)
		
		$.ajax({
			type:"delete",
			url:'/admin/movie/list?id='+id
			
		}).done(function(result){
			console.log(result)
			if(result.success===1){
				if(tr.length>0){
					tr.remove();
					
				}
			}
		})
	})
	
	
	$('#inputid').blur(function(){
		
		var ss = $(this).val();
		console.log(ss);
		
		$.ajax({
			url:"https://api.douban.com/v2/movie/subject/"+ss,
			cache:true,
			type:"get",
			dataType:"jsonp",
			jsonp:"callback",
			success:function(data){

				$('#inputTitle').val(data.title);
				$('#inputDoctor').val(data.directors[0].name);
				$('#inputCountry').val(data.countries[0]);
				$('#inputPoster').val(data.images.large);
				$('#inputYear').val(data.year);
				$('#inputSummary').val(data.summary);
				
			}
			
			
		});
		
	})
	
	
})