(function () {
  var canvas = document.getElementById('smoke-canvas');
  var ctx    = canvas.getContext('2d');
  var W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  /* Two source points — like two people passing a joint */
  var sources = [
    { rx: 0.38, ry: 0.94 },
    { rx: 0.61, ry: 0.96 }
  ];

  function Particle(sx, sy) {
    this.x  = sx + (Math.random() - 0.5) * 6;
    this.y  = sy;
    this.vx = (Math.random() - 0.5) * 0.25;
    this.vy = -(Math.random() * 0.55 + 0.25);
    this.r  = Math.random() * 3 + 1;
    this.grow      = Math.random() * 0.10 + 0.03;
    this.life      = 0;
    this.maxLife   = (Math.random() * 220 + 160) | 0;
    this.peakAlpha = Math.random() * 0.11 + 0.04;
    this.alpha     = 0;
    this.angle     = Math.random() * Math.PI * 2;
    this.angleSpeed= (Math.random() - 0.5) * 0.012;
  }

  Particle.prototype.update = function () {
    this.life++;
    var t = this.life / this.maxLife;
    if      (t < 0.10) this.alpha = this.peakAlpha * (t / 0.10);
    else if (t < 0.75) this.alpha = this.peakAlpha;
    else               this.alpha = this.peakAlpha * (1 - (t - 0.75) / 0.25);

    this.angle += this.angleSpeed;
    this.vx    += Math.sin(this.angle) * 0.012;
    this.x     += this.vx;
    this.y     += this.vy;
    this.r     += this.grow;
  };

  Particle.prototype.draw = function () {
    if (this.alpha < 0.002) return;
    var g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    g.addColorStop(0,   'rgba(195,192,188,' + this.alpha        + ')');
    g.addColorStop(0.5, 'rgba(185,182,178,' + this.alpha * 0.5  + ')');
    g.addColorStop(1,   'rgba(175,172,168,0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 6.2832);
    ctx.fill();
  };

  Particle.prototype.dead = function () { return this.life >= this.maxLife; };

  var particles = [];
  var tick = 0;

  function loop() {
    ctx.clearRect(0, 0, W, H);
    tick++;

    sources.forEach(function (s) {
      if (tick % 2 === 0) {
        particles.push(new Particle(s.rx * W, s.ry * H));
        particles.push(new Particle(s.rx * W, s.ry * H));
      }
    });

    for (var i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].dead()) particles.splice(i, 1);
    }

    requestAnimationFrame(loop);
  }

  loop();
})();
