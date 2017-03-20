function draw(content){
	// LIMPA TELA
	content.clearRect(-1*(canvas.width / 2), -1*(canvas.height / 2), canvas.width, canvas.height);
		
	object.draw(content);
		
	// DESENHA UM CIRCULO MOVENDO-SE JUNTO COM O MOUSE
	// canvasCircle(x, y, r, startAngle, endAngle, style, isFill)
	canvasCircle(content, -1*(canvas.width / 2) + Mouse.x, -1*(canvas.height / 2) + Mouse.y, 2, 0, 2*Math.PI, "#000000", true);
	
	// EXIBE O FPS NA TELA
	// canvasText(ctx, text, x, y, style, font, align)
	canvasText(content, "FPS " + fps_state, -1*(canvas.width / 2) + 30, -1*(canvas.height / 2) + 30, "blue", "12px Arial", "center");
}