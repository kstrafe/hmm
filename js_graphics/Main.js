/*global document*/
/*global window*/

/*global all_bubbles*/
/*global all_curves*/
/*global Blob*/
/*global Bubble*/
/*global Bubbles*/
/*global Colors*/
/*global ConMenu*/
/*global Context*/
/*global Curve*/
/*global Curves*/
/*global Edit*/
/*global FactBox*/
/*global Floaty*/
/*global Floatys*/
/*global Help*/
/*global KEY*/
/*global localStorage*/
/*global MathJax*/
/*global navigator*/
/*global Sounds*/
/*global Storage*/
/*global Teleport*/
/*global TempLine*/

"use strict";


var context = new Context(document.getElementById('canvas'));
var floaties = new Floatys();
var factBox = new FactBox();
var bubbles = new Bubbles();
var curves = new Curves();
var edit = new Edit();
var help = new Help();
var templine = new TempLine();
var sounds = new Sounds();
sounds.playBGM();
var teleport = new Teleport();

var openBubble = null;
var editingBubble = null;


function renderEverything() {
    context.renderBG();
    context.draw([floaties, bubbles, curves, templine]);
    context.drawAbsolute(factBox);
    context.drawAbsolute(sounds);
    context.drawAbsolute(edit);
    context.drawAbsolute(help);
    context.drawAbsolute(teleport);
    context.drawDevMode();
}

function updateEverything() {
    context.applySpeed();
    floaties.update(context.low(), context.high(), context.left(), context.width());
    sounds.refreshBgm();
    sounds.fadeOut();
    help.fadeOut();
    teleport.fadeOut();
}

function editGraph() {
    var mousePos = context.scaledMousePos(),
        curve = null,
        bubble = bubbles.collide(mousePos);

    if (bubble === undefined && editingBubble === null) {
        console.log("create");
        bubble = new Bubble(bubbles.genUniqId(), mousePos.x, mousePos.y, 100, bubbles.length().toString(), "New knowledge shall arrive here soon");
        bubbles.add(bubble.getIndex(), bubble);
    } else if (bubble === undefined && editingBubble !== null) {
        console.log("move-end");
        edit.off();
        editingBubble.moveTo(mousePos.x, mousePos.y);
        curves.reposition(editingBubble.getIndex(), bubbles);
        editingBubble = null;
        templine.setStart(null);
    } else if (bubble !== undefined && editingBubble !== null) {
        console.log("link-end");
        edit.off();
        curve = new Curve(editingBubble.x, editingBubble.y, editingBubble.r, bubble.x, bubble.y, bubble.r);
        curves.append(curve, editingBubble.getIndex(), bubble.getIndex());
        editingBubble = null;
        templine.setStart(null);
    } else if (bubble !== undefined && editingBubble === null) {
        console.log("movelink-start");
        edit.on();
        editingBubble = bubble;
        if (bubble !== undefined) {
            templine.setStart(bubble.getXY());
        } else {
            templine.setStart(null);
        }
    }
}

function mouseHoverListener(evt) {
    var smousePos = context.scaledMousePos(evt),
        mPos = context.mousePos(evt);
    bubbles.hover(smousePos, sounds);
    sounds.hoverButton(mPos);
    help.hoverButton(mPos);
    teleport.hoverButton(mPos);
    templine.setStop(smousePos);
}

function zoom(evt) {
    if (evt.deltaY !== undefined) {
        context.zoomMouseVal(evt.deltaY);
    } else if (evt.detail !== undefined) {
        context.zoomMouseVal(evt.detail);
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
        factBox.show(onCircle.facts, openBubble.getFav(), openBubble.isMastered());
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
    openBubble = onCircle.bubble;
    if (onCircle.hit) {
        factBox.show(onCircle.facts, openBubble.getFav(), openBubble.isMastered());

        sounds.openInfo();
        window.removeEventListener("mouseup", mouseUpListener, false);
        context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    }
}

function openEditor() {
    var nameFacts = openBubble.getNameAndFacts();
    factBox.openEditor(nameFacts);
}

function closeEditor() {
    factBox.closeEditor(openBubble);
}

function closeEditorNoSave() {
    factBox.closeEditorNoSave();
}

function master() {
    var mastered;
    openBubble.flipMaster();
    curves.masterFrom(openBubble.getIndex(), openBubble.isMastered());
    factBox.setMaster(openBubble.isMastered());
    if (Storage !== undefined) {
        mastered = JSON.stringify(bubbles.getMastered());
        localStorage.setItem("mastered", mastered);
    }
}

function teleportTo(x, y) {
    var bubble;
    if (y === undefined && x !== undefined) {
        bubble = bubbles.getNamed(x);
        if (bubble !== undefined) {
            context.centerAbs(bubble.getXY().x, bubble.getXY().y);
        }
    } else if (x !== undefined) {
        context.centerAbs(x, y);
    }
}

function openTeleport() {
    openBubble = bubbles.getNamed('60');
    drawFactBox({
        hit: true,
        facts: openBubble.getNameAndFacts()
    });
}

function mouseDownListener(evt) {
    var onCircle = false,
        mousePos = null,
        scaledPos = null;

    if (evt.button === 2) {
        return;
    }

    if (factBox.isEditing()) {
        return;
    }

    context.canvas.removeEventListener('mousemove', mouseHoverListener, false);
    window.addEventListener("mouseup", mouseUpListener, false);

    mousePos = context.mousePos(evt);
    scaledPos = context.scaledMousePos(evt);
    context.mouseDown = mousePos;

    onCircle = bubbles.click(scaledPos);
    if (onCircle.hit) {
        openBubble = onCircle.bubble;
    } else {
        factBox.hide();
    }
    drawFactBox(onCircle);
    sounds.onClick(mousePos);
    help.click();
    if (teleport.click()) {
        openTeleport();
    }
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
        tot += '    ' + bubble.getIndex() + ': {\n';
        tot += '        x: ' + bubble.getXY().x + ',\n';
        tot += '        y: ' + bubble.getXY().y + ',\n';
        tot += '        r: ' + bubble.getR() + ',\n';
        tot += '        color: "' + bubble.getColor() + '",\n';
        tot += '        link: [' + curves.getForwards(bubble.getIndex()).map(surroundQuotes) + '],\n';
        tot += '        title: "' + bubble.getTitle().replace(/[\""]/g, '\\"') + '",\n';
        tot += '        facts: "' + jsEscape(bubble.getFacts()) + '",\n';
        tot += '    },\n';
    }
    tot += '};';
    downloadData('Data.js', tot);
}

function keyboardDown(key) {
    var movingSpeed = 20;

    if (factBox.isActive()) {
        if (key.which === KEY.ESC && factBox.isEditing() === false) {
            drawFactBoxSpace();
            return;
        }
        return;
    }

    help.deactivate();
    switch (key.which) {
    case KEY.ESC:
        editingBubble = null;
        templine.setStart(null);
        edit.off();
        break;
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
    case KEY.T:
        openTeleport();
        break;
    case KEY.Q:
        editGraph();
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
    teleport.resize(context.canvas.width);
}

function contextMenu() {
    editGraph();
    return false;
}

function toggleFavorite() {
    var favd;
    openBubble.toggleFav();
    if (Storage !== undefined) {
        favd = JSON.stringify(bubbles.getFavd());
        localStorage.setItem("favd", favd);
    }
}

function setupBubblesAndCurves() {
    var i = null,
        j = null,
        b = null,
        bubble,
        curve = null,
        end = null,
        mastereds,
        tmps;

    for (i in all_bubbles) {
        if (all_bubbles.hasOwnProperty(i)) {
            b = all_bubbles[i];
            bubble = new Bubble(i, b.x, b.y, b.r, b.title, b.facts);
            if (b.color !== undefined) {
                bubble.setColor(b.color);
            }
            bubbles.add(i, bubble);
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

    if (Storage === undefined) {
        document.getElementById("viewmaster").disabled = true;
    } else {
        if (localStorage.mastered !== undefined) {
            mastereds = JSON.parse(localStorage.mastered);
            bubbles.setMastereds(mastereds);
            for (i = 0; i < mastereds.length; i += 1) {
                curves.masterFrom(mastereds[i], true);
            }
        }
        if (localStorage.favd !== undefined) {
            mastereds = JSON.parse(localStorage.favd);
            for (i = 0; i < mastereds.length; i += 1) {
                tmps = bubbles.getNamed(mastereds[i]);
                if (tmps !== undefined) {
                    tmps.toggleFav();
                }
            }
        }
    }
}

function main() {
    var frametime = 30,
        mousewheelevt = null;

    setupBubblesAndCurves();
    onResize();
    context.centerOn(0, 0);
    context.canvas.addEventListener('mousemove', mouseHoverListener, false);
    context.canvas.addEventListener("mousedown", mouseDownListener, false);
    window.addEventListener("resize", onResize, false);
    document.addEventListener("keydown", keyboardDown, false);
    document.addEventListener("keyup", keyboardUp, false);

    mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel";
    if (context.canvas.attachEvent) {
        context.canvas.attachEvent("on" + mousewheelevt, zoom);
    } else if (document.addEventListener) {
        context.canvas.addEventListener(mousewheelevt, zoom, false);
    }
    context.canvas.oncontextmenu = contextMenu;

    setInterval(function () {
        updateEverything();
        renderEverything();
    }, frametime);
}

window.onload = main;
