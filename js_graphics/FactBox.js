"use strict";

function FactBox(title, text, image = null) {
	this.title = title;
    this.text = text;
    this.image = image;
}

FactBox.prototype.draw = function (context) {

	var cornerRadius = 25;
	var upLeft = {
		x:context.canvas.width / 2 + 50 ,
		y:50
	};
	var downRight = {
		x:context.canvas.width - 50,
		y:context.canvas.height - 100
	};
	console.log(upLeft);
	console.log(downRight);

    context.save();

    context.lineWidth = 0;
    context.strokeStyle = '#777777';
    context.shadowColor = '#FFFFFF';
    context.shadowBlur = 20;
    context.globalAlpha = 0.4;
    context.fillStyle = '#555555';

    context.beginPath();
    context.moveTo(upLeft.x + cornerRadius, upLeft.y);
	context.lineTo(downRight.x - cornerRadius, upLeft.y);
	context.quadraticCurveTo(downRight.x, upLeft.y, downRight.x, upLeft.y + cornerRadius);
	context.lineTo(downRight.x, downRight.y-cornerRadius);
	context.quadraticCurveTo(downRight.x, downRight.y, downRight.x - cornerRadius, downRight.y);
	context.lineTo(upLeft.x + cornerRadius, downRight.y);
	context.quadraticCurveTo(upLeft.x, downRight.y, upLeft.x, downRight.y-cornerRadius);
	context.lineTo(upLeft.x, upLeft.y + cornerRadius);
	context.quadraticCurveTo(upLeft.x, upLeft.y, upLeft.x + cornerRadius, upLeft.y);

	context.closePath();
	context.fill();
	context.stroke();
    context.restore();

    //Draw title
    context.fillStyle = '#FFFFFF';
    context.textAlign = "center";
    context.font = '30px Calibri';
    context.fillText(this.title, 3 / 4 * context.canvas.width, 100);

    context.restore();

    //Draw text
	context.fillStyle = '#FFFFFF';
    context.textAlign = "center";
    context.font = '20px Calibri';
    context.fillText(this.text, 3 / 4 * context.canvas.width, 125);

    context.restore();


}