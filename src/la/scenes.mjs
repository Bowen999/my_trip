// LA page fallback illustrations (flat / low-poly, drawn in code — the same style as the other trip pages).
// Each key here is also a slot for a hand-drawn cover: when images/la/art/<key>.jpg exists, the builder uses that
// file instead of these placeholders (see src/la/build.mjs → artCover). Keep the key list in sync with images/la/art/README.md.
import { Scene } from '../art.mjs';
import { city, sea, car as kitCar, bird, bare, squeeze, n1 } from '../ne/kit.mjs';
export { laMap } from './map.mjs';

const DUSK = ['#2b3a74', '#a55a8e', '#ef9468', '#f8d79a'];
const NIGHT = ['#0f1a3c', '#1f2f62', '#3b4a82'];
const DAY = ['#79b0d8', '#bcd8e4', '#f6e8c8'];
const GOLD = ['#4a5f9e', '#c97a8a', '#f2a56b', '#fbdfa6'];
const INK = '#20263b';

/* ---------- small helpers ---------- */
function palm(s, x, y, h, c = INK, lean = 0.22) {
  const tx = n1(x + h * lean), ty = n1(y - h);
  s.add(`<path d="M${n1(x)} ${n1(y)}Q${n1(x + h * lean * 0.35)} ${n1(y - h * 0.55)} ${tx} ${ty}" stroke="${c}" stroke-width="${n1(Math.max(2.4, h * 0.05))}" fill="none" stroke-linecap="round"/>`);
  let f = '';
  for (let i = 0; i < 7; i++) {
    const a = Math.PI * (0.06 + i * 0.145);
    const dx = Math.cos(a) * h * 0.44, dy = Math.sin(a) * h * 0.32;
    f += `<path d="M${tx} ${ty}Q${n1(tx - dx * 0.62)} ${n1(ty - dy * 0.72 - h * 0.05)} ${n1(tx - dx)} ${n1(ty - dy + h * 0.13)}"/>`;
  }
  s.add(`<g stroke="${c}" stroke-width="${n1(Math.max(1.8, h * 0.03))}" fill="none" stroke-linecap="round">${f}</g>`);
}
function firework(s, cx, cy, r, c = '#ffd88a', n = 12) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    g += `<line x1="${n1(cx + Math.cos(a) * r * 0.22)}" y1="${n1(cy + Math.sin(a) * r * 0.22)}" x2="${n1(cx + Math.cos(a) * r)}" y2="${n1(cy + Math.sin(a) * r)}"/>`;
  }
  s.add(`<g stroke="${c}" stroke-width="${n1(r * 0.045)}" stroke-linecap="round" opacity=".85" class="tw">${g}</g><circle cx="${cx}" cy="${cy}" r="${n1(r * 0.09)}" fill="#fff"/>`);
}
function castle(s, cx, base, k = 1, wall = '#f2e6da', roof = '#5a86c4', glow = '#ffd88a') {
  const x = (v) => n1(cx + v * k), y = (v) => n1(base - v * k), u = (v) => n1(v * k);
  s.add(`<g><rect x="${x(-70)}" y="${y(70)}" width="${u(140)}" height="${u(72)}" fill="${wall}"/><rect x="${x(-46)}" y="${y(150)}" width="${u(92)}" height="${u(152)}" fill="${wall}"/><rect x="${x(-16)}" y="${y(228)}" width="${u(32)}" height="${u(230)}" fill="${wall}"/><path d="M${x(-24)} ${y(228)}L${x(0)} ${y(322)}L${x(24)} ${y(228)}Z" fill="${roof}"/><rect x="${x(-86)}" y="${y(118)}" width="${u(26)}" height="${u(120)}" fill="${wall}"/><path d="M${x(-92)} ${y(118)}L${x(-73)} ${y(192)}L${x(-54)} ${y(118)}Z" fill="${roof}"/><rect x="${x(60)}" y="${y(118)}" width="${u(26)}" height="${u(120)}" fill="${wall}"/><path d="M${x(54)} ${y(118)}L${x(73)} ${y(192)}L${x(92)} ${y(118)}Z" fill="${roof}"/><path d="M${x(-46)} ${y(150)}L${x(0)} ${y(206)}L${x(46)} ${y(150)}" fill="none" stroke="${roof}" stroke-width="${u(9)}"/><rect x="${x(-11)}" y="${y(36)}" width="${u(22)}" height="${u(36)}" rx="${u(11)}" fill="#2b2a45"/><rect x="${x(-6)}" y="${y(196)}" width="${u(12)}" height="${u(22)}" rx="${u(4)}" fill="${glow}"/><rect x="${x(-66)}" y="${y(82)}" width="${u(11)}" height="${u(17)}" rx="${u(5)}" fill="${glow}"/><rect x="${x(55)}" y="${y(82)}" width="${u(11)}" height="${u(17)}" rx="${u(5)}" fill="${glow}"/><path d="M${x(0)} ${y(322)}V${y(362)}" stroke="#c94f5a" stroke-width="${u(4)}"/><path d="M${x(0)} ${y(362)}L${x(26)} ${y(350)}L${x(0)} ${y(338)}Z" fill="#c94f5a"/></g>`);
}
function mesa(s, x, y, w, h, c, hi = '#00000022') {
  s.add(`<path d="M${n1(x)} ${n1(y)}V${n1(y - h * 0.55)}Q${n1(x)} ${n1(y - h * 0.7)} ${n1(x + w * 0.12)} ${n1(y - h * 0.72)}L${n1(x + w * 0.3)} ${n1(y - h * 0.76)}Q${n1(x + w * 0.35)} ${n1(y - h)} ${n1(x + w * 0.44)} ${n1(y - h)}H${n1(x + w * 0.64)}Q${n1(x + w * 0.72)} ${n1(y - h * 0.94)} ${n1(x + w * 0.8)} ${n1(y - h * 0.78)}L${n1(x + w * 0.92)} ${n1(y - h * 0.75)}Q${n1(x + w)} ${n1(y - h * 0.7)} ${n1(x + w)} ${n1(y - h * 0.55)}V${n1(y)}Z" fill="${c}"/><path d="M${n1(x + w * 0.44)} ${n1(y - h)}H${n1(x + w * 0.64)}Q${n1(x + w * 0.72)} ${n1(y - h * 0.94)} ${n1(x + w * 0.8)} ${n1(y - h * 0.78)}L${n1(x + w * 0.92)} ${n1(y - h * 0.75)}Q${n1(x + w)} ${n1(y - h * 0.7)} ${n1(x + w)} ${n1(y - h * 0.55)}V${n1(y)}H${n1(x + w * 0.62)}Z" fill="${hi}"/>`);
}
const gnd = (s, y, c) => s.add(`<rect x="0" y="${y}" width="${s.w}" height="${s.h - y}" fill="${c}"/>`);
const plane = (s, x, y, k = 1, c = '#2c3040', a = 0) =>
  s.add(`<g transform="translate(${x} ${y}) rotate(${a}) scale(${k})"><path d="M0 -11L3.4 -2.4L12 2.4L12 4.4L3.4 3.2L2.4 9.6L5.6 11.8L5.6 13L-5.6 13L-5.6 11.8L-2.4 9.6L-3.4 3.2L-12 4.4L-12 2.4L-3.4 -2.4Z" fill="${c}" transform="rotate(90)"/></g>`);

/* ---------- scenes ---------- */
const raw = {};

raw.hero = (uid = '') => {
  const s = new Scene(uid + 'hero', { w: 1600, h: 760, seed: 91 });
  s.add('<g class="px" data-s="0.45">');
  s.sky(DUSK, { sun: { x: 1210, y: 470, r: 52, c: '#fff3c8', glow: '#ffb070' }, stars: 12 });
  s.cloud(300, 150, 1.6, { cls: 'cl cl1', c: '#f5b8a6', o: 0.7 }).cloud(820, 110, 1.2, { cls: 'cl cl2', c: '#f0a3a0', o: 0.65 }).cloud(1350, 180, 1.8, { cls: 'cl cl3', c: '#f7c1a4', o: 0.7 });
  s.add('</g>');
  firework(s, 690, 190, 90, '#ffd88a'); firework(s, 900, 120, 60, '#f0a5c0'); firework(s, 560, 120, 46, '#9ad0f0');
  bird(s, 1050, 190, 1.3); bird(s, 1084, 206, 1);
  const Y = 620;
  s.add('<g class="px" data-s="0.3">');
  city(s, { x0: 940, x1: 1560, base: Y, hmin: 26, hmax: 96, colors: ['#4a4472', '#3d3862', '#554e80'], op: 0.5, wmin: 18, wmax: 38 });
  // Hollywood hills + sign
  s.add(`<path d="M0 ${Y - 40}Q240 ${Y - 150} 470 ${Y - 96}T940 ${Y - 60}V${Y}H0Z" fill="#3f3a5e"/>`);
  s.add(`<text x="238" y="${Y - 116}" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="900" letter-spacing="6" fill="#f6f2e6" transform="rotate(-4 238 ${Y - 116})">HOLLYWOOD</text>`);
  s.add('</g>');
  // castle on a garden bank
  s.add('<g class="px" data-s="0.14">');
  s.add(`<path d="M420 ${Y + 60}Q600 ${Y - 20} 800 ${Y + 40}V${Y + 120}H420Z" fill="#2c2748"/>`);
  castle(s, 610, Y - 8, 0.82);
  s.add('</g>');
  // foreground palms + road
  s.add('<g class="px" data-s="0">');
  s.add(`<path d="M0 700Q400 668 800 692T1600 684V760H0Z" fill="#1d1a30"/>`);
  palm(s, 120, 760, 300, '#161226', 0.26); palm(s, 250, 770, 210, '#161226', -0.2); palm(s, 1440, 762, 320, '#161226', -0.24); palm(s, 1330, 772, 200, '#161226', 0.18);
  s.add('</g>');
  return s.svg({ label: '黄昏全景:迪士尼城堡、烟花、好莱坞标志与洛杉矶天际线', cls: 'hero-art' });
};

raw.castle = (uid = '') => {
  const s = new Scene(uid + 'cs', { w: 1600, h: 900, seed: 11 });
  s.sky(['#31418a', '#8a5aa0', '#e88a7a', '#f8cf8e'], { stars: 16 });
  firework(s, 380, 200, 110, '#ffd88a'); firework(s, 1220, 160, 76, '#f0a5c0'); firework(s, 1050, 300, 50, '#9ad0f0');
  s.add(`<path d="M0 660Q400 600 800 636T1600 620V900H0Z" fill="#2c2748"/>`);
  castle(s, 800, 690, 1.5);
  s.add(`<ellipse cx="800" cy="850" rx="420" ry="60" fill="#1c1836"/>`);
  s.add(`<ellipse cx="800" cy="850" rx="380" ry="46" fill="#3a3462"/><path d="M700 830Q800 858 900 830" stroke="#ffd88a" stroke-width="4" fill="none" opacity=".5" class="rip"/></g>`);
  palm(s, 130, 900, 380, '#171328', 0.26); palm(s, 1470, 900, 400, '#171328', -0.24);
  return s.svg({ label: '插图:睡美人城堡与烟花' });
};

raw.racers = (uid = '') => {
  const s = new Scene(uid + 'rc', { w: 1600, h: 900, seed: 23 });
  s.sky(GOLD, { sun: { x: 1260, y: 240, r: 60, c: '#fff3c8', glow: '#ffc27a' } });
  mesa(s, 60, 640, 520, 300, '#b45a48'); mesa(s, 500, 660, 640, 380, '#a04a3e'); mesa(s, 1060, 650, 500, 260, '#b8604c');
  gnd(s, 660, '#d9a06a');
  s.add(`<path d="M0 860Q500 780 900 820T1600 800V900H0Z" fill="#5a4a52"/><path d="M0 868Q500 792 900 830T1600 810" stroke="#f6e6c4" stroke-width="6" stroke-dasharray="36 30" fill="none"/>`);
  kitCar(s, 620, 852, 1.7, '#c0392b');
  kitCar(s, 1010, 838, 1.7, '#3a6ea5');
  // cacti
  s.add(`<g stroke="#3f6b4a" stroke-width="14" stroke-linecap="round" fill="none"><path d="M180 800V710M180 760Q180 742 164 742Q150 742 150 726M180 778Q180 758 198 758Q212 758 212 742"/></g>`);
  s.add(`<g stroke="#467a52" stroke-width="11" stroke-linecap="round" fill="none"><path d="M1400 810V736M1400 772Q1400 756 1386 756Q1374 756 1374 742"/></g>`);
  bird(s, 320, 200, 1.4); bird(s, 360, 218, 1);
  return s.svg({ label: '插图:水箱温泉镇的峡谷赛车' });
};

raw.soarin = (uid = '') => {
  const s = new Scene(uid + 'so', { w: 1600, h: 900, seed: 31 });
  s.sky(DAY, { sun: { x: 330, y: 210, r: 56, c: '#fff4cc', glow: '#ffd88a' } });
  s.cloud(640, 170, 1.5, { cls: 'cl cl1', o: 0.85 }).cloud(1150, 240, 1.9, { cls: 'cl cl2', o: 0.8 });
  s.peaks({ base: 700, n: 6, hmin: 120, hmax: 260, x0: -20, x1: 1620 });
  s.add(`<path d="M0 700Q400 640 820 680T1600 660V900H0Z" fill="#7a9a5c"/>`);
  s.add(`<g fill="#e8963f">${[...Array(24)].map((_, i) => `<circle cx="${120 + (i % 8) * 180 + (i > 15 ? 60 : 0)}" cy="${760 + Math.floor(i / 8) * 34}" r="9"/>`).join('')}</g>`);
  // hang glider
  s.add(`<g transform="translate(1020 330) rotate(-8)"><path d="M-130 0L0 -34L130 0L0 -12Z" fill="#e8553f"/><path d="M0 -12V22" stroke="#2c3040" stroke-width="5"/><circle cx="0" cy="34" r="10" fill="#2c3040"/><path d="M-8 30Q0 22 8 30L6 52H-6Z" fill="#2c3040"/></g>`);
  bird(s, 480, 300, 1.2); bird(s, 512, 316, 0.9);
  return s.svg({ label: '插图:滑翔翼飞越山野与橙园' });
};

raw.avengers = (uid = '') => {
  const s = new Scene(uid + 'av', { w: 1600, h: 900, seed: 37 });
  s.sky(NIGHT, { stars: 22 });
  city(s, { x0: -10, x1: 1610, base: 760, hmin: 120, hmax: 340, colors: ['#232a4a', '#2c3458', '#1c2240'], op: 0.6, wmin: 60, wmax: 120 });
  // crossing spotlights
  s.add(`<path d="M200 760L520 120L600 120L340 760Z" fill="${s.lin(['#8ab8e855', '#8ab8e800'])}"/><path d="M1400 760L1080 100L1000 100L1260 760Z" fill="${s.lin(['#e8556a55', '#e8556a00'])}"/>`);
  // web arcs
  let web = '';
  for (let i = 1; i <= 4; i++) web += `<path d="M800 ${640 - i * 72}Q800 ${560 - i * 72} 880 ${560 - i * 72}" fill="none"/>`;
  s.add(`<g stroke="#e8ecf4" stroke-width="5" opacity=".8" transform="translate(340 40)">${web}<path d="M800 640V320M800 640L700 330M800 640L920 340" stroke-width="4" fill="none"/></g>`);
  gnd(s, 760, '#161a30');
  s.add(`<circle cx="800" cy="500" r="10" fill="#e8483f"/><circle cx="700" cy="560" r="8" fill="#e8483f"/><circle cx="905" cy="450" r="8" fill="#e8483f"/>`);
  return s.svg({ label: '插图:夜幕下的复仇者联盟园区' });
};

raw.pier = (uid = '') => {
  const s = new Scene(uid + 'pr', { w: 1600, h: 900, seed: 41 });
  s.sky(DUSK, { sun: { x: 420, y: 430, r: 56, c: '#fff3c8', glow: '#ffb070' }, stars: 8 });
  sea(s, 560, '#e89a7a', '#2f4a6e', { glow: { x: 420, c: '#ffcf8a', rx: 240, ry: 16, o: 0.55 }, n: 18, caps: 8 });
  // ferris wheel
  const cx = 1060, cy = 400, r = 230;
  let spokes = '', gond = '';
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2, gx = cx + Math.cos(a) * r, gy = cy + Math.sin(a) * r;
    spokes += `<line x1="${cx}" y1="${cy}" x2="${n1(gx)}" y2="${n1(gy)}"/>`;
    gond += `<circle cx="${n1(gx)}" cy="${n1(gy + 12)}" r="13" fill="${['#e8553f', '#f2c14e', '#4aa3d8', '#7ab648'][i % 4]}"/>`;
  }
  s.add(`<g stroke="#f6efe0" stroke-width="7" fill="none"><circle cx="${cx}" cy="${cy}" r="${r}"/>${spokes}</g>${gond}<path d="M${cx - 70} 640L${cx} ${cy}L${cx + 70} 640" stroke="#f6efe0" stroke-width="10" fill="none"/>`);
  // pier deck
  s.add(`<path d="M0 760H1600V900H0Z" fill="#6b4a3a"/><path d="M0 780H1600M0 820H1600M0 862H1600" stroke="#5a3d30" stroke-width="5"/>`);
  s.add(`<g stroke="#4a3428" stroke-width="4">${[...Array(12)].map((_, i) => `<path d="M${60 + i * 130} 760V900"/>`).join('')}</g>`);
  return s.svg({ label: '插图:码头与摩天轮' });
};

raw.rise = (uid = '') => {
  const s = new Scene(uid + 'rs', { w: 1600, h: 900, seed: 47 });
  s.sky(['#0a1026', '#141c3e', '#232a52'], { stars: 40 });
  // rock spires
  s.add(`<path d="M120 760L210 300L280 460L340 240L430 500L510 380L580 760Z" fill="#22202e"/><path d="M340 240L430 500L510 380L580 760H400Z" fill="#2e2a3a"/>`);
  s.add(`<path d="M1080 760L1150 420L1230 240L1310 480L1390 360L1470 760Z" fill="#22202e"/><path d="M1230 240L1310 480L1390 360L1470 760H1260Z" fill="#2e2a3a"/>`);
  gnd(s, 760, '#191624');
  // shuttle
  s.add(`<g transform="translate(760 330) rotate(-12)"><path d="M-120 20L0 -60L120 20L60 14L40 50H-40L-60 14Z" fill="#c8ccd4"/><path d="M-40 50H40L30 66H-30Z" fill="#8a8f9a"/><ellipse cx="0" cy="-18" rx="26" ry="14" fill="#3a4a6a"/></g>`);
  s.add(`<path d="M200 220L520 300M1380 180L1120 280" stroke="#e8483f" stroke-width="5" stroke-linecap="round"/>`);
  return s.svg({ label: '插图:银河边缘的黑色尖峰与穿梭机' });
};

raw.bigthunder = (uid = '') => {
  const s = new Scene(uid + 'bt', { w: 1600, h: 900, seed: 53 });
  s.sky(GOLD, { sun: { x: 300, y: 220, r: 50, c: '#fff3c8', glow: '#ffc27a' } });
  mesa(s, 420, 700, 760, 420, '#a85240', '#0000002a');
  gnd(s, 700, '#c98a58');
  // trestle + train
  s.add(`<path d="M120 760H1480" stroke="#6b4630" stroke-width="12"/>`);
  s.add(`<g stroke="#6b4630" stroke-width="7">${[...Array(9)].map((_, i) => `<path d="M${180 + i * 160} 762L${140 + i * 160} 830M${180 + i * 160} 762L${220 + i * 160} 830"/>`).join('')}</g>`);
  s.add(`<g fill="#3a3040"><rect x="560" y="716" width="90" height="42" rx="8"/><rect x="660" y="722" width="76" height="36" rx="8"/><rect x="746" y="722" width="76" height="36" rx="8"/><circle cx="586" cy="762" r="10"/><circle cx="628" cy="762" r="10"/><circle cx="690" cy="762" r="9"/><circle cx="776" cy="762" r="9"/></g><rect x="600" y="694" width="14" height="26" fill="#3a3040"/><circle cx="607" cy="686" r="9" fill="#8a8f9a" opacity=".8"/>`);
  s.add(`<g stroke="#3f6b4a" stroke-width="13" stroke-linecap="round" fill="none"><path d="M1500 830V730M1500 780Q1500 760 1482 760Q1468 760 1468 742"/></g>`);
  bird(s, 1180, 200, 1.3);
  return s.svg({ label: '插图:矿车过山车与平顶山' });
};

raw.pirates = (uid = '') => {
  const s = new Scene(uid + 'pi', { w: 1600, h: 900, seed: 59 });
  s.sky(['#12203e', '#1c3a5a', '#2a5470'], { moon: { x: 1250, y: 180, r: 54 }, stars: 24 });
  sea(s, 620, '#2a5470', '#12203e', { n: 14 });
  // ship at left
  s.add(`<g transform="translate(330 620)"><path d="M-150 0Q-130 -60 -90 -70L110 -70Q150 -60 160 0Q120 40 60 44H-90Q-140 36 -150 0Z" fill="#241c18"/><path d="M-90 -70L-60 -120H80L110 -70" fill="#2e241e"/><path d="M-20 -120V-330M60 -120V-280" stroke="#241c18" stroke-width="10"/><path d="M-20 -320Q-110 -280 -100 -190Q-40 -210 -20 -240ZM-20 -300Q60 -280 56 -200Q10 -220 -20 -240Z" fill="#3a2f26"/><path d="M60 -270Q130 -250 126 -180Q84 -200 60 -226Z" fill="#3a2f26"/></g>`);
  // balcony right
  s.add(`<g transform="translate(1120 300)"><rect x="0" y="0" width="380" height="600" fill="#7a4a3a"/><rect x="26" y="60" width="140" height="200" rx="8" fill="#ffd88a" opacity=".9"/><rect x="220" y="60" width="140" height="200" rx="8" fill="#f6b86a" opacity=".85"/><rect x="-16" y="300" width="412" height="20" fill="#2c2018"/><g stroke="#2c2018" stroke-width="6">${[...Array(9)].map((_, i) => `<path d="M${i * 48} 320V400"/>`).join('')}<path d="M-10 400H402" stroke-width="10"/></g><path d="M60 320q10 -26 30 0M300 320q10 -26 30 0" stroke="#2c2018" stroke-width="5" fill="none"/></g>`);
  s.add(`<circle cx="1220" cy="520" r="30" fill="${s.rad('#ffd88a', 0.8)}"/><circle cx="1220" cy="520" r="10" fill="#ffe9a0"/>`);
  return s.svg({ label: '插图:月夜下的海盗船与新奥尔良阳台' });
};

raw.haunted = (uid = '') => {
  const s = new Scene(uid + 'hm', { w: 1600, h: 900, seed: 67 });
  s.sky(['#1c2246', '#3c2f5e', '#6e4a72'], { moon: { x: 380, y: 200, r: 60 }, stars: 20 });
  // mansion
  const bx = 620, by = 760;
  s.add(`<g><rect x="${bx}" y="${by - 260}" width="360" height="260" fill="#cabfa8"/><rect x="${bx + 40}" y="${by - 400}" width="280" height="150" fill="#b8ac96"/><path d="M${bx + 30} ${by - 400}H${bx + 330}L${bx + 290} ${by - 450}H${bx + 70}Z" fill="#4a3a52"/><rect x="${bx + 130}" y="${by - 520}" width="100" height="90" fill="#b8ac96"/><path d="M${bx + 122} ${by - 520}H${bx + 238}L${bx + 180} ${by - 570}Z" fill="#4a3a52"/><g fill="#ffd88a"><rect x="${bx + 40}" y="${by - 220}" width="42" height="66" rx="20"/><rect x="${bx + 150}" y="${by - 220}" width="42" height="66" rx="20"/><rect x="${bx + 268}" y="${by - 220}" width="42" height="66" rx="20"/><rect x="${bx + 90}" y="${by - 360}" width="42" height="60" rx="20"/><rect x="${bx + 220}" y="${by - 360}" width="42" height="60" rx="20"/></g><g fill="#e8dcc4">${[0, 1, 2, 3].map((i) => `<rect x="${bx + 24 + i * 88}" y="${by - 150}" width="20" height="150"/>`).join('')}</g><rect x="${bx - 10}" y="${by - 164}" width="380" height="18" fill="#8a7e68"/></g>`);
  gnd(s, 760, '#1d1830');
  bare(s, 150, 880, 300, { c: '#14101f', depth: 5 }); bare(s, 1460, 890, 260, { c: '#14101f', depth: 4 });
  s.add(`<g stroke="#14101f" stroke-width="4" fill="none"><path d="M1050 220q14 -12 28 0q14 -12 28 0M1120 260q10 -9 20 0q10 -9 20 0"/></g>`);
  return s.svg({ label: '插图:月光下的鬼屋' });
};

raw.indy = (uid = '') => {
  const s = new Scene(uid + 'in', { w: 1600, h: 900, seed: 71 });
  s.sky(['#3a5a52', '#6e8a5c', '#c9b27a'], { sun: { x: 1200, y: 200, r: 44, c: '#fff3c8', glow: '#ffe9a0' } });
  // temple
  s.add(`<path d="M520 780V420H1080V780Z" fill="#7a6a52"/><path d="M560 420L800 280L1040 420Z" fill="#6b5c46"/><path d="M640 780V560Q800 480 960 560V780Z" fill="#2c2118"/><path d="M664 780V580Q800 510 936 580V780Z" fill="${s.rad('#f2b04a', 0.85, 0.06)}"/>`);
  s.add(`<g fill="#5c4e3a">${[...Array(6)].map((_, i) => `<circle cx="${610 + i * 76}" cy="${452}" r="16"/>`).join('')}</g>`);
  // jungle leaves framing
  s.add(`<g fill="#23402e">${[...Array(7)].map((_, i) => `<path d="M${40 + i * 36} 0Q${70 + i * 36} ${150 + (i % 3) * 40} ${10 + i * 36} ${300 + (i % 2) * 60}Q${30 + i * 36} ${140} ${40 + i * 36} 0Z" opacity=".9"/>`).join('')}</g>`);
  s.add(`<g fill="#1d3626">${[...Array(7)].map((_, i) => `<path d="M${1560 - i * 36} 0Q${1530 - i * 36} ${140 + (i % 3) * 50} ${1590 - i * 36} ${290 + (i % 2) * 70}Q${1570 - i * 36} ${150} ${1560 - i * 36} 0Z" opacity=".92"/>`).join('')}</g>`);
  gnd(s, 780, '#31432c');
  palm(s, 180, 900, 360, '#23402e', 0.3); palm(s, 1430, 900, 340, '#1d3626', -0.26);
  return s.svg({ label: '插图:丛林里的神庙入口' });
};

raw.space = (uid = '') => {
  const s = new Scene(uid + 'sp', { w: 1600, h: 900, seed: 79 });
  s.sky(NIGHT, { stars: 46 });
  gnd(s, 780, '#141a30');
  // Space Mountain: white cone with ribs + spires
  s.add(`<path d="M480 780Q800 320 1120 780Z" fill="#e8ecf4"/><path d="M800 380V780M690 470Q700 620 660 780M910 470Q900 620 940 780M610 580Q620 680 590 780M990 580Q980 680 1010 780" stroke="#b8c2d8" stroke-width="6" fill="none"/><path d="M480 780Q800 320 1120 780" fill="none" stroke="#f6f8fc" stroke-width="8"/>`);
  s.add(`<g fill="#c8d2e4"><path d="M380 780V520L410 470L440 520V780Z"/><path d="M1160 780V520L1190 470L1220 520V780Z"/></g>`);
  // rocket streak
  s.add(`<path d="M240 200Q560 320 860 260" stroke="#8ab8e8" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/><circle cx="860" cy="260" r="9" fill="#cfe4ff"/>`);
  return s.svg({ label: '插图:白色穹顶的太空山' });
};

raw.toontown = (uid = '') => {
  const s = new Scene(uid + 'tt', { w: 1600, h: 900, seed: 83 });
  s.sky(DAY, { sun: { x: 1350, y: 170, r: 50, c: '#fff4cc', glow: '#ffe9a0' } });
  s.cloud(320, 150, 1.4, { cls: 'cl cl1', o: 0.9 }).cloud(760, 220, 1.1, { cls: 'cl cl2', o: 0.85 });
  // round hills
  s.add(`<path d="M-20 640Q180 440 400 560T820 540Q1040 460 1220 590T1620 560V900H-20Z" fill="#8ab86a"/>`);
  // curvy houses
  s.add(`<g><path d="M260 760Q250 640 330 620Q420 600 420 700V760Z" fill="#e87a5a"/><path d="M250 640Q340 540 430 640Q340 610 250 640Z" fill="#c94f5a"/><circle cx="345" cy="690" r="26" fill="#ffd88a"/><rect x="316" y="716" width="56" height="44" rx="26" fill="#7a3b3b"/></g>`);
  s.add(`<g><path d="M1120 770Q1110 660 1190 640Q1270 626 1276 710V770Z" fill="#4aa3d8"/><path d="M1112 664Q1196 570 1284 664Q1198 634 1112 664Z" fill="#e8553f"/><circle cx="1198" cy="700" r="22" fill="#fff3c8"/></g>`);
  // little train on a curve
  s.add(`<path d="M620 830Q820 780 1020 830" stroke="#4a3a30" stroke-width="10" fill="none"/>`);
  s.add(`<g fill="#c0392b"><rect x="720" y="782" width="70" height="40" rx="10"/><rect x="800" y="788" width="56" height="32" rx="9"/><rect x="862" y="792" width="50" height="28" rx="9"/></g><circle cx="742" cy="826" r="9" fill="#2c2118"/><circle cx="826" cy="826" r="8" fill="#2c2118"/><circle cx="884" cy="826" r="7" fill="#2c2118"/>`);
  // balloon
  s.add(`<g transform="translate(520 300)"><circle r="34" fill="#f2c14e"/><path d="M-24 24Q0 44 24 24L10 58H-10Z" fill="#e8553f"/><path d="M0 58V96" stroke="#4a3a30" stroke-width="3"/></g>`);
  return s.svg({ label: '插图:卡通城的圆山与小火车' });
};

raw.sign = (uid = '') => {
  const s = new Scene(uid + 'sg', { w: 1600, h: 900, seed: 89 });
  s.sky(DAY, { sun: { x: 1300, y: 180, r: 52, c: '#fff4cc', glow: '#ffe9a0' } });
  s.cloud(420, 170, 1.5, { cls: 'cl cl1', o: 0.85 });
  s.add(`<path d="M0 560Q420 400 860 480T1600 420V900H0Z" fill="#7a9a5c"/>`);
  s.add(`<path d="M0 640Q500 520 960 580T1600 540V900H0Z" fill="#688a4e"/>`);
  s.add(`<text x="800" y="560" text-anchor="middle" font-family="Arial, sans-serif" font-size="88" font-weight="900" letter-spacing="14" fill="#f8f6ee" transform="rotate(-2 800 560)">HOLLYWOOD</text>`);
  palm(s, 130, 900, 330, '#2c4a2e', 0.24); palm(s, 1500, 900, 300, '#2c4a2e', -0.2);
  bird(s, 300, 260, 1.2); bird(s, 336, 276, 0.9);
  return s.svg({ label: '插图:山坡上的好莱坞标志' });
};

raw.walk = (uid = '') => {
  const s = new Scene(uid + 'wk', { w: 1600, h: 900, seed: 97 });
  s.sky(DUSK, { stars: 10 });
  city(s, { x0: -10, x1: 1610, base: 560, hmin: 80, hmax: 240, colors: ['#3a3454', '#2e2a48', '#453e60'], op: 0.55, wmin: 50, wmax: 100 });
  // pagoda silhouette (Chinese Theatre)
  s.add(`<g fill="#241f3a"><rect x="1050" y="330" width="240" height="230"/><path d="M1010 330H1330L1270 260H1070Z"/><path d="M1030 260H1310L1260 200H1080Z"/><path d="M1060 200H1280L1240 150H1100Z"/><rect x="1150" y="110" width="40" height="44"/></g>`);
  // sidewalk with stars
  s.add(`<path d="M0 560H1600V900H0Z" fill="#8a7f72"/><path d="M0 560H1600" stroke="#6e6458" stroke-width="6"/>`);
  const star = (cx, cy, r, c = '#c94f5a') => {
    let d = '';
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.42 : r;
      d += `${i ? 'L' : 'M'}${n1(cx + Math.cos(a) * rr)} ${n1(cy + Math.sin(a) * rr)}`;
    }
    return `<path d="${d}Z" fill="${c}" stroke="#f2c14e" stroke-width="${n1(r * 0.14)}"/>`;
  };
  s.add(`<g transform="translate(420 730) scale(1 0.42)">${star(0, 0, 120)}</g><g transform="translate(950 690) scale(1 0.4)">${star(0, 0, 84)}</g><g transform="translate(1330 800) scale(1 0.44)">${star(0, 0, 100)}</g>`);
  palm(s, 150, 900, 340, '#241f3a', 0.26);
  return s.svg({ label: '插图:星光大道与中国剧院' });
};

raw.rodeo = (uid = '') => {
  const s = new Scene(uid + 'rd', { w: 1600, h: 900, seed: 101 });
  s.sky(DAY, { sun: { x: 800, y: 150, r: 46, c: '#fff4cc', glow: '#ffe9a0' } });
  // street to vanishing point
  s.add(`<path d="M520 900L760 420H840L1080 900Z" fill="#9a9082"/><path d="M760 420H840" stroke="#f6efe0" stroke-width="4"/><path d="M700 900L790 420M900 900L810 420" stroke="#f6efe0" stroke-width="3" stroke-dasharray="18 22" opacity=".7"/>`);
  // shops left/right
  s.add(`<g><rect x="60" y="480" width="300" height="420" fill="#e8d8c0"/><path d="M60 480H360L330 430H90Z" fill="#c94f5a"/><rect x="100" y="560" width="80" height="120" fill="#7ab0c9"/><rect x="220" y="560" width="80" height="120" fill="#7ab0c9"/></g>`);
  s.add(`<g><rect x="1240" y="480" width="300" height="420" fill="#d8c8e0"/><path d="M1240 480H1540L1510 430H1270Z" fill="#4a6a8a"/><rect x="1280" y="560" width="80" height="120" fill="#8ab8d8"/><rect x="1400" y="560" width="80" height="120" fill="#8ab8d8"/></g>`);
  palm(s, 460, 880, 300, '#3a5a3a', 0.1); palm(s, 560, 700, 200, '#3a5a3a', 0.08); palm(s, 1140, 880, 300, '#3a5a3a', -0.1); palm(s, 1040, 700, 200, '#3a5a3a', -0.08);
  return s.svg({ label: '插图:棕榈夹道的购物街' });
};

raw.getty = (uid = '') => {
  const s = new Scene(uid + 'gt', { w: 1600, h: 900, seed: 107 });
  s.sky(DAY, { sun: { x: 320, y: 170, r: 48, c: '#fff4cc', glow: '#ffe9a0' } });
  s.cloud(900, 150, 1.4, { cls: 'cl cl1', o: 0.8 });
  // distant city + sea
  city(s, { x0: 60, x1: 700, base: 620, hmin: 20, hmax: 60, colors: ['#a9b4c4', '#98a6ba'], op: 0.4, wmin: 20, wmax: 44 });
  s.add(`<rect x="0" y="620" width="1600" height="60" fill="#9ab8d0" opacity=".7"/>`);
  // white travertine curves
  s.add(`<path d="M300 900V560Q300 480 420 480H700V900Z" fill="#efe8da"/>`);
  s.add(`<path d="M700 900V420Q700 340 820 340H1080Q1200 340 1200 460V900Z" fill="#e6ddcc"/>`);
  s.add(`<path d="M700 420Q900 380 1200 460" stroke="#d8ccb6" stroke-width="10" fill="none"/>`);
  s.add(`<g fill="#b8c2cc"><rect x="360" y="540" width="90" height="150"/><rect x="480" y="540" width="90" height="150"/><rect x="780" y="430" width="110" height="180"/><rect x="930" y="430" width="110" height="180"/></g>`);
  // cactus garden
  gnd(s, 900 - 120, '#c9b68a');
  s.add(`<g stroke="#5a7a4a" stroke-width="12" stroke-linecap="round" fill="none"><path d="M1350 880V760M1350 820Q1350 796 1330 796Q1314 796 1314 776M1350 840Q1350 812 1372 812Q1388 812 1388 790"/></g>`);
  s.add(`<g fill="#6a8a52"><ellipse cx="1240" cy="870" rx="34" ry="20"/><ellipse cx="1470" cy="880" rx="40" ry="18"/></g>`);
  return s.svg({ label: '插图:Getty 的白色曲线建筑与仙人掌' });
};

raw.usc = (uid = '') => {
  const s = new Scene(uid + 'us', { w: 1600, h: 900, seed: 113 });
  s.sky(GOLD, { sun: { x: 1250, y: 220, r: 48, c: '#fff3c8', glow: '#ffc27a' } });
  // brick arcade
  s.add(`<rect x="220" y="380" width="1160" height="420" fill="#9a5a42"/><rect x="220" y="380" width="1160" height="26" fill="#7a4634"/>`);
  s.add(`<g fill="#f6e2c4">${[...Array(6)].map((_, i) => `<path d="M${290 + i * 180} 800V560Q${380 + i * 180} 470 ${470 + i * 180} 560V800Z"/>`).join('')}</g>`);
  s.add(`<g fill="#c9a27a">${[...Array(7)].map((_, i) => `<rect x="${240 + i * 180}" y="540" width="30" height="260"/>`).join('')}</g>`);
  gnd(s, 800, '#b89a6a');
  palm(s, 140, 900, 380, '#5a4a33', 0.2); palm(s, 1470, 900, 360, '#5a4a33', -0.18);
  return s.svg({ label: '插图:红砖拱廊与棕榈' });
};

raw.lax = (uid = '') => {
  const s = new Scene(uid + 'lx', { w: 1600, h: 900, seed: 127 });
  s.sky(DUSK, { stars: 14 });
  city(s, { x0: -10, x1: 1610, base: 700, hmin: 40, hmax: 130, colors: ['#3a3454', '#2e2a48', '#453e60'], op: 0.5, wmin: 40, wmax: 90 });
  // Theme Building: parabolic arches
  s.add(`<g stroke="#e8ecf4" stroke-width="16" fill="none"><path d="M560 760Q800 240 1040 760"/><path d="M660 760Q800 330 940 760" opacity=".85"/></g><ellipse cx="800" cy="470" rx="130" ry="46" fill="#e8ecf4"/><ellipse cx="800" cy="470" rx="96" ry="30" fill="#31418a"/><circle cx="800" cy="470" r="8" fill="#ffd88a"/>`);
  gnd(s, 760, '#1d1a30');
  plane(s, 1220, 220, 1.6, '#f6efe0', -14);
  palm(s, 180, 900, 300, '#161226', 0.24); palm(s, 1430, 900, 320, '#161226', -0.22);
  return s.svg({ label: '插图:LAX 主题建筑与起飞的飞机' });
};

raw.innout = (uid = '') => {
  const s = new Scene(uid + 'io', { w: 1600, h: 900, seed: 131 });
  s.sky(DUSK, { sun: { x: 420, y: 520, r: 64, c: '#fff3c8', glow: '#ffb070' }, stars: 8 });
  gnd(s, 700, '#3a3040');
  // crossed palms (the chain's signature)
  palm(s, 700, 780, 420, '#241f30', 0.3); palm(s, 900, 780, 420, '#241f30', -0.3);
  // boomerang arrow sign
  s.add(`<g transform="translate(1210 420)"><rect x="-10" y="40" width="20" height="300" fill="#4a3a3a"/><path d="M-160 -30Q-40 -90 90 -40Q150 -16 170 20Q120 6 70 16Q-60 40 -150 10Q-172 2 -160 -30Z" fill="#f2c14e"/><path d="M-150 -16Q-40 -66 84 -24" stroke="#c0392b" stroke-width="16" fill="none"/><circle cx="150" cy="18" r="14" fill="#c0392b"/></g>`);
  // road + landing plane
  s.add(`<path d="M0 830H1600" stroke="#f6e6c4" stroke-width="6" stroke-dasharray="40 34"/>`);
  plane(s, 300, 260, 1.4, '#2c3040', 10);
  return s.svg({ label: '插图:夕阳、交叉棕榈与箭头招牌' });
};

export const scenes = {};
for (const k of Object.keys(raw)) scenes[k] = (uid = '', ...a) => squeeze(raw[k](uid, ...a));
