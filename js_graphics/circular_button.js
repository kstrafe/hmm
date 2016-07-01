/*global Audio*/
/*global document*/
/*global window*/
"use strict";

function Floaty(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
}

Floaty.prototype.draw = function (context) {
    context.save();

    context.beginPath();
    context.lineWidth = 3;
    context.shadowBlur = 30;
    context.shadowColor = '#8E8800';
    context.strokeStyle = '#8E8800';

    context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);

    context.stroke();
    context.restore();
};

Floaty.prototype.move = function () {
    this.y -= 0.1;
};

var floaty = new Floaty(0, 50, 10);

var audio = new Audio('Chronicles_of_Creation_Suite_No._1.mp3'),
    mouseOnClick = null;
audio.play();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var btnHov = new Audio("Audio/button_hov.mp3"); // buffers automatically when created

var canvasTopLeft = {
    x: 0,
    y: 0
};

var canvasTopLeftTemp = canvasTopLeft;

var infoBox = {
    show: false,
    text: ''
};

var circles;


//function wrapText(context, name, x, y, maxWidth, lineHeight) {
function wrapText(context, name, x, y, r, hl) {
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
}

function renderButton(context, x, y, r, name, highlighted) {
    context.save();

    context.beginPath();
    context.lineWidth = 3;
    context.shadowBlur = 10;
    context.shadowColor = '#4E8800';
    context.strokeStyle = '#4E8800';

    context.arc(x, y, r, 0, 2 * Math.PI);

    if (highlighted) {
        context.lineWidth = 4;
        context.shadowBlur = 15;
        context.shadowColor = '#6ED80D';
        context.strokeStyle = '#69B00C';
    }

    context.stroke();
    context.restore();

    wrapText(context, name, x, y, r, highlighted);
}

function renderBackground(context) {
    var gradient = null;
    context.save();
    gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 5, canvas.width / 2, canvas.height / 2, 300);
    gradient.addColorStop(0, '#000028');
    gradient.addColorStop(1, '#080808');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.restore();
}

function drawLine(context, xOffset, yOffset, c1, c2) {

    var c1x = c1.x - xOffset,
        c1y = c1.y - yOffset,
        c2x = c2.x - xOffset,
        c2y = c2.y - yOffset,
        dx = c2x - c1.x,
        dy = c2y - c1y,
        a = null,
        x0 = null,
        y0 = null,
        x1 = null,
        y1 = null,
        x2 = null,
        y2 = null,
        x3 = null,
        y3 = null;

    context.save();

    a = Math.atan2(dy, dx);

    x0 = c1x + c1.r * Math.cos(a + 0.5) + 5 * Math.sign(dx);
    y0 = c1y + c1.r * Math.sin(a + 0.5) + 5 * Math.sign(dy);

    x1 = c1x + 2 * c1.r * Math.cos(a + 0.5);
    y1 = c1y + 2 * c1.r * Math.sin(a + 0.5);

    a = a + Math.PI;

    x2 = c2x + 2 * c2.r * Math.cos(a - 0.5);
    y2 = c2y + 2 * c2.r * Math.sin(a - 0.5);

    x3 = c2x + c2.r * Math.cos(a - 0.5) - 5 * Math.sign(dx);
    y3 = c2y + c2.r * Math.sin(a - 0.5) - 5 * Math.sign(dy);

    context.beginPath();
    context.moveTo(x0, y0);
    context.bezierCurveTo(x1, y1, x2, y2, x3, y3);
    context.lineWidth = 2;
    context.shadowBlur = 2.5;
    context.shadowColor = '#4E8800';
    context.strokeStyle = '#4E8800';
    context.lineCap = 'round';
    context.stroke();

    context.restore();
}

function writeToBox(context, infoText) {
    context.save();
    context.fillStyle = '#FFFFFF';
    context.textAlign = "center";
    context.font = '30px Calibri';
    context.fillText(infoText, 3 / 4 * canvas.width, 100);
    context.restore();
}

function drawInfoBox(context, infoText) {
    context.save();
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = '#DDDDDD';
    context.shadowColor = '#000028';
    context.globalAlpha = 0.4;
    context.fillStyle = '#DDDDDD';
    context.fillRect(canvas.width / 2 + 50, 50, canvas.width / 2 - 100, canvas.height - 100);
    context.stroke();

    context.restore();

    writeToBox(context, infoText);

}


function renderCanvas(xOffset, yOffset, circles) {
    var i = null;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground(ctx);

    drawLine(ctx, xOffset, yOffset, circles[0], circles[1]);
    //drawLine(circles[0], circles[2])

    for (i = 0; i < circles.length; i += 1) {
        renderButton(ctx, circles[i].x - xOffset, circles[i].y - yOffset, circles[i].r, circles[i].name, circles[i].hl);
    }

    if (infoBox.show) {
        drawInfoBox(ctx, infoBox.text);
    }
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    //console.log(rect)
    return {
        x: (evt.clientX - rect.left) * (canvas.width / rect.width),
        y: (evt.clientY - rect.top) * (canvas.height / rect.height)
    };
}

function hitTest(mousePos, circle) {

    var rMouseCenter = (mousePos.x - circle.x + canvasTopLeft.x) * (mousePos.x - circle.x + canvasTopLeft.x) +
        (mousePos.y - circle.y + canvasTopLeft.y) * (mousePos.y - circle.y + canvasTopLeft.y);

    return rMouseCenter < (circle.r) * (circle.r);
}


function mouseHoverListener(evt) {
    var mousePos = getMousePos(canvas, evt),
        i = null;
    for (i = 0; i < circles.length; i += 1) {
        if (hitTest(mousePos, circles[i])) {
            if (circles[i].hl === false) {
                btnHov.play();
                circles[i].hl = true;
            }
        } else {
            circles[i].hl = false;
        }
    }

    renderCanvas(canvasTopLeft.x, canvasTopLeft.y, circles);
}

function mouseMoveListener(evt) {
    var mousePos = getMousePos(canvas, evt),
        dx = mouseOnClick.x - mousePos.x,
        dy = mouseOnClick.y - mousePos.y;

    renderCanvas(canvasTopLeft.x + dx, canvasTopLeft.y + dy, circles);
}

function mouseUpListener(evt) {
    canvas.removeEventListener('mousemove', mouseMoveListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    canvas.addEventListener('mousemove', mouseHoverListener, false);

    var mouseOnUp = getMousePos(canvas, evt);
    canvasTopLeft.x += mouseOnClick.x - mouseOnUp.x;
    canvasTopLeft.y += mouseOnClick.y - mouseOnUp.y;

    renderCanvas(canvasTopLeft.x, canvasTopLeft.y, circles);
}

function mouseDownListener(evt) {
    var onCircle = false,
        i = null;
    canvas.removeEventListener('mousemove', mouseHoverListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    mouseOnClick = getMousePos(canvas, evt);

    for (i = 0; i < circles.length; i += 1) {
        if (hitTest(mouseOnClick, circles[i])) {
            infoBox.text = circles[i].facts;
            onCircle = true;
            break;
        }
    }
    if (onCircle) {
        window.removeEventListener("mouseup", mouseUpListener, false);
        //drawInfoBox(ctx, circles[i].facts);
        infoBox.show = true;
        canvas.addEventListener('mousemove', mouseHoverListener, false);
    } else {
        infoBox.show = false;
        canvas.addEventListener('mousemove', mouseMoveListener, false);
    }

    renderCanvas(canvasTopLeft.x, canvasTopLeft.y, circles);
}

function init() {
    var oneonetwo = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            r: 100,
            name: '1 + 1 = 2',
            facts: 'Nothing here yet1',
            hl: false
        },

        aksiom = {
            x: canvas.width / 2 + 600,
            y: canvas.height / 2 - 600,
            r: 60,
            name: 'Axiom',
            facts: 'Nothing here yet2',
            hl: false
        };

    /*
            circle1 = {
                x: canvas.width / 2,
                y: canvas.height / 2,
                r: 50,
                name: 'Natural numbers',
                facts: 'Nothing here yet',
                hl: false
            },

            circle2 = {
                x: canvas.width / 2 + 300,
                y: canvas.height / 2 + 200,
                r: 40,
                name: 'Complex numbers',
                facts: 'Nothing here yet',
                hl: false
            },

            circle3 = {
                x: canvas.width / 2 - 100,
                y: canvas.height / 2 - 200,
                r: 45,
                name: 'Irrational numbers',
                facts: 'Nothing here yet',
                hl: false
            };
    */

    //circles = [circle1, circle2, circle3];
    circles = [oneonetwo, aksiom];

    renderCanvas(canvasTopLeft.x, canvasTopLeft.y, circles);
    canvas.addEventListener('mousemove', mouseHoverListener, false);
    canvas.addEventListener("mousedown", mouseDownListener, false);
}

init();