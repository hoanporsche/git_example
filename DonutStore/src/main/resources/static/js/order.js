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
		
	}
});

$('#bm').change(function(){
	if(this.checked){
		$('#show_bm').fadeIn('fast');
	}else{
		$('#show_bm').fadeOut('fast');
	}
});

$('#du').change(function(){
	if(this.checked){
		$('#show_du').fadeIn('fast');
	}else{
		$('#show_du').fadeOut('fast');
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
		
		//Bắt đầu sử dụng Directions
		var directionsService = new google.maps.DirectionsService;
		var directionsDisplay = new google.maps.DirectionsRenderer;
		directionsDisplay.setMap(map);
		
		var destinationPlaceId = place.place_id;
//		var geocoder = new google.maps.Geocoder;
//		
//		geocoder.geocode({'location': latlng}, function(results, status) {
//		    if (status === google.maps.GeocoderStatus.OK) {
//		      if (results[0]) {
//                var originPlaceId  = results[0].place_id;
//                return originPlaceId;
//		      } else {
//		        window.alert('No results found');
//		      }
//		    } else {
//		      window.alert('Geocoder failed due to: ' + status);
//		    }
//		  });

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
		
		marker2.setPosition(place.geometry.location);
		marker2.setVisible(true);
	});	
}