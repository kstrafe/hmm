"use strict";

function Clouds() {
    this.clouds = [];
}

Clouds.prototype.add = function (cloud) {
    this.clouds.push(cloud);
};

Clouds.prototype.draw = function (context, zoomIndex) {
    var i = null;

    for (i = 0; i < this.clouds.length; i += 1) {
        this.clouds[i].draw(context, zoomIndex);
    }
};