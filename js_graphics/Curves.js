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

    if (this.connected[from] === undefined) {
        this.connected[from] = {};
    }
    if (this.connected[from][to] !== undefined) {
        console.log("Curve already linked! (from->to)");
        this.curves.splice(this.curves.indexOf(this.connected[from][to]), 1);
        if (this.connected[to] !== undefined) {
            delete this.connected[to][from];
        }
        delete this.connected[from][to];
        return;
    }
    if (this.connected[to] === undefined) {
        this.connected[to] = {};
    }
    if (this.connected[to][from] !== undefined) {
        console.log("Curve already linked! (to->from)");
        this.curves.splice(this.curves.indexOf(this.connected[to][from]), 1);
        delete this.connected[to][from];
        if (this.connected[from] !== undefined) {
            delete this.connected[from][to];
        }
        return;
    }
    if (this.rawfrom[from] === undefined) {
        this.rawfrom[from] = [];
    }

    this.curves.push(curve);
    this.connected[from][to] = curve;
    this.connected[to][from] = curve;
    this.rawfrom[from].push(to);
};

Curves.prototype.getForwards = function (from) {
    if (this.rawfrom[from] !== undefined) {
        return this.rawfrom[from];
    }
    return [];
};

Curves.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.curves.length; i += 1) {
        this.curves[i].draw(context);
    }
};
