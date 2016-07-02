"use strict";

function Context(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.xOffset = 0;
    this.yOffset = 0;
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
    this.context.translate(-this.xOffset, -this.yOffset);
    for (i = 0; i < drawables.length; i += 1) {
        this.drawAbsolute(drawables[i]);
    }
    this.context.restore();
};

Context.prototype.offsetTemporary = function (x, y) {
    this.xOffset = x;
    this.yOffset = y;
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