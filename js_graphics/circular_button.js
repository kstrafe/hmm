var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var btnHov = new Audio("Audio/button_hov.mp3"); // buffers automatically when created


canvasHeight = 720;
canvasWidth = 1280;

function renderButton(x, y, r, text, highlighted) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	//var p = ctx.getImageData(x, y, 1, 1).data; 
  //var hex = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
	//ctx.fillStyle = hex;
	//ctx.fill();
	// ctx.lineWidth = 3;
	
  if (highlighted) {
    ctx.lineWidth = 4;
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#6ED80D';
    ctx.strokeStyle = '#69B00C';
  } else {
    ctx.shadowBlur = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#69B00C';
  }
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

function renderCanvas(circles) {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  gradient = ctx.createRadialGradient(canvasWidth/2, canvasHeight/2, 5, canvasWidth/2, canvasHeight/2, 300);
  gradient.addColorStop(0, '#000028');
  gradient.addColorStop(1, '#080808');
  ctx.fillStyle = gradient;
  ctx.fillRect(0,0,canvasWidth, canvasHeight);
  
  //renderTestLine();
  drawLine(circles[0], circles[1])
  drawLine(circles[0], circles[2])

  for (var i=0; i < circles.length; i++) {
    renderButton(circles[i].x, circles[i].y, circles[i].r, circles[i].text, circles[i].hl);
  }
}


function renderTestLine() {
  ctx.beginPath();
  ctx.moveTo(canvasWidth/2, canvasHeight/2);
  ctx.quadraticCurveTo(canvasHeight/2 + 50,canvasHeight/2 + 50,canvasWidth/2 + 300,canvasHeight/2+ 200);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#6EB80D';
  ctx.stroke();
}

function drawLine(c1, c2) {
  dx = c2.x-c1.x
  dy = c2.y-c1.y
  
  a = Math.atan2(dy, dx);

  x0 = c1.x + c1.r*Math.cos(a + 0.5) + 5*Math.sign(dx);
  y0 = c1.y + c1.r*Math.sin(a + 0.5) + 5*Math.sign(dy);

  x1 = c1.x + 2*c1.r*Math.cos(a + 0.5);
  y1 = c1.y + 2*c1.r*Math.sin(a + 0.5);

  a = a + Math.PI;

  x2 = c2.x + 2*c2.r*Math.cos(a - 0.5);
  y2 = c2.y + 2*c2.r*Math.sin(a - 0.5);

  x3 = c2.x + c2.r*Math.cos(a - 0.5) - 5*Math.sign(dx);
  y3 = c2.y + c2.r*Math.sin(a - 0.5) - 5*Math.sign(dy);

  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.bezierCurveTo(x1,y1,x2,y2,x3,y3);
  ctx.lineWidth = 2;
  ctx.shadowBlur = 2;
  ctx.strokeStyle = '#4E8800';
  ctx.lineCap = 'round';
  ctx.stroke();
}

var circle1 = {x:canvasWidth/2, y:canvasHeight/2 , r:50, text:'Natural numbers', hl:false}
var circle2 = {x:canvasWidth/2 + 300, y:canvasHeight/2 + 200, r:40, text:'Complex numbers', hl:false}
var circle3 = {x:canvasWidth/2 - 100, y:canvasHeight/2 - 200, r:45, text:'Irrational numbers', hl:false}

var circles = [circle1, circle2, circle3];

renderCanvas(circles)
//console.log();


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  //console.log(rect)
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

canvas.addEventListener('mousemove', function(evt) {
  //renderCanvas(circles)
  var mousePos = getMousePos(canvas, evt);
  for (var i=0; i < circles.length; i++) {
    rMouseCenter = (mousePos.x-circles[i].x)*(mousePos.x-circles[i].x) + (mousePos.y-circles[i].y)*(mousePos.y-circles[i].y);
    //console.log(rMouseCenter, Math.pow(circles[i].r,2))
    if (rMouseCenter < (circles[i].r)*(circles[i].r)) {
      if (circles[i].hl == false) {
        btnHov.play();
        circles[i].hl = true;
      }
      renderCanvas(circles);
    } else {
      circles[i].hl = false;
      renderCanvas(circles);    
    }
    
  }
}, false);



