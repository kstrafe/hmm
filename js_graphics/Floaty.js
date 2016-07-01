"use strict";

function Floaty(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.angle = 0;
}

Floaty.prototype.draw = function (context) {
    context.save();

    context.beginPath();
    context.lineWidth = 3;
    context.shadowBlur = 30;
    context.shadowColor = '#8E8800';
    context.strokeStyle = '#8E8800';

    context.arc(this.x + Math.sin(this.angle) * 30, this.y, this.r, 0, 2 * Math.PI);

    context.stroke();
    context.restore();
};

Floaty.prototype.move = function () {
    this.y -= 0.3;
    this.angle += 0.01;
};