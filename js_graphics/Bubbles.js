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

Bubbles.prototype.hover = function (mousePos, sfx, offset) {
    var i = null;
    for (i = 0; i < this.length(); i += 1) {
        if (this.getBubble(i).hitTest(mousePos, offset)) {
            if (this.getBubble(i).getHL() === false) {
                sfx.hover();
                this.getBubble(i).setHighlighting(true);
            }
        } else {
            this.getBubble(i).setHighlighting(false);
        }
    }
};

Bubbles.prototype.click = function (mousePos, offset) {
    var i = null;
    for (i = 0; i < this.length(); i += 1) {
        if (this.getBubble(i).hitTest(mousePos, offset)) {
            // info = this.getBubble(i).getNameAndFacts();
            // factBox = new FactBox(info.name, info.facts);
            return true;
        }
    }
};