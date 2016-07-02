/*global document*/
"use strict";

function Context(canvas) {
    this.canvas = canvas;
    this.devMode = false;
    this.context = canvas.getContext('2d');
    this.xOffset = 0;
    this.scaleFactor = 1;
    this.yOffset = 0;
    this.tmpxOffset = 0;
    this.tmpyOffset = 0;
    this.blueGradient = null;
    this.offsetSpeed = {
        x: 0,
        y: 0
    };
    this.mouseDown = {
        x: 0,
        y: 0
    };
    this.cacheGradient();
}

Context.prototype.zoom = function (factor) {
    this.scaleFactor *= factor;
};

Context.prototype.centerOn = function (x, y) {
    var width = this.canvas.width,
        height = this.canvas.height;
    this.xOffset = x - width / 2;
    this.yOffset = y - height / 2;
};

Context.prototype.getCenterOn = function () {
    var width = this.canvas.width,
        height = this.canvas.height;
    return {
        x: this.xOffset + width / 2,
        y: this.yOffset + height / 2
    };
};

Context.prototype.applySpeed = function () {
    this.xOffset += this.offsetSpeed.x;
    this.yOffset += this.offsetSpeed.y;
};

Context.prototype.setSpeedX = function (speed) {
    this.offsetSpeed.x = speed;
};

Context.prototype.setSpeedY = function (speed) {
    this.offsetSpeed.y = speed;
};

Context.prototype.drawAbsolute = function (drawable) {
    drawable.draw(this.context);
};

Context.prototype.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Context.prototype.draw = function (drawables) {
    var i = null;
    this.context.save();
    this.context.translate(-this.xOffset - this.tmpxOffset, -this.yOffset - this.tmpyOffset);
    this.context.scale(this.scaleFactor, this.scaleFactor);
    for (i = 0; i < drawables.length; i += 1) {
        this.drawAbsolute(drawables[i]);
    }
    this.context.restore();
};

Context.prototype.offsetTemporary = function (x, y) {
    this.tmpxOffset = x;
    this.tmpyOffset = y;
};

Context.prototype.getTempOffset = function () {
    return {
        x: this.tmpxOffset,
        y: this.tmpyOffset
    };
};

Context.prototype.getOffset = function () {
    return {
        x: this.xOffset,
        y: this.yOffset
    };
};

Context.prototype.addOffset = function (dx, dy) {
    this.offsetTemporary(0, 0);
    this.xOffset += dx;
    this.yOffset += dy;
};

Context.prototype.left = function () {
    return this.xOffset;
};

Context.prototype.width = function () {
    return this.canvas.width;
};

Context.prototype.low = function () {
    return this.yOffset + this.canvas.height;
};

Context.prototype.high = function () {
    return this.yOffset;
};

Context.prototype.onResize = function () {
    var center = this.getCenterOn();
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.centerOn(center.x, center.y);
    this.cacheGradient();
};

Context.prototype.cacheGradient = function () {
    var canvas = document.createElement('canvas'),
        context = null,
        gradient = null;

    context = canvas.getContext('2d');

    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;

    gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 5, canvas.width / 2, canvas.height / 2, 300);
    gradient.addColorStop(0, '#000028');
    gradient.addColorStop(1, '#080808');

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.blueGradient = canvas;
};

Context.prototype.renderBG = function () {
    var context = this.context;
    context.drawImage(this.blueGradient, 0, 0);
    this.drawDevMode();
};

Context.prototype.flipDevMode = function () {
    this.devMode = !this.devMode;
};

Context.prototype.drawDevMode = function () {
    var ctx = this.context;
    if (this.devMode) {
        ctx.fillStyle = "#FF0000";
        ctx.textAlign = "left";
        ctx.font = '30px Calibri';
        ctx.fillText('x: ' + (this.xOffset + this.canvas.width / 2) + ' y: ' + (this.yOffset + this.canvas.height / 2), 0, this.canvas.height);
    }
};

Context.prototype.mousePos = function (evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) * (this.canvas.width / rect.width),
        y: (evt.clientY - rect.top) * (this.canvas.height / rect.height)
    };
};
