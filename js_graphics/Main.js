/*global document*/
/*global window*/

/*global all_bubbles*/
/*global all_curves*/
/*global Blob*/
/*global Bubble*/
/*global Bubbles*/
/*global Colors*/
/*global Context*/
/*global Curve*/
/*global Curves*/
/*global Edit*/
/*global FactBox*/
/*global Floaty*/
/*global Floatys*/
/*global Help*/
/*global KEY*/
/*global MathJax*/
/*global Sounds*/

"use strict";

var lastBubble = null;

var context = new Context(document.getElementById('canvas'));
var floaties = new Floatys();
var factBox = new FactBox();
var bubbles = new Bubbles();
var curves = new Curves();
var edit = new Edit();
var help = new Help();

var sounds = new Sounds();
sounds.playBGM();

var selected_bubble = null;


function renderEverything() {
    context.renderBG();
    context.draw([floaties, bubbles, curves]);
    context.drawAbsolute(factBox);
    context.drawAbsolute(sounds);
    context.drawAbsolute(edit);
    context.drawAbsolute(help);
    context.drawDevMode();
}

function updateEverything() {
    context.applySpeed();
    floaties.update(context.low(), context.high(), context.left(), context.width());
    sounds.refreshBgm();
    help.fadeOut();
}

function mouseHoverListener(evt) {
    var smousePos = context.scaledMousePos(evt),
        mPos = context.mousePos(evt);
    bubbles.hover(smousePos, sounds);
    sounds.hoverButton(mPos);
    help.hoverButton(mPos);
}

function zoom(evt) {
    if (evt.deltaY > 0) {
        context.zoomOutMouse();
    } else if (evt.deltaY < 0) {
        context.zoomInMouse();
    }
}

function mouseMoveListener(evt) {
    var mousePos = context.mousePos(evt),
        offtmp = context.mouseDown,
        dx = offtmp.x - mousePos.x,
        dy = offtmp.y - mousePos.y;
    if (factBox.isActive() === false) {
        context.offsetTemporary(dx, dy);
    }
}

function mouseUpListener(evt) {
    context.canvas.removeEventListener('mousemove', mouseMoveListener, false);
    window.removeEventListener("mouseup", mouseUpListener, false);
    context.canvas.addEventListener('mousemove', mouseHoverListener, false);

    var mouseOnUp = context.mousePos(evt),
        mouseOnDown = context.mouseDown;

    if (factBox.isActive() === false) {
        context.addOffset(mouseOnDown.x - mouseOnUp.x, mouseOnDown.y - mouseOnUp.y);
    }
}

function drawFactBox(onCircle) {
    if (onCircle.hit) {
        sounds.openInfo();
        window.removeEventListener("mouseup", mouseUpListener, false);
        context.canvas.addEventListener('mousemove', mouseHoverListener, false);
        factBox.show(onCircle.facts);
    } else {
        context.canvas.addEventListener('mousemove', mouseMoveListener, false);
        factBox.hide();
    }
}

function drawFactBoxSpace(onCircle) {
    if (factBox.isActive() === true) {
        factBox.hide();
        return;
    }
    lastBubble = onCircle.bubble;
    if (onCircle.hit) {
        factBox.show(onCircle.facts);

        sounds.openInfo();
        window.removeEventListener("mouseup", mouseUpListener, false);
        context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    }
}

function openEditor() {
    var nameFacts = lastBubble.getNameAndFacts();
    factBox.openEditor(nameFacts);
}

function closeEditor() {
    factBox.closeEditor(lastBubble);
}

function closeEditorNoSave() {
    factBox.closeEditorNoSave();
}

function master() {
    console.log(lastBubble);
    lastBubble.masterThis();
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
    if (onCircle.hit) {
        lastBubble = onCircle.bubble;
    } else {
        factBox.hide();
    }
    drawFactBox(onCircle);
    sounds.onClick(mousePos);
    help.click();
}

function isMovementKey(key) {
    switch (key.which) {
    case KEY.LEFT:
    case KEY.UP:
    case KEY.RIGHT:
    case KEY.DOWN:
    case KEY.W:
    case KEY.A:
    case KEY.S:
    case KEY.D:
    case KEY.H:
    case KEY.J:
    case KEY.K:
    case KEY.L:
        return true;
    default:
        return false;
    }
}

function setCanvasSpeed(key, speed) {
    switch (key.which) {
    case KEY.LEFT:
    case KEY.A:
    case KEY.H:
        context.setSpeedX(-speed);
        break;
    case KEY.UP:
    case KEY.W:
    case KEY.K:
        context.setSpeedY(-speed);
        break;
    case KEY.RIGHT:
    case KEY.D:
    case KEY.L:
        context.setSpeedX(speed);
        break;
    case KEY.DOWN:
    case KEY.S:
    case KEY.J:
        context.setSpeedY(speed);
        break;
    }
    if (isMovementKey(key)) {
        bubbles.hover(context.getCenterPos(), sounds);
    }
}

function moveOrSelectBubble() {
    var mousePos = context.scaledMousePos(),
        bubble = bubbles.collide(mousePos);

    if (edit.linking()) {
        selected_bubble = null;
        edit.flipLink();
        return;
    }

    if (selected_bubble) {
        selected_bubble.moveTo(mousePos.x, mousePos.y);
        curves.reposition(selected_bubble.getIndex(), bubbles);
        selected_bubble = null;
    } else {
        selected_bubble = bubble;
    }

    if (selected_bubble) {
        edit.activateMove();
    } else {
        edit.deactivateMove();
    }
}

function createLineOrSelectBubble() {
    var mousePos = context.scaledMousePos(),
        curve = null,
        bubble = bubbles.collide(mousePos);

    if (edit.moving()) {
        selected_bubble = null;
        edit.flipMove();
        return;
    }

    if (selected_bubble && bubble) {
        curve = new Curve(selected_bubble.x, selected_bubble.y, selected_bubble.r, bubble.x, bubble.y, bubble.r);
        curves.append(curve, selected_bubble.getIndex(), bubble.getIndex());
        selected_bubble = null;
    } else {
        selected_bubble = bubble;
    }

    if (selected_bubble) {
        edit.activateLink();
    } else {
        edit.deactivateLink();
    }
}

function createBubble() {
    var mousePos = context.scaledMousePos(),
        bubble = new Bubble(bubbles.length(), mousePos.x, mousePos.y, 100, bubbles.length().toString(), "New knowledge shall arrive here soon");
    bubbles.add(bubbles.length(), bubble);
}

function downloadData(filename, data) {
    var blob = new Blob([data], {
            type: 'text/csv'
        }),
        elem;
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

function surroundQuotes(string) {
    return '"' + string + '"';
}

function jsEscape(string) {
    return string.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/"/g, '\\"');
}

function generateDataJs() {
    var tot = '"use strict";\n\nvar all_bubbles = {\n',
        i = null,
        bubble = null;
    for (i = 0; i < bubbles.length(); i += 1) {
        bubble = bubbles.getBubble(i);
        tot += '\t' + bubble.getIndex() + ': {\n';
        tot += '\t\tx: ' + bubble.getXY().x + ',\n';
        tot += '\t\ty: ' + bubble.getXY().y + ',\n';
        tot += '\t\tr: ' + bubble.getR() + ',\n';
        tot += '\t\tlink: [' + curves.getForwards(bubble.getIndex()).map(surroundQuotes) + '],\n';
        tot += '\t\ttitle: "' + bubble.getTitle().replace(/[\""]/g, '\\"') + '",\n';
        tot += '\t\tfacts: "' + jsEscape(bubble.getFacts()) + '",\n';
        tot += '\t},\n';
    }
    tot += '};';
    downloadData('Data.js', tot);
}

function keyboardDown(key) {
    var movingSpeed = 20;

    if (factBox.isActive()) {
        if (key.which === KEY.SPACE && factBox.isEditing() === false) {
            drawFactBoxSpace();
            return;
        }
        if (factBox.isEditing()) {
            return;
        }
    }

    help.deactivate();
    switch (key.which) {
    case KEY.G:
        generateDataJs();
        break;
    case KEY.SPACE:
        drawFactBoxSpace(bubbles.click(context.getCenterPos()));
        break;
    case KEY.M:
        sounds.nextState();
        break;
    case KEY.E:
        context.flipDevMode();
        break;
    case KEY.R:
        moveOrSelectBubble();
        break;
    case KEY.Q:
        createLineOrSelectBubble();
        break;
    case KEY.T:
        createBubble();
        break;
    case KEY.MIN:
        context.zoomOut();
        break;
    case KEY.PLUS:
        context.zoomIn();
        break;
    default:
        setCanvasSpeed(key, movingSpeed);
        factBox.hide();
        break;
    }
}

function keyboardUp(key) {
    setCanvasSpeed(key, 0);
}

function onResize() {
    context.onResize();
    help.resize(context.canvas.width);
}

function main() {
    var i = null,
        j = null,
        b = null,
        curve = null,
        end = null,
        frametime = 30;

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

    onResize();
    context.centerOn(0, 0);
    context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    context.canvas.addEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("resize", onResize, false);
    document.addEventListener("keydown", keyboardDown, false);
    document.addEventListener("keyup", keyboardUp, false);
    context.canvas.addEventListener("mousewheel", zoom, false);
    context.canvas.oncontextmenu = function () {
        console.log("HEY");
        return false;
    };
    setInterval(function () {
        updateEverything();
        renderEverything();
    }, frametime);
}

main();
