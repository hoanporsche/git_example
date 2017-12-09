$(document).ready(function(){
	//Submit form
	$('#customerForm').submit(function(event){
		//Prevent the form from submitting via the browser.
		event.preventDefault();
		ajaxPost();
	});
	
	function ajaxPost(){
		
		//Prepare form data
		var formData = {
			firstName : $('#firstname').val(),
			lastName : $('#lastname').val()
		}
		
		//Do post
		$.ajax({
			type : 'POST',
			contentType : 'application/json',
			url : "/save",
			data : JSON.stringify(formData),
			dataType : 'json',
			success : function(result){
				if(result.status == "Done"){
					$('#postResultDiv').html(
						"<p style='background-color:#7FA7B0; color:white; padding:20px 20px 20px 20px;'>" +
						"Post Successfully! </br>" +
						"---> Customer's info : FirstName = " + result.data.firstName +
						" , LastName = " + result.data.lastName +
						"</p>"
					);
				} else {
					$('#postResultDiv').html('<strong>Error</strong>')
				}
				console.log(result);
			},
			error : function(e){
				alert('Error!');
				console.log('ERROR: ' , e);
			}
		});
		
		//Reset FormData after Posting
		resetData();
	}
	
	function resetData(){
		$('#firstname').val('');
		$('#lastname').val('');
	}
})