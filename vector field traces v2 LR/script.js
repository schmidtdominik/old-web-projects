var canvas1 = document.getElementById('canvas1');
var ctx1 = canvas1.getContext("2d");
var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext("2d");
var canvas3 = document.getElementById('canvas3');
var ctx3 = canvas3.getContext("2d");


function round(n, dist) {
	return Math.round(n/dist)*dist
}

function iterate(x, y, yMax, xMax, spacing) {
	x += spacing;
	if (x > xMax) {
		x = 0;
		y += spacing;
	}
	if (y > yMax) {
		x = undefined;
		y = undefined;
	}

	return [x, y]
}

x1 = 0
y1 = 0

x2 = 0
y2 = 0

function loop() {
	noise.seed(7841658746)

	var yPos1 = y1 + 4*noise.simplex2(x1/50, y1/50);
	var xPos1 = x1 + 4*noise.simplex2(x1/50, y1/50);

	for (var i = 0; i < 50; i++) { //50
		ctx1.fillRect(xPos1, yPos1, 1, 1);
		yPos1 = yPos1 + 4*noise.simplex2(xPos1 / 130, yPos1 / 130);
		xPos1 = xPos1 + 4*noise.simplex3((xPos1 + yPos1) / 130, yPos1 / 130, 5);
	}

	[x1, y1] = iterate(x1, y1, canvas1.width, canvas1.height, 1)
	if (x1 == undefined || y1 == undefined) {
		clearInterval(interval)
	}

	if (y2 > y1) {
		return;
	}

	noise.seed(7841658746)

	var yPos2 = y2 + 4*noise.simplex2(x2/50, y2/50);
	var xPos2 = x2 + 4*noise.simplex2(x2/50, y2/50);

	var yPos2_last = yPos2;
	var xPos2_last = xPos2;

	for (var i = 0; i < 800; i++) { //400
		if (i % 2 == 0) {
			ctx2.beginPath();
			ctx2.moveTo(round(xPos2_last, 5), round(yPos2_last, 5));
			ctx2.lineTo(round(xPos2, 5), round(yPos2, 5));
			ctx2.stroke();
		}

		if (Math.abs(round(xPos2_last, 5)-round(xPos2, 5)) > 0 && Math.abs(round(yPos2_last, 5)-round(yPos2, 5)) > 0) {
			ctx3.beginPath();
			ctx3.moveTo(round(xPos2_last, 5), round(yPos2_last, 5));
			ctx3.lineTo(round(xPos2, 5), round(yPos2, 5));
			ctx3.stroke();
		}

		xPos2_last = xPos2;
		yPos2_last = yPos2;
		yPos2 = yPos2 + 4*noise.simplex2(xPos2 / 130, yPos2 / 130);
		xPos2 = xPos2 + 4*noise.simplex3((xPos2 + yPos2) / 130, yPos2 / 130, 6);
	}

	[x2, y2] = iterate(x2, y2, canvas2.width, canvas2.height, 7)
	if (x2 == undefined || y2 == undefined) {
		clearInterval(interval)
	}
}

ctx1.fillStyle = 'white';
ctx2.fillStyle = 'white';
ctx1.fillRect(0, 0, canvas1.width, canvas1.height);
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

ctx1.fillStyle = 'rgba(0, 0, 0, 0.01)';
ctx2.strokeStyle = 'rgba(0, 0, 0, 0.1)';
ctx3.strokeStyle = 'rgba(0, 0, 0, 0.1)';

function hyperloop() {
	for (var w = 0; w < 400; w++) {
		loop();
	}
}

var interval = setInterval(hyperloop, 0)
