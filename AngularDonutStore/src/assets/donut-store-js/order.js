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
	
	$("#formTest").submit(function(e){
		e.preventDefault();
		var testinput = $("#testInput").val();
		var submit = $("#submit-test").val();
		$.ajax({
			type: "post",
			dataType : "text",
			url : "test",
			data: {
				nameCreate : testinput,
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
	
	$('.form_datetime').datetimepicker({
        startDate: new Date() ,
        endDate : new Date(new Date().getTime()+1000*60*60*36),//limit 36 hours
        todayHighlight: true,
        weekStart: 1,
        autoclose: 1,
        inline: true,
        sideBySide: true
    });
	var orderNameCreated = $('#nameCreate').val();
	var orderPhoneReceiver = $('#phoneReceiver').val();
	var orderDateDone = $('#dateDone').val();
	
	$('#error-name').hide();
	$('#error-phone').hide();
	$('#error-date').hide();
	var errorName = false;
	var errorPhone = false;
	var errorDate = false;
	var subimt = $('submitOrder').val();
	
	$('#nameCreate').focusout(function(){
		checkName();
	});
	$('#phoneReceiver').focusout(function(){
		checkPhone();
	});
	$('#dateDone').focusout(function(){
		checkDate();
	});
	
	$('#createOrder').submit(function(){
		errorName = false;
		errorPhone = false;
		errorDate = false;
		
		checkName();
		checkPhone();
		checkDate();
		if(errorName == false && errorPhone == false && errorDate == false){
			return true;
		} else {
			return false;
		}
	});
	
	function checkName(){
		var nameCreate = $('#nameCreate').val().length;
		if(nameCreate == 0){
			$('#error-name').html("Hãy nhập tên");
			$('#error-name').show();
			errorName = true;
		} else {
			$('#error-name').hide();
		}
	}
	function checkPhone(){
		var phoneReceiver = $('#nameCreate').val().length;
		if(phoneReceiver == 0){
			$('#error-phone').html("Hãy nhập số điện thoại");
			$('#error-phone').show();
			errorPhone = true;
		} else {
			$('#error-phone').hide();
		}
	}
	function checkDate(){
		var nameCreate = $('#dateDone').val().length;
		if(nameCreate == 0){
			$('#error-date').html("Hãy nhập thời gian");
			$('#error-date').show();
			errorDate = true;
		} else {
			$('#error-date').hide();
		}
	}
});

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
				$('#shippingPrice').val(distance*5500 + " nghìn");
			}
		});
		
		marker1.setVisible(false);
		marker2.setPosition(place.geometry.location);
		marker2.setVisible(true);
	});	
}