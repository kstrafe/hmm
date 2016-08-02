/*global Colors*/

"use strict";

function Cloud() {
    //this.index = index;
    this.xys = [14311,-28325, 13123,-28277, 12675, -29161, 13000, -30187, 13351, -30293, 15000, -30109, 15175, -29217, 15238, -29455, 14926,-28700, 14890, -28495, 14311,-28325]
    //this.name = name;
    //this.facts = facts;
    //this.highlighted = highlighted;
    this.colors = new Colors();
    this.master = false;
    this.favorite = false;
    this.colorName = "bubbleRed";
}

Cloud.prototype.draw = function (context, zoomIndex) {
	var n;

	if (zoomIndex == 0) {
		context.save();
		context.strokeStyle = this.colors.getHLByName(this.colorName);
		context.lineWidth = 20;
		context.fillStyle = this.colors.getByName(this.colorName);
		context.globalAlpha = 0.25;
		context.beginPath();
		context.moveTo(this.xys[0], this.xys[1]);

		for (n = 2; n < this.xys.length; n += 4) {
			context.quadraticCurveTo(this.xys[n], this.xys[n+1], this.xys[n+2], this.xys[n+3]);
		}
		context.closePath();
		context.fill();
		context.stroke();
		context.restore();
	}
	

};