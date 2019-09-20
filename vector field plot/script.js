var canvas = document.getElementById('maincanvas');
var ctx = canvas.getContext("2d");

let vectorField = false
let flowLines = true
let particleSim = true

let vectorScale = 0.10
let functionScale = 450

let vectorSpacing = 70
let flowLineSpacing = 11

let flowLineLength = 70
let flowLineRes = 0.03

let particleSize = 2;

let f = f1;

ctx.translate(canvas.width/2, canvas.height/2)

function setShowVectors(v) {
	vectorField = v;
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
	ctx.fillStyle = "white";
	ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
	ctx.beginPath();
	render();
}

function setFunction(v) {
	fs = [f1, f2, f3, f4, f5, f6, f7, f8, f9];
	f = fs[v-1];
	particles = []
	ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
	ctx.fillStyle = "white";
	ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
	ctx.beginPath();
	render();
}


function arrow(from, v) {
	var to = [from[0]+v[0], from[1]+v[1]]
    var headlen = 10;
    var angle = Math.atan2(to[1]-from[1], to[0]-from[0]);
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(Math.round(to[0]), Math.round(to[1]));
    ctx.lineTo(Math.round(to[0]-headlen*Math.cos(angle-Math.PI/6)), Math.round(to[1]-headlen*Math.sin(angle-Math.PI/6)));
    ctx.moveTo(to[0], to[1]);
    ctx.lineTo(Math.round(to[0]-headlen*Math.cos(angle+Math.PI/6)),Math.round(to[1]-headlen*Math.sin(angle+Math.PI/6)));
		ctx.closePath();
		ctx.stroke()
    //arrow_(from, v)
}
/*function arrow_(from, v) {
	l = Math.sqrt(Math.pow(v[0], 2)+Math.pow(v[1], 2))
	var to = [from[0]+v[0]-(v[0]/l)*3, from[1]+v[1]-(v[1]/l)*3]
    var headlen = 10;
    var angle = Math.atan2(to[1]-from[1], to[0]-from[0]);
    ctx.moveTo(from[0], from[1]);
    ctx.lineTo(to[0], to[1]);
    ctx.lineTo(to[0]-headlen*Math.cos(angle-Math.PI/6),to[1]-headlen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(to[0], to[1]);
    ctx.lineTo(to[0]-headlen*Math.cos(angle+Math.PI/6),to[1]-headlen*Math.sin(angle+Math.PI/6));
    ctx.stroke()
}*/

function f1(x, y) {
	x /= functionScale
	y /= functionScale
	v = [-x-y, -y+x]
	return [v[0]*functionScale, v[1]*functionScale]
}

function f2(x, y) {
	return [Math.sin(x/80)*200, Math.sin(x*y/80/100)*200];
}

function f3(x, y) {
	x /= functionScale
	y /= functionScale
	v = [-y, x-y]
	return [v[0]*functionScale, v[1]*functionScale]
}

function f4(x, y) {
	return [Math.sin(x/80)*200, Math.sin(x*y/80/10)*200];
}

function f5(x, y) {
	x /= functionScale
	y /= functionScale
	v = [y, x-y]
	return [v[0]*functionScale, v[1]*functionScale]
}


function clip(v, min, max) {
	return Math.min(Math.max(min, v), max);
}

function f6(x, y) {
	return [clip(Math.sin(x/80)/Math.sin(y/80)*100, -100, 100), clip(Math.cos(x/80)/Math.cos(y/80)*100, -100, 100)];
}

function g(x, y) {
	return x*y
}
function f7(x, y) {
	delta = 0.0001
	Nfx = (g(x+delta, y)-g(x, y))/delta
	Nfy = (g(x, y+delta)-g(x, y))/delta
	return [Nfx/2, Nfy/1.3]
}

function f8(x, y) {
	return [Math.sin(x/100)*200, Math.sin(y/100)*200];
}

function f9(x, y) {
	x /= functionScale
	y /= functionScale
	v = [-y, x]
	return [v[0]*functionScale, v[1]*functionScale]
}


function unitVector(v, lambda) {
	len = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2))
	v[0] /= len
	v[1] /= len
	return v
}

function scale(v, lambda) {
	v[0] *= lambda
	v[1] *= lambda
	return v
}



function render() {
	ctx.fillStyle = 'rgb(200, 90, 90)'
	if (flowLines) {
		for (var y = -canvas.height/2; y < canvas.height/2+flowLineSpacing; y += flowLineSpacing) {
			for (var x = -canvas.width/2; x < canvas.width/2+flowLineSpacing; x += flowLineSpacing) {
				var xPos = x
				var yPos = y
				for (var i = 0; i < flowLineLength; i++) {
					ctx.fillRect(xPos, yPos, 1, 1)
					xPos += f(xPos, yPos)[0] * flowLineRes
					yPos += f(xPos, yPos)[1] * flowLineRes
				}
			}
		}
	}
	ctx.strokeStyle = 'rgb(90, 90, 200)'
	if (vectorField) {
		for (var y = -canvas.height/2; y < canvas.height/2+vectorSpacing; y += vectorSpacing) {
			for (var x = -canvas.width/2; x < canvas.width/2+vectorSpacing; x += vectorSpacing) {
				arrow([x, y], scale(f(x, y), vectorScale))
			}
		}
	}
	ctx.closePath()
}

ctx.fillStyle = "white";
ctx.fillRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height)
render()

function loop() {
	for (var i = 0; i < particles.length; i++) {
		for (var k = 0; k < 20; k++) {
			ctx.fillStyle = "rgb(90, 245, 90)";
			ctx.fillRect(particles[i][0], particles[i][1], particleSize, particleSize)
			var v = f(particles[i][0], particles[i][1])
			particles[i][0] += v[0] * 0.002
			particles[i][1] += v[1] * 0.002
		}
		if (particles[i][0] < -canvas.width/2 || particles[i][0] > canvas.width/2 ||
			particles[i][1] < -canvas.height/2 || particles[i][1] > canvas.height/2) {
			particles.splice(i, 1);
		}
	}
}


ctx.fillStyle = 'rgb(0, 0, 0)'

if (particleSim) {
	particles = []
	function add(e) {
		particles.push([e.offsetX-canvas.width/2, e.offsetY-canvas.height/2])
		console.log(e)
	}
	setInterval(loop, 18)

	document.getElementById('maincanvas').addEventListener("click", add);
}
