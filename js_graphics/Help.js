"use strict";

function Help() {
    this.transparancy = 1;
    this.mouseOn = false;
    this.right = 0;
    this.safeOffset = 20;

    this.maxY = 45;
    this.minY = 25;
}

Help.prototype.collide = function (absPos) {
    var rightOffset = 40,
        left = this.right - rightOffset,
        right = this.right;
    if (absPos.x > left && absPos.x < right) {
        if (absPos.y > this.minY && absPos.y < this.maxY) {
            return true;
        }
    }
    return false;
};

Help.prototype.resize = function (right) {
    this.right = right;
};

Help.prototype.fadeOut = function () {
    var tranTresh = 0.15,
        tranFade = 0.025;
    if (this.mouseOn === false) {
        if (this.transparancy > tranTresh) {
            this.transparancy -= tranFade;
        }
    }
};

Help.prototype.draw = function (context) {
    var right = this.right - this.safeOffset;
    context.save();
    context.font = '20px Calibri';
    context.fillStyle = '#FFFFFF';
    context.globalAlpha = this.transparancy;
    context.textAlign = "center";
    context.fillText("H", right, 40);
    context.restore();
};

Help.prototype.hoverButton = function (mousePos) {
    this.mouseOn = this.collide(mousePos);
    if (this.mouseOn) {
        console.log(this.mouseOn);
        this.transparancy = 1;
    }
};
