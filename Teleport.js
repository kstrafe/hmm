/*global Colors*/
"use strict";

function Teleport() {
    this.transparency = 1;
    this.mouseOn = false;
    this.right = 0;
    this.safeOffset = 20;
    this.active = false;

    this.maxY = 45;
    this.minY = 25;
    this.rightOffset = 30;
}

Teleport.prototype.collide = function (absPos) {
    var left = this.right - this.rightOffset,
        right = this.right;
    if (absPos.x > left && absPos.x < right) {
        if (absPos.y > this.minY && absPos.y < this.maxY) {
            return true;
        }
    }
    return false;
};

Teleport.prototype.resize = function (right) {
    this.right = right - this.rightOffset;
};

Teleport.prototype.fadeOut = function () {
    var tranTresh = 0.15,
        tranFade = 0.025;
    if (this.mouseOn === false) {
        if (this.transparency > tranTresh) {
            this.transparency -= tranFade;
        }
    }
};

Teleport.prototype.draw = function (context) {
    var right = this.right - this.safeOffset;
    context.save();
    context.font = '20px Calibri';
    context.fillStyle = '#FFFFFF';
    context.globalAlpha = this.transparency;
    context.textAlign = "center";
    context.fillText("T", right, 40);
    context.restore();
    context.restore();
};

Teleport.prototype.click = function () {
    return this.mouseOn;
};

Teleport.prototype.deactivate = function () {
    this.active = false;
};

Teleport.prototype.hoverButton = function (mousePos) {
    this.mouseOn = this.collide(mousePos);
    if (this.mouseOn) {
        this.transparency = 1;
    }
};
