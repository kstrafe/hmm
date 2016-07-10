/*global Colors*/

"use strict";

function Bubble(index, x, y, r, name, facts, highlighted) {
    this.index = index;
    this.x = x;
    this.y = y;
    this.r = r;
    this.name = name;
    this.facts = facts;
    this.highlighted = highlighted;
    this.colors = new Colors();
    this.master = false;
}

Bubble.prototype.setName = function (name) {
    this.name = name;
};

Bubble.prototype.setFacts = function (facts) {
    this.facts = facts;
};

Bubble.prototype.getIndex = function () {
    return this.index;
};

Bubble.prototype.getXY = function () {
    return {
        x: this.x,
        y: this.y
    };
};

Bubble.prototype.getCurveStart = function () {
    return {
        x: this.x,
        y: this.y,
        r: this.r
    };
};

Bubble.prototype.getR = function () {
    return this.r;
};

Bubble.prototype.getHL = function () {
    return this.highlighted;
};

Bubble.prototype.masterThis = function () {
    this.master = true;
};

Bubble.prototype.draw = function (context) {
    context.save();

    context.beginPath();
    context.lineWidth = 3;
    context.shadowBlur = 10;
    if (this.master === false) {
        context.strokeStyle = this.colors.getByName('bubbleGreen');
        context.shadowColor = this.colors.getByName('bubbleGreen');
    } else {
        context.strokeStyle = this.colors.getByName('bubblePurple');
        context.shadowColor = this.colors.getByName('bubblePurple');
    }

    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

    if (this.highlighted) {
        context.lineWidth = 4;
        context.strokeStyle = this.colors.getByName('bubbleHL');
        context.shadowBlur = 15;
        context.shadowColor = this.colors.getByName('bubbleHLShadow');
    }

    context.stroke();
    context.restore();

    this.fitTextInBubble(context, this.name, this.x, this.y, this.r, this.highlighted);
};

Bubble.prototype.setHighlighting = function (bool) {
    this.highlighted = bool;
};

Bubble.prototype.getTitle = function () {
    return this.name;
};

Bubble.prototype.getFacts = function () {
    return this.facts;
};

Bubble.prototype.getNameAndFacts = function () {
    return {
        name: this.name,
        facts: this.facts
    };
};

Bubble.prototype.fitTextInBubble = function (context, name, x, y, r, hl) {
    var tempWidth = 0,
        metrics = null,
        fontSizeGuess = 20,
        words = name.split(' '),
        fontSize = null,
        lineHeight = null,
        n = null,
        fillRatio = [0.9, 0.8, 0.7],
        maxLines = 3;

    context.save();

    if (hl) {
        context.shadowBlur = 2.5;
        context.shadowColor = this.colors.getByName('white');
    }

    context.fillStyle = this.colors.getByName('textColor');
    context.textAlign = "center";
    context.font = fontSizeGuess + 'px Calibri';

    for (n = 0; n < words.length; n += 1) {
        if (n > maxLines) {
            metrics = context.measureText(name);
            tempWidth = metrics.width;
            break;
        }

        metrics = context.measureText(words[n]);
        tempWidth = Math.max(tempWidth, metrics.width);
    }


    if (words.length === 1 || words.length > maxLines) {
        fontSize = fontSizeGuess * (fillRatio[0] * 2 * r) / tempWidth;
        y = y + fontSize / 3;

    } else if (words.length === 2) {
        fontSize = fontSizeGuess * (fillRatio[1] * 2 * r) / tempWidth;
        y = y - fontSize * 0.1;

    } else if (words.length === 3) {
        fontSize = fontSizeGuess * (fillRatio[2] * 2 * r) / tempWidth;
        y = y - fontSize / 2;

    }

    lineHeight = fontSize;
    context.font = fontSize + "px Calibri";

    for (n = 0; n < words.length; n += 1) {
        context.fillText(words[n], x, y);
        y += lineHeight / 1.25;
    }

    context.restore();
};

Bubble.prototype.hitTest = function (mousePos) {
    var coord = this.getXY(),
        rMouseCenter = (mousePos.x - coord.x) * (mousePos.x - coord.x) + (mousePos.y - coord.y) * (mousePos.y - coord.y);

    return rMouseCenter < (this.getR()) * (this.getR());
};

Bubble.prototype.moveTo = function (x, y) {
    this.x = x;
    this.y = y;
};
