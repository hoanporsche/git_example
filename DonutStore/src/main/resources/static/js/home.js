$(document).ready(function(){
	var type = 1;
	if(type == 1){
		btn2(type);
		type = 2;
	}
	if(type == 2){
		btn2(1);
		type=1;
	}
});	
function btn2(type){
		if(type == 1){
		$("#btn2").click(function(){
			$("#show").html('');
			$("#show").html('<p align="center">Nut 2 hien thi Type = 1</p>');
			type = 2;
			console.log(type);
		});}
		if(type == 2){
			$("#btn2").one('click',function(){
				$("#show").html('');
				$("#show").html('<p align="center">Nut 2 hien thi Type = 2</p>');
			});
		}
	}
	
	
		$("#btn3").click(function(){
			$("#show").html('');
			$("#show").html('<p align="center">Nut 3 hien thi Type = 2</p>');
		});
	
function btn1(){
	$("#btn1").one('click',function(){
		$("#show").html('<p align="center">Nut 1 hien thi Type =1</p>');
		
	});
}