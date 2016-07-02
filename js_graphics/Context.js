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
