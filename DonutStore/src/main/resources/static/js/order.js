/**
 * @author HoanVD - 31/10/2017.
 * open div #show_br when button #br checked
 * @returns
 */
$('#br').change(function(){
	if(this.checked){
		$('#show_br').fadeIn('fast');
	}else{
		$('#show_br').fadeOut('fast');
		$('#brmValue').val("");
		$('#brnValue').val("");
	}
});

$('#bm').change(function(){
	if(this.checked){
		$('#show_bm').fadeIn('fast');
	}else{
		$('#show_bm').fadeOut('fast');
		$('#bmtValue').val("");
		$('#bmxxValue').val("");
		$('#bmtxxValue').val("");
	}
});

$('#du').change(function(){
	if(this.checked){
		$('#show_du').fadeIn('fast');
	}else{
		$('#show_du').fadeOut('fast');
		$('#cocaValue').val("");
		$('#tradaValue').val("");
		$('#mirindaValue').val("");
	}
});

$(document).ready(function(){	
	$('#error-name').hide();
	$('#error-phone').hide();
	$('#error-date').hide();
	
	$('#nameCreate').focusout(function(){
		var nameCreate = $('#nameCreate').val().length;
		if(nameCreate == 0){
			$('#error-name').html("Hãy nhập tên");
			$('#error-name').show();
		} else {
			$('#error-name').hide();
		}
	});
	$('#phoneReceiver').focusout(function(){
		var phoneReceiver = $('#nameCreate').val().length;
		if(phoneReceiver == 0){
			$('#error-phone').html("Hãy nhập số điện thoại");
			$('#error-phone').show();
		} else {
			$('#error-phone').hide();
		}
	});
	$('#dateDone').focusout(function(){
		var nameCreate = $('#dateDone').val().length;
		if(nameCreate == 0){
			$('#error-date').html("Hãy nhập thời gian");
			$('#error-date').show();
		} else {
			$('#error-date').hide();
		}
	});
});

//$(document).ready(function(){
//	$('#createForm').submit(function(e){
//		e.preventDefault();
//		var nameCreate = $('#nameCreate').val();
//		var phoneReceiver = $('#phoneReceiver').val();
//		var dateDone = $('#dateDone').val();
//		var submit = $('#submitOrder').val();
//		
//		if(nameCreate == ""){
//			$("#error-name").html("Nhập thiếu Tên người nhận");
//			document.getElementById("nameCreate").className = document.getElementById("nameCreate").className + " error-input";
//		}else{
//			document.getElementById("nameCreate").style.borderStyle='solid';
//			document.getElementById("nameCreate").style.borderWidth='1px';
//			document.getElementById("nameCreate").style.borderColor='#ccc';
//			$("#error-name").remove();
//		}
//		
//		if(phoneReceiver == ""){
//			$("#error-phone").html("Nhập thiếu số điện thoại");
//			document.getElementById("phoneReceiver").className = document.getElementById("phoneReceiver").className + " error-input";
//		}else{
//			document.getElementById("phoneReceiver").style.borderStyle='solid';
//			document.getElementById("phoneReceiver").style.borderWidth='1px';
//			document.getElementById("phoneReceiver").style.borderColor='#ccc';
//			$("#error-phone").remove();
//		}
//		
//		if(dateDone == ""){
//			$("#error-date").html("Nhập thiếu thời gian lấy hàng");
//			document.getElementById("dateDone").className = document.getElementById("dateDone").className + " error-input";
//		}else{
//			document.getElementById("dateDone").style.borderStyle='solid';
//			document.getElementById("dateDone").style.borderWidth='1px';
//			document.getElementById("dateDone").style.borderColor='#ccc';
//			$("#error-date").remove();
//		}
//		
//		$.ajax({
//			type: "post",
//			dataType : "text",
//			url : "/createOrder",
//			data: {
//				orderNameCreated : nameCreate,
//				orderPhoneNumber : phoneReceiver,
//				action : submit
//			}, 
//			success : function(data){
//				window.location.href = "order";
//			},
//			error : function(e){
//				
//			}
//		});
//	});
//});

$('#isShipping').change(function(){
	var isShipping = $('#isShipping').val();
	if(isShipping == 1){
		$('#show_is_shipping').show()
		showGgmaps();
	}else{
		$('#show_is_shipping').hide();
	}
});

function showGgmaps(){
	var latlng = new google.maps.LatLng(21.026846,105.821322);
	var myOptions = {
		zoom: 16,
		center:latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("show_ggmaps"),myOptions);
	var marker1 = new google.maps.Marker({
		position: latlng,
	    map: map, 
	    //icon:"banhran.jpg", đây là icon cho marker
	    title:"Bánh Rán Giảng Võ, 113/D6 Trần Huy Liệu"
	});
	var latlng2 = new google.maps.LatLng(21.126846,105.821322);
	var marker2 = new google.maps.Marker({
		position: latlng2,
		map: map,
		title: "Vị trí của bạn"
	});
	marker2.setVisible(false);
	
	//Bắt đầu sử dụng autocomple place
	
	var newplace = document.getElementById("ggmaps_input");
	var autocomplete = new google.maps.places.Autocomplete(newplace);
	autocomplete.bindTo('bounds', map);//gắn nó vào map
	
	var directionsService = new google.maps.DirectionsService;
	var directionsDisplay = new google.maps.DirectionsRenderer;
	directionsDisplay.setMap(map);
	var service = new google.maps.DistanceMatrixService;
	
	autocomplete.addListener('place_changed',function(){
		var place = autocomplete.getPlace();	
		
		if (!place.geometry) {
			window.alert(place.name + " không tồn tại");
			return;
		}
		if (place.geometry.viewport) {
			map.fitBounds(place.geometry.viewport);
		} else {
			map.setCenter(place.geometry.location);
		}
		
		var destinationPlaceId = place.place_id;
		var destinationLocation = place.geometry.location;

		//Bắt đầu sử dụng Directions
		directionsService.route({
			origin : {'placeId': "ChIJK7dSb3GrNTERxFvb2QVeOw8"},
			destination :{'placeId': destinationPlaceId},
			travelMode : 'DRIVING'
			}, function(response, status){
				if (status === 'OK'){
					directionsDisplay.setDirections(response);
				} else {
					window.alert('Directions request failed due to ' + status);
				}
		});
		
		service.getDistanceMatrix({
			origins:[latlng],
			destinations: [destinationLocation],
			travelMode: 'DRIVING',	
		},function(response, status) {
			if(status != 'OK'){
				alert('Error was: ' + status);
			}else {
				
				var results = response.rows[0].elements;
				document.getElementById('distance').value = results[0].distance.text;
				var distance = $('#distance').val();
				distance = distance.replace(" km","");
				distance = distance.replace(",",".");
				console.log(distance);
				$('#shippingPrice').val(distance*5000 + " nghìn");
			}
		});
		
		marker1.setVisible(false);
		marker2.setPosition(place.geometry.location);
		marker2.setVisible(true);
	});	
}