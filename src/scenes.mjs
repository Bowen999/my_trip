import { Scene, rng } from './art.mjs';
const n1 = (n) => Math.round(n * 10) / 10;

/* ---------------- palettes ---------------- */
export const SKY = {
  day: ['#5fa8d8', '#9fcdea', '#f2e6c8'],
  clear: ['#4a96d0', '#86c1e6', '#e6eee6'],
  gold: ['#6a8dc0', '#e6b38c', '#fbd98e'],
  dusk: ['#26335c', '#76588c', '#ee9a64', '#f9d089'],
  night: ['#050a1e', '#0e1a40', '#223c74'],
  mist: ['#8da4b5', '#b8c6cf', '#e0e4e0'],
  winter: ['#8fb0cc', '#c9dbe8', '#f2f0ea'],
  spring: ['#76b4dc', '#b4d8ea', '#f4ecd2'],
};
const TONE = {
  day: { m: ['#a9bfd3', '#7f9bb6', '#587692', '#3d586f'], snow: '#f7fafc', shade: 'rgba(15,35,70,.26)' },
  gold: { m: ['#cdb7bd', '#a98ea6', '#7e6a8c', '#54496f'], snow: '#fff1da', shade: 'rgba(40,20,70,.28)' },
  dusk: { m: ['#957ca6', '#6e5c92', '#47407c', '#2c2c5e'], snow: '#f6d5c2', shade: 'rgba(10,10,50,.32)' },
  night: { m: ['#20305e', '#192650', '#121c42', '#0b1332'], snow: '#8fa6d8', shade: 'rgba(0,0,20,.32)' },
  winter: { m: ['#c8d7e3', '#a6bccd', '#839db3', '#617f98'], snow: '#ffffff', shade: 'rgba(30,60,100,.22)' },
  mist: { m: ['#b6c4cf', '#97a9b8', '#768b9d', '#566c80'], snow: '#eef3f6', shade: 'rgba(20,40,60,.22)' },
};
const PINE = ['#1d4a3c', '#26584a', '#173a31'];
const PINE_D = ['#102b25', '#15362e', '#0b201b'];
const PINE_N = ['#0a1b20', '#0e252b', '#07151a'];
const LARCH = ['#e0a627', '#f0c04a', '#c98a1c', '#d99a2b'];

/* ---------------- helpers ---------------- */
function rocks(s, { x0, x1, y, n = 8, colors = ['#7b8088', '#8d939b', '#656b73'], smin = 14, smax = 40 }) {
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = s.rnd(x0, x1),
      w = s.rnd(smin, smax),
      h = w * s.rnd(0.45, 0.8),
      yy = y + s.rnd(-4, 6);
    const c = s.pick(colors);
    out += `<path d="M${x - w / 2} ${yy}L${x - w * 0.38} ${yy - h * 0.7}L${x - w * 0.05} ${yy - h}L${x + w * 0.36} ${yy - h * 0.8}L${x + w / 2} ${yy}Z" fill="${c}"/><path d="M${x - w * 0.05} ${yy - h}L${x + w * 0.36} ${yy - h * 0.8}L${x + w / 2} ${yy}L${x + w * 0.1} ${yy}Z" fill="rgba(0,0,0,.18)"/>`;
  }
  s.add(out);
}
function person(s, x, y, k = 1, c = '#d6453d') {
  s.add(`<g transform="translate(${x} ${y}) scale(${k})"><circle cx="0" cy="-9" r="2.6" fill="#f0c9a4"/><path d="M-3 -6h6l1 8h-8z" fill="${c}"/></g>`);
}
function canoe(s, x, y, k = 1, c = '#c8372d') {
  s.add(
    `<g transform="translate(${x} ${y}) scale(${k})"><g class="bob"><path d="M-26 0Q0 8 26 0L22 -4Q0 3 -22 -4Z" fill="${c}"/><path d="M-26 0Q0 8 26 0" stroke="rgba(0,0,0,.25)" fill="none"/><circle cx="-5" cy="-8" r="2.6" fill="#f0c9a4"/><path d="M-8 -6h6l1 4h-8z" fill="#1f5ea8"/><circle cx="7" cy="-8" r="2.6" fill="#f0c9a4"/><path d="M4 -6h6l1 4h-8z" fill="#f4d03f"/></g></g>`
  );
}
function bird(s, x, y, k = 1) {
  s.add(`<path class="bird" d="M${x} ${y}q${6 * k} ${-6 * k} ${12 * k} 0q${6 * k} ${-6 * k} ${12 * k} 0" fill="none" stroke="#243447" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`);
}
function ranges(s, { base, tone = 'day', layers = 3, hmin = 110, hmax = 200, n = 5, snowY, refs = true }) {
  const T = TONE[tone];
  const ids = [];
  const fills = [];
  for (let i = 0; i < layers; i++) {
    const b = base - (layers - 1 - i) * 0 + 0;
    const k = i / Math.max(1, layers - 1);
    const sil = s.peaks({
      base: b - (layers - 1 - i) * -6,
      n: n + i,
      hmin: hmin * (1 - k * 0.4),
      hmax: hmax * (1 - k * 0.45),
      smin: 0.9 + k * 0.1,
      smax: 1.55 + k * 0.1,
    });
    const col = T.m[Math.min(i + (layers < 4 ? 1 : 0), 3)];
    const id = s.mountain(sil, {
      fill: col,
      snowY: snowY != null && i < layers - 1 ? snowY + i * 18 : undefined,
      snow: T.snow,
      shade: T.shade,
      ref: refs,
    });
    ids.push(id);
    fills.push(col);
  }
  return { ids, fills };
}
function steamPuffs(s, x, y, n = 5, c = '#fff') {
  let o = '';
  for (let i = 0; i < n; i++) o += `<circle class="puff" cx="${x + s.rnd(-6, 6)}" cy="${y}" r="${s.rnd(5, 10)}" style="animation-delay:${(i * 0.6).toFixed(1)}s"/>`;
  s.add(`<g fill="${c}" opacity=".85">${o}</g>`);
}

/* ================================================================== */
/*  Scenes                                                             */
/* ================================================================== */
export const scenes = {};

/* ---------- Hero: west coast → Rockies panorama (parallax groups) ---------- */
scenes.hero = (uid = '') => {
  const s = new Scene(uid + 'hero', { w: 1600, h: 760, seed: 11 });
  s.add(`<g class="px" data-s="0.45">`);
  s.sky(['#4f93cf', '#8fc3e6', '#f1e4c4', '#fbe0a5'], { sun: { x: 1180, y: 190, r: 38, c: '#fff6d2', glow: '#ffe7a0' } });
  s.cloud(260, 150, 1.6, { cls: 'cl cl1', o: 0.92 }).cloud(760, 100, 1.2, { cls: 'cl cl2', o: 0.85 }).cloud(1380, 130, 1.8, { cls: 'cl cl3', o: 0.9 }).cloud(980, 250, 0.9, { cls: 'cl cl1', o: 0.7 });
  s.add('</g>');
  bird(s, 520, 180, 1.4);
  bird(s, 548, 198, 1);
  bird(s, 1000, 120, 1.2);
  // far range (east side only taller)
  s.add(`<g class="px" data-s="0.30">`);
  const far = s.peaks({ base: 470, n: 9, hmin: 120, hmax: 260, smin: 0.9, smax: 1.5 });
  // fade the left (coast) side down: flatten x<500
  far.forEach((p) => {
    if (p[0] < 520) p[1] = 470 - (470 - p[1]) * Math.max(0.12, p[0] / 520);
  });
  s.mountain(far, { fill: '#a9bfd3', snowY: 300, snow: '#fafcfe', shade: 'rgba(15,35,70,.22)' });
  s.add('</g>');
  // sea on left with skyline
  s.add(`<g class="px" data-s="0.2">`);
  const mid = s.peaks({ base: 520, n: 8, hmin: 110, hmax: 240, smin: 0.95, smax: 1.6 });
  mid.forEach((p) => {
    if (p[0] < 560) p[1] = 520 - (520 - p[1]) * Math.max(0.05, (p[0] / 560) ** 1.6);
  });
  s.mountain(mid, { fill: '#7f9bb6', snowY: 360, snow: '#f4f8fb', shade: 'rgba(15,35,70,.26)' });
  s.add('</g>');
  s.add(`<g class="px" data-s="0.12">`);
  s.skyline({ x0: 70, x1: 430, base: 560, hmin: 36, hmax: 150, colors: ['#52708b', '#466179', '#5d7a94'], win: '#ffe7a6', lit: 0.3, wmin: 14, wmax: 26 });
  const near = s.peaks({ base: 600, n: 9, hmin: 90, hmax: 200, smin: 0.95, smax: 1.5 });
  near.forEach((p) => {
    if (p[0] < 600) p[1] = 600 - (600 - p[1]) * Math.max(0.04, (p[0] / 600) ** 2);
  });
  const nid = s.mountain(near, { fill: '#58748f', snowY: 470, snow: '#eef4f8', shade: 'rgba(10,30,60,.3)', ref: true });
  // water
  const fid = s.mountain(s.hills({ base: 600, n: 5, hmin: 40, hmax: 90 }), { fill: '#2f5d55', facets: false, ref: true });
  s.add('</g>');
  s.add(`<g>`);
  s.water(600, { c1: '#47c7c6', c2: '#1b7f93', refs: [nid, fid], refFill: ['#2c4a60', '#1c3a35'], ripples: 14, o: 0.5 });
  s.add('</g>');
  canoe(s, 1060, 655, 1.6);
  s.add(`<g class="px" data-s="0">`);
  s.forest({ y: 640, x0: -20, x1: 520, n: 22, hmin: 34, hmax: 60, colors: PINE, jitter: 10 });
  s.forest({ y: 676, x0: 1000, x1: 1620, n: 30, hmin: 46, hmax: 96, colors: PINE_D, jitter: 10 });
  s.forest({ y: 760, x0: -30, x1: 400, n: 14, hmin: 78, hmax: 128, colors: PINE_D, jitter: 8 });
  s.forest({ y: 770, x0: 1250, x1: 1640, n: 12, hmin: 90, hmax: 150, colors: ['#0c211c', '#0f2a23', '#081a16'], jitter: 8 });
  // larches (gold) on the right shore
  s.forest({ y: 664, x0: 1120, x1: 1500, n: 16, hmin: 36, hmax: 70, colors: LARCH, kind: 'larch', jitter: 8 });
  s.add('</g>');
  return s.svg({ label: '从温哥华海岸到落基山脉的全景插画', cls: 'hero-art' });
};

/* ---------- Vancouver: skyline, North Shore, Lions Gate ---------- */
scenes.stanley = (uid = '') => {
  const s = new Scene(uid + 'stanley', { seed: 21 });
  s.sky(SKY.gold, { sun: { x: 610, y: 120, r: 26, c: '#fff1c2', glow: '#ffd98a' } });
  s.cloud(160, 90, 1.1, { cls: 'cl cl2' }).cloud(430, 60, 0.9, { cls: 'cl cl1', o: 0.8 });
  const m = s.peaks({ base: 250, n: 6, hmin: 80, hmax: 150, smin: 0.7, smax: 1.1, jag: 2 });
  const id1 = s.mountain(m, { fill: '#8f89a6', snowY: 170, snow: '#fdf0e0', shade: 'rgba(40,20,70,.25)', ref: true });
  const m2 = s.hills({ base: 270, n: 5, hmin: 50, hmax: 90, wmin: 100, wmax: 180 });
  const id2 = s.mountain(m2, { fill: '#5d6c8a', facets: false, ref: true });
  s.skyline({ x0: 20, x1: 330, base: 292, hmin: 30, hmax: 110, colors: ['#4e5f80', '#43547a', '#5a6a8a'], win: '#ffe0a0', lit: 0.3 });
  // Lions Gate bridge
  const hang = [...Array(11)].map((_, i) => { const t = i / 10; const x = 480 + t * 190; const yy = 290 - 8 - Math.sin(t * Math.PI) * 0; return `M${n1(x)} 290V${n1(240 + Math.sin(t * Math.PI) * 30)}`; }).join('');
  s.add(`<g stroke="#2f3c58" fill="none"><path d="M350 290H790" stroke-width="5"/><path d="M460 290V222M690 290V222" stroke-width="5"/><path d="M350 290Q410 250 460 224Q575 300 690 224Q740 252 790 290" stroke-width="2"/><path d="${hang}" stroke-width="1"/></g>`);
  s.water(292, { c1: '#4b86a8', c2: '#1d4f72', refs: [id1, id2], refFill: ['#6a6490', '#394560'], ripples: 10, o: 0.4 });
  // sailboats
  s.add(`<g class="bob"><path d="M300 330h40l-6 8h-28z" fill="#f3efe6"/><path d="M320 330V296L342 326Z" fill="#fff"/><path d="M317 330V300L301 326Z" fill="#e8d8c0"/></g>`);
  s.add(`<g class="bob b2"><path d="M520 350h30l-5 6h-20z" fill="#d6453d"/><path d="M535 350V324L551 346Z" fill="#fff"/></g>`);
  // park shore + trees + totem
  s.add(`<path d="M0 392Q180 360 330 384T800 372V450H0Z" fill="#2f6a4f"/>`);
  s.forest({ y: 392, x0: 0, x1: 800, n: 26, hmin: 40, hmax: 84, colors: PINE, jitter: 10 });
  s.add(`<path d="M0 424Q300 408 800 420V450H0Z" fill="#c8b48a"/><path d="M0 436Q300 424 800 434" stroke="#a3926c" stroke-width="2" fill="none"/>`);
  s.totem(612, 424, 0.78);
  person(s, 250, 432, 1.1, '#2c7bb6');
  person(s, 276, 436, 1.1, '#e0a627');
  return s.svg({ label: '斯坦利公园与温哥华天际线' });
};

scenes.granville = (uid = '') => {
  const s = new Scene(uid + 'granville', { seed: 22 });
  s.sky(SKY.day, { sun: { x: 120, y: 90, r: 24, c: '#fff6cf' } });
  s.cloud(500, 80, 1.2, { cls: 'cl cl1' }).cloud(300, 130, 0.8, { cls: 'cl cl2', o: 0.7 });
  const m = s.hills({ base: 240, n: 5, hmin: 40, hmax: 90 });
  const id = s.mountain(m, { fill: '#7d93aa', facets: false, ref: true });
  s.skyline({ x0: 380, x1: 800, base: 262, hmin: 40, hmax: 150, colors: ['#5e7791', '#516b86', '#6a829a'], lit: 0.25 });
  // Granville bridge
  s.add(`<g fill="#35465c"><rect x="0" y="236" width="800" height="9"/><rect x="90" y="245" width="9" height="60"/><rect x="330" y="245" width="9" height="60"/><rect x="570" y="245" width="9" height="60"/></g>`);
  s.water(298, { c1: '#4d9bbd', c2: '#1f6486', refs: [id], refFill: ['#46627d'], ripples: 12, o: 0.35 });
  // market
  s.add(`<g><rect x="430" y="300" width="300" height="70" fill="#d8744c"/><rect x="430" y="300" width="300" height="10" fill="#8f3d2b"/><path d="M420 300L580 262L740 300Z" fill="#7a2f23"/><rect x="460" y="322" width="46" height="48" fill="#f1d78a"/><rect x="520" y="322" width="46" height="48" fill="#e9eef0"/><rect x="580" y="322" width="46" height="48" fill="#f1d78a"/><rect x="640" y="322" width="46" height="48" fill="#e9eef0"/><rect x="500" y="276" width="160" height="18" fill="#f6e8c4"/><text x="580" y="290" text-anchor="middle" font-size="12" font-weight="700" fill="#7a2f23" font-family="serif">PUBLIC MARKET</text></g>`);
  s.add(`<rect x="0" y="372" width="800" height="78" fill="#8b6b4a"/>${[...Array(18)].map((_, i) => `<path d="M${i * 46} 372V450" stroke="#6f5338" stroke-width="2"/>`).join('')}`);
  // aquabus boats
  s.add(`<g class="bob"><path d="M120 340h110l-14 22h-84z" fill="#f3b83c"/><rect x="140" y="318" width="64" height="22" rx="3" fill="#fff"/><rect x="148" y="324" width="48" height="9" fill="#5aa7c9"/></g>`);
  s.add(`<g class="bob b2"><path d="M280 330h80l-10 18h-60z" fill="#2b88c7"/><rect x="298" y="312" width="44" height="18" rx="3" fill="#fff"/><rect x="304" y="317" width="32" height="8" fill="#9bd0e8"/></g>`);
  for (const [x, c] of [[470, '#d6453d'], [520, '#2c7bb6'], [610, '#e0a627'], [690, '#6aa84f']]) person(s, x, 392, 1.5, c);
  s.add(`<g fill="#e07a5f"><circle cx="52" cy="400" r="26"/></g><g fill="#2d6a4f"><circle cx="40" cy="394" r="8"/></g>`);
  return s.svg({ label: '格兰维尔岛公共市场与小渡轮' });
};

scenes.gastown = (uid = '') => {
  const s = new Scene(uid + 'gastown', { seed: 23 });
  s.sky(SKY.dusk);
  s.add(`<rect x="0" y="260" width="800" height="190" fill="#3b3140"/>`);
  // buildings left/right
  const bld = (x, w, h, c, y0 = 380) => {
    s.add(`<rect x="${x}" y="${y0 - h}" width="${w}" height="${h + 80}" fill="${c}"/>`);
    let ws = '';
    for (let yy = y0 - h + 14; yy < y0 - 20; yy += 34) for (let xx = x + 10; xx < x + w - 14; xx += 28) ws += `<rect x="${xx}" y="${yy}" width="14" height="20" rx="7" fill="${s.r() < 0.55 ? '#ffd98a' : '#2a2438'}"/>`;
    s.add(ws);
    s.add(`<rect x="${x - 4}" y="${y0 - h - 6}" width="${w + 8}" height="8" fill="rgba(0,0,0,.25)"/>`);
  };
  bld(-10, 120, 210, '#9a4a3a');
  bld(110, 110, 170, '#b5604a');
  bld(570, 130, 190, '#a35541');
  bld(690, 130, 230, '#8a4034');
  bld(210, 70, 120, '#7a3a30');
  bld(520, 60, 130, '#7a3a30');
  // street
  s.add(`<path d="M0 450L260 360H540L800 450Z" fill="#4a4152"/>`);
  for (let i = 0; i < 40; i++) s.add(`<ellipse cx="${s.rnd(80, 720)}" cy="${s.rnd(380, 446)}" rx="${s.rnd(6, 14)}" ry="3" fill="rgba(255,255,255,.07)"/>`);
  // steam clock
  s.add(`<g id="gastown-clock" class="steam-clock" style="cursor:pointer">
    <rect x="368" y="270" width="64" height="112" fill="#2b2a2f"/><rect x="360" y="376" width="80" height="14" fill="#1f1e22"/>
    <rect x="364" y="250" width="72" height="26" fill="#3a3940"/><path d="M360 252L400 214L440 252Z" fill="#1f1e22"/>
    <rect x="394" y="196" width="12" height="22" fill="#3a3940"/><circle cx="400" cy="192" r="6" fill="#c9a24a"/>
    <circle cx="400" cy="318" r="26" fill="#f4efe0" stroke="#c9a24a" stroke-width="4"/>
    <g stroke="#2b2a2f" stroke-width="2" stroke-linecap="round"><path d="M400 318V300"/><path d="M400 318L412 324"/></g>
    <g stroke="#2b2a2f" stroke-width="2">${[...Array(12)].map((_, i) => { const a = (i / 12) * Math.PI * 2; return `<path d="M${400 + Math.sin(a) * 22} ${318 - Math.cos(a) * 22}L${400 + Math.sin(a) * 25} ${318 - Math.cos(a) * 25}"/>`; }).join('')}</g>
    <g fill="#c9a24a">${[-24, -12, 0, 12, 24].map((x) => `<rect x="${400 + x - 3}" y="236" width="6" height="14"/>`).join('')}</g>
    <circle cx="400" cy="318" r="40" fill="transparent"/></g>`);
  steamPuffs(s, 400, 236, 6);
  // lamps
  for (const x of [300, 500, 140, 660]) s.add(`<g><rect x="${x - 2}" y="${330 - (x % 7)}" width="4" height="80" fill="#1f1e22"/><circle cx="${x}" cy="${326 - (x % 7)}" r="28" fill="${s.rad('#ffd27a', 0.6)}"/><circle cx="${x}" cy="${326 - (x % 7)}" r="6" fill="#ffe7ad"/></g>`);
  for (const [x, y, c] of [[330, 410, '#2c7bb6'], [346, 414, '#d6453d'], [460, 408, '#e0a627'], [610, 424, '#6aa84f']]) person(s, x, y, 1.9, c);
  return s.svg({ label: '煤气镇蒸汽钟', cls: 'gastown' });
};

scenes.capilano = (uid = '') => {
  const s = new Scene(uid + 'capilano', { seed: 24 });
  s.sky(SKY.mist);
  s.add(`<rect x="0" y="0" width="800" height="450" fill="${s.rad('#fff', 0.6)}" opacity=".0"/>`);
  // far forest
  s.forest({ y: 250, x0: 0, x1: 800, n: 38, hmin: 70, hmax: 150, colors: ['#4d7a68', '#5b8873', '#44705f'], jitter: 20 });
  s.add(`<rect x="0" y="250" width="800" height="200" fill="${s.lin(['#4d7a68', '#9cb8ae', '#d3dfdb'])}"/>`);
  s.forest({ y: 300, x0: 150, x1: 650, n: 26, hmin: 50, hmax: 100, colors: ['#3d6a58', '#497664', '#335e4e'], jitter: 14 });
  // cliffs
  s.add(`<path d="M0 200L120 210L180 250L220 330L260 450H0Z" fill="#5e5a57"/><path d="M800 190L690 205L640 250L600 330L560 450H800Z" fill="#5a5653"/>`);
  s.add(`<path d="M0 200L120 210L180 250L220 330L260 450L200 450L150 300L100 250Z" fill="rgba(0,0,0,.2)"/>`);
  s.forest({ y: 205, x0: -10, x1: 200, n: 8, hmin: 80, hmax: 150, colors: PINE_D, jitter: 6 });
  s.forest({ y: 195, x0: 620, x1: 810, n: 8, hmin: 80, hmax: 150, colors: PINE_D, jitter: 6 });
  // river
  s.add(`<path d="M230 450L270 400Q400 380 530 400L570 450Z" fill="${s.lin(['#6fd1c9', '#2a8c8a'])}"/>`);
  // bridge
  let planks = '';
  for (let i = 0; i <= 40; i++) {
    const t = i / 40;
    const x = 130 + t * 540;
    const y = 232 + Math.sin(t * Math.PI) * 14;
    planks += `<path d="M${x} ${y - 1}v5" stroke="#a97d4f" stroke-width="5"/>`;
  }
  const hang = [];
  for (let i = 1; i < 20; i++) {
    const t = i / 20;
    const x = 130 + t * 540;
    const y = 232 + Math.sin(t * Math.PI) * 14;
    hang.push(`<path d="M${x} ${y}V${y - 22}"/>`);
  }
  s.add(`<g class="sway" style="transform-origin:400px 232px">
    <path d="M130 233Q400 262 670 233" stroke="#6e4b2b" stroke-width="7" fill="none"/>${planks}
    <path d="M130 211Q400 240 670 211" stroke="#2f2c2a" stroke-width="2" fill="none"/>
    <g stroke="#2f2c2a" stroke-width="1.2">${hang.join('')}</g>
    ${[[220, 236, '#d6453d'], [300, 244, '#2c7bb6'], [380, 247, '#e0a627'], [470, 246, '#6aa84f'], [560, 240, '#d6453d']].map(([x, y, c]) => `<g transform="translate(${x} ${y})"><circle cx="0" cy="-12" r="3.2" fill="#f0c9a4"/><path d="M-4 -8h8l1 9h-10z" fill="${c}"/></g>`).join('')}
  </g>`);
  // mist + foreground giants
  s.add(`<ellipse cx="400" cy="420" rx="260" ry="40" fill="#fff" opacity=".35" class="cl cl2"/>`);
  s.forest({ y: 470, x0: -40, x1: 160, n: 3, hmin: 280, hmax: 360, colors: ['#0f2a22', '#12332a'], jitter: 0 });
  s.forest({ y: 470, x0: 660, x1: 840, n: 3, hmin: 280, hmax: 360, colors: ['#0f2a22', '#12332a'], jitter: 0 });
  return s.svg({ label: '卡皮拉诺吊桥', cls: 'capilano' });
};

scenes.grouse = (uid = '') => {
  const s = new Scene(uid + 'grouse', { seed: 25 });
  s.sky(SKY.dusk, { sun: { x: 130, y: 300, r: 34, c: '#ffe6a8', glow: '#ffb86a' } });
  s.cloud(250, 120, 1.3, { cls: 'cl cl1', c: '#ffd9c0', o: 0.8 }).cloud(600, 70, 1, { cls: 'cl cl2', c: '#ffd9c0', o: 0.7 });
  // Vancouver Island silhouette on horizon
  s.add(`<path d="M0 300Q80 280 160 292T330 296T520 288V450H0Z" fill="#4b4678"/>`);
  s.skyline({ x0: 60, x1: 300, base: 340, hmin: 14, hmax: 56, colors: ['#3a3466', '#352f5e'], win: '#ffd98a', lit: 0.4, wmin: 8, wmax: 14 });
  s.add(`<path d="M0 340H520V450H0Z" fill="${s.lin(['#6a5a98', '#3b3668'])}"/>`);
  const peak = [];
  for (let x = 280; x <= 820; x += 5) {
    const m = Math.max(0, 330 - Math.abs(x - 650) * (x < 650 ? 0.62 : 0.95), 170 - Math.abs(x - 790) * 0.8);
    peak.push([x, 450 - m + Math.sin(x * 0.6) * 2.2]);
  }
  s.mountain(peak, { fill: '#3c3a6e', snowY: 150, snow: '#ffd9c0', shade: 'rgba(8,8,40,.4)' });
  s.add(`<path d="M0 450H280V440Q150 430 0 440Z" fill="#2b2860"/>`);
  s.forest({ y: 452, x0: 250, x1: 800, n: 30, hmin: 36, hmax: 84, colors: PINE_N, jitter: 10 });
  // cable and gondolas
  const path = 'M180 436Q420 330 650 126';
  s.add(`<path d="${path}" stroke="#1d1b3a" stroke-width="2.4" fill="none"/>`);
  s.add(`<g fill="#1d1b3a"><rect x="318" y="350" width="6" height="90"/><rect x="480" y="262" width="6" height="170"/></g>`);
  for (const [dur, begin, c] of [[26, 0, '#d6453d'], [26, -13, '#e8b53c']]) {
    s.add(`<g><g><rect x="-16" y="3" width="32" height="20" rx="4" fill="${c}"/><rect x="-11" y="8" width="22" height="9" fill="#fff6dc"/><path d="M0 0V3" stroke="#1d1b3a" stroke-width="2"/><animateMotion dur="${dur}s" begin="${begin}s" repeatCount="indefinite" rotate="auto" path="${path}" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"/></g></g>`);
  }
  s.add(`<g><rect x="636" y="112" width="56" height="24" fill="#fff6dc"/><path d="M630 112L664 88L698 112Z" fill="#2b2848"/><rect x="650" y="120" width="8" height="10" fill="#ffd98a"/><rect x="668" y="120" width="8" height="10" fill="#ffd98a"/></g>`);
  return s.svg({ label: '松鸡山缆车' });
};

scenes.steveston = (uid = '') => {
  const s = new Scene(uid + 'steveston', { seed: 26 });
  s.sky(SKY.gold, { sun: { x: 420, y: 250, r: 34, c: '#fff1c2', glow: '#ffb864' } });
  s.cloud(160, 100, 1.2, { cls: 'cl cl1', c: '#ffe6cf' }).cloud(620, 80, 1.1, { cls: 'cl cl2', c: '#ffe6cf', o: 0.8 });
  s.add(`<path d="M0 270Q200 258 400 268T800 262V450H0Z" fill="#6f7ba0" opacity=".6"/>`);
  s.add(`<rect x="0" y="270" width="800" height="180" fill="${s.lin(['#e9a56a', '#4b5f86', '#2c3d63'])}"/>`);
  s.add(`<path d="M280 276H560" stroke="#fff3cf" stroke-width="3" opacity=".5" class="rip"/><path d="M320 290H520" stroke="#fff3cf" stroke-width="2.4" opacity=".4" class="rip"/>`);
  // fishing boats
  const boat = (x, y, k, c, c2) => s.add(`<g transform="translate(${x} ${y}) scale(${k})"><g class="bob"><path d="M-70 0H70L56 24H-52Z" fill="${c}"/><rect x="-20" y="-30" width="44" height="30" fill="#f6efe0"/><rect x="-12" y="-24" width="28" height="12" fill="#6fa6c4"/><rect x="-24" y="-34" width="52" height="6" fill="${c2}"/><path d="M-50 0V-70M-50 -64L-90 -10M-50 -64L10 -8" stroke="#2c3347" stroke-width="2.4" fill="none"/></g></g>`);
  boat(560, 360, 1.15, '#2c6e8f', '#d6453d');
  boat(240, 390, 1.4, '#c0392b', '#2c3347');
  // wharf
  s.add(`<rect x="0" y="402" width="800" height="48" fill="#6a4b34"/>${[...Array(26)].map((_, i) => `<path d="M${i * 32} 402V450" stroke="#4e3624" stroke-width="2"/>`).join('')}`);
  s.add(`<g fill="#4e3624"><rect x="60" y="386" width="10" height="20"/><rect x="380" y="386" width="10" height="20"/><rect x="700" y="386" width="10" height="20"/></g>`);
  // colorful houses
  [[610, '#f0b34a'], [660, '#3d8fb8'], [710, '#d9563f'], [760, '#7bb661']].forEach(([x, c]) => s.add(`<rect x="${x - 20}" y="338" width="44" height="64" fill="${c}"/><path d="M${x - 24} 340L${x + 2} 316L${x + 28} 340Z" fill="#3b3040"/><rect x="${x - 8}" y="356" width="12" height="14" fill="#fff4d8"/>`));
  bird(s, 140, 200, 1.4);
  bird(s, 180, 220, 1);
  bird(s, 660, 170, 1.2);
  return s.svg({ label: '史蒂文斯顿渔人码头' });
};

scenes.whistler = (uid = '') => {
  const s = new Scene(uid + 'whistler', { seed: 27 });
  s.sky(SKY.clear, { sun: { x: 90, y: 80, r: 22, c: '#fff8da' } });
  s.cloud(380, 70, 1.1, { cls: 'cl cl1' }).cloud(640, 110, 0.8, { cls: 'cl cl2', o: 0.7 });
  const far = s.peaks({ base: 290, n: 5, hmin: 110, hmax: 190, smin: 0.9, smax: 1.4 });
  s.mountain(far, { fill: '#a7bdd0', snowY: 180, snow: '#fbfdff' });
  // two big peaks
  const big = [];
  for (let x = -20; x <= 820; x += 5) {
    const a = 270 - Math.max(0, 230 - Math.abs(x - 170) * 1.15);
    const b = 270 - Math.max(0, 250 - Math.abs(x - 640) * 1.2);
    big.push([x, Math.min(a, b, 330) + (Math.sin(x * 0.7) * 2.5)]);
  }
  s.mountain(big, { fill: '#6f8ba8', snowY: 190, snow: '#ffffff', shade: 'rgba(15,35,70,.3)' });
  // valley village
  s.add(`<rect x="0" y="330" width="800" height="120" fill="#2e5b46"/>`);
  s.forest({ y: 340, x0: 0, x1: 800, n: 40, hmin: 30, hmax: 62, colors: PINE, jitter: 12 });
  s.add(`<g>${[...Array(14)].map((_, i) => `<rect x="${300 + i * 16}" y="${396 + (i % 3) * 3}" width="12" height="10" fill="${['#d9563f', '#f0b34a', '#e8dcc2'][i % 3]}"/><path d="M${298 + i * 16} ${397 + (i % 3) * 3}L${306 + i * 16} ${389 + (i % 3) * 3}L${314 + i * 16} ${397 + (i % 3) * 3}Z" fill="#3b3040"/>`).join('')}</g>`);
  // peak 2 peak cable
  const path = 'M170 62Q400 168 640 52';
  s.add(`<path d="${path}" stroke="#222a38" stroke-width="2.2" fill="none"/><rect x="164" y="42" width="12" height="26" fill="#222a38"/><rect x="634" y="34" width="12" height="26" fill="#222a38"/>`);
  for (const [b, c] of [[0, '#d6453d'], [-17, '#f3f6fa']]) s.add(`<g><g><rect x="-14" y="2" width="28" height="18" rx="4" fill="${c}" stroke="#222a38" stroke-width="1"/><rect x="-9" y="6" width="18" height="8" fill="#9bd0e8"/><animateMotion dur="34s" begin="${b}s" repeatCount="indefinite" path="${path}" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"/></g></g>`);
  return s.svg({ label: '惠斯勒双峰缆车' });
};

/* ---------- Alberta ---------- */
scenes.banff = (uid = '') => {
  const s = new Scene(uid + 'banff', { seed: 31 });
  s.sky(SKY.day, { sun: { x: 700, y: 80, r: 22, c: '#fff6d0' } });
  s.cloud(160, 80, 1.2, { cls: 'cl cl1' }).cloud(450, 50, 0.9, { cls: 'cl cl2', o: 0.8 });
  const far = s.peaks({ base: 280, n: 4, hmin: 90, hmax: 150, smin: 0.9, smax: 1.3 });
  s.mountain(far, { fill: '#a9bfd3', snowY: 190 });
  // Cascade mountain: big and blocky
  const cas = [];
  for (let x = -20; x <= 820; x += 5) {
    const v = Math.max(0, 230 - Math.abs(x - 250) * 0.95, 190 - Math.abs(x - 420) * 0.9 + Math.sin(x * 0.2) * 4);
    cas.push([x, 330 - v + Math.sin(x * 0.45) * 3]);
  }
  s.mountain(cas, { fill: '#6d88a4', snowY: 175, shade: 'rgba(15,35,70,.32)' });
  // Sulphur mountain with gondola line
  const sul = [];
  for (let x = -20; x <= 820; x += 5) sul.push([x, 336 - Math.max(0, 170 - Math.abs(x - 690) * 0.75) + Math.sin(x * 0.5) * 2.5]);
  s.mountain(sul, { fill: '#546f8a', snowY: 190, shade: 'rgba(10,30,60,.3)' });
  s.add(`<path d="M620 330L700 168" stroke="#1d2c3a" stroke-width="1.6"/><rect x="694" y="160" width="20" height="10" fill="#f3efe6"/>`);
  s.add(`<g><g><rect x="-6" y="2" width="12" height="8" rx="2" fill="#d6453d"/><animateMotion dur="22s" repeatCount="indefinite" path="M620 330L700 168" keyPoints="0;1;0" keyTimes="0;.5;1" calcMode="linear"/></g></g>`);
  s.forest({ y: 346, x0: 0, x1: 800, n: 40, hmin: 32, hmax: 60, colors: PINE, jitter: 8 });
  // town rooftops
  s.add(`<rect x="0" y="360" width="800" height="90" fill="#2f4a3d"/>`);
  const cols = ['#c4533a', '#e0a627', '#8c3b2e', '#4e7d6e', '#d98a4e'];
  for (let i = 0; i < 16; i++) {
    const x = 20 + i * 48 + s.rnd(-6, 6),
      w = s.rnd(34, 44),
      y = 372 + s.rnd(0, 18),
      c = s.pick(cols);
    s.add(`<rect x="${x}" y="${y}" width="${w}" height="${450 - y}" fill="#efe3c9"/><path d="M${x - 5} ${y + 2}L${x + w / 2} ${y - 20}L${x + w + 5} ${y + 2}Z" fill="${c}"/><rect x="${x + 7}" y="${y + 10}" width="8" height="10" fill="#6a5a46"/><rect x="${x + w - 15}" y="${y + 10}" width="8" height="10" fill="#6a5a46"/>`);
  }
  return s.svg({ label: '班夫小镇与瀑布山' });
};

scenes.hotspring = (uid = '') => {
  const s = new Scene(uid + 'hotspring', { seed: 32 });
  s.sky(SKY.night, { stars: 90, moon: { x: 620, y: 80, r: 18 } });
  const r = ranges(s, { base: 290, tone: 'night', layers: 3, hmin: 100, hmax: 170, snowY: 200, refs: false });
  s.forest({ y: 320, x0: 0, x1: 800, n: 38, hmin: 36, hmax: 80, colors: PINE_N, jitter: 10 });
  s.add(`<rect x="0" y="330" width="800" height="120" fill="#0b161c"/>`);
  // pool
  s.add(`<ellipse cx="400" cy="396" rx="250" ry="36" fill="#3a4a52"/><ellipse cx="400" cy="394" rx="236" ry="30" fill="${s.lin(['#5fd2d0', '#2a8f9a'])}"/>`);
  s.add(`<path d="M240 392H560M300 402H500" stroke="#fff" stroke-opacity=".35" stroke-width="1.6" class="rip"/>`);
  for (const x of [330, 380, 470]) s.add(`<g><circle cx="${x}" cy="386" r="6" fill="#e5b896"/><path d="M${x - 8} 392Q${x} 380 ${x + 8} 392Z" fill="#e5b896"/></g>`);
  for (const x of [240, 330, 470, 560]) steamPuffs(s, x, 380, 4, '#cfe8f0');
  // pavilion
  s.add(`<rect x="60" y="336" width="120" height="60" fill="#5b4a3a"/><path d="M50 338L120 300L190 338Z" fill="#3c3128"/><rect x="82" y="356" width="14" height="22" fill="#ffd98a"/><rect x="144" y="356" width="14" height="22" fill="#ffd98a"/>`);
  return s.svg({ label: '班夫上温泉夜景' });
};

scenes.johnston = (uid = '') => {
  const s = new Scene(uid + 'johnston', { seed: 33 });
  s.sky(SKY.mist);
  s.add(`<rect width="800" height="450" fill="#1f2c2d"/>`);
  // canyon walls
  s.add(`<path d="M0 0H300L250 120L330 220L290 340L330 450H0Z" fill="#6b6a64"/><path d="M800 0H500L560 110L480 230L520 340L470 450H800Z" fill="#716f68"/>`);
  s.add(`<path d="M300 0L250 120L330 220L290 340L330 450L300 450L262 340L300 220L222 120L270 0Z" fill="rgba(0,0,0,.28)"/>`);
  s.add(`<path d="M500 0L560 110L480 230L520 340L470 450L500 450L548 340L510 230L590 110L530 0Z" fill="rgba(255,255,255,.07)"/>`);
  // sky strip top
  s.add(`<path d="M300 0H500L560 110L480 230L330 220L250 120Z" fill="${s.lin(['#cfe3e8', '#9ec4cc'])}"/>`);
  // waterfall
  s.add(`<path d="M392 120H420L430 330H382Z" fill="#fff" opacity=".95"/><path d="M400 120V330M414 130V320" stroke="#bfe3ea" stroke-width="2"/>`);
  s.add(`<ellipse cx="406" cy="338" rx="50" ry="14" fill="#fff" opacity=".55" class="cl cl2"/>`);
  s.add(`<path d="M300 330Q405 350 510 330L540 450H270Z" fill="${s.lin(['#59cfc8', '#1f8d92'])}"/>`);
  // catwalk
  s.add(`<path d="M0 250L140 262L252 244L310 258" stroke="#8b5a2b" stroke-width="10" fill="none"/><path d="M0 238L140 250L252 232L310 246" stroke="#2c2c2c" stroke-width="2" fill="none"/>`);
  s.add(`<g stroke="#2c2c2c" stroke-width="1.4">${[...Array(10)].map((_, i) => `<path d="M${i * 32} ${238 + (i < 5 ? i * 2.4 : 10 - (i - 5) * 3)}v12"/>`).join('')}</g>`);
  person(s, 90, 250, 1.6, '#d6453d');
  person(s, 150, 262, 1.6, '#2c7bb6');
  s.forest({ y: 20, x0: 220, x1: 300, n: 3, hmin: 60, hmax: 90, colors: PINE_D, jitter: 4 });
  s.forest({ y: 20, x0: 500, x1: 590, n: 3, hmin: 60, hmax: 90, colors: PINE_D, jitter: 4 });
  return s.svg({ label: '约翰斯顿峡谷' });
};

function lakeScene(id, { seed, tone = 'day', sky = SKY.day, lakeY = 300, c1 = '#46c6c4', c2 = '#1b8a96', hmin = 130, hmax = 210, snowY = 190, larch = false, extras }) {
  const s = new Scene(id, { seed });
  s.sky(sky, { sun: tone === 'gold' ? { x: 130, y: 100, r: 24, c: '#fff1c2', glow: '#ffd98a' } : { x: 660, y: 80, r: 22, c: '#fff6d0' } });
  s.cloud(180, 90, 1.2, { cls: 'cl cl1', o: tone === 'gold' ? 0.7 : 0.9 }).cloud(520, 60, 0.9, { cls: 'cl cl2', o: 0.8 });
  const r = ranges(s, { base: lakeY, tone, layers: 3, hmin, hmax, n: 4, snowY });
  const T = TONE[tone];
  s.forest({ y: lakeY - 2, x0: 0, x1: 800, n: 34, hmin: 22, hmax: 44, colors: PINE, jitter: 4 });
  const fid = s.mountain(s.hills({ base: lakeY, n: 0 }), { fill: 'none', facets: false, ref: true });
  s.water(lakeY, { c1, c2, refs: r.ids, refFill: r.fills.map((c) => c), ripples: 10, o: 0.45 });
  extras?.(s, lakeY, fid);
  void T;
  return s;
}

scenes.louise = (uid = '') => {
  const s = lakeScene(uid + 'louise', { seed: 41, lakeY: 292, c1: '#52cbc9', c2: '#1b8a98', extras: null });
  // Mount Victoria + glacier
  s.add(`<path d="M400 112L452 238L470 252H330L348 238Z" fill="#8896ad"/><path d="M400 112L452 238L470 252H420Z" fill="rgba(10,24,52,.28)"/><path d="M400 112L424 160L412 168L430 196L446 232L470 250H330L352 232L372 190L388 168L378 156Z" fill="#fbfeff"/><path d="M386 190L396 248M414 184L420 246M368 214L372 248" stroke="#a9cbe0" stroke-width="2" fill="none"/>`);
  // shores
  s.add(`<path d="M0 292L70 300L150 338L180 450H0Z" fill="#244a3c"/><path d="M800 292L730 300L660 338L620 450H800Z" fill="#244a3c"/>`);
  s.forest({ y: 330, x0: 0, x1: 190, n: 10, hmin: 70, hmax: 130, colors: PINE_D, jitter: 14 });
  s.forest({ y: 330, x0: 620, x1: 810, n: 10, hmin: 70, hmax: 130, colors: PINE_D, jitter: 14 });
  s.chateau({ x: 30, y: 372, w: 170, h: 52 });
  s.add(`<rect x="0" y="420" width="800" height="30" fill="#2b4a3a"/>`);
  canoe(s, 470, 380, 1.5);
  canoe(s, 570, 340, 1.0, '#f3f0e8');
  return s.svg({ label: '路易斯湖与费尔蒙城堡酒店' });
};

scenes.moraine = (uid = '', autumn = true) => {
  const s = new Scene(uid + 'moraine', { seed: 42 });
  s.sky(autumn ? SKY.clear : SKY.day, { sun: { x: 120, y: 90, r: 22, c: '#fff6d0' } });
  s.cloud(480, 70, 1, { cls: 'cl cl1', o: 0.8 });
  // ten peaks: jagged wall
  const wall = [];
  const pk = [[60, 160], [150, 120], [250, 90], [340, 128], [430, 70], [520, 118], [610, 84], [700, 140], [790, 170]];
  for (let x = -10; x <= 810; x += 4) {
    let m = 0;
    for (const [px, ph] of pk) m = Math.max(m, 300 - ph - Math.abs(x - px) * 1.35);
    wall.push([x, 300 - Math.max(0, (300 - 170) * 0) - (m > 0 ? 0 : 0) + (m > 0 ? 0 : 0) - 0]);
  }
  const wall2 = [];
  for (let x = -10; x <= 810; x += 4) {
    let top = 300;
    for (const [px, py] of pk) top = Math.min(top, py + Math.abs(x - px) * 1.35 + Math.sin(x * 0.9) * 2.2);
    wall2.push([x, Math.min(300, top)]);
  }
  const wid = s.mountain(wall2, { fill: '#7a7f91', snowY: 215, snow: '#f9fbff', shade: 'rgba(12,24,52,.34)', light: 'rgba(255,255,255,.12)', ref: true });
  s.add(`<path d="M-10 300H810" stroke="rgba(0,0,0,.0)"/>`);
  s.forest({ y: 300, x0: 0, x1: 800, n: 44, hmin: 24, hmax: 50, colors: autumn ? ['#1d4a3c', '#26584a', '#d7a02a'] : PINE, jitter: 3 });
  s.water(300, { c1: '#2ec2c8', c2: '#157f98', refs: [wid], refFill: ['#4d6476'], ripples: 10, o: 0.5 });
  // foreground rockpile
  s.add(`<path d="M0 450L0 396Q120 372 240 404L330 450Z" fill="#6c7078"/><path d="M0 396Q120 372 240 404L180 430Q90 410 0 420Z" fill="#8a9098"/>`);
  rocks(s, { x0: 0, x1: 300, y: 428, n: 10, smin: 36, smax: 80 });
  s.forest({ y: 420, x0: 560, x1: 810, n: 8, hmin: 90, hmax: 160, colors: autumn ? LARCH : PINE_D, kind: autumn ? 'larch' : 'pine', jitter: 20 });
  s.forest({ y: 436, x0: 600, x1: 810, n: 5, hmin: 110, hmax: 190, colors: autumn ? LARCH : PINE_D, kind: autumn ? 'larch' : 'pine', jitter: 10 });
  canoe(s, 390, 366, 1.3);
  canoe(s, 490, 346, 0.95, '#d9d9d9');
  person(s, 130, 390, 1.6, '#2c7bb6');
  person(s, 160, 394, 1.6, '#d6453d');
  return s.svg({ label: '梦莲湖与十峰谷' });
};

scenes.peyto = (uid = '') => {
  const s = new Scene(uid + 'peyto', { seed: 43 });
  s.sky(SKY.clear, { sun: { x: 90, y: 70, r: 20, c: '#fff6d0' } });
  s.cloud(400, 56, 1.1, { cls: 'cl cl1' });
  const r = ranges(s, { base: 250, tone: 'day', layers: 3, hmin: 110, hmax: 190, n: 4, snowY: 150, refs: false });
  s.add(`<rect x="0" y="250" width="800" height="200" fill="#2a5b4a"/>`);
  s.forest({ y: 258, x0: 0, x1: 800, n: 70, hmin: 16, hmax: 30, colors: PINE, jitter: 4 });
  // wolf-head shaped lake (profile facing left)
  s.add(`<path d="M600 372C580 356 566 346 560 330L552 292L536 238L518 286C500 292 480 296 452 304C420 312 396 318 370 330L330 342L316 352C324 358 340 360 360 360L404 364C430 366 452 372 470 386C500 396 540 394 600 372Z" fill="${s.lin(['#58dccd', '#1b91b0'])}"/>`);
  s.add(`<path d="M380 336Q430 324 480 330M420 358Q470 354 520 372M520 300Q540 330 560 346" stroke="#fff" stroke-opacity=".3" fill="none" stroke-width="1.6" class="rip"/>`);
  s.add(`<path d="M0 450L0 380Q60 360 150 400L260 450Z" fill="#6d727a"/><path d="M800 450V372Q720 350 640 394L560 450Z" fill="#6d727a"/>`);
  rocks(s, { x0: 0, x1: 240, y: 420, n: 8, smin: 30, smax: 70 });
  rocks(s, { x0: 570, x1: 800, y: 420, n: 8, smin: 30, smax: 70 });
  s.forest({ y: 438, x0: 280, x1: 540, n: 6, hmin: 60, hmax: 120, colors: PINE_D, jitter: 12 });
  person(s, 660, 380, 1.7, '#d6453d');
  return s.svg({ label: '佩托湖的狼头形状' });
};

scenes.icefield = (uid = '') => {
  const s = new Scene(uid + 'icefield', { seed: 44 });
  s.sky(SKY.clear, { sun: { x: 690, y: 76, r: 20, c: '#fff6d0' } });
  s.cloud(210, 70, 1.1, { cls: 'cl cl1' }).cloud(520, 100, 0.8, { cls: 'cl cl2', o: 0.7 });
  const r = ranges(s, { base: 300, tone: 'day', layers: 3, hmin: 130, hmax: 210, n: 4, snowY: 170, refs: false });
  // glacier tongue
  s.add(`<path d="M250 160L300 130L350 150L410 118L470 146L506 128L560 260L660 340L720 450H80L180 330L230 250Z" fill="${s.lin(['#f4fbff', '#c8e2f2'])}"/>`);
  s.add(`<path d="M300 180L280 300M360 170L360 320M430 170L450 300M500 200L540 330M240 260L200 380M590 300L650 400" stroke="#9fc4de" stroke-width="2" fill="none" opacity=".8"/>`);
  s.add(`<path d="M80 450L180 330L230 250L250 160" stroke="rgba(30,60,90,.25)" stroke-width="6" fill="none"/>`);
  s.forest({ y: 344, x0: 0, x1: 130, n: 6, hmin: 40, hmax: 80, colors: PINE, jitter: 6 });
  s.forest({ y: 400, x0: 690, x1: 810, n: 5, hmin: 40, hmax: 90, colors: PINE, jitter: 6 });
  // moraine & ground
  s.add(`<path d="M0 450V410Q200 394 400 420T800 408V450Z" fill="#8c867c"/>`);
  rocks(s, { x0: 0, x1: 800, y: 436, n: 14, smin: 18, smax: 44, colors: ['#8c867c', '#a39d92', '#6f6a62'] });
  // Ice Explorer
  s.add(`<g transform="translate(380 372)"><g class="bobx"><rect x="-44" y="-30" width="88" height="30" rx="5" fill="#f3efe6"/><rect x="-44" y="-30" width="88" height="8" rx="3" fill="#d6453d"/>${[-32, -16, 0, 16, 32].map((x) => `<rect x="${x - 5}" y="-20" width="9" height="9" fill="#6fa6c4"/>`).join('')}<circle cx="-28" cy="2" r="14" fill="#1e1e22"/><circle cx="28" cy="2" r="14" fill="#1e1e22"/><circle cx="-28" cy="2" r="6" fill="#8a8a90"/><circle cx="28" cy="2" r="6" fill="#8a8a90"/></g></g>`);
  // skywalk
  s.add(`<g><path d="M0 300H110L160 290" stroke="#555" stroke-width="3" fill="none"/><rect x="40" y="288" width="120" height="6" fill="#9cd2e8" opacity=".8"/><path d="M40 294V312M160 294V300" stroke="#555"/></g>`);
  person(s, 80, 286, 1.5, '#d6453d');
  person(s, 120, 286, 1.5, '#2c7bb6');
  return s.svg({ label: '哥伦比亚冰原与冰上探险车' });
};

scenes.athabasca = (uid = '') => {
  const s = new Scene(uid + 'athabasca', { seed: 45 });
  s.sky(SKY.mist);
  s.add(`<rect y="0" width="800" height="450" fill="#34413f"/>`);
  s.add(`<path d="M0 0H800V150L690 175L660 120L560 150L470 100L330 140L230 110L130 160L0 130Z" fill="${s.lin(['#aebdc2', '#8c9d9d'])}"/>`);
  s.forest({ y: 150, x0: 0, x1: 800, n: 36, hmin: 36, hmax: 70, colors: PINE_D, jitter: 10 });
  // falls: two streams
  s.add(`<path d="M330 150H520L545 330H300Z" fill="#8d908c"/><path d="M360 150H500L520 330H340Z" fill="${s.lin(['#ffffff', '#d7ecef'])}"/>`);
  s.add(`<path d="M390 150V330M430 150V330M470 150V330" stroke="#bfdce2" stroke-width="3" opacity=".7"/>`);
  s.add(`<path d="M0 330H800V450H0Z" fill="${s.lin(['#58cfc7', '#1d8f94'])}"/>`);
  s.add(`<ellipse cx="420" cy="334" rx="130" ry="22" fill="#fff" opacity=".6" class="cl cl2"/><ellipse cx="420" cy="320" rx="90" ry="16" fill="#fff" opacity=".4" class="cl cl1"/>`);
  s.add(`<path d="M0 450V390Q60 372 120 400L240 450Z" fill="#555a58"/><path d="M800 450V380Q740 366 680 398L560 450Z" fill="#585d5a"/>`);
  s.add(`<path d="M0 330Q100 322 300 330" stroke="#5a5e5a" stroke-width="12" fill="none"/>`);
  person(s, 640, 372, 1.7, '#d6453d');
  return s.svg({ label: '阿萨巴斯卡瀑布' });
};

scenes.jasper = (uid = '', night = true) => {
  const s = new Scene(uid + 'jasper', { seed: 46 });
  s.sky(night ? SKY.night : SKY.dusk, { stars: night ? 120 : 0, moon: night ? { x: 90, y: 70, r: 14 } : undefined });
  if (night) {
    s.add(`<g class="aur" style="mix-blend-mode:screen"><path d="M-20 200Q120 80 260 140T520 90T820 150V230Q640 150 520 190T260 220T-20 260Z" fill="${s.lin(['#4ee3a6', '#2bb28c', '#4ee3a600'])}" opacity=".6"/><path d="M60 230Q220 120 360 170T640 110T840 190V260Q700 190 560 220T300 250T60 290Z" fill="${s.lin(['#9b7cf6', '#5cc9d8', '#5cc9d800'])}" opacity=".4"/></g>`);
  }
  const r = ranges(s, { base: 310, tone: night ? 'night' : 'dusk', layers: 3, hmin: 120, hmax: 200, n: 4, snowY: 210, refs: false });
  s.add(`<rect x="0" y="310" width="800" height="140" fill="${night ? '#0a1a20' : '#2b2a52'}"/>`);
  s.forest({ y: 326, x0: 0, x1: 800, n: 44, hmin: 28, hmax: 60, colors: night ? PINE_N : PINE_D, jitter: 8 });
  // town lights
  s.add(`<g fill="#ffd98a">${[...Array(26)].map((_, i) => `<rect x="${280 + i * 9 + (i % 3) * 2}" y="${340 + (i % 4) * 4}" width="4" height="3" opacity=".8"/>`).join('')}</g>`);
  s.add(`<g>${[...Array(5)].map((_, i) => `<rect x="${500 + i * 20}" y="352" width="18" height="8" fill="#30363a"/>`).join('')}<rect x="498" y="360" width="104" height="3" fill="#111"/></g>`);
  s.forest({ y: 440, x0: -20, x1: 220, n: 7, hmin: 110, hmax: 190, colors: night ? PINE_N : PINE_D, jitter: 6 });
  s.forest({ y: 440, x0: 600, x1: 820, n: 7, hmin: 110, hmax: 190, colors: night ? PINE_N : PINE_D, jitter: 6 });
  s.animal('a-elk', 380, 424, 0.55, { fill: night ? '#070f13' : '#171a30' });
  return s.svg({ label: night ? '贾斯珀暗夜星空与极光' : '贾斯珀黄昏' });
};

scenes.maligne = (uid = '') => {
  const s = new Scene(uid + 'maligne', { seed: 47 });
  s.sky(SKY.clear, { sun: { x: 120, y: 80, r: 22, c: '#fff6d0' } });
  s.cloud(420, 66, 1.1, { cls: 'cl cl1' });
  const r = ranges(s, { base: 292, tone: 'day', layers: 3, hmin: 120, hmax: 190, n: 5, snowY: 175 });
  s.forest({ y: 292, x0: 0, x1: 800, n: 38, hmin: 20, hmax: 40, colors: PINE, jitter: 3 });
  s.water(292, { c1: '#42b4d0', c2: '#17709c', refs: r.ids, refFill: r.fills, ripples: 12, o: 0.45 });
  // Spirit Island
  s.add(`<ellipse cx="420" cy="334" rx="60" ry="9" fill="#2f5d4b"/>`);
  s.forest({ y: 336, x0: 372, x1: 468, n: 9, hmin: 34, hmax: 66, colors: ['#143c2f', '#1c4a3a', '#10302a'], jitter: 3 });
  // boat
  s.add(`<g transform="translate(600 384)"><g class="bob"><path d="M-48 0H48L38 14H-38Z" fill="#f4f1ea"/><rect x="-26" y="-18" width="52" height="18" rx="3" fill="#fff"/><rect x="-26" y="-22" width="52" height="5" fill="#d6453d"/><rect x="-18" y="-14" width="36" height="8" fill="#6fa6c4"/></g></g>`);
  s.add(`<path d="M0 450V400Q150 380 300 410L350 450Z" fill="#244a3c"/><path d="M800 450V410Q700 392 620 420L560 450Z" fill="#244a3c"/>`);
  s.forest({ y: 430, x0: -10, x1: 260, n: 7, hmin: 80, hmax: 150, colors: PINE_D, jitter: 8 });
  return s.svg({ label: '玛琳湖与精灵岛' });
};

scenes.calgary = (uid = '') => {
  const s = new Scene(uid + 'calgary', { seed: 48 });
  s.sky(SKY.gold, { sun: { x: 160, y: 250, r: 34, c: '#fff1c2', glow: '#ffb864' } });
  s.cloud(300, 90, 1.4, { cls: 'cl cl1', c: '#ffe6cf', o: 0.85 }).cloud(640, 130, 1, { cls: 'cl cl2', c: '#ffe6cf', o: 0.8 });
  // distant Rockies
  const far = s.peaks({ base: 290, n: 8, hmin: 36, hmax: 78, smin: 0.7, smax: 1.1, jag: 1.5 });
  s.mountain(far, { fill: '#9a8fb0', snowY: 262, snow: '#fff0dc', shade: 'rgba(40,20,70,.2)' });
  s.add(`<rect x="0" y="290" width="800" height="160" fill="#6b6a8a"/>`);
  s.skyline({ x0: 240, x1: 620, base: 330, hmin: 40, hmax: 150, colors: ['#4e5272', '#444868', '#5a5e7e'], win: '#ffe0a0', lit: 0.3 });
  // Calgary Tower
  s.add(`<g><rect x="354" y="150" width="9" height="182" fill="#d8d3cc"/><ellipse cx="358.5" cy="150" rx="17" ry="9" fill="#e9e4dc"/><rect x="356" y="102" width="5" height="48" fill="#cfcac2"/><path d="M358.5 90V104" stroke="#d6453d" stroke-width="2"/><circle cx="358.5" cy="88" r="2" fill="#d6453d"/></g>`);
  // river & bridge
  s.add(`<rect x="0" y="332" width="800" height="118" fill="${s.lin(['#6d77a6', '#34426e'])}"/>`);
  s.add(`<path d="M120 380Q300 342 480 380T800 380" stroke="#fff" stroke-opacity=".3" fill="none" stroke-width="2" class="rip"/>`);
  s.add(`<g><path d="M80 360Q240 320 400 360" stroke="#d6453d" stroke-width="5" fill="none"/><path d="M80 360Q240 396 400 360" stroke="#f3efe6" stroke-width="5" fill="none"/><path d="M80 361H400" stroke="#8b8899" stroke-width="3"/></g>`);
  s.add(`<path d="M0 450V420Q200 408 400 424T800 416V450Z" fill="#3c4a38"/>`);
  s.forest({ y: 428, x0: 0, x1: 800, n: 22, hmin: 30, hmax: 60, colors: ['#2e4a3a', '#385a46'], kind: 'leafy', jitter: 6 });
  person(s, 560, 428, 1.6, '#e0a627');
  person(s, 580, 430, 1.6, '#2c7bb6');
  return s.svg({ label: '卡尔加里天际线、卡尔加里塔与和平桥' });
};

scenes.badlands = (uid = '') => {
  const s = new Scene(uid + 'badlands', { seed: 49 });
  s.sky(SKY.gold);
  s.cloud(220, 90, 1.2, { cls: 'cl cl1', c: '#fff0e0' });
  s.add(`<path d="M0 270Q200 250 400 266T800 260V450H0Z" fill="#d9a56d"/>`);
  const hoodoo = (x, y, h, w, c) => s.add(`<path d="M${x - w / 2} ${y}L${x - w * 0.34} ${y - h * 0.6}L${x - w * 0.5} ${y - h * 0.62}L${x - w * 0.42} ${y - h * 0.78}L${x - w * 0.18} ${y - h * 0.8}L${x - w * 0.1} ${y - h}L${x + w * 0.1} ${y - h}L${x + w * 0.18} ${y - h * 0.8}L${x + w * 0.42} ${y - h * 0.78}L${x + w * 0.5} ${y - h * 0.62}L${x + w * 0.34} ${y - h * 0.6}L${x + w / 2} ${y}Z" fill="${c}"/><path d="M${x + 2} ${y - h}L${x + w * 0.18} ${y - h * 0.8}L${x + w * 0.42} ${y - h * 0.78}L${x + w * 0.5} ${y - h * 0.62}L${x + w * 0.34} ${y - h * 0.6}L${x + w / 2} ${y}H${x}Z" fill="rgba(60,20,0,.22)"/>`);
  [[140, 360, 160, 70, '#c98655'], [260, 380, 120, 56, '#d49060'], [420, 372, 190, 78, '#be7a4c'], [560, 392, 130, 60, '#d49060'], [680, 366, 170, 72, '#c98655']].forEach((a) => hoodoo(...a));
  s.add(`<path d="M0 450V410Q200 396 400 414T800 404V450Z" fill="#a8683d"/>`);
  // dino
  s.add(`<g transform="translate(46 336) scale(.92)" fill="#4d2f1c"><path d="M0 44L38 30L78 16L112 2L120 -14L152 -14L156 -4L140 0L146 6L124 10L118 24L126 28L116 32L108 46L110 70L124 76L124 82L96 82L94 56L80 52L66 82L38 82L38 76L54 72L56 48L30 44Z"/><circle cx="136" cy="-8" r="2" fill="#fbd98e"/></g>`);
  return s.svg({ label: '德兰赫勒的荒地与恐龙' });
};

/* ---------- Season scenes (stacked & cross-faded by JS) ---------- */
scenes.season = (season, uid = '') => {
  const cfg = {
    spring: { sky: SKY.spring, tone: 'day', lake: ['#8fd3d0', '#4aa3b0'], tree: ['#2c5d4c', '#3a7058', '#4d8a62'], snowY: 170, ice: true },
    summer: { sky: SKY.clear, tone: 'day', lake: ['#34cdd0', '#1488a2'], tree: PINE, snowY: 230 },
    autumn: { sky: SKY.gold, tone: 'gold', lake: ['#43b7bc', '#18748c'], tree: ['#1d4a3c', '#d7a02a', '#f0c04a'], snowY: 200 },
    winter: { sky: SKY.winter, tone: 'winter', lake: ['#dbe9f0', '#b5ccd8'], tree: ['#2a4f48', '#365e56', '#456c64'], snowY: 120 },
  }[season];
  const s = new Scene(uid + 's-' + season, { seed: 60 });
  s.sky(cfg.sky, { sun: season === 'winter' ? undefined : { x: 650, y: 84, r: 22, c: '#fff6d0' } });
  if (season !== 'winter') s.cloud(200, 80, 1.1, { cls: 'cl cl1' });
  const r = ranges(s, { base: 280, tone: cfg.tone, layers: 3, hmin: 130, hmax: 200, n: 4, snowY: cfg.snowY });
  s.forest({ y: 280, x0: 0, x1: 800, n: 40, hmin: 24, hmax: 46, colors: cfg.tree, kind: season === 'autumn' ? 'larch' : 'pine', jitter: 3 });
  s.water(280, { c1: cfg.lake[0], c2: cfg.lake[1], refs: r.ids, refFill: r.fills, ripples: season === 'winter' ? 2 : 10, o: season === 'winter' ? 0.15 : 0.45 });
  if (season === 'spring') s.add(`<g fill="#fff" opacity=".85"><path d="M40 330l60-8 30 14-50 12zM560 380l90-10 40 14-70 14zM300 420l70-6 30 10-60 10z"/></g>`);
  if (season === 'winter') {
    s.add(`<g class="aur" style="mix-blend-mode:screen;opacity:.5"><path d="M-20 120Q160 40 320 90T620 50T820 100V160Q640 100 520 130T300 150T-20 160Z" fill="${s.lin(['#6ef0b8', '#3bb89a', '#6ef0b800'])}" opacity=".5"/></g>`);
    s.add(`<path d="M0 330L120 322L300 350L520 330L800 344V450H0Z" fill="#f4f8fa"/><path d="M0 330L120 322L300 350L520 330L800 344" stroke="#cfdde6" stroke-width="2" fill="none"/>`);
  } else {
    s.add(`<path d="M0 450V392Q160 366 320 396T800 388V450Z" fill="${season === 'spring' ? '#6c9a58' : season === 'autumn' ? '#a8782c' : '#3b7a4d'}"/>`);
  }
  s.forest({ y: 436, x0: -10, x1: 240, n: 6, hmin: 100, hmax: 170, colors: cfg.tree, kind: season === 'autumn' ? 'larch' : 'pine', jitter: 8 });
  s.forest({ y: 436, x0: 560, x1: 820, n: 6, hmin: 100, hmax: 170, colors: cfg.tree, kind: season === 'autumn' ? 'larch' : 'pine', jitter: 8 });
  if (season === 'summer') for (const x of [330, 380, 440, 520]) s.add(`<circle cx="${x}" cy="${410 + (x % 13)}" r="3.2" fill="${['#e86f8c', '#f6c945', '#fff'][x % 3]}"/>`);
  return s.svg({ label: { spring: '春', summer: '夏', autumn: '秋', winter: '冬' }[season] + '季的落基山湖景', cls: 'season-art season-' + season });
};

/* ---------- Wildlife spotting game (wide) ---------- */
scenes.wildlife = (uid = '') => {
  const s = new Scene(uid + 'wild', { w: 1000, h: 460, seed: 70 });
  s.sky(SKY.clear, { sun: { x: 860, y: 80, r: 24, c: '#fff6d0' } });
  s.cloud(220, 80, 1.3, { cls: 'cl cl1' }).cloud(640, 60, 1, { cls: 'cl cl2', o: 0.8 });
  const r = ranges(s, { base: 300, tone: 'day', layers: 3, hmin: 140, hmax: 240, n: 6, snowY: 170, refs: false });
  // goat on cliff (white) : placed on a ledge
  s.add(`<path d="M690 300L720 210L770 190L800 230L840 300Z" fill="#6b7a8a"/><path d="M720 210L770 190L800 230L760 240Z" fill="#8795a3"/>`);
  s.forest({ y: 312, x0: 0, x1: 1000, n: 60, hmin: 26, hmax: 56, colors: PINE, jitter: 8 });
  // meadow
  s.add(`<path d="M0 460V352Q260 330 520 350T1000 340V460Z" fill="#6f9c52"/>`);
  s.add(`<path d="M0 340Q260 318 520 338T1000 328" stroke="#8cb468" stroke-width="3" fill="none" opacity=".6"/>`);
  // lake bit
  s.add(`<ellipse cx="170" cy="386" rx="130" ry="22" fill="${s.lin(['#5cc6d2', '#2a8aa6'])}"/>`);
  // road
  s.add(`<path d="M330 460Q480 400 640 372T1000 366V400Q860 408 700 418T470 460Z" fill="#4d4f55"/><path d="M360 458Q500 404 650 382T1000 380" stroke="#f1c40f" stroke-width="2.4" stroke-dasharray="14 12" fill="none"/>`);
  s.forest({ y: 452, x0: -10, x1: 120, n: 3, hmin: 110, hmax: 160, colors: PINE_D, jitter: 4 });
  s.forest({ y: 456, x0: 880, x1: 1010, n: 3, hmin: 110, hmax: 160, colors: PINE_D, jitter: 4 });
  // animals (positions mirrored in JS hit-targets via data attrs)
  s.animal('a-goat', 738, 196, 0.42, { fill: '#f6f6f2' });
  s.animal('a-bear', 318, 318, 0.5, { fill: '#25201d' });
  s.animal('a-elk', 540, 322, 0.5, { fill: '#6d4a33' });
  s.animal('a-sheep', 826, 356, 0.5, { fill: '#8a7e72' });
  s.animal('a-moose', 112, 368, 0.5, { fill: '#2e2622' });
  return s.svg({ label: '冰原大道沿途找动物小游戏', cls: 'wild-art', slice: false });
};

/* ---------- Route map (stylised, real-ish coordinates) ---------- */
export function routeMap() {
  const W = 900, H = 560;
  const lonLat = (lon, lat) => {
    const x0 = -125.5, x1 = -112.5, y0 = 54.8, y1 = 48.2;
    return [Math.round(60 + ((lon - x0) / (x1 - x0)) * (W - 120)), Math.round(H - 60 - ((lat - y1) / (y0 - y1)) * (H - 120))];
  };
  const place = {
    yvr: ['温哥华', 'Vancouver', -123.12, 49.28, '第 1–2 天'],
    yyc: ['卡尔加里', 'Calgary', -114.07, 51.05, '第 3、7 天'],
    banff: ['班夫', 'Banff', -115.57, 51.18, '第 3–4 天'],
    louise: ['路易斯湖', 'Lake Louise', -116.18, 51.42, '第 4 天'],
    icefield: ['哥伦比亚冰原', 'Columbia Icefield', -117.22, 52.22, '第 5 天'],
    jasper: ['贾斯珀', 'Jasper', -118.08, 52.87, '第 5–6 天'],
  };
  const xy = Object.fromEntries(Object.entries(place).map(([k, v]) => [k, lonLat(v[2], v[3])]));
  const ll = (arr) => arr.map((p) => lonLat(...p));
  const P2 = (a) => a.map((p) => p.join(' ')).join('L');
  // province border (continental divide, then 120°W) and 49th parallel
  const border = ll([[-114.07, 49.0], [-114.6, 49.6], [-115.4, 50.6], [-116.1, 51.5], [-117.3, 52.3], [-118.45, 52.9], [-119.3, 53.5], [-120.0, 53.8], [-120.0, 54.8]]);
  const usb = ll([[-125.5, 49.0], [-112.5, 49.0]]);
  // Pacific, strait of Georgia and Vancouver Island
  const sea = ll([[-131, 54.8], [-131, 50.3], [-124.9, 50.2], [-124.3, 49.85], [-123.75, 49.55], [-123.3, 49.38], [-123.2, 49.25], [-123.02, 49.0], [-123.0, 48.2], [-131, 48.2]]);
  const island = ll([[-131, 51.4], [-127.5, 50.8], [-125.15, 50.2], [-124.6, 49.7], [-124.1, 49.3], [-123.7, 48.95], [-123.4, 48.6], [-123.5, 48.35], [-131, 48.4]]);
  const r = rng(5);
  let peaks = '';
  for (let i = 0; i < 26; i++) {
    const t = r();
    const x = 470 + t * 330 + (r() - 0.5) * 70, y = 150 + t * 190 + (r() - 0.5) * 80;
    const k = 7 + r() * 9;
    peaks += `<path d="M${n1(x - k)} ${n1(y)}L${n1(x)} ${n1(y - k * 1.15)}L${n1(x + k)} ${n1(y)}Z"/>`;
  }
  const drive = `M${xy.yyc.join(' ')}L${xy.banff.join(' ')}L${xy.louise.join(' ')}L${xy.icefield.join(' ')}L${xy.jasper.join(' ')}`;
  const fly = `M${xy.yvr.join(' ')}Q${Math.round((xy.yvr[0] + xy.yyc[0]) / 2)} ${Math.min(xy.yvr[1], xy.yyc[1]) - 100} ${xy.yyc.join(' ')}`;
  const label = (k, dx, dy, anchor) => {
    const [x, y] = xy[k];
    const ax = x + dx, ay = y + dy;
    return `<g class="mp-lab"><text x="${ax}" y="${ay}" text-anchor="${anchor}" class="mp-l">${place[k][0]}</text><text x="${ax}" y="${ay + 14}" text-anchor="${anchor}" class="mp-s">${place[k][1]}</text><text x="${ax}" y="${ay + 28}" text-anchor="${anchor}" class="mp-d">${place[k][4]}</text></g>`;
  };
  const L = { yvr: [-20, -24, 'end'], yyc: [20, 24, 'start'], banff: [14, 30, 'start'], louise: [-22, -2, 'end'], icefield: [-22, -6, 'end'], jasper: [-22, -34, 'end'] };
  const svg = `<svg class="art map-art" viewBox="0 0 ${W} ${H}" role="img" aria-label="温哥华到阿尔伯塔的 7 日路线示意图(非严格比例)">
  <defs><pattern id="mp-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="currentColor" opacity=".1"/></pattern></defs>
  <rect class="mp-bg" width="${W}" height="${H}" rx="6"/><rect width="${W}" height="${H}" fill="url(#mp-dots)"/>
  <path class="mp-sea" d="M${P2(sea)}Z"/>
  <path class="mp-isl" d="M${P2(island)}Z"/>
  <g class="mp-peaks">${peaks}</g>
  <path class="mp-border" d="M${P2(border)}"/><path class="mp-border" d="M${P2(usb)}"/>
  <text x="330" y="150" class="mp-reg" text-anchor="middle">BRITISH COLUMBIA</text>
  <text x="770" y="196" class="mp-reg" text-anchor="middle">ALBERTA</text>
  <text x="440" y="${H - 70}" class="mp-reg" text-anchor="middle" opacity=".7">USA</text>
  <text x="90" y="${H - 150}" class="mp-reg sea" text-anchor="middle" transform="rotate(-90 90 ${H - 150})">PACIFIC OCEAN</text>
  <path id="mp-fly" class="mp-route fly" d="${fly}"/>
  <path id="mp-drive" class="mp-route drive" d="${drive}"/>
  ${Object.keys(L).map((k) => label(k, ...L[k])).join('')}
  ${Object.keys(xy).map((k) => `<g class="mp-pin" data-k="${k}" transform="translate(${xy[k][0]} ${xy[k][1]})"><circle r="9"/><circle r="3.2" class="in"/></g>`).join('')}
  <g id="mp-plane" class="mp-vehicle" aria-hidden="true"><path d="M0 -11L3.4 -2.4L12 2.4L12 4.4L3.4 3.2L2.4 9.6L5.6 11.8L5.6 13L-5.6 13L-5.6 11.8L-2.4 9.6L-3.4 3.2L-12 4.4L-12 2.4L-3.4 -2.4Z" transform="rotate(90) scale(1.5)" stroke="#fff" stroke-width="1.4"/></g>
  <g id="mp-car" class="mp-vehicle car" aria-hidden="true"><rect x="-11" y="-6" width="22" height="11" rx="3.5"/><rect x="-6.5" y="-11" width="13" height="7" rx="2.5"/><circle cx="-6" cy="5" r="2.8" class="w"/><circle cx="6" cy="5" r="2.8" class="w"/></g>
  <g transform="translate(${W - 262} ${H - 52})" class="mp-key"><path d="M0 0h34" class="fly mp-route" style="animation:none"/><text x="44" y="4">飞行 约 1.5 小时</text><path d="M0 20h34" class="drive mp-route" style="animation:none"/><text x="44" y="24">自驾 4 天,约 900 km</text></g>
  <text x="26" y="${H - 18}" class="mp-note">示意图,非严格比例</text>
  </svg>`;
  return { svg, xy, place };
}
