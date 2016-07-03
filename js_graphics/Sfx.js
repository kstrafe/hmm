/*global Audio*/
"use strict";

function Sfx() {
    this.button_hover = new Audio("Audio/button_hov2.mp3");
    this.button_hover.volume = 0.3;
    this.mute = false;
}

Sfx.prototype.hover = function () {
    if (!this.mute) {
        this.button_hover.play();
    }
};

Sfx.prototype.flipMute = function () {
    this.mute = !this.mute;
};
