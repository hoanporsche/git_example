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
	}else{
		$('#show_is_shipping').hide();
	}
});

$(document).ready(function(){
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
	      title:"Bánh Rán Giảng Võ, 113/D6 Trần Huy Liệu"
	    });
	var card = document.getElementById('pac-card');
    var input = document.getElementById('pac-input');// lấy dữ liệu nhập vào
    var types = document.getElementById('type-selector');
    var strictBounds = document.getElementById('strict-bounds-selector');

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
	
	var autocomplete = new google.maps.places.Autocomplete(input);
	
	// Bind the map's bounds (viewport) property to the autocomplete object,
    // so that the autocomplete requests use the current map bounds for the
    // bounds option in the request.
    autocomplete.bindTo('bounds', map);
    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker({
      map: map,
      anchorPoint: new google.maps.Point(0, -29)
    });

    autocomplete.addListener('place_changed', function() {
      infowindow.close();
      marker.setVisible(false);
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        window.alert("No details available for input: '" + place.name + "'");
        return;
      }

      // If the place has a geometry, then present it on a map.
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
      }
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);

      var address = '';
      if (place.address_components) {
        address = [
          (place.address_components[0] && place.address_components[0].short_name || ''),
          (place.address_components[1] && place.address_components[1].short_name || ''),
          (place.address_components[2] && place.address_components[2].short_name || '')
        ].join(' ');
      }

      infowindowContent.children['place-icon'].src = place.icon;
      infowindowContent.children['place-name'].textContent = place.name;
      infowindowContent.children['place-address'].textContent = address;
      infowindow.open(map, marker);
    });

    // Sets a listener on a radio button to change the filter type on Places
    // Autocomplete.
    function setupClickListener(id, types) {
      var radioButton = document.getElementById(id);
      radioButton.addEventListener('click', function() {
        autocomplete.setTypes(types);
      });
    }

    setupClickListener('changetype-all', []);
    setupClickListener('changetype-address', ['address']);
    setupClickListener('changetype-establishment', ['establishment']);
    setupClickListener('changetype-geocode', ['geocode']);

    document.getElementById('use-strict-bounds')
        .addEventListener('click', function() {
          console.log('Checkbox clicked! New state=' + this.checked);
          autocomplete.setOptions({strictBounds: this.checked});
        });
});