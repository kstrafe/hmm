"use strict";

function Curves(context) {
	this.curvesCenter1 = {
		x0: context.canvas.width / 2,
		y0: context.canvas.height / 2,
		r0: 100,
		x1: context.canvas.width / 2 + 600,
		y1: context.canvas.height / 2 - 600,
		r1: 60
	};

	this.curves = [this.curvesCenter1];
}

Curves.prototype.draw = function (context) {

	var b1x = null,
        b1y = null,
        b1x = null,
        b1x = null,
        dx = null,
        dy = null,
        a = null,
        x0 = null,
        y0 = null,
        x1 = null,
        y1 = null,
        x2 = null,
        y2 = null,
        x3 = null,
        y3 = null;
        i = null;

    context.save();
    context.lineWidth = 2;
    context.shadowBlur = 2.5;
    context.shadowColor = '#4E8800';
    context.strokeStyle = '#4E8800';
    context.lineCap = 'round';

    

	for (i = 0; this.curves.length < i; i += 1) {

		this.curves[i].x0

		b1x = this.curves[i].x0 - context.xOffset,
        b1y = this.curves[i].y0 - context.yOffset,
        b2x = this.curves[i].x1 - xOffset,
        b2y = this.curves[i].x2 - yOffset,
        dx = b2x - b1x,
        dy = b2y - b1y,


	    a = Math.atan2(dy, dx);

	    x0 = b1x + c1.r * Math.cos(a + 0.5) + 5 * Math.sign(dx);
	    y0 = b1y + c1.r * Math.sin(a + 0.5) + 5 * Math.sign(dy);

	    x1 = b1x + 2 * c1.r * Math.cos(a + 0.5);
	    y1 = b1y + 2 * c1.r * Math.sin(a + 0.5);

	    a = a + Math.PI;

	    x2 = b1x + 2 * c2.r * Math.cos(a - 0.5);
	    y2 = b2y + 2 * c2.r * Math.sin(a - 0.5);

	    x3 = b1x + c2.r * Math.cos(a - 0.5) - 5 * Math.sign(dx);
	    y3 = b2y + c2.r * Math.sin(a - 0.5) - 5 * Math.sign(dy);

	    context.beginPath();
	    context.moveTo(x0, y0);
	    context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
	    context.stroke();
		
	}


    context.restore();

};