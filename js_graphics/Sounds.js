/*global Audio*/
/*global Image*/

"use strict";

function Sounds() {
    this.backgroundSong = new Audio("http://music.stravers.net/");
    this.button_hover = new Audio("Audio/button_hov2.mp3");
    this.button_hover.volume = 0.3;
    this.muteSfx = false;
    this.transparancy = 1;

    this.sfx = new Image();
    this.sfx.src = "Textures/audio_icon_effects.PNG";
    this.all = new Image();
    this.all.src = "Textures/audio_icon_full.PNG";
    this.none = new Image();
    this.none.src = "Textures/audio_icon_soundless.PNG";
    this.bgm = new Image();
    this.bgm.src = "Textures/audio_icon_music.PNG";

    this.stateIndex = 0;
    this.stateNames = ["ALL", "SFX", "BGM", "NONE"];
    this.stateIcons = [this.all, this.sfx, this.bgm, this.none];

}

Sounds.prototype.hover = function () {
    if (!this.muteSfx) {
        this.button_hover.play();
    }
};

Sounds.prototype.playBGM  = function () {
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
    this.stateIndex = 3;
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
    this.stateIndex %= 4;

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
};

Sounds.prototype.isMuted = function () {
    return this.stateIndex === 3;
};

Sounds.prototype.show = function () {
    this.transparancy = 1;
};

Sounds.prototype.fadeOut = function () {
    if (this.transparancy > 0.15) {
        this.transparancy -= 0.025;
    }
};

Sounds.prototype.draw = function (context) {
    context.save();
    context.fillStyle = '#FFFFFF';
    context.font = '20px Calibri';

    context.drawImage(this.stateIcons[this.stateIndex], 8, 18, 30, 30);
    context.globalAlpha = this.transparancy;
    context.fillText(this.stateNames[this.stateIndex], 40, 40);
    this.fadeOut();
    context.restore();
};

Sounds.prototype.onClick = function (mousePos) {
    if (mousePos.x > 12 && mousePos.x < 70) {
        if (mousePos.y > 25 && mousePos.y < 45) {
            this.nextState();
        }
    }
};

Sounds.prototype.hoverButton = function (mousePos) {
    if (mousePos.x > 12 && mousePos.x < 70) {
        if (mousePos.y > 25 && mousePos.y < 45) {
            this.show();
        }
    }
};

