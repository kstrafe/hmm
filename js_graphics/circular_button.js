var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvasHeight = 720;
canvasWidth = 1280;

gradient = ctx.createRadialGradient(canvasWidth/2, canvasHeight/2, 5, canvasWidth/2, canvasHeight/2, 300);
gradient.addColorStop(0, '#000028');
gradient.addColorStop(1, '#080808');
ctx.fillStyle = gradient;
ctx.fillRect(0,0,canvasWidth, canvasHeight);

function renderButton(x, y, r, text) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	var p = ctx.getImageData(x, y, 1, 1).data; 
    var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	ctx.fillStyle = hex;
	ctx.fill();
	ctx.lineWidth = 3;
	ctx.strokeStyle = '#69B00C';
	ctx.shadowBlur = 10;
	ctx.shadowColor = '#6EB80D';
	ctx.stroke();

	ctx.font = "18px Calibri";
	ctx.fillStyle = '#FFFFFF';
	wrapText(ctx, text, x-r+2*ctx.lineWidth, y, 2*r, 15)
	//ctx.fillText(text, x-(text.length/2)*5, y);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
        var words = text.split(' ');
        var line = '';

        for(var n = 0; n < words.length; n++) {

          var testLine = line + words[n] + ' ';
          var metrics = context.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
          }
          else {
            line = testLine;
          }
        }
        context.fillText(line, x, y);
      }

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

ctx.beginPath();
ctx.moveTo(canvasWidth/2, canvasHeight/2);
ctx.quadraticCurveTo(canvasHeight/2 + 50,canvasHeight/2 + 50,canvasWidth/2 + 300,canvasHeight/2+ 200);
ctx.lineWidth = 2;
ctx.strokeStyle = '#6EB80D';
ctx.stroke();


renderButton(canvasWidth/2, canvasHeight/2, 50, 'Natural numbers');
renderButton(canvasWidth/2 + 300, canvasHeight/2+ 200, 40, 'Complex numbers');



