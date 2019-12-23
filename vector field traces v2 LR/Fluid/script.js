var canvas1 = document.getElementById('canvas1');
var ctx1 = canvas1.getContext("2d");

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
}

ctx1.fillStyle = 'white';
ctx1.fillRect(0, 0, canvas1.width, canvas1.height);

ctx1.fillStyle = 'rgba(0, 0, 0, 0.01)';

function hyperloop() {
	for (var w = 0; w < 700; w++) {
		loop();
	}
}

var interval = setInterval(hyperloop, 0)
