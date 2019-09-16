var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var dots = [];

var canX = canvas.width;
var canY = canvas.height;

p = 0
t = 0

p_diff = 1

let FPS = 60;

p_is_set = false;
function set_init_p_diff(v) {
	if (!p_is_set) {
		p_diff = v;
		p_is_set = true;
	}
}

var res = 4;

res_is_set = false;
function set_init_res(v) {
	if (!res_is_set) {
		res = v;
		res_is_set = true;
	}
}

function getRgb(r, g, b) {
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function setFunction(fun) {
	fk = [drawPoint1, drawPoint2, drawPoint6, drawPoint4, drawPoint5, drawPoint8, drawPoint3, drawPoint7, drawPoint9, drawPoint10, drawPoint11, drawPoint12, drawPoint13, drawPoint14, drawPoint15, drawPoint16, drawPoint17, drawPoint18, drawPoint19]
	fn = fk[fun-1];
	p = 0;
	res_is_set = false;
	p_is_set = false;
	p_diff = 1;
	FPS = 50;
	res = 4;
	fn()
}

function loop() {
		ctx.fillStyle = "rgb(255, 255, 255)"
		ctx.fillRect(0, 0, canvas.width, canvas.height)
    t = 0;
    for (var y = 0; y < canY; y+=res) {
    	for (var x = 0; x < canY; x+=res) {
    		fn(x, y);
    		t += 1;
    	}
    }
    p += p_diff;
}

function drawPoint1(x, y) {//p1,fps1000
	FPS = 1000;
	set_init_res(3);
	v1 = Math.sin((x+y+p*4)/60)
	v2 = Math.tan((y)/60)

	// or ^

	b = v1+Math.sin(x) > v2 ^ v1 < v2+Math.sin(x)
	if (b) {
		ctx.fillStyle = getRgb(230, 255, 230);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(parseInt(v1*50+Math.sin(x)*255), 100, parseInt(v2*50+Math.sin(x+10)*255));
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint2(x, y) {//p1,fps60
	set_init_p_diff(0.2)
	v = y%x%(p+5) < x%y%(p+5)

 	if (v) {
 		ctx.fillStyle = getRgb(255, 0, 0);
		ctx.fillRect(x, y, res, res);
 	} else {
		ctx.fillStyle = 'rgba(0, 255, 222, 0.9)';
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint3(x, y) {//p1||10,fps1000
	set_init_p_diff(1)
	FPS = 60;
	set_init_res(2)
	if ((100*x)%(10*y)%p) {
		ctx.fillStyle = getRgb((100*x)%(10*y)%p*5, 0, (100*x)%(10*y)%p*5);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint4(x, y) {//p1||10,fps1000
	set_init_p_diff(1)
	v = x%p

	if (v%(x%y%p)) {
		ctx.fillStyle = getRgb(v, v%(x%y%p), 0);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint5(x, y) {//p15,fps1000
	FPS = 1000;
	set_init_p_diff(Math.PI/2)
	set_init_res(1)
	v = (Math.sin((x+p)/60) < Math.cos(x*y+p/60))
	c = Math.floor(Math.abs(v))*100
	if (v) {
		ctx.fillStyle = getRgb(255*(1+Math.sin((x+p)/60))/2, 255, 255*(1+Math.cos((x*y*(p+50))/6000))/2);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint6(x, y) {//p1,fps1000
	set_init_p_diff(0.165)
	v1 = Math.sin(x/20)
	v2 = Math.sin(y/20)

	b = v1+(p/30) > v2 && v1 < v2+(p/30)
	if (b) {
		ctx.fillStyle = getRgb(255, 255, 255);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(125, 255*(1+v1)/2, 255*(1+v2)/2);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint7(x, y) {//p0.1,fps60
	set_init_res(3)
	set_init_p_diff(0.05)
	v = Math.sin(x*y*0.01*p) < (y-(canY/2))/(canY/2)

 	if (v) {
 		ctx.fillStyle = getRgb(255, 0, 0);
		ctx.fillRect(x, y, res, res);
 	}
};

function drawPoint15(x, y) {//p1,fps60
	FPS = 60;
	set_init_res(3)
	set_init_p_diff(3);
	v = (p%x%y) < (y/(canY/2))/(canY/2)*p

 	if (v) {
 		ctx.fillStyle = getRgb(255, 0, 0);
		ctx.fillRect(x, y, res, res);
 	}
};

function drawPoint8(x, y) {//p1,fps1000
	set_init_p_diff(0.2)
	FPS = 60;

	v1 = Math.sin((x+p*4)/20)
	v2 = Math.tan((y)%40)

	b = v1+(p/30) > v2 && v1 < v2+(p/30)
	if (b) {
		ctx.fillStyle = getRgb(255*(1+v1)/2, 255*(1+v2)/2, 255);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint9(x, y) {//p1,fps1000
	FPS = 1000;
	set_init_res(4)
	set_init_p_diff(1);
	r = Math.floor(Math.abs(Math.sin((x+p)/2000*p)*255))
	g = Math.floor(Math.abs(Math.sin((x-p*y)/2000)*255))
	b = Math.floor(Math.abs(Math.sin(y*x+p/2000)*255))
	ctx.fillStyle = getRgb(r, g, b);
	ctx.fillRect(x, y, res, res);
};

function drawPoint10(x, y) {//p1||10,fps1000
	v = y%p

	if (v%(x%y%p)) {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint11(x, y) {//p1,fps60
	set_init_res(3)
	v = (y*p)%x < (x*y)%p

	if (v) {
		ctx.fillStyle = getRgb(255, 255, 255);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint12(x, y) {//p1,fps60
	FPS = 200;
	set_init_p_diff(2);
	v = Math.sin(x/(40*y*0.1/p)) < (y-(canY/2))/(canY/2)

	if (v) {
		ctx.fillStyle = getRgb(255*(1+Math.sin(x/(40*y*0.1/p)))/2, 255, 0);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint13(x, y) {//p1,fps1000
	set_init_p_diff(0.01);
	v1 = Math.sin((x+p)/60)
	v2 = Math.tan((y)/60)

	b = p%v1 > p%v2
	if (b) {
		ctx.fillStyle = getRgb(0, 255, 255);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint14(x, y) {//p2,fps60,dl
	FPS = 60;
	set_init_p_diff(3);
	r = Math.floor(Math.abs(Math.sin((x % p)/200)*255))
	g = Math.floor(Math.abs(Math.sin((y % p)/200)*255))
	b = Math.floor(Math.abs(Math.sin((x % y * p)/200)*255))
	ctx.fillStyle = getRgb(r, g, b);
	ctx.fillRect(x, y, r/100, g/100);
};

function drawPoint16(x, y) {//p1||10,fps1000
	v = p%y

	if ((x%y%p)%v ^ (p%x > p%y)) {
		ctx.fillStyle = getRgb((x%y%p)%v, p%x, p%y);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint17(x, y) {//p1,fps60
	r = Math.floor(Math.abs(Math.sin(((x+p*2) % y)/200)*255))
	g = Math.floor(Math.abs(Math.sin((y % (x+p))/200)*255))
	b = Math.floor(Math.abs(Math.sin(((x+p) % (y+p))/200)*255))
	ctx.fillStyle = getRgb(r, g, b);
	ctx.fillRect(x, y, res, res);
};

function drawPoint18(x, y) {//p1,fps60
	set_init_p_diff(10)
	p_n = (p+400)
	v = Math.sin(x/(40*y*0.1/p_n)) < (y-(canY/2))/(canY/2)/(p_n*0.01)

	if (v) {
		ctx.fillStyle = getRgb(255, 255, 100);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(30, 30, 30);
		ctx.fillRect(x, y, res, res);
	}
};

function drawPoint19(x, y) {//p1,fps60
	r = Math.floor(Math.abs(Math.sin((x % p)/200)*255))
	g = Math.floor(Math.abs(Math.sin((y % p)/200)*255))
	b = Math.floor(Math.abs(Math.sin((x % y * p)/200)*255))
	ctx.fillStyle = getRgb(r, g, b);
	ctx.fillRect(x, y, res, res);
};

var fn = drawPoint1;
loop()
setInterval(loop, 1000/FPS);




/*function drawPointA(x, y) {//p1||10,fps1000
	set_init_p_diff(1)
	if (100*x%y%p) {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};*/

/*function drawPointA(x, y) {//p1||10,fps1000
	v = 42

	if (v*x%y%p) {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};*/

/*function drawPointA(x, y) {//p1,fps1000
	v1 = Math.sin((x+p*4)/20)
	v2 = Math.tan(1000%(y))

	b = v1+(p/30) > v2 && v1 < v2+(p/30)
	if (b) {
		ctx.fillStyle = getRgb(255, 255, 255);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};*/

/*function drawPointA(x, y) {//p1,fps1000
	v1 = Math.sin((x+p*5)/60)
	v2 = Math.tan((y)/60)

	// or ^

	b = v1+Math.sin(x)+1 > v2 && v1 < v2+Math.sin(x)+1
	if (b) {
		ctx.fillStyle = getRgb(255, 255, 255);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};*/

/*function drawPointA(x, y) {//p1,fps60
	v = Math.pow(x%p, x) < Math.pow(y%p, y)

 	if (v) {
 		ctx.fillStyle = getRgb(255, 0, 0);
		ctx.fillRect(x, y, res, res);
 	}
};*/

/*
function drawPoint17(x, y) {//p1,fps1000
	v1 = Math.sin((x+p*4)/60)
	v2 = Math.tan((y)/60)

	b = v1+Math.sin(x) > v2 && v1 < v2+Math.sin(x)
	if (b) {
		ctx.fillStyle = getRgb(255, 255, 255);
		ctx.fillRect(x, y, res, res);
	} else {
		ctx.fillStyle = getRgb(0, 0, 0);
		ctx.fillRect(x, y, res, res);
	}
};
*/
