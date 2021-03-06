$(document).ready(function(){
	var step = 0;
	var id;
	$('.btn-add-edit').click(function(){
		id = 2;
	});
	
	$('#btn-newMaterial').click(function(){
		$.ajax({
			type : "get",
			url : "getRemainMaterial",
			success : function(result){
				if(result.status == "getRemainMaterial"){				
					$('#newMaterial').append('<select id="select_material'+ id +'" class="selectpicker"><option value="0">Lựa chọn nguyên liệu</option></select>'
							+ '<button type="button" class="btn" id="btn-ok'+id+'" onClick="saveMaterial('+id+')"><span class="glyphicon glyphicon-ok"></span></button>'
							+ '<button type="button" class="btn" id="btn-remove'+id+'" onClick="deleteMaterial('+id+')" disabled="disabled"><span class="glyphicon glyphicon-remove"></span></button>');
					$.each(result.data, function(i, material){
						$('#select_material'+id).append('<option value="'+ material.materialCode + '">'+ material.materialName + '</option>');
					});		
					id++;
					console.log("Success: ", result);
				} else {
					alert("Please click button OK first");
				}
			},error : function(e) {
				console.log("Fail : ", e);
			}
		});
	});
	
	$('#addItemForm').validate({
		rules : {
			itemName : "required",
			itemSingleValue : {
				required : true,
				min : 3000,
				max : 30000,
			}
		},
		messages : {
			itemName : "Hãy nhập tên của mặt hàng",
			itemSingleValue : {
				required : "Hãy nhập đơn giá",
				min : "Phải lớn hơn 3.000",
				max : "Phải nhỏ hơn 30.000"
			}
		}
	});
	$('#editItemForm').validate({
		rules : {
			itemName : "required",
			itemSingleValue : {
				required : true,
				min : 3000,
				max : 30000,
			}
		},
		messages : {
			itemName : "Hãy nhập tên của mặt hàng",
			itemSingleValue : {
				required : "Hãy nhập đơn giá",
				min : "Phải lớn hơn 3.000",
				max : "Phải nhỏ hơn 30.000"
			}
		}
	});
	$("#editMaterialForm").validate({
		rules : {
			materialName : "required" ,
			materialSingleValue : {
				required : true,
				min : 1000,
				max : 1000000
			}
		},
		messages : {
			materialName : "Hãy nhập tên nguyên liệu" ,
			materialSingleValue : {
				required : "Hãy nhập đơn giá",
				min : "phải lớn hơn 1.000",
				max : "phải nhỏ hơn 1.000.000"
			}
		}
	});	
	$('#addMaterialForm').validate({
		rules : {
			materialName : "required" ,
			materialSingleValue : {
				required : true,
				min : 1000,
				max : 1000000
			}
		},
		messages : {
			materialName : "Hãy nhập tên nguyên liệu" ,
			materialSingleValue : {
				required : "Hãy nhập đơn giá",
				min : "phải lớn hơn 1.000",
				max : "phải nhỏ hơn 1.000.000"
			}
		}	
	});
	$("#editItem").on("show.bs.modal",function(event){
		var button = $(event.relatedTarget);
		var code = button.data('code');
		var name = button.data('name');
		var singleValue = button.data('singlevalue');
		var date = button.data('date');
		var modal = $(this);
		
		$.ajax({
			type : 'post',
			url : 'setOldListMaterial',
			contentType : 'application/json',
			dateType : 'json',
			data : JSON.stringify(code),
			success : function(result){
				if(result.status == "setListOk"){
					$('#edit_newMaterial').html('<button type="button" class="btn-success" id="edit_btn-newMaterial"><span class="glyphicon glyphicon-plus-sign">Thêm nguyên liệu</span></button><br/>');
					$.each(result.data, function(i, material){
						$('#edit_newMaterial').append('<select id="edit_select_material'+id+'" class="selectpicker">'
								+'<option value="'+material.materialCode+'">'+material.materialName+'</option></select>'
								+ '<button type="button" class="btn" id="edit_btn-remove'+id+'" onClick="deleteMaterial2('+id+')"><span class="glyphicon glyphicon-remove"></span></button>'
						);
						id++;
					});
					$('#edit_newMaterial').append('<select id="edit_select_material'+ id +'" class="selectpicker"><option value="0">Lựa chọn nguyên liệu</option></select>'
							+ '<button type="button" class="btn" id="edit_btn-ok'+id+'" onClick="saveMaterial2('+id+')"><span class="glyphicon glyphicon-ok"></span></button>'
							+ '<button type="button" class="btn" id="edit_btn-remove'+id+'" onClick="deleteMaterial2('+id+')" disabled="disabled"><span class="glyphicon glyphicon-remove"></span></button>');
					$.each(result.data2, function(i, material){
						$('#edit_select_material'+id).append('<option value="'+ material.materialCode + '">'+ material.materialName + '</option>');
					});		
					id++;
					getListForEdit(id);
				} else {
					alert("Please dont fix my material Code");
				}
			}, error : function(e){
				console.log("error" + e);
			}
		});
		
		$('#editItem').find('#item_code').val(code);
		$('#editItem').find('#item_name').val(name);
		$('#editItem').find('#item_single_value').val(singleValue);
		$('#editItem').find('#item_date_created').val(date);
	});
});

$("#editMaterial").on("show.bs.modal",function(event){
	var button = $(event.relatedTarget);
	var code = button.data('code');
	var name = button.data('name');
	var dateCreated = button.data('datecreated');
	var singleValue = button.data('singlevalue');
	var modal = $(this);
	
	$("#editMaterial").find("#material-code").val(code);
	$("#editMaterial").find("#material-name").val(name);
	$("#editMaterial").find("#material-date-created").val(dateCreated);
	$("#editMaterial").find("#material-singleValue").val(singleValue);
});


$('#editItem').on('hidden.bs.modal',function(){
	$.ajax({
		type : "get",
		url : "deleteAllMaterials"
	});
});

$('#addItem').on('hidden.bs.modal',function(){
	$.ajax({
		type : "get",
		url : "deleteAllMaterials"
	});
});

function saveMaterial(id){
	var materialCode = $('#select_material'+id).val();
	if (materialCode != 0){
		
		console.log(materialCode);
		$.ajax({
			type : "post",
			url : "saveOneMaterial",
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(materialCode),
			success : function(result){
				if(result.status == "setListOk"){
					$('#btn-ok'+id).remove();
					$('#btn-remove'+id).removeAttr('disabled');
					$('#select_material'+id).prop("disabled", true);
				} else {
					alert("Please don't change my Material Code");
					window.location.href="item-material";
				}
			}, error : function(e){
				console.log("error" + e);
			}
		});
	}
}

function saveMaterial2(id){
	var materialCode = $('#edit_select_material'+id).val();
	if (materialCode != 0){
		$.ajax({
			type : "post",
			url : "saveOneMaterial",
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(materialCode),
			success : function(result){
				if(result.status == "setListOk"){
					$('#edit_btn-ok'+id).remove();
					$('#edit_btn-remove'+id).removeAttr('disabled');
					$('#edit_select_material'+id).prop("disabled", true);
				} else {
					alert("Please don't change my Material Code");
					window.location.href="item-material";
				}
			}, error : function(e){
				console.log("error" + e);
			}
		});
	}
}

function deleteMaterial(id){
	var materialCode = $('#select_material'+id).val();
	if (materialCode != 0){
		$.ajax({
			type : "post",
			url : "deleteOneMaterial",
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(materialCode),
			success : function(result){
				if(result.status == "setListOk"){
					$('#btn-remove'+id).remove();
					$('#select_material'+id).remove();
				} else {
					alert("Please don't change my Material Code");
					window.location.href="item-material";
				}
			}, error : function(e){
				console.log("error" + e);
			}
		});
	}
}

function deleteMaterial2(id){
	var materialCode = $('#edit_select_material'+id).val();
	if (materialCode != 0){
		$.ajax({
			type : "post",
			url : "deleteOneMaterial",
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(materialCode),
			success : function(result){
				if(result.status == "setListOk"){
					$('#edit_btn-remove'+id).remove();
					$('#edit_select_material'+id).remove();
				} else {
					alert("Please don't change my Material Code");
					window.location.href="item-material";
				}
			}, error : function(e){
				console.log("error" + e);
			}
		});
	}
}

function getListForEdit(id){
	$('#edit_btn-newMaterial').click(function(){
		$.ajax({
			type : "get",
			url : "getRemainMaterial",
			success : function(result){
				if(result.status == "getRemainMaterial"){				
					$('#edit_newMaterial').append('<select id="edit_select_material'+ id +'" class="selectpicker"><option value="0">Lựa chọn nguyên liệu</option></select>'
							+ '<button type="button" class="btn" id="edit_btn-ok'+id+'" onClick="saveMaterial2('+id+')"><span class="glyphicon glyphicon-ok"></span></button>'
							+ '<button type="button" class="btn" id="edit_btn-remove'+id+'" onClick="deleteMaterial2('+id+')" disabled="disabled"><span class="glyphicon glyphicon-remove"></span></button>');
					$.each(result.data, function(i, material){
						$('#edit_select_material'+id).append('<option value="'+ material.materialCode + '">'+ material.materialName + '</option>');
					});		
					id++;
					console.log("Success: ", result);
				} else {
					alert("Please click button OK first");
				}
			},error : function(e) {
				console.log("Fail : ", e);
			}
		});
	});
}

$(document).ready(function(){
	$('#addCategoryForm').validate({
		rules : {
			categoryName : {
				required : true,
				maxlength : 255,
				minlength : 10
			}
		},
		messages : {
			categoryName : {
				required : "Hãy nhập tên nhãn",
				maxlength : "Qúa dài",
				minlength : "Qúa ngắn"
			}
		}
	});
	$('#editCategoryForm').validate({
		rules : {
			categoryName : {
				required : true,
				maxlength : 255,
				minlength : 10
			}
		},
		messages : {
			categoryName : {
				required : "Hãy nhập tên nhãn",
				maxlength : "Qúa dài",
				minlength : "Qúa ngắn"
			}
		}
	});
	$('#addSupplyForm').validate({
		rules : {
			supplyName : {
				required : true,
				maxlength : 255,
				minlength : 10
			}, supplyPhone : {
				required : true,
				maxlength : 255,
				minlength : 10
			}, supplyAddress : {
				required : true,
				maxlength : 255,
				minlength : 10
			}
		},
		messages : {
			supplyName : {
				required : "Yêu cầu nhập",
				maxlength : "QUá dài",
				minlength : "QUá ngắn"
			}, supplyPhone : {
				required : "Yêu cầu nhập",
				maxlength : "QUá dài",
				minlength : "QUá ngắn"
			}, supplyAddress : {
				required : "Yêu cầu nhập",
				maxlength : "QUá dài",
				minlength : "QUá ngắn"
			}
		}
	});
	$('#editSupplyForm').validate({
		rules : {
			supplyName : {
				required : true,
				maxlength : 255,
				minlength : 10
			}, supplyPhone : {
				required : true,
				maxlength : 255,
				minlength : 10
			}, supplyAddress : {
				required : true,
				maxlength : 255,
				minlength : 10
			}
		},
		messages : {
			supplyName : {
				required : "Yêu cầu nhập",
				maxlength : "QUá dài",
				minlength : "QUá ngắn"
			}, supplyPhone : {
				required : "Yêu cầu nhập",
				maxlength : "QUá dài",
				minlength : "QUá ngắn"
			}, supplyAddress : {
				required : "Yêu cầu nhập",
				maxlength : "QUá dài",
				minlength : "QUá ngắn"
			}
		}
	});
	
	$('#editCategory').on('show.bs.modal', function(event){
		var button = $(event.relatedTarget);
		var code = button.data('code');
		var name = button.data('name');
		
		$('#editCategory').find('#category_code').val(code);
		$('#editCategory').find('#category_name').val(name);
	})
	
	$('#editSupply').on('show.bs.modal', function(event){
		var button = $(event.relatedTarget);
		
		var code = button.data('code');
		var name = button.data('name');
		var phone = button.data('phone');
		var address = button.data('address');
		
		$('#editSupply').find('#supply_code').val(code);
		$('#editSupply').find('#supply_name').val(name);
		$('#editSupply').find('#supply_phone').val(phone);
		$('#editSupply').find('#supply_address').val(address);
	})
});