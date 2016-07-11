/*global document*/
/*global Colors*/

"use strict";

function Context(canvas) {
    this.canvas = canvas;
    this.devMode = false;
    this.context = canvas.getContext('2d');
    this.xOffset = 0;
    this.mouse = {
        x: 0,
        y: 0
    };
    this.scaleFactor = 1;
    this.yOffset = 0;
    this.tmpxOffset = 0;
    this.tmpyOffset = 0;
    this.blueGradient = null;
    this.offsetSpeed = {
        x: 0,
        y: 0
    };
    this.mouseDown = {
        x: 0,
        y: 0
    };
    this.cacheGradient();
    this.zoomList = [0.03075, 0.06125, 0.125, 0.25, 0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
    this.zoomIndex = 6;
}

Context.prototype.zoomIn = function () {
    if (this.zoomIndex < this.zoomList.length - 1) {
        this.zoomIndex += 1;
        this.zoom(this.zoomList[this.zoomIndex]);
    }
};

Context.prototype.zoomOut = function () {
    if (this.zoomIndex > 0) {
        this.zoomIndex -= 1;
        this.zoom(this.zoomList[this.zoomIndex]);
    }
};

Context.prototype.zoomInMouse = function () {
    if (this.zoomIndex < this.zoomList.length - 1) {
        this.zoomIndex += 1;
        this.zoomMouse(this.zoomList[this.zoomIndex]);
    }
};

Context.prototype.zoomOutMouse = function () {
    if (this.zoomIndex > 0) {
        this.zoomIndex -= 1;
        this.zoomMouse(this.zoomList[this.zoomIndex]);
    }
};

Context.prototype.zoomMouse = function (absfactor) {
    var center = this.scaledMousePos(),
        oldScaleFactor = this.scaleFactor,
        newCenter = {
            x: null,
            y: null
        },
        scaleRatio = (oldScaleFactor / absfactor);

    newCenter.x = center.x + (this.left() + this.width() - center.x) * scaleRatio - 0.5 * this.width() * scaleRatio;
    newCenter.y = center.y + (this.high() - center.y) * scaleRatio + 0.5 * (this.low() - this.high()) * scaleRatio;

    this.scaleFactor = absfactor;

    this.xOffset = newCenter.x * this.scaleFactor - this.canvas.width / 2;
    this.yOffset = newCenter.y * this.scaleFactor - this.canvas.height / 2;
    //this.centerOn(center.x, center.y);
};

Context.prototype.zoom = function (absfactor) {
    var relfactor = absfactor / this.scaleFactor,
        center = this.getCenterOn();
    center.x *= relfactor;
    center.y *= relfactor;
    this.scaleFactor = absfactor;
    this.centerOn(center.x, center.y);
};

Context.prototype.centerOn = function (x, y) {
    var width = this.canvas.width,
        height = this.canvas.height;

    this.xOffset = x - width / 2;
    this.yOffset = y - height / 2;
};

Context.prototype.getCenterOn = function () {
    var width = this.canvas.width,
        height = this.canvas.height;
    return {
        x: this.xOffset + width / 2,
        y: this.yOffset + height / 2
    };
};

Context.prototype.applySpeed = function () {
    this.xOffset += this.offsetSpeed.x;
    this.yOffset += this.offsetSpeed.y;
    return this.getCenterPos();
};

Context.prototype.setSpeedX = function (speed) {
    this.offsetSpeed.x = speed;
};

Context.prototype.setSpeedY = function (speed) {
    this.offsetSpeed.y = speed;
};

Context.prototype.drawAbsolute = function (drawable) {
    drawable.draw(this.context);
};

Context.prototype.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Context.prototype.draw = function (drawables) {
    var i = null;

    this.context.save();
    this.context.translate(-this.xOffset - this.tmpxOffset, -this.yOffset - this.tmpyOffset);
    this.context.scale(this.scaleFactor, this.scaleFactor);
    for (i = 0; i < drawables.length; i += 1) {
        this.drawAbsolute(drawables[i]);
    }
    this.context.restore();
};

Context.prototype.offsetTemporary = function (x, y) {
    this.tmpxOffset = x;
    this.tmpyOffset = y;
};

Context.prototype.getTempOffset = function () {
    return {
        x: this.tmpxOffset,
        y: this.tmpyOffset
    };
};

Context.prototype.getOffset = function () {
    return {
        x: this.xOffset,
        y: this.yOffset
    };
};

Context.prototype.addOffset = function (dx, dy) {
    this.offsetTemporary(0, 0);
    this.xOffset += dx;
    this.yOffset += dy;
};

Context.prototype.left = function () {
    var invscl = 1 / this.scaleFactor;
    return invscl * this.xOffset;
};

Context.prototype.width = function () {
    var invscl = 1 / this.scaleFactor;
    return invscl * this.canvas.width;
};

Context.prototype.low = function () {
    var invscl = 1 / this.scaleFactor;
    return invscl * (this.yOffset + this.canvas.height);
};

Context.prototype.high = function () {
    var invscl = 1 / this.scaleFactor;
    return invscl * this.yOffset;
};

Context.prototype.onResize = function () {
    var center = this.getCenterOn();
    this.canvas.width = document.documentElement.clientWidth;
    this.canvas.height = document.documentElement.clientHeight;
    this.centerOn(center.x, center.y);
    this.cacheGradient();
};

Context.prototype.cacheGradient = function () {
    var canvas = document.createElement('canvas'),
        context = null,
        gradient = null,
        startRad = 5,
        endRad = 300;

    context = canvas.getContext('2d');

    canvas.width = this.canvas.width;
    canvas.height = this.canvas.height;

    gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, startRad, canvas.width / 2, canvas.height / 2, endRad);
    gradient.addColorStop(0, new Colors().getByName('bgPeriphery'));
    gradient.addColorStop(1, new Colors().getByName('bgCenter'));

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);
    this.blueGradient = canvas;
};

Context.prototype.renderBG = function () {
    var context = this.context;
    context.drawImage(this.blueGradient, 0, 0);
};

Context.prototype.flipDevMode = function () {
    this.devMode = !this.devMode;
};

Context.prototype.getCenterPos = function () {
    var invscl = 1 / this.scaleFactor;
    return {
        x: invscl * (this.xOffset + this.canvas.width / 2),
        y: invscl * (this.yOffset + this.canvas.height / 2)
    };
};

Context.prototype.drawDevMode = function () {
    var ctx = this.context,
        mouse = this.mouse,
        invscl = 1 / this.scaleFactor;
    if (this.devMode) {
        ctx.fillStyle = new Colors().getByName('devMode');
        ctx.textAlign = "left";
        ctx.font = '30px Calibri';
        ctx.fillText('x: ' + (invscl * (this.xOffset + this.canvas.width / 2)).toFixed(0) +
            ' y: ' + (invscl * (this.yOffset + this.canvas.height / 2)).toFixed(0) +
            ' mouse: (' + mouse.x.toFixed(0) + ', ' + mouse.y.toFixed(0) + ')' +
            ' mt: (' + (invscl * (this.xOffset + mouse.x)).toFixed(0) +
            ', ' + (invscl * (this.yOffset + mouse.y)).toFixed(0) + ')', 0, this.canvas.height);
    }
};

Context.prototype.scaledMousePos = function (evt) {
    var invscl = 1 / this.scaleFactor;
    if (evt) {
        this.mousePos(evt);
    }
    return {
        x: invscl * (this.xOffset + this.mouse.x),
        y: invscl * (this.yOffset + this.mouse.y)
    };
};

Context.prototype.mousePos = function (evt) {
    var rect = this.canvas.getBoundingClientRect();
    if (evt) {
        this.mouse = {
            x: (evt.clientX - rect.left) * (this.canvas.width / rect.width),
            y: (evt.clientY - rect.top) * (this.canvas.height / rect.height)
        };
    }
    return this.mouse;
};
