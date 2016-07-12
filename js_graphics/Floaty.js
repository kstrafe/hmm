/*global document*/

"use strict";

function Floaty(x, y, r, speed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.speed = speed;
    this.angle = 0;
    this.color = '#8E8800';
    this.prerender = null;
    this.extra = 40;
}

Floaty.prototype.cacheBubble = function () {
    var size = this.r * 2 + this.extra,
        canvas = document.createElement('canvas'),
        context = canvas.getContext('2d');

    canvas.height = size;
    canvas.width = size;
    this.renderTo(context);
    this.prerender = canvas;
};

Floaty.prototype.setColor = function (color) {
    this.color = color;
    this.cacheBubble();
};

Floaty.prototype.draw = function (context) {
    var angleAmp = 30;
    context.drawImage(this.prerender, this.x + Math.sin(this.angle) * angleAmp, this.y);
};

Floaty.prototype.renderTo = function (context) {
    context.save();

    context.beginPath();
    context.lineWidth = 8;
    context.shadowBlur = 20;
    context.shadowColor = this.color;
    context.strokeStyle = this.color;

    context.arc(this.r + this.extra / 2, this.r + this.extra / 2, this.r, 0, 2 * Math.PI);

    context.stroke();
    context.restore();
};

Floaty.prototype.move = function () {
    var angleSpeed = 0.01;
    this.y -= this.speed;
    this.angle += angleSpeed;
};

Floaty.prototype.xPos = function () {
    return this.x;
};

Floaty.prototype.yPos = function () {
    return this.y;
};
