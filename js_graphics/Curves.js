/*global Curve*/

"use strict";

function Curves() {
    this.curves = [];
    this.connected = {};
}

Curves.prototype.append = function (curve, from, to) {
    this.curves.push(curve);

    if (this.connected[from] === undefined) {
        this.connected[from] = {};
    }
    if (this.connected[from][to] !== undefined) {
        console.log("Curve already linked! (from->to)");
    }
    if (this.connected[to] === undefined) {
        this.connected[to] = {};
    }
    if (this.connected[to][from] !== undefined) {
        console.log("Curve already linked! (to->from)");
    }

    this.connected[from][to] = curve;
    this.connected[to][from] = curve;
};

Curves.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.curves.length; i += 1) {
        this.curves[i].draw(context);
    }
};
