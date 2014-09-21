
$(document).ready(function(){


	// level add function

	$("body").on("click","#save_level_btn",function(event){
		event.preventDefault();

		$("#add_lvl_loader").show();

		var new_row,level_number,timer_min,timer_sec, no_of_questn, new_level_id,
		row_id,del_id,publish_id,edit_id,status_id, action_id;
		level_number = $("#level_number").val();
		timer_min = $("#timer_min").val();
		timer_sec = $("#timer_sec").val();
		no_of_questn = $("#no_of_questn").val();
		t_time = timer_min +' min '+ timer_sec + ' sec';



		new_level_id = Math.floor((Math.random() * 100) + 1);
		row_id = 'level_'+new_level_id;
		del_id = 'd_l_'+new_level_id;
		publish_id = 'p_l_' + new_level_id;
		edit_id = 'e_l_' + new_level_id;
		status_id = 'level_stat_' + new_level_id;
		action_id = 'action_' + new_level_id;

		new_row = "<tr id='"+row_id+"'>"+
          '<td>'+level_number+'</td>'+
          '<td>0/'+no_of_questn+'</td>'+
          '<td>'+t_time+'</td>'+
          "<td id='"+status_id+"'>Draft</td>"+
          "<td id='"+action_id+"' class='text-center'>"+
          '<a class="btn btn-info btn-xs" href="#"><span class="glyphicon glyphicon-eye-open"></span> View</a>'+'&nbsp;'+
          "<a id='"+edit_id+"' class='btn btn-warning btn-xs level_edit_cls'><span class='glyphicon glyphicon-edit'></span> Edit</a>"+'&nbsp;'+
          "<a id='"+publish_id+"' class='btn btn-success btn-xs level_pub_cls'><span class='glyphicon glyphicon-check'></span> Publish</a>"+'&nbsp;'+ 
          "<a id='"+del_id+"' class='btn btn-danger btn-xs level_del_cls'><span class='glyphicon glyphicon-remove'></span> Del</a>"+
          '</td>'+
        '</tr>';

        $("#levels_table").append(new_row);
        $("#add_lvl_loader").hide();
        $("#levelAddModal").modal('hide');


        $("#level_number").val('');
		//$("#timer_min").val('');
		//$("#timer_sec").val('');
		$("#no_of_questn").val('');


	});

// level add function


// level delete function

	$("body").on("click",".level_del_cls",function(){
		var level_id;
		var x = this.id;
		x = x.split('d_l_');
		x = x[1];
		level_id = x;
		var tr_id = 'level_' + level_id;
		$("#"+tr_id).remove();
	});
// level delete function

	
// level publish function
	$("body").on("click",".level_pub_cls",function(){
		var level_id;
		var x = this.id;
		x = x.split('p_l_');
		x = x[1];
		level_id = x;

		// remove edit, publish & del btn of corrosponding level
		$("#action_" + level_id).empty();
		var td_id = 'action_'+level_id;
		var new_act = "<a class='btn btn-info btn-xs'>"+
		"<span class='glyphicon glyphicon-eye-open'></span> View</a>";
		
		$("#"+td_id).append(new_act);

		$("#level_stat_"+level_id).html('Published');
		
		

	});
// level publish function	



	// question edit function

	$("body").on("click","#edit_q",function(){
		$("#edit_11").hide();
		$("#edit_1").show();

		$("#edit_5").hide();
		$("#edit_55").show();

		$("#ed-21").hide();
		$("#ed_21").show();

		$("#e1").hide();
		$("#e11").show();

		$("#edit_2").show();
		$("#edit_3").show();
		$("#edit_4").show();
	});
	// question edit function

});