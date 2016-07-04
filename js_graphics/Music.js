/*global Audio*/

"use strict";

function Music() {
    //this.backgroundSong = new Audio('Music/Chronicles_of_Creation_Suite_No._2.mp3');
    this.backgroundSong = new Audio("http://music.stravers.net/");
}

Music.prototype.play = function () {
    this.backgroundSong.play();
};
