"use strict";

function Context(canvas) {
    this.context = canvas.getContext('2d');
    this.xOffset = 0;
    this.yOffset = 0;
}

Context.prototype.drawAbsolute = function (drawable) {
    drawable.draw(this.context);
};

Context.prototype.draw = function (drawable) {
    this.context.save();
    this.context.translate(-this.xOffset, -this.yOffset);
    this.drawAbsolute(drawable);
    this.context.restore();
};