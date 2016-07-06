/*global document*/
/*global Image*/

"use strict";

function FactBox(title, text) {
    this.title = title;
    this.text = text;
    this.image = new Image();
    this.active = false;
    this.contentOffset = 0;
    this.contentLen = 0;
    this.contentOOB = false;
}

FactBox.prototype.isActive = function () {
    return this.active;
};

FactBox.prototype.show = function (titleAndText) {
    this.title = titleAndText.name;
    this.text = titleAndText.facts;
    this.active = true;
    this.contentOffset = 0;
    this.contentLen = 0;
};

FactBox.prototype.hide = function () {
    this.active = false;
    this.contentOffset = 0;
};

FactBox.prototype.draw = function (context) {
    if (this.active === false) {
        return;
    }
    var maxWidth = 750,
        cornerRadius = 25,
        upLeft = {
            x: Math.max(context.canvas.width - maxWidth, context.canvas.width / 2 + 50),
            y: 50
        },
        downRight = {
            x: context.canvas.width - 75,
            y: context.canvas.height - 100
        },
        content;

    context.save();

    context.lineWidth = 0;
    context.strokeStyle = '#777777';
    context.shadowColor = '#FFFFFF';
    context.shadowBlur = 20;
    context.globalAlpha = 0.4;
    context.fillStyle = '#555555';

    context.beginPath();
    context.moveTo(upLeft.x + cornerRadius, upLeft.y);
    context.lineTo(downRight.x - cornerRadius, upLeft.y);
    context.quadraticCurveTo(downRight.x, upLeft.y, downRight.x, upLeft.y + cornerRadius);
    context.lineTo(downRight.x, downRight.y - cornerRadius);
    context.quadraticCurveTo(downRight.x, downRight.y, downRight.x - cornerRadius, downRight.y);
    context.lineTo(upLeft.x + cornerRadius, downRight.y);
    context.quadraticCurveTo(upLeft.x, downRight.y, upLeft.x, downRight.y - cornerRadius);
    context.lineTo(upLeft.x, upLeft.y + cornerRadius);
    context.quadraticCurveTo(upLeft.x, upLeft.y, upLeft.x + cornerRadius, upLeft.y);

    context.closePath();
    context.fill();
    context.stroke();
    context.restore();

    //Draw title
    context.fillStyle = '#FFFFFF';
    context.textAlign = "center";
    context.font = '30px Calibri';
    context.fillText(this.title, (downRight.x + upLeft.x) / 2, 90);

    context.restore();

    content = this.contentCanvas(upLeft, downRight);
    context.drawImage(content, upLeft.x + 15, upLeft.y + 50);

    // //Draw text
    // context.fillStyle = '#000000';
    // context.textAlign = "left";
    // context.font = '20px Calibri';
    // this.wrapText(context, this.text, (downRight.x + upLeft.x) / 2 - (downRight.x - upLeft.x) / 2 + 15, 125, 25, (downRight.x - upLeft.x) - 35);

    // context.restore();
    this.scrollBar(context, upLeft, downRight);
};

FactBox.prototype.wrapText = function (context, text, x, y, lineHeight, maxWidth) {
    var words = text.split(' '),
        line = '',
        n,
        testLine,
        metrics,
        testWidth;

    for (n = 0; n < words.length; n += 1) {
        testLine = line + words[n] + ' ';
        metrics = context.measureText(testLine);
        testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }

    context.fillText(line, x, y);

    return y;
};

FactBox.prototype.scrollBar = function (context, upLeft, downRight) {
    var yMin = (upLeft.y + 55),
        yMax = (downRight.y - 35),
        yStart = null,
        yEnd = null,
        barLen = null,
        maxLen = yMax - yMin;

    if (this.contentLen > maxLen) {
        barLen = maxLen * (maxLen / this.contentLen);
    } else {
        barLen = maxLen;
    }

    yStart = yMin + Math.abs(this.contentOffset) * ((maxLen - barLen) / (this.contentLen - maxLen));
    yEnd = yStart + barLen;

    context.save();
    context.lineWidth = 8;
    context.strokeStyle = '#DDDDDD';
    context.shadowColor = '#FFFFFF';
    context.shadowBlur = 10;
    context.globalAlpha = 0.6;
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(downRight.x - 20, yStart);
    context.lineTo(downRight.x - 20, yEnd);
    context.stroke();

    context.restore();
};

FactBox.prototype.scroll = function (deltaY) {
    if (deltaY < 0) {
        if (this.contentOffset < 0) {
            this.contentOffset += 50;
        }
    } else {
        if (this.contentOOB) {
            this.contentOffset -= 50;
        }
    }
};

FactBox.prototype.contentCanvas = function (upLeft, downRight) {
    var canvas = document.createElement('canvas'),
        context = null;

    context = canvas.getContext('2d');

    canvas.width = downRight.x - upLeft.x - 45;
    canvas.height = downRight.y - upLeft.y - 65;

    //context.fillStyle = '#FFFFFF';
    context.fillStyle = '#000000';
    context.textAlign = "left";
    context.font = '20px Calibri';
    context.translate(0, this.contentOffset);
    //context.fillRect(0, 0, canvas.width, canvas.height);
    this.contentLen = this.wrapText(context, this.text, 0, 20, 20, canvas.width);
    //console.log(yTextEnd)

    this.contentOOB = (this.contentLen + this.contentOffset > canvas.height);

    // if (this.image.src !== "") {
    //     context.drawImage(this.image, 0, yTextEnd + 20, canvas.width, canvas.width);
    // }

    return canvas;

};
