"use strict";

function Colors() {
    // If you want to add colors, use another variable. These are from clrs.cc
    this.colors = [
        "#001F3F", "#0074D9", "#7FDBFF", "#39CCCC",
        "#3D9970", "#2ECC40", "#01FF70", "#FFDC00",
        "#FF851B", "#FF4136", "#85144B", "#F012BE",
        "#B10DC9", "#111111", "#AAAAAA", "#DDDDDD"
    ];

    this.themeColors = {
        bubbleGreen: "#4E8800",
        bubbleShadow: '#6ED80D',
        bubblePurple: "#B10DC9",
        bubbleFav: '#D9EFFF',
        bubbleRed: '#BD0B0B',
        textColor: "#DDDDDD",
        white: "#FFFFFF",
        factCont: "#000000",
        factBox: "#555555",
        factBoxLine: "#777777", //Math.ceil((factBox + factBoxShad) / 3)
        factBoxShad: "#FFFFFF",
        scrollBar: "#DDDDDD",
        scrollBarShade: "#FFFFFF",
        devMode: "#FF0000",
        bgCenter: "#080808",
        bgPeriphery: "#000028"
    };

    this.hlColors = {
        bubbleGreen: "#69B00C",
        bubblePurple: '#D300F2',
        bubbleShadow: '#6ED80D',
        bubbleFav: '#A7D8FC',
        bubbleRed: '#FC1919',
    };
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

Colors.prototype.getByName = function (name) {
    return this.themeColors[name];
};
Colors.prototype.getHLByName = function (name) {
    return this.hlColors[name];
};
