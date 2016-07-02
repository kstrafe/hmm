"use strict";

function Curves(x0, y0, r0, x1, y1, r1) {
    this.curve = {
        c1: {
            x: x0,
            y: y0,
            r: r0
        },
        c2: {
            x: x1,
            y: y1,
            r: r1
        }
    };
}

Curves.prototype.draw = function (context) {

    var c1x = this.curve.c1.x,
        c1y = this.curve.c1.y,
        c2x = this.curve.c2.x,
        c2y = this.curve.c2.y,
        dx = c2x - this.curve.c1.x,
        dy = c2y - c1y,
        a = null,
        x0 = null,
        y0 = null,
        x1 = null,
        y1 = null,
        x2 = null,
        y2 = null,
        x3 = null,
        y3 = null;

    context.save();

    a = Math.atan2(dy, dx);

    x0 = c1x + this.curve.c1.r * Math.cos(a + 0.5) + 5 * Math.sign(dx);
    y0 = c1y + this.curve.c1.r * Math.sin(a + 0.5) + 5 * Math.sign(dy);

    x1 = c1x + 2 * this.curve.c1.r * Math.cos(a + 0.5);
    y1 = c1y + 2 * this.curve.c1.r * Math.sin(a + 0.5);

    a = a + Math.PI;

    x2 = c2x + 2 * this.curve.c2.r * Math.cos(a - 0.5);
    y2 = c2y + 2 * this.curve.c2.r * Math.sin(a - 0.5);

    x3 = c2x + this.curve.c2.r * Math.cos(a - 0.5) - 5 * Math.sign(dx);
    y3 = c2y + this.curve.c2.r * Math.sin(a - 0.5) - 5 * Math.sign(dy);

    context.beginPath();
    context.moveTo(x0, y0);
    context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    context.lineWidth = 2;
    context.shadowBlur = 2.5;
    context.shadowColor = '#4E8800';
    context.strokeStyle = '#4E8800';
    context.lineCap = 'round';
    context.stroke();

    context.restore();
};