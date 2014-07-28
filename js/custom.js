$(document).ready(function(){

	
	$("#search_t").keyup(function(){
  		if($("#search_t").val().length>0){
  			$("#srb").addClass('search-b');
  			$("#srb").attr('disabled',false);
  		}else{
  			
  			$("#srb").attr('disabled',true);
			$("#srb").removeClass('search-b');
  		
  			}
	}); 
	$("#srb").attr('disabled',true);
	$("#srb").removeClass('search-b');

	$("#search_t").keyup(function(){
  		
	}); 		

	$("body").on("click",".search-b",function(){
	
		var l = '<img src="img/loader-sm.gif">';
		$("#s_r").html(l);
		var search_q = $("#search_t").val();

		var req;
		var total,pages;
		var url = "http://it-ebooks-api.info/v1/search/" + search_q;
		req = $.ajax({
			type:"GET",
			url: url
		});

		req.done(function(response){

			

			total = response.Total;
			
			if(total == undefined){
				total = '0';
				$("#s_r").html(total+' results found with "'+search_q+'"');
				return false;
			}
			$("#s_r").html(total+' results found with "'+search_q+'"');
			pages = total/10;
			if(total%10 != 0){
				pages +=1;
			}
			pages = parseInt(pages);
			$("#result_lists_all").empty();
			var l,data;
			for(var i=0; i<response.Books.length; i++){
			data = response.Books[i];	
			if(data.SubTitle == undefined){
				data.SubTitle = '';
			}
			l = "<div class='small-12 columns result'><div class='small-12 columns result-list'>"+
            "<div class='small-3 columns book-image'><img class='result-image' src='"+data.Image+"'>"+
            "</div><div class='small-9 columns listdata'><div class='result-title l'>"+
            "<h4>"+data.Title+"</h4></div><div class='result-subtitle l'>"+data.SubTitle+
            "</div>"+
            "<button id='"+data.ID+"' style='font-size:1rem; padding: 0.475rem 0.95rem;' class='small button vw'><i class='fa fa-arrow-circle-down'></i>&nbsp;&nbsp;View</button>"+
            "&nbsp;&nbsp;<img id='pic_"+data.ID+"' style='display:none;' src='img/loader-sm.gif'></div></div><div id='add_data"+data.ID+"'></div>";

            $("#result_lists_all").append(l);
			}

			$("#pagntn-info").empty();
			var loader = '<img style="display:none; margin-top:1.2rem;margin-bottom:1.2rem;padding-left:50%;" src="img/loader-bg.gif" id="pg_loader">';
			$("#pagntn-info").append(loader);
			if(pages == 1){


				var pglink = '<a id="" style="padding-top:1rem;padding-bottom:1rem; text-align:center;border-radius:7px; color:#FCFCFC;font-size:1.3rem; background-color:#D0D0D0;" class="small-6 small-offset-3 columns">No more to display</a>';
            	$("#pagntn-info").append(pglink);
            }else{ 
            	var pglink = '<a id="'+1+'_'+pages+'" data-q="'+search_q+'" style="padding-top:1rem;padding-bottom:1rem; text-align:center;border-radius:7px; color:#FCFCFC;font-size:1.3rem; background-color:#D0D0D0;" class="small-6 small-offset-3 columns paginate">Load more..</a>';
            	$("#pagntn-info").append(pglink);
            	            	
            }
			
		});

		req.fail(function(){

		});
	});

	$("body").on("click",".paginate",function(){

		

		var id = this.id;
		var c = id.split('_');
		var count = parseInt(c[0]);
		var total = parseInt(c[1]);
		if(count != total){

			$("#pg_loader").show();
			count += 1;


			var req;
			var q = $("#"+id).data('q');
			var url = 'http://it-ebooks-api.info/v1/search/'+q+'/page/'+count;
			req = $.ajax({
				url:url,
				type:"GET"
			});

			req.done(function(response){

		

				var l,data;
				for(var i=0; i<response.Books.length; i++){
				data = response.Books[i];	
				if(data.SubTitle == undefined){
					data.SubTitle = '';
				}
				l = "<div class='small-12 columns result'><div class='small-12 columns result-list'>"+
		        "<div class='small-3 columns book-image'><img class='result-image' src='"+data.Image+"'>"+
		        "</div><div class='small-9 columns listdata'><div class='result-title l'>"+
		        "<h4>"+data.Title+"</h4></div><div class='result-subtitle l'>"+data.SubTitle+
		        "</div>"+
		        "<button id='"+data.ID+"' style='font-size:1rem; padding: 0.475rem 0.95rem;' class='small button vw'><i class='fa fa-arrow-circle-down'></i>&nbsp;&nbsp;View</button>"+
		        "&nbsp;&nbsp;<img id='pic_"+data.ID+"' style='display:none;' src='img/loader-sm.gif'></div></div><div id='add_data"+data.ID+"'></div>";

		        $("#result_lists_all").append(l);

		        $("#pg_loader").hide();
				}


			});
			req.fail(function(){

			});



			var new_id = count + '_' + total;
			var pglink = '<a id="'+new_id+'" style="padding-top:1rem;padding-bottom:1rem; text-align:center;border-radius:7px; color:#FCFCFC;font-size:1.3rem; background-color:#D0D0D0;" data-q="'+q+'" class="small-6 small-offset-3 columns paginate">Load more..</a>';
            	$("#pagntn-info").empty();
            	var loader = '<img style="display:none; margin-top:1.2rem;margin-bottom:1.2rem;padding-left:50%;" src="img/loader-bg.gif" id="pg_loader">';
				$("#pagntn-info").append(loader);
            	$("#pagntn-info").append(pglink);

		}else{
			$('#'+id).removeClass('paginate');
			$("#"+id).html('No more to display');	
		}


		
		
	});

	

		$("body").on("click",".vw",function(){
			var id = this.id;
			

			var url = "http://it-ebooks-api.info/v1/book/" + id;
			var req;
			req = $.ajax({
				url:url,
				type:"GET",
				beforeSend:function(){
				 $("#pic_"+id).show();
				 $("#"+id).removeClass("vw");
				},
				complete:function(){
				 $("#pic_"+id).hide();	
				 $("#"+id).addClass('disabled');
				 $("#"+id).css("opacity","0.3");	
				}
			});

			req.done(function(response){
				var d = "<div id='ed"+id+"' style='padding-top:2px;'class='small-12 columns result-detail'>"+
            "<div style='padding:0px;' class='desc-heading small-12 columns'>"+
            "<h4 style='padding:0px;' class='small-10 columns'>Description</h4>"+
            "<span class='small-1 columns'><a style='color:#78888D;'><i id='c"+id+"' class='fa fa-times fa-2x reslt-detail_close'></i></a>"+
            "</span></div><br><br><br><div class='desc-detail l'>"+response.Description+"<br><br></div>"+
            "<div class='additional-details'><div class='l'>Publisher : "+response.Publisher+"</div><div class='l'>Author : "+response.Author+"</div><div class='l'>ISBN : "+response.ISBN+"</div>"+
            "<div class='l'>Year : "+response.Year+"</div><div class='l'>Pages : "+response.Page+"</div></div><a target='_blank' href='"+response.Download+"' class='small button dwnld-btn'><i class='fa fa-download'></i>&nbsp;Download</a></div>";
			
			$("#add_data"+id).append(d);
			});



			req.fail(function(){

			});
		});

	$("body").on("click",".reslt-detail_close",function(){
		var id = this.id.split('c');
		id = id[1];
		$("#add_data"+id).empty();
		$("#"+id).removeClass('disabled');
		$("#"+id).addClass('vw');
		$("#"+id).css("opacity","1");	
	});


	
	
});