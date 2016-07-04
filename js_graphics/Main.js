/*global document*/
/*global window*/

/*global all_bubbles*/
/*global all_curves*/
/*global Bubble*/
/*global Bubbles*/
/*global Colors*/
/*global Context*/
/*global Curve*/
/*global Curves*/
/*global FactBox*/
/*global Floaty*/
/*global Floatys*/
/*global Sounds*/

"use strict";
var context = new Context(document.getElementById('canvas'));
var floaties = new Floatys();
var factBox = new FactBox('', '');
var bubbles = new Bubbles();
var curves = new Curves();

var sounds = new Sounds();
sounds.playBGM();


function renderEverything() {
    context.renderBG();
    context.draw([floaties, bubbles, curves]);
    context.drawAbsolute(factBox);
    context.drawAbsolute(sounds);
    context.drawDevMode();
}

function updateEverything() {
    var centerPos = context.applySpeed();
    bubbles.hover(centerPos, sounds);
    floaties.update(context.low(), context.high(), context.left(), context.width());
}

function mouseHoverListener(evt) {
    var mousePos = context.scaledMousePos(evt);
    bubbles.hover(mousePos, sounds);
    sounds.hoverButton(context.mousePos(evt));
}

function zoom(evt) {
    if (evt.deltaY > 0) {
        context.zoomOut();
    } else if (evt.deltaY < 0) {
        context.zoomIn();
    }
}

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

function drawFactBox(onCircle) {
    if (onCircle.hit) {
        window.removeEventListener("mouseup", mouseUpListener, false);
        context.canvas.addEventListener('mousemove', mouseHoverListener, false);
        factBox.show(onCircle.facts);
    } else {
        context.canvas.addEventListener('mousemove', mouseMoveListener, false);
        factBox.hide();
    }
}

function mouseDownListener(evt) {
    var onCircle = false,
        mousePos = null,
        scaledPos = null;

    context.canvas.removeEventListener('mousemove', mouseHoverListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    mousePos = context.mousePos(evt);
    scaledPos = context.scaledMousePos(evt);
    context.mouseDown = mousePos;
    onCircle = bubbles.click(scaledPos);
    drawFactBox(onCircle);
    sounds.onClick(mousePos);
}

function setCanvasSpeed(key, speed) {
    switch (key.which) {
    case 65:
    case 72:
    case 37:
        context.setSpeedX(-speed);
        break;
    case 87:
    case 75:
    case 38:
        context.setSpeedY(-speed);
        break;
    case 68:
    case 76:
    case 39:
        context.setSpeedX(speed);
        break;
    case 83:
    case 74:
    case 40:
        context.setSpeedY(speed);
        break;
    }
}

function keyboardDown(key) {
    console.log(key);
    switch (key.which) {
    case 32:
        drawFactBox(bubbles.click(context.getCenterPos()));
        break;
    case 77:
        sounds.flipMute();
        break;
    case 69:
        context.flipDevMode();
        break;
    case 189:
        context.zoomOut();
        break;
    case 187:
        context.zoomIn();
        break;
    default:
        setCanvasSpeed(key, 20);
        factBox.hide();
        break;
    }
}

function keyboardUp(key) {
    setCanvasSpeed(key, 0);
}

function main() {
    var i = null,
        b = null,
        begin = null,
        end = null;
    for (i in all_bubbles) {
        if (all_bubbles.hasOwnProperty(i)) {
            b = all_bubbles[i];
            b = new Bubble(b.x, b.y, b.r, b.title, b.facts);
            bubbles.add(b);
        }
    }

    for (i in all_curves) {
        if (all_curves.hasOwnProperty(i)) {
            b = all_curves[i];
            begin = all_bubbles[b.begin];
            end = all_bubbles[b.end];
            b = new Curve(begin.x, begin.y, begin.r, end.x, end.y, end.r);
            curves.append(b);
        }
    }

    context.onResize();
    context.centerOn(0, 0);
    context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    context.canvas.addEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("resize", function () {
        context.onResize();
    }, false);
    document.addEventListener("keydown", keyboardDown, false);
    document.addEventListener("keyup", keyboardUp, false);
    context.canvas.addEventListener("mousewheel", zoom, false);
    setInterval(function () {
        updateEverything();
        renderEverything();
    }, 30);
}

main();
