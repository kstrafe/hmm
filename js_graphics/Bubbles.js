"use strict"

function Bubbles() {
	this.bubbles = [];
};

Bubbles.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.bubbles.length; i += 1) {
        this.bubbles[i].draw(context);
    }
};

Bubbles.prototype.add = function (Bubble) {
	this.bubbles.push(Bubble);
};