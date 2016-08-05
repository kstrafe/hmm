/*global Colors*/

"use strict";

function Cloud(xys, name, color) {
    //this.index = index;
    this.xys = xys;
    this.name = name;
    this.colors = new Colors();
    this.colorName = color;
    //this.facts = facts;
    //this.highlighted = highlighted;
    //this.master = false;
    //this.favorite = false;
}

Cloud.prototype.draw = function (context, zoomIndex) {
    var n,
        metrics;

    if (zoomIndex <= 1) {
        context.save();
        context.strokeStyle = this.colors.getHLByName(this.colorName);
        context.lineWidth = 20;
        context.fillStyle = this.colors.getByName(this.colorName);
        context.globalAlpha = 0.25;
        context.beginPath();
        context.moveTo(this.xys[0], this.xys[1]);

        for (n = 2; n < this.xys.length; n += 4) {
            context.quadraticCurveTo(this.xys[n], this.xys[n + 1], this.xys[n + 2], this.xys[n + 3]);
        }
        context.closePath();
        context.fill();
        context.stroke();

        context.font = 500 + "px Calibri";
        metrics = context.measureText(this.name);
        context.globalAlpha = 0.75;
        context.fillStyle = this.colors.getByName('white');
        context.fillText(this.name, this.getAvgX() - metrics.width / 2, this.getAvgY());
        //console.log(this.getAvgX());
        //console.log(this.getAvgY());

        context.restore();
    }
};

Cloud.prototype.getAvgX = function () {
    var n,
        avgX = 0;

    for (n = 0; n < this.xys.length; n += 2) {
        avgX = avgX + this.xys[n];
    }

    avgX = 2 * avgX / this.xys.length;

    return avgX;
};

Cloud.prototype.getAvgY = function () {
    var n,
        avgY = 0;

    for (n = 1; n < this.xys.length; n += 2) {
        avgY = avgY + this.xys[n];
    }

    avgY = 2 * avgY / this.xys.length;

    return avgY;
};