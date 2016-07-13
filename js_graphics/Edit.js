"use strict";

function Edit() {
    this.active = false;
}

Edit.prototype.flipActive = function () {
    this.active = !this.active;
};

Edit.prototype.draw = function (context) {
    var middle = null,
        bottom = null,
        safetyOffset = 20;
    if (this.active === false) {
        return;
    }

    middle = context.canvas.width / 2;
    bottom = context.canvas.height - safetyOffset;

    context.save();
    context.textAlign = "center";
    context.globalAlpha = 0.25;
    context.fillStyle = '#FFFFFF';
    context.font = '20px Calibri';
    context.fillText("Press 'Q' whilst holding the mouse pointer over a bubble to (un)link to it", middle, bottom);
    context.restore();
};
