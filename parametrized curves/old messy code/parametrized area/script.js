var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");

canvas.width = document.body.clientWidth-10;
canvas.height = document.body.clientHeight-10;

ctx.fillStyle = "#FFFFFF"
ctx.fillRect(0, 0, canvas.width, canvas.height)
ctx.fillStyle = "#000000"

ctx.translate(canvas.width/2, canvas.height/2)

alpha = 0
a = 100
b = 100

function loop() {
	for (var i = 0; i < 300; i++) {
		alpha += Math.PI*2/360/2000;

		a = Math.sin(b*Math.PI*2);
		b = Math.sin(a*Math.PI*2);

		x = 800*a*Math.cos(alpha)
		y = 400*b*Math.sin(alpha)

		ctx.fillRect(x, y, 1, 1)
	}
}

interval = setInterval(loop, 0)