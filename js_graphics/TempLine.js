/*global Colors*/
"use strict";

function TempLine() {
    this.start = null;
    this.stop = null;
    this.colors = new Colors();
}

TempLine.prototype.draw = function (context) {
    if (this.start === null || this.stop === null) {
        return;
    }

    context.save();
    context.beginPath();
    context.lineWidth = 3;
    context.shadowBlur = 60;
    context.strokeStyle = this.colors.getByName('bubbleFav');
    context.moveTo(this.start.x, this.start.y);
    context.lineTo(this.stop.x, this.stop.y);
    context.stroke();
    context.restore();
};

TempLine.prototype.setStart = function (point) {
    this.start = point;
};

TempLine.prototype.setStop = function (point) {
    this.stop = point;
};
