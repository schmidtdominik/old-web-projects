var canvas = document.getElementById('maincanvas');
var ctx = canvas.getContext("2d");

nodes = []

resolution = 1

// set randomness to 0 for perfect image
randomness = 0.2
centers = 20
lxnorm = 100


function setRandomness(v) {
	randomness = v/21;
	render();
}
function setResolution(v) {
	resolution = v;
	render();
}
function setCenters(v) {
	centers = v;
	nodes = []
	prep()
	render();
}
function setLxnorm(v) {
	lxnorm = v;
	render();
}


function prep() {
	nodes = []
	for (var i = 0; i < centers; i++) {
		color = 'hsl(' + 360/centers*i + ', 100%, 68%)'
		nodes.push([Math.floor(Math.random()*canvas.width), Math.floor(Math.random()*canvas.height), color])
	}

	for (var s = 0; s < nodes.length; s++) {
		nodes[s][0] = (nodes[s][0]-canvas.width/2)*0.6+canvas.width/2
		nodes[s][1] = (nodes[s][1]-canvas.height/2)*0.6+canvas.height/2

		for (var i = 0; i < nodes.length; i++) {
			nodes[s][0] += (nodes[i][0]-nodes[s][0])*0.007
			nodes[s][1] += (nodes[i][1]-nodes[s][1])*0.007
		}
	}
}

function getClosestNode(x, y) {
	closestNode = nodes[0]
	closestNodeSeperation = Infinity

	for (var i = nodes.length - 1; i >= 0; i--) {
		if (Math.random() < randomness) {continue}
		if (lxnorm == 2) {
			seperation = Math.sqrt(Math.pow(nodes[i][0]-x, 2) + Math.pow(nodes[i][1]-y, 2))
		} else {
				seperation = Math.pow(Math.pow(nodes[i][0]-x, lxnorm) + Math.pow(nodes[i][1]-y, lxnorm), 1/lxnorm)
		}

		if (seperation < closestNodeSeperation) {
			closestNode = nodes[i]
			closestNodeSeperation = seperation
		}
	}
	return closestNode
}

function render() {
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	document.getElementById('randomness').innerHTML = "Randomness: " + randomness + ','
	document.getElementById('resolution').innerHTML = "Resolution: " + resolution + ','
	document.getElementById('centers').innerHTML = "Centers: " + centers + ','
	document.getElementById('metric').innerHTML = "Metric: l-" + lxnorm + ' norm'
	for (var y = 0; y < canvas.height; y+=resolution) {
		for (var x = 0; x < canvas.width; x+=resolution) {
			if (Math.sqrt(Math.pow(x+resolution/2-canvas.width/2, 2) + Math.pow(y+resolution/2-canvas.height/2, 2)) < 322) {
				ctx.fillStyle = getClosestNode(x, y)[2]
				ctx.fillRect(x, y, resolution, resolution)
			}
		}
	}

	for (var i = 0; i < nodes.length; i++) {
		ctx.fillStyle = '#000000'
		ctx.fillRect(nodes[i][0], nodes[i][1], 5, 5)
	}
}

prep()
render()
