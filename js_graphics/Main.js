/*global Audio*/
/*global document*/
/*global window*/

/*global Bubble*/
/*global Bubbles*/
/*global Colors*/
/*global Context*/
/*global FactBox*/
/*global Floaty*/
/*global Floatys*/
/*global Sfx*/

"use strict";
var context = new Context(document.getElementById('canvas'));
var floaties = new Floatys();
var factBox = new FactBox('', '');
var bubbles = new Bubbles();

var audio = new Audio('Music/Chronicles_of_Creation_Suite_No._2.mp3');
audio.play();
var sfx = new Sfx();

var mouseOnClick = null;
var circles;

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

function renderEverything() {
    context.renderBG();
    context.draw([bubbles, floaties]);
}

function updateEverything() {
    floaties.update(1080, 0, 0, 1080);
}

function mouseHoverListener(evt) {
    var mousePos = context.mousePos(evt);
    bubbles.hover(mousePos, sfx, context.getOffset());
}

/*
function zoom() {
    ctx.clearRect(0, 0, 100, 100);
    ctx.translate(100, 100);
    ctx.scale(0.9, 0.9);
}
*/

function mouseMoveListener(evt) {
    var mousePos = context.mousePos(evt),
        offtmp = context.mouseDown,
        dx = offtmp.x - mousePos.x,
        dy = offtmp.y - mousePos.y;
    context.offsetTemporary(dx, dy);
}

function mouseUpListener(evt) {
    context.canvas.removeEventListener('mousemove', mouseMoveListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    context.canvas.addEventListener('mousemove', mouseHoverListener, false);

    var mouseOnUp = context.mousePos(evt),
        mouseOnDown = context.mouseDown;

    context.addOffset(mouseOnDown.x - mouseOnUp.x, mouseOnDown.y - mouseOnUp.y);
}

function mouseDownListener(evt) {
    var onCircle = false,
        mousePos = null;

    context.canvas.removeEventListener('mousemove', mouseHoverListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    mousePos = context.mousePos(evt);
    context.mouseDown = mousePos;
    onCircle = bubbles.click(mousePos, context.getOffset());

    if (onCircle) {
        window.removeEventListener("mouseup", mouseUpListener, false);
        context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    } else {
        context.canvas.addEventListener('mousemove', mouseMoveListener, false);
    }
}

/*
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
*/

/*
function keyboardDown(key) {
    // setCanvasSpeed(key, 20);
}

function keyboardUp(key) {
    // setCanvasSpeed(key, 0);
}
*/

/*
function addSpeeds() {
    // canvasTopLeft.x += canvasSpeed.x;
    // canvasTopLeft.y += canvasSpeed.y;
}
*/

function init() {
    var oneonetwoFacts = "The equals sign can be used as a simple statement of fact (x = 2). The plus symbol (+) is a binary operator dependeny on its argument types. The same applies to multiplication (*), subtraction (-), and division (/).",
        oneonetwo = new Bubble(context.canvas.width / 2, context.canvas.height / 2, 100, '1 + 1 = 2', oneonetwoFacts, false),
        axiomFacts = 'A statement that is so evident or well-established, that it is accepted without controversy or question. Thus, the axiom can be used as the premise or starting point for further reasoning or arguments',
        axiom = new Bubble(context.canvas.width / 2 + 600, context.canvas.height / 2 - 600, 60, 'Axiom', axiomFacts, false),
        oneonetwo_old = {
            x: context.canvas.width / 2,
            y: context.canvas.height / 2,
            r: 100,
            name: '1 + 1 = 2',
            facts: 'The equals sign can be used as a simple statement of fact (x = 2). The plus symbol (+) is a binary operator dependeny on its argument types. The same applies to multiplication (*), subtraction (-), and division (/).',
            hl: false
        },

        aksiom_old = {
            x: context.canvas.width / 2 + 600,
            y: context.canvas.height / 2 - 600,
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

    context.onResize();
    context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    context.canvas.addEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("resize", context.onResize, false);
    // document.addEventListener("keydown", keyboardDown, false);
    // document.addEventListener("keyup", keyboardUp, false);
    //canvas.addEventListener("mousewheel", zoom, false);
    setInterval(function () {
        updateEverything();
        // addSpeeds();
        renderEverything();
    }, 30);
}

init();
