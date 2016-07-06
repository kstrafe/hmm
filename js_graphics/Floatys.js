/*global Colors*/
/*global Floaty*/
"use strict";

function Floatys() {
    this.floatys = [];
    this.max = 0;
    this.current = 0;
    this.max_floaty = 200;
    this.radii_start = 3;
    this.radii_diff = 47;
    this.speed_start = 0.3;
    this.speed_diff = 0.3;
}

Floatys.prototype.draw = function (context) {
    var i = null;
    for (i = 0; i < this.floatys.length; i += 1) {
        this.floatys[i].draw(context);
    }
};

Floatys.prototype.update = function (low, high, left, width) {
    var i = null,
        x = null,
        y = null,
        extra = 8000,
        floaty = null,
        radius = null,
        speed = null,
        x_left = left,
        x_right = left + width,
        y_top = high,
        y_bottom = low;

    if (high > low) {
        console.log("Incorrect low/high given. 'high' must be less than 'low'. 'high' represents the top y coordinate, 'low' the bottom coordinate of the screen.");
    }

    for (i = 0; i < this.floatys.length; i += 1) {
        x = this.floatys[i].xPos();
        y = this.floatys[i].yPos();
        if (x < x_left - extra || x > (x_right + extra) || y > (y_bottom + extra) || y < (y_top - extra)) {
            this.floatys.splice(i, 1);
        }
    }

    radius = this.radii_start + Math.random() * this.radii_diff;
    speed = this.speed_start + Math.random() * this.speed_diff;

    if (this.current >= this.max) {
        if (this.floatys.length < this.max_floaty) {
            if (Math.random() >= 0.5) {
                floaty = new Floaty(x_left - extra + Math.random() * ((x_right + extra) - (x_left - extra)), y_bottom + Math.random() * extra, radius, speed);
            } else {
                floaty = new Floaty(x_left - extra + Math.random() * ((x_right + extra) - (x_left - extra)), y_top - Math.random() * extra, radius, speed);
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
