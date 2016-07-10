/*global Colors*/
"use strict";

function Help() {
    this.transparency = 1;
    this.mouseOn = false;
    this.right = 0;
    this.safeOffset = 20;
    this.active = false;

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
        if (this.transparency > tranTresh) {
            this.transparency -= tranFade;
        }
    }
};

Help.prototype.draw = function (context) {
    var i = null,
        hOffset = 25,
        right = this.right - this.safeOffset,
        helpstr = [
            "Q: Link Mode | E: Dev Info | R: Move Mode | T: New Bubble | M: Toggle Sound",
            "WASD/HJKL/Arrows: Movement | Space: Select at Center | Mouse: Select at Pointer",
            "Scroll wheel/+/-: Zoom | G: Generate Data File (save your changes)"
        ];
    context.save();
    context.font = '20px Calibri';
    context.fillStyle = '#FFFFFF';
    context.globalAlpha = this.transparency;
    context.textAlign = "center";
    context.fillText("H", right, 40);
    context.restore();

    if (this.active) {
        context.save();
        context.font = '20px Calibri';
        context.fillStyle = (new Colors()).clrs(10);
        context.textAlign = "center";

        for (i = 0; i < helpstr.length; i += 1) {
            context.fillText(helpstr[i], context.canvas.width / 2, context.canvas.height / 2 + i * hOffset);
        }
        context.restore();
    }
};

Help.prototype.click = function () {
    if (this.mouseOn) {
        this.active = true;
    } else {
        this.active = false;
    }
};

Help.prototype.deactivate = function () {
    this.active = false;
};

Help.prototype.hoverButton = function (mousePos) {
    this.mouseOn = this.collide(mousePos);
    if (this.mouseOn) {
        this.transparency = 1;
    }
};
