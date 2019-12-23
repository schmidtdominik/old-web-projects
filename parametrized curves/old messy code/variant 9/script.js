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
	for (var i = 0; i < 200; i++) {
		alpha += Math.PI*2/360/1000;

		a = Math.sin(b*Math.PI*2/8);
		b = Math.sin(a*Math.PI*2*10);

		x = 800*a*Math.cos(alpha)*Math.tan(alpha)
		y = 400*b*Math.sin(alpha)*Math.tan(alpha)

		ctx.fillRect(x, y, 1, 1)
	}
}

interval = setInterval(loop, 0)