/*global Colors*/
/*global Floaty*/
"use strict";

function Floatys() {
    this.floatys = [];
    this.max = 300;
    this.current = 200;
    this.max_floaty = 20;
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
        extra = 4000,
        floaty = null;

    if (high > low) {
        console.log("Incorrect low/high given. 'high' must be less than 'low'. 'high' represents the top y coordinate, 'low' the bottom coordinate of the screen.");
    }

    for (i = 0; i < this.floatys.length; i += 1) {
        height = this.floatys[i].height();
        if (height < high - extra) {
            this.floatys.splice(i, 1);
        }
    }

    if (this.current >= this.max) {
        if (this.floatys.length < this.max_floaty) {
            if (Math.random() >= 0.5) {
                floaty = new Floaty(left + Math.random() * width, low, 10);
            } else {
                floaty = new Floaty(left + Math.random() * width, high, 10);
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