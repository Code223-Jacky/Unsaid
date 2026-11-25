(function () {
  if (typeof p5 === "undefined") return;
  new p5(function (sk) {
    let points = [],
      w = 400,
      h = 400;
    function fit() {
      const e = document.getElementById("memory-visual");
      w = e.clientWidth;
      h = Math.max(400, e.clientHeight);
      sk.resizeCanvas(w, h);
    }
    sk.setup = function () {
      const holder = document.getElementById("memory-visual");
      w = holder.clientWidth;
      h = Math.max(400, holder.clientHeight);
      sk.createCanvas(w, h).parent(holder);
      for (let i = 0; i < 55; i++)
        points.push({
          x: sk.random(w),
          y: sk.random(h),
          vx: sk.random(-0.28, 0.28),
          vy: sk.random(-0.25, 0.25),
          r: sk.random(1, 2.8)
        });
    };
    sk.draw = function () {
      sk.background(24, 32, 30);
      sk.noStroke();
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
        const d = sk.dist(sk.mouseX, sk.mouseY, p.x, p.y);
        const near = d < 110 && sk.mouseX > 0 && sk.mouseX < w && sk.mouseY > 0 && sk.mouseY < h;
        sk.fill(near ? sk.color(198, 211, 180, 220) : sk.color(110, 148, 123, 145));
        sk.circle(p.x, p.y, near ? p.r * 2.8 : p.r * 2);
      }
      sk.stroke(116, 146, 129, 30);
      for (let i = 0; i < points.length; i++)
        for (let j = i + 1; j < points.length; j++) {
          const d = sk.dist(points[i].x, points[i].y, points[j].x, points[j].y);
          if (d < 55) sk.line(points[i].x, points[i].y, points[j].x, points[j].y);
        }
    };
    sk.windowResized = fit;
  });
})();