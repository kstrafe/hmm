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

var selected_bubble = null;


function renderEverything() {
    context.renderBG();
    context.draw([floaties, bubbles, curves]);
    context.drawAbsolute(factBox);
    context.drawAbsolute(sounds);
    context.drawDevMode();
}

function updateEverything() {
    context.applySpeed();
    floaties.update(context.low(), context.high(), context.left(), context.width());
    sounds.refreshBgm();
}

function mouseHoverListener(evt) {
    var mousePos = context.scaledMousePos(evt);
    bubbles.hover(mousePos, sounds);
    sounds.hoverButton(context.mousePos(evt));
}

function zoom(evt) {
    if (factBox.isActive()) {
        factBox.scroll(evt.deltaY);
    } else {
        if (evt.deltaY > 0) {
            context.zoomOut();
        } else if (evt.deltaY < 0) {
            context.zoomIn();
        }
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

function drawFactBoxSpace(onCircle) {
    if (onCircle.hit) {
        window.removeEventListener("mouseup", mouseUpListener, false);
        context.canvas.addEventListener('mousemove', mouseHoverListener, false);
        factBox.show(onCircle.facts);
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

function isMovementKey(key) {
    switch (key.which) {
    case 65:
    case 72:
    case 37:
    case 87:
    case 75:
    case 38:
    case 68:
    case 76:
    case 39:
    case 83:
    case 74:
    case 40:
        return true;
    default:
        return false;
    }
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
    if (isMovementKey(key)) {
        bubbles.hover(context.getCenterPos(), sounds);
    }
}

function keyboardDown(key) {
    var bubble = null,
        curve = null,
        mousePos = null;
    console.log(key.which);
    switch (key.which) {
    case 32:
        drawFactBoxSpace(bubbles.click(context.getCenterPos()));
        break;
    case 77:
        sounds.nextState();
        break;
    case 69:
        context.flipDevMode();
        break;
    case 82:
        mousePos = context.scaledMousePos();
        bubble = bubbles.collide(mousePos);
        if (selected_bubble) {
            selected_bubble.moveTo(mousePos.x, mousePos.y);
            curves.reposition(selected_bubble.getIndex(), bubbles);
            selected_bubble = null;
        } else {
            selected_bubble = bubble;
        }
        break;
    case 81:
        mousePos = context.scaledMousePos();
        bubble = bubbles.collide(mousePos);
        if (selected_bubble) {
            curve = new Curve(selected_bubble.x, selected_bubble.y, selected_bubble.r, bubble.x, bubble.y, bubble.r);
            curves.append(curve);
            selected_bubble = null;
        } else {
            selected_bubble = bubble;
        }
        break;
    case 84:
        mousePos = context.scaledMousePos();
        bubble = new Bubble(null, mousePos.x, mousePos.y, 100, "New Knowledge!", "");
        bubbles.add(null, bubble);
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
        j = null,
        b = null,
        curve = null,
        end = null;

    for (i in all_bubbles) {
        if (all_bubbles.hasOwnProperty(i)) {
            b = all_bubbles[i];
            b = new Bubble(i, b.x, b.y, b.r, b.title, b.facts);
            bubbles.add(i, b);
        }
    }

    for (i in all_bubbles) {
        if (all_bubbles.hasOwnProperty(i)) {
            b = all_bubbles[i];
            for (j = 0; j < b.link.length; j += 1) {
                end = all_bubbles[b.link[j]];
                curve = new Curve(b.x, b.y, b.r, end.x, end.y, end.r);
                curves.append(curve, i, b.link[j]);
            }
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
