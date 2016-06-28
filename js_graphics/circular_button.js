var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var btnHov = new Audio("Audio/button_hov.mp3"); // buffers automatically when created


canvasHeight = 720;
canvasWidth = 1280;

function renderButton(x, y, r, text, highlighted) {
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2 * Math.PI);
	
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

	wrapText(ctx, text, x, y, r, highlighted)
}

//function wrapText(context, text, x, y, maxWidth, lineHeight) {
function wrapText(context, text, x, y, r, hl) {
  if (hl) {
    context.shadowBlur = 2.5;
    context.shadowColor = '#FFFFFF';
  } else {
    context.shadowBlur = 0;
    context.shadowColor = '#6ED80D';
  }
  var AVG_CHAR_SIZE = 0.4586; // Calibri 1px, unit: [px/(ch 1px)]
  //var maxWidth = 0.9*2*r;
  ctx.fillStyle = '#DDDDDD';
  ctx.textAlign="center";
  
  var words = text.split(' ');

  if (words.length == 1) {
    var fontSize = (0.85*2*r)/(AVG_CHAR_SIZE*words[0].length);
    y = y + fontSize/3;
    
  } else if (words.length == 2) {
    var maxLen = Math.max(words[0].length, words[1].length)
    var fontSize = (0.75*2*r)/(AVG_CHAR_SIZE*maxLen);
    y = y - fontSize*0.1;

  } else if (words.length == 3) {
    var maxLen = Math.max(words[0].length, words[1].length, words[2].length)
    var fontSize = (0.6*2*r)/(AVG_CHAR_SIZE*maxLen);
    y = y - fontSize/2;

  } else {
    words = [text];
    var fontSize = (0.85*2*r)/(AVG_CHAR_SIZE*words[0].length);
    y = y + fontSize/3;
  }
  //totlen = avgCharSize*text.length*fontSize
  //console.log(fontSize)
  var lineHeight = fontSize;
  ctx.font = fontSize + "px Calibri";

  for(var n = 0; n < words.length; n++) {
      context.fillText(words[n], x, y);
      y += lineHeight/1.25;
    }
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
  //drawLine(circles[0], circles[2])

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

var oneonetwo = {x:canvasWidth/2, y:canvasHeight/2 , r:100, text:'1 + 1 = 2', hl:false}
var aksiom = {x:canvasWidth/2 + 600, y:canvasHeight/2 - 600 , r:60, text:'Axiom', hl:false}
var circle1 = {x:canvasWidth/2, y:canvasHeight/2 , r:50, text:'Natural numbers', hl:false}
var circle2 = {x:canvasWidth/2 + 300, y:canvasHeight/2 + 200, r:40, text:'Complex numbers', hl:false}
var circle3 = {x:canvasWidth/2 - 100, y:canvasHeight/2 - 200, r:45, text:'Irrational numbers', hl:false}

//var circles = [circle1, circle2, circle3];
var circles = [oneonetwo, aksiom];

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



