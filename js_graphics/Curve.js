"use strict";

function Curve(x0, y0, r0, x1, y1, r1) {
    var c1 = {
            x: x0,
            y: y0,
            r: r0
        },
        c2 = {
            x: x1,
            y: y1,
            r: r1
        };
    this.bezier = this.compute(c1, c2);
}

Curve.prototype.recompute = function (c1, c2) {
    this.bezier = this.compute(c1, c2);
};

Curve.prototype.compute = function (c1, c2) {
    var c1x = c1.x,
        c1y = c1.y,
        c2x = c2.x,
        c2y = c2.y,
        dx = c2x - c1x,
        dy = c2y - c1y,
        a = null,
        x0 = null,
        y0 = null,
        x1 = null,
        y1 = null,
        x2 = null,
        y2 = null,
        x3 = null,
        y3 = null,
        smul = 5,
        aOffset = 0.5,
        //curv = 0.5,
        d = Math.sqrt((dx * dx) + (dy * dy)),
        curv = Math.max(1.5, (2e-3 * d));

    a = Math.atan2(dy, dx);

    x0 = c1x + c1.r * Math.cos(a + aOffset) + smul * Math.sign(dx);
    y0 = c1y + c1.r * Math.sin(a + aOffset) + smul * Math.sign(dy);

    x1 = c1x + curv * c1.r * Math.cos(a + aOffset);
    y1 = c1y + curv * c1.r * Math.sin(a + aOffset);

    a = a + Math.PI;

    x2 = c2x + curv * c2.r * Math.cos(a - aOffset);
    y2 = c2y + curv * c2.r * Math.sin(a - aOffset);

    x3 = c2x + c2.r * Math.cos(a - aOffset) - smul * Math.sign(dx);
    y3 = c2y + c2.r * Math.sin(a - aOffset) - smul * Math.sign(dy);

    return {
        x0: x0,
        y0: y0,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        x3: x3,
        y3: y3
    };
};

Curve.prototype.draw = function (context) {

    var b = this.bezier;
    context.save();

    context.beginPath();
    context.moveTo(b.x0, b.y0);
    context.bezierCurveTo(b.x1, b.y1, b.x2, b.y2, b.x3, b.y3);
    context.lineWidth = 2;
    context.shadowBlur = 2.5;
    context.shadowColor = '#4E8800';
    context.strokeStyle = '#4E8800';
    context.lineCap = 'round';
    context.stroke();

    context.restore();
};
