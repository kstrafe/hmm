/*global document*/
"use strict";

function Context(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.xOffset = 0;
    this.yOffset = 0;
    this.tmpxOffset = 0;
    this.tmpyOffset = 0;
    this.mouseDown = {
        x: 0,
        y: 0
    };
}

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
    console.log("AddOffset: dx, dy", dx, dy);
    this.offsetTemporary(0, 0);
    this.xOffset += dx;
    this.yOffset += dy;
};

Context.prototype.onResize = function () {
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
};

Context.prototype.renderBG = function () {
    var gradient = null,
        context = this.context,
        canvas = this.canvas;
    context.save();
    gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 5, canvas.width / 2, canvas.height / 2, 300);
    gradient.addColorStop(0, '#000028');
    gradient.addColorStop(1, '#080808');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
};

Context.prototype.mousePos = function (evt) {
    var rect = this.canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) * (this.canvas.width / rect.width),
        y: (evt.clientY - rect.top) * (this.canvas.height / rect.height)
    };
};