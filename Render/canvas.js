function canvasText(ctx, text, x, y, style, font, align){
	ctx.font = font;
	ctx.fillStyle = style;
	ctx.textAlign = align;
	ctx.fillText(text, x, y);
}

function canvasCircle(ctx, x, y, r, startAngle, endAngle, style, isFill){
	ctx.fillStyle = style;
	ctx.beginPath();
	ctx.arc(x, y, r, startAngle, endAngle, false);
	if(isFill){
		ctx.fill();
	}
}