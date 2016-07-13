/*global Colors*/
"use strict";

function ConMenu() {
    this.colors = new Colors();
    this.active = false;
    this.pos = null;
    this.hovers = "";
}

ConMenu.prototype.activate = function (pos) {
    this.active = true;
    this.pos = pos;
};

ConMenu.prototype.close = function () {
    this.active = false;
};

ConMenu.prototype.hover = function (mpos) {
    if (this.active === false) {
        return false;
    }

    if (mpos.y < this.pos.y && mpos.y > this.pos.y - 60 && mpos.x > this.pos.x - 40 && mpos.x < this.pos.x + 40) {
        this.hovers = "new";
    } else if (mpos.x > this.pos.x && mpos.x < this.pos.x + 80 && mpos.y < this.pos.y + 40 && mpos.y > this.pos.y) {
        this.hovers = "link";
    } else if (mpos.x < this.pos.x && mpos.x > this.pos.x - 80 && mpos.y < this.pos.y + 40 && mpos.y > this.pos.y) {
        this.hovers = "move";
    } else {
        this.hovers = "";
    }

    return true;
};

ConMenu.prototype.draw = function (ctx) {
    if (this.active === false) {
        return;
    }

    ctx.save();
    ctx.font = '20px Calibri';
    ctx.fillStyle = '#FFFFFF';
    if (this.hovers === "new") {
        ctx.fillStyle = "#DD0000";
    }
    ctx.fillText("New", this.pos.x - 20, this.pos.y - 20);
    ctx.fillStyle = '#FFFFFF';
    if (this.hovers === "link") {
        ctx.fillStyle = "#DD0000";
    }
    ctx.fillText("Link", this.pos.x + 10, this.pos.y + 20);
    ctx.fillStyle = '#FFFFFF';
    if (this.hovers === "move") {
        ctx.fillStyle = "#DD0000";
    }
    ctx.fillText("Move", this.pos.x - 50, this.pos.y + 20);
    ctx.restore();
};
