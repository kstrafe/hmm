"use strict";

function Bubbles() {
    this.bubbles = [];
}

Bubbles.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.bubbles.length; i += 1) {
        this.bubbles[i].draw(context);
    }
};

Bubbles.prototype.add = function (bubble) {
    this.bubbles.push(bubble);
};

Bubbles.prototype.getBubble = function (index) {
    return this.bubbles[index];
};

Bubbles.prototype.length = function () {
    return this.bubbles.length;
};