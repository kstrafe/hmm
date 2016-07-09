/*global document*/
/*global Image*/
/*global Colors*/

"use strict";

function FactBox() {
    this.active = false;
    this.cornerRadius = 25;
    this.colors = new Colors();
    this.contTopMarg = 50;
    this.topMargin = 0.075;
    this.rightMargin = 0.05;
    this.width = 0.35;
    this.height = 0.8;
}

FactBox.prototype.isActive = function () {
    return this.active;
};

FactBox.prototype.show = function (titleAndText) {
    this.title = titleAndText.name;
    this.text = titleAndText.facts;
    this.active = true;
};

FactBox.prototype.hide = function () {
    this.active = false;
};

FactBox.prototype.upLeft = function (context, topMargin, rightMargin, width) {
    return {
        x: (1 - rightMargin - width) * context.canvas.width,
        y: topMargin * context.canvas.height
    };

};

FactBox.prototype.downRight = function (context, topMargin, rightMargin, height) {
    return {
        x: (1 - rightMargin) * context.canvas.width,
        y: (topMargin + height) * context.canvas.height
    };
};

FactBox.prototype.draw = function (context) {
    if (this.active === false) {
        return;
    }

    var upLeft = this.upLeft(context, this.topMargin, this.rightMargin, this.width),
        downRight = this.downRight(context, this.topMargin, this.rightMargin, this.height),
        corRad = this.cornerRadius;

    context.save();

    context.lineWidth = 0;
    context.strokeStyle = this.colors.getByName('factBoxLine');
    context.shadowColor = this.colors.getByName('factBoxShad');
    context.shadowBlur = 20;
    context.globalAlpha = 0.4;
    context.fillStyle = this.colors.getByName('factBox');

    context.beginPath();
    context.moveTo(upLeft.x + corRad, upLeft.y);
    context.lineTo(downRight.x - corRad, upLeft.y);
    context.quadraticCurveTo(downRight.x, upLeft.y, downRight.x, upLeft.y + corRad);
    context.lineTo(downRight.x, downRight.y - corRad);
    context.quadraticCurveTo(downRight.x, downRight.y, downRight.x - corRad, downRight.y);
    context.lineTo(upLeft.x + corRad, downRight.y);
    context.quadraticCurveTo(upLeft.x, downRight.y, upLeft.x, downRight.y - corRad);
    context.lineTo(upLeft.x, upLeft.y + corRad);
    context.quadraticCurveTo(upLeft.x, upLeft.y, upLeft.x + corRad, upLeft.y);

    context.closePath();
    context.fill();
    context.stroke();
    context.restore();

    context.restore();
};
