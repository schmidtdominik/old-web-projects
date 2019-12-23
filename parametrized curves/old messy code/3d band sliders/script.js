var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth-10;
canvas.height = document.body.clientHeight-10-50;

ctx.fillStyle = "#FFFFFF"
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = "#000000"


ctx.translate(canvas.width/2, canvas.height/2)

alpha = 0
a = 300
b = 300




// Parameter k:
// gerade Zahlen --> Form symmetrisch (entlang y-Achse)
// ungerade Zahlen --> Form asymmetrisch (entlang y-Achse)
// Größe der Zahl --> Anzahl der Biegungen / Komplexität der Form

var k = 6

function loop() {
	if (document.getElementById('rangek').value*1 != k) {
		ctx.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2)
		k = document.getElementById('rangek').value*1
		document.getElementById('k').innerHTML = k
	}
	if (document.getElementById('rangea').value*1 != a) {
		ctx.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2)
		a = document.getElementById('rangea').value*1
		document.getElementById('a').innerHTML = a
	}
	if (document.getElementById('rangeb').value*1 != b) {
		ctx.clearRect(-canvas.width, -canvas.height, canvas.width*2, canvas.height*2)
		b = document.getElementById('rangeb').value*1
		document.getElementById('b').innerHTML = b
	}
	for (var i = 0; i < 700; i++) {
		alpha += Math.PI*2/360/20;

		x = a*Math.cos(alpha)
		y = b*Math.sin(alpha)

		vectX = a*Math.cos(alpha+Math.PI*2/360/10)-x
		vectY = b*Math.sin(alpha+Math.PI*2/360/10)-y

		normX = vectY
		normY = -vectX

		ctx.fillRect(x+Math.cos(alpha*k)*normX*200, y+Math.sin(alpha*99.1)*normY*200, 1, 1)
	}
}

interval = setInterval(loop, 0)
