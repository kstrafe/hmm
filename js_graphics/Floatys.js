/*global Colors*/
/*global Floaty*/
"use strict";

function Floatys() {
    this.floatys = [];
    this.max = 30;
    this.current = 0;
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
        extra = 1000,
        floaty = null;

    if (high > low) {
        console.log("Incorrect low/high given. 'high' must be less than 'low'. 'high' represents the top y coordinate, 'low' the bottom coordinate of the screen.");
    }

    for (i = 0; i < this.floatys.length; i += 1) {
        height = this.floatys[i].height();
        if (height < high - extra) {
            this.floatys.splice(i, i);
        }
    }

    if (this.current === this.max) {
        if (this.floatys.length < 100) {
            floaty = new Floaty(left + Math.random() * width, low, 10);
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
