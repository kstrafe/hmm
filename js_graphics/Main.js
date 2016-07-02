/*global Audio*/
/*global document*/
/*global window*/

/*global Bubble*/
/*global Bubbles*/
/*global Colors*/
/*global Context*/
/*global Curve*/
/*global Curves*/
/*global FactBox*/
/*global Floaty*/
/*global Floatys*/
/*global Sfx*/

"use strict";
var context = new Context(document.getElementById('canvas'));
var floaties = new Floatys();
var factBox = new FactBox('', '');
var bubbles = new Bubbles();
var curves = new Curves();

var audio = new Audio('Music/Chronicles_of_Creation_Suite_No._2.mp3');
audio.play();
var sfx = new Sfx();

function renderEverything() {
    context.renderBG();
    context.draw([floaties, bubbles, curves]);
    context.drawAbsolute(factBox);
}

function updateEverything() {
    context.applySpeed();
    floaties.update(context.low(), context.high(), context.left(), context.width());
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

    if (onCircle.hit) {
        window.removeEventListener("mouseup", mouseUpListener, false);
        context.canvas.addEventListener('mousemove', mouseHoverListener, false);
        factBox.show(onCircle.facts);
    } else {
        context.canvas.addEventListener('mousemove', mouseMoveListener, false);
        factBox.hide();
    }
}

function setCanvasSpeed(key, speed) {
    switch (key.which) {
    case 72:
    case 37:
        context.setSpeedX(-speed);
        break;
    case 75:
    case 38:
        context.setSpeedY(-speed);
        break;
    case 76:
    case 39:
        context.setSpeedX(speed);
        break;
    case 74:
    case 40:
        context.setSpeedY(speed);
        break;
    }
}

function keyboardDown(key) {
    setCanvasSpeed(key, 20);
}

function keyboardUp(key) {
    setCanvasSpeed(key, 0);
}

function main() {
    var oneonetwoFacts = "The equals sign can be used as a simple statement of fact (x = 2). The plus symbol (+) is a binary operator dependeny on its argument types. The same applies to multiplication (*), subtraction (-), and division (/).",
        oneonetwo = new Bubble(0, 0, 100, '1 + 1 = 2', oneonetwoFacts, false),
        axiomFacts = 'A statement that is so evident or well-established, that it is accepted without controversy or question. Thus, the axiom can be used as the premise or starting point for further reasoning or arguments',
        axiom = new Bubble(600, -600, 60, 'Axiom', axiomFacts, false);

    bubbles.add(oneonetwo);
    bubbles.add(axiom);

    curves.append(new Curve(0, 0, 100, 0, 0, 100));
    curves.append(new Curve(0, 0, 100, 600, -640, 100));

    context.onResize();
    context.centerOn(0, 0);
    context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    context.canvas.addEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("resize", function () {
        context.onResize();
    }, false);
    document.addEventListener("keydown", keyboardDown, false);
    document.addEventListener("keyup", keyboardUp, false);
    // canvas.addEventListener("mousewheel", zoom, false);
    setInterval(function () {
        updateEverything();
        renderEverything();
    }, 30);
}

main();
