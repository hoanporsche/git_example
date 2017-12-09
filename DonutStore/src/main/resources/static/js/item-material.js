$(document).ready(function(){
	
	$("#editMaterialForm").submit(function(e){
		e.preventDefault();
		var id = $("#material-id").val();
		var name = $("#material-name").val();
		var dateCreated = $("#material-date-created").val();
		var singleValue = $("#material-singleValue").val();
		var remain = $("#material-remain").val();
		var supplyName = $("#material-supplyName").val();
		var supplyPhone = $("#material-supplyPhone").val();
		var submit = $("#submit-edit-material").val();
		
		if (name == ""){
			$("#error-material-name").html("Chưa nhập tên");
			$("#material-name").addClass("error-input");
		} else {
			$("#material-name").removeClass("error-input");
			$("#error-material-name").html("");
		}
		
		if (singleValue == "" || singleValue < 1000 || singleValue > 1000000){
			$("#error-single-value").html("Đơn giá sai hoặc rỗng");
			$("#material-singleValue").addClass("error-input");
		} else {
			$("#material-singleValue").removeClass("error-input");
			$("#error-single-value").html("");
		}
		
		if (remain == "" || remain < 0 || remain > 1000){
			$("#error-remain").html("Chưa số lượng trong kho");
			$("#material-remain").addClass("error-input");
		} else {
			$("#material-remain").removeClass("error-input");
			$("#error-remain").html("");
		}
		
		if (supplyName == ""){
			$("#error-supply-name").html("Chưa nhập tên nhà cung cấp");
			$("#material-supplyName").addClass("error-input");
		} else {
			$("#material-supplyName").removeClass("error-input");
			$("#error-supply-name").html("");
		}
		
		if (supplyPhone = "" || supplyPhone.length < 10 || supplyPhone > 20){
			$("#error-supply-phone").html("Chưa nhập số điện thoại hoặc sai");
			$("#material-supplyPhone").addClass("error-input");
		} else {
			$("#material-supplyPhone").removeClass("error-input");
			$("#error-supply-phone").html("");
		}
		
		$.ajax({
			type : "POST",
			dataType: "text",
			url : "/admin/createMaterial",
			data : {
				materialId : id,
				materialName : name,
				materialDateCreated : dateCreated,
				materialSingleValue : singleValue,
				materialRemain : remain,
				materialSupplyName : supplyName,
				
				action : submit
			}, success : function(data) {
				window.location.href = "item-material";
//				alert(submit);
			}, error : function(e){
				alert("error" + e);
				console.log(e);
			}
		});
	});

	$("#addMaterialForm").submit(function(e){
		e.preventDefault();
		var name = $("#add-material-name").val();
		var dateCreated = $("#add-material-date-created").val();
		var singleValue = $("#add-material-singleValue").val();
		var remain = $("#add-material-remain").val();
		var supplyName = $("#add-material-supplyName").val();
		var supplyPhone = $("#add-material-supplyPhone").val();
		var submit = $("#submit-add-material").val();
		
		if (name == ""){
			$("#error-material-name-add").html("Chưa nhập tên");
			$("#add-material-name").addClass("error-input");
		} else {
			$("#add-material-name").removeClass("error-input");
			$("#error-material-name-add").html("");
		}
		
		if (singleValue == "" || singleValue < 1000 || singleValue > 1000000){
			$("#error-single-value-add").html("Đơn giá sai hoặc rỗng");
			$("#add-material-singleValue").addClass("error-input");
		} else {
			$("#material-singleValue").removeClass("error-input");
			$("#error-single-value-add").html("");
		}
		
		if (remain == "" || remain < 0 || remain > 1000){
			$("#error-remain-add").html("Chưa số lượng trong kho");
			$("#add-material-remain").addClass("error-input");
		} else {
			$("#add-material-remain").removeClass("error-input");
			$("#error-remain-add").html("");
		}
		
		if (supplyName == ""){
			$("#error-supply-name-add").html("Chưa nhập tên nhà cung cấp");
			$("#add-material-supplyName").addClass("error-input");
		} else {
			$("#add-material-supplyName").removeClass("error-input");
			$("#error-supply-name-add").html("");
		}
		
		if (supplyPhone = "" || supplyPhone.length < 10 || supplyPhone > 20){
			$("#error-supply-phone-add").html("Chưa nhập số điện thoại hoặc sai");
			$("#add-material-supplyPhone").addClass("error-input");
		} else {
			$("#add-material-supplyPhone").removeClass("error-input");
			$("#error-supply-phone-add").html("");
		}
		$.ajax({
			type: "post",
			dataType : "text",
			url : "createMaterial",
			data: {
				materialName : name,
				materialSingleValue : singleValue,
				materialRemain : remain,
				materialSupplyName : supplyName,
				materialSupplyPhone : supplyPhone,
				action : submit
			}, 
			success : function(data){
				window.location.href = "item-material";
			},
			error : function(e){
				alert("error" + e);
				console.log(e);
			}
		});
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