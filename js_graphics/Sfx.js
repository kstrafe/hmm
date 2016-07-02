/*global Audio*/
"use strict";

function Sfx() {
    this.button_hover = new Audio("Audio/button_hov2.mp3");
    this.button_hover.volume = 0.3;
}

Sfx.prototype.hover = function () {
    this.button_hover.play();
};
