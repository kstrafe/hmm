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
    this.lowerBound = null;
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

FactBox.prototype.resize = function (context) {
    var maxWidth = 750,
        upLeft = {
            x: Math.max(context.canvas.width - maxWidth, context.canvas.width / 2 + 50),
            y: 50
        },
        downRight = {
            x: context.canvas.width - 75,
            y: context.canvas.height - 100
        };
    this.contentCanvas(upLeft, downRight);

    //this.contentOffset = 0

    //if (Math.abs(this.contentOffset) < this.lowerBound) {
    //    this.contentOffset = this.lowerBound;
    //}
};

FactBox.prototype.reset = function () {
    this.contentOffset = 0;
    this.contentLen = 0;
};

FactBox.prototype.draw = function (context) {
    if (this.active === false) {
        return;
    }

    var boxTopLeftMarg = 50,
        boxRightMarg = 25,
        maxWidth = 750,
        cornerRadius = 25,
        upLeft = {
            x: Math.max(context.canvas.width - maxWidth, context.canvas.width / 2 + boxTopLeftMarg),
            y: boxTopLeftMarg
        },
        downRight = {
            x: context.canvas.width - (boxTopLeftMarg + boxRightMarg),
            y: context.canvas.height - 2 * boxTopLeftMarg
        },
        content,
        ytitle = 90,
        contLeftMarg = 15,
        contTopMarg = 50;

    //this.contentOffset = 0

    //if (this.contentOffset +  > this.lowerBound) {
    //    this.contentOffset = 0;
    //}
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
    context.fillText(this.title, (downRight.x + upLeft.x) / 2, ytitle);

    context.restore();

    content = this.contentCanvas(upLeft, downRight);
    context.drawImage(content, upLeft.x + contLeftMarg, upLeft.y + contTopMarg);

    // //Draw text
    // context.fillStyle = '#000000';
    // context.textAlign = "left";
    // context.font = '20px Calibri';
    // this.wrapText(context, this.text, (downRight.x + upLeft.x) / 2 - (downRight.x - upLeft.x) / 2 + 15, 125, 25, (downRight.x - upLeft.x) - 35);

    this.scrollBar(context, upLeft, downRight);
    context.restore();
    this.drawEdit(context, (downRight.x + upLeft.x) / 2, downRight.y + contTopMarg);
};

FactBox.prototype.drawEdit = function (context, centerPos, height) {
    var editstr = "Edit";
    context.save();
    context.font = '20px Calibri';
    context.fillStyle = '#FFFFFF';
    context.globalAlpha = 0.25;
    context.textAlign = "center";
    context.fillText(editstr, centerPos, height);
    context.restore();
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
    var topMargin = 55,
        endMargin = 35,
        rightMargin = 20,
        yMin = (upLeft.y + topMargin),
        yMax = (downRight.y - endMargin),
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
    context.moveTo(downRight.x - rightMargin, yStart);
    context.lineTo(downRight.x - rightMargin, yEnd);
    context.stroke();

    context.restore();
};

FactBox.prototype.scroll = function (deltaY) {
    var scrollDelta = 50;

    if (this.contentOOB) {
        if (deltaY < 0) {
            this.contentOffset += scrollDelta;
            if (this.contentOffset > 0) {
                this.contentOffset = 0;
            }
        } else {
            this.contentOffset -= scrollDelta;
            if (this.contentOffset < this.lowerBound) {
                this.contentOffset = this.lowerBound;
            }
        }
    }
    //console.log(this.contentOOB)
};

FactBox.prototype.contentCanvas = function (upLeft, downRight) {
    var canvas = document.createElement('canvas'),
        context = null,
        LfMargin = 45,
        TbMargin = 65,
        fontSize = 20,
        lineHeight = 20;

    context = canvas.getContext('2d');

    canvas.width = downRight.x - upLeft.x - LfMargin;
    canvas.height = downRight.y - upLeft.y - TbMargin;

    //context.fillStyle = '#FFFFFF';
    context.fillStyle = '#000000';
    context.textAlign = "left";
    context.font = fontSize + 'px Calibri';
    context.translate(0, this.contentOffset);
    //context.fillRect(0, 0, canvas.width, canvas.height);
    this.contentLen = this.wrapText(context, this.text, 0, fontSize, lineHeight, canvas.width);
    //console.log(yTextEnd)

    this.contentOOB = ((this.contentLen + this.contentOffset) >= canvas.height);
    this.lowerBound = canvas.height - this.contentLen;

    // if (this.image.src !== "") {
    //     context.drawImage(this.image, 0, yTextEnd + 20, canvas.width, canvas.width);
    // }

    return canvas;

};
