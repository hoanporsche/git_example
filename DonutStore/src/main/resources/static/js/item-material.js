$(document).ready(function(){
	var step = 0;
	var id = 2;
	
	
	$('#btn-newMaterial').click(function(){
		var count = $('.btn_ok[disabled]').length;
		
		console.log(count);
		if($('.btn_ok').is(':disabled')==true ){
		$.ajax({
			type : "get",
			url : "getListMaterial",
			success : function(result){
				if(result.status == "getListMaterial"){				
					$('#newMaterial').append('<select id="select_material'+ id +'" class="selectpicker"><option value="0">Lựa chọn nguyên liệu</option></select>'
							+ '<button type="button" class="btn" id="btn-ok'+id+'" onClick="saveMaterial('+id+')"><span class="glyphicon glyphicon-ok"></span></button>'
							+ '<button type="button" class="btn" id="btn-remove'+id+'" onClick="deleteMaterial('+id+')" disabled="disabled"><span class="glyphicon glyphicon-remove"></span></button>');
					$.each(result.data, function(i, material){
						$('#select_material'+id).append('<option value="'+ material.materialCode + '">'+ material.materialName + '</option>');
					});		
					id++;
					console.log("Success: ", result);
				}
			},error : function(e) {
				console.log("Fail : ", e);
			}
		});
		}
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
	var code = button.data('code');
	var name = button.data('name');
	var dateCreated = button.data('datecreated');
	var singleValue = button.data('singlevalue');
	var remain = button.data('remain');
	var supplyName = button.data('supplyname');
	var supplyPhone = button.data('supplyphone');
	var modal = $(this);
	
	$("#editMaterial").find("#material-code").val(code);
	$("#editMaterial").find("#material-name").val(name);
	$("#editMaterial").find("#material-date-created").val(dateCreated);
	$("#editMaterial").find("#material-singleValue").val(singleValue);
	$("#editMaterial").find("#material-remain").val(remain);
	$("#editMaterial").find("#material-supplyName").val(supplyName);
	$("#editMaterial").find("#material-supplyPhone").val(supplyPhone);
	
});

function saveMaterial(id){
	var materialCode = $('#select_material'+id).val();
	if (materialCode != 0){
		$('#btn-ok'+id).attr("disabled","disabled");
		$('#btn-remove'+id).removeAttr('disabled');
		
		console.log(materialCode);
		$.ajax({
			type : "post",
			url : "setListMaterialForItem",
			contentType : "application/json",
			dataType : 'json',
			data : JSON.stringify(materialCode),
			success : function(){
				$('#btn-ok'+id).attr("disabled","disabled");
				$('#btn-remove'+id).removeAttr('disabled');
			}, error : function(e){
				console.log("error" + e);
			}
		});
	}
	
}

function deleteMaterial(id){
	$('#btn-remove'+id).attr("disabled","disabled");
	$('#btn-ok'+id).removeAttr('disabled');
}