// Procedural illustration kit — flat / low-poly editorial style.
// Every scene is generated at build time into plain inline SVG (no runtime cost).

export function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n1 = (n) => Math.round(n * 10) / 10;
const P = (pts) => pts.map((p) => Math.round(p[0]) + ' ' + Math.round(p[1])).join('L');

/* ------------------------------------------------------------------ */
/* Shared symbols (emitted once per document)                          */
/* ------------------------------------------------------------------ */
export const SHARED_DEFS = `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<path id="pine" d="M0 -30L-7 -17H-4L-10 -7H-5L-12 0H12L5 -7H10L4 -17H7Z"/>
<path id="larch" d="M0 -30L-6 -20L-9 -12L-11 -4L-7 0H7L11 -4L9 -12L6 -20Z"/>
<path id="leafy" d="M0 -24C-9 -24 -13 -15 -11 -8C-12 -3 -6 0 0 0C6 0 12 -3 11 -8C13 -15 9 -24 0 -24Z"/>
<g id="a-bear"><ellipse cx="46" cy="34" rx="34" ry="17"/><ellipse cx="44" cy="22" rx="20" ry="11"/><circle cx="82" cy="31" r="10"/><ellipse cx="93" cy="36" rx="7" ry="4.6"/><circle cx="78" cy="22" r="3.4"/><circle cx="87" cy="22" r="3.4"/><rect x="14" y="40" width="10" height="20" rx="3"/><rect x="29" y="44" width="10" height="16" rx="3"/><rect x="57" y="44" width="10" height="16" rx="3"/><rect x="71" y="40" width="10" height="20" rx="3"/></g>
<g id="a-elk"><ellipse cx="46" cy="40" rx="30" ry="13"/><path d="M66 34L82 12L90 14L78 40Z"/><ellipse cx="90" cy="12" rx="10" ry="5" transform="rotate(18 90 12)"/><rect x="22" y="46" width="4.4" height="30" rx="2"/><rect x="30" y="48" width="4.4" height="28" rx="2"/><rect x="58" y="48" width="4.4" height="28" rx="2"/><rect x="66" y="46" width="4.4" height="30" rx="2"/><path d="M84 8C82 -4 74 -10 66 -12M80 -2C76 -4 74 -2 70 -6M84 6C90 -4 98 -8 104 -14M91 -2C94 -2 98 -1 100 -5M86 -2L84 -12" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></g>
<g id="a-sheep"><ellipse cx="44" cy="34" rx="28" ry="13"/><circle cx="76" cy="28" r="8.5"/><ellipse cx="84" cy="32" rx="6" ry="4.4"/><path d="M72 22C60 14 58 30 66 34C70 36 72 30 68 28" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><rect x="20" y="40" width="5" height="22" rx="2"/><rect x="28" y="42" width="5" height="20" rx="2"/><rect x="56" y="42" width="5" height="20" rx="2"/><rect x="64" y="40" width="5" height="22" rx="2"/></g>
<g id="a-goat"><ellipse cx="42" cy="32" rx="28" ry="14"/><path d="M64 26L76 14L82 20L70 34Z"/><circle cx="80" cy="18" r="6"/><path d="M78 14L76 6M83 14L86 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" fill="none"/><rect x="18" y="38" width="5" height="20" rx="2"/><rect x="26" y="40" width="5" height="18" rx="2"/><rect x="52" y="40" width="5" height="18" rx="2"/><rect x="60" y="38" width="5" height="20" rx="2"/></g>
<g id="a-moose"><ellipse cx="46" cy="38" rx="32" ry="15"/><ellipse cx="34" cy="26" rx="14" ry="9"/><path d="M68 34L84 24L90 34L76 48Z"/><ellipse cx="90" cy="34" rx="9" ry="6.5"/><rect x="18" y="46" width="5" height="32" rx="2"/><rect x="28" y="48" width="5" height="30" rx="2"/><rect x="60" y="48" width="5" height="30" rx="2"/><rect x="70" y="46" width="5" height="32" rx="2"/><path d="M82 24L74 10L60 8L56 16L68 20ZM86 24L96 10L110 10L112 18L100 22Z"/></g>
<symbol id="i-maple" viewBox="0 0 24 24"><path fill="currentColor" d="M12 1l2.2 4.4 2.3-1.2-.7 5 2.8-1.3-.9 3.2 3.3.3-3.2 3.5 1.2 1.3-5.2 1.4.5 4.6-1.1-.4V23h-1V19.6l-1.1.4.5-4.6-5.2-1.4 1.2-1.3L3.3 9.2l3.3-.3-.9-3.2 2.8 1.3-.7-5 2.3 1.2z"/></symbol>
</defs></svg>`;

/* ------------------------------------------------------------------ */
/* Scene builder                                                       */
/* ------------------------------------------------------------------ */
export class Scene {
  constructor(id, { w = 800, h = 450, seed = 1 } = {}) {
    this.id = id;
    this.w = w;
    this.h = h;
    this.r = rng(seed * 7919 + 13);
    this.defs = [];
    this.out = [];
    this.uid = 0;
  }
  rnd(a = 0, b = 1) {
    return a + this.r() * (b - a);
  }
  pick(arr) {
    return arr[Math.floor(this.r() * arr.length)];
  }
  gid(k) {
    return `${this.id}-${k}${this.uid++}`;
  }
  add(s) {
    this.out.push(s);
    return this;
  }
  def(s) {
    this.defs.push(s);
    return this;
  }
  lin(stops, { x2 = 0, y2 = 1 } = {}) {
    const id = this.gid('g');
    this.def(
      `<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${stops
        .map((s, i) => `<stop offset="${n1((i / (stops.length - 1)) * 100)}%" stop-color="${s}"/>`)
        .join('')}</linearGradient>`
    );
    return `url(#${id})`;
  }
  rad(c, o0 = 0.9, o1 = 0) {
    const id = this.gid('r');
    this.def(
      `<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o0}"/><stop offset="1" stop-color="${c}" stop-opacity="${o1}"/></radialGradient>`
    );
    return `url(#${id})`;
  }

  /* ---------- sky ---------- */
  sky(stops, { sun, moon, stars = 0, glowY, yEnd } = {}) {
    const { w, h } = this;
    this.add(`<rect width="${w}" height="${yEnd || h}" fill="${this.lin(stops)}"/>`);
    if (stars) {
      let s = '';
      for (let i = 0; i < stars; i++) {
        const x = this.rnd(0, w),
          y = this.rnd(0, (yEnd || h) * 0.65),
          r = this.rnd(0.5, 1.6);
        s += `<circle cx="${n1(x)}" cy="${n1(y)}" r="${n1(r)}" class="tw" style="animation-delay:${n1(this.rnd(0, 4))}s"/>`;
      }
      this.add(`<g fill="#fff">${s}</g>`);
    }
    if (sun) {
      this.add(`<circle cx="${sun.x}" cy="${sun.y}" r="${sun.r * 4}" fill="${this.rad(sun.glow || sun.c, 0.55)}"/>`);
      this.add(`<circle cx="${sun.x}" cy="${sun.y}" r="${sun.r}" fill="${sun.c}" class="sun"/>`);
    }
    if (moon) {
      this.add(`<circle cx="${moon.x}" cy="${moon.y}" r="${moon.r * 3.2}" fill="${this.rad('#cfe1ff', 0.35)}"/>`);
      this.add(`<circle cx="${moon.x}" cy="${moon.y}" r="${moon.r}" fill="#f5f1de"/>`);
    }
    return this;
  }

  cloud(x, y, s = 1, { cls = 'cl', o = 0.9, c = '#fff' } = {}) {
    const d = n1(this.rnd(0, 6));
    this.add(
      `<g class="${cls}" style="animation-delay:-${d}s"><g transform="translate(${x} ${y}) scale(${s})" fill="${c}" opacity="${o}"><ellipse cx="0" cy="0" rx="46" ry="11"/><ellipse cx="-16" cy="-8" rx="22" ry="12"/><ellipse cx="14" cy="-12" rx="26" ry="15"/><ellipse cx="32" cy="-3" rx="18" ry="9"/></g></g>`
    );
    return this;
  }

  /* ---------- mountains ---------- */
  peaks({ base, n = 5, hmin = 90, hmax = 190, smin = 0.8, smax = 1.5, step = 6, jag = 3, x0 = -30, x1, shoulders = true, bias = 0 }) {
    const { w } = this;
    x1 = x1 ?? w + 30;
    const list = [];
    for (let i = 0; i < n; i++) {
      const x = x0 + (i + 0.5 + this.rnd(-0.35, 0.35)) * ((x1 - x0) / n);
      const h = this.rnd(hmin, hmax);
      const sl = this.rnd(smin, smax);
      list.push({ x, h, l: sl * this.rnd(0.8, 1.15), r: sl * this.rnd(0.8, 1.15) });
      if (shoulders) {
        const k = this.r() < 0.6 ? 2 : 1;
        for (let j = 0; j < k; j++) {
          const dx = this.rnd(28, 85) * (this.r() < 0.5 ? -1 : 1);
          list.push({ x: x + dx, h: h * this.rnd(0.35, 0.62), l: sl * this.rnd(0.9, 1.4), r: sl * this.rnd(0.9, 1.4) });
        }
      }
    }
    const noise = [];
    const N = Math.ceil(w / step) + 2;
    for (let i = 0; i < N; i++) noise.push(this.rnd(-1, 1));
    const pts = [];
    for (let i = 0; i < N; i++) {
      const x = i * step;
      let m = 0;
      for (const p of list) {
        const d = x - p.x;
        m = Math.max(m, p.h - Math.abs(d) * (d < 0 ? p.l : p.r));
      }
      const nz = (noise[i] * 0.6 + (noise[i - 1] ?? 0) * 0.2 + (noise[i + 1] ?? 0) * 0.2) * jag;
      pts.push([x, base - m - bias + (m > 4 ? nz : 0)]);
    }
    return pts;
  }

  hills({ base, n = 4, hmin = 40, hmax = 90, wmin = 90, wmax = 200, step = 6 }) {
    const { w } = this;
    const list = [];
    for (let i = 0; i < n; i++) list.push({ x: this.rnd(-20, w + 20), h: this.rnd(hmin, hmax), s: this.rnd(wmin, wmax) });
    const pts = [];
    for (let x = 0; x <= w + step; x += step) {
      let m = 0;
      for (const p of list) m = Math.max(m, p.h * Math.exp(-(((x - p.x) / p.s) ** 2)));
      pts.push([x, base - m]);
    }
    return pts;
  }

  /** Draw a silhouette. Returns its def id so it can be reflected. */
  mountain(sil, { fill, snowY, snow = '#f6f9fc', facets = true, shade = 'rgba(14,30,56,.26)', light = 'rgba(255,255,255,.10)', extra = '', ref = false, stroke } = {}) {
    const { w, h } = this;
    const id = this.gid('m');
    const d = `M${sil[0][0]} ${h}L${P(sil)}L${sil[sil.length - 1][0]} ${h}Z`;
    if (ref) this.def(`<path id="${id}" d="${d}"/>`);
    this.add(ref ? `<use href="#${id}" fill="${fill}"/>` : `<path d="${d}" fill="${fill}"${stroke ? ` stroke="${stroke}" stroke-width="1.2"` : ''}/>`);
    // snow caps
    if (snowY != null) {
      let i = 0;
      let s = '';
      while (i < sil.length) {
        if (sil[i][1] < snowY) {
          let j = i;
          while (j + 1 < sil.length && sil[j + 1][1] < snowY) j++;
          if (j - i >= 2) {
            const top = sil.slice(i, j + 1);
            const bot = [];
            for (let k = j; k >= i; k--) {
              const depth = (snowY - sil[k][1]) * 0.9;
              const zig = (k % 2 ? 1 : -1) * this.rnd(2, 9);
              bot.push([sil[k][0], Math.max(sil[k][1] + 2, sil[k][1] + Math.min(depth, 60) + zig)]);
            }
            s += `M${P(top)}L${P(bot)}Z`;
          }
          i = j + 1;
        } else i++;
      }
      if (s) this.add(`<path d="${s}" fill="${snow}"/>`);
    }
    // faceting
    if (facets) {
      let sh = '';
      let lt = '';
      const W = 8;
      for (let i = W; i < sil.length - W; i++) {
        let isPeak = true;
        for (let k = 1; k <= W; k++) if (sil[i][1] > sil[i - k][1] || sil[i][1] > sil[i + k][1]) { isPeak = false; break; }
        if (!isPeak) continue;
        let lo = i, hi = i;
        for (let k = Math.max(0, i - 40); k < Math.min(sil.length, i + 40); k++) lo = sil[k][1] > sil[lo][1] ? k : lo;
        if (sil[lo][1] - sil[i][1] < 28) continue;
        const a = sil[i];
        // right valley
        let j = i;
        while (j + 1 < sil.length && sil[j + 1][1] >= sil[j][1] - 1.5 && j - i < 45) j++;
        let q = i;
        while (q - 1 >= 0 && sil[q - 1][1] >= sil[q][1] - 1.5 && i - q < 45) q--;
        const vr = sil[j], vl = sil[q];
        const px = a.x ?? a[0];
        const ax = a[0], ay = a[1];
        const pj = [ax + (vr[0] - ax) * 0.16 + this.rnd(-3, 3), vr[1] + 50];
        const mj = [ax + (pj[0] - ax) * 0.55 + this.rnd(-7, 7), ay + (pj[1] - ay) * 0.5];
        sh += `M${P([a, ...sil.slice(i + 1, j + 1), [vr[0], vr[1] + 50], pj, mj])}Z`;
        const pl = [ax - (ax - vl[0]) * 0.1 + this.rnd(-3, 3), vl[1] + 50];
        lt += `M${P([a, ...sil.slice(q, i).reverse(), [vl[0], vl[1] + 50], pl, mj])}Z`;
        void px;
      }
      if (sh) this.add(`<path d="${sh}" fill="${shade}"/>`);
      if (lt) this.add(`<path d="${lt}" fill="${light}"/>`);
    }
    if (extra) this.add(extra);
    return id;
  }

  /* ---------- trees ---------- */
  forest({ y, x0 = 0, x1, n = 40, hmin = 14, hmax = 30, colors = ['#1d4a3c', '#26584a', '#173a31'], kind = 'pine', jitter = 8, ground }) {
    const { w, h } = this;
    x1 = x1 ?? w;
    const groups = colors.map(() => []);
    for (let i = 0; i < n; i++) {
      const x = x0 + (i + this.rnd(0, 1)) * ((x1 - x0) / n);
      const ty = y + this.rnd(-jitter, jitter);
      const s = this.rnd(hmin, hmax) / 30;
      groups[Math.floor(this.r() * colors.length)].push([n1(x), n1(ty), n1(s)]);
    }
    if (ground) this.add(`<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h - y}" fill="${ground}"/>`);
    colors.forEach((c, i) => {
      if (!groups[i].length) return;
      this.add(
        `<g fill="${c}">${groups[i]
          .sort((a, b) => a[1] - b[1])
          .map((t) => `<use href="#${kind}" transform="translate(${t[0]} ${t[1]}) scale(${t[2]})"/>`)
          .join('')}</g>`
      );
    });
    return this;
  }

  /* ---------- water ---------- */
  water(y, { c1 = '#3fc1c0', c2 = '#1d8d96', refs = [], refFill = [], ripples = 6, x0 = 0, x1, o = 0.4 } = {}) {
    const { w, h } = this;
    x1 = x1 ?? w;
    const cid = this.gid('c');
    this.def(`<clipPath id="${cid}"><rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h - y}"/></clipPath>`);
    this.add(`<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h - y}" fill="${this.lin([c1, c2])}"/>`);
    if (refs.length) {
      this.add(
        `<g clip-path="url(#${cid})" opacity="${o}">${refs
          .map((r, i) => `<use href="#${r}" fill="${refFill[i] || '#000'}" transform="translate(0 ${2 * y}) scale(1 -1)"/>`)
          .join('')}</g>`
      );
      this.add(`<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${(h - y) * 0.55}" fill="${this.lin([c1, c1 + '00'])}" opacity=".5"/>`);
    }
    let s = '';
    for (let i = 0; i < ripples; i++) {
      const rx = this.rnd(x0 + 10, x1 - 90);
      const ry = this.rnd(y + 6, h - 6);
      const rw = this.rnd(30, 90);
      s += `<path d="M${n1(rx)} ${n1(ry)}h${n1(rw)}" class="rip" style="animation-delay:-${n1(this.rnd(0, 6))}s"/>`;
    }
    this.add(`<g stroke="#fff" stroke-opacity=".38" stroke-width="1.4" stroke-linecap="round" fill="none">${s}</g>`);
    return this;
  }

  /* ---------- structures ---------- */
  skyline({ x0 = 0, x1, base, n = 22, hmin = 30, hmax = 120, colors = ['#47647d', '#3b566e', '#566f87'], win = '#ffe9a8', lit = 0.28, wmin = 14, wmax = 30 }) {
    const { w } = this;
    x1 = x1 ?? w;
    let x = x0;
    let s = '';
    let ws = '';
    while (x < x1) {
      const bw = this.rnd(wmin, wmax);
      const bh = this.rnd(hmin, hmax);
      const c = this.pick(colors);
      s += `<rect x="${n1(x)}" y="${n1(base - bh)}" width="${n1(bw)}" height="${n1(bh + 4)}" fill="${c}"/>`;
      if (this.r() < 0.25) s += `<rect x="${n1(x + bw * 0.3)}" y="${n1(base - bh - 7)}" width="${n1(bw * 0.4)}" height="8" fill="${c}"/>`;
      for (let yy = base - bh + 6; yy < base - 4; yy += 8)
        for (let xx = x + 3; xx < x + bw - 4; xx += 6) if (this.r() < lit) ws += `<rect x="${n1(xx)}" y="${n1(yy)}" width="2.6" height="3.6"/>`;
      x += bw + this.rnd(0, 3);
    }
    this.add(`<g>${s}</g><g fill="${win}" opacity=".85">${ws}</g>`);
    return this;
  }

  chateau({ x, y, w: bw = 220, h: bh = 64, wall = '#d9cdb4', roof = '#3f8a7a', win = '#f6dc9d' }) {
    let s = `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${wall}"/>`;
    const wings = Math.round(bw / 70);
    for (let i = 0; i < wings; i++) {
      const wx = x + (i + 0.5) * (bw / wings);
      const ww = bw / wings - 4;
      const hh = bh * (i % 2 ? 0.7 : 0.95);
      s += `<rect x="${n1(wx - ww / 2)}" y="${n1(y - hh * 0.45)}" width="${n1(ww)}" height="${n1(hh * 0.45 + 2)}" fill="${wall}"/>`;
      s += `<path d="M${n1(wx - ww / 2 - 5)} ${n1(y - hh * 0.45)}L${n1(wx)} ${n1(y - hh * 0.45 - hh * 0.65)}L${n1(wx + ww / 2 + 5)} ${n1(y - hh * 0.45)}Z" fill="${roof}"/>`;
    }
    s += `<path d="M${x - 6} ${y}L${x + bw / 2} ${y - 12}L${x + bw + 6} ${y}Z" fill="${roof}" opacity=".9"/>`;
    let ws = '';
    for (let yy = y + 8; yy < y + bh - 6; yy += 14) for (let xx = x + 8; xx < x + bw - 8; xx += 14) if (this.r() < 0.6) ws += `<rect x="${n1(xx)}" y="${n1(yy)}" width="5" height="7"/>`;
    this.add(`<g>${s}</g><g fill="${win}" opacity=".9">${ws}</g>`);
    return this;
  }

  totem(x, y, s = 1, colors = ['#b2362f', '#1f1f1f', '#2a8d8a', '#e9d8b0']) {
    let g = '';
    const seg = [0, 1, 2, 3, 4].map((i) => ({ y: -i * 22, c: colors[i % 4] }));
    seg.forEach((p, i) => {
      g += `<rect x="-9" y="${p.y - 22}" width="18" height="22" fill="${p.c}"/><circle cx="-4" cy="${p.y - 13}" r="2.2" fill="#fff"/><circle cx="4" cy="${p.y - 13}" r="2.2" fill="#fff"/><path d="M-5 ${p.y - 6}h10" stroke="#fff" stroke-width="2"/>`;
      if (i === 1 || i === 3) g += `<path d="M-9 ${p.y - 16}L-22 ${p.y - 12}L-9 ${p.y - 8}ZM9 ${p.y - 16}L22 ${p.y - 12}L9 ${p.y - 8}Z" fill="${colors[(i + 2) % 4]}"/>`;
    });
    g += `<path d="M-9 -110L0 -124L9 -110Z" fill="#1f1f1f"/>`;
    this.add(`<g transform="translate(${x} ${y}) scale(${s})">${g}</g>`);
    return this;
  }

  animal(id, x, y, s = 0.5, { fill = '#1c1f22', flip = false, cls = '' } = {}) {
    this.add(
      `<g class="${cls}" transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})" fill="${fill}" color="${fill}" style="color:${fill}"><use href="#${id}"/></g>`
    );
    return this;
  }

  svg({ label = '', cls = '', slice = true } = {}) {
    const { w, h } = this;
    return `<svg class="art ${cls}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid ${slice ? 'slice' : 'meet'}" role="img" aria-label="${label}"><defs>${this.defs.join('')}</defs>${this.out.join('')}</svg>`;
  }
}
