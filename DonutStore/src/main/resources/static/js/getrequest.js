$(document).ready(function(){
	//Get request
	$("#getAllCustomerId").click(function(event){
		event.preventDefault();
		ajaxGet();
	});
	
	//Do Get
	function ajaxGet(){
		$.ajax({
			type : "GET",
			url : window.location + "/all",
			success : function(result){
				if(result.status == "Done"){
					$("#getResultDiv ul").empty();
					var custList = "";
					$.each(result.data, function(i, customer){
						var customer = "- Customer with Id = " + i + " ,FirstName : " + customer.firstName + " ,LastName : " + customer.lastName + "</br>";
						$("#getResultDiv .list-group").append("<li><h4 class='list-group-item'>"+customer+"</h4></li>");
					});
					console.log("Success: ", result);
				} else {
					$("#getResultDiv").html("<strong>Error</strong>");
					console.log("Fail : ", result);
				}
			},
			error : function(e) {
				$("#getResultDiv").html("<strong>Error</strong>");
				console.log("ERROR: ",e);
			}
		});
	}
})