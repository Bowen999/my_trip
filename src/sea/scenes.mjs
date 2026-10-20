// Illustrations for the Singapore · Kuala Lumpur · Bali trip.
import { Scene, rng } from '../art.mjs';

const n1 = (n) => Math.round(n * 10) / 10;

export const SKY = {
  day: ['#3f9bdc', '#82cbec', '#fdeccb'],
  noon: ['#3b95d9', '#79c4ea', '#e6f3f1'],
  sunset: ['#29387a', '#a45a86', '#f19a62', '#fbd286'],
  dusk: ['#1c2a5e', '#5b4a8c', '#d9708a', '#f7b16a'],
  night: ['#050a1e', '#0e1a40', '#223c74'],
  haze: ['#8fbfd8', '#cfe5ea', '#f6efd9'],
};
const LEAF = ['#1f6f3c', '#2f8a47', '#17592f', '#3a9a52'];

/* ---------------- primitives ---------------- */
function palm(s, x, y, h = 90, lean = 14, k = 1, leaf = '#2f8a47', trunk = '#7a5636') {
  const tx = x + lean, ty = y - h;
  let g = `<path d="M${x} ${y}Q${n1(x + lean * 0.15)} ${n1(y - h * 0.55)} ${n1(tx)} ${n1(ty)}" stroke="${trunk}" stroke-width="${n1(5 * k)}" fill="none" stroke-linecap="round"/>`;
  const leafP = `M0 0C${16 * k} ${-18 * k} ${40 * k} ${-16 * k} ${62 * k} ${12 * k}C${40 * k} ${-4 * k} ${18 * k} ${-4 * k} 0 0Z`;
  const fr = [[-8, 0], [22, 0], [50, 0], [78, 0], [-8, 1], [22, 1], [50, 1], [78, 1]];
  fr.forEach(([a, m], i) => {
    g += `<path d="${leafP}" transform="translate(${n1(tx)} ${n1(ty)}) rotate(${m ? 180 - a : a}) ${m ? 'scale(1 -1)' : ''}" fill="${i % 2 ? leaf : '#27793f'}"/>`;
  });
  g += `<circle cx="${n1(tx - 2 * k)}" cy="${n1(ty + 4 * k)}" r="${n1(3 * k)}" fill="#5b3a1f"/><circle cx="${n1(tx + 3 * k)}" cy="${n1(ty + 5 * k)}" r="${n1(3 * k)}" fill="#6b4524"/>`;
  s.add(`<g class="sway-s">${g}</g>`);
}
function palms(s, list, o = {}) {
  list.forEach(([x, y, h, l, k]) => palm(s, x, y, h, l, k ?? 1, o.leaf, o.trunk));
}
function person(s, x, y, k = 1, c = '#d6453d') {
  s.add(`<g transform="translate(${x} ${y}) scale(${k})"><circle cx="0" cy="-9" r="2.6" fill="#f0c9a4"/><path d="M-3 -6h6l1 8h-8z" fill="${c}"/></g>`);
}
function people(s, pts, y, k = 1.3) {
  const cols = ['#d6453d', '#2c7bb6', '#e0a627', '#6aa84f', '#9b5de5', '#f28482'];
  pts.forEach((x, i) => person(s, x, y + (i % 3) * 3, k, cols[i % cols.length]));
}
function bird(s, x, y, k = 1) {
  s.add(`<path class="bird" d="M${x} ${y}q${6 * k} ${-6 * k} ${12 * k} 0q${6 * k} ${-6 * k} ${12 * k} 0" fill="none" stroke="#243447" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`);
}
function windows(s, x, y, w, h, c = '#ffe9a8', gap = 7, o = 0.8, lit = 0.4) {
  let o2 = '';
  for (let yy = y + 5; yy < y + h - 4; yy += gap) for (let xx = x + 3; xx < x + w - 4; xx += 6) if (s.r() < lit) o2 += `<rect x="${n1(xx)}" y="${n1(yy)}" width="2.4" height="3.2"/>`;
  s.add(`<g fill="${c}" opacity="${o}">${o2}</g>`);
}

function mbs(s, x, yB, k = 1, night = false) {
  const H = 120 * k, w = 22 * k;
  const glass = night ? '#2f4a78' : '#5d82ad';
  const d = night ? '#223a63' : '#486d98';
  s.add(`<path d="M${x} ${yB}L${x + w} ${yB}L${x + w + 8 * k} ${yB - H}L${x + 8 * k} ${yB - H}Z" fill="${glass}"/>`);
  s.add(`<path d="M${x + 30 * k} ${yB}L${x + 30 * k + w} ${yB}L${x + 30 * k + w} ${yB - H - 2 * k}L${x + 30 * k} ${yB - H - 2 * k}Z" fill="${d}"/>`);
  s.add(`<path d="M${x + 60 * k} ${yB}L${x + 60 * k + w} ${yB}L${x + 52 * k + w} ${yB - H}L${x + 52 * k} ${yB - H}Z" fill="${glass}"/>`);
  s.add(`<g stroke="rgba(255,255,255,.18)" stroke-width="${n1(0.8 * k)}">${[...Array(9)].map((_, i) => `<path d="M${x + 4 * k} ${yB - (i + 1) * 12 * k}h${20 * k}M${x + 30 * k} ${yB - (i + 1) * 12 * k}h${w}M${x + 58 * k} ${yB - (i + 1) * 12 * k}h${20 * k}"/>`).join('')}</g>`);
  // sky park
  s.add(`<path d="M${x - 10 * k} ${yB - H - 2 * k}L${x + 82 * k} ${yB - H - 4 * k}Q${x + 112 * k} ${yB - H - 10 * k} ${x + 98 * k} ${yB - H + 8 * k}L${x - 6 * k} ${yB - H + 6 * k}Z" fill="${night ? '#9fb3cf' : '#dbe4ee'}"/><path d="M${x + 8 * k} ${yB - H - 1 * k}h${70 * k}" stroke="#4ecdc4" stroke-width="${n1(2.2 * k)}"/>`);
  s.add(`<g fill="#3a7d44">${[...Array(7)].map((_, i) => `<circle cx="${n1(x + (12 + i * 11) * k)}" cy="${n1(yB - H - 6 * k)}" r="${n1(3 * k)}"/>`).join('')}</g>`);
}

function supertree(s, x, yB, h, k = 1, night = false) {
  const R = h * 0.46, yt = yB - h;
  s.add(`<path d="M${x - 5 * k} ${yB}L${x - 2.6 * k} ${yt}L${x + 2.6 * k} ${yt}L${x + 5 * k} ${yB}Z" fill="${night ? '#35454a' : '#6d7a73'}"/>`);
  s.add(`<g stroke="rgba(255,255,255,.15)" stroke-width="1">${[...Array(4)].map((_, i) => `<path d="M${x - 4 * k} ${yB - (i + 1) * h / 5}h${8 * k}"/>`).join('')}</g>`);
  s.add(`<path d="M${n1(x - R)} ${n1(yt + 4 * k)}Q${x} ${n1(yt - R * 0.62)} ${n1(x + R)} ${n1(yt + 4 * k)}Q${x} ${n1(yt + R * 0.22)} ${n1(x - R)} ${n1(yt + 4 * k)}Z" fill="${night ? '#2c7a5a' : '#2f9a56'}"/>`);
  s.add(`<path d="M${n1(x - R * 0.9)} ${n1(yt + 2 * k)}Q${x} ${n1(yt - R * 0.45)} ${n1(x + R * 0.9)} ${n1(yt + 2 * k)}" fill="none" stroke="${night ? '#f06fd0' : '#e66cc7'}" stroke-width="${n1(1.6 * k)}" stroke-dasharray="${n1(2 * k)} ${n1(5 * k)}"/>`);
  s.add(`<g fill="${night ? '#ff8ae0' : '#d6537d'}">${[...Array(7)].map((_, i) => `<circle cx="${n1(x - R * 0.8 + i * R * 0.27)}" cy="${n1(yt + 3 * k + (i % 2) * 3)}" r="${n1(1.6 * k)}"/>`).join('')}</g>`);
}

function dome(s, cx, yB, w, h, fill = 'rgba(214,236,244,.55)', stroke = 'rgba(255,255,255,.7)') {
  s.add(`<path d="M${cx - w / 2} ${yB}A${w / 2} ${h} 0 0 1 ${cx + w / 2} ${yB}Z" fill="${fill}"/>`);
  let ribs = '';
  for (let i = 1; i < 8; i++) {
    const t = i / 8, xx = cx - w / 2 + w * t;
    ribs += `<path d="M${n1(xx)} ${yB}Q${n1(cx + (xx - cx) * 0.25)} ${n1(yB - h * 1.15)} ${cx} ${n1(yB - h)}"/>`;
  }
  for (let j = 1; j < 4; j++) ribs += `<path d="M${n1(cx - (w / 2) * (1 - j * 0.22))} ${n1(yB - h * j * 0.25)}Q${cx} ${n1(yB - h * j * 0.25 - 6)} ${n1(cx + (w / 2) * (1 - j * 0.22))} ${n1(yB - h * j * 0.25)}"/>`;
  s.add(`<g fill="none" stroke="${stroke}" stroke-width="1">${ribs}</g>`);
}

function petronas(s, cx, yB, k = 1, night = false) {
  const body = night ? '#8fa5c4' : '#c6d3e0';
  const dark = night ? '#5f7596' : '#9fb1c6';
  const lv = [[40, 42], [35, 40], [31, 34], [27, 30], [22, 26], [17, 22], [11, 14]];
  const tower = (x) => {
    let y = yB, g = '';
    lv.forEach(([w, h]) => {
      g += `<rect x="${n1(x - (w * k) / 2)}" y="${n1(y - h * k)}" width="${n1(w * k)}" height="${n1(h * k + 1)}" fill="${body}"/><rect x="${n1(x)}" y="${n1(y - h * k)}" width="${n1((w * k) / 2)}" height="${n1(h * k + 1)}" fill="${dark}"/>`;
      g += `<path d="M${n1(x - (w * k) / 2)} ${n1(y - (h * k) / 2)}h${n1(w * k)}" stroke="rgba(40,60,90,.25)" stroke-width="${n1(0.8 * k)}"/>`;
      y -= h * k;
    });
    g += `<path d="M${n1(x)} ${n1(y)}V${n1(y - 38 * k)}" stroke="${body}" stroke-width="${n1(2.6 * k)}"/><circle cx="${n1(x)}" cy="${n1(y - 38 * k)}" r="${n1(2 * k)}" fill="${body}"/>`;
    return g;
  };
  const dx = 31 * k;
  s.add(`<g>${tower(cx - dx)}${tower(cx + dx)}</g>`);
  // skybridge
  const by = yB - 96 * k;
  s.add(`<path d="M${n1(cx - dx + 14 * k)} ${n1(by)}H${n1(cx + dx - 14 * k)}M${n1(cx - dx + 14 * k)} ${n1(by + 10 * k)}L${n1(cx)} ${n1(by)}L${n1(cx + dx - 14 * k)} ${n1(by + 10 * k)}" stroke="${dark}" stroke-width="${n1(2.4 * k)}" fill="none"/>`);
  if (night) {
    const lit = [];
    for (let i = 0; i < 26; i++) lit.push(`<rect x="${n1(cx - dx - 12 * k + s.rnd(0, 24) * k)}" y="${n1(yB - s.rnd(10, 190) * k)}" width="${n1(2 * k)}" height="${n1(3 * k)}"/><rect x="${n1(cx + dx - 12 * k + s.rnd(0, 24) * k)}" y="${n1(yB - s.rnd(10, 190) * k)}" width="${n1(2 * k)}" height="${n1(3 * k)}"/>`);
    s.add(`<g fill="#ffe7a0" opacity=".9">${lit.join('')}</g>`);
  }
}

function klTower(s, x, yB, h, k = 1) {
  s.add(`<path d="M${x - 3.2 * k} ${yB}L${x - 1.6 * k} ${yB - h * 0.62}L${x + 1.6 * k} ${yB - h * 0.62}L${x + 3.2 * k} ${yB}Z" fill="#aab4c2"/>`);
  s.add(`<ellipse cx="${x}" cy="${yB - h * 0.66}" rx="${9 * k}" ry="${6 * k}" fill="#c9d3df"/><rect x="${x - 6 * k}" y="${yB - h * 0.66 - 2 * k}" width="${12 * k}" height="${3 * k}" fill="#6a7d94"/>`);
  s.add(`<path d="M${x} ${yB - h * 0.72}V${yB - h}" stroke="#aab4c2" stroke-width="${n1(1.4 * k)}"/>`);
}

function shophouse(s, x, yB, w, h, col, trim = '#fff4dd') {
  let g = `<rect x="${x}" y="${yB - h}" width="${w}" height="${h}" fill="${col}"/><path d="M${x - 2} ${yB - h}L${x + w / 2} ${yB - h - 10}L${x + w + 2} ${yB - h}Z" fill="rgba(0,0,0,.18)"/>`;
  g += `<rect x="${x}" y="${yB - h}" width="${w}" height="4" fill="${trim}"/>`;
  const floors = Math.max(2, Math.floor(h / 30));
  for (let f = 0; f < floors; f++) {
    const fy = yB - h + 10 + f * ((h - 22) / floors);
    for (let i = 0; i < 2; i++) {
      const wx = x + w * (0.2 + i * 0.4);
      g += `<rect x="${n1(wx)}" y="${n1(fy)}" width="${n1(w * 0.2)}" height="${n1(((h - 22) / floors) * 0.7)}" rx="${n1(w * 0.1)}" fill="#fff4dd"/><path d="M${n1(wx)} ${n1(fy + 4)}h${n1(w * 0.2)}M${n1(wx)} ${n1(fy + 9)}h${n1(w * 0.2)}" stroke="${col}" stroke-width="1.3"/>`;
    }
  }
  g += `<rect x="${n1(x + w * 0.35)}" y="${yB - 22}" width="${n1(w * 0.3)}" height="22" rx="${n1(w * 0.15)}" fill="#6b4a37"/>`;
  s.add(g);
}
function lantern(s, x, y, r = 5) {
  s.add(`<g><path d="M${x} ${y - r * 2}V${y - r}" stroke="#8a6a3a"/><ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 1.15}" fill="#d62d2d"/><rect x="${x - r * 0.4}" y="${y - r * 1.2}" width="${r * 0.8}" height="${r * 0.4}" fill="#e8b53c"/><path d="M${x} ${y + r * 1.1}v${r * 0.9}" stroke="#e8b53c" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="${r * 2.4}" fill="${s.rad('#ffb04a', 0.35)}"/></g>`);
}

function candi(s, cx, yB, k = 1, gap = 14, col = '#8e8272', dark = '#6f6559') {
  const h = 92 * k, w = 46 * k;
  const half = (sgn) => {
    const pts = [[0, 0], [w, 0], [w, -0.22 * h], [w * 0.84, -0.22 * h], [w * 0.84, -0.46 * h], [w * 0.62, -0.46 * h], [w * 0.62, -0.7 * h], [w * 0.36, -0.7 * h], [w * 0.36, -h], [0, -h]];
    return pts.map(([a, b]) => `${n1(cx + sgn * (gap * k + a))} ${n1(yB + b)}`).join('L');
  };
  s.add(`<path d="M${half(-1)}Z" fill="${col}"/><path d="M${half(1)}Z" fill="${dark}"/>`);
  s.add(`<g stroke="rgba(0,0,0,.18)" stroke-width="1">${[0.22, 0.46, 0.7].map((t) => `<path d="M${n1(cx - gap * k - w)} ${n1(yB - t * h)}h${n1(w)}M${n1(cx + gap * k)} ${n1(yB - t * h)}h${n1(w)}"/>`).join('')}</g>`);
}

function meru(s, x, yB, k = 1, tiers = 3) {
  let g = `<rect x="${x - 7 * k}" y="${yB - 16 * k}" width="${14 * k}" height="${16 * k}" fill="#6c5b4c"/>`;
  for (let i = 0; i < tiers; i++) {
    const w = (30 - i * 7) * k, y = yB - 16 * k - i * 12 * k;
    g += `<path d="M${x - w / 2} ${y}L${x - w / 2 + 3 * k} ${y - 11 * k}H${x + w / 2 - 3 * k}L${x + w / 2} ${y}Z" fill="#2b2420"/><path d="M${x - w / 2} ${y}h${w}" stroke="#4a3d34" stroke-width="${n1(2 * k)}"/>`;
  }
  g += `<path d="M${x} ${yB - 16 * k - tiers * 12 * k}v${-8 * k}" stroke="#2b2420" stroke-width="${n1(1.6 * k)}"/>`;
  s.add(g);
}

function cliff(s, x0, x1, yTop, yBot, col = '#d9c7a4', dark = '#b49b72', jag = 10) {
  const pts = [];
  const n = 14;
  for (let i = 0; i <= n; i++) pts.push([x0 + (x1 - x0) * (i / n), yTop + s.rnd(-jag, jag)]);
  const d = `M${x0} ${yBot}L${pts.map((p) => `${n1(p[0])} ${n1(p[1])}`).join('L')}L${x1} ${yBot}Z`;
  s.add(`<path d="${d}" fill="${col}"/>`);
  let st = '';
  for (let i = 0; i < 5; i++) {
    const yy = yTop + 30 + i * ((yBot - yTop - 30) / 5);
    st += `<path d="M${x0} ${n1(yy)}Q${n1((x0 + x1) / 2)} ${n1(yy + s.rnd(-8, 8))} ${x1} ${n1(yy + s.rnd(-6, 6))}" />`;
  }
  s.add(`<g fill="none" stroke="${dark}" stroke-width="2" opacity=".55">${st}</g>`);
  s.add(`<path d="M${n1(x0 + (x1 - x0) * 0.55)} ${yBot}L${n1(x0 + (x1 - x0) * 0.62)} ${n1(yTop + 14)}L${x1} ${n1(yTop)}V${yBot}Z" fill="rgba(60,40,10,.2)"/>`);
}
function sea(s, y, c1 = '#2fb1c4', c2 = '#126f94', glow = null) {
  const { w, h } = s;
  s.add(`<rect x="0" y="${y}" width="${w}" height="${h - y}" fill="${s.lin([c1, c2])}"/>`);
  if (glow) s.add(`<ellipse cx="${glow.x}" cy="${y + 8}" rx="${glow.rx || 120}" ry="${glow.ry || 16}" fill="${glow.c}" opacity=".5" />`);
  let r = '';
  for (let i = 0; i < 12; i++) r += `<path d="M${n1(s.rnd(0, w - 90))} ${n1(s.rnd(y + 6, h - 6))}h${n1(s.rnd(30, 90))}" class="rip" style="animation-delay:-${n1(s.rnd(0, 6))}s"/>`;
  s.add(`<g stroke="#fff" stroke-opacity=".35" stroke-width="1.4" stroke-linecap="round" fill="none">${r}</g>`);
}
function reflect(s, x, y, w, h, c, o = 0.25) {
  s.add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}" opacity="${o}" class="rip"/>`);
}

/* ================================================================== */
export const scenes = {};

/* ---------- hero: Singapore → Kuala Lumpur → Bali ---------- */
scenes.hero = (uid = '') => {
  const s = new Scene(uid + 'hero', { w: 1600, h: 760, seed: 301 });
  s.add('<g class="px" data-s="0.45">');
  s.sky(SKY.sunset, { sun: { x: 1330, y: 400, r: 46, c: '#fff1c4', glow: '#ffb864' } });
  s.cloud(260, 150, 1.6, { cls: 'cl cl1', c: '#ffd9c2', o: 0.8 }).cloud(740, 110, 1.2, { cls: 'cl cl2', c: '#ffc7b0', o: 0.75 }).cloud(1100, 190, 1.8, { cls: 'cl cl3', c: '#ffd0b4', o: 0.8 }).cloud(1480, 120, 1.1, { cls: 'cl cl1', c: '#ffd9c2', o: 0.7 });
  s.add('</g>');
  bird(s, 560, 200, 1.4); bird(s, 590, 218, 1); bird(s, 980, 150, 1.2);
  // far haze hills
  s.add('<g class="px" data-s="0.3">');
  s.add(`<path d="M0 560Q120 500 260 540T520 520T800 548T1100 510T1400 540T1600 520V760H0Z" fill="#b48aa0" opacity=".7"/>`);
  s.add('</g>');
  // Singapore
  s.add('<g class="px" data-s="0.2">');
  s.skyline({ x0: 20, x1: 520, base: 600, hmin: 40, hmax: 150, colors: ['#6b4d7e', '#5d4472', '#7a5a8a'], win: '#ffd98a', lit: 0.3, wmin: 14, wmax: 28 });
  mbs(s, 200, 600, 1.25, true);
  [[90, 120, 1.1], [138, 160, 1.3], [350, 140, 1.2], [410, 110, 1], [450, 150, 1.2]].forEach(([x, h, k]) => supertree(s, x, 600, h, k, true));
  // KL
  s.skyline({ x0: 560, x1: 940, base: 610, hmin: 30, hmax: 110, colors: ['#5a4670', '#4e3d66', '#654e7a'], win: '#ffd98a', lit: 0.3, wmin: 14, wmax: 26 });
  klTower(s, 700, 610, 250, 1.4);
  petronas(s, 810, 610, 1.15, true);
  s.add('</g>');
  // Bali cliff + sea
  s.add('<g class="px" data-s="0.12">');
  cliff(s, 1090, 1600, 470, 780, '#e3cfa6', '#b99d6c', 12);
  candi(s, 1280, 470, 0.9);
  meru(s, 1400, 468, 1.1, 3); meru(s, 1470, 468, 0.9, 2);
  s.add('</g>');
  s.add('<g>');
  sea(s, 616, '#e68aa0', '#3a3f7e', { x: 1330, c: '#ffd27a', rx: 200, ry: 22 });
  s.add('</g>');
  s.add('<g class="px" data-s="0">');
  palms(s, [[60, 770, 190, 16, 1.5], [150, 790, 150, 10, 1.2], [1500, 780, 210, -18, 1.6], [1570, 790, 160, -10, 1.3], [1000, 790, 170, 12, 1.3]], { leaf: '#1d5f34', trunk: '#4a3322' });
  s.add(`<path d="M0 760Q300 726 700 752T1600 740V780H0Z" fill="#1c3a34"/>`);
  s.add('</g>');
  return s.svg({ label: '新加坡、吉隆坡到巴厘岛的黄昏全景插画', cls: 'hero-art' });
};

/* ---------- Singapore ---------- */
scenes.jewel = (uid = '') => {
  const s = new Scene(uid + 'jewel', { seed: 311 });
  s.add(`<rect width="800" height="450" fill="${s.lin(['#e8f6f4', '#cfeae6', '#a9d6c8'])}"/>`);
  // dome glass lattice
  s.add(`<path d="M0 0H800V70Q400 150 0 70Z" fill="rgba(255,255,255,.55)"/>`);
  let lat = '';
  for (let i = -10; i < 20; i++) lat += `<path d="M${i * 60} 0L${i * 60 + 160} 100"/><path d="M${i * 60 + 160} 0L${i * 60} 100"/>`;
  s.add(`<g stroke="rgba(120,160,160,.45)" stroke-width="1.2" fill="none" clip-path="url(#${uid}jc)">${lat}</g>`);
  s.def(`<clipPath id="${uid}jc"><path d="M0 0H800V70Q400 150 0 70Z"/></clipPath>`);
  // greenery terraces
  s.add(`<path d="M0 450V250Q120 200 240 240Q320 270 330 450Z" fill="#2c7a4b"/><path d="M800 450V240Q690 190 570 240Q490 270 470 450Z" fill="#2c7a4b"/>`);
  s.forest({ y: 262, x0: 0, x1: 330, n: 14, hmin: 40, hmax: 80, colors: ['#1f6b3d', '#2f8a47', '#17592f'], kind: 'leafy', jitter: 18 });
  s.forest({ y: 262, x0: 470, x1: 800, n: 14, hmin: 40, hmax: 80, colors: ['#1f6b3d', '#2f8a47', '#17592f'], kind: 'leafy', jitter: 18 });
  // waterfall (Rain Vortex)
  s.add(`<ellipse cx="400" cy="116" rx="46" ry="12" fill="#3d6f6a"/>`);
  s.add(`<path d="M360 118H440L452 420H348Z" fill="${s.lin(['#ffffff', '#d6efff'])}" opacity=".95"/>`);
  s.add(`<g stroke="#bfe0f5" stroke-width="2.4" fill="none">${[372, 388, 404, 420, 434].map((x, i) => `<path d="M${x} 120V${410 - (i % 2) * 8}" class="fall" style="animation-delay:-${i * 0.3}s"/>`).join('')}</g>`);
  s.add(`<ellipse cx="400" cy="428" rx="110" ry="20" fill="#8fd1e6"/><ellipse cx="400" cy="420" rx="70" ry="12" fill="#fff" opacity=".6" class="cl cl2"/>`);
  palms(s, [[262, 420, 120, 8, 1.2], [540, 420, 130, -10, 1.3], [90, 430, 110, 6, 1.1], [730, 430, 120, -6, 1.2]], { leaf: '#2f8a47' });
  people(s, [300, 330, 470, 510, 560], 436, 1.4);
  return s.svg({ label: '星耀樟宜的雨漩涡室内瀑布' });
};

scenes.gardens = (uid = '') => {
  const s = new Scene(uid + 'gardens', { seed: 312 });
  s.sky(SKY.noon, { sun: { x: 90, y: 80, r: 22, c: '#fff6d0' } });
  s.cloud(420, 70, 1.2, { cls: 'cl cl1' }).cloud(680, 120, 0.9, { cls: 'cl cl2', o: 0.8 });
  s.skyline({ x0: 0, x1: 800, base: 300, hmin: 30, hmax: 90, colors: ['#9db5cf', '#8aa4c2', '#aabdd4'], win: '#fff', lit: 0.12, wmin: 12, wmax: 24 });
  mbs(s, 560, 300, 0.8);
  dome(s, 150, 330, 190, 56);
  dome(s, 300, 332, 130, 42, 'rgba(210,240,230,.55)');
  s.add(`<rect x="0" y="330" width="800" height="120" fill="${s.lin(['#6fbf73', '#3f8f4f'])}"/>`);
  // skyway between two big supertrees
  s.add(`<path d="M452 168L610 190" stroke="#3a3a3a" stroke-width="4"/><path d="M452 172L610 194" stroke="#9aa" stroke-width="1.5"/>`);
  [[440, 330, 175, 1.5], [620, 330, 195, 1.6], [350, 340, 120, 1.2], [520, 345, 110, 1.1], [700, 345, 130, 1.2], [260, 346, 90, 1]].sort((a, b) => a[1] - b[1]).forEach(([x, y, h, k]) => supertree(s, x, y, h, k));
  s.add(`<path d="M0 450V392Q200 372 400 392T800 380V450Z" fill="#2f7d45"/>`);
  s.add(`<path d="M0 420Q260 402 540 418T800 410V450H0Z" fill="#cfe9d1" opacity=".25"/>`);
  palms(s, [[60, 440, 100, 6, 1.2], [740, 444, 110, -8, 1.3]]);
  people(s, [300, 330, 360, 520, 560], 428, 1.4);
  return s.svg({ label: '滨海湾花园的擎天树与花穹' });
};

scenes.marina = (uid = '') => {
  const s = new Scene(uid + 'marina', { seed: 313 });
  s.sky(SKY.dusk, { stars: 20 });
  s.skyline({ x0: 0, x1: 380, base: 300, hmin: 40, hmax: 130, colors: ['#3a3568', '#332f60', '#443e74'], win: '#ffd98a', lit: 0.35, wmin: 14, wmax: 26 });
  mbs(s, 470, 300, 1.15, true);
  // ArtScience museum lotus
  s.add(`<g fill="#e9e4f0"><path d="M360 300Q350 262 372 238Q376 270 384 300Z"/><path d="M384 300Q380 252 408 228Q404 268 400 300Z"/><path d="M400 300Q412 256 440 240Q428 276 420 300Z"/></g>`);
  s.water ? 0 : 0;
  s.add(`<rect x="0" y="300" width="800" height="150" fill="${s.lin(['#4a3e82', '#1c1a4a'])}"/>`);
  // reflections
  reflect(s, 470, 306, 110, 80, '#6c7fbf', 0.25);
  reflect(s, 0, 306, 380, 40, '#7a63a8', 0.2);
  // Spectra lasers
  const beams = [['#ff4fd8', -60], ['#4ff0ff', -30], ['#ffe84f', 0], ['#7dff6a', 30], ['#ff7a4f', 60]];
  s.add(`<g style="mix-blend-mode:screen" class="beam">${beams.map(([c, a]) => `<path d="M420 360L${n1(420 + a * 5)} 20" stroke="${c}" stroke-width="3" opacity=".6"/>`).join('')}<circle cx="420" cy="360" r="38" fill="${s.rad('#ffffff', 0.55)}"/></g>`);
  // merlion
  s.add(`<g transform="translate(140 394)"><path d="M0 0Q-8 -30 2 -52Q10 -62 24 -58L30 -46Q18 -40 22 -20Q24 -6 20 0Z" fill="#eee8e0"/><circle cx="22" cy="-52" r="3" fill="#333"/><path d="M26 -50Q50 -44 66 -30" stroke="#b9e3f6" stroke-width="4" fill="none" class="rip"/><path d="M-6 0Q-16 8 6 10T30 6V0Z" fill="#d9d2c8"/></g>`);
  s.add(`<rect x="0" y="414" width="800" height="36" fill="#14133a"/>`);
  people(s, [60, 90, 230, 260, 600, 640, 700], 424, 1.5);
  return s.svg({ label: '滨海湾夜景与 Spectra 灯光水舞秀' });
};

scenes.chinatown = (uid = '') => {
  const s = new Scene(uid + 'chinatown', { seed: 314 });
  s.sky(SKY.haze);
  s.skyline({ x0: 0, x1: 800, base: 250, hmin: 40, hmax: 120, colors: ['#9fb1c4', '#93a7bd', '#aebfd0'], win: '#fff', lit: 0.1, wmin: 20, wmax: 40 });
  const cols = ['#f2c94c', '#f28b82', '#8ecae6', '#b5e48c', '#ffd6a5', '#cdb4db', '#ffadad'];
  let x = -10, i = 0;
  while (x < 810) {
    const w = 52 + (i % 3) * 8, h = 92 + ((i * 17) % 40);
    shophouse(s, x, 392, w, h, cols[i % cols.length]);
    x += w + 2; i++;
  }
  // lantern strings
  for (let k = 0; k < 14; k++) lantern(s, 30 + k * 56, 160 + Math.sin(k) * 14 + 40, 6.5);
  s.add(`<path d="M0 392H800V450H0Z" fill="#c9bfae"/><path d="M0 410H800" stroke="#a89f8e" stroke-width="2"/>`);
  people(s, [120, 180, 300, 340, 520, 600, 690], 430, 1.6);
  s.add(`<g transform="translate(404 384)"><rect x="-2" y="-52" width="4" height="52" fill="#6b4a37"/><path d="M-22 -52h44l-6 20h-32z" fill="#d62d2d"/><text x="0" y="-38" text-anchor="middle" font-size="12" font-weight="700" fill="#ffe08a" font-family="serif">福</text></g>`);
  return s.svg({ label: '牛车水老店屋与红灯笼' });
};

/* ---------- Kuala Lumpur / Negeri Sembilan ---------- */
scenes.klcc = (uid = '') => {
  const s = new Scene(uid + 'klcc', { seed: 321 });
  s.sky(SKY.night, { stars: 70, moon: { x: 90, y: 70, r: 14 } });
  s.skyline({ x0: 0, x1: 800, base: 330, hmin: 30, hmax: 120, colors: ['#1d2a52', '#18244a', '#223260'], win: '#ffd98a', lit: 0.35, wmin: 14, wmax: 28 });
  klTower(s, 640, 330, 230, 1.3);
  petronas(s, 360, 345, 1.45, true);
  s.add(`<rect x="0" y="345" width="800" height="105" fill="${s.lin(['#142146', '#0b1230'])}"/>`);
  s.add(`<path d="M0 360H800" stroke="#2c3d6e" stroke-width="2"/>`);
  reflect(s, 280, 350, 160, 70, '#9fb5da', 0.16);
  // fountain
  s.add(`<g fill="none" stroke="#bfe3ff" stroke-width="2" opacity=".75">${[-80, -50, -20, 20, 50, 80].map((d) => `<path d="M${360 + d} 392Q${360 + d * 0.5} ${360 - Math.abs(d) * 0.3} ${360} 392" class="rip"/>`).join('')}</g>`);
  palms(s, [[70, 440, 130, 8, 1.4], [730, 444, 140, -8, 1.5], [180, 446, 100, 6, 1.1]], { leaf: '#17482c', trunk: '#3a2a1c' });
  people(s, [300, 330, 420, 450], 428, 1.5);
  return s.svg({ label: '吉隆坡双子塔夜景', cls: 'night' });
};

function school(id, seed, kind) {
  return (uid = '') => {
    const s = new Scene(uid + id, { seed });
    if (kind === 'epsom') {
      s.sky(SKY.noon, { sun: { x: 700, y: 80, r: 22, c: '#fff6d0' } });
      s.cloud(180, 70, 1.2, { cls: 'cl cl1' }).cloud(520, 110, 0.9, { cls: 'cl cl2', o: 0.8 });
      s.forest({ y: 290, x0: 0, x1: 800, n: 40, hmin: 40, hmax: 80, colors: ['#2d7a47', '#3b8f55', '#215f39'], kind: 'leafy', jitter: 10 });
      // main block
      s.add(`<rect x="230" y="210" width="340" height="110" fill="#a8503c"/><rect x="230" y="210" width="340" height="10" fill="#efe4d0"/>`);
      s.add(`<rect x="130" y="240" width="110" height="80" fill="#9d4a38"/><rect x="560" y="240" width="110" height="80" fill="#9d4a38"/><rect x="130" y="240" width="110" height="7" fill="#efe4d0"/><rect x="560" y="240" width="110" height="7" fill="#efe4d0"/>`);
      let win = '';
      for (let yy = 226; yy < 310; yy += 28) for (let xx = 242; xx < 560; xx += 28) win += `<rect x="${xx}" y="${yy}" width="14" height="20" fill="#f6f0e2"/><path d="M${xx + 7} ${yy}V${yy + 20}M${xx} ${yy + 10}H${xx + 14}" stroke="#a8503c" stroke-width="1.2"/>`;
      for (let yy = 252; yy < 310; yy += 26) for (let xx = 142; xx < 240; xx += 24) win += `<rect x="${xx}" y="${yy}" width="12" height="16" fill="#f6f0e2"/><rect x="${xx + 430}" y="${yy}" width="12" height="16" fill="#f6f0e2"/>`;
      s.add(win);
      // portico + pediment
      s.add(`<path d="M340 214L400 168L460 214Z" fill="#f2ead8"/><circle cx="400" cy="200" r="8" fill="#c9bfa8"/><rect x="340" y="214" width="120" height="106" fill="#efe4d0"/>`);
      s.add(`<g fill="#fffaf0">${[352, 380, 408, 436].map((x) => `<rect x="${x}" y="222" width="8" height="98"/>`).join('')}</g><rect x="378" y="268" width="44" height="52" fill="#5a3a2c"/>`);
      // clock tower
      s.add(`<rect x="382" y="130" width="36" height="42" fill="#a8503c"/><circle cx="400" cy="152" r="11" fill="#fff6e0" stroke="#7a5a3a" stroke-width="2"/><path d="M400 152V145M400 152l5 3" stroke="#333" stroke-width="1.6"/><path d="M380 130Q400 98 420 130Z" fill="#3f7b8f"/><path d="M400 100V84" stroke="#555" stroke-width="2"/><path d="M400 86l8 3-8 3z" fill="#d6453d"/>`);
      s.add(`<rect x="0" y="320" width="800" height="130" fill="${s.lin(['#6fbf62', '#3f8f45'])}"/><path d="M360 450L396 320H404L440 450Z" fill="#d9cdb5"/>`);
      // pitch
      s.add(`<g stroke="#fff" stroke-width="2" fill="none" opacity=".75"><rect x="560" y="384" width="190" height="56" rx="3"/><path d="M655 384V440"/><circle cx="655" cy="412" r="12"/></g>`);
      people(s, [300, 330, 360, 460, 500], 436, 1.6);
      palms(s, [[60, 440, 120, 8, 1.3], [770, 330, 100, -8, 1.1]]);
    } else if (kind === 'adcote') {
      s.sky(SKY.noon, { sun: { x: 120, y: 80, r: 22, c: '#fff6d0' } });
      s.cloud(420, 80, 1.2, { cls: 'cl cl1' }).cloud(660, 60, 0.8, { cls: 'cl cl2', o: 0.8 });
      s.forest({ y: 300, x0: 0, x1: 800, n: 36, hmin: 40, hmax: 80, colors: ['#2d7a47', '#3b8f55', '#215f39'], kind: 'leafy', jitter: 10 });
      // modern blocks
      s.add(`<rect x="150" y="200" width="210" height="130" fill="#f4f6f8"/><rect x="150" y="200" width="210" height="8" fill="#e8743b"/>`);
      s.add(`<rect x="360" y="170" width="150" height="160" fill="#eef1f4"/><rect x="360" y="170" width="150" height="8" fill="#2fa8a0"/>`);
      s.add(`<rect x="510" y="214" width="150" height="116" fill="#f7f8fa"/><rect x="510" y="214" width="150" height="8" fill="#e8743b"/>`);
      let gl = '';
      for (let yy = 218; yy < 320; yy += 30) {
        gl += `<rect x="162" y="${yy}" width="186" height="20" fill="#7fc3d9" opacity=".7"/><rect x="522" y="${yy + 12}" width="126" height="18" fill="#7fc3d9" opacity=".7"/>`;
      }
      for (let yy = 190; yy < 320; yy += 30) gl += `<rect x="372" y="${yy}" width="126" height="20" fill="#7fc3d9" opacity=".75"/>`;
      s.add(gl);
      s.add(`<rect x="388" y="226" width="40" height="104" fill="#e8743b" opacity=".92"/>`);
      s.add(`<path d="M110 330H700" stroke="#d6dde3" stroke-width="10"/><path d="M130 330V292M330 330V292M530 330V292M690 330V292" stroke="#cdd5db" stroke-width="3"/><rect x="120" y="288" width="580" height="6" fill="#e8743b"/>`);
      s.add(`<rect x="0" y="330" width="800" height="120" fill="${s.lin(['#6fbf62', '#3f8f45'])}"/>`);
      // flags
      [60, 78, 96].forEach((x, i) => s.add(`<path d="M${x} 360V250" stroke="#999" stroke-width="2"/><rect x="${x}" y="252" width="22" height="14" fill="${['#d6453d', '#2c7bb6', '#f2c94c'][i]}"/>`));
      s.add(`<path d="M300 450Q400 392 520 450Z" fill="#d9cdb5"/>`);
      people(s, [280, 320, 360, 560, 600, 640], 436, 1.6);
      palms(s, [[740, 440, 130, -8, 1.3], [40, 440, 110, 8, 1.2]]);
    } else {
      // KTJ: hills, low roofs, big field
      s.sky(SKY.day, { sun: { x: 680, y: 90, r: 22, c: '#fff6d0' } });
      s.cloud(200, 80, 1.3, { cls: 'cl cl1' }).cloud(560, 60, 0.9, { cls: 'cl cl2', o: 0.8 });
      const hl = s.hills({ base: 270, n: 5, hmin: 70, hmax: 130, wmin: 100, wmax: 180 });
      s.mountain(hl, { fill: '#6aa77a', facets: false });
      const hl2 = s.hills({ base: 290, n: 5, hmin: 40, hmax: 80, wmin: 90, wmax: 160 });
      s.mountain(hl2, { fill: '#3f8a58', facets: false });
      s.forest({ y: 296, x0: 0, x1: 800, n: 40, hmin: 40, hmax: 76, colors: ['#2d7a47', '#215f39', '#3b8f55'], kind: 'leafy', jitter: 8 });
      // long low buildings with red tile roofs
      const bldg = (x, w, h) => {
        s.add(`<rect x="${x}" y="${300 - h}" width="${w}" height="${h + 22}" fill="#f1e7d2"/><path d="M${x - 8} ${300 - h}L${x + 14} ${300 - h - 24}H${x + w - 14}L${x + w + 8} ${300 - h}Z" fill="#b5462f"/>`);
        let g = '';
        for (let xx = x + 8; xx < x + w - 10; xx += 20) g += `<rect x="${xx}" y="${300 - h + 12}" width="10" height="16" fill="#6aa3b8"/>`;
        s.add(g);
      };
      bldg(60, 230, 54); bldg(330, 150, 70); bldg(520, 220, 54);
      s.add(`<rect x="372" y="206" width="26" height="40" fill="#f1e7d2"/><path d="M366 206L385 180L404 206Z" fill="#b5462f"/><circle cx="385" cy="222" r="7" fill="#fff6e0" stroke="#7a5a3a" stroke-width="1.5"/>`);
      s.add(`<rect x="0" y="322" width="800" height="128" fill="${s.lin(['#6fbf62', '#3f8f45'])}"/>`);
      s.add(`<ellipse cx="400" cy="396" rx="250" ry="44" fill="#c9553a" opacity=".9"/><ellipse cx="400" cy="396" rx="196" ry="30" fill="#4aa05a"/><g stroke="#fff" stroke-width="2" fill="none" opacity=".7"><ellipse cx="400" cy="396" rx="236" ry="40"/><path d="M400 366V426"/></g>`);
      people(s, [140, 180, 640, 690], 440, 1.6);
      palms(s, [[30, 440, 130, 8, 1.3], [770, 440, 120, -8, 1.2]]);
    }
    return s.svg({ label: { epsom: 'Epsom College 校园示意', adcote: 'Adcote Matrix 校园示意', ktj: 'KTJ 校园示意' }[kind] });
  };
}
scenes.epsom = school('epsom', 322, 'epsom');
scenes.adcote = school('adcote', 323, 'adcote');
scenes.ktj = school('ktj', 324, 'ktj');

scenes.seremban = (uid = '') => {
  const s = new Scene(uid + 'seremban', { seed: 325 });
  s.sky(SKY.day, { sun: { x: 90, y: 80, r: 22, c: '#fff6d0' } });
  s.cloud(330, 80, 1.2, { cls: 'cl cl1' }).cloud(620, 60, 0.9, { cls: 'cl cl2', o: 0.8 });
  const hl = s.hills({ base: 290, n: 5, hmin: 50, hmax: 110, wmin: 100, wmax: 180 });
  s.mountain(hl, { fill: '#79b184', facets: false });
  s.add(`<rect x="0" y="290" width="800" height="160" fill="${s.lin(['#9bd36a', '#5aa24a'])}"/>`);
  // paddy lines
  s.add(`<g stroke="#7bb34f" stroke-width="2" opacity=".6">${[...Array(7)].map((_, i) => `<path d="M0 ${320 + i * 18}Q400 ${312 + i * 18} 800 ${320 + i * 18}"/>`).join('')}</g>`);
  // rumah gadang: stilt house with horned roofs
  const house = (x, y, k) => {
    s.add(`<g transform="translate(${x} ${y}) scale(${k})">
      <g fill="#5a3a26">${[-86, -56, -26, 4, 34, 64, 90].map((a) => `<rect x="${a}" y="-4" width="6" height="30"/>`).join('')}</g>
      <rect x="-96" y="-60" width="200" height="58" fill="#7a4a2e"/>
      <g fill="#f2c94c" opacity=".9">${[-70, -30, 10, 50, 86].map((a) => `<rect x="${a}" y="-50" width="14" height="30" rx="2"/>`).join('')}</g>
      <g stroke="#c93c2a" stroke-width="2.4" fill="none"><path d="M-96 -44H104M-96 -12H104"/></g>
      <path d="M-110 -58C-112 -90 -116 -118 -100 -132C-70 -96 -30 -90 0 -92C30 -90 70 -96 100 -132C116 -118 112 -90 114 -58Z" fill="#2c211b"/>
      <path d="M-100 -132C-108 -118 -100 -116 -96 -108M100 -132C108 -118 100 -116 96 -108" stroke="#2c211b" stroke-width="4" fill="none"/>
      <path d="M-96 -88Q0 -66 96 -88M-90 -76Q0 -54 90 -76" stroke="#4a382c" stroke-width="2" fill="none"/>
      <path d="M-30 -92C-28 -110 -22 -120 -10 -126C10 -120 18 -110 22 -92Z" fill="#2c211b"/>
    </g>`);
  };
  house(420, 360, 1.5);
  palms(s, [[90, 380, 160, 10, 1.5], [180, 396, 120, 6, 1.2], [740, 390, 150, -12, 1.5], [660, 404, 110, -6, 1.1]], { leaf: '#2f8a47' });
  people(s, [250, 290, 560, 600], 430, 1.6);
  return s.svg({ label: '森美兰米南加保风格的木屋' });
};

/* ---------- Bali ---------- */
scenes.flight = (uid = '') => {
  const s = new Scene(uid + 'flight', { seed: 331 });
  s.sky(SKY.sunset, { sun: { x: 640, y: 290, r: 38, c: '#fff1c4', glow: '#ffb864' } });
  const layer = (y, c, o, seed) => {
    let g = '';
    for (let i = 0; i < 9; i++) {
      const x = i * 100 - 20 + ((seed * 37 + i * 53) % 40), r = 50 + ((seed + i * 29) % 40);
      g += `<ellipse cx="${x}" cy="${y + ((i * 13) % 18)}" rx="${r}" ry="${r * 0.22}"/>`;
    }
    s.add(`<g fill="${c}" opacity="${o}" class="cl cl2">${g}</g>`);
  };
  layer(300, '#ffc9a8', 0.8, 1); layer(350, '#f2a3a0', 0.85, 2); layer(405, '#b26a9a', 0.9, 3); layer(445, '#6d4a86', 0.95, 4);
  s.add(`<path d="M-20 214L380 190" stroke="#fff" stroke-width="3" opacity=".45" stroke-linecap="round"/><path d="M-20 224L370 200" stroke="#fff" stroke-width="2" opacity=".3" stroke-linecap="round"/>`);
  s.add(`<g class="bob" transform="translate(470 178) rotate(-4)"><g transform="scale(3.2)"><path fill="#fff" d="M19 8.5L-9 4.2 -11 7 -7 11 19 12 -7 13 -10 15 -9 17 -4 17 19 14.6 22 12.4C22 10 20.6 8.8 19 8.5z" transform="translate(-4 -12)" opacity="0"/><path fill="#fff" stroke="#e8d5d0" stroke-width=".4" d="M-14 0L9 -1.4C12 -1.6 14 -0.6 14 0S12 1.6 9 1.4L-14 0.8L-16 -3 -14 -3 -11.5 0Z M-3 -0.3L-9 -7 -6.5 -7 3 -0.3Z M-3 0.9L-9 7.6 -6.5 7.6 3 0.9Z"/></g></g>`);
  bird(s, 140, 120, 1.2); bird(s, 170, 135, 0.9);
  return s.svg({ label: '飞往巴厘岛的黄昏航班' });
};

scenes.uluwatu = (uid = '') => {
  const s = new Scene(uid + 'uluwatu', { seed: 332 });
  s.sky(SKY.sunset, { sun: { x: 250, y: 296, r: 34, c: '#fff1c4', glow: '#ffb864' }, stars: 0 });
  s.cloud(160, 100, 1.4, { cls: 'cl cl1', c: '#ffd0b8', o: 0.8 }).cloud(520, 70, 1.1, { cls: 'cl cl2', c: '#ffc3a8', o: 0.75 });
  sea(s, 300, '#e98a9c', '#33407e', { x: 250, c: '#ffd27a', rx: 150, ry: 16 });
  // waves + foam
  let fm = '';
  for (let i = 0; i < 14; i++) fm += `<ellipse cx="${n1(s.rnd(430, 780))}" cy="${n1(s.rnd(390, 446))}" rx="${n1(s.rnd(14, 36))}" ry="3" class="rip" style="animation-delay:-${n1(s.rnd(0, 5))}s"/>`;
  s.add(`<g fill="#fff" opacity=".7">${fm}</g>`);
  cliff(s, 440, 820, 160, 460, '#e6d2a8', '#b99d6c', 12);
  s.add(`<path d="M440 460Q470 420 520 436T620 452V460Z" fill="#fff" opacity=".6"/>`);
  // temple on cliff top
  s.add(`<rect x="470" y="156" width="330" height="10" fill="#6a5a46"/>`);
  candi(s, 540, 158, 0.55, 8);
  meru(s, 640, 158, 0.9, 3); meru(s, 690, 158, 0.75, 2); meru(s, 740, 158, 0.9, 3);
  palms(s, [[480, 160, 70, 6, 0.8], [780, 160, 80, -6, 0.9]], { leaf: '#1d5f34' });
  s.add(`<g fill="#2b2420">${[[600, 150], [616, 152], [716, 150]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="5" ry="3.4"/><circle cx="${x + 4}" cy="${y - 3}" r="2.2"/>`).join('')}</g>`);
  s.add(`<path d="M0 450V420Q120 396 240 424T440 440V450Z" fill="#2b2f5a" opacity=".85"/>`);
  return s.svg({ label: '乌鲁瓦图悬崖、海上落日与寺庙' });
};

scenes.tirtha = (uid = '') => {
  const s = new Scene(uid + 'tirtha', { seed: 333 });
  s.sky(SKY.sunset, { sun: { x: 560, y: 300, r: 34, c: '#fff1c4', glow: '#ffb864' } });
  s.cloud(160, 100, 1.4, { cls: 'cl cl1', c: '#ffd0b8', o: 0.8 }).cloud(430, 64, 1.0, { cls: 'cl cl2', c: '#ffc3a8', o: 0.75 });
  sea(s, 306, '#e98a9c', '#33407e', { x: 560, c: '#ffd27a', rx: 170, ry: 16 });
  // cliff on left with chapel jutting out
  s.add(`<path d="M0 450V300Q60 290 140 296L330 300L340 330Q330 400 360 450Z" fill="#c9b48a"/><path d="M0 330Q120 318 330 332M0 372Q120 362 340 372" stroke="#a48a5c" stroke-width="2" fill="none" opacity=".55"/>`);
  s.add(`<path d="M0 300Q60 290 140 296L330 300V320H0Z" fill="#6fae5a"/>`);
  // platform over the sea
  s.add(`<rect x="180" y="288" width="260" height="8" fill="#e9e1d2"/><path d="M180 296H440L420 304H200Z" fill="rgba(60,40,20,.25)"/>`);
  // glass A-frame chapel
  s.add(`<path d="M214 288L310 140L406 288Z" fill="rgba(222,242,250,.35)" stroke="#fff" stroke-width="3"/>`);
  let fr = '';
  for (let i = 1; i < 6; i++) fr += `<path d="M${n1(214 + i * 32)} 288L310 140"/>`;
  s.add(`<g stroke="rgba(255,255,255,.75)" stroke-width="1.6">${fr}<path d="M232 252H388M250 216H370M270 182H350"/></g>`);
  // aisle + chairs
  s.add(`<path d="M290 288L310 220L330 288Z" fill="#f6e8d0" opacity=".9"/>`);
  let ch = '';
  for (let r = 0; r < 4; r++) for (let side of [-1, 1]) ch += `<rect x="${n1(310 + side * (24 + r * 6) - 7)}" y="${280 - r * 20}" width="14" height="8" fill="#fffaf0"/>`;
  s.add(`<g>${ch}</g>`);
  s.add(`<path d="M300 220q10 -26 20 0z" fill="#f4a6c0"/><circle cx="310" cy="204" r="4" fill="#f4a6c0"/>`);
  // railing + lanterns
  s.add(`<path d="M180 288V268M440 288V268M180 270H440" stroke="#d9d0c0" stroke-width="2"/>`);
  lantern(s, 120, 270, 5); lantern(s, 150, 272, 5);
  palms(s, [[60, 308, 150, 10, 1.5], [110, 312, 110, 6, 1.2], [520, 440, 40, 0, 0.1]].slice(0, 2), { leaf: '#1d5f34' });
  // dining pavilion
  s.add(`<g transform="translate(70 308)"><rect x="0" y="-48" width="70" height="48" fill="#efe3cc"/><path d="M-6 -48L35 -76L76 -48Z" fill="#6b4a37"/><rect x="10" y="-36" width="14" height="30" fill="#ffd98a"/><rect x="46" y="-36" width="14" height="30" fill="#ffd98a"/></g>`);
  s.add(`<path d="M0 450V420Q140 398 300 428T520 440V450Z" fill="#2b2f5a" opacity=".85"/>`);
  return s.svg({ label: '悬崖玻璃教堂示意(Tirtha 风格)' });
};

scenes.alila = (uid = '') => {
  const s = new Scene(uid + 'alila', { seed: 334 });
  s.sky(SKY.sunset, { sun: { x: 610, y: 280, r: 34, c: '#fff1c4', glow: '#ffb864' } });
  s.cloud(180, 90, 1.3, { cls: 'cl cl1', c: '#ffd0b8', o: 0.8 }).cloud(470, 60, 1, { cls: 'cl cl2', c: '#ffc3a8', o: 0.75 });
  sea(s, 286, '#e98a9c', '#33407e', { x: 610, c: '#ffd27a', rx: 170, ry: 16 });
  // cliff terrace
  s.add(`<path d="M0 450V330Q200 316 420 322T800 320V450Z" fill="#cdb98f"/>`);
  s.add(`<rect x="0" y="314" width="800" height="12" fill="#e9dfc8"/>`);
  // infinity pool
  s.add(`<path d="M120 336L680 336L740 410H60Z" fill="${s.lin(['#7fd6dc', '#2a9fb0'])}"/><path d="M120 336L680 336" stroke="#fff" stroke-width="3" opacity=".8"/>`);
  s.add(`<path d="M300 346H520M260 366H560" stroke="#fff" stroke-opacity=".5" stroke-width="2" class="rip"/>`);
  // villas: flat roofs, lit glass
  const villa = (x, w) => {
    s.add(`<rect x="${x}" y="244" width="${w}" height="72" fill="#5c4a3a"/><rect x="${x - 10}" y="236" width="${w + 20}" height="10" fill="#3a2e24"/><rect x="${x + 8}" y="256" width="${w - 16}" height="52" fill="#ffd98a" opacity=".92"/><path d="M${x + w / 2} 256V308" stroke="#5c4a3a" stroke-width="3"/>`);
  };
  villa(70, 110); villa(620, 110);
  // loungers
  s.add(`<g fill="#fff6e8">${[300, 340, 380, 460, 500].map((x) => `<rect x="${x}" y="428" width="26" height="8" rx="2"/>`).join('')}</g>`);
  s.add(`<path d="M0 450V430Q200 418 400 436T800 430V450Z" fill="#2b2f5a" opacity=".8"/>`);
  palms(s, [[20, 330, 150, 10, 1.4], [780, 336, 160, -12, 1.5], [220, 330, 80, 4, 0.9]], { leaf: '#1d5f34' });
  return s.svg({ label: '悬崖无边际泳池与别墅(Alila 风格示意)' });
};

scenes.kecak = (uid = '') => {
  const s = new Scene(uid + 'kecak', { seed: 335 });
  s.sky(SKY.night, { stars: 90 });
  s.add(`<rect x="0" y="260" width="800" height="190" fill="#1a1020"/>`);
  candi(s, 400, 262, 1.0, 14, '#4a3f36', '#3a3029');
  meru(s, 140, 262, 1.2, 3); meru(s, 660, 262, 1.2, 3);
  s.add(`<ellipse cx="400" cy="372" rx="300" ry="60" fill="#2a1c22"/>`);
  // fire
  s.add(`<circle cx="400" cy="362" r="150" fill="${s.rad('#ff9a3c', 0.5)}"/>`);
  s.add(`<g class="flame"><path d="M400 372C380 352 388 330 400 300C412 330 420 352 400 372Z" fill="#ff8a1f"/><path d="M400 372C390 358 394 342 400 326C406 342 410 358 400 372Z" fill="#ffd54a"/></g>`);
  // dancers ring
  let d = '';
  const N = 26;
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2, x = 400 + Math.cos(a) * 190, y = 380 + Math.sin(a) * 40;
    const sc = 0.8 + (Math.sin(a) + 1) * 0.28;
    d += `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n1(sc)})"><circle cx="0" cy="-22" r="5" fill="#d8a47b"/><path d="M-7 -16h14l3 22h-20z" fill="#1d1d1d"/><path d="M-7 -14L-14 -28M7 -14L14 -28" stroke="#d8a47b" stroke-width="3" stroke-linecap="round"/><path d="M-9 6h18v6h-18z" fill="#f2f2f2"/></g>`;
  }
  s.add(`<g class="chant">${d}</g>`);
  s.add(`<g fill="${s.rad('#ffb04a', 0.6)}" opacity=".9">${[60, 120, 680, 740].map((x) => `<circle cx="${x}" cy="300" r="26"/>`).join('')}</g>`);
  return s.svg({ label: '乌鲁瓦图神庙的 Kecak 火舞', cls: 'night' });
};

scenes.jimbaran = (uid = '') => {
  const s = new Scene(uid + 'jimbaran', { seed: 336 });
  s.sky(SKY.dusk, { sun: { x: 480, y: 262, r: 30, c: '#ffe3a8', glow: '#ff9a6a' }, stars: 12 });
  sea(s, 262, '#d67a9a', '#2a3070', { x: 480, c: '#ffc27a', rx: 160, ry: 12 });
  s.add(`<path d="M0 450V330Q200 316 420 332T800 326V450Z" fill="#e6d3a8"/><path d="M0 346Q220 336 420 350T800 342" stroke="#fff" stroke-width="3" opacity=".6" fill="none" class="rip"/>`);
  // tables
  const table = (x, y, k) => {
    s.add(`<g transform="translate(${x} ${y}) scale(${k})"><rect x="-26" y="-2" width="52" height="5" fill="#8a5a36"/><path d="M-20 3V22M20 3V22" stroke="#6b4426" stroke-width="3"/><rect x="-26" y="-3" width="52" height="3" fill="#fff"/><g fill="#d6453d"><circle cx="-10" cy="-6" r="4"/><circle cx="8" cy="-6" r="4"/></g><rect x="-2" y="-14" width="4" height="10" fill="#fff"/><path d="M0 -20Q3 -15 0 -14Q-3 -15 0 -20Z" fill="#ffb347"/><circle cx="0" cy="-16" r="14" fill="${s.rad('#ffb04a', 0.5)}"/></g>`);
  };
  [[200, 392, 1.2], [330, 410, 1.4], [470, 396, 1.2], [610, 414, 1.5], [90, 420, 1.3], [720, 396, 1.2]].forEach(([x, y, k]) => table(x, y, k));
  people(s, [196, 214, 326, 348, 606, 632], 410, 1.5);
  // grill
  s.add(`<g transform="translate(400 340)"><rect x="-26" y="0" width="52" height="16" fill="#3a3a3a"/><path d="M-22 0Q0 -22 22 0" fill="#ff7a2f"/><g stroke="#8a6a3a" stroke-width="2"><path d="M-18 -4l36 0M-14 -9l28 0"/></g></g>`);
  palms(s, [[30, 340, 150, 10, 1.4], [770, 336, 160, -12, 1.5]], { leaf: '#1d5f34', trunk: '#3a2a1c' });
  return s.svg({ label: '金巴兰海滩日落海鲜晚餐' });
};

/* ---------- new scenes for the 9-day version ---------- */
scenes.gz = (uid = '') => {
  const s = new Scene(uid + 'gz', { seed: 341 });
  s.sky(SKY.dusk, { stars: 22 });
  s.skyline({ x0: 0, x1: 800, base: 330, hmin: 40, hmax: 150, colors: ['#3a3568', '#332f60', '#443e74'], win: '#ffd98a', lit: 0.35, wmin: 14, wmax: 30 });
  // Canton Tower: a lattice hyperboloid with a thin mast
  const x = 520, yB = 334, H = 300;
  const wAt = (t) => (t <= 0.55 ? 7 + 15 * Math.pow((0.55 - t) / 0.55, 2) : 7 + 6 * Math.pow((t - 0.55) / 0.27, 2));
  const rings = 11, ts = [...Array(rings)].map((_, i) => (i / (rings - 1)) * 0.82);
  const yAt = (t) => yB - H * t;
  const left = ts.map((t) => `${n1(x - wAt(t))} ${n1(yAt(t))}`), right = ts.map((t) => `${n1(x + wAt(t))} ${n1(yAt(t))}`).reverse();
  s.add(`<path d="M${left.join('L')}L${right.join('L')}Z" fill="rgba(255,150,220,.28)" stroke="#ff9ae0" stroke-width="1.4"/>`);
  let lat = '';
  for (let i = 0; i < rings - 1; i++) {
    const a = ts[i], b = ts[i + 1];
    lat += `<path d="M${n1(x - wAt(a))} ${n1(yAt(a))}L${n1(x + wAt(b))} ${n1(yAt(b))}M${n1(x + wAt(a))} ${n1(yAt(a))}L${n1(x - wAt(b))} ${n1(yAt(b))}"/>`;
    lat += `<path d="M${n1(x - wAt(a))} ${n1(yAt(a))}h${n1(wAt(a) * 2)}"/>`;
  }
  s.add(`<g stroke="#ffd0f0" stroke-width="1.1" fill="none" opacity=".85">${lat}</g>`);
  s.add(`<path d="M${x} ${n1(yAt(0.82))}V${n1(yB - H)}" stroke="#ffd0f0" stroke-width="2.2"/><circle cx="${x}" cy="${n1(yB - H)}" r="3" fill="#fff"/>`);
  s.add(`<ellipse cx="${x}" cy="${n1(yAt(0.62))}" rx="30" ry="${n1(80)}" fill="${s.rad('#ff8ae0', 0.18)}"/>`);
  // river
  s.add(`<rect x="0" y="330" width="800" height="120" fill="${s.lin(['#4a3e82', '#1c1a4a'])}"/>`);
  reflect(s, 505, 336, 30, 100, '#ff8ae0', 0.3);
  reflect(s, 0, 336, 420, 50, '#7a63a8', 0.2);
  s.add(`<g transform="translate(250 392)"><path d="M0 0H70L60 10H10Z" fill="#2a2450"/><rect x="26" y="-12" width="22" height="12" fill="#e8c46a"/><path d="M30 -12V-22" stroke="#e8c46a" stroke-width="2"/></g>`);
  s.add(`<rect x="0" y="420" width="800" height="30" fill="#14133a"/>`);
  people(s, [60, 90, 150, 650, 690], 432, 1.5);
  return s.svg({ label: '广州珠江新城与广州塔夜景' });
};

scenes.merdeka = (uid = '') => {
  const s = new Scene(uid + 'merdeka', { seed: 342 });
  s.sky(SKY.day, { sun: { x: 700, y: 80, r: 24, c: '#fff6d0' } });
  s.cloud(190, 80, 1.3, { cls: 'cl cl1' }).cloud(520, 54, 1, { cls: 'cl cl2', o: 0.8 });
  s.skyline({ x0: 0, x1: 800, base: 300, hmin: 50, hmax: 140, colors: ['#9db5cf', '#8aa4c2', '#aabdd4'], win: '#fff', lit: 0.1, wmin: 14, wmax: 26 });
  // Sultan Abdul Samad building: long arcaded facade, central clock tower, copper domes
  const yB = 340;
  s.add(`<rect x="110" y="${yB - 74}" width="580" height="74" fill="#ecd9b6"/>`);
  s.add(`<g fill="#b6523a">${[0, 1, 2].map((i) => `<rect x="110" y="${yB - 74 + i * 24}" width="580" height="5"/>`).join('')}</g>`);
  let arches = '';
  for (let i = 0; i < 17; i++) {
    const ax = 124 + i * 33;
    arches += `<path d="M${ax} ${yB}V${yB - 20}A8 8 0 0 1 ${ax + 16} ${yB - 20}V${yB}Z"/>`;
    arches += `<path d="M${ax} ${yB - 46}V${yB - 56}A8 8 0 0 1 ${ax + 16} ${yB - 56}V${yB - 46}Z"/>`;
  }
  s.add(`<g fill="#6b3a2a">${arches}</g>`);
  const tower = (cx, w, top, dome, k) => {
    s.add(`<rect x="${cx - w / 2}" y="${top}" width="${w}" height="${yB - top}" fill="#ecd9b6"/><rect x="${cx - w / 2}" y="${top + 12}" width="${w}" height="5" fill="#b6523a"/>`);
    s.add(`<path d="M${cx - w / 2 - 2} ${top}Q${cx} ${top - dome} ${cx + w / 2 + 2} ${top}Z" fill="#4f8f7a"/><path d="M${cx} ${top - dome * 0.72}V${top - dome * 1.18}" stroke="#d9b45a" stroke-width="${n1(2 * k)}"/>`);
  };
  tower(400, 46, 176, 40, 1.2);
  s.add(`<circle cx="400" cy="206" r="12" fill="#fffaf0" stroke="#6b3a2a" stroke-width="2"/><path d="M400 206V198M400 206L406 209" stroke="#6b3a2a" stroke-width="2" stroke-linecap="round"/>`);
  tower(160, 30, 252, 26, 0.9); tower(640, 30, 252, 26, 0.9);
  tower(262, 20, 292, 14, 0.7); tower(538, 20, 292, 14, 0.7);
  // Merdeka Square lawn and flagpole
  s.add(`<rect x="0" y="${yB}" width="800" height="110" fill="${s.lin(['#7fcf72', '#3f8f4f'])}"/>`);
  s.add(`<path d="M0 400Q260 380 540 396T800 388V450H0Z" fill="#cfe9d1" opacity=".22"/>`);
  s.add(`<path d="M722 ${yB + 40}V70" stroke="#d8dde2" stroke-width="4"/><path d="M724 74h46v26h-46Z" fill="#d62d2d"/><path d="M724 80h46M724 86h46M724 92h46" stroke="#fff" stroke-width="2"/>`);
  palms(s, [[60, 420, 130, 8, 1.3], [760, 430, 120, -8, 1.2]], { leaf: '#2f8a47' });
  people(s, [300, 330, 450, 480, 600], 420, 1.5);
  return s.svg({ label: '独立广场的 Sultan Abdul Samad 大楼' });
};

scenes.birdpark = (uid = '') => {
  const s = new Scene(uid + 'birdpark', { seed: 343 });
  s.sky(SKY.day, { sun: { x: 90, y: 80, r: 22, c: '#fff6d0' } });
  s.cloud(380, 70, 1.2, { cls: 'cl cl1' }).cloud(640, 110, 0.9, { cls: 'cl cl2', o: 0.8 });
  const hl = s.hills({ base: 280, n: 5, hmin: 60, hmax: 120, wmin: 120, wmax: 200 });
  s.mountain(hl, { fill: '#79b184', facets: false });
  s.add(`<rect x="0" y="300" width="800" height="150" fill="${s.lin(['#6fbf73', '#3f8f4f'])}"/>`);
  s.forest({ y: 330, x0: 40, x1: 760, n: 18, hmin: 70, hmax: 130, colors: ['#1f6b3d', '#2f8a47', '#17592f'], kind: 'leafy', jitter: 20 });
  // the big net over the valley
  dome(s, 400, 350, 760, 230, 'rgba(230,240,246,.28)', 'rgba(255,255,255,.65)');
  // pond with flamingos
  s.add(`<ellipse cx="400" cy="400" rx="190" ry="26" fill="#7ec8dc" opacity=".9"/>`);
  const flamingo = (x, y, k, flip = 1) => s.add(`<g transform="translate(${x} ${y}) scale(${k * flip} ${k})"><path d="M-4 0V22M4 0V20" stroke="#e86b8c" stroke-width="1.6"/><ellipse cx="0" cy="-2" rx="15" ry="8" fill="#f58aa5"/><path d="M10 -4Q22 -14 16 -28Q14 -34 20 -36" stroke="#f58aa5" stroke-width="4" fill="none" stroke-linecap="round"/><circle cx="21" cy="-36" r="3.4" fill="#f58aa5"/><path d="M23 -36l6 3-6 1z" fill="#2a2a2a"/></g>`);
  [[300, 396, 1.1, 1], [338, 404, 1.3, 1], [372, 398, 1, -1], [452, 402, 1.2, 1], [494, 396, 1.1, -1], [528, 406, 1.4, 1]].forEach(([x, y, k, f]) => flamingo(x, y, k, f));
  [[150, 120, 1.4], [220, 90, 1], [580, 130, 1.2], [650, 100, 1.5], [700, 150, 1]].forEach(([x, y, k]) => bird(s, x, y, k));
  s.add(`<path d="M0 440Q260 420 800 436V450H0Z" fill="#b8956a"/>`);
  palms(s, [[60, 436, 130, 8, 1.3], [750, 440, 120, -8, 1.2]], { leaf: '#2f8a47' });
  people(s, [180, 220, 600, 640], 440, 1.5);
  return s.svg({ label: '网罩下的 KL 飞禽公园与火烈鸟' });
};

// side-view van: red body, light windows, dark wheels. Inline styles on purpose (the shared CSS `.mp-vehicle path` paints paths blue).
const carGlyph = (k) => `<g transform="scale(${k})"><path d="M-14 4.2V-1.6Q-14 -3.6 -11.6 -4.1L-8 -4.8L-5.2 -9.6Q-4.2 -11.2 -2.2 -11.2H6.2Q8 -11.2 9 -9.6L11.4 -4.8L13 -4.2Q15 -3.7 15 -1.6V4.2Z" style="fill:var(--gold);stroke:#fff;stroke-width:1.3;stroke-linejoin:round"/><path d="M-4.3 -4.9L-2.6 -8.9H1.9V-4.9ZM3.7 -8.9H6L8.7 -4.9H3.7Z" style="fill:#fff;opacity:.93;stroke:none"/><circle cx="-8.6" cy="4.6" r="3.4" style="fill:#1f2328;stroke:#fff;stroke-width:1"/><circle cx="8.6" cy="4.6" r="3.4" style="fill:#1f2328;stroke:#fff;stroke-width:1"/><circle cx="-8.6" cy="4.6" r="1.1" style="fill:#fff;stroke:none"/><circle cx="8.6" cy="4.6" r="1.1" style="fill:#fff;stroke:none"/></g>`;

/* ---------- route map (schematic) ---------- */
export function seaMap() {
  const W = 900, H = 560;
  const P = { can: [640, 92], sin: [338, 392], kul: [262, 296], ns: [286, 338], dps: [700, 470] };
  const names = {
    can: ['广州', 'Guangzhou', '第 1 天集合 · 第 2 天出发', '天津 1 · 徐州 4', '太原 2 人汇合'],
    kul: ['吉隆坡', 'Kuala Lumpur', '第 2–5 天'],
    ns: ['森美兰', 'Negeri Sembilan', '第 4 天探校(三所)'],
    sin: ['新加坡', 'Singapore', '第 5–6 天'],
    dps: ['巴厘岛', 'Bali · Uluwatu', '乌鲁瓦图 · 第 6–8 天'],
  };
  const arc = (a, b, bend) => {
    const [x1, y1] = a, [x2, y2] = b;
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, dx = x2 - x1, dy = y2 - y1;
    const L = Math.hypot(dx, dy) || 1;
    return `M${x1} ${y1}Q${Math.round(mx - (dy / L) * bend)} ${Math.round(my + (dx / L) * bend)} ${x2} ${y2}`;
  };
  const legs = [
    ['leg1', arc(P.can, P.kul, 60)],
    ['leg2', arc(P.kul, P.sin, -30)],
    ['leg3', arc(P.sin, P.dps, -50)],
  ];
  const land = '#e3dfd0';
  const lab = (k, dx, dy, anchor) => `<g class="mp-lab"><text x="${P[k][0] + dx}" y="${P[k][1] + dy}" text-anchor="${anchor}" class="mp-l">${names[k][0]}</text><text x="${P[k][0] + dx}" y="${P[k][1] + dy + 14}" text-anchor="${anchor}" class="mp-s">${names[k][1]}</text>${names[k].slice(2).map((t, n) => `<text x="${P[k][0] + dx}" y="${P[k][1] + dy + 28 + n * 14}" text-anchor="${anchor}" class="mp-d">${t}</text>`).join('')}</g>`;
  const svg = `<svg class="art sea-map" viewBox="0 0 ${W} ${H}" role="img" aria-label="广州、吉隆坡与森美兰、新加坡、巴厘岛的 9 日路线示意图(非严格比例)">
  <defs><pattern id="sm-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="currentColor" opacity=".1"/></pattern></defs>
  <rect class="mp-sea" width="${W}" height="${H}" rx="6"/><rect width="${W}" height="${H}" fill="url(#sm-dots)"/>
  <g class="mp-land">
    <path d="M330 0H900V118Q840 104 770 120T640 112Q560 96 500 50T330 0Z"/>
    <path d="M150 120Q232 138 258 226T318 372L330 384L312 388Q268 340 226 276T150 120Z"/>
    <path d="M0 252Q64 226 136 296T236 440Q256 474 210 480Q110 410 0 330Z"/>
    <path d="M520 240Q620 196 718 232T738 332Q690 392 574 372Q514 332 520 240Z"/>
    <path d="M356 466Q500 440 660 456L662 482Q500 496 360 492Z"/>
    <ellipse cx="702" cy="474" rx="26" ry="14"/>
  </g>
  <text x="540" y="40" class="mp-reg" text-anchor="middle">CHINA</text>
  <text x="220" y="190" class="mp-reg" text-anchor="middle" transform="rotate(62 220 190)">MALAYSIA</text>
  <text x="598" y="300" class="mp-reg" text-anchor="middle">BORNEO</text>
  <text x="496" y="520" class="mp-reg" text-anchor="middle">JAVA SEA</text>
  <text x="70" y="410" class="mp-reg sea" text-anchor="middle" transform="rotate(-30 70 410)">INDIAN OCEAN</text>
  <text x="520" y="196" class="mp-reg sea" text-anchor="middle">SOUTH CHINA SEA</text>
  ${legs.map(([id, d]) => `<path id="${id}" class="mp-route fly" d="${d}"/>`).join('')}
  <path id="leg0" d="M730 -18Q700 52 ${P.can[0]} ${P.can[1]}" fill="none" stroke="none"/>
  ${lab('can', 24, 8, 'start')}${lab('sin', 22, 20, 'start')}${lab('kul', -36, -10, 'end')}${lab('ns', -34, 26, 'end')}${lab('dps', 24, -28, 'start')}
  ${Object.keys(P).map((k) => `<g class="mp-pin" data-k="${k}" transform="translate(${P[k][0]} ${P[k][1]})"><circle r="9"/><circle r="3.2" class="in"/><circle r="28" style="fill:transparent;stroke:none"/></g>`).join('')}
  <g id="sm-plane" class="mp-vehicle" aria-hidden="true" style="display:none"><path d="M0 -11L3.4 -2.4L12 2.4L12 4.4L3.4 3.2L2.4 9.6L5.6 11.8L5.6 13L-5.6 13L-5.6 11.8L-2.4 9.6L-3.4 3.2L-12 4.4L-12 2.4L-3.4 -2.4Z" transform="rotate(90) scale(1.5)" stroke="#fff" stroke-width="1.4"/></g>
  <g id="sm-car" class="mp-vehicle car" aria-hidden="true" style="display:none">${carGlyph(1.5)}</g>
  <g transform="translate(${W - 262} ${H - 62})" class="mp-key"><g class="mp-vehicle" transform="translate(17 0)"><path d="M0 -11L3.4 -2.4L12 2.4L12 4.4L3.4 3.2L2.4 9.6L5.6 11.8L5.6 13L-5.6 13L-5.6 11.8L-2.4 9.6L-3.4 3.2L-12 4.4L-12 2.4L-3.4 -2.4Z" transform="rotate(90) scale(1)" stroke="#fff" stroke-width="1.4"/></g><text x="44" y="4">飞机:飞行途中</text></g>
  <g transform="translate(${W - 262} ${H - 40})" class="mp-key"><g class="mp-vehicle car" transform="translate(17 -2)">${carGlyph(1)}</g><text x="44" y="4">小车:落地后 / 当天在地面</text></g>
  <g transform="translate(${W - 262} ${H - 18})" class="mp-key"><path d="M0 0h34" class="fly mp-route" style="animation:none"/><text x="44" y="4">航线(共 3 段)</text></g>
  <text x="26" y="${H - 18}" class="mp-note">示意图,非严格比例;四地同一时区(UTC+8)</text>
  </svg>`;
  return { svg, P };
}

export function nsInset() {
  // schematic of the three-school loop: KL → Epsom → Adcote Matrix → (Seremban lunch) → KTJ → KL (not to scale)
  const W = 900, H = 350;
  const N = { kl: [90, 150], epsom: [310, 80], adcote: [560, 170], ktj: [810, 80] };
  const E = [
    ['kl', 'epsom', '约 40 分钟(学校官网)'],
    ['epsom', 'adcote', '约 25–30 分钟(估)'],
    ['adcote', 'ktj', '午饭 Seremban · 共约 50 分钟(估)'],
  ];
  const lines = E.map(([a, b, t]) => {
    const [x1, y1] = N[a], [x2, y2] = N[b];
    const known = /官网/.test(t);
    const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy);
    let nx = -dy / L, ny = dx / L;
    if (ny > 0) { nx = -nx; ny = -ny; }
    const off = 16;
    return `<path d="M${x1} ${y1}L${x2} ${y2}" class="ns-e${known ? '' : ' est'}"/><text x="${n1((x1 + x2) / 2 + nx * off)}" y="${n1((y1 + y2) / 2 + ny * off + 4)}" text-anchor="middle" class="ns-t${known ? '' : ' est'}">${t}</text>`;
  });
  // return leg KTJ → KL, drawn as a curve along the bottom
  lines.push(`<path d="M${N.ktj[0]} ${N.ktj[1]}Q450 450 ${N.kl[0]} ${N.kl[1]}" class="ns-e est" fill="none"/><text x="450" y="304" text-anchor="middle" class="ns-t est">回吉隆坡 · 约 1–1.5 小时(估,晚高峰)</text>`);
  const lab = { kl: ['吉隆坡市区', '07:45 出发 · 约 18:00 回'], epsom: ['① Epsom College', '09:00–10:30 · Enstek'], adcote: ['② Adcote Matrix', '11:00–12:30 · Sri Sendayan'], ktj: ['③ KTJ', '15:00–16:30 · Mantin'] };
  const top = new Set(['epsom', 'ktj']);
  const nodes = Object.keys(N).map((k) => {
    const isSch = k !== 'kl';
    return `<g transform="translate(${N[k][0]} ${N[k][1]})"><circle r="${isSch ? 13 : 9}" class="ns-n${isSch ? ' sch' : ''}"/><text y="${top.has(k) ? -36 : 38}" text-anchor="middle" class="ns-l">${lab[k][0]}</text><text y="${top.has(k) ? -19 : 56}" text-anchor="middle" class="ns-s">${lab[k][1]}</text></g>`;
  });
  return `<svg class="art ns-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="森美兰三所学校的一天路线:吉隆坡、Epsom、Adcote Matrix、KTJ,再回吉隆坡"><rect class="ns-bg" width="${W}" height="${H}" rx="6"/>${lines.join('')}${nodes.join('')}<text x="26" y="${H - 14}" class="mp-note">示意图:标「学校官网」的车程来自学校官网,其余为估算,以导航为准;KTJ 与其他两校之间的车程未查到官方数据</text></svg>`;
}
