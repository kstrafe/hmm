/*global Colors*/
"use strict";

function ConMenu() {
    this.colors = new Colors();
    this.active = false;
    this.pos = null;
}

ConMenu.prototype.activate = function (pos) {
    this.active = true;
    this.pos = pos;
};

ConMenu.prototype.close = function () {
    this.active = false;
};

ConMenu.prototype.draw = function (ctx) {
    if (this.active === false) {
        return;
    }

    ctx.save();
    ctx.font = '20px Calibri';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText("New", this.pos.x - 20, this.pos.y - 20);
    ctx.fillText("Link", this.pos.x + 10, this.pos.y + 20);
    ctx.fillText("Move", this.pos.x - 50, this.pos.y + 20);
    ctx.restore();
};
