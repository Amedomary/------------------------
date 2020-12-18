'use strict';

// stats
setTimeout(() => {
  const canvas = document.getElementById('amedomary');
  canvas.width = innerWidth - 20;
  canvas.height = innerHeight - 20;
  const ctx = canvas.getContext('2d');

  const centerW = canvas.width / 2;
  const centerH = canvas.height / 2;

  const grid = {
    size: 17,
  };

  const mash = [];
  const doneMash = { 0: 0 };
  let doneDots = 0;
  const dotSize = 10;
  const speed = {
    down: 4,
    top: 4,
  };

  class Dot {
    constructor(x, y, color) {
      this.x = x ?? 0;
      this.y = y ?? 0;
      this.done = false;
    }

    reCalculateDot() {
      const rand = Math.random();
      if (this.y < 700 - grid.size / 2) {
        if (this.y % grid.size === 0) {
          if (rand > 0.5) {
            this.x += grid.size / 2;
            this.y += 1;
          } else if (rand < 0.5) {
            this.x -= grid.size / 2;
            this.y += 1;
          } else {
            this.y -= 1;
          }
        } else {
          this.y += 1;
        }
      } else {
        if (!this.done) {
          this.done = true;

          doneMash[this.x] ? (doneMash[this.x] += 1) : (doneMash[this.x] = 1);
        }
      }
    }

    draw() {
      ctx.fillRect(this.x, this.y, dotSize, dotSize);
    }
  }

  function spawnDot() {
    mash.push(new Dot(centerW, 10));
  }

  function reCalculateDots() {
    for (let i in mash) {
      mash[i].reCalculateDot();
    }
  }

  function drawDots() {
    for (let i in mash) {
      mash[i].draw();
    }
  }

  function drawResult() {
    for (let i in doneMash) {
      ctx.fillRect((Number(i) + 2), 700, dotSize / 2, doneMash[i] * 4);
    }
  }

  function renderLoop() {
    reCalculateDots();
    drawDots();
    drawResult();
  }

  function drawPreImg() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderLoop();

    requestAnimationFrame(drawPreImg);
  }

  setInterval(() => {
    spawnDot();
  }, 100);

  drawPreImg();
}, 500);
