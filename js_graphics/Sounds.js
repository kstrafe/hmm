/*global Audio*/
/*global Image*/

"use strict";

function Sounds() {
    this.backgroundSong = new Audio("http://music.stravers.net/");
    this.button_hover = new Audio("Audio/button_hov2.mp3");
    this.button_hover.volume = 0.3;
    this.mouseOn = false;
    this.muteSfx = false;
    this.transparency = 1;

    this.sfx = new Image();
    this.sfx.src = "Textures/audio_icon_effects.png";
    this.all = new Image();
    this.all.src = "Textures/audio_icon_full.png";
    this.none = new Image();
    this.none.src = "Textures/audio_icon_soundless.png";
    this.bgm = new Image();
    this.bgm.src = "Textures/audio_icon_music.png";

    this.stateIndex = 0;
    this.stateNames = ["ALL", "SFX", "BGM", "NONE"];
    this.stateIcons = [this.all, this.sfx, this.bgm, this.none];

    this.maxX = 70;
    this.minX = 12;
    this.maxY = 45;
    this.minY = 25;
}

Sounds.prototype.refreshBgm = function () {
    if (this.backgroundSong.ended) {
        this.backgroundSong.play();
    }
};

Sounds.prototype.hover = function () {
    if (!this.muteSfx) {
        this.button_hover.play();
    }
};

Sounds.prototype.playBGM = function () {
    this.backgroundSong.play();
};

Sounds.prototype.flipSfxMute = function () {
    this.muteSfx = !this.muteSfx;
};

Sounds.prototype.getSfxMute = function () {
    return this.muteSfx;
};

Sounds.prototype.flipBGMute = function () {
    this.backgroundSong.muted = !this.backgroundSong.muted;
};

Sounds.prototype.flipMute = function () {
    if (this.isMuted()) {
        this.unmuteAll();
    } else {
        this.muteAll();
    }
};

Sounds.prototype.muteAll = function () {
    this.muteSfx = true;
    this.backgroundSong.muted = true;
    this.stateIndex = this.stateNames.length - 1;
    this.show();
};

Sounds.prototype.unmuteAll = function () {
    this.muteSfx = false;
    this.backgroundSong.muted = false;
    this.stateIndex = 0;
    this.show();
};

Sounds.prototype.nextState = function () {
    this.stateIndex += 1;
    this.stateIndex %= this.stateNames.length;

    switch (this.stateIndex) {
    case 0:
        this.unmuteAll();
        break;
    case 1:
        this.muteSfx = false;
        this.backgroundSong.muted = true;
        break;
    case 2:
        this.muteSfx = true;
        this.backgroundSong.muted = false;
        break;
    case 3:
        this.muteAll();
        break;
    }
    this.show();
};

Sounds.prototype.isMuted = function () {
    return this.stateIndex === this.stateNames.length - 1;
};

Sounds.prototype.show = function () {
    this.transparency = 1;
};

Sounds.prototype.fadeOut = function () {
    var tranTresh = 0.15,
        tranFade = 0.025;
    if (this.mouseOn === false) {
        if (this.transparency > tranTresh) {
            this.transparency -= tranFade;
        }
    }
};

Sounds.prototype.draw = function (context) {
    var l = [8, 18, 30, 30, 40, 40];
    context.save();
    context.fillStyle = '#FFFFFF';
    context.font = '20px Calibri';

    context.drawImage(this.stateIcons[this.stateIndex], l[0], l[1], l[2], l[3]);
    context.globalAlpha = this.transparency;
    context.textAlign = "left";
    context.fillText(this.stateNames[this.stateIndex], l[4], l[5]);
    this.fadeOut();
    context.restore();
};

Sounds.prototype.onClick = function (mousePos) {
    if (mousePos.x > this.minX && mousePos.x < this.maxX) {
        if (mousePos.y > this.minY && mousePos.y < this.maxY) {
            this.nextState();
        }
    }
};

Sounds.prototype.hoverButton = function (mousePos) {
    if (mousePos.x > this.minX && mousePos.x < this.maxX) {
        if (mousePos.y > this.minY && mousePos.y < this.maxY) {
            this.mouseOn = true;
            this.show();
            return;
        }
    }
    this.mouseOn = false;
};
