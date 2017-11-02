$(document).ready(function(){
	var index=1;
	show(index)
	$("#next").on("click", function(){
		show(index += 1);
	});
	$("#prev").on("click", function(){
		show(index += -1 );
	});
	function show(n){
		var i;
		var x=document.getElementsByClassName("slide");
		if(n> x.length)
			index = 1;
		if(n<1)
			index = x.length;
		for (i=0;i<x.length;i++){
			x[i].style.display = "none";
		}
		x[index-1].style.display = "block";
	}
});

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