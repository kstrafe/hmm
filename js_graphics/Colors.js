"use strict";

function Colors() {
    // If you want to add colors, use another variable. These are from clrs.cc
    this.colors = [
        "#001F3F", "#0074D9", "#7FDBFF", "#39CCCC",
        "#3D9970", "#2ECC40", "#01FF70", "#FFDC00",
        "#FF851B", "#FF4136", "#85144B", "#F012BE",
        "#B10DC9", "#111111", "#AAAAAA", "#DDDDDD"
    ];
}

Colors.prototype.clrs = function (index) {
    return this.colors[index];
};

Colors.prototype.random = function () {
    var value = Math.random(),
        interval = 1 / this.colors.length,
        approx = Math.floor(value / interval);
    return this.colors[approx];
};
