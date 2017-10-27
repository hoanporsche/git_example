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