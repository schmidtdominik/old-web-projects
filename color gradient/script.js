let canvas = document.getElementById('maincanvas');
let ctx = canvas.getContext("2d");

let r0 = 0;
let g0 = 255;
let b0 = 255;

let r1 = 255;
let g1 = 0;
let b1 = 255;


update()
function update() {
  for (let x = 0; x < canvas.width; x++) {
    col = x / canvas.width;
    ctx.fillStyle = 'rgb(' + Math.round(col * r1 + (1 - col) * r0) + ', ' + Math.round(col * g1 + (1 - col) * g0) + ', ' + Math.round(col * b1 + (1 - col) * b0) + ')';
    ctx.fillRect(x, 0, 1, canvas.height);
  }
}

function updateColor0(picker) {
  r0 = picker.rgb[0];
  g0 = picker.rgb[1];
  b0 = picker.rgb[2];
  update()
}
function updateColor1(picker) {
  r1 = picker.rgb[0];
  g1 = picker.rgb[1];
  b1 = picker.rgb[2];
  update()
}