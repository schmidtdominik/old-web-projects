var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext("2d");

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

x2 = 0
y2 = 0

function loop() {
	noise.seed(7841658746)

	var yPos2 = y2 + 4*noise.simplex2(x2/50, y2/50);
	var xPos2 = x2 + 4*noise.simplex2(x2/50, y2/50);

	var yPos2_last = yPos2;
	var xPos2_last = xPos2;

	for (var i = 0; i < 1000; i++) { //400
		ctx2.beginPath();
		ctx2.moveTo(round(xPos2_last, 5), round(yPos2_last, 5));
		ctx2.lineTo(round(xPos2, 5), round(yPos2, 5));
		ctx2.stroke();

		xPos2_last = xPos2;
		yPos2_last = yPos2;
		yPos2 = yPos2 + 4*noise.simplex2(xPos2 / 130, yPos2 / 130);
		xPos2 = xPos2 + 4*noise.simplex3((xPos2 + yPos2) / 130, yPos2 / 130, 5);
	}

	[x2, y2] = iterate(x2, y2, canvas2.width, canvas2.height, 9)
	if (x2 == undefined || y2 == undefined) {
		clearInterval(interval)
	}
}

ctx2.fillStyle = 'white';
ctx2.fillRect(0, 0, canvas2.width, canvas2.height);

ctx2.strokeStyle = 'rgba(0, 0, 0, 0.1)';

function hyperloop() {
	for (var w = 0; w < 100; w++) {
		loop();
	}
}

var interval = setInterval(hyperloop, 0)
