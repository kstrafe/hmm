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
    var retEarly = false,
        index = 0;

    if (from === to) {
        return;
    }
    if (this.connected[from] === undefined) {
        this.connected[from] = {};
    }
    if (this.connected[from][to] !== undefined) {
        if (this.rawfrom[from] !== undefined) {
            index = this.rawfrom[from].indexOf(to);
            console.log("fromto index: ", index);
            if (index !== -1) {
                this.rawfrom[from].splice(index, 1);
                console.log("removed rawfrom from-to: curves[" + index + "]");
            }
        }
        index = this.curves.indexOf(this.connected[from][to]);
        if (index !== -1) {
            this.curves.splice(index, 1);
            console.log("removed curve from-to: curves[" + index + "]");
        }
        delete this.connected[from][to];
        retEarly = true;
    }
    if (this.connected[to] === undefined) {
        this.connected[to] = {};
    }
    if (this.connected[to][from] !== undefined) {
        if (this.rawfrom[to] !== undefined) {
            index = this.rawfrom[to].indexOf(from);
            console.log("fromto index: ", index);
            if (index !== -1) {
                this.rawfrom[to].splice(index, 1);
                console.log("removed rawfrom from-to: curves[" + index + "]");
            }
        }
        index = this.curves.indexOf(this.connected[to][from]);
        if (index !== -1) {
            this.curves.splice(index, 1);
            console.log("removed curve to-from: curves[" + index + "]");
        }
        delete this.connected[to][from];
        retEarly = true;
    }

    if (retEarly) {
        console.log("Ret early");
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
