/*global Audio*/
/*global document*/
/*global window*/

/*global Colors*/
/*global Context*/
/*global Floaty*/
/*global Floatys*/
/*global Sfx*/
/*global FactBox*/
/*global Bubble*/
/*global Bubbles*/

"use strict";
var context = new Context(document.getElementById('canvas'));
var floaties = new Floatys();
var factBox = new FactBox('', '');
var bubbles = new Bubbles();

var audio = new Audio('Music/Chronicles_of_Creation_Suite_No._2.mp3'),
    mouseOnClick = null;
audio.play();
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sfx = new Sfx();

function onResize() {
    ctx.canvas.width = document.documentElement.clientWidth;
    ctx.canvas.height = document.documentElement.clientHeight;
}

var canvasPosition = {
    x: 0,
    y: 0
};

onResize();

var canvasTopLeft = {
    x: 0,
    y: 0
};

var canvasSpeed = {
    x: 0,
    y: 0
};

var infoBox = {
    show: false
};

var circles;

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

function updateEntities() {
    floaties.update(1080, 0, 0, 1080);
}

function renderCanvas(bubbles) {
    var xOffset = canvasTopLeft.x + canvasPosition.x,
        yOffset = canvasTopLeft.y + canvasPosition.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    renderBackground(ctx);
    ctx.save();
    ctx.translate(-xOffset, -yOffset);

    //drawLine(circles[0], circles[2])
    //console.log(circles)
    //drawLine(ctx, 0, 0, circles[0], circles[1]);
    //console.log(bubbles);
    //throw error;
    bubbles.drawAll(ctx);

    floaties.draw(ctx);
    ctx.restore();

    if (infoBox.show) {
        factBox.draw(ctx);
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


function mouseHoverListener(evt) {
    var mousePos = getMousePos(canvas, evt),
        i = null;

    for (i = 0; i < bubbles.length(); i += 1) {

        if (bubbles.getBubble(i).hitTest(mousePos, canvasTopLeft)) {
            if (bubbles.getBubble(i).getHL() === false) {
                sfx.hover();
                bubbles.getBubble(i).setHighlighting(true);
            }
        } else {
            bubbles.getBubble(i).setHighlighting(false);
        }
    }

    renderCanvas(bubbles);
}

function zoom() {
    ctx.clearRect(0, 0, 100, 100);
    ctx.translate(100, 100);
    ctx.scale(0.9, 0.9);
}

function mouseMoveListener(evt) {
    var mousePos = getMousePos(canvas, evt),
        dx = mouseOnClick.x - mousePos.x,
        dy = mouseOnClick.y - mousePos.y;
    canvasPosition.x = dx;
    canvasPosition.y = dy;

    renderCanvas(bubbles);
}

function mouseUpListener(evt) {
    canvas.removeEventListener('mousemove', mouseMoveListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    canvas.addEventListener('mousemove', mouseHoverListener, false);

    var mouseOnUp = getMousePos(canvas, evt);
    canvasTopLeft.x += mouseOnClick.x - mouseOnUp.x;
    canvasTopLeft.y += mouseOnClick.y - mouseOnUp.y;

    canvasPosition = {
        x: 0,
        y: 0
    };

    renderCanvas(bubbles);
}

function mouseDownListener(evt) {
    var onCircle = false,
        i = null,
        info = null;
    canvas.removeEventListener('mousemove', mouseHoverListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    mouseOnClick = getMousePos(canvas, evt);

    for (i = 0; i < bubbles.length(); i += 1) {
        if (bubbles.getBubble(i).hitTest(mouseOnClick, canvasTopLeft)) {
            info = bubbles.getBubble(i).getNameAndFacts();
            factBox = new FactBox(info.name, info.facts);
            onCircle = true;
            break;
        }
    }
    if (onCircle) {
        window.removeEventListener("mouseup", mouseUpListener, false);
        infoBox.show = true;
        canvas.addEventListener('mousemove', mouseHoverListener, false);
    } else {
        infoBox.show = false;
        canvas.addEventListener('mousemove', mouseMoveListener, false);
    }

    renderCanvas(bubbles);
}

function setCanvasSpeed(key, speed) {
    console.log(key.which, speed);
    switch (key.which) {
    case 72:
    case 37:
        canvasSpeed.x = -speed;
        break;
    case 75:
    case 38:
        canvasSpeed.y = -speed;
        break;
    case 76:
    case 39:
        canvasSpeed.x = speed;
        break;
    case 74:
    case 40:
        canvasSpeed.y = speed;
        break;
    }
}

function keyboardDown(key) {
    setCanvasSpeed(key, 20);
}

function keyboardUp(key) {
    setCanvasSpeed(key, 0);
}

function addSpeeds() {
    canvasTopLeft.x += canvasSpeed.x;
    canvasTopLeft.y += canvasSpeed.y;
}

function init() {
    var oneonetwoFacts = "The equals sign can be used as a simple statement of fact (x = 2). The plus symbol (+) is a binary operator dependeny on its argument types. The same applies to multiplication (*), subtraction (-), and division (/).",
        oneonetwo = new Bubble(canvas.width / 2, canvas.height / 2, 100, '1 + 1 = 2', oneonetwoFacts, false),
        axiomFacts = 'A statement that is so evident or well-established, that it is accepted without controversy or question. Thus, the axiom can be used as the premise or starting point for further reasoning or arguments',
        axiom = new Bubble(canvas.width / 2 + 600, canvas.height / 2 - 600, 60, 'Axiom', axiomFacts, false),
        oneonetwo_old = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            r: 100,
            name: '1 + 1 = 2',
            facts: 'The equals sign can be used as a simple statement of fact (x = 2). The plus symbol (+) is a binary operator dependeny on its argument types. The same applies to multiplication (*), subtraction (-), and division (/).',
            hl: false
        },

        aksiom_old = {
            x: canvas.width / 2 + 600,
            y: canvas.height / 2 - 600,
            r: 60,
            name: 'Axiom',
            facts: 'A statement that is so evident or well-established, that it is accepted without controversy or question. Thus, the axiom can be used as the premise or starting point for further reasoning or arguments',
            hl: false
        };

    bubbles.add(oneonetwo);
    bubbles.add(axiom);

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
    circles = [oneonetwo_old, aksiom_old];
    //console.log(circle)

    //renderCanvas(bubbles);
    canvas.addEventListener('mousemove', mouseHoverListener, false);
    canvas.addEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("resize", onResize, false);
    document.addEventListener("keydown", keyboardDown, false);
    document.addEventListener("keyup", keyboardUp, false);
    //canvas.addEventListener("mousewheel", zoom, false);
    setInterval(function () {
        updateEntities();
        addSpeeds();
        renderCanvas(bubbles);
    }, 30);
}

init();