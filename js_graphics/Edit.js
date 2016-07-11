"use strict";

function Edit() {
    this.isMoving = false;
    this.isLinking = false;
}

Edit.prototype.moving = function () {
    return this.isMoving;
};

Edit.prototype.linking = function () {
    return this.isLinking;
};

Edit.prototype.flipMove = function () {
    this.isMoving = !this.isMoving;
};

Edit.prototype.activateLink = function () {
    this.isLinking = true;
};

Edit.prototype.deactivateLink = function () {
    this.isLinking = false;
};

Edit.prototype.activateMove = function () {
    this.isMoving = true;
};

Edit.prototype.deactivateMove = function () {
    this.isMoving = false;
};

Edit.prototype.flipLink = function () {
    this.isLinking = !this.isLinking;
};

Edit.prototype.draw = function (context) {
    var middle = null,
        bottom = null,
        safetyOffset = 20;
    if (this.isMoving === false && this.isLinking === false) {
        return;
    }

    middle = context.canvas.width / 2;
    bottom = context.canvas.height - safetyOffset;

    context.save();
    context.textAlign = "center";
    context.globalAlpha = 0.25;
    context.fillStyle = '#FFFFFF';
    context.font = '20px Calibri';
    if (this.isLinking) {
        context.fillText("Press 'Q' whilst holding the mouse pointer over a bubble to (un)link to it", middle, bottom);
    } else if (this.isMoving) {
        context.fillText("Press 'R' whilst holding the mouse pointer over a free spot to move", middle, bottom);
    }
    context.restore();
};
