var offset = 0;

function setup() {
    createCanvas(1920, 1080, WEBGL);

	//ambientMaterial(250);
	//specularMaterial(100);


    //ambientLight(10, 10, 10);
    //directionalLight(100, 250, 250, 1, 1, 1);
	//pointLight(250, 250, 250, 0, 30, 0);
}

function f(x, z) {
	return 10*sin(x/5)*sin(z/5)+Math.round(z/30)*6*2
}

function draw() {
	background(200);
	translate(0, 0, -200);
	rotateX(Math.PI/6);
	//rotateX(Math.PI/5+(frameCount/100));
	rotateY(frameCount/60)

	for (var z = -30; z < 30; z++) {
		for (var x = -30; x < 30; x++) {
			var y = f(x, z);
			push();
			translate(x*10, y*10, z*10);
			box(5, 5);
			pop();
		}
	}
}
