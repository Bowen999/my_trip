// Shared palettes and drawing primitives for the New England scenes (late-autumn look).
import { Scene, rng } from '../art.mjs';

export { Scene, rng };
export const n1 = (n) => Math.round(n * 10) / 10;

export const SKY = {
  sunset: ['#2f3a74', '#a9618a', '#f09a68', '#fbcf88'],
  dusk: ['#23305f', '#6e5590', '#d9768a', '#f6b27a'],
  late: ['#1c2a58', '#4a4a86', '#c9667f', '#f3a56b'],
  cold: ['#6f9cc4', '#b0cbd9', '#f1e4c6'],
  gold: ['#7aa3c6', '#c9d2cf', '#f8dfae'],
  grey: ['#8ea1b0', '#bcc6c8', '#e8e0cf'],
  night: ['#0f1a3c', '#1f2f62', '#3b4a82'],
};
export const AUT = {
  leaf: ['#b4552b', '#d98e2e', '#8e3d24', '#c7a23c'],
  pine: ['#1f3d35', '#2a4a3d', '#183029'],
  brick: '#a2493a',
  brickD: '#823a2f',
  lawn: ['#8a9a55', '#6f8447'],
};

/* ---------- small things ---------- */
export function bird(s, x, y, k = 1, c = '#2c3340') {
  s.add(`<path class="bird" d="M${x} ${y}q${n1(6 * k)} ${n1(-6 * k)} ${n1(12 * k)} 0q${n1(6 * k)} ${n1(-6 * k)} ${n1(12 * k)} 0" fill="none" stroke="${c}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`);
}
export function person(s, x, y, k = 1, coat = '#7a3b3b', { hat = null, skin = '#e8c3a0', legs = '#2d3340' } = {}) {
  s.add(`<g transform="translate(${x} ${y}) scale(${k})"><path d="M-2.4 -6h1.9v6h-1.9zM.5 -6h1.9v6H.5z" fill="${legs}"/><path d="M-3.6 -15.5h7.2l.9 9.8h-9z" fill="${coat}"/><circle cx="0" cy="-18.4" r="2.5" fill="${skin}"/>${hat ? `<path d="M-2.8 -19.4Q0 -23 2.8 -19.4Z" fill="${hat}"/>` : ''}</g>`);
}
export function people(s, pts, y, k = 1.2) {
  const cols = ['#7a3b3b', '#2f5576', '#c28a2e', '#4d6b52', '#6c4a7a', '#b5533c', '#3b3f4a'];
  pts.forEach((x, i) => person(s, x, y + (i % 3) * 2, k, cols[i % cols.length], { hat: i % 3 === 0 ? '#2b2b33' : null }));
}

/* trees */
export function bare(s, x, y, h, { c = '#4a3b34', depth = 4, cls = 'sway-s', o = 1 } = {}) {
  const L = [[], [], []];
  const rec = (x0, y0, a, len, d) => {
    const x1 = x0 + Math.sin(a) * len, y1 = y0 - Math.cos(a) * len;
    L[Math.min(d, 2)].push(`M${Math.round(x0)} ${Math.round(y0)}L${Math.round(x1)} ${Math.round(y1)}`);
    if (d >= depth) return;
    const k = d === 0 ? 3 : s.r() < 0.7 ? 2 : 3;
    for (let i = 0; i < k; i++) {
      const side = k === 3 ? i - 1 : i ? 1 : -1;
      rec(x1, y1, a + side * s.rnd(0.28, 0.62) + (k === 3 && i === 1 ? s.rnd(-0.1, 0.1) : 0), len * s.rnd(0.62, 0.78), d + 1);
    }
  };
  rec(x, y, 0, h * 0.34, 0);
  const sw = [h * 0.05, h * 0.024, Math.max(0.7, h * 0.011)];
  s.add(`<g class="${cls}" opacity="${o}" stroke="${c}" fill="none" stroke-linecap="round">${L.map((p, i) => (p.length ? `<path d="${p.join('')}" stroke-width="${n1(sw[i])}"/>` : '')).join('')}</g>`);
}
export function maple(s, x, y, h, col = '#c9772c', col2 = '#e0a33a', trunk = '#4a3b34') {
  const r = h * 0.3;
  s.add(`<g class="sway-s"><path d="M${n1(x - h * 0.03)} ${y}L${n1(x - h * 0.016)} ${n1(y - h * 0.55)}L${n1(x + h * 0.016)} ${n1(y - h * 0.55)}L${n1(x + h * 0.03)} ${y}Z" fill="${trunk}"/><circle cx="${n1(x - r * 0.55)}" cy="${n1(y - h * 0.62)}" r="${n1(r * 0.78)}" fill="${col}"/><circle cx="${n1(x + r * 0.6)}" cy="${n1(y - h * 0.64)}" r="${n1(r * 0.75)}" fill="${col}"/><circle cx="${n1(x)}" cy="${n1(y - h * 0.8)}" r="${n1(r * 0.9)}" fill="${col}"/><circle cx="${n1(x - r * 0.15)}" cy="${n1(y - h * 0.84)}" r="${n1(r * 0.5)}" fill="${col2}" opacity=".85"/><circle cx="${n1(x + r * 0.5)}" cy="${n1(y - h * 0.66)}" r="${n1(r * 0.34)}" fill="${col2}" opacity=".7"/></g>`);
}
export function pine(s, x, y, h, c = '#1f3d35') {
  s.add(`<use href="#pine" fill="${c}" transform="translate(${n1(x)} ${n1(y)}) scale(${n1(h / 30)})"/>`);
}

/* lights */
export function gasLamp(s, x, yB, k = 1, { glow = '#ffc15e', post = '#1d2226' } = {}) {
  const h = 74 * k;
  s.add(`<circle cx="${x}" cy="${n1(yB - h)}" r="${n1(26 * k)}" fill="${s.rad(glow, 0.5)}"/><path d="M${n1(x - 3.4 * k)} ${yB}L${n1(x - 1.4 * k)} ${n1(yB - h + 12 * k)}H${n1(x + 1.4 * k)}L${n1(x + 3.4 * k)} ${yB}Z" fill="${post}"/><rect x="${n1(x - 5 * k)}" y="${n1(yB - 9 * k)}" width="${n1(10 * k)}" height="${n1(9 * k)}" rx="1" fill="${post}"/><path d="M${n1(x - 5.5 * k)} ${n1(yB - h + 13 * k)}H${n1(x + 5.5 * k)}L${n1(x + 7 * k)} ${n1(yB - h - 4 * k)}H${n1(x - 7 * k)}Z" fill="#ffe3a0"/><path d="M${n1(x - 8.4 * k)} ${n1(yB - h - 4 * k)}L${x} ${n1(yB - h - 14 * k)}L${n1(x + 8.4 * k)} ${n1(yB - h - 4 * k)}Z" fill="${post}"/><path d="M${x} ${n1(yB - h - 14 * k)}v${n1(-4 * k)}" stroke="${post}" stroke-width="${n1(1.6 * k)}"/><path d="M${n1(x - 5.5 * k)} ${n1(yB - h + 5 * k)}H${n1(x + 5.5 * k)}" stroke="${post}" stroke-width="${n1(1 * k)}"/>`);
}

/* patterns */
export function brickPat(s, line = 'rgba(60,20,12,.28)', sz = 1) {
  const id = s.gid('bk');
  const w = 10 * sz, h = 6 * sz;
  s.def(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="${w}" height="${h}"><path d="M0 0H${w}M0 ${h / 2}H${w}M0 0V${h / 2}M${w / 2} ${h / 2}V${h}" stroke="${line}" stroke-width="${n1(0.7 * sz)}" fill="none"/></pattern>`);
  return `url(#${id})`;
}
export function shingPat(s, line = 'rgba(30,25,20,.3)') {
  const id = s.gid('sh');
  s.def(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="7" height="6"><path d="M0 5.5H7M3.5 0V5.5" stroke="${line}" stroke-width=".8" fill="none"/></pattern>`);
  return `url(#${id})`;
}
export function clapPat(s, line = 'rgba(40,30,20,.22)') {
  const id = s.gid('cp');
  s.def(`<pattern id="${id}" patternUnits="userSpaceOnUse" width="10" height="5"><path d="M0 4.5H10" stroke="${line}" stroke-width="1" fill="none"/></pattern>`);
  return `url(#${id})`;
}

/** Cobblestone ground drawn in horizontal depth bands (stones grow towards the viewer). `d` is the path clipped to. */
export function cobbles(s, d, y0, y1, { base = '#7d7468', stone = '#9a9082', bands = 5 } = {}) {
  const cid = s.gid('cc'), id = s.gid('cb');
  s.def(`<clipPath id="${cid}"><path d="${d}"/></clipPath><pattern id="${id}" patternUnits="userSpaceOnUse" width="16" height="10"><g fill="${stone}"><rect x="1" y="1" width="6.4" height="3.6" rx="1.6"/><rect x="9" y="1" width="6" height="3.6" rx="1.6" opacity=".8"/><rect x="5" y="6" width="6.4" height="3.6" rx="1.6" opacity=".9"/><rect x="13" y="6" width="4" height="3.6" rx="1.6"/><rect x="-3" y="6" width="5" height="3.6" rx="1.6"/></g></pattern>`);
  let g = '';
  for (let i = 0; i < bands; i++) {
    const ya = y0 + (y1 - y0) * ((i / bands) ** 1.5), yb = y0 + (y1 - y0) * (((i + 1) / bands) ** 1.5);
    const sc = 0.5 + i * 0.55;
    g += `<g transform="translate(0 ${n1(ya)}) scale(${sc})"><rect x="-20" width="${n1((s.w + 40) / sc)}" height="${n1((yb - ya + 1) / sc)}" fill="url(#${id})"/></g>`;
  }
  s.add(`<path d="${d}" fill="${base}"/><g clip-path="url(#${cid})">${g}</g>`);
}

/* water + coast */
export function sea(s, y, c1 = '#7a9db3', c2 = '#2f5670', { glow = null, n = 10, caps = 0, x0 = 0, x1 } = {}) {
  const { w, h } = s;
  x1 = x1 ?? w;
  s.add(`<rect x="${x0}" y="${y}" width="${x1 - x0}" height="${h - y}" fill="${s.lin([c1, c2])}"/>`);
  if (glow) s.add(`<ellipse cx="${glow.x}" cy="${y + 10}" rx="${glow.rx || 120}" ry="${glow.ry || 16}" fill="${glow.c}" opacity="${glow.o ?? 0.5}"/>`);
  let r = '';
  for (let i = 0; i < n; i++) r += `<path d="M${n1(s.rnd(x0, x1 - 90))} ${n1(s.rnd(y + 6, h - 6))}h${n1(s.rnd(30, 90))}" class="rip" style="animation-delay:-${n1(s.rnd(0, 6))}s"/>`;
  s.add(`<g stroke="#fff" stroke-opacity=".34" stroke-width="1.4" stroke-linecap="round" fill="none">${r}</g>`);
  if (caps) {
    let c = '';
    for (let i = 0; i < caps; i++) c += `<path d="M${n1(s.rnd(x0, x1 - 30))} ${n1(s.rnd(y + 8, h - 10))}q4 -3 8 0q4 -3 8 0" class="rip" style="animation-delay:-${n1(s.rnd(0, 5))}s"/>`;
    s.add(`<g stroke="#fff" stroke-opacity=".6" stroke-width="1.6" stroke-linecap="round" fill="none">${c}</g>`);
  }
}
export function reflect(s, x, y, w, h, c, o = 0.25) {
  s.add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${s.lin([c, c + '00'])}" opacity="${o * 1.6}" class="rip"/>`);
}
/** Jagged rock mass; returns nothing. pts = rough outline points (x,y) from left to right along the top edge. */
export function rock(s, pts, yBot, { fill = '#6b6258', hi = '#8d8275', lo = 'rgba(20,18,16,.3)', seam = true } = {}) {
  const d = `M${pts[0][0]} ${yBot}L${pts.map((p) => `${n1(p[0])} ${n1(p[1])}`).join('L')}L${pts[pts.length - 1][0]} ${yBot}Z`;
  s.add(`<path d="${d}" fill="${fill}"/>`);
  let hl = '', sh = '';
  for (let i = 0; i < pts.length - 1; i++) {
    const [ax, ay] = pts[i], [bx, by] = pts[i + 1];
    const mx = (ax + bx) / 2, my = Math.min(ay, by) + Math.abs(by - ay) * 0.5 + 12 + s.rnd(0, 16);
    if (by <= ay) hl += `M${n1(ax)} ${n1(ay)}L${n1(bx)} ${n1(by)}L${n1(mx + 4)} ${n1(my)}Z`;
    else sh += `M${n1(ax)} ${n1(ay)}L${n1(bx)} ${n1(by)}L${n1(mx - 4)} ${n1(my)}Z`;
  }
  s.add(`<path d="${hl}" fill="${hi}" opacity=".6"/><path d="${sh}" fill="${lo}"/>`);
  if (seam) {
    let q = '';
    for (let i = 0; i < pts.length - 1; i++) q += `M${n1(pts[i][0] + 6)} ${n1(pts[i][1] + 10 + s.rnd(0, 10))}l${n1(s.rnd(14, 36))} ${n1(s.rnd(2, 10))}`;
    s.add(`<path d="${q}" stroke="rgba(0,0,0,.25)" stroke-width="1.4" fill="none" stroke-linecap="round"/>`);
  }
}
export function foam(s, x, y, w, n = 6) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const fx = x + (i + s.rnd(0, 0.6)) * (w / n), a = s.rnd(5, 9), b = s.rnd(10, 18);
    g += `M${n1(fx)} ${y}q${n1(b * 0.2)} ${n1(-a)} ${n1(b * 0.45)} ${n1(-a * 0.6)}q${n1(b * 0.3)} ${n1(-a * 0.9)} ${n1(b * 0.55)} ${n1(a * 0.6)}z`;
  }
  s.add(`<path class="rip" d="${g}" fill="#fff" opacity=".88"/>`);
}

/* vehicles / boats */
export function car(s, x, yG, k = 1, col = '#c0392b', dir = 1, { lights = false } = {}) {
  const sx = dir < 0 ? -k : k;
  s.add(`<g transform="translate(${x} ${n1(yG - 11 * k)}) scale(${sx} ${k})"><ellipse cx="0" cy="11" rx="30" ry="3" fill="#000" opacity=".22"/>${lights ? `<path d="M26 -3L96 -14V10Z" fill="${s.rad('#fff3c0', 0.55)}" opacity=".7"/>` : ''}<path d="M-27 6V-3Q-27 -6 -23 -6.5L-14 -8L-9 -15Q-8 -17 -5 -17H12Q15 -17 16.5 -15L20.5 -8L25 -7Q28 -6 28 -3V6Z" fill="${col}"/><path d="M-27 1H28V6H-27Z" fill="#000" opacity=".16"/><path d="M-8.4 -8.6L-5.2 -14.2H3.6V-8.6ZM6.6 -14.2H11.8L15.6 -8.6H6.6Z" fill="#cfe3ee"/><path d="M-5.4 -17H12" stroke="#2a2d33" stroke-width="1.3" opacity=".6"/><rect x="25" y="-4" width="3.4" height="2.6" rx="1" fill="#ffe9a0"/><rect x="-27.4" y="-4" width="2.6" height="2.6" rx="1" fill="#ff5a4a"/><circle cx="-16" cy="6" r="5.4" fill="#1d2025"/><circle cx="16" cy="6" r="5.4" fill="#1d2025"/><circle cx="-16" cy="6" r="2.2" fill="#aab2b8"/><circle cx="16" cy="6" r="2.2" fill="#aab2b8"/></g>`);
}
export function lobsterBoat(s, x, y, k = 1, { hull = '#f1ede2', stripe = '#2f6aa5', cabin = '#f1ede2', cls = 'bob', dir = 1 } = {}) {
  const sx = dir < 0 ? -k : k;
  s.add(`<g class="${cls}" style="transform-origin:${x}px ${y}px"><g transform="translate(${x} ${y}) scale(${sx} ${k})"><path d="M-44 -9L-42 7Q-40 10 -34 10H28Q42 7 54 -13L30 -10H-44Z" fill="${hull}"/><path d="M-43 -2L-42 3.5H34Q44 2 49 -5Z" fill="${stripe}"/><path d="M-44 -9H30L54 -13" stroke="#8a7f70" stroke-width="1.6" fill="none"/><rect x="-12" y="-27" width="24" height="18" fill="${cabin}"/><path d="M-14 -27H15L12 -31H-11Z" fill="#b5483a"/><rect x="-9" y="-24" width="8" height="8" fill="#6f8ea3"/><rect x="2" y="-24" width="8" height="8" fill="#6f8ea3"/><path d="M-36 -9V-17H-20V-9" fill="none" stroke="#8a7f70" stroke-width="1.6"/><path d="M3 -31V-46M3 -44L-5 -37M3 -44L11 -37" stroke="#45505a" stroke-width="1.3" fill="none"/><rect x="-42" y="-14" width="14" height="5" fill="#d97b2b"/><rect x="-42" y="-18" width="12" height="4" fill="#c9a23a"/></g></g>`);
}
export function sailboat(s, x, y, k = 1, { hull = '#f2efe6', sail = '#f6f1e4', sail2 = '#e9dfca', stripe = '#2a4f7c', sails = true, cls = 'bob b2' } = {}) {
  s.add(`<g class="${cls}" style="transform-origin:${x}px ${y}px"><g transform="translate(${x} ${y}) scale(${k})"><path d="M-30 -2H34Q30 8 20 9H-20Q-27 8 -30 -2Z" fill="${hull}"/><path d="M-29 1.5H31" stroke="${stripe}" stroke-width="2.2"/>${sails ? `<path d="M1 -3V-64L-18 -8Z" fill="${sail}"/><path d="M4 -3V-58L26 -6Z" fill="${sail2}"/>` : `<path d="M1 -3V-56" stroke="#6a5f52" stroke-width="2"/><path d="M-1 -4H-22L-1 -10Z" fill="${stripe}" opacity=".85"/>`}<path d="M2 -3V-66" stroke="#6a5f52" stroke-width="1.6"/></g></g>`);
}
export function mast(s, x, y, h, c = '#8a7f72') {
  s.add(`<path d="M${x} ${y}V${y - h}" stroke="${c}" stroke-width="1.6"/><path d="M${x} ${y - h * 0.62}L${x - 10} ${y - h * 0.4}M${x} ${y - h * 0.62}L${x + 10} ${y - h * 0.4}" stroke="${c}" stroke-width=".9"/>`);
}

/* buildings */
/** Brick rowhouse (Beacon Hill style) with black shutters, white sills, fanlight door, stoop. */
export function rowhouse(s, x, yB, w, h, { brick = '#a4503f', pat, shut = '#1d2226', trim = '#efe6d2', roof = '#4a4a52', floors = 3, door = '#20262b', lit = 0.5, flower = true } = {}) {
  if (!s.__win) {
    s.__win = true;
    const mk = (id, glass) => `<g id="${s.id}-${id}"><rect x="-10" width="3" height="12" fill="${shut}"/><rect x="7" width="3" height="12" fill="${shut}"/><rect x="-7" width="14" height="12" fill="${glass}"/><path d="M0 0V12M-7 5H7" stroke="${trim}" stroke-width=".9"/><rect x="-8.5" y="12" width="17" height="2" fill="${trim}"/></g>`;
    s.def(mk('wl', '#ffd88a') + mk('wd', '#3b4a5c'));
  }
  let g = `<rect x="${x}" y="${yB - h}" width="${w}" height="${h}" fill="${brick}"/>`;
  if (pat) g += `<rect x="${x}" y="${yB - h}" width="${w}" height="${h}" fill="${pat}"/>`;
  g += `<rect x="${x - 1}" y="${yB - h - 4}" width="${w + 2}" height="5" fill="${trim}"/>`;
  const cols = w > 74 ? 3 : 2;
  const fh = (h - 26) / floors;
  let wl = '';
  for (let f = 0; f < floors; f++) {
    const fy = yB - h + 9 + f * fh;
    for (let c = 0; c < cols; c++) {
      const cx = x + (w / cols) * (c + 0.5);
      if (f === floors - 1 && c === Math.floor(cols / 2) && cols % 2) continue;
      wl += `<use href="#${s.id}-${s.r() < lit ? 'wl' : 'wd'}" x="${n1(cx)}" y="${n1(fy)}"/>`;
      if (flower && f === 0 && c === 0) wl += `<rect x="${n1(cx - 7)}" y="${n1(fy + 14)}" width="14" height="3" fill="#4a3426"/><circle cx="${n1(cx - 3)}" cy="${n1(fy + 13)}" r="1.8" fill="#c9482f"/><circle cx="${n1(cx + 2)}" cy="${n1(fy + 13)}" r="1.8" fill="#e0a33a"/>`;
    }
  }
  const dX = cols % 2 ? x + w / 2 : x + w * 0.5;
  wl += `<rect x="${n1(dX - 6)}" y="${yB - 24}" width="12" height="24" fill="${door}"/><path d="M${n1(dX - 6)} ${yB - 24}Q${n1(dX)} ${yB - 33} ${n1(dX + 6)} ${yB - 24}Z" fill="#f0d89a"/><rect x="${n1(dX - 9)}" y="${yB - 3}" width="18" height="3" fill="#8f8a82"/><circle cx="${n1(dX + 3)}" cy="${yB - 11}" r="1" fill="#d9b04a"/>`;
  s.add(`<g>${g}${wl}</g>`);
}
/** Clapboard colonial: side-gabled, centre door, chimney. */
export function colonial(s, x, yB, w, h, { wall = '#e8dcc0', roof = '#5a4a44', shut = '#2f4a58', pat, door = '#7a2e2a', chim = '#9a4a3a', lit = 0.5, cols = 5, gable = 20 } = {}) {
  let g = `<rect x="${n1(x + w * 0.78)}" y="${n1(yB - h - gable - 12)}" width="9" height="${n1(gable + 16)}" fill="${chim}"/><rect x="${n1(x + w * 0.78 - 1.5)}" y="${n1(yB - h - gable - 14)}" width="12" height="3" fill="#6f3a2e"/>`;
  g += `<path d="M${x - 5} ${yB - h + 1}L${n1(x + w * 0.2)} ${yB - h - gable}H${n1(x + w * 0.8)}L${x + w + 5} ${yB - h + 1}Z" fill="${roof}"/>`;
  g += `<rect x="${x}" y="${yB - h}" width="${w}" height="${h}" fill="${wall}"/>`;
  if (pat) g += `<rect x="${x}" y="${yB - h}" width="${w}" height="${h}" fill="${pat}"/>`;
  g += `<rect x="${x}" y="${yB - h}" width="${w}" height="3" fill="#fff8e6" opacity=".8"/>`;
  const fl = h > 70 ? 2 : 1;
  const fh = (h - 8) / fl;
  for (let f = 0; f < fl; f++) {
    for (let c = 0; c < cols; c++) {
      const cx = x + (w / cols) * (c + 0.5);
      const wy = yB - h + 8 + f * fh;
      const wh = fh * 0.55, ww = Math.min(12, w / cols * 0.5);
      if (f === fl - 1 && c === Math.floor(cols / 2)) continue;
      g += `<rect x="${n1(cx - ww / 2 - 2.6)}" y="${n1(wy)}" width="2.6" height="${n1(wh)}" fill="${shut}"/><rect x="${n1(cx + ww / 2)}" y="${n1(wy)}" width="2.6" height="${n1(wh)}" fill="${shut}"/><rect x="${n1(cx - ww / 2)}" y="${n1(wy)}" width="${n1(ww)}" height="${n1(wh)}" fill="${s.r() < lit ? '#ffd88a' : '#4b5a6a'}"/><path d="M${n1(cx)} ${n1(wy)}v${n1(wh)}M${n1(cx - ww / 2)} ${n1(wy + wh / 2)}h${n1(ww)}" stroke="#f7f0dc" stroke-width=".9"/>`;
    }
  }
  const dcx = x + w / 2;
  g += `<rect x="${n1(dcx - 6.5)}" y="${yB - 22}" width="13" height="22" fill="${door}"/><path d="M${n1(dcx - 9)} ${yB - 24}H${n1(dcx + 9)}L${dcx} ${yB - 31}Z" fill="#f7f0dc"/><rect x="${n1(dcx - 8)}" y="${yB - 24}" width="2" height="24" fill="#f7f0dc"/><rect x="${n1(dcx + 6)}" y="${yB - 24}" width="2" height="24" fill="#f7f0dc"/>`;
  s.add(`<g>${g}</g>`);
}
/** White clapboard steeple with tiers (used for churches). yB = base of the tower. */
export function steeple(s, x, yB, k = 1, { wall = '#f3eee2', shade = 'rgba(80,70,60,.18)', roof = '#6a6f78', vane = '#d9a42c', lower = null } = {}) {
  const t = (w, h, y, c = wall) => `<rect x="${n1(x - w / 2)}" y="${n1(y - h)}" width="${n1(w)}" height="${n1(h + 1)}" fill="${c}"/><rect x="${n1(x)}" y="${n1(y - h)}" width="${n1(w / 2)}" height="${n1(h + 1)}" fill="${shade}"/>`;
  let y = yB, g = '';
  g += t(40 * k, 70 * k, y, lower || wall); y -= 70 * k;
  g += `<rect x="${n1(x - 22 * k)}" y="${n1(y - 3 * k)}" width="${n1(44 * k)}" height="${n1(5 * k)}" fill="${wall}"/>`;
  // louvred belfry window
  g += `<path d="M${n1(x - 8 * k)} ${n1(yB - 46 * k)}V${n1(yB - 66 * k)}Q${x} ${n1(yB - 76 * k)} ${n1(x + 8 * k)} ${n1(yB - 66 * k)}V${n1(yB - 46 * k)}Z" fill="#40505e"/><circle cx="${x}" cy="${n1(yB - 30 * k)}" r="${n1(6 * k)}" fill="#f7f1df" stroke="#9a8f7c" stroke-width="${n1(1 * k)}"/>`;
  g += t(32 * k, 30 * k, y); y -= 30 * k;
  g += `<path d="M${n1(x - 7 * k)} ${n1(y + 26 * k)}V${n1(y + 10 * k)}Q${x} ${n1(y + 2 * k)} ${n1(x + 7 * k)} ${n1(y + 10 * k)}V${n1(y + 26 * k)}Z" fill="#40505e"/><rect x="${n1(x - 19 * k)}" y="${n1(y - 2 * k)}" width="${n1(38 * k)}" height="${n1(4 * k)}" fill="${wall}"/>`;
  g += t(24 * k, 24 * k, y - 2 * k); y -= 26 * k;
  g += `<rect x="${n1(x - 5 * k)}" y="${n1(y + 6 * k)}" width="${n1(10 * k)}" height="${n1(14 * k)}" fill="#40505e"/><path d="M${n1(x - 5 * k)} ${n1(y + 6 * k)}Q${x} ${n1(y)} ${n1(x + 5 * k)} ${n1(y + 6 * k)}Z" fill="#40505e"/>`;
  g += `<rect x="${n1(x - 15 * k)}" y="${n1(y - 3 * k)}" width="${n1(30 * k)}" height="${n1(4 * k)}" fill="${wall}"/>`;
  g += `<path d="M${n1(x - 11 * k)} ${n1(y - 3 * k)}L${x} ${n1(y - 62 * k)}L${n1(x + 11 * k)} ${n1(y - 3 * k)}Z" fill="${wall}"/><path d="M${x} ${n1(y - 62 * k)}L${n1(x + 11 * k)} ${n1(y - 3 * k)}H${x}Z" fill="${shade}"/>`;
  g += `<path d="M${x} ${n1(y - 62 * k)}v${n1(-12 * k)}" stroke="${vane}" stroke-width="${n1(1.4 * k)}"/><path d="M${n1(x - 5 * k)} ${n1(y - 69 * k)}L${n1(x + 6 * k)} ${n1(y - 72 * k)}L${n1(x + 6 * k)} ${n1(y - 67 * k)}Z" fill="${vane}"/>`;
  s.add(`<g>${g}</g>`);
}

/** Compact skyline: building silhouettes are one <path> per colour; lit windows come from a repeating pattern. */
export function city(s, { x0 = 0, x1, base, hmin = 30, hmax = 120, colors = ['#47647d', '#3b566e', '#566f87'], win = '#ffd98a', op = 0.8, wmin = 14, wmax = 30, cap = 0.25 } = {}) {
  x1 = x1 ?? s.w;
  const pid = s.gid('wp');
  let tile = '';
  for (let i = 0; i < 4; i++) tile += `<rect x="${(i % 4) * 7 + 2}" y="${Math.floor(s.rnd(0, 3)) * 9 + 2}" width="2.6" height="3.6"/>`;
  s.def(`<pattern id="${pid}" patternUnits="userSpaceOnUse" width="28" height="27"><g fill="${win}" opacity="${op}">${tile}</g></pattern>`);
  const groups = colors.map(() => '');
  let x = x0;
  while (x < x1) {
    const bw = s.rnd(wmin, wmax), bh = s.rnd(hmin, hmax);
    const gi = Math.floor(s.r() * colors.length);
    let d = `M${Math.round(x)} ${base + 3}V${Math.round(base - bh)}h${Math.round(bw)}V${base + 3}z`;
    if (s.r() < cap) d += `M${Math.round(x + bw * 0.3)} ${Math.round(base - bh)}v-6h${Math.round(bw * 0.4)}v6z`;
    groups[gi] += d;
    x += bw + s.rnd(0, 3);
  }
  groups.forEach((d, i) => {
    if (!d) return;
    const id = s.gid('sk');
    s.def(`<path id="${id}" d="${d}"/>`);
    s.add(`<use href="#${id}" fill="${colors[i]}"/><use href="#${id}" fill="url(#${pid})"/>`);
  });
}
/** Tall brick tenement with a window grid from one repeating pattern tile (2 x 2 windows, some lit). */
export function tenement(s, x, yB, w, h, { col = '#a9503c', bp, trim = '#d9c9a8', lit = '#ffd88a', dark = '#3b4a5c', pid } = {}) {
  if (!pid && s.__tp) pid = s.__tp;
  if (!pid) {
    pid = s.__tp = s.gid('tp');
    let t = '';
    const on = [s.r() < 0.5, s.r() < 0.5, s.r() < 0.5, s.r() < 0.5];
    [[8, 8], [40, 8], [8, 46], [40, 46]].forEach(([a, b], i) => {
      t += `<rect x="${a - 2}" y="${b - 3}" width="18" height="3" fill="${trim}"/><rect x="${a}" y="${b}" width="14" height="24" fill="${on[i] ? lit : dark}"/><rect x="${a - 2}" y="${b + 24}" width="18" height="3" fill="${trim}"/>`;
    });
    s.def(`<pattern id="${pid}" patternUnits="userSpaceOnUse" width="64" height="76">${t}</pattern>`);
  }
  const cols = Math.max(1, Math.floor((w - 6) / 32)), rows = Math.max(1, Math.floor((h - 50) / 38));
  const ww = cols * 32, hh = rows * 38;
  let g = `<rect x="${x}" y="${yB - h}" width="${w}" height="${h}" fill="${col}"/>`;
  if (bp) g += `<rect x="${x}" y="${yB - h}" width="${w}" height="${h}" fill="${bp}"/>`;
  g += `<rect x="${x - 2}" y="${yB - h - 5}" width="${w + 4}" height="6" fill="${trim}"/><g transform="translate(${n1(x + (w - ww) / 2)} ${yB - h + 10})"><rect width="${ww}" height="${hh}" fill="url(#${pid})"/></g>`;
  s.add(g);
}

/** Round long decimals so the SVG stays small. */
export const squeeze = (svg) => svg.replace(/\d+\.\d{3,}/g, (m) => String(Math.round(parseFloat(m) * 10) / 10));
