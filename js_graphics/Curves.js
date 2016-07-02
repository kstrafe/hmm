/*global Curve*/

"use strict";

function Curves() {
    this.curves = [];
}

Curves.prototype.append = function (curve) {
    this.curves.push(curve);
};

Curves.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.curves.length; i += 1) {
        this.curves[i].draw(context);
    }
};