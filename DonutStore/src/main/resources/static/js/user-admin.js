$(document).ready(function(){
	var id = 1;
	var idItem = 2;
	$("#editUser").on("show.bs.modal",function(event){
		var button = $(event.relatedTarget);
		var email = button.data('email');
		var modal = $(this);
		
		$.ajax({
			type : 'post',
			url : 'getOldRoles',
			contentType : 'application/json',
			dateType : 'json',
			data : JSON.stringify({userEmail : email}),
			success : function(result){
				if(result.status == "setListOk"){
					$('#edit_roles').html('<button type="button" class="btn-success" id="getRemainRoles"><span class="glyphicon glyphicon-plus-sign"></span> Thêm role mới</button><br/>');
					$.each(result.data, function(i, role){
						$('#edit_roles').append('<select id="select_role'+id+'" class="selectpicker"></select>'
								+'<button type="button" class="btn" id="delete_role'+id+'" onClick="deleteRole('+id+')"><span class="glyphicon glyphicon-remove"></span></button>');
						$('#select_role'+id).append('<option value="'+role.roleCode+'">'+role.roleName+'</option>');
						id++;
					});
					if(result.data2.length != 0){
						$('#edit_roles').append('<select id="select_role'+id+'" class="selectpicker"></select>'
								+'<button type="button" class="btn" id="save_role'+id+'" onClick="saveRole('+id+')"><span class="glyphicon glyphicon-ok"></span></button>'
								+'<button type="button" class="btn" id="delete_role'+id+'" onClick="deleteRole('+id+')" disabled="disabled"><span class="glyphicon glyphicon-remove"></span></button>');
						$.each(result.data2, function(i, role){
							$('#select_role'+id).append('<option value="'+role.roleCode+'">'+role.roleName+'</option>');
						});
						id++;
					}
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
	
	$('#get_remain_items').click(function(){
		$.ajax({
			type : 'post',
			url : 'getRemainItems',
			success : function(result){
				if (result.status == "setListOk"){
					$('#edit_items').append('<select class="selectpicker" id="select_item'+idItem+'"></select>'
							+'<button type="button" class="btn" id="save_item'+idItem+'" onClick="saveItem('+idItem+')">'
							+'<span class="glyphicon glyphicon-ok"></span></button>');
					$.each(result.data, function(i, item){
						$('#select_item'+idItem).append('<option value="'+item.itemCode+'">'+item.itemName+'</option>');
					});
					idItem++;
				} else {
					alert("Click ok button first");
				}
			}, error : function(e){
				console.log('error'+e);
			}
		});
	});
	
	$('#editStore').on('show.bs.modal', function(event){
		var button = $(event.relatedTarget);
		idItem = 2;
		var code = button.data('code');
		var name = button.data('name');
		var phoneNumber = button.data('phonenumber');
		var address = button.data('address');
		
		$.ajax({
			type : 'post',
			url : 'getOldItems',
			contentType : 'application/json',
			dataType : 'json',
			data : JSON.stringify(code),
			success : function(result){
				if (result.status == "setListOk"){
					$.each(result.data, function(i, item){
						$('#edit2_items').append('<select class="selectpicker" id="select2_item'+idItem+'">'
								+'<option value="'+item.itemCode+'">'+item.itemName+'</option></select>'
								+'<button type="button" class="btn" id="delete2_item'+idItem+'" onClick="delete2Item('+idItem+')">'
								+'<span class="glyphicon glyphicon-remove"></span></button>');
						idItem++;
					});
					if (result.data2.length != 0){
						$('#edit2_items').append('<select class="selectpicker" id="select2_item'+idItem+'"></select>'
								+'<button type="button" class="btn" id="save2_item'+idItem+'" onClick="save2Item('+idItem+')"><span class="glyphicon glyphicon-ok"></span></button>');
						$.each(result.data2, function(i, item){
							$('#select2_item'+idItem).append('<option value="'+item.itemCode+'">'+item.itemName+'</option>');
						});
						idItem++;
					}
				}
			}, error : function(e){
				console.log('error'+e);
			}
		});
		
		$('#get2_remain_items').click(function(){
			$.ajax({
				type : 'post',
				url : 'getRemainItems',
				success : function(result){
					if (result.status == "setListOk"){
						$('#edit2_items').append('<select class="selectpicker" id="select2_item'+idItem+'"></select>'
								+'<button type="button" class="btn" id="save2_item'+idItem+'" onClick="save2Item('+idItem+')">'
								+'<span class="glyphicon glyphicon-ok"></span></button>');
						$.each(result.data, function(i, item){
							$('#select2_item'+idItem).append('<option value="'+item.itemCode+'">'+item.itemName+'</option>');
						});
						idItem++;
					} else {
						alert("Click ok button first");
					}
				}, error : function(e){
					console.log('error'+e);
				}
			});
		});
		
		$("#editStore").find("#store_code").val(code);
		$("#editStore").find("#store_name").val(name);
		$("#editStore").find("#store_phone_number").val(phoneNumber);
		$("#editStore").find("#store_address").val(address);
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
	
	$('#addStaffForm').validate({
		rules : {
			staffName : "required",
			staffPhoneNumber : {
				required : true,
				maxlength : 20,
				minlength : 10
			}, staffAddress : "required",
			staffIdentityCard : {
				required : true,
				maxlength : 16,
				minlength : 9
			},staffHomeTown : "required",
			staffSalary : {
				required : true,
				min : 1800000,
				max : 5000000
			}
		},
		messages : {
			staffName : "Hãy nhập tên",
			staffPhoneNumber : {
				required : "Hãy nhập sđt",
				maxlength : "Quá dài",
				minlength : "Quá ngắn"
			}, staffAddress : "Hãy nhập địa chỉ",
			staffIdentityCard : {
				required : "Hãy nhập số cmt",
				maxlength : "Quá dài",
				minlength : "Quá ngắn"
			},staffHomeTown : "Hãy nhập quê quán",
			staffSalary : {
				required : "Hãy nhập lương",
				min : "Quá ít",
				max : "Quá nhiều"
			}
		}
	});
	
	$('#editStaffForm').validate({
		rules : {
			staffName : "required",
			staffPhoneNumber : {
				required : true,
				maxlength : 20,
				minlength : 10
			}, staffAddress : "required",
			staffIdentityCard : {
				required : true,
				maxlength : 16,
				minlength : 9
			},staffHomeTown : "required",
			staffSalary : {
				required : true,
				min : 1800000,
				max : 5000000
			}
		},
		messages : {
			staffName : "Hãy nhập tên",
			staffPhoneNumber : {
				required : "Hãy nhập sđt",
				maxlength : "Quá dài",
				minlength : "Quá ngắn"
			}, staffAddress : "Hãy nhập địa chỉ",
			staffIdentityCard : {
				required : "Hãy nhập số cmt",
				maxlength : "Quá dài",
				minlength : "Quá ngắn"
			},staffHomeTown : "Hãy nhập quê quán",
			staffSalary : {
				required : "Hãy nhập lương",
				min : "Quá ít",
				max : "Quá nhiều"
			}
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

function saveItem(id){
	var itemCode = $('#select_item'+id).val();
	
	$.ajax({
		type : 'post',
		url : 'saveOneItem',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(itemCode),
		success : function(result){
			if (result.status = "setListOk"){
				$('#save_item'+id).remove();
				$('#edit_items').append('<button type="button" class="btn" id="delete_item'+id+'" onClick="deleteItem('+id+')"><span class="glyphicon glyphicon-remove"></span></button>');
			}
		}, error : function(e){
			console.log("Error" + e);
		}
	});
}

function deleteItem(id){
	var itemCode = $('#select_item'+id).val();
	
	$.ajax({
		type : 'post',
		url : 'deleteOneItem',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(itemCode),
		success : function(result){
			if (result.status = "setListOk"){
				$('#delete_item'+id).remove();
				$('#select_item'+id).remove();
			}
		}, error : function(e){
			console.log("Error" + e);
		}
	});
}

function save2Item(id){
	var itemCode = $('#select2_item'+id).val();
	$.ajax({
		type : 'post',
		url : 'saveOneItem',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(itemCode),
		success : function(result){
			if (result.status = "setListOk"){
				$('#save2_item'+id).remove();
				$('#edit2_items').append('<button type="button" class="btn" id="delete2_item'+id+'" onClick="delete2Item('+id+')"><span class="glyphicon glyphicon-remove"></span></button>');
			}
		}, error : function(e){
			console.log("Error" + e);
		}
	});
}

function delete2Item(id){
	var itemCode = $('#select2_item'+id).val();
	$.ajax({
		type : 'post',
		url : 'deleteOneItem',
		contentType : 'application/json',
		dataType : 'json',
		data : JSON.stringify(itemCode),
		success : function(result){
			if (result.status = "setListOk"){
				$('#delete2_item'+id).remove();
				$('#select2_item'+id).remove();
			}
		}, error : function(e){
			console.log("Error" + e);
		}
	});
}

$('#editStaff').on('show.bs.modal', function(event){
	var button = $(event.relatedTarget);
	var code = button.data('code');
	var name = button.data('name');
	var phoneNumber = button.data('phonenumber');
	var address = button.data('address');
	var identityCard = button.data('identitycard');
	var homeTown = button.data('hometown');
	var salary = button.data('salary');
	
	$("#editStaff").find("#staff_code").val(code);
	$("#editStaff").find("#staff_name").val(name);
	$("#editStaff").find("#staff_phone_number").val(phoneNumber);
	$("#editStaff").find("#staff_address").val(address);
	$("#editStaff").find("#staff_identity_card").val(identityCard);
	$("#editStaff").find("#staff_home_town").val(homeTown);
	$("#editStaff").find("#staff_salary").val(salary);
});