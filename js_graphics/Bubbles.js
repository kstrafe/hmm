"use strict";

function Bubbles() {
    this.bubbles = [];
    this.bubblesByName = {};
}

Bubbles.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.bubbles.length; i += 1) {
        this.bubbles[i].draw(context);
    }
};

Bubbles.prototype.add = function (name, bubble) {
    this.bubbles.push(bubble);
    this.bubblesByName[name] = bubble;
};

Bubbles.prototype.getByName = function (name) {
    return this.bubblesByName[name];
};

Bubbles.prototype.getBubble = function (index) {
    return this.bubbles[index];
};

Bubbles.prototype.length = function () {
    return this.bubbles.length;
};

Bubbles.prototype.collide = function (pos) {
    var i = null;
    for (i = 0; i < this.length(); i += 1) {
        if (this.getBubble(i).hitTest(pos)) {
            return this.bubbles[i];
        }
    }
};

Bubbles.prototype.hover = function (mousePos, sounds) {
    var i = null;
    for (i = 0; i < this.length(); i += 1) {
        if (this.getBubble(i).hitTest(mousePos)) {
            if (this.getBubble(i).getHL() === false) {
                this.getBubble(i).setHighlighting(true);
                sounds.hover();
            }
        } else {
            this.getBubble(i).setHighlighting(false);
        }
    }
};

Bubbles.prototype.click = function (mousePos) {
    var i = null;
    for (i = 0; i < this.length(); i += 1) {
        if (this.getBubble(i).hitTest(mousePos)) {
            return {
                hit: true,
                facts: this.getBubble(i).getNameAndFacts()
            };
        }
    }
    return {
        hit: false
    };
};
