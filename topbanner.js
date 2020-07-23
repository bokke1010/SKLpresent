let timer = 0;
let total = 0;
let ctx;
let canvas;
let fireworks = [];

function startfw() {
  canvas = document.getElementById("topbanner");
  ctx = canvas.getContext("2d");
  timer = 0;
  ctx.lineWidth = 3;
  resize();
  animate();
  window.addEventListener("resize", resize);
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

function getColor(){
  return "hsl(" + 360 * Math.random() + ',' +
             (70 + 30 * Math.random()) + '%,' +
             (65 + 20 * Math.random()) + '%)'
}

function animate() {
  // call again next time we can draw
  requestAnimationFrame(animate);
  timer += 1;
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw everything
  fireworks.forEach(function(fw, fi, fws) {
    // console.log(fw);
    ctx.strokeStyle = fw.color;
    ctx.fillStyle = fw.color;
    fw.time++;
    if (fw.time < fw.lifetime - 100) {
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.arc(fw.trx[fw.i], fw.try[fw.i], 2, 0, 2 * Math.PI);
      // ctx.stroke();
      ctx.fill();

      fw.i = (fw.i + 1) % fw.trx.length;
      fw.try[fw.i] = fw.try[mod(fw.i - 1, fw.trx.length)] - 0.01 * canvas.height;
      fw.trx[fw.i] = fw.trx[mod(fw.i - 1, fw.trx.length)] + fw.xvel;
      fw.xvel *= 1.02;
      ctx.beginPath();
      ctx.moveTo(fw.trx[fw.i], fw.try[fw.i]);
      for (var i = 0; i < Math.min(fw.trx.length - 1, fw.time); i++) {
        index = (fw.i + i) % fw.trx.length;
        ctx.lineTo(fw.trx[index], fw.try[index]);
      }
      ctx.stroke();

    } else if (fw.time < fw.lifetime) {
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      let angle = Math.PI * 2 * Math.random();
      let ls = 20 * Math.random();
      let le = ls + 20 * Math.random();
      ctx.moveTo(fw.trx[fw.i] + Math.cos(angle) * ls, fw.try[fw.i] + Math.sin(angle) * ls);
      ctx.lineTo(fw.trx[fw.i] + Math.cos(angle) * le, fw.try[fw.i] + Math.sin(angle) * le);

      // ctx.arc(fw.trx[fw.i], fw.try[fw.i], 40, 0, 2 * Math.PI);
      ctx.stroke();
    } else {
      fws.splice(fi, 1);
    }
  });
  if (0.0002 * timer * canvas.width > total) {
    total += 1;
    let firework = {};
    firework.trx = [Math.random() * canvas.width];
    firework.try = [canvas.height];
    firework.trx.length = 15;
    firework.try.length = 15;
    firework.xvel = 0.5 * (Math.random() - 0.5);
    firework.i = 0;
    firework.time = 0;
    firework.lifetime = 120 + 80 * Math.random();
    firework.color = getColor();
    fireworks.push(firework);
  }
}

function resize (){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight * 0.2;
}