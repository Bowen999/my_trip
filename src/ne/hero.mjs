// Wide hero panorama (1600 x 760) with parallax groups: Boston skyline -> Maine lighthouse -> Newport mansion, late-autumn sunset.
import { Scene, SKY, AUT, bird, bare, city, sea, rock, foam, pine, n1 } from './kit.mjs';

export function addHero(scenes) {
  scenes.hero = (uid = '') => {
    const s = new Scene(uid + 'hero', { w: 1600, h: 760, seed: 531 });
    s.add('<g class="px" data-s="0.45">');
    s.sky(SKY.sunset, { sun: { x: 1180, y: 430, r: 44, c: '#fff1c4', glow: '#ffb070' }, stars: 18 });
    s.cloud(260, 150, 1.7, { cls: 'cl cl1', c: '#f5b8a6', o: 0.75 }).cloud(760, 100, 1.2, { cls: 'cl cl2', c: '#f0a3a0', o: 0.7 }).cloud(1100, 200, 1.9, { cls: 'cl cl3', c: '#f7c1a4', o: 0.75 }).cloud(1480, 120, 1.1, { cls: 'cl cl1', c: '#f5b8a6', o: 0.6 });
    s.add('</g>');
    bird(s, 600, 210, 1.4); bird(s, 632, 228, 1); bird(s, 980, 160, 1.2);
    const Y = 560;
    // far haze
    s.add('<g class="px" data-s="0.3">');
    s.add(`<path d="M0 ${Y - 30}Q200 ${Y - 80} 420 ${Y - 40}T860 ${Y - 50}T1300 ${Y - 40}T1600 ${Y - 60}V${Y}H0Z" fill="#9c6f8e" opacity=".6"/>`);
    s.add('</g>');
    // sea
    sea(s, Y, '#d98a82', '#1f2f62', { glow: { x: 1180, c: '#ffcf8a', rx: 260, ry: 18, o: 0.6 }, n: 22, caps: 12 });
    s.add(`<rect x="1130" y="${Y + 2}" width="100" height="170" fill="${s.lin(['#ffd48a', '#ffd48a00'])}" opacity=".4" class="rip"/>`);
    // Boston
    s.add('<g class="px" data-s="0.2">');
    city(s, { x0: 20, x1: 640, base: Y, hmin: 30, hmax: 120, colors: ['#5d4a7c', '#4f3f70', '#6a578a'], op: 0.55, wmin: 16, wmax: 34 });
    // Prudential + Hancock silhouettes
    s.add(`<g fill="#463a6a"><rect x="236" y="${Y - 190}" width="46" height="192"/><rect x="247" y="${Y - 232}" width="24" height="44"/><path d="M247 ${Y - 232}L259 ${Y - 252}L271 ${Y - 232}Z"/><path d="M259 ${Y - 252}V${Y - 310}" stroke="#463a6a" stroke-width="3"/></g><path d="M390 ${Y + 1}L394 ${Y - 250}L430 ${Y - 244}L426 ${Y + 1}Z" fill="${s.lin(['#a9b2d6', '#d9889a'])}"/>`);
    s.add('</g>');
    // lighthouse headland (middle)
    s.add('<g class="px" data-s="0.12">');
    rock(s, [[600, 640], [700, 600], [800, 576], [900, 566], [1000, 572], [1060, 600], [1100, 650]], 700, { fill: '#4e4458', hi: '#7a6a78', lo: 'rgba(20,10,30,.35)' });
    const tx = 880, hy = 574;
    s.add(`<path d="M${tx - 20} ${hy}L${tx - 13} ${hy - 150}H${tx + 13}L${tx + 20} ${hy}Z" fill="#f6efe6"/><path d="M${tx} ${hy - 150}H${tx + 13}L${tx + 20} ${hy}H${tx}Z" fill="#d9cfd0"/><rect x="${tx - 18}" y="${hy - 157}" width="36" height="7" fill="#2b2a3a"/><rect x="${tx - 13}" y="${hy - 180}" width="26" height="23" fill="#ffe7a0"/><path d="M${tx - 18} ${hy - 180}H${tx + 18}L${tx} ${hy - 200}Z" fill="#2b2a3a"/><rect x="${tx - 100}" y="${hy - 44}" width="80" height="44" fill="#f6efe6"/><path d="M${tx - 108} ${hy - 42}L${tx - 60} ${hy - 80}L${tx - 12} ${hy - 42}Z" fill="#b8392e"/><g fill="#ffd88a"><rect x="${tx - 88}" y="${hy - 30}" width="9" height="13"/><rect x="${tx - 62}" y="${hy - 30}" width="9" height="13"/><rect x="${tx - 36}" y="${hy - 30}" width="9" height="13"/></g>`);
    s.add(`<g class="beam"><path d="M${tx - 6} ${hy - 168}L${tx - 560} ${hy - 230}V${hy - 110}Z" fill="${s.lin(['#fff2b800', '#fff2b8a0'], { x2: 1, y2: 0 })}"/><path d="M${tx + 6} ${hy - 168}L${tx + 300} ${hy - 210}V${hy - 130}Z" fill="${s.lin(['#fff2b8a0', '#fff2b800'], { x2: 1, y2: 0 })}"/></g>`);
    [[1010, 580, 50], [1040, 584, 64], [1070, 588, 48]].forEach(([x, y, h]) => pine(s, x, y, h, '#1f3d35'));
    s.add('</g>');
    // Newport mansion (right)
    s.add('<g class="px" data-s="0.16">');
    const mx = 1180;
    s.add(`<rect x="${mx}" y="${Y - 90}" width="360" height="94" fill="#d8c2a8"/><rect x="${mx + 240}" y="${Y - 90}" width="120" height="94" fill="#b8a088" opacity=".6"/><path d="M${mx - 8} ${Y - 90}L${mx + 60} ${Y - 130}H${mx + 300}L${mx + 368} ${Y - 90}Z" fill="#a8483a"/><rect x="${mx + 120}" y="${Y - 120}" width="120" height="30" fill="#d8c2a8"/><path d="M${mx + 110} ${Y - 120}L${mx + 180} ${Y - 160}L${mx + 250} ${Y - 120}Z" fill="#8a3a30"/>`);
    s.add(`<path fill="#3a3550" d="${[...Array(12)].map((_, i) => `M${mx + 14 + i * 29} ${Y - 6}V${Y - 56}Q${mx + 14 + i * 29} ${Y - 70} ${mx + 25 + i * 29} ${Y - 70}Q${mx + 36 + i * 29} ${Y - 70} ${mx + 36 + i * 29} ${Y - 56}V${Y - 6}Z`).join('')}"/>`);
    s.add(`<g fill="#ffd88a" opacity=".9">${[...Array(12)].map((_, i) => (i % 3 ? '' : `<rect x="${mx + 18 + i * 29}" y="${Y - 54}" width="14" height="40"/>`)).join('')}</g>`);
    s.add('</g>');
    // foreground: dark bank, bare trees, a few rust maples
    s.add('<g class="px" data-s="0">');
    s.add(`<path d="M0 ${H(s)}V690Q220 660 520 700T1100 690T1600 700V${H(s)}Z" fill="#1d1830"/><path d="M0 ${H(s)}V730Q300 712 700 736T1600 726V${H(s)}Z" fill="#141022"/>`);
    bare(s, 120, 740, 330, { c: '#1d1830', depth: 5 });
    bare(s, 1480, 740, 300, { c: '#1d1830', depth: 5 });
    bare(s, 1380, 744, 180, { c: '#1d1830', depth: 4 });
    s.add('</g>');
    return s.svg({ label: 'Late-autumn sunset panorama: Boston skyline, a Maine lighthouse and a Newport mansion', cls: 'hero-art' });
  };
}
const H = (s) => s.h;
export { n1 };
