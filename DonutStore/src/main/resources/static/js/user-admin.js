$(document).ready(function(){
	var id = 1;
	$("#editUser").on("show.bs.modal",function(event){
		var button = $(event.relatedTarget);
		var email = button.data('email');
		console.log(email);
		var modal = $(this);
		
		$.ajax({
			type : 'post',
			url : 'getRolesAndStore',
			contentType : 'application/json',
			dateType : 'json',
			data : JSON.stringify({userEmail : email}),
			success : function(result){
				console.log(result.data3);
				if(result.status == "setListOk"){
					$('#edit_roles').html('<button type="button" class="btn-success" id="getRemainRoles"><span class="glyphicon glyphicon-plus-sign">Thêm role mới</span></button><br/>');
					$.each(result.data, function(i, role){
						$('#edit_roles').append('<select id="select_role'+id+'" class="selectpicker"></select>'
								+'<button type="button" class="btn" id="delete_role'+id+'" onClick="deleteRole('+id+')"><span class="glyphicon glyphicon-remove"></span></button>');
						$('#select_role'+id).append('<option value="'+role.roleCode+'">'+role.roleName+'</option>');
						id++;
					});
					if(result.data3.length != 0){
						$('#edit_roles').append('<select id="select_role'+id+'" class="selectpicker"></select>'
								+'<button type="button" class="btn" id="save_role'+id+'" onClick="saveRole('+id+')"><span class="glyphicon glyphicon-ok"></span></button>'
								+'<button type="button" class="btn" id="delete_role'+id+'" onClick="deleteRole('+id+')" disabled="disabled"><span class="glyphicon glyphicon-remove"></span></button>');
						$.each(result.data3, function(i, role){
							$('#select_role'+id).append('<option value="'+role.roleCode+'">'+role.roleName+'</option>');
						});
						id++;
					}
					$('#edit_store').append('<select id="select_store" class="selectpicker"></select>'
							+'<button type="button" class="btn" id="save_store" onClick="saveStore()"><span class="glyphicon glyphicon-ok"></span></button>');
					$.each(result.data2, function(i, store){
						$('#select_store').append('<option value="'+store.storeCode+'">'+store.storeName+'</>')
					});
					getRemainRoles(id);
				} else {
					alert("Not found user email");
					setTimeout(function(){
						window.location.href="user";
					},2000);
				}
			},error : function(e){
				console.log("error" + e);
			}
		});
		$("#editUser").find("#user-email").val(email);
	});
	
	$('#editUserForm').validate({
		rules : {
			userEmail : {
				required : true,
				email : true
			}
		},
		messages : {
			userEmail : {
				required : "Phải điền email",
				email : "Phải đúng chuẩn email"
			}
		}
	});
	
	$('#addStoreForm').validate({
		rules : {
			storeName : "required",
			storePhoneNumber : {
				required : true,
				maxlength : 20,
				minlength : 10
			},
			storeAddress : "required"
		},
		messages : {
			storeName : "Hãy nhập tên cửa hàng",
			storePhoneNumber : {
				required : "Hãy nhập số điện thoại",
				maxlength : "Quá dài",
				minlength : "Qúa ngắn"
			},
			storeAddress : "Hãy nhập địa chỉ"
		}
	});
	
	$('#editStoreForm').validate({
		rules : {
			storeName : "required",
			storePhoneNumber : {
				required : true,
				maxlength : 20,
				minlength : 10
			},
			storeAddress : "required"
		},
		messages : {
			storeName : "Hãy nhập tên cửa hàng",
			storePhoneNumber : {
				required : "Hãy nhập số điện thoại",
				maxlength : "Quá dài",
				minlength : "Qúa ngắn"
			},
			storeAddress : "Hãy nhập địa chỉ"
		}
	});
});

function getRemainRoles(id){
	$('#getRemainRoles').click(function(){
		$.ajax({
			type : 'post',
			url : 'getRemainRoles',
			success : function(result){
				if(result.status == "setListOk"){
					$('#edit_roles').append('<select id="select_role'+id+'" class="selectpicker"></select>'
							+'<button type="button" class="btn" id="save_role'+id+'" onClick="saveRole('+id+')"><span class="glyphicon glyphicon-ok"></span></button>'
							+'<button type="button" class="btn" id="delete_role'+id+'" onClick="deleteRole('+id+')"><span class="glyphicon glyphicon-remove"></span></button>');
					$.each(result.data, function(i, role){
						$('#select_role'+id).append('<option value="'+role.roleCode+'">'+role.roleName+'</option>');
					});
					id++;
				}
			}, error : function(e){
				console.log('Error' + e);
			}
		});
	});
}

function saveRole(id){
	var roleCode = $('#select_role'+id).val();
	$.ajax({
		type : 'post',
		url : 'saveRole',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(roleCode),
		success : function(result){
			if (result.status == "setListOk"){
				$('#save_role'+id).remove();
				$('#delete_role'+id).removeAttr('disabled');
			}
		}, error : function(e){
			console.log("error" + e);
		}
	});
}

function deleteRole(id){
	var roleCode = $('#select_role'+id).val();
	$.ajax({
		type : 'post',
		url : 'deleteRole',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(roleCode),
		success : function(result){
			if(result.status == "setListOk"){
				$('#delete_role'+id).remove();
				$('#select_role'+id).remove();
			}else {
				alert('role code not right');
			}
		},
		error : function(e){
			console.log('Error' + e);
		}
	});
}

function saveStore(){
	var storeCode = $('#select_store').val();
	
	$.ajax({
		type : 'post',
		url : 'saveStore',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(storeCode),
		success : function(result){
			if (result.status = "setListOk"){
				$('#save_store').remove();
			}
		}, error : function(e){
			console.log("Error" + e);
		}
	});
}

$('#editStore').on('show.bs.modal', function(event){
	var button = $(event.relatedTarget);
	var code = button.data('code');
	var name = button.data('name');
	var phoneNumber = button.data('phonenumber');
	var address = button.data('address');
	
	$("#editStore").find("#store_code").val(code);
	$("#editStore").find("#store_name").val(name);
	$("#editStore").find("#store_phone_number").val(phoneNumber);
	$("#editStore").find("#store_address").val(address);
});