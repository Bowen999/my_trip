// Rhode Island: Newport (Breakers, Cliff Walk, Ocean Drive, wharf) and Providence (State House, Federal Hill).
import { city, Scene, SKY, AUT, n1, bird, person, people, bare, maple, pine, gasLamp, brickPat, clapPat, shingPat, cobbles, sea, reflect, rock, foam, lobsterBoat, sailboat, mast, colonial, steeple, tenement } from './kit.mjs';

export function addRI(scenes) {
  /* ---------------- The Breakers ---------------- */
  scenes.breakers = (uid = '') => {
    const s = new Scene(uid + 'breakers', { seed: 521 });
    s.sky(SKY.cold, { sun: { x: 90, y: 120, r: 20, c: '#fff4d2', glow: '#ffe3b0' } });
    s.cloud(180, 70, 1.4, { cls: 'cl cl1', c: '#fff', o: 0.8 }).cloud(560, 50, 1.1, { cls: 'cl cl2', c: '#fff', o: 0.7 }).cloud(720, 100, 0.9, { cls: 'cl cl3', c: '#fff', o: 0.7 });
    const H = 214;
    sea(s, H, '#8fb0c6', '#4d7690', { n: 8, caps: 6 });
    sailboat(s, 90, 252, 0.7, { sails: true }); sailboat(s, 730, 244, 0.55, { sails: false });
    // limestone mansion
    const L = '#e9dec3', Ls = '#cfc19f', Ld = '#b9aa88', R = '#b7523a', Rs = '#963f2c';
    const Y = 334;
    const pav = (x, w, top, roofH) => {
      s.add(`<rect x="${x}" y="${top}" width="${w}" height="${Y - top}" fill="${L}"/><rect x="${x + w * 0.62}" y="${top}" width="${w * 0.38}" height="${Y - top}" fill="${Ls}" opacity=".5"/><path d="M${x - 6} ${top}L${x + w / 2} ${top - roofH}L${x + w + 6} ${top}Z" fill="${R}"/><path d="M${x + w / 2} ${top - roofH}L${x + w + 6} ${top}H${x + w / 2}Z" fill="${Rs}"/><rect x="${x - 4}" y="${top}" width="${w + 8}" height="5" fill="${Ls}"/>`);
    };
    // wings
    pav(130, 140, 214, 28); pav(530, 140, 214, 28);
    // corner towers
    s.add(`<rect x="118" y="168" width="60" height="${Y - 168}" fill="${L}"/><rect x="152" y="168" width="26" height="${Y - 168}" fill="${Ls}" opacity=".55"/><path d="M110 168L148 128L186 168Z" fill="${R}"/><rect x="112" y="166" width="72" height="5" fill="${Ld}"/><rect x="622" y="168" width="60" height="${Y - 168}" fill="${L}"/><rect x="656" y="168" width="26" height="${Y - 168}" fill="${Ls}" opacity=".55"/><path d="M614 168L652 128L690 168Z" fill="${R}"/><rect x="616" y="166" width="72" height="5" fill="${Ld}"/>`);
    // central block: loggia, pediment, tile roof
    s.add(`<rect x="258" y="170" width="284" height="${Y - 170}" fill="${L}"/><rect x="258" y="166" width="284" height="8" fill="${Ls}"/><path d="M270 166L400 120L530 166Z" fill="${R}"/><path d="M400 120L530 166H400Z" fill="${Rs}"/>`);
    // balustrades
    const bal = (x, y, w) => s.add(`<rect x="${x}" y="${y}" width="${w}" height="3" fill="${Ls}"/><path d="${[...Array(Math.floor(w / 7))].map((_, i) => `M${x + 2 + i * 7} ${y + 3}v8`).join('')}" stroke="${Ls}" stroke-width="2.6"/>`);
    bal(258, 160, 284); bal(130, 208, 140); bal(530, 208, 140);
    // windows: arches on every storey (one repeating tile of arched openings)
    const arch = (x, y, w, h, dark = '#3d4a58') => `M${x} ${y + h}V${y + w / 2}Q${x} ${y} ${x + w / 2} ${y}Q${x + w} ${y} ${x + w} ${y + w / 2}V${y + h}Z`;
    let a1 = '', a2 = '';
    [[142, 220], [180, 220], [218, 220], [542, 220], [580, 220], [618, 220]].forEach(([x, y]) => (a1 += arch(x, y, 22, 36) + arch(x, y + 56, 22, 36)));
    for (let i = 0; i < 5; i++) a2 += arch(276 + i * 52, 188, 26, 44);
    for (let i = 0; i < 3; i++) a2 += arch(288 + i * 92, 258, 56, 70);
    [[134, 178], [168, 178], [634, 178], [668, 178]].forEach(([x, y]) => (a2 += arch(x, y, 18, 40)));
    s.add(`<path d="${a1}" fill="#46586a" stroke="${Ld}" stroke-width="2.4"/><path d="${a2}" fill="#46586a" stroke="${Ld}" stroke-width="3"/>`);
    // lit interior of the grand arches
    s.add(`<path d="${arch(296, 266, 40, 62)} ${arch(388, 266, 40, 62)} ${arch(480, 266, 40, 62)}" fill="#ffd9a0" opacity=".85"/><path d="M276 334V300M350 334V300M370 334V300M442 334V300M462 334V300M536 334V300" stroke="${Ls}" stroke-width="7"/>`);
    // chimneys and flag
    s.add(`<g fill="#a8876a"><rect x="205" y="168" width="14" height="30"/><rect x="580" y="168" width="14" height="30"/><rect x="330" y="104" width="14" height="30"/><rect x="456" y="104" width="14" height="30"/></g><path d="M400 120V90" stroke="#5a4a44" stroke-width="1.6"/><path d="M401 90h18v10h-18z" fill="#d6453d" class="sway-s"/>`);
    // terrace + lawn
    s.add(`<rect x="0" y="${Y}" width="800" height="${450 - Y}" fill="#8a9a55"/><rect x="100" y="${Y}" width="600" height="10" fill="${Ld}"/>`);
    [[344, '#7f9150'], [362, '#7a8c4a'], [394, '#738546'], [430, '#6f8247']].forEach(([yy, c], i, a) => s.add(`<rect x="0" y="${yy}" width="800" height="${(a[i + 1] ? a[i + 1][0] : 450) - yy}" fill="${c}"/>`));
    // curved gravel drive to the entrance
    s.add(`<path d="M360 ${Y + 10}H440L560 450H240Z" fill="#cdbb94"/><path d="M360 ${Y + 10}H440L560 450" stroke="#a89670" stroke-width="2" fill="none"/>`);
    // clipped topiary + hedge
    [[226, 360], [574, 360], [150, 392], [650, 392]].forEach(([x, y]) => s.add(`<rect x="${x - 3}" y="${y}" width="6" height="14" fill="#5a4636"/><circle cx="${x}" cy="${y - 6}" r="15" fill="#4a6a3a"/><circle cx="${x - 4}" cy="${y - 10}" r="7" fill="#628a48" opacity=".7"/>`));
    s.add(`<rect x="60" y="${Y + 14}" width="190" height="10" rx="4" fill="#3f5f36"/><rect x="550" y="${Y + 14}" width="190" height="10" rx="4" fill="#3f5f36"/>`);
    maple(s, 40, 448, 170, '#c9632a', '#e6a43a');
    bare(s, 770, 450, 150, { c: '#3a2f2a', depth: 4 });
    people(s, [380, 414], 392, 1.3);
    bird(s, 300, 100, 1);
    return s.svg({ label: 'The Breakers, Newport: Italian Renaissance limestone mansion with red tile roofs, ocean behind and a clipped lawn' });
  };

  /* ---------------- Cliff Walk ---------------- */
  scenes.cliffwalk = (uid = '') => {
    const s = new Scene(uid + 'cliffwalk', { seed: 522 });
    s.sky(SKY.gold, { sun: { x: 120, y: 150, r: 20, c: '#fff4d2', glow: '#ffe3b0' } });
    s.cloud(260, 60, 1.4, { cls: 'cl cl1', c: '#fff', o: 0.75 }).cloud(560, 90, 1, { cls: 'cl cl2', c: '#fff', o: 0.65 });
    const H = 206;
    sea(s, H, '#8fb0c6', '#3f6684', { n: 10, caps: 8 });
    // far headland + mansions upslope on the right
    s.add(`<path d="M360 ${H}Q520 160 700 176T800 170V310H360Z" fill="#7d8a52"/>`);
    s.forest({ y: 236, x0: 380, x1: 800, n: 14, hmin: 24, hmax: 44, colors: [...AUT.leaf, '#6f7a3e'], kind: 'leafy', jitter: 10 });
    // stone chateau with towers
    const m = (x, y, w, h, wall = '#cfc4ae', roof = '#6a8a7c') => {
      s.add(`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${wall}"/><rect x="${x + w * 0.65}" y="${y}" width="${w * 0.35}" height="${h}" fill="rgba(60,50,40,.14)"/><path d="M${x - 4} ${y}L${x + w * 0.5} ${y - 22}L${x + w + 4} ${y}Z" fill="${roof}"/><path d="M${x + 6} ${y + 8}h${w - 12}" stroke="#8a7e6a" stroke-width="1.2"/>`);
      let wl = '';
      for (let i = 0; i < Math.floor(w / 16); i++) wl += `<rect x="${x + 8 + i * 16}" y="${y + 12}" width="6" height="${h - 16}" rx="3" fill="#4a5868"/>`;
      s.add(wl);
    };
    m(560, 210, 150, 36); m(700, 196, 62, 52, '#d9c9a8', '#a2402f');
    s.add(`<rect x="582" y="166" width="26" height="46" fill="#cfc4ae"/><path d="M578 166L595 138L612 166Z" fill="#6a8a7c"/><rect x="722" y="168" width="22" height="30" fill="#d9c9a8"/><path d="M718 168L733 146L748 168Z" fill="#a2402f"/>`);
    s.forest({ y: 252, x0: 380, x1: 800, n: 12, hmin: 22, hmax: 40, colors: AUT.pine, kind: 'pine', jitter: 6 });
    // cliff face and rocks on the left
    rock(s, [[-20, 450], [0, 336], [70, 322], [140, 330], [214, 318], [290, 322], [350, 312], [420, 300]], 470, { fill: '#6e6256', hi: '#9a8a76', lo: 'rgba(30,24,20,.3)' });
    // rocky shore + foam
    rock(s, [[-20, 450], [20, 410], [70, 420], [120, 436], [170, 450]], 470, { fill: '#4a4048', hi: '#6e6068' });
    foam(s, 20, 408, 140, 6); foam(s, 180, 330, 160, 6); foam(s, 0, 336, 130, 5);
    // grass slope on the right, then the path (tan) running into the distance
    s.add(`<path d="M380 316L800 226V450H300Z" fill="#7d8a52"/>`);
    s.add(`<path d="M420 300Q470 270 540 256L760 220L780 232Q640 250 580 276Q540 300 560 340Q580 400 640 450H300Q380 380 360 334Q350 310 420 300Z" fill="#8a8a4a"/>`);
    s.add(`<path d="M330 450Q420 380 400 336Q388 308 440 298Q500 276 560 262L742 228L758 236Q620 262 590 286Q566 310 590 354Q620 410 690 450Z" fill="#cdb48a"/>`);
    s.add(`<path d="M360 450Q440 392 420 340M600 450Q560 410 570 360" stroke="#b09770" stroke-width="2" fill="none" opacity=".6"/>`);
    // stone wall + iron rail along the cliff edge
    let rail = '';
    for (let i = 0; i < 9; i++) rail += `M${332 + i * 12} ${n1(396 - i * 6)}v-12`;
    s.add(`<path d="${rail}" stroke="#2b2f35" stroke-width="2"/><path d="M332 384Q380 372 440 346" stroke="#2b2f35" stroke-width="2.4" fill="none"/>`);
    // Forty Steps: stone arch, stairway down to the sea
    s.add(`<g transform="translate(210 322)"><path d="M-14 6L40 40L40 56L-14 22Z" fill="#8f8478"/>${[...Array(8)].map((_, i) => `<path d="M${-14 + i * 7} ${6 + i * 4.2}h7v3h-7z" fill="${i % 2 ? '#b8ac98' : '#a49884'}"/>`).join('')}<path d="M-18 -26V8M-6 -26V8" stroke="#a89c86" stroke-width="7"/><path d="M-20 -26Q-12 -44 -4 -26Z" fill="#a89c86"/><path d="M-14 -4H-2" stroke="#2b2f35" stroke-width="2"/></g>`);
    // shrubs: rust and rosehip
    const shrub = (x, y, r) => s.add(`<circle cx="${x}" cy="${y}" r="${r}" fill="#a9532e"/><circle cx="${x - r * 0.4}" cy="${y - r * 0.3}" r="${r * 0.55}" fill="#c9732a"/><g fill="#d6342c"><circle cx="${x + r * 0.5}" cy="${y - r * 0.2}" r="1.6"/><circle cx="${x - r * 0.1}" cy="${y + r * 0.4}" r="1.6"/><circle cx="${x + r * 0.1}" cy="${y - r * 0.6}" r="1.6"/></g>`);
    [[660, 410, 14], [720, 340, 10], [748, 276, 7], [612, 308, 7], [770, 430, 16]].forEach(([x, y, r]) => shrub(x, y, r));
    bare(s, 690, 400, 130, { c: '#3a2f2a', depth: 4 });
    // hikers
    person(s, 468, 330, 1.3, '#c9632a', { hat: '#2b3a5a' }); person(s, 488, 328, 1.3, '#2f5576', { hat: '#c8382f' }); person(s, 536, 296, 0.9, '#6c4a7a');
    bird(s, 300, 120, 1); bird(s, 326, 130, 0.8); bird(s, 420, 90, 0.9);
    return s.svg({ label: 'Newport Cliff Walk: a path along the rocky shore with mansions above, the ocean and the Forty Steps' });
  };

  /* ---------------- Ocean Drive / Brenton Point ---------------- */
  scenes.oceandrive = (uid = '') => {
    const s = new Scene(uid + 'oceandrive', { seed: 523 });
    s.sky(SKY.sunset, { sun: { x: 420, y: 268, r: 34, c: '#fff0c8', glow: '#ffb070' } });
    s.cloud(130, 90, 1.5, { cls: 'cl cl1', c: '#f6b4a2', o: 0.75 }).cloud(560, 60, 1.2, { cls: 'cl cl2', c: '#f3a8a0', o: 0.7 }).cloud(720, 150, 1, { cls: 'cl cl3', c: '#f7bfa6', o: 0.6 });
    const H = 292;
    sea(s, H, '#e68a78', '#1f3260', { glow: { x: 420, c: '#ffd08a', rx: 200, ry: 9, o: 0.45 }, n: 16, caps: 10 });
    reflect(s, 380, H + 2, 80, 120, '#ffd890', 0.28);
    sailboat(s, 560, 304, 0.45, { sails: true, hull: '#2c2a44', sail: '#3a3358', sail2: '#2c2a44', stripe: '#2c2a44' });
    // kites over the point (left)
    const kite = (x, y, c1, c2, rot, tx, ty) => `<g transform="rotate(${rot} ${x} ${y})"><path d="M${x} ${y - 20}L${x + 12} ${y}L${x} ${y + 20}L${x - 12} ${y}Z" fill="${c1}"/><path d="M${x} ${y - 20}L${x + 12} ${y}L${x} ${y + 20}Z" fill="${c2}"/></g><path d="M${x} ${y + 20}q${6} 14 -4 26t4 26" stroke="${c1}" stroke-width="1.4" fill="none"/><path d="M${x} ${y + 20}L${tx} ${ty}" stroke="#2b2f3a" stroke-width=".7" opacity=".7"/>`;
    s.add(`<g class="bird">${kite(150, 120, '#e8473a', '#f6c14a', -12, 120, 372)}</g><g class="bird" style="animation-delay:-2s">${kite(250, 82, '#4ac2b0', '#2a6fa8', 10, 120, 372)}</g><g class="bird" style="animation-delay:-4s">${kite(70, 170, '#f6c14a', '#d6453d', -20, 120, 372)}</g>`);
    // lawn point on the left with a figure flying the kites
    s.add(`<path d="M0 450V360Q60 346 150 366T300 390Q330 410 380 450Z" fill="#7a8a4a"/><path d="M0 372Q70 358 150 376T290 398" stroke="#9aa05a" stroke-width="3" fill="none" opacity=".6"/>`);
    person(s, 120, 372, 1.5, '#d6453d', { hat: '#2b2b33' }); person(s, 146, 374, 1.1, '#2f5576'); person(s, 96, 376, 0.9, '#c28a2e');
    // dark rocks with waves
    rock(s, [[300, 450], [380, 408], [460, 420], [540, 396], [620, 410], [700, 386], [780, 392], [830, 380]], 470, { fill: '#2a2230', hi: '#5a4a5a', lo: 'rgba(0,0,10,.4)' });
    rock(s, [[450, 450], [520, 430], [600, 444], [680, 450]], 470, { fill: '#352b3a', hi: '#64525e' });
    foam(s, 300, 410, 120, 6); foam(s, 450, 428, 140, 7); foam(s, 620, 410, 150, 7); foam(s, 520, 398, 80, 4);
    // spray
    s.add(`<g fill="#fff" opacity=".6" class="rip"><circle cx="540" cy="388" r="3"/><circle cx="552" cy="378" r="2"/><circle cx="530" cy="380" r="2"/><circle cx="700" cy="378" r="2.4"/><circle cx="712" cy="368" r="1.6"/></g>`);
    bare(s, 24, 380, 100, { c: '#241c2a', depth: 3 });
    bird(s, 520, 200, 1.1); bird(s, 548, 212, 0.9); bird(s, 480, 230, 0.8);
    return s.svg({ label: 'Ocean Drive at sunset: rocks and waves at Brenton Point with kites flying over the lawn' });
  };

  /* ---------------- Bowen's Wharf ---------------- */
  scenes.wharf = (uid = '') => {
    const s = new Scene(uid + 'wharf', { seed: 524 });
    s.sky(SKY.cold, { sun: { x: 120, y: 130, r: 18, c: '#fff4d2', glow: '#ffe3b0' } });
    s.cloud(300, 70, 1.4, { cls: 'cl cl1', c: '#fff', o: 0.8 }).cloud(640, 50, 1, { cls: 'cl cl2', c: '#fff', o: 0.7 });
    const H = 276;
    sea(s, H, '#9db9cb', '#4d7690', { n: 8, caps: 5 });
    // Newport Bridge in the distance
    s.add(`<g stroke="#8a9eb4" fill="none"><path d="M0 ${H - 16}H800" stroke-width="5"/><path d="M200 ${H + 6}V${H - 120}M320 ${H + 6}V${H - 120}" stroke-width="5"/><path d="M0 ${H - 36}Q100 ${H - 18} 200 ${H - 118}Q260 ${H - 48} 320 ${H - 118}Q420 ${H - 18} 540 ${H - 36}" stroke-width="1.6"/><path d="${[...Array(10)].map((_, i) => `M${20 + i * 20} ${H - 24 - i * 3}v8`).join('')}" stroke-width="1"/><path d="M0 ${H - 16}V${H + 6}M540 ${H - 16}V${H + 6}" stroke-width="4"/></g>`);
    s.add(`<path d="M540 ${H - 16}H800" stroke="#8a9eb4" stroke-width="5"/>`);
    // colonial houses on the shore
    const cp = clapPat(s), sp = shingPat(s);
    s.add(`<rect x="0" y="${H - 2}" width="800" height="10" fill="#7d8a52"/>`);
    colonial(s, 20, H + 6, 150, 56, { wall: '#e8c466', roof: '#5a4a44', shut: '#2f4a58', pat: cp, gable: 22, cols: 5 });
    colonial(s, 190, H + 6, 120, 50, { wall: '#d9b8a0', roof: '#4a4048', shut: '#5a2e2a', pat: cp, gable: 20, cols: 4 });
    // wharf buildings (right): weathered shingle, white trim, steep roofs
    const bld = (x, w, h, wall, roof) => {
      s.add(`<rect x="${x}" y="${H + 12 - h}" width="${w}" height="${h}" fill="${wall}"/><rect x="${x}" y="${H + 12 - h}" width="${w}" height="${h}" fill="${sp}"/><path d="M${x - 6} ${H + 12 - h}L${x + w / 2} ${H + 12 - h - 28}L${x + w + 6} ${H + 12 - h}Z" fill="${roof}"/><rect x="${x}" y="${H + 12 - h}" width="${w}" height="3" fill="#f7f0dc"/>`);
      let wl = '';
      for (let r = 0; r < 2; r++) for (let i = 0; i < Math.floor(w / 28); i++) wl += `<rect x="${x + 8 + i * 28}" y="${H + 12 - h + 12 + r * 28}" width="12" height="16" fill="${(i + r) % 2 ? '#ffd88a' : '#46586a'}"/><rect x="${x + 6 + i * 28}" y="${H + 12 - h + 12 + r * 28 - 2}" width="16" height="2" fill="#f7f0dc"/>`;
      s.add(wl);
    };
    bld(520, 120, 74, '#a8a08c', '#6a4a3c'); bld(650, 150, 66, '#b9a77a', '#5a4a44');
    // yachts and sailboats
    sailboat(s, 380, 306, 0.9, { sails: false }); sailboat(s, 440, 302, 0.8, { sails: false, hull: '#2c3a5a', stripe: '#f2c14e' }); sailboat(s, 330, 304, 0.7, { sails: true });
    // large motor yacht
    s.add(`<g class="bob" style="transform-origin:560px 340px"><g transform="translate(560 340)"><path d="M-110 -26H100Q112 -26 118 -42L130 -44Q128 -10 100 6H-100Q-116 0 -118 -26Z" fill="#f4f1ea"/><path d="M-116 -10H112" stroke="#2a4a7a" stroke-width="3"/><path d="M-100 -26V-46H60L84 -26Z" fill="#fffdf6"/><path d="M-84 -46V-62H34L50 -46Z" fill="#f4f1ea"/><g fill="#3c5268">${[...Array(9)].map((_, i) => `<rect x="${-96 + i * 15}" y="${-40}" width="9" height="8" rx="1"/>`).join('')}</g><rect x="-70" y="-58" width="84" height="8" fill="#3c5268"/><path d="M-20 -62V-92M-30 -80H-10M-26 -74H-14" stroke="#4a5560" stroke-width="2"/><circle cx="-20" cy="-93" r="2.4" fill="#d6453d"/></g></g>`);
    s.add(`<rect x="0" y="352" width="800" height="98" fill="#7a5f45"/><rect x="0" y="352" width="800" height="5" fill="#a58660"/>`);
    // deck planks (perspective lines)
    let pl = '';
    for (let i = 0; i < 9; i++) pl += `M${i * 100 - 40} 450L${380 + (i - 4) * 12} 357`;
    s.add(`<path d="${pl}" stroke="#4a382a" stroke-width="1.6" opacity=".5"/><path d="M0 396H800M0 428H800" stroke="#4a382a" stroke-width="1.4" opacity=".45"/>`);
    s.add(`<g fill="#2f2f37">${[90, 300, 520, 730].map((x) => `<rect x="${x}" y="338" width="8" height="16" rx="3"/>`).join('')}</g><path d="M96 340Q200 352 304 340M304 340Q410 352 524 340M524 340Q630 352 734 340" stroke="#d9cdb0" stroke-width="2" fill="none"/>`);
    // pumpkins and mums on the wharf
    s.add(`<g><ellipse cx="640" cy="424" rx="22" ry="17" fill="#e0792a"/><path d="M630 410Q640 430 630 438M650 410Q640 430 650 438" stroke="#b8561a" stroke-width="2" fill="none"/><rect x="637" y="404" width="5" height="8" fill="#5a6a2a"/><ellipse cx="686" cy="432" rx="15" ry="12" fill="#f0902f"/><rect x="684" y="419" width="4" height="6" fill="#5a6a2a"/><path d="M60 450q30 -34 60 0z" fill="#7a3a2a"/><g fill="#e8913a">${[0, 1, 2, 3, 4, 5, 6].map((i) => `<circle cx="${68 + i * 8}" cy="${424 - (i % 3) * 5}" r="6"/>`).join('')}</g></g>`);
    gasLamp(s, 210, 354, 1.3, { glow: '#ffd88a' }); gasLamp(s, 590, 354, 1.3, { glow: '#ffd88a' });
    people(s, [330, 350, 456, 480], 406, 1.6);
    bird(s, 300, 150, 1); bird(s, 324, 162, 0.8); bird(s, 560, 120, 0.9);
    return s.svg({ label: "Newport's Bowen's Wharf: yachts and sailboats, shingled wharf buildings and colonial houses with the Newport Bridge beyond" });
  };

  /* ---------------- Providence: State House + Benefit Street ---------------- */
  scenes.providence = (uid = '') => {
    const s = new Scene(uid + 'providence', { seed: 525 });
    s.sky(SKY.cold, { sun: { x: 700, y: 110, r: 18, c: '#fff4d2', glow: '#ffe3b0' } });
    s.cloud(150, 70, 1.4, { cls: 'cl cl1', c: '#fff', o: 0.8 }).cloud(500, 56, 1, { cls: 'cl cl2', c: '#fff', o: 0.7 });
    const bp = brickPat(s), cp = clapPat(s);
    // distant hill
    s.add(`<path d="M0 270Q160 214 330 232T660 220T800 246V340H0Z" fill="#8a9a6a"/>`);
    s.forest({ y: 250, x0: 0, x1: 800, n: 26, hmin: 20, hmax: 34, colors: [...AUT.leaf, '#7a8a52'], kind: 'leafy', jitter: 8 });
    // State House
    const cx = 300, Y = 296, M = '#f4f1e8', Ms = '#d6d1c2', Md = '#bdb8a8';
    s.add(`<rect x="${cx - 168}" y="${Y - 54}" width="336" height="54" fill="${M}"/><rect x="${cx + 60}" y="${Y - 54}" width="108" height="54" fill="${Ms}" opacity=".6"/><rect x="${cx - 172}" y="${Y - 58}" width="344" height="6" fill="${Ms}"/>`);
    // wing pediments + windows
    let wi = '';
    for (let i = 0; i < 14; i++) if (i < 4 || i > 9) wi += `<rect x="${cx - 160 + i * 23}" y="${Y - 42}" width="8" height="30" fill="#5a6678"/>`;
    s.add(`<g>${wi}</g>`);
    s.add(`<path d="M${cx - 96} ${Y - 58}L${cx} ${Y - 88}L${cx + 96} ${Y - 58}Z" fill="${M}" stroke="${Md}" stroke-width="2"/><rect x="${cx - 96}" y="${Y - 58}" width="192" height="58" fill="${M}"/><path d="${[...Array(9)].map((_, i) => `M${cx - 88 + i * 22} ${Y - 56}v54`).join('')}" stroke="${Md}" stroke-width="7"/><rect x="${cx - 20}" y="${Y - 34}" width="40" height="34" fill="#46586a"/><rect x="${cx - 100}" y="${Y - 3}" width="200" height="6" fill="${Ms}"/>`);
    // drum + dome
    s.add(`<rect x="${cx - 50}" y="${Y - 120}" width="100" height="36" fill="${M}"/><rect x="${cx - 54}" y="${Y - 90}" width="108" height="6" fill="${Ms}"/>`);
    s.add(`<path d="${[...Array(10)].map((_, i) => `M${cx - 45 + i * 10} ${Y - 118}v26`).join('')}" stroke="${Md}" stroke-width="3"/>`);
    s.add(`<path d="M${cx - 52} ${Y - 120}Q${cx - 56} ${Y - 190} ${cx} ${Y - 200}Q${cx + 56} ${Y - 190} ${cx + 52} ${Y - 120}Z" fill="${M}"/><path d="M${cx} ${Y - 200}Q${cx + 56} ${Y - 190} ${cx + 52} ${Y - 120}H${cx}Z" fill="${Ms}"/><path d="${[-34, -17, 0, 17, 34].map((d) => `M${cx + d} ${Y - 120}Q${cx + d * 0.7} ${Y - 180} ${cx} ${Y - 199}`).join('')}" stroke="${Md}" stroke-width="1.4" fill="none"/>`);
    s.add(`<rect x="${cx - 8}" y="${Y - 220}" width="16" height="22" fill="${M}"/><path d="M${cx - 9} ${Y - 220}Q${cx} ${Y - 232} ${cx + 9} ${Y - 220}Z" fill="${Ms}"/><path d="M${cx} ${Y - 232}V${Y - 236}" stroke="#d9a42c" stroke-width="2"/><g fill="#d9a42c"><circle cx="${cx}" cy="${Y - 246}" r="2.6"/><path d="M${cx - 2.6} ${Y - 243}h5.2l1.4 9h-8z"/><path d="M${cx + 3} ${Y - 244}L${cx + 12} ${Y - 262}" stroke="#d9a42c" stroke-width="1.4"/></g>`);
    // hill, lawn and steps
    s.add(`<path d="M0 ${Y}H800V450H0Z" fill="#7a8c4a"/><path d="M0 ${Y}Q300 ${Y - 8} 800 ${Y + 4}V${Y + 20}H0Z" fill="#8a9a56"/><path d="M${cx - 30} ${Y}H${cx + 30}L${cx + 70} 450H${cx - 70}Z" fill="#d8cdb2"/><path d="${[...Array(7)].map((_, i) => `M${cx - 30 - i * 5.8} ${Y + 10 + i * 18}H${cx + 30 + i * 5.8}`).join('')}" stroke="#b9ad92" stroke-width="2"/>`);
    // Benefit Street colonial houses stepping up the hill on the right
    const hs = [
      [506, 108, 52, '#e0b24a', '#5a4a44'],
      [622, 100, 58, '#a4503f', '#4a4048'],
      [730, 100, 66, '#e8dcc0', '#5a4a44'],
    ];
    hs.forEach(([x, w, h, c, r], i) => colonial(s, x, 330 + i * 4, w, h, { wall: c, roof: r, shut: '#2f4a58', pat: c === '#a4503f' ? bp : cp, gable: 20, cols: 4 }));
    steeple(s, 480, 320, 0.8);
    // brick sidewalk, cobbled street
    s.add(`<path d="M440 360H800V450H400Z" fill="#a8523f"/><rect x="440" y="360" width="360" height="4" fill="#8a4030"/>`);
    s.add(`<path d="M440 360H800V450H400Z" fill="${bp}" opacity=".9"/>`);
    cobbles(s, 'M0 372L400 372L330 450H0Z', 372, 450, { base: '#767068', stone: '#948c80', bands: 3 });
    gasLamp(s, 590, 388, 1.2); gasLamp(s, 736, 396, 1.3);
    maple(s, 462, 400, 140, '#c9632a', '#e6a43a');
    bare(s, 30, 450, 150, { c: '#3a2f2a', depth: 4 });
    people(s, [250, 280, 570, 640], 424, 1.5);
    bird(s, 380, 90, 1); bird(s, 404, 102, 0.8);
    return s.svg({ label: 'Providence: the white marble Rhode Island State House dome and colonial houses on Benefit Street, College Hill' });
  };

  /* ---------------- Federal Hill: the Pigna arch ---------------- */
  scenes.fedhill = (uid = '') => {
    const s = new Scene(uid + 'fedhill', { seed: 526 });
    s.sky(SKY.late, { stars: 14 });
    const bp = brickPat(s);
    // arch (far, centre): brick piers, stone arch, hanging pinecone
    const cx = 400;
    s.add(`<rect x="${cx - 210}" y="150" width="46" height="170" fill="#8a4a3a"/><rect x="${cx - 210}" y="150" width="46" height="170" fill="${bp}"/><rect x="${cx + 164}" y="150" width="46" height="170" fill="#8a4a3a"/><rect x="${cx + 164}" y="150" width="46" height="170" fill="${bp}"/>`);
    s.add(`<path d="M${cx - 218} 150Q${cx - 218} 54 ${cx} 54Q${cx + 218} 54 ${cx + 218} 150H${cx + 188}Q${cx + 186} 90 ${cx} 90Q${cx - 186} 90 ${cx - 188} 150Z" fill="#d2c7ae"/><path d="M${cx - 200} 148Q${cx - 198} 74 ${cx} 70Q${cx + 198} 74 ${cx + 200} 148" fill="none" stroke="#a69a82" stroke-width="3"/>`);
    s.add(`<rect x="${cx - 70}" y="62" width="140" height="20" rx="3" fill="#8a4a3a"/><path d="M${cx - 56} 72h112" stroke="#e9d9a8" stroke-width="3" stroke-dasharray="9 4"/><rect x="${cx - 222}" y="146" width="56" height="8" fill="#e6dcc4"/><rect x="${cx + 166}" y="146" width="56" height="8" fill="#e6dcc4"/>`);
    // pigna: big pinecone on a short chain
    {
      const px = cx, py = 100;
      let sc = '';
      for (let r = 0; r < 6; r++) for (let c = 0; c < 5 - (r > 3 ? r - 3 : 0); c++) {
        const w = 14, wx = px - (5 - (r > 3 ? r - 3 : 0)) * w / 2 + c * w + (r % 2) * 6 - 3, wy = py + 24 + r * 12;
        sc += `<path d="M${wx} ${wy}h${w}l-${w / 2} 11z" fill="${(r + c) % 2 ? '#6b8f4a' : '#5a7d3e'}" stroke="#3b5a2a" stroke-width="1"/>`;
      }
      s.add(`<path d="M${px} 90V${py + 14}" stroke="#4a4a52" stroke-width="3"/><circle cx="${px}" cy="${py + 14}" r="5" fill="none" stroke="#4a4a52" stroke-width="2.4"/><ellipse cx="${px}" cy="${py + 66}" rx="38" ry="52" fill="#4a6a34"/><g clip-path="url(#${uid}fedhill-pc)">${sc}</g><path d="M${px - 14} ${py + 20}q14 -14 28 0" stroke="#7a9a58" stroke-width="3" fill="none"/>`);
      s.def(`<clipPath id="${uid}fedhill-pc"><ellipse cx="${px}" cy="${py + 66}" rx="37" ry="51"/></clipPath>`);
    }
    // street ground
    s.add(`<rect x="0" y="300" width="800" height="150" fill="#3a3550"/>`);
    cobbles(s, 'M300 300L500 300L740 450H60Z', 300, 450, { base: '#4a4458', stone: '#6e667c', bands: 4 });
    // restaurants: tall facades flanking the street
    const rest = (x, w, h, wall, awn1, awn2) => {
      tenement(s, x, 372, w, h, { col: wall, bp, trim: '#d9c9a8', lit: '#ffd88a', dark: '#4a4a66' });
      s.add(`<g><rect x="${x}" y="328" width="${w}" height="44" fill="#2a2638"/><rect x="${x + 8}" y="338" width="${w / 2 - 12}" height="28" fill="#ffd88a" opacity=".92"/><rect x="${x + w / 2 + 4}" y="338" width="${w / 2 - 12}" height="28" fill="#ffd88a" opacity=".92"/><path d="M${x - 4} 318H${x + w + 4}L${x + w + 10} 336H${x - 10}Z" fill="${awn1}"/><path d="${[...Array(Math.ceil(w / 28))].map((_, i) => `M${x - 4 + i * 28 + 14} 318h14l2 18h-14z`).join('')}" fill="${awn2}"/></g>`);
    };
    rest(-30, 150, 220, '#9a4a3a', '#2f8a47', '#f4efe2');
    rest(120, 120, 190, '#b86a48', '#c8382f', '#f4efe2');
    rest(560, 120, 190, '#a4503f', '#2f8a47', '#f4efe2');
    rest(680, 150, 220, '#8f4a3e', '#c8382f', '#f4efe2');
    // string lights across the street
    s.add(`<path d="M120 296Q260 330 400 304Q540 330 680 296" stroke="#3a3040" stroke-width="1.2" fill="none"/><g fill="#ffe2a0">${[...Array(15)].map((_, i) => `<circle cx="${130 + i * 38}" cy="${300 + Math.sin(i / 2.2) * 8 + 6}" r="2.6" class="tw" style="animation-delay:-${(i % 5) * 0.7}s"/>`).join('')}</g>`);
    // tables with candles on the sidewalks
    [[150, 392], [250, 400], [590, 396], [670, 392]].forEach(([x, y]) => s.add(`<ellipse cx="${x}" cy="${y}" rx="16" ry="5" fill="#f4efe2"/><rect x="${x - 1.5}" y="${y}" width="3" height="16" fill="#3a3040"/><circle cx="${x}" cy="${y - 4}" r="9" fill="${s.rad('#ffd88a', 0.5)}"/><rect x="${x - 1}" y="${y - 6}" width="2" height="4" fill="#fff3c0"/>`));
    gasLamp(s, 230, 410, 1.25); gasLamp(s, 580, 410, 1.25);
    people(s, [380, 410, 440, 330, 480], 380, 1);
    people(s, [350, 470], 420, 1.5);
    bare(s, 40, 452, 130, { c: '#150f1f', depth: 4 });
    return s.svg({ label: 'Federal Hill, Providence: the Pigna pinecone arch over Atwells Avenue with Italian restaurants and string lights at dusk' });
  };
}
