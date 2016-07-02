"use strict";

function Bubble(x, y, r, name, facts, highlighted) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.name = name;
    this.facts = facts;
    this.highlighted = highlighted;
    this.color = '#4E8800';
}

Bubble.prototype.getXY = function () {
    return {
        x: this.x,
        y: this.y
    };
};

Bubble.prototype.getR = function () {
    return this.r;
};

Bubble.prototype.getHL = function () {
    return this.highlighted;
};

Bubble.prototype.draw = function (context) {
    context.save();

    context.beginPath();
    context.lineWidth = 3;
    context.shadowBlur = 10;
    context.shadowColor = this.color;
    context.strokeStyle = this.color;

    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

    if (this.highlighted) {
        context.lineWidth = 4;
        context.shadowBlur = 15;
        context.shadowColor = '#6ED80D';
        context.strokeStyle = '#69B00C';
    }

    context.stroke();
    context.restore();

    this.fitTextInBubble(context, this.name, this.x, this.y, this.r, this.highlighted);
};

Bubble.prototype.setHighlighting = function (bool) {
    this.highlighted = bool;
};

Bubble.prototype.getNameAndFacts = function () {
    return {
        name: this.name,
        facts: this.facts
    };
};

Bubble.prototype.fitTextInBubble = function (context, name, x, y, r, hl) {
    var AVG_CHAR_SIZE = 0.4586, // Calibri 1px, unit: [px/(ch 1px)]
        words = name.split(' '),
        fontSize = null,
        maxLen = null,
        lineHeight = null,
        n = null;

    context.save();

    if (hl) {
        context.shadowBlur = 2.5;
        context.shadowColor = '#FFFFFF';
    }

    //var maxWidth = 0.9*2*r;
    //console.log(context.fillStyle)
    context.fillStyle = '#DDDDDD';
    context.textAlign = "center";


    if (words.length === 1) {
        fontSize = (0.85 * 2 * r) / (AVG_CHAR_SIZE * words[0].length);
        y = y + fontSize / 3;

    } else if (words.length === 2) {
        maxLen = Math.max(words[0].length, words[1].length);
        fontSize = (0.75 * 2 * r) / (AVG_CHAR_SIZE * maxLen);
        y = y - fontSize * 0.1;

    } else if (words.length === 3) {
        maxLen = Math.max(words[0].length, words[1].length, words[2].length);
        fontSize = (0.6 * 2 * r) / (AVG_CHAR_SIZE * maxLen);
        y = y - fontSize / 2;

    } else {
        words = [name];
        fontSize = (0.85 * 2 * r) / (AVG_CHAR_SIZE * words[0].length);
        y = y + fontSize / 3;
    }
    //totlen = avgCharSize*name.length*fontSize
    //console.log(fontSize)
    lineHeight = fontSize;
    context.font = fontSize + "px Calibri";

    for (n = 0; n < words.length; n += 1) {
        context.fillText(words[n], x, y);
        y += lineHeight / 1.25;
    }

    context.restore();
};

Bubble.prototype.hitTest = function (mousePos, canvasTopLeft) {
    var coord = this.getXY(),
        rMouseCenter = (mousePos.x - coord.x + canvasTopLeft.x) * (mousePos.x - coord.x + canvasTopLeft.x) + (mousePos.y - coord.y + canvasTopLeft.y) * (mousePos.y - coord.y + canvasTopLeft.y);

    return rMouseCenter < (this.getR()) * (this.getR());
};