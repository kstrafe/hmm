var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var btnHov = new Audio("Audio/button_hov.mp3"); // buffers automatically when created

var canvasTopLeft = {x:0, y:0};

var canvasTopLeftTemp = canvasTopLeft;

var circles;

init();



function renderButton(context, x, y, r, text, highlighted) {
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	
  if (highlighted) {
    context.lineWidth = 4;
    context.shadowBlur = 15;
    context.shadowColor = '#6ED80D';
    context.strokeStyle = '#69B00C';
  } else {
    context.shadowBlur = 0;
    context.lineWidth = 3;
    context.strokeStyle = '#69B00C';
  }
	context.stroke();

	wrapText(context, text, x, y, r, highlighted)
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
  context.fillStyle = '#DDDDDD';
  context.textAlign="center";
  
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
  context.font = fontSize + "px Calibri";

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

function renderCanvas(xOffset, yOffset, circles) {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 5, canvas.width/2, canvas.height/2, 300);
  gradient.addColorStop(0, '#000028');
  gradient.addColorStop(1, '#080808');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  //renderTestLine();
  drawLine(ctx, circles[0], circles[1])
  //drawLine(circles[0], circles[2])

  for (var i=0; i < circles.length; i++) {
    renderButton(ctx, circles[i].x - xOffset, circles[i].y - yOffset, circles[i].r, circles[i].text, circles[i].hl);
  }
}


function renderTestLine() {
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, canvas.height/2);
  ctx.quadraticCurveTo(canvas.height/2 + 50,canvas.height/2 + 50,canvas.width/2 + 300,canvas.height/2+ 200);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#6EB80D';
  ctx.stroke();
}

function drawLine(context, c1, c2) {
  var dx = c2.x-c1.x
  var dy = c2.y-c1.y
  
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

  context.beginPath();
  context.moveTo(x0, y0);
  context.bezierCurveTo(x1,y1,x2,y2,x3,y3);
  context.lineWidth = 2;
  context.shadowBlur = 2;
  context.strokeStyle = '#4E8800';
  context.lineCap = 'round';
  context.stroke();
}


function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  //console.log(rect)
  return {
    x: (evt.clientX - rect.left)*(canvas.width/rect.width),
    y: (evt.clientY - rect.top)*(canvas.height/rect.height)
  };
}


function mouseHoverListener(evt) {
  //
  var mousePos = getMousePos(canvas, evt);
  for (var i=0; i < circles.length; i++) {
    rMouseCenter = (mousePos.x-circles[i].x)*(mousePos.x-circles[i].x) + (mousePos.y-circles[i].y)*(mousePos.y-circles[i].y);
    //console.log(rMouseCenter, Math.pow(circles[i].r,2))
    if (rMouseCenter < (circles[i].r)*(circles[i].r)) {
      if (circles[i].hl == false) {
        btnHov.play();
        circles[i].hl = true;
      }
    } else {
      circles[i].hl = false;  
    }
    renderCanvas(canvasTopLeft.x, canvasTopLeft.y, circles)
    
  }
}

function mouseDownListener(evt) {
  canvas.removeEventListener('mousemove', mouseHoverListener , false);
  window.addEventListener("mouseup", mouseUpListener, false);

  mouseOnClick = getMousePos(canvas, evt);

  //Check whether on circle or no

  //if not on circle:
  canvas.addEventListener('mousemove', mouseMoveListener , false);

  //end not on circle
}

function mouseMoveListener(evt) {
  var mousePos = getMousePos(canvas, evt);
  var dx = mouseOnClick.x - mousePos.x;
  var dy = mouseOnClick.y - mousePos.y;

  renderCanvas(canvasTopLeft.x + dx, canvasTopLeft.y + dy,  circles)
}

function mouseUpListener(evt) {
  canvas.removeEventListener('mousemove', mouseMoveListener , false);
  window.removeEventListener("mouseup", mouseUpListener, false);
  canvas.addEventListener('mousemove', mouseHoverListener , false);
 
  var mouseOnUp = getMousePos(canvas, evt);
  canvasTopLeft.x += mouseOnClick.x - mouseOnUp.x;
  canvasTopLeft.y += mouseOnClick.y - mouseOnUp.y;

  renderCanvas(canvasTopLeft.x, canvasTopLeft.y, circles)

}

function init() {
  var oneonetwo = {x:canvas.width/2, y:canvas.height/2 , r:100, text:'1 + 1 = 2', hl:false}
  var aksiom = {x:canvas.width/2 + 600, y:canvas.height/2 - 600 , r:60, text:'Axiom', hl:false}
  var circle1 = {x:canvas.width/2, y:canvas.height/2 , r:50, text:'Natural numbers', hl:false}
  var circle2 = {x:canvas.width/2 + 300, y:canvas.height/2 + 200, r:40, text:'Complex numbers', hl:false}
  var circle3 = {x:canvas.width/2 - 100, y:canvas.height/2 - 200, r:45, text:'Irrational numbers', hl:false}

  circles = [circle1, circle2, circle3];
  //var circles = [oneonetwo, aksiom];

  renderCanvas(canvasTopLeft.x, canvasTopLeft.y, circles)
  canvas.addEventListener('mousemove', mouseHoverListener , false);
  canvas.addEventListener("mousedown", mouseDownListener, false);
}

