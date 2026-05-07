/* ========== canvas-art.js ==========
   Rick Rubin design conversions — vanilla Canvas 2D
   Each function: init(container) → returns destroy()
   ========================================= */

/** 01 — Wave Interference Field (Hero Background) */
function createWaveField(container) {
  const canvas = document.createElement('canvas');
  canvas.id = 'hero-canvas';
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;z-index:0;';
  container.prepend(canvas);
  const ctx = canvas.getContext('2d');
  let raf, t = 0;

  function resize() {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    const { width: w, height: h } = canvas;
    ctx.clearRect(0, 0, w, h);

    const step = 18;
    const cols = Math.ceil(w / step) + 1;
    const rows = Math.ceil(h / step) + 1;
    const cx = w / 2, cy = h / 2;

    ctx.strokeStyle = 'rgba(14,14,19,0.08)';
    ctx.lineWidth = 0.8;

    // horizontal lines with wave distortion
    for (let r = 0; r < rows; r++) {
      ctx.beginPath();
      for (let c = 0; c <= cols; c++) {
        const x = c * step;
        const baseY = r * step;
        const dx = x - cx, dy = baseY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const wave1 = Math.sin(dist * 0.02 - t * 2) * 12 * Math.exp(-dist * 0.002);
        const wave2 = Math.sin(dist * 0.035 + t * 1.5) * 8 * Math.exp(-dist * 0.003);
        const y = baseY + wave1 + wave2;
        c === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // vertical lines
    for (let c = 0; c < cols; c++) {
      ctx.beginPath();
      for (let r = 0; r <= rows; r++) {
        const baseX = c * step;
        const y = r * step;
        const dx = baseX - cx, dy = y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const wave1 = Math.sin(dist * 0.02 - t * 2) * 12 * Math.exp(-dist * 0.002);
        const x = baseX + wave1 * 0.5;
        r === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    t += 0.008;
    raf = requestAnimationFrame(draw);
  }
  draw();

  return function destroy() {
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
    canvas.remove();
  };
}

/** 02 — Tessellation Hexagons */
function createTessellation(container, size) {
  size = size || 280;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  canvas.style.cssText = `width:${size}px;height:${size}px;border-radius:20px;`;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let raf, t = 0;

  function drawTile(cx, cy, s, rot, phase) {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i <= 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const r = s * (1 + Math.sin(phase + i) * 0.1);
      const x = Math.cos(a) * r, y = Math.sin(a) * r;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(51,51,51,0.35)';
    ctx.lineWidth = 0.8;
    ctx.stroke();

    for (let i = 0; i < 6; i += 2) {
      const a1 = (i / 6) * Math.PI * 2, a2 = ((i + 2) / 6) * Math.PI * 2;
      const mid = (a1 + a2) / 2;
      const r1 = s * (1 + Math.sin(phase + i) * 0.1);
      const ir = s * 0.5;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a1) * r1, Math.sin(a1) * r1);
      ctx.lineTo(Math.cos(mid) * ir, Math.sin(mid) * ir);
      ctx.stroke();
    }
    ctx.restore();
  }

  function animate() {
    t += 0.008;
    ctx.clearRect(0, 0, size, size);
    const sc = 40, grid = 4, sp = sc * 0.8;
    for (let r = -grid; r <= grid; r++) {
      for (let c = -grid; c <= grid; c++) {
        const x = c * sp * 0.866 + (r % 2) * sp * 0.5;
        const y = r * sp * 0.75;
        const d = Math.sqrt(x * x + y * y);
        if (d > sc * 3) continue;
        const phase = t + d * 0.01;
        const angle = Math.atan2(y, x);
        drawTile(size / 2 + x, size / 2 + y, sc * 0.35 * (1 - d / (sc * 4) * 0.3), angle + t * 0.15, phase);
      }
    }
    raf = requestAnimationFrame(animate);
  }
  animate();
  return function destroy() { cancelAnimationFrame(raf); canvas.remove(); };
}

/** 06 — Double Helix Particles */
function createHelix(container, w, h) {
  w = w || 400; h = h || 300;
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.style.cssText = `width:${w}px;height:${h}px;border-radius:20px;`;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let raf, t = 0;

  const particles = [];
  const TWO_PI = Math.PI * 2;
  for (let i = 0; i < 50; i++) {
    particles.push({
      phase: (i / 50) * TWO_PI * 3,
      radius: 60 + Math.random() * 20,
      yOff: (Math.random() - 0.5) * h * 0.8,
      ySpd: (0.3 + Math.random() * 0.3) * (Math.random() > 0.5 ? 1 : -1),
      rotSpd: 0.005 + Math.random() * 0.003,
      sz: 2 + Math.random() * 3,
      op: 0.35 + Math.random() * 0.3
    });
  }

  function animate() {
    ctx.clearRect(0, 0, w, h);
    t += 0.02;

    const pts = particles.map(p => {
      p.phase += p.rotSpd;
      p.yOff += p.ySpd;
      if (p.yOff > h * 0.45) p.yOff = -h * 0.45;
      if (p.yOff < -h * 0.45) p.yOff = h * 0.45;
      const x = w / 2 + Math.cos(p.phase) * p.radius;
      const y = h / 2 + p.yOff;
      const z = Math.sin(p.phase) * p.radius;
      return { x, y, z, sz: p.sz, op: p.op };
    });

    pts.sort((a, b) => a.z - b.z);

    ctx.lineWidth = 0.8;
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, dz = pts[i].z - pts[j].z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < 100) {
          const a = (1 - d / 100) * 0.12;
          ctx.strokeStyle = `rgba(14,14,19,${a})`;
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.stroke();
        }
      }
    }

    for (const p of pts) {
      const scale = (p.z + 80) / 160;
      ctx.fillStyle = `rgba(14,14,19,${p.op * scale})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.sz * scale, 0, TWO_PI);
      ctx.fill();
    }

    raf = requestAnimationFrame(animate);
  }
  animate();
  return function destroy() { cancelAnimationFrame(raf); canvas.remove(); };
}

/** 07 — Torus Field */
function createTorusField(container, size) {
  size = size || 320;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  canvas.style.cssText = `width:${size}px;height:${size}px;border-radius:20px;`;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let raf, t = 0;

  function animate() {
    ctx.clearRect(0, 0, size, size);
    t += 0.006;
    const cx = size / 2, cy = size / 2;
    const R = size * 0.22, r = size * 0.11;
    const n = 30;

    for (let i = 0; i < n; i++) {
      const u = (i / n) * Math.PI * 2;
      for (let j = 0; j < n; j++) {
        const v = (j / n) * Math.PI * 2;
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);
        const sc = 150 / (150 + z);
        const sx = cx + x * sc;
        const sy = cy + y * sc * 0.5;
        const phase = t + u * 0.5 + v * 0.5;
        const off = Math.sin(phase) * 3;
        ctx.beginPath();
        ctx.arc(sx + off, sy + off, 0.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(80,80,80,${0.25 * sc})`;
        ctx.fill();
      }
    }

    for (let k = 50; k < size * 0.45; k += 25) {
      ctx.beginPath();
      ctx.arc(cx, cy, k + Math.sin(t + k * 0.01) * 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(80,80,80,0.07)';
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    raf = requestAnimationFrame(animate);
  }
  animate();
  return function destroy() { cancelAnimationFrame(raf); canvas.remove(); };
}

/** 08 — Fibonacci Spiral */
function createFibSpiral(container, size) {
  size = size || 300;
  const canvas = document.createElement('canvas');
  canvas.width = size; canvas.height = size;
  canvas.style.cssText = `width:${size}px;height:${size}px;border-radius:20px;`;
  container.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let raf, t = 0;
  const phi = (1 + Math.sqrt(5)) / 2;

  function animate() {
    ctx.clearRect(0, 0, size, size);
    ctx.save();
    ctx.translate(size / 2, size / 2);

    const maxR = Math.min(40, Math.floor((t * 0.02) % 60));
    let w = size * 0.45, h = w / phi, sc = 1;
    const angle = t * 0.0002;

    for (let i = 0; i < maxR; i++) {
      ctx.save();
      const sa = i * 0.174533, radius = sc * size * 0.15;
      ctx.translate(Math.cos(sa) * radius, Math.sin(sa) * radius);
      ctx.rotate(sa + angle);
      const alpha = Math.max(0.05, 0.4 - i * 0.008);
      ctx.strokeStyle = `rgba(83,81,70,${alpha})`;
      ctx.lineWidth = 0.6;
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      ctx.restore();
      w *= 0.95; h *= 0.95; sc *= 0.98;
    }

    ctx.beginPath();
    for (let i = 0; i <= maxR; i++) {
      const sa = i * 0.174533, radius = Math.pow(0.98, i) * size * 0.15;
      const x = Math.cos(sa) * radius, y = Math.sin(sa) * radius;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(150,150,150,0.25)';
    ctx.lineWidth = 0.8;
    ctx.stroke();
    ctx.restore();

    t += 0.6;
    raf = requestAnimationFrame(animate);
  }
  animate();
  return function destroy() { cancelAnimationFrame(raf); canvas.remove(); };
}
