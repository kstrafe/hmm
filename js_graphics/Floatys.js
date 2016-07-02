/*global Colors*/
/*global Floaty*/
"use strict";

function Floatys() {
    this.floatys = [];
    this.max = 70;
    this.current = 50;
    this.max_floaty = 200;
    this.radii_start = 3;
    this.radii_diff = 47;
}

Floatys.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.floatys.length; i += 1) {
        this.floatys[i].draw(context);
    }
};

Floatys.prototype.update = function (low, high, left, width) {
    var i = null,
        height = null,
        extra = 2000,
        floaty = null,
        right = left + width,
        bottom = low,
        toppom = high,
        toppom_height = null,
        bottom_height = null,
        radius = null;

    if (high > low) {
        console.log("Incorrect low/high given. 'high' must be less than 'low'. 'high' represents the top y coordinate, 'low' the bottom coordinate of the screen.");
    }

    high -= extra;
    low += extra;
    left -= extra;
    right += extra;
    width = right - left;
    bottom_height = low - bottom;
    toppom_height = toppom - high;

    for (i = 0; i < this.floatys.length; i += 1) {
        height = this.floatys[i].height();
        if (height < high - extra || height > low + extra) {
            this.floatys.splice(i, 1);
        }
    }

    radius = this.radii_start + Math.random() * this.radii_diff;

    if (this.current >= this.max) {
        if (this.floatys.length < this.max_floaty) {
            if (Math.random() >= 0.5) {
                floaty = new Floaty(left + Math.random() * width, low - Math.random() * bottom_height, radius);
            } else {
                floaty = new Floaty(left + Math.random() * width, high + Math.random() * toppom_height, radius);
            }
            floaty.setColor((new Colors()).random());
            this.floatys.push(floaty);

        }
        this.current = 0;
    } else {
        this.current += 1;
    }

    for (i = 0; i < this.floatys.length; i += 1) {
        this.floatys[i].move();
    }

};
