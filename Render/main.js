$(document).ready(function(){
	canvas 				= document.getElementById("canvas");
	content 			= canvas.getContext("2d");
	fps_controller 		= $('#fps_controller');
	fps_range			= $('#fps_range');
	
	Mouse.x = canvas.width / 2;
	Mouse.y = canvas.height / 2;

	console.log("Canvas Width " + canvas.width);
	console.log("Canvas Height " + canvas.height);
	
	// Mostra o valor do FPS ao lado da Range de controle
	fps_controller.change(function(){
		fps_range.html(fps_controller[0].value + " FPS");
	});
	
	$('#auto_rotation').click(function(e){
		auto_rotation = !auto_rotation;
		button_text = $('#auto_rotation');
		auto_rotation == true ? button_text.val("Ativado") : button_text.val("Desativado");
	});
	
	$('#view_mode').click(function(e){
		view_mode = (view_mode + 1) % 2;
		button_view_mode = $('#view_mode');
		view_mode == 0 ? button_view_mode.val("Orthographic") : button_view_mode.val("Perspectiva");
	});
	
	$('#position').click(function(e){
		pos_x = parseFloat($('#pos_x').val().replace(',', '.'));
		pos_y = parseFloat($('#pos_y').val().replace(',', '.'));
		pos_z = parseFloat($('#pos_z').val().replace(',', '.'));
	});
	
	$('#scale').click(function(e){
		scale_x = parseFloat($('#scale_x').val().replace(',', '.'));
		scale_y = parseFloat($('#scale_y').val().replace(',', '.'));
		scale_z = parseFloat($('#scale_z').val().replace(',', '.'));
	});
	
	$('#rotation').click(function(e){
		rotate_x = parseFloat($('#rotation_x').val().replace(',', '.'));
		rotate_y = parseFloat($('#rotation_y').val().replace(',', '.'));
		rotate_z = parseFloat($('#rotation_z').val().replace(',', '.'));
	});
	
	$("#input_open").change(function(e){
		var fileName = $("#input_open").val();
		var jsonData = null;
		var data = $.ajax({
		  url:fileName,
		  success: function (data){   
			jsonData = JSON.parse(data);
			console.log(jsonData);			
			return data 
			}
		});
	});
	
	content.translate(canvas.width / 2, canvas.height / 2);
	
	// VAR MAIN
	cube = new render();
	cube.loadObj("cube.js");
	
	canvas.onmousemove = function(event){
		var rect = canvas.getBoundingClientRect();
		Mouse.x = event.clientX - rect.left;
		Mouse.y = event.clientY - rect.top;
	}
	
	canvas.onmousedown = function(event){
		var rect = canvas.getBoundingClientRect();
		Mouse.dragOffset.x = event.clientX - rect.left;
		Mouse.dragOffset.y = event.clientY - rect.top;
		Mouse.drag = true;
	}
	
	canvas.onmouseup = function(event){
		Mouse.drag = false;
	}

	// LOOP PRINCIPAL ...
	var updateCanvas = true;
	function mainLoop(){
		if(updateCanvas){
			update(content);
			draw(content);
			fps_count++;
		}
	}

	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame;
	
	// A cada 1000 / fps milisegundos (FPS), desenhar a tela novamente
	function setTimeOutLoop(){
		setTimeout(function(){
			requestAnimationFrame(mainLoop);
			setTimeOutLoop();
		}, 1000 / fps_controller[0].value);
	}
	
	// A cada 1 segundo, exibir quantos FPS a tela está sendo atualizada
	function setTimeOutFPS(){
		setTimeout(function(){
			fps_state = fps_count;
			fps_count = 0;
			setTimeOutFPS();
		}, 1000);
	}
	
	setTimeOutLoop();
	setTimeOutFPS();
});