/*global Curve*/

"use strict";

function Curves() {
    this.curves = [];
    this.connected = {};
    this.rawfrom = {};
}

Curves.prototype.reposition = function (from, bubbles) {
    var i = null,
        con = this.connected[from],
        to = null;
    from = bubbles.getNamed(from);

    for (i in con) {
        if (con.hasOwnProperty(i)) {
            to = bubbles.getNamed(i);
            con[i].recompute(from.getCurveStart(), to.getCurveStart());
        }
    }
};

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
    if (this.rawfrom[from] === undefined) {
        this.rawfrom[from] = [];
    }

    this.connected[from][to] = curve;
    this.connected[to][from] = curve;
    this.rawfrom[from].push(to);
};

Curves.prototype.getForwards = function (from) {
    return this.rawfrom[from];
};

Curves.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.curves.length; i += 1) {
        this.curves[i].draw(context);
    }
};
