"use strict";

function FactBox(title, text, image) {
    this.title = title;
    this.text = text;
    this.image = image;
    this.active = false;
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
    var cornerRadius = 25,
        upLeft = {
            x: context.canvas.width / 2 + 50,
            y: 50
        },
        downRight = {
            x: context.canvas.width - 50,
            y: context.canvas.height - 100
        };
    //console.log(upLeft);
    //console.log(downRight);

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
    context.fillText(this.title, 3 / 4 * context.canvas.width, 100);

    context.restore();

    //Draw text
    context.fillStyle = '#000000';
    context.textAlign = "left";
    context.font = '20px Calibri';
    this.wrapText(context, this.text, 3 / 4 * context.canvas.width - (downRight.x - upLeft.x - 25) / 2, 125, downRight.x - upLeft.x - 25, 25);
    //context.fillText(this.text, 3 / 4 * context.canvas.width, 125);

    context.restore();
};

FactBox.prototype.wrapText = function (context, text, x, y, maxWidth, lineHeight) {
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
