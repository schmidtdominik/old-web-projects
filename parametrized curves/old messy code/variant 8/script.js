var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth-10;
canvas.height = document.body.clientHeight-10;

ctx.fillStyle = "#FFFFFF"
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = "#000000"


ctx.translate(canvas.width/2, canvas.height/2)

alpha = 0
a = 300
b = 300

function loop() {
	for (var i = 0; i < 900; i++) {
		alpha += Math.PI*2/360/800;

		a += 0
		b += 0

		x = a*Math.cos(alpha)
		y = b*Math.sin(alpha)

		vectX = a*Math.cos(alpha+Math.PI*2/360/10)-x
		vectY = b*Math.sin(alpha+Math.PI*2/360/10)-y

		normX = vectY
		normY = -vectX

		ctx.fillRect(x+Math.cos(alpha*2346)*normX*200, y+Math.sin(alpha*236)*normY*200, 1, 1)
	}
}

interval = setInterval(loop, 0)