// Stylised route map of the southern New England coast (not to scale; north-south is squashed).
// Same interface as seaMap(): returns { svg, P }. Element ids / classes the page script can rely on:
//   svg.sea-map.ne-map, .mp-pin[data-k] (bos, por, new, pvd), path#leg1 (Boston->Portland), #leg2 (Portland->Providence via I-495),
//   #leg3 (Providence->Newport), g#sm-car.mp-vehicle.car (translate(x y) scale(+-1 1) to place it), g#sm-plane (unused, hidden).
const n1 = (n) => Math.round(n * 10) / 10;
const W = 900, H = 600;
const ll = ([lon, lat]) => [n1((lon + 72.6) * 290), n1((43.95 - lat) * 190 + 34)];
const pts = (a) => a.map(ll);
const poly = (a) => `M${pts(a).map((p) => p.join(' ')).join('L')}Z`;
// smooth open path through points (Catmull-Rom -> cubic)
function smooth(a, off = [0, 0]) {
  const p = pts(a).map(([x, y]) => [x + off[0], y + off[1]]);
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] || p[i], p1 = p[i], p2 = p[i + 1], p3 = p[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${n1(c1[0])} ${n1(c1[1])} ${n1(c2[0])} ${n1(c2[1])} ${n1(p2[0])} ${n1(p2[1])}`;
  }
  return d;
}

const carGlyph = (k) => `<g transform="scale(${k})"><path d="M-14 4.2V-1.6Q-14 -3.6 -11.6 -4.1L-8 -4.8L-5.2 -9.6Q-4.2 -11.2 -2.2 -11.2H6.2Q8 -11.2 9 -9.6L11.4 -4.8L13 -4.2Q15 -3.7 15 -1.6V4.2Z" style="fill:var(--gold);stroke:#fff;stroke-width:1.3;stroke-linejoin:round"/><path d="M-4.3 -4.9L-2.6 -8.9H1.9V-4.9ZM3.7 -8.9H6L8.7 -4.9H3.7Z" style="fill:#fff;opacity:.93;stroke:none"/><circle cx="-8.6" cy="4.6" r="3.4" style="fill:#1f2328;stroke:#fff;stroke-width:1"/><circle cx="8.6" cy="4.6" r="3.4" style="fill:#1f2328;stroke:#fff;stroke-width:1"/><circle cx="-8.6" cy="4.6" r="1.1" style="fill:#fff;stroke:none"/><circle cx="8.6" cy="4.6" r="1.1" style="fill:#fff;stroke:none"/></g>`;

const TXT = {
  zh: {
    bos: ['波士顿', 'Boston', '11/4–11/7'],
    por: ['波特兰', 'Portland, ME', '11/7 缅因州'],
    new: ['纽波特', 'Newport, RI', '11/8–11/10'],
    pvd: ['普罗维登斯', 'Providence', '11/8 路过'],
    ma: '马萨诸塞州', nh: '新罕布什尔', me: '缅因州', ri: '罗德岛州', ct: '康涅狄格州', cape: '科德角', atl: '大西洋', bay: '纳拉甘西特湾',
    l1: '去程 · I-95', l2: '经 I-495,不穿波士顿', l3: '普罗维登斯 → 纽波特',
    key1: '自驾路线', key2: '小车:当天所在位置',
    note: '示意图,非严格比例(南北向已压缩)',
    label: '波士顿、缅因州波特兰、罗德岛纽波特与普罗维登斯的自驾路线示意图(非严格比例)',
  },
  en: {
    bos: ['Boston', '', 'Nov 4–7'],
    por: ['Portland, ME', '', 'Nov 7'],
    new: ['Newport, RI', '', 'Nov 8–10'],
    pvd: ['Providence', '', 'Nov 8 stop'],
    ma: 'MASSACHUSETTS', nh: 'NEW HAMPSHIRE', me: 'MAINE', ri: 'RHODE ISLAND', ct: 'CONNECTICUT', cape: 'Cape Cod', atl: 'ATLANTIC OCEAN', bay: 'Narragansett Bay',
    l1: 'I-95 north', l2: 'via I-495, skipping Boston', l3: 'Providence to Newport',
    key1: 'Driving route', key2: 'Car: where we are that day',
    note: 'Schematic map, not to scale (north-south squashed)',
    label: 'Schematic driving route map: Boston, Portland Maine, Newport and Providence Rhode Island (not to scale)',
  },
};

export function neMap({ lang = 'zh' } = {}) {
  const T = TXT[lang] || TXT.zh;
  const geo = {
    bos: [-71.06, 42.36], por: [-70.26, 43.66], new: [-71.31, 41.485], pvd: [-71.42, 41.82],
  };
  const P = {};
  Object.keys(geo).forEach((k) => (P[k] = ll(geo[k])));

  // mainland: from the NW corner round the coast, off-canvas on the north and west
  const mainland = [
    [-73.2, 44.4], [-69.2, 44.4], [-69.3, 44.0], [-69.7, 43.95], [-69.95, 43.82], [-70.05, 43.74], [-70.22, 43.7], [-70.26, 43.66], [-70.22, 43.57], [-70.34, 43.54], [-70.4, 43.49],
    [-70.52, 43.34], [-70.62, 43.15], [-70.76, 43.07], [-70.81, 42.93], [-70.82, 42.82], [-70.8, 42.7], [-70.66, 42.66], [-70.6, 42.64], [-70.76, 42.56], [-70.88, 42.51],
    [-70.93, 42.43], [-71.0, 42.4], [-71.04, 42.35], [-71.0, 42.27], [-70.9, 42.3], [-70.82, 42.26], [-70.7, 42.16], [-70.65, 41.97], [-70.52, 41.78],
    [-70.3, 41.77], [-70.0, 41.8], [-70.0, 41.93], [-70.1, 42.03], [-70.22, 42.07], [-70.22, 42.03], [-70.05, 41.99], [-69.94, 41.86], [-69.94, 41.7], [-70.0, 41.65],
    [-70.3, 41.62], [-70.5, 41.6], [-70.62, 41.55], [-70.66, 41.52], [-70.72, 41.58], [-70.66, 41.74], [-70.8, 41.73], [-70.93, 41.58], [-71.05, 41.5], [-71.12, 41.46],
    [-71.13, 41.6], [-71.2, 41.68], [-71.3, 41.76], [-71.42, 41.84], [-71.46, 41.72], [-71.42, 41.66], [-71.5, 41.57], [-71.52, 41.43], [-71.54, 41.37],
    [-71.65, 41.36], [-71.86, 41.31], [-72.2, 41.28], [-72.7, 41.2], [-73.2, 41.1],
  ];
  const aquidneck = [[-71.36, 41.46], [-71.26, 41.45], [-71.19, 41.5], [-71.18, 41.58], [-71.22, 41.65], [-71.3, 41.61], [-71.36, 41.52]];
  const conanicut = [[-71.46, 41.5], [-71.43, 41.57], [-71.46, 41.6], [-71.5, 41.54]];
  const islands = [
    [[-70.82, 41.42], [-70.6, 41.37], [-70.5, 41.4], [-70.7, 41.47]], // Martha's Vineyard
    [[-70.2, 41.26], [-69.98, 41.26], [-70.08, 41.3]], // Nantucket
    [[-71.62, 41.16], [-71.55, 41.15], [-71.58, 41.22]], // Block Island
  ];
  const border = (a) => `<path class="mp-border" d="M${pts(a).map((p) => p.join(' ')).join('L')}"/>`;

  const legs = [
    ['leg1', smooth([geo.bos, [-71.0, 42.55], [-70.87, 42.8], [-70.78, 43.08], [-70.6, 43.3], [-70.4, 43.5], geo.por])],
    ['leg2', smooth([geo.por, [-70.74, 43.27], [-70.96, 42.88], [-71.3, 42.64], [-71.55, 42.35], [-71.5, 42.08], geo.pvd])],
    ['leg3', smooth([geo.pvd, [-71.36, 41.79], [-71.28, 41.7], [-71.26, 41.62], geo.new])],
  ];
  const lab = (k, dx, dy, anchor) => {
    const t = T[k];
    return `<g class="mp-lab"><text x="${P[k][0] + dx}" y="${P[k][1] + dy}" text-anchor="${anchor}" class="mp-l">${t[0]}</text>${t[1] ? `<text x="${P[k][0] + dx}" y="${P[k][1] + dy + 14}" text-anchor="${anchor}" class="mp-s">${t[1]}</text>` : ''}<text x="${P[k][0] + dx}" y="${P[k][1] + dy + (t[1] ? 28 : 15)}" text-anchor="${anchor}" class="mp-d">${t[2]}</text></g>`;
  };
  // tiny tree glyphs for texture
  let trees = '';
  [[-72.1, 42.9], [-71.9, 43.4], [-71.6, 43.9], [-71.3, 43.2], [-70.6, 44.1], [-72.3, 42.4], [-72.0, 41.9], [-71.7, 42.7], [-71.9, 42.2], [-71.4, 42.9]].forEach((p) => {
    const [x, y] = ll(p);
    trees += `<path d="M${x} ${y - 9}l-4 8h8zM${x} ${y - 4}l-5 8h10z" opacity=".5"/>`;
  });
  const [cx, cy] = ll([-70.12, 41.8]);
  const svg = `<svg class="art sea-map ne-map" viewBox="0 0 ${W} ${H}" role="group" aria-label="${T.label}">
  <defs><pattern id="ne-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="currentColor" opacity=".1"/></pattern></defs>
  <rect class="mp-sea" width="${W}" height="${H}" rx="6"/><rect width="${W}" height="${H}" fill="url(#ne-dots)"/>
  <g class="mp-land"><path d="${poly(mainland)}"/><path d="${poly(aquidneck)}"/><path d="${poly(conanicut)}"/>${islands.map((i) => `<path d="${poly(i)}"/>`).join('')}</g>
  <g class="mp-peaks" fill="currentColor" style="color:var(--forest)">${trees}</g>
  <g fill="none">${border([[-73.1, 42.74], [-72.2, 42.73], [-71.3, 42.7], [-70.82, 42.87]])}${border([[-70.72, 43.07], [-70.98, 43.5], [-71.0, 44.4]])}${border([[-71.38, 42.02], [-71.38, 41.84]])}${border([[-73.1, 42.05], [-71.8, 42.02], [-71.38, 42.02]])}${border([[-71.78, 41.32], [-71.8, 42.02]])}</g>
  <text x="${ll([-71.9, 42.45])[0]}" y="${ll([-71.9, 42.45])[1]}" class="mp-reg" text-anchor="middle">${T.ma}</text>
  <text x="${ll([-71.8, 43.2])[0]}" y="${ll([-71.8, 43.2])[1]}" class="mp-reg" text-anchor="middle" transform="rotate(-8 ${ll([-71.8, 43.2])[0]} ${ll([-71.8, 43.2])[1]})">${T.nh}</text>
  <text x="${ll([-70.0, 44.2])[0]}" y="${ll([-70.0, 44.2])[1]}" class="mp-reg" text-anchor="middle">${T.me}</text>
  <text x="${ll([-71.62, 41.6])[0]}" y="${ll([-71.62, 41.6])[1]}" class="mp-reg" text-anchor="middle" style="font-size:12px">${T.ri}</text>
  <text x="${ll([-72.3, 41.5])[0]}" y="${ll([-72.3, 41.5])[1]}" class="mp-reg" text-anchor="middle" style="font-size:12px">${T.ct}</text>
  <text x="${ll([-69.75, 42.75])[0]}" y="${ll([-69.75, 42.75])[1]}" class="mp-reg sea" text-anchor="middle">${T.atl}</text>
  <text x="${cx + 8}" y="${cy + 26}" class="mp-s" text-anchor="start">${T.cape}</text>
  <text x="${ll([-71.05, 41.36])[0]}" y="${ll([-71.05, 41.36])[1]}" class="mp-s" text-anchor="start" style="fill:var(--blue)">${T.bay}</text>
  ${legs.map(([id, d]) => `<path id="${id}" class="mp-route drive" d="${d}"${id === 'leg2' ? ' style="stroke-dasharray:11 8"' : ''}/>`).join('')}
  <text class="mp-d" text-anchor="middle" x="${ll([-70.48, 42.9])[0]}" y="${ll([-70.48, 42.9])[1]}" transform="rotate(-62 ${ll([-70.48, 42.9])[0]} ${ll([-70.48, 42.9])[1]})">${T.l1}</text>
  <text class="mp-d" text-anchor="middle" x="${ll([-71.82, 42.28])[0]}" y="${ll([-71.82, 42.28])[1]}">${T.l2}</text>
  ${lab('bos', 18, -14, 'start')}${lab('por', 20, 4, 'start')}${lab('new', -22, 24, 'end')}${lab('pvd', -20, -20, 'end')}
  ${Object.keys(P).map((k) => `<g class="mp-pin" data-k="${k}" transform="translate(${P[k][0]} ${P[k][1]})"><circle r="9"/><circle r="3.2" class="in"/><circle r="28" style="fill:transparent;stroke:none"/></g>`).join('')}
  <g id="sm-plane" class="mp-vehicle" aria-hidden="true" style="display:none"><path d="M0 -11L3.4 -2.4L12 2.4L12 4.4L3.4 3.2L2.4 9.6L5.6 11.8L5.6 13L-5.6 13L-5.6 11.8L-2.4 9.6L-3.4 3.2L-12 4.4L-12 2.4L-3.4 -2.4Z" transform="rotate(90) scale(1.5)"/></g>
  <g id="sm-car" class="mp-vehicle car" aria-hidden="true" style="display:none">${carGlyph(1.5)}</g>
  <g transform="translate(${W - 250} ${H - 52})" class="mp-key"><path d="M0 0h34" class="mp-route drive" style="animation:none"/><text x="44" y="4">${T.key1}</text></g>
  <g transform="translate(${W - 250} ${H - 30})" class="mp-key"><g class="mp-vehicle car" transform="translate(17 -2)">${carGlyph(1)}</g><text x="44" y="4">${T.key2}</text></g>
  <g transform="translate(840 340)" aria-hidden="true"><circle r="22" fill="none" stroke="currentColor" opacity=".35"/><path d="M0 -26L6 0L0 26L-6 0Z" fill="currentColor" opacity=".55"/><text y="-30" text-anchor="middle" class="mp-s">N</text></g>
  <text x="26" y="${H - 14}" class="mp-note">${T.note}</text>
  </svg>`;
  return { svg, P };
}
