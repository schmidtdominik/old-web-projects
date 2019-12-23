var canvas1 = document.getElementById('canvas1');
var ctx1 = canvas1.getContext("2d");

ctx1.fillStyle = 'white';
ctx1.fillRect(0, 0, canvas1.width, canvas1.height)
ctx1.fillStyle = 'black';

const spotsize = 5;
const subStrokeSeparation = 3;
const subStrokeCount = 100;
const strokeOutlineWidth = 5;
const strokeLength = 15;
const spacing = 200;

function getColor() {
  if (Math.random() > 0.6) {
    return '#FF6F59'
  } else if (Math.random() > 0.2) {
    return '#43AA8B'
  } else if (true) {
    return '#35A7FF'
  }
}

function stroke(x, y) {
  xOrigin = x; yOrigin = y;
  color = getColor()

  ctx1.fillStyle = '#254441';
  for (var v = 0; v < subStrokeCount; v++) {
    x = xOrigin
    y = yOrigin + v*subStrokeSeparation
    for (var i = 0; i < strokeLength; i++) {
      x += noise.simplex3(x/1000, y/1000, -1) * 514.285714/100
      y += noise.simplex3(x/1000, y/1000, 98) * 514.285714/100

      ctx1.beginPath();
      ctx1.arc(x, y, spotsize+strokeOutlineWidth, 0, Math.PI*2, false);
      ctx1.fill();

    }
  }

  ctx1.fillStyle = color;
  for (var v = 0; v < subStrokeCount; v++) {
    x = xOrigin
    y = yOrigin + v*subStrokeSeparation
    for (var i = 0; i < strokeLength; i++) {
      x += noise.simplex3(x/1000, y/1000, -1) * 514.285714/100
      y += noise.simplex3(x/1000, y/1000, 98) * 514.285714/100

      ctx1.beginPath();
      ctx1.arc(x, y, spotsize, 0, Math.PI*2, false);
      ctx1.fill();
    }
  }
}

var y_t = 0
function loop() {
  for (var x = 0; x < canvas1.width; x += spacing) {
    stroke(x, y_t)
  }
  y_t += spacing;
  if (y_t > canvas1.height) {
    clearInterval(interval)
  }
}

interval = setInterval(loop, 0)
