"use strict";

function FactBox(title, text, image) {
    this.title = title;
    this.text = text;
    this.image = image;
    this.active = false;
    this.contentOffset = 0;
}

FactBox.prototype.show = function (titleAndText) {
    this.title = titleAndText.name;
    this.text = titleAndText.facts;
    this.active = true;
};

FactBox.prototype.hide = function () {
    this.active = false;
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
        yMax = downRight.y -10,
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
    // this.scrollBar(context, upLeft, downRight, yMax);
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
};

FactBox.prototype.scrollBar = function (context, upLeft, downRight, yMax) {

    context.save();

    context.lineWidth = 8;
    context.strokeStyle = '#DDDDDD';
    context.shadowColor = '#FFFFFF';
    context.shadowBlur = 10;
    context.globalAlpha = 0.6;
    context.lineCap = 'round';

    context.beginPath();
    context.moveTo(downRight.x - 20, upLeft.y + 35);
    context.lineTo(downRight.x - 20, downRight.y - 35);
    context.stroke();

    context.restore();
};

FactBox.prototype.scroll = function () {
    
};

FactBox.prototype.contentCanvas = function (upLeft, downRight) {
    var canvas = document.createElement('canvas'),
        context = null,

    context = canvas.getContext('2d');

    canvas.width = downRight.x - upLeft.x - 30;
    canvas.height = downRight.y - upLeft.y - 65;

    //context.fillStyle = '#FFFFFF';
    context.fillStyle = '#000000';
    context.textAlign = "left";
    context.font = '20px Calibri';
    context.translate(0, this.contentOffset);
    
    //context.fillRect(0, 0, canvas.width, canvas.height);
    //context.fillText(this.text, 15, 40);
    this.wrapText(context, this.text, 0, 20, 15, canvas.width)


    return canvas;

}
