// Stylised LA-basin trip map (not to scale). Same interface as neMap(): returns { svg, P }.
// Element ids the page script relies on:
//   svg.sea-map.la-map, .mp-pin[data-k] (lax, dsn, usc, hw, bh, getty), paths #leg1 (LAX→Disney), #leg2 (Disney→USC),
//   #leg3 (USC→Hollywood), #leg4 (Hollywood→Beverly Hills), #leg5 (Beverly Hills→Getty), #leg6 (Getty→USC),
//   #leg7 (USC→LAX), #fly1 (air → LAX), g#sm-car.mp-vehicle.car, g#sm-plane.mp-vehicle.plane (nose points up).
const n1 = (n) => Math.round(n * 10) / 10;
const W = 900, H = 560;

const GEO = {
  lax: [173, 360],   // LAX
  dsn: [555, 522],   // Disneyland / Buena Park hotel
  usc: [269, 262],   // USC Hotel
  hw: [232, 144],    // Hollywood (sign + Walk of Fame)
  bh: [179, 204],    // Beverly Hills
  getty: [122, 190], // Getty Center
};
const P = GEO;

function smooth(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    d += `C${n1(p1[0] + (p2[0] - p0[0]) / 6)} ${n1(p1[1] + (p2[1] - p0[1]) / 6)} ${n1(p2[0] - (p3[0] - p1[0]) / 6)} ${n1(p2[1] - (p3[1] - p1[1]) / 6)} ${n1(p2[0])} ${n1(p2[1])}`;
  }
  return d;
}

const carGlyph = (k) => `<g transform="scale(${k})"><path d="M-14 4.2V-1.6Q-14 -3.6 -11.6 -4.1L-8 -4.8L-5.2 -9.6Q-4.2 -11.2 -2.2 -11.2H6.2Q8 -11.2 9 -9.6L11.4 -4.8L13 -4.2Q15 -3.7 15 -1.6V4.2Z" style="fill:var(--gold);stroke:#fff;stroke-width:1.3;stroke-linejoin:round"/><path d="M-4.3 -4.9L-2.6 -8.9H1.9V-4.9ZM3.7 -8.9H6L8.7 -4.9H3.7Z" style="fill:#fff;opacity:.93;stroke:none"/><circle cx="-8.6" cy="4.6" r="3.4" style="fill:#1f2328;stroke:#fff;stroke-width:1"/><circle cx="8.6" cy="4.6" r="3.4" style="fill:#1f2328;stroke:#fff;stroke-width:1"/><circle cx="-8.6" cy="4.6" r="1.1" style="fill:#fff;stroke:none"/><circle cx="8.6" cy="4.6" r="1.1" style="fill:#fff;stroke:none"/></g>`;
// nose points up; the page script rotates it by the tangent angle
const planeGlyph = `<path d="M0 -13L3.6 -3L13 2.6L13 5L3.6 3.6L2.6 10L6 12.4L6 13.8L-6 13.8L-6 12.4L-2.6 10L-3.6 3.6L-13 5L-13 2.6L-3.6 -3Z"/>`;

const T = {
  lax: ['洛杉矶机场', 'LAX', '2/9 到 · 2/12 走'],
  dsn: ['迪士尼 · 布埃纳帕克', 'Disneyland / Buena Park', '2/9–2/11 住 2 晚'],
  usc: ['USC 酒店', 'USC Hotel', '2/11 住 · 2/12 出发'],
  hw: ['好莱坞', 'Hollywood', '2/11'],
  bh: ['比弗利山庄', 'Beverly Hills', '2/11'],
  getty: ['Getty Center', '', '2/11 傍晚'],
  pac: '太平洋', sm: '圣莫尼卡山', sg: '圣盖博山', la: '洛杉矶', oc: '奥兰治县',
  fly: 'YEG → SEA → LAX',
  key1: '自驾路线', key2: '小车:当天所在位置', key3: '航班',
  note: '示意图,非严格比例',
  label: '洛杉矶地区行程示意图:机场、迪士尼、好莱坞、比弗利山庄、Getty 中心与 USC(非严格比例)',
};

export function laMap() {
  const land = `M0 0H${W}V${H}H260L180 400L150 365L100 275L0 235Z`;
  const seaP = `M0 235L100 275L150 365L180 400L260 ${H}H0Z`;
  const legs = [
    ['leg1', smooth([GEO.lax, [300, 420], [440, 478], GEO.dsn])],
    ['leg2', smooth([GEO.dsn, [478, 420], [360, 322], GEO.usc])],
    ['leg3', smooth([GEO.usc, [252, 206], GEO.hw])],
    ['leg4', smooth([GEO.hw, [198, 172], GEO.bh])],
    ['leg5', smooth([GEO.bh, [148, 196], GEO.getty])],
    ['leg6', smooth([GEO.getty, [182, 240], GEO.usc])],
    ['leg7', smooth([GEO.usc, [212, 318], GEO.lax])],
    ['fly1', smooth([[430, -14], [300, 120], [224, 238], GEO.lax]), 'fly'],
  ];
  const lab = (k, dx, dy, anchor) => {
    const t = T[k];
    return `<g class="mp-lab"><text x="${P[k][0] + dx}" y="${P[k][1] + dy}" text-anchor="${anchor}" class="mp-l">${t[0]}</text>${t[1] ? `<text x="${P[k][0] + dx}" y="${P[k][1] + dy + 14}" text-anchor="${anchor}" class="mp-s">${t[1]}</text>` : ''}<text x="${P[k][0] + dx}" y="${P[k][1] + dy + (t[1] ? 28 : 15)}" text-anchor="${anchor}" class="mp-d">${t[2]}</text></g>`;
  };
  const svg = `<svg class="art sea-map la-map" viewBox="0 0 ${W} ${H}" role="group" aria-label="${T.label}">
  <defs><pattern id="la-dots" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="1.5" cy="1.5" r="1" fill="currentColor" opacity=".1"/></pattern></defs>
  <rect class="mp-sea" width="${W}" height="${H}" rx="6"/><rect width="${W}" height="${H}" fill="url(#la-dots)"/>
  <path class="mp-land" d="${land}" style="fill:color-mix(in srgb, var(--forest) 9%, var(--paper-2));stroke:var(--rule);stroke-width:1.2"/>
  <path d="${seaP}" style="fill:color-mix(in srgb, var(--blue) 20%, var(--paper))"/>
  <g class="mp-peaks" fill="currentColor" style="color:var(--forest)"><path d="M70 168L110 118L150 168ZM128 168L172 106L216 168ZM200 168L248 100L296 168ZM290 168L330 126L370 168ZM580 96L640 34L700 96ZM680 96L740 26L800 96ZM770 96L826 40L882 96Z" opacity=".5"/></g>
  <text x="240" y="86" class="mp-s" text-anchor="middle">${T.sm}</text>
  <text x="730" y="18" class="mp-s" text-anchor="middle">${T.sg}</text>
  <text x="406" y="196" class="mp-reg" text-anchor="middle">${T.la}</text>
  <text x="664" y="430" class="mp-reg" text-anchor="middle">${T.oc}</text>
  <text x="52" y="470" class="mp-reg sea" text-anchor="middle" transform="rotate(-76 52 470)">${T.pac}</text>
  <g fill="none">${legs.map(([id, d, cls]) => `<path id="${id}" class="mp-route ${cls || 'drive'}" d="${d}"/>`).join('')}</g>
  <text class="mp-d" text-anchor="middle" x="330" y="128" transform="rotate(-52 330 128)">${T.fly}</text>
  ${lab('lax', 18, 2, 'start')}${lab('dsn', 20, 4, 'start')}${lab('usc', 16, 34, 'start')}${lab('hw', 16, -18, 'start')}${lab('bh', -16, 34, 'end')}${lab('getty', 0, -16, 'middle')}
  ${Object.keys(P).map((k) => `<g class="mp-pin" data-k="${k}" transform="translate(${P[k][0]} ${P[k][1]})"><circle r="9"/><circle r="3.2" class="in"/><circle r="28" style="fill:transparent;stroke:none"/></g>`).join('')}
  <g id="sm-plane" class="mp-vehicle plane" aria-hidden="true" style="display:none">${planeGlyph}</g>
  <g id="sm-car" class="mp-vehicle car" aria-hidden="true" style="display:none">${carGlyph(1.5)}</g>
  <g transform="translate(${W - 236} 296)" class="mp-key"><path d="M0 0h34" class="mp-route fly" style="animation:none"/><text x="44" y="4">${T.key3}</text></g>
  <g transform="translate(${W - 236} 318)" class="mp-key"><path d="M0 0h34" class="mp-route drive" style="animation:none"/><text x="44" y="4">${T.key1}</text></g>
  <g transform="translate(${W - 236} 340)" class="mp-key"><g class="mp-vehicle car" transform="translate(17 -2)">${carGlyph(1)}</g><text x="44" y="4">${T.key2}</text></g>
  <text x="26" y="${H - 14}" class="mp-note">${T.note}</text>
  </svg>`;
  return { svg, P };
}
