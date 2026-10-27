// Maine and the road between: coastal highway, Portland Head Light, Portland Old Port.
import { city, Scene, SKY, AUT, n1, bird, person, people, bare, maple, pine, gasLamp, brickPat, cobbles, sea, reflect, rock, foam, car, lobsterBoat, sailboat, mast, tenement } from './kit.mjs';

const buoy = (s, x, y, r, c1, c2) =>
  `<g><path d="M${x} ${y - r}c-4 -8 6 -10 2 -16" stroke="#8a7a5a" fill="none" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c1}"/><path d="M${x - r} ${y}A${r} ${r} 0 0 0 ${x + r} ${y}Z" fill="${c2}"/><path d="M${x - r * 0.9} ${y - r * 0.4}H${x + r * 0.9}" stroke="#fff" stroke-width="${n1(r * 0.25)}" opacity=".8"/></g>`;

function trapDef(s, wire = '#cfd6d2', frame = '#8a6a3c') {
  // a lobster trap, 40 wide x 22 tall with an arched wire top, bottom centre at the origin (shared once per scene)
  const pat = s.gid('wr'), id = s.gid('tr');
  s.def(`<pattern id="${pat}" patternUnits="userSpaceOnUse" width="5" height="5"><path d="M0 0L5 5M5 0L0 5" stroke="${wire}" stroke-width=".7" opacity=".75"/></pattern><g id="${id}"><path d="M-20 0V-12Q-20 -22 0 -22Q20 -22 20 -12V0Z" fill="#2f4a40"/><path d="M-20 0V-12Q-20 -22 0 -22Q20 -22 20 -12V0Z" fill="url(#${pat})"/><path d="M-20 0V-12Q-20 -22 0 -22Q20 -22 20 -12V0" fill="none" stroke="${wire}" stroke-width="1.2"/><rect x="-22" y="-2" width="44" height="4" fill="${frame}"/><rect x="-21" y="-14" width="3" height="14" fill="${frame}"/><rect x="18" y="-14" width="3" height="14" fill="${frame}"/><path d="M-6 0V-14Q0 -18 6 -14V0" fill="#1c2a25" opacity=".7"/></g>`);
  return id;
}

export function addMaine(scenes) {
  /* ---------------- road: two cars on a coastal highway ---------------- */
  scenes.road = (uid = '') => {
    const s = new Scene(uid + 'road', { seed: 511 });
    s.sky(SKY.gold, { sun: { x: 610, y: 190, r: 22, c: '#fff4d2', glow: '#ffd9a0' } });
    s.cloud(130, 80, 1.5, { cls: 'cl cl1', c: '#fff', o: 0.7 }).cloud(430, 60, 1, { cls: 'cl cl2', c: '#fff', o: 0.6 });
    bird(s, 330, 110, 1.1); bird(s, 356, 124, 0.8); bird(s, 372, 108, 0.9);
    // sea + islands on the left
    sea(s, 236, '#9bb5c4', '#5d7f95', { x1: 520, n: 5, caps: 3 });
    s.add(`<path d="M300 238Q330 222 366 238Z M420 238Q444 228 470 238Z" fill="#6b7c7a"/><path d="M0 250H0" />`);
    // rolling hills of rust and gold
    s.add(`<path d="M0 262Q120 220 260 252T520 240T800 236V340H0Z" fill="#a98a56"/>`);
    s.forest({ y: 270, x0: 0, x1: 800, n: 28, hmin: 24, hmax: 40, colors: [...AUT.leaf, '#7a8a52'], kind: 'leafy', jitter: 8 });
    s.forest({ y: 282, x0: 0, x1: 800, n: 16, hmin: 26, hmax: 44, colors: AUT.pine, kind: 'pine', jitter: 6 });
    // white clapboard church + red barn on the rise
    s.add(`<g><rect x="640" y="246" width="40" height="30" fill="#f3eee2"/><path d="M636 246L660 230L684 246Z" fill="#5a4a44"/><rect x="654" y="206" width="12" height="26" fill="#f3eee2"/><path d="M652 207L660 188L668 207Z" fill="#f3eee2"/><rect x="684" y="262" width="34" height="22" fill="#a2402f"/><path d="M680 262L701 248L722 262Z" fill="#6a2a22"/><rect x="696" y="268" width="10" height="16" fill="#f3eee2" opacity=".85"/></g>`);
    s.forest({ y: 296, x0: 0, x1: 800, n: 22, hmin: 30, hmax: 56, colors: AUT.leaf, kind: 'leafy', jitter: 8 });
    // stone wall
    let st = '';
    for (let i = 0; i < 44; i++) st += `<rect x="${n1(i * 19 + (i % 3) * 2 - 6)}" y="${n1(312 + (i % 2) * 5)}" width="${n1(16 + (i % 4) * 2)}" height="${n1(9 + (i % 3) * 2)}" rx="3" fill="${['#8c8378', '#a49a8c', '#766e64'][i % 3]}"/>`;
    s.add(`<rect x="0" y="322" width="800" height="14" fill="#6b645a"/>${st}`);
    // road with centre line and guardrail
    s.add(`<rect x="0" y="334" width="800" height="12" fill="#a8905a"/><rect x="0" y="344" width="800" height="76" fill="#4b4f57"/><rect x="0" y="344" width="800" height="3" fill="#e8dfc8" opacity=".85"/><rect x="0" y="416" width="800" height="3" fill="#e8dfc8" opacity=".85"/><path d="M0 380H800" stroke="#e8b83a" stroke-width="3" stroke-dasharray="26 18"/><rect x="0" y="419" width="800" height="31" fill="#8a7a46"/>`);
    // telephone poles + wires
    s.add(`<g stroke="#3a2f2a" stroke-width="4">${[90, 380, 690].map((x) => `<path d="M${x} 342V202M${x - 16} 212H${x + 16}"/>`).join('')}</g><path d="M90 212Q235 232 380 212T690 212M90 220Q235 240 380 220T690 220" stroke="#3a2f2a" stroke-width="1" fill="none"/>`);
    // road sign (no text): brown scenic route arrow
    s.add(`<g transform="translate(750 332)"><rect x="-1.5" y="-60" width="3" height="62" fill="#59606a"/><rect x="-24" y="-96" width="48" height="36" rx="3" fill="#3e6a4d" stroke="#f2efe4" stroke-width="2"/><path d="M-14 -78H12M4 -86L13 -78L4 -70" stroke="#f2efe4" stroke-width="3" fill="none" stroke-linecap="round"/></g>`);
    // two cars: blue following, red leading
    car(s, 292, 408, 1.7, '#2f64b0', 1, { lights: true });
    car(s, 560, 392, 1.5, '#cc3b2e', 1, { lights: true });
    // foreground: grass, bare tree, maple, fallen leaves
    s.add(`<path d="M0 450V430Q200 420 420 436T800 428V450Z" fill="#6f7a3e"/>`);
    let lv = '';
    for (let i = 0; i < 40; i++) lv += `<ellipse cx="${n1(s.rnd(0, 800))}" cy="${n1(s.rnd(430, 448))}" rx="3.2" ry="1.8" fill="${s.pick(AUT.leaf)}"/>`;
    s.add(lv);
    bare(s, 36, 452, 170, { c: '#3a2f2a', depth: 4 });
    maple(s, 746, 454, 120, '#c9632a', '#e6a43a');
    return s.svg({ label: 'A red car and a blue car on a New England coastal highway in late autumn' });
  };

  /* ---------------- Portland Head Light ---------------- */
  scenes.headlight = (uid = '') => {
    const s = new Scene(uid + 'headlight', { seed: 512 });
    s.sky(SKY.sunset, { sun: { x: 150, y: 270, r: 26, c: '#fff0c8', glow: '#ffb070' } });
    s.cloud(110, 100, 1.5, { cls: 'cl cl1', c: '#f7b9a0', o: 0.75 }).cloud(420, 70, 1.2, { cls: 'cl cl2', c: '#f2a49a', o: 0.65 }).cloud(690, 120, 1, { cls: 'cl cl3', c: '#f7b9a0', o: 0.6 });
    bird(s, 300, 180, 1.1); bird(s, 326, 192, 0.8);
    const H = 304;
    sea(s, H, '#d8836f', '#26386a', { glow: { x: 150, c: '#ffcf8a', rx: 160, ry: 18, o: 0.7 }, n: 14, caps: 6 });
    reflect(s, 118, H + 2, 64, 100, '#ffd48a', 0.3);
    // Ram Island Ledge light on the horizon
    s.add(`<g fill="#5a4a6e"><rect x="310" y="${H - 20}" width="5" height="20"/><rect x="309" y="${H - 24}" width="7" height="5"/><path d="M304 ${H}H321V${H - 3}H304Z"/></g>`);
    s.add(`<path d="M0 ${H}Q150 ${H - 2} 300 ${H}" stroke="#ffd48a" stroke-width="1" opacity=".5"/>`);
    // headland cliff
    rock(s, [[330, 420], [380, 360], [430, 322], [490, 300], [560, 288], [660, 282], [760, 276], [830, 270]], 460, { fill: '#5c5258', hi: '#8a7a78', lo: 'rgba(30,20,40,.35)' });
    s.add(`<path d="M430 322Q560 296 830 270V300Q620 312 470 334Z" fill="#6f7a3e"/><path d="M400 350Q520 332 640 346T830 330M420 392Q560 372 700 392T830 380M470 430Q620 410 830 424" stroke="rgba(20,16,30,.28)" stroke-width="2" fill="none"/><path d="M520 340L560 450H400Z M700 300L760 450H620Z" fill="rgba(20,14,34,.18)"/>`);
    // grass / rust brush on the headland
    s.add(`<path d="M440 316Q560 292 830 266V282Q620 296 470 326Z" fill="#8a8a46"/>`);
    // keeper's house: white clapboard, red roof
    const hx = 470, hy = 292;
    s.add(`<rect x="${hx}" y="${hy - 42}" width="86" height="42" fill="#f3eee2"/><rect x="${hx}" y="${hy - 42}" width="86" height="42" fill="rgba(60,50,40,.06)"/>`);
    s.add(`<path d="M${hx - 8} ${hy - 40}L${hx + 43} ${hy - 78}L${hx + 94} ${hy - 40}Z" fill="#b8392e"/><path d="M${hx + 43} ${hy - 78}L${hx + 94} ${hy - 40}H${hx + 43}Z" fill="#9a2f27"/><rect x="${hx + 62}" y="${hy - 94}" width="9" height="22" fill="#9a4a3a"/><rect x="${hx + 60}" y="${hy - 96}" width="13" height="3" fill="#6f3a2e"/>`);
    s.add(`<g fill="#ffd88a">${[12, 38, 62].map((dx) => `<rect x="${hx + dx}" y="${hy - 30}" width="9" height="13"/>`).join('')}<rect x="${hx + 38}" y="${hy - 62}" width="10" height="11"/></g><path d="M${hx + 12} ${hy - 30}h9M${hx + 38} ${hy - 30}h9M${hx + 62} ${hy - 30}h9" stroke="#3a4a5a" stroke-width="1"/><rect x="${hx + 36}" y="${hy - 14}" width="14" height="14" fill="#7a2e2a"/>`);
    // tower
    const tx = 584;
    s.add(`<rect x="${tx - 24}" y="${hy - 16}" width="28" height="16" fill="#f3eee2"/><path d="M${tx - 20} ${hy}L${tx - 13} ${hy - 138}H${tx + 13}L${tx + 20} ${hy}Z" fill="#f6f1e4"/><path d="M${tx} ${hy - 138}H${tx + 13}L${tx + 20} ${hy}H${tx}Z" fill="#d9d2c2"/><path d="M${tx - 7} ${hy - 20}V${hy - 4}M${tx + 7} ${hy - 20}V${hy - 4}" stroke="#3a4a5a" stroke-width="3" opacity="0"/><rect x="${tx - 3}" y="${hy - 44}" width="6" height="9" fill="#3a4a5a"/><rect x="${tx - 3}" y="${hy - 84}" width="6" height="9" fill="#3a4a5a"/><rect x="${tx - 3}" y="${hy - 118}" width="6" height="8" fill="#3a4a5a"/>`);
    s.add(`<rect x="${tx - 18}" y="${hy - 144}" width="36" height="7" fill="#2b2f3a"/><path d="M${tx - 14} ${hy - 144}V${hy - 168}H${tx + 14}V${hy - 144}Z" fill="#ffe7a0"/><path d="M${tx - 14} ${hy - 168}V${hy - 144}M${tx - 5} ${hy - 168}V${hy - 144}M${tx + 5} ${hy - 168}V${hy - 144}M${tx + 14} ${hy - 168}V${hy - 144}" stroke="#2b2f3a" stroke-width="2"/><path d="M${tx - 18} ${hy - 168}H${tx + 18}L${tx} ${hy - 188}Z" fill="#2b2f3a"/><circle cx="${tx}" cy="${hy - 190}" r="3" fill="#2b2f3a"/><path d="M${tx - 21} ${hy - 140}V${hy - 150}M${tx + 21} ${hy - 140}V${hy - 150}M${tx - 21} ${hy - 150}H${tx + 21}" stroke="#2b2f3a" stroke-width="1.6" fill="none"/>`);
    // beam of light
    s.add(`<g class="beam"><path d="M${tx - 10} ${hy - 156}L${tx - 400} ${hy - 200}V${hy - 120}Z" fill="${s.lin(['#fff2b800', '#fff2b8b0'], { x2: 1, y2: 0 })}"/><path d="M${tx + 10} ${hy - 156}L${tx + 230} ${hy - 188}V${hy - 132}Z" fill="${s.lin(['#fff2b8b0', '#fff2b800'], { x2: 1, y2: 0 })}"/><circle cx="${tx}" cy="${hy - 156}" r="40" fill="${s.rad('#fff0b0', 0.6)}"/></g>`);
    // white picket fence + spruces
    s.add(`<path d="M${hx - 10} ${hy + 4}H${tx + 40}" stroke="#f3eee2" stroke-width="2"/><path d="${[...Array(18)].map((_, i) => `M${hx - 10 + i * 8} ${hy + 4}v-9`).join('')}" stroke="#f3eee2" stroke-width="2"/>`);
    [[690, 282, 40], [716, 280, 52], [742, 276, 44], [776, 272, 56]].forEach(([x, y, h]) => pine(s, x, y, h, '#1f3d35'));
    // foreground rocks with foam
    rock(s, [[-20, 450], [0, 396], [60, 380], [130, 392], [200, 410], [270, 420], [330, 450]], 470, { fill: '#2f2a36', hi: '#5a4f60', lo: 'rgba(0,0,10,.4)' });
    rock(s, [[300, 450], [380, 428], [450, 440], [520, 450]], 470, { fill: '#3a3340', hi: '#625568' });
    foam(s, 270, 424, 100, 6); foam(s, 320, 450, 200, 8); foam(s, 392, 436, 90, 4);
    bird(s, 520, 232, 0.9);
    return s.svg({ label: 'Portland Head Light at sunset: white tower, keeper\'s house with a red roof, rocky cliffs and sea' });
  };

  /* ---------------- Portland Old Port ---------------- */
  scenes.oldport = (uid = '') => {
    const s = new Scene(uid + 'oldport', { seed: 513 });
    s.sky(SKY.grey, { sun: { x: 590, y: 140, r: 18, c: '#fff4d2', glow: '#ffe0b0' } });
    s.cloud(150, 70, 1.5, { cls: 'cl cl1', c: '#fff', o: 0.7 }).cloud(520, 50, 1.1, { cls: 'cl cl2', c: '#fff', o: 0.55 });
    const bp = brickPat(s);
    const Y = 338;
    // harbour + far shore
    sea(s, 262, '#9bb0bc', '#4f6e84', { x0: 380, n: 5, caps: 3 });
    s.add(`<path d="M380 262Q470 240 560 256T800 250V262H380Z" fill="#6e7d74"/>`);
    // warehouses
    const wh = (x, w, h, col) => {
      tenement(s, x, Y, w, h, { col, bp, trim: '#d9c9a8', lit: '#ffd88a', dark: '#3b4a5c' });
    };
    wh(-10, 118, 218, '#a9503c'); wh(108, 108, 188, '#b86a48'); wh(216, 120, 204, '#9a4a3a'); wh(336, 100, 168, '#a85b45');
    // cornices, shop fronts with awnings, hanging buoys
    s.add(`<g><rect x="-10" y="${Y - 34}" width="118" height="34" fill="#2f3945"/><rect x="108" y="${Y - 34}" width="108" height="34" fill="#3a4a3d"/><rect x="216" y="${Y - 34}" width="120" height="34" fill="#2f3945"/><rect x="336" y="${Y - 34}" width="100" height="34" fill="#4a3a30"/></g>`);
    s.add(`<g><path d="M10 ${Y - 36}H100L108 ${Y - 28}H2Z" fill="#c8382f"/><path d="M226 ${Y - 36}H326L334 ${Y - 28}H218Z" fill="#3e6a8a"/><rect x="24" y="${Y - 24}" width="26" height="24" fill="#ffd88a" opacity=".9"/><rect x="236" y="${Y - 24}" width="30" height="24" fill="#ffd88a" opacity=".9"/><rect x="132" y="${Y - 24}" width="28" height="24" fill="#2a2d3a"/></g>`);
    s.add(`<path d="M120 ${Y - 120}H210" stroke="#3a2f2a" stroke-width="2"/>${[[128, '#d6453d', '#f4efe2'], [146, '#f2c14e', '#2a58a8'], [164, '#2a8a6a', '#f4efe2'], [182, '#d6453d', '#2a58a8'], [200, '#f4efe2', '#d6453d']].map(([x, a, b]) => buoy(s, x, Y - 108, 7, a, b)).join('')}`);
    // wharf deck + pilings
    s.add(`<rect x="430" y="${Y - 4}" width="400" height="14" fill="#6a5640"/><rect x="430" y="${Y - 4}" width="400" height="4" fill="#8a7358"/>`);
    s.add(`<g fill="#3d3228">${[450, 520, 590, 660, 730, 790].map((x) => `<rect x="${x}" y="${Y + 8}" width="8" height="40"/>`).join('')}</g>`);
    s.add(`<rect x="0" y="${Y}" width="440" height="112" fill="#7d7468"/>`);
    cobbles(s, `M0 ${Y}H440L520 450H0Z`, Y, 450, { base: '#766c60', stone: '#968b7c', bands: 4 });
    // water under the wharf
    s.add(`<rect x="430" y="${Y + 10}" width="370" height="${450 - Y - 10}" fill="${s.lin(['#46657a', '#27394f'])}"/>`);
    reflect(s, 560, Y + 20, 180, 30, '#c8d4dc', 0.18);
    // lobster boats
    lobsterBoat(s, 548, Y + 26, 1.15, { hull: '#f1ede2', stripe: '#c8382f', dir: -1 });
    lobsterBoat(s, 712, Y + 40, 1.3, { hull: '#2f6aa5', stripe: '#f2c14e', cabin: '#f1ede2' });
    // traps, stacked
    const trId = trapDef(s);
    let T = '';
    [[500, 0], [544, 0], [522, -22], [740, 0], [696, 0], [718, -22], [762, -22]].forEach(([x, dy]) => (T += `<use href="#${trId}" transform="translate(${x} ${Y - 4 + dy}) scale(1.05)"/>`));
    s.add(T);
    s.add(`<g>${[[470, '#d6453d', '#f4efe2'], [482, '#f2c14e', '#2a58a8'], [800 - 12, '#2a8a6a', '#f4efe2']].map(([x, a, b]) => buoy(s, x, Y - 8, 7, a, b)).join('')}</g>`);
    // lamps, tree, people
    gasLamp(s, 400, Y + 14, 1.2, { glow: '#ffd88a' });
    gasLamp(s, 600, Y - 2, 0.9, { glow: '#ffd88a' });
    maple(s, 26, 452, 130, '#c9632a', '#e6a43a');
    people(s, [200, 236, 312, 330], Y + 44, 1.5);
    bird(s, 640, 160, 1); bird(s, 664, 172, 0.8); bird(s, 700, 130, 0.9);
    // gull on a piling
    s.add(`<g transform="translate(590 ${Y - 12})"><ellipse cx="0" cy="0" rx="7" ry="4" fill="#f4f2ee"/><circle cx="6" cy="-4" r="3" fill="#f4f2ee"/><path d="M9 -4l5 1l-5 1z" fill="#e8b83a"/><path d="M-6 -1l-9 3" stroke="#6d7580" stroke-width="2.4"/></g>`);
    return s.svg({ label: 'Portland Old Port: brick warehouses, cobblestones, a wharf with lobster boats, stacked traps and buoys' });
  };
}
