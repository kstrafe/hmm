/*global Audio*/

"use strict";

function Sounds() {
    this.backgroundSong = new Audio("http://music.stravers.net/");
    this.button_hover = new Audio("Audio/button_hov2.mp3");
    this.button_hover.volume = 0.3;
    this.muteSfx = false;
    this.state = "ALL";
    this.yPos = 0;

}

Sounds.prototype.hover = function () {
    if (!this.mute) {
        this.button_hover.play();
    }
};

Sounds.prototype.playBackgroundMusic = function () {
    this.backgroundSong.play();
};

Sounds.prototype.flipSfxMute = function () {
    this.muteSfx = !this.muteSfx;
};

Sounds.prototype.getSfxMute = function () {
    return this.muteSfx;
};

Sounds.prototype.flipBackgroundMute = function () {
    this.backgroundSong.muted = !this.backgroundSong.muted;
};

Sounds.prototype.muteAll = function () {
    this.muteSfx = true;
    this.backgroundSong.muted = true;
    this.state = "NONE";
    this.show();
};

Sounds.prototype.unmuteAll = function () {
    this.muteSfx = false;
    this.backgroundSong.muted = false;
    this.state = "ALL";
    this.show();
};

Sounds.prototype.changeState = function (newState) {
    this.state = newState;
};

Sounds.prototype.isMuted = function () {
    return this.state === "NONE";
};

Sounds.prototype.show = function () {
    this.yPos = 30;
};

Sounds.prototype.moveUp = function () {
    if (this.yPos > 0) {
        this.yPos -= 1;
    }
};

Sounds.prototype.draw = function (context) {
    context.save();
    context.fillStyle = '#FFFFFF';
    context.font = '20px Calibri';
    context.fillText(this.state, 40, this.yPos);
    this.moveUp();
    context.restore();
};