$('#show_ggmaps').ready(function(){
	var latlng = new google.maps.LatLng(21.026846,105.821322);
	var myOptions = {
		zoom: 16,
		center:latlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("show_ggmaps"),myOptions);
	var marker = new google.maps.Marker({
	      position: latlng,
	      map: map,
	      title:"Bánh Rán Giảng Võ, 113/D6 Trần Huy Liệu"
	    });
});

// var FormControls = function () {
// 	var demo1 = function () {
// 		var latlng = new google.maps.LatLng(21.026846,105.821322);
// 		var myOptions = {
// 			zoom: 16,
// 			center:latlng,
// 			mapTypeId: google.maps.MapTypeId.ROADMAP
// 		}
// 		var map = new google.maps.Map(document.getElementById("show_ggmaps"),myOptions);
// 		var marker = new google.maps.Marker({
// 			  position: latlng,
// 			  map: map,
// 			  title:"Bánh Rán Giảng Võ, 113/D6 Trần Huy Liệu"
// 			});
// 	};
// 	return {
//         // public functions
//         init: function() {
//             demo1();  
//         }
//     };
// }();
// jQuery(document).ready(function() {    
//     FormControls.init();
// });