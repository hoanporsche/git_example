$(document).ready(function(){
	$('#addItem').validate({
		rules : {
			itemName : "required",
			itemSingleValue : {
				required : true,
				min : 1000,
				max : 25000,
			}
		},
		messages : {
			itemName : "Hãy nhập tên của mặt hàng",
			itemSingleValue : {
				
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
			},
			materialRemain : {
				required : true,
				min : 0,
				max : 100
			},
			materialSupplyName : "required",
			materialSupplyPhone : {
				required : true,
				minlength : 10,
				maxlength : 20
			},
		},
		messages : {
			materialName : "Hãy nhập tên nguyên liệu" ,
			materialSingleValue : {
				required : "Hãy nhập đơn giá",
				min : "phải lớn hơn 1.000",
				max : "phải nhỏ hơn 1.000.000"
			},
			materialRemain : {
				required : "Hãy nhập số lượng trong kho",
				min : "không được âm",
				max : "phải nhỏ hơn 100"
			},
			materialSupplyName : "Hãy nhập tên nhà cung cấp",
			materialSupplyPhone : {
				required : "Hãy nhập số điện thoại nhà cung cấp",
				minlength : "quá ngắn",
				maxlength : "quá dài"
			},
		}
	});
	
	$('#addMaterialForm').validate({
		rules : {
			materialName : "required" ,
			materialSingleValue : {
				required : true,
				min : 1000,
				max : 1000000
			},
			materialRemain : {
				required : true,
				min : 0,
				max : 100
			},
			materialSupplyName : "required",
			materialSupplyPhone : {
				required : true,
				minlength : 10,
				maxlength : 20
			},
		},
		messages : {
			materialName : "Hãy nhập tên nguyên liệu" ,
			materialSingleValue : {
				required : "Hãy nhập đơn giá",
				min : "phải lớn hơn 1.000",
				max : "phải nhỏ hơn 1.000.000"
			},
			materialRemain : {
				required : "Hãy nhập số lượng trong kho",
				min : "không được âm",
				max : "phải nhỏ hơn 100"
			},
			materialSupplyName : "Hãy nhập tên nhà cung cấp",
			materialSupplyPhone : {
				required : "Hãy nhập số điện thoại nhà cung cấp",
				minlength : "quá ngắn",
				maxlength : "quá dài"
			},
		}	
	});
});

$("#editMaterial").on("show.bs.modal",function(event){
	var button = $(event.relatedTarget);
	var id = button.data('id');
	var name = button.data('name');
	var dateCreated = button.data('datecreated');
	var singleValue = button.data('singlevalue');
	var remain = button.data('remain');
	var supplyName = button.data('supplyname');
	var supplyPhone = button.data('supplyphone');
	var modal = $(this);
	
	$("#editMaterial").find("#material-id").val(id);
	$("#editMaterial").find("#material-name").val(name);
	$("#editMaterial").find("#material-date-created").val(dateCreated);
	$("#editMaterial").find("#material-singleValue").val(singleValue);
	$("#editMaterial").find("#material-remain").val(remain);
	$("#editMaterial").find("#material-supplyName").val(supplyName);
	$("#editMaterial").find("#material-supplyPhone").val(supplyPhone);
	
});