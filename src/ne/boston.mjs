// Boston scenes: skyline, Beacon Hill, North End, Fenway, Gardner Museum, Faneuil Hall harbor.
import { city, tenement, squeeze, Scene, SKY, AUT, n1, bird, person, people, bare, maple, pine, gasLamp, brickPat, clapPat, cobbles, sea, reflect, rowhouse, steeple, lobsterBoat, sailboat, mast } from './kit.mjs';

export function addBoston(scenes) {
  /* ---------------- Boston skyline across the Charles ---------------- */
  scenes.boston = (uid = '') => {
    const s = new Scene(uid + 'boston', { seed: 501 });
    s.sky(SKY.sunset, { sun: { x: 650, y: 268, r: 24, c: '#fff0c8', glow: '#ffb070' } });
    s.cloud(150, 96, 1.5, { cls: 'cl cl1', c: '#f6c3b0', o: 0.7 }).cloud(520, 70, 1.1, { cls: 'cl cl2', c: '#f3b9a8', o: 0.6 }).cloud(720, 140, 1.3, { cls: 'cl cl3', c: '#f8cdb0', o: 0.65 });
    bird(s, 420, 150, 1.2); bird(s, 448, 164, 0.9); bird(s, 90, 190, 1);
    const Y = 296;
    // distant mid-rises
    city(s, { base: Y, hmin: 14, hmax: 62, colors: ['#7d6b95', '#8a779e', '#6f5f88'], op: 0.5, wmin: 12, wmax: 28 });
    // Prudential Center tower (stepped, long spire)
    {
      const x = 318;
      s.add(`<g><rect x="${x - 29}" y="${Y - 62}" width="58" height="64" fill="#58517f"/><rect x="${x - 19}" y="${Y - 180}" width="38" height="120" fill="#4d4a78"/><rect x="${x}" y="${Y - 180}" width="19" height="120" fill="#413e68"/><rect x="${x - 15}" y="${Y - 204}" width="30" height="26" fill="#4d4a78"/><rect x="${x}" y="${Y - 204}" width="15" height="26" fill="#413e68"/><rect x="${x - 10}" y="${Y - 226}" width="20" height="24" fill="#4d4a78"/><rect x="${x}" y="${Y - 226}" width="10" height="24" fill="#413e68"/><path d="M${x - 10} ${Y - 226}L${x} ${Y - 240}L${x + 10} ${Y - 226}Z" fill="#4d4a78"/><path d="M${x} ${Y - 240}V${Y - 282}" stroke="#4d4a78" stroke-width="2.4"/><path d="M${x} ${Y - 262}h-6M${x} ${Y - 250}h8" stroke="#4d4a78" stroke-width="1.6"/></g>`);
      let w = '';
      for (let yy = Y - 176; yy < Y - 8; yy += 9) for (let xx = x - 16; xx < x + 16; xx += 6) if (s.r() < 0.3) w += `<rect x="${xx}" y="${yy}" width="2.6" height="4"/>`;
      s.add(`<g fill="#ffe19a" opacity=".85">${w}</g><circle cx="${x}" cy="${Y - 282}" r="2.2" fill="#ff5a4a" class="tw"/>`);
    }
    // John Hancock Tower (slim mirrored prism)
    {
      const x = 432;
      const g1 = s.lin(['#a9c0e0', '#e6b49a'], {});
      const g2 = s.lin(['#6f84b8', '#c7849a'], {});
      s.add(`<path d="M${x - 15} ${Y + 1}L${x - 12} ${Y - 218}L${x + 6} ${Y - 218}L${x + 6} ${Y + 1}Z" fill="${g1}"/><path d="M${x + 6} ${Y + 1}L${x + 6} ${Y - 218}L${x + 22} ${Y - 214}L${x + 19} ${Y + 1}Z" fill="${g2}"/><path d="M${x + 6} ${Y - 218}V${Y}" stroke="#fff" stroke-width="1" opacity=".5"/><path d="M${x - 12} ${Y - 218}L${x + 6} ${Y - 218}L${x + 22} ${Y - 214}" stroke="#ffe6c8" stroke-width="1.2" fill="none" opacity=".7"/>`);
      let l = '';
      for (let yy = Y - 212; yy < Y - 2; yy += 10) l += `M${x - 14} ${yy}H${x + 20}`;
      s.add(`<path d="${l}" stroke="rgba(255,255,255,.22)" stroke-width=".8"/>`);
    }
    // neighbouring towers
    s.add(`<g fill="#5f5686"><rect x="355" y="${Y - 96}" width="26" height="97"/><rect x="474" y="${Y - 120}" width="30" height="121"/><path d="M474 ${Y - 120}h30l-4 -8h-22Z"/><rect x="520" y="${Y - 82}" width="34" height="83"/></g><g fill="#ffe19a" opacity=".7">${[[360, -90], [368, -70], [362, -50], [480, -112], [490, -92], [482, -70], [528, -74], [540, -56]].map(([a, b]) => `<rect x="${a}" y="${Y + b}" width="2.6" height="4"/>`).join('')}</g>`);
    // Back Bay brownstone strip
    s.add(`<rect x="0" y="${Y - 10}" width="800" height="14" fill="#4a3e66"/>`);
    let ch = '';
    for (let i = 0; i < 30; i++) ch += `M${Math.round(i * 27 + s.rnd(0, 12))} ${Y - 9}v-9h4v9z`;
    s.add(`<path d="${ch}" fill="#4a3e66"/>`);
    // Storrow embankment trees (rust, gold, bare)
    s.forest({ y: Y + 8, x0: 0, x1: 800, n: 26, hmin: 12, hmax: 24, colors: AUT.leaf, kind: 'leafy', jitter: 3 });
    s.add(`<rect x="0" y="${Y + 8}" width="800" height="6" fill="#3a3050"/><path d="M0 ${Y + 11}H800" stroke="#e9c27a" stroke-width="1" stroke-dasharray="10 12" opacity=".5"/>`);
    // river
    sea(s, Y + 14, '#c28095', '#25305e', { glow: { x: 650, c: '#ffc27a', rx: 150, ry: 18, o: 0.55 }, n: 12 });
    reflect(s, 300, Y + 16, 36, 90, '#5d5a96', 0.4);
    reflect(s, 418, Y + 16, 36, 80, '#d6849a', 0.4);
    reflect(s, 610, Y + 16, 80, 70, '#ffd08a', 0.35);
    // Longfellow Bridge: low arches + the "salt & pepper" towers
    {
      const dy = 332;
      let ar = '', pi = '';
      for (let i = 0; i < 6; i++) {
        const a = i * 56, b = a + 56;
        ar += `M${a} ${dy + 34}Q${a + 28} ${dy - 6} ${b} ${dy + 34}`;
        pi += `M${b} ${dy + 6}V${dy + 36}`;
      }
      s.add(`<path d="M0 ${dy}H336" stroke="#3d3558" stroke-width="7"/><path d="${ar}" fill="none" stroke="#3d3558" stroke-width="5"/><path d="${pi}" stroke="#3d3558" stroke-width="7"/><path d="M0 ${dy - 6}H336" stroke="#5a5078" stroke-width="1.6"/>`);
      [112, 224].forEach((tx) => {
        s.add(`<path d="M${tx - 15} ${dy}L${tx - 11} ${dy - 40}H${tx + 11}L${tx + 15} ${dy}Z" fill="#b2aabd"/><path d="M${tx} ${dy - 40}H${tx + 11}L${tx + 15} ${dy}H${tx}Z" fill="#9990a8"/><rect x="${tx - 12}" y="${dy - 44}" width="24" height="5" fill="#8a8198"/><path d="M${tx - 11} ${dy - 44}Q${tx} ${dy - 66} ${tx + 11} ${dy - 44}Z" fill="#6c6482"/><path d="M${tx} ${dy - 61}v-8" stroke="#6c6482" stroke-width="2"/><circle cx="${tx}" cy="${dy - 54}" r="2.2" fill="#6c6482"/><path d="M${tx - 5} ${dy - 33}v14M${tx + 5} ${dy - 33}v14" stroke="#6c6482" stroke-width="3" opacity=".7"/>`);
      });
      s.add(`<g fill="#b5453a"><rect x="130" y="${dy - 14}" width="54" height="7" rx="2"/></g><g fill="#ffe19a"><rect x="135" y="${dy - 12.5}" width="4" height="2.4"/><rect x="146" y="${dy - 12.5}" width="4" height="2.4"/><rect x="157" y="${dy - 12.5}" width="4" height="2.4"/><rect x="168" y="${dy - 12.5}" width="4" height="2.4"/></g>`);
    }
    // sculling shell
    s.add(`<g class="bob" style="transform-origin:540px 392px"><path d="M500 392H586" stroke="#e9d9c0" stroke-width="3" stroke-linecap="round"/><path d="M530 392L520 380M548 392L558 382" stroke="#e9d9c0" stroke-width="1.2"/><circle cx="534" cy="386" r="2.4" fill="#2b2b3a"/><circle cx="548" cy="386" r="2.4" fill="#2b2b3a"/><path d="M533 389v3M547 389v3" stroke="#d6453d" stroke-width="3"/></g>`);
    // foreground bank with bare trees
    s.add(`<path d="M0 450V420Q150 404 330 424T620 418T800 426V450Z" fill="#1d1830"/><path d="M0 450V436Q200 424 420 438T800 436V450Z" fill="#151126"/>`);
    bare(s, 742, 446, 170, { c: '#1d1830', depth: 4 });
    bare(s, 690, 448, 110, { c: '#1d1830', depth: 4 });
    gasLamp(s, 60, 448, 1);
    return s.svg({ label: 'Boston skyline across the Charles River at dusk: Prudential and Hancock towers, Longfellow Bridge' });
  };

  /* ---------------- Beacon Hill: Acorn Street ---------------- */
  scenes.beacon = (uid = '') => {
    const s = new Scene(uid + 'beacon', { seed: 502 });
    s.sky(['#7f8fb8', '#e2a99c', '#f8d9a0'], { sun: { x: 590, y: 150, r: 20, c: '#fff1cf', glow: '#ffc080' } });
    s.cloud(160, 70, 1.4, { cls: 'cl cl1', c: '#f6cbb8', o: 0.7 }).cloud(670, 60, 1, { cls: 'cl cl2', c: '#f6cbb8', o: 0.6 });
    const Y = 300;
    // hill + State House with gold dome
    s.add(`<path d="M120 ${Y}Q300 198 420 196T720 ${Y}Z" fill="#8c7a8c"/>`);
    s.forest({ y: 232, x0: 130, x1: 700, n: 22, hmin: 18, hmax: 30, colors: ['#8d6b57', '#a07a56', '#7c5f55'], kind: 'leafy', jitter: 10 });
    const dx = 420;
    s.add(`<rect x="${dx - 98}" y="212" width="196" height="46" fill="#b0583f"/><rect x="${dx - 98}" y="212" width="196" height="4" fill="#efe6d2"/>`);
    // portico with columns
    s.add(`<path d="M${dx - 44} 212L${dx} 196L${dx + 44} 212Z" fill="#efe6d2"/><rect x="${dx - 44}" y="212" width="88" height="46" fill="#efe6d2"/>`);
    s.add(`<g fill="#d9cfb8">${[...Array(7)].map((_, i) => `<rect x="${dx - 40 + i * 12.6}" y="216" width="5" height="40"/>`).join('')}</g>`);
    s.add(`<path d="${[...Array(8)].map((_, i) => `M${dx - 92 + i * 12} 224h5v9h-5z`).join('')}" fill="#3a3a4a" opacity=".75"/>`);
    s.add(`<rect x="${dx - 22}" y="170" width="44" height="30" fill="#b0583f"/><rect x="${dx - 22}" y="170" width="44" height="3" fill="#efe6d2"/>`);
    // dome
    s.add(`<rect x="${dx - 24}" y="190" width="48" height="12" fill="#efe6d2"/>`);
    s.add(`<path d="M${dx - 26} 170Q${dx - 28} 128 ${dx} 122Q${dx + 28} 128 ${dx + 26} 170Z" fill="#e0aa34"/><path d="M${dx} 122Q${dx + 28} 128 ${dx + 26} 170H${dx}Z" fill="#c78f22"/><path d="M${dx - 14} 170Q${dx - 15} 134 ${dx - 4} 124" stroke="#f7dc84" stroke-width="3" fill="none"/>`);
    s.add(`<rect x="${dx - 5}" y="108" width="10" height="16" fill="#efe6d2"/><path d="M${dx - 6} 108Q${dx} 98 ${dx + 6} 108Z" fill="#e0aa34"/><path d="M${dx} 98V90" stroke="#e0aa34" stroke-width="2"/><circle cx="${dx}" cy="88" r="2.6" fill="#e0aa34"/>`);
    // soft haze over the distance
    s.add(`<rect x="0" y="${Y - 130}" width="800" height="130" fill="${s.lin(['#f8d9a000', '#f8d9a0'])}" opacity=".5"/>`);
    // ground
    s.add(`<rect x="0" y="${Y}" width="800" height="150" fill="#6e5f5c"/>`);
    const bp = brickPat(s);
    // far row of rowhouses (small, hazy)
    s.add(`<g transform="translate(250 ${Y}) scale(.58) translate(-250 ${-Y})">`);
    [[190, 120, 128, '#a85b45'], [312, 110, 110, '#99503d'], [424, 130, 140, '#b0624a']].forEach(([x, w, h, b], i) => rowhouse(s, x, Y, w, h, { brick: b, pat: bp, floors: 3 + (i % 2 ? 0 : 0), lit: 0.45 }));
    s.add('</g>');
    s.add(`<rect x="170" y="${Y - 80}" width="460" height="80" fill="${s.lin(['#f8d9a000', '#f8d9a0'])}" opacity=".35"/>`);
    // cobbled street (Acorn Street): trapezoid receding to a bend
    const street = `M338 ${Y}L452 ${Y}L700 450H100Z`;
    cobbles(s, street, Y, 450, { base: '#6f6760', stone: '#9b9184', bands: 6 });
    // near rowhouses left / right
    rowhouse(s, -20, 392, 146, 170, { brick: '#a4503f', pat: bp, floors: 3, lit: 0.6 });
    rowhouse(s, 124, 372, 128, 138, { brick: '#8f4531', pat: bp, floors: 3, lit: 0.5 });
    rowhouse(s, 584, 372, 120, 136, { brick: '#9a4a38', pat: bp, floors: 3, lit: 0.5 });
    rowhouse(s, 700, 392, 130, 172, { brick: '#a95a44', pat: bp, floors: 3, lit: 0.6 });
    // chimneys
    s.add(`<g fill="#7c3a2c"><rect x="22" y="206" width="12" height="26"/><rect x="170" y="218" width="11" height="22"/><rect x="620" y="222" width="11" height="20"/><rect x="760" y="204" width="12" height="28"/></g>`);
    // window boxes with mums
    // lamps and trees
    gasLamp(s, 262, 392, 1.1);
    gasLamp(s, 560, 388, 1);
    maple(s, 700, 450, 150, '#c9632a', '#e6a43a');
    bare(s, 24, 452, 120, { c: '#2c2328', depth: 4 });
    people(s, [372, 394], 330, 1.1);
    return s.svg({ label: 'Beacon Hill: brick rowhouses with black shutters and gas lamps on cobbled Acorn Street, State House gold dome behind' });
  };

  /* ---------------- North End: Old North Church + pastry box ---------------- */
  scenes.northend = (uid = '') => {
    const s = new Scene(uid + 'northend', { seed: 503 });
    s.sky(['#7a8fb8', '#e8a898', '#f9d6a0']);
    s.add(`<circle cx="190" cy="120" r="${20 * 4}" fill="${s.rad('#ffd29a', 0.45)}"/>`);
    s.cloud(120, 80, 1.3, { cls: 'cl cl1', c: '#f7cdb8', o: 0.7 }).cloud(430, 50, 1, { cls: 'cl cl2', c: '#f7cdb8', o: 0.6 });
    bird(s, 300, 120, 1.1); bird(s, 322, 132, 0.8);
    const bp = brickPat(s);
    // Old North Church: brick tower + white steeple, brick nave behind
    s.add(`<rect x="470" y="236" width="190" height="96" fill="#9a4a3a"/><rect x="470" y="236" width="190" height="96" fill="${bp}"/><path d="M462 238L565 206L668 238Z" fill="#5e6068"/>`);
    let aw = '';
    for (let i = 0; i < 5; i++) aw += `<path d="M${492 + i * 36} 322V272Q${498 + i * 36} 262 ${504 + i * 36} 272V322Z" fill="#f3eee2"/><path d="M${495 + i * 36} 320V274Q${498 + i * 36} 268 ${501 + i * 36} 274V320Z" fill="#46556a"/>`;
    s.add(aw);
    steeple(s, 565, 250, 1.12, { lower: '#9a4a3a' });
    // brick pattern on tower base
    s.add(`<rect x="${565 - 22.4}" y="${250 - 78.4}" width="44.8" height="78.4" fill="${bp}"/>`);
    // left building row (tall tenements)
    tenement(s, -20, 400, 150, 270, { col: '#a9503c', bp });
    tenement(s, 120, 400, 150, 230, { col: '#b86a48', bp });
    tenement(s, 660, 400, 170, 240, { col: '#a4503f', bp });
    // fire escape
    s.add(`<g stroke="#20262b" stroke-width="2" fill="none"><path d="M24 188H108M24 230H108M24 272H108M24 314H108M30 188L100 230L30 230L100 272L30 272L100 314L30 314L100 356"/><path d="M24 188V314M108 188V314"/></g>`);
    // Italian pennants across the street
    const flag = (x1, y1, x2, y2, sag) => {
      let g = `<path d="M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 + sag} ${x2} ${y2}" stroke="#3a2f2a" stroke-width="1.2" fill="none"/>`;
      const cols = ['#2f8a47', '#f4efe2', '#c8382f'];
      for (let i = 1; i < 14; i++) {
        const t = i / 14, x = x1 + (x2 - x1) * t, y = y1 + (y2 - y1) * t + sag * 2 * t * (1 - t);
        g += `<path d="M${n1(x - 5)} ${n1(y)}L${n1(x + 5)} ${n1(y)}L${n1(x)} ${n1(y + 12)}Z" fill="${cols[i % 3]}"/>`;
      }
      s.add(`<g class="sway-s" style="transform-origin:${(x1 + x2) / 2}px ${y1}px">${g}</g>`);
    };
    flag(130, 180, 668, 150, 38);
    flag(130, 250, 668, 230, 30);
    // street ground (narrow, cobbled) and sidewalks
    s.add(`<rect x="0" y="400" width="800" height="50" fill="#8a7e70"/>`);
    cobbles(s, 'M260 400L560 400L780 450L40 450Z', 400, 450, { base: '#6b6258', stone: '#8d8375', bands: 3 });
    // cafe awning + tables on the right
    s.add(`<g><path d="M660 320H830V338H660Z" fill="#c8382f"/>${[...Array(7)].map((_, i) => `<path d="M${660 + i * 25} 320h12.5v18h-12.5z" fill="#f4efe2"/>`).join('')}<path d="M660 338q12 10 25 0t25 0t25 0t25 0t25 0t25 0t25 0" fill="#c8382f"/></g>`);
    s.add(`<rect x="680" y="356" width="120" height="44" fill="#2a3340"/><rect x="690" y="362" width="42" height="30" fill="#ffd88a"/><rect x="744" y="362" width="42" height="30" fill="#ffd88a"/><circle cx="720" cy="418" r="14" fill="#f4efe2" stroke="#6b4a37" stroke-width="2"/><rect x="718" y="418" width="4" height="28" fill="#4a3426"/>`);
    gasLamp(s, 318, 402, 1.1);
    gasLamp(s, 642, 402, 1);
    people(s, [372, 412, 440], 420, 1.2);
    // stone ledge + pastry box
    s.add(`<path d="M0 408H300V450H0Z" fill="#a39a8c"/><path d="M0 408H300" stroke="#cfc6b6" stroke-width="5"/><path d="M0 424H300M60 408V424M180 408V424M120 424V450M240 424V450" stroke="#8a8174" stroke-width="1.4"/>`);
    // lone cannoli on wax paper
    s.add(`<path d="M170 410L250 404L262 422L180 430Z" fill="#fff8ea" opacity=".95"/><g transform="rotate(-8 214 412)"><rect x="186" y="402" width="56" height="14" rx="7" fill="#d9a15b"/><circle cx="188" cy="409" r="6.2" fill="#fff3d6"/><circle cx="240" cy="409" r="6.2" fill="#fff3d6"/><circle cx="188" cy="409" r="2" fill="#7a3a2a"/><circle cx="238" cy="409" r="1.8" fill="#4a7a3a"/><path d="M196 404h40" stroke="#f1d5a0" stroke-width="2"/></g><g fill="#fff" opacity=".7"><circle cx="212" cy="400" r="1"/><circle cx="224" cy="399" r="1"/></g>`);
    // white bakery box tied with red & white string, bow on top
    s.add(`<g><path d="M40 380L128 372L170 386L82 394Z" fill="#fffaf0"/><path d="M40 380V418L82 432V394Z" fill="#ece3cf"/><path d="M82 394L170 386V424L82 432Z" fill="#ddd3bb"/><g fill="none" stroke-width="2.2"><path id="${uid}tw" d="M84 376L126 390V428M61 387L149 379" stroke="#c8382f"/><path d="M84 376L126 390V428M61 387L149 379" stroke="#fff" stroke-dasharray="3 3"/></g><path d="M105 383c-9-9-15-1-7 3M105 383c9-9 15-1 7 3" stroke="#c8382f" stroke-width="2.2" fill="none"/><circle cx="105" cy="383" r="2.4" fill="#c8382f"/><path d="M105 385q-5 9-9 14M105 385q3 10 9 15" stroke="#c8382f" stroke-width="1.8" fill="none"/></g>`);
    return s.svg({ label: 'North End: Old North Church steeple above a narrow Italian street with pennants, a bakery box tied with string and a cannoli' });
  };

  /* ---------------- Fenway: Green Monster + the triangle sign ---------------- */
  scenes.fenway = (uid = '') => {
    const s = new Scene(uid + 'fenway', { seed: 504 });
    s.sky(['#1f2a5a', '#5d4f8e', '#d4768a', '#f6b27a'], { stars: 14 });
    s.cloud(180, 120, 1.4, { cls: 'cl cl1', c: '#f0a8a0', o: 0.5 }).cloud(560, 90, 1.1, { cls: 'cl cl2', c: '#e898a0', o: 0.45 });
    city(s, { x0: 0, x1: 800, base: 236, hmin: 20, hmax: 80, colors: ['#4a4474', '#3d3866', '#554e80'], op: 0.45, wmin: 14, wmax: 30 });
    // light towers
    [[110, 88], [392, 70], [560, 96]].forEach(([x, top]) => {
      let lamps = '';
      for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) lamps += `<circle cx="${x - 20 + c * 8 + 4}" cy="${top + 6 + r * 8}" r="2.6"/>`;
      s.add(`<circle cx="${x}" cy="${top + 12}" r="52" fill="${s.rad('#fff3c4', 0.5)}"/><path d="M${x - 2} 240V${top + 28}H${x + 2}V240Z" fill="#2b2f45"/><path d="M${x - 5} 240L${x} ${top + 28}L${x + 5} 240" stroke="#2b2f45" fill="none" stroke-width="1.4"/><rect x="${x - 24}" y="${top}" width="48" height="28" rx="2" fill="#2b2f45"/><g fill="#fffbe0" class="tw">${lamps}</g>`);
    });
    // grandstand roof + seats behind the wall
    s.add(`<path d="M0 236V190L260 176V236Z" fill="#2a2d4a"/><path d="M0 190L260 176V184L0 198Z" fill="#3d4166"/><rect x="0" y="206" width="640" height="34" fill="#2c3052"/>`);
    // Monster seats: row of dark-green seats above the wall with fans
    const seatId = s.gid('st');
    s.def(`<pattern id="${seatId}" patternUnits="userSpaceOnUse" width="9" height="10"><rect x="1" y="3" width="6.4" height="7" rx="1.6" fill="#1b4a35"/><circle cx="4.2" cy="2.6" r="2.2" fill="#d9a98a" opacity=".8"/></pattern>`);
    s.add(`<rect x="0" y="206" width="640" height="30" fill="url(#${seatId})" opacity=".9"/>`);
    // net
    const meshId = s.gid('ms');
    s.def(`<pattern id="${meshId}" patternUnits="userSpaceOnUse" width="6" height="6"><path d="M0 0L6 6M6 0L0 6" stroke="#cfd6e0" stroke-width=".5" opacity=".55"/></pattern>`);
    s.add(`<rect x="0" y="236" width="640" height="14" fill="url(#${meshId})"/>`);
    // the wall
    const ribId = s.gid('rb');
    s.def(`<pattern id="${ribId}" patternUnits="userSpaceOnUse" width="14" height="10"><rect width="7" height="10" fill="#fff" opacity=".07"/></pattern>`);
    s.add(`<rect x="0" y="250" width="640" height="72" fill="#1f5e43"/><rect x="0" y="250" width="640" height="72" fill="url(#${ribId})"/><rect x="0" y="250" width="640" height="5" fill="#154634"/><rect x="640" y="206" width="160" height="82" fill="#2c3052"/><rect x="640" y="288" width="160" height="34" fill="#1b5a40"/><rect x="640" y="288" width="160" height="4" fill="#154634"/>`);
    // scoreboard recess
    const dotId = s.gid('dt');
    s.def(`<pattern id="${dotId}" patternUnits="userSpaceOnUse" width="10" height="9"><rect x="1" y="2" width="5" height="5" fill="#f6f1de" opacity=".85"/></pattern>`);
    s.add(`<rect x="246" y="262" width="176" height="52" fill="#143d2c"/><rect x="254" y="268" width="104" height="14" fill="url(#${dotId})"/><rect x="254" y="286" width="104" height="14" fill="url(#${dotId})" opacity=".8"/><rect x="366" y="268" width="48" height="32" fill="#e8c24a" opacity=".85"/><path d="M254 304h160" stroke="#f6f1de" stroke-width="1.2" opacity=".7"/>`);
    // left foul pole
    s.add(`<rect x="38" y="76" width="6" height="246" fill="#f1c233"/><rect x="38" y="76" width="2.5" height="246" fill="#fff0a0" opacity=".6"/><rect x="26" y="150" width="30" height="4" fill="#f1c233" opacity=".0"/>`);
    // triangle sign
    {
      const x = 700, y = 60;
      s.add(`<circle cx="${x}" cy="${y + 40}" r="80" fill="${s.rad('#ff6a5a', 0.3)}"/><path d="M${x - 14} 236L${x - 14} ${y + 82}M${x + 14} 236V${y + 82}" stroke="#2b2f45" stroke-width="5"/><rect x="${x - 40}" y="${y}" width="80" height="82" rx="6" fill="#f4f0e6" stroke="#2b2f45" stroke-width="3"/><path d="M${x} ${y + 10}L${x + 32} ${y + 66}H${x - 32}Z" fill="#d6342c"/><path d="M${x} ${y + 26}L${x + 20} ${y + 62}H${x - 20}Z" fill="#2a58a8"/><path d="M${x} ${y + 40}L${x + 10} ${y + 58}H${x - 10}Z" fill="#f4f0e6"/>`);
    }
    s.add(``);
    // warning track + grass stripes
    s.add(`<rect x="0" y="322" width="800" height="14" fill="#a97f56"/><rect x="0" y="322" width="800" height="3" fill="#c79a6c"/>`);
    const bands = [336, 344, 354, 366, 380, 396, 416, 450];
    bands.slice(0, -1).forEach((yy, i) => s.add(`<rect x="0" y="${yy}" width="800" height="${bands[i + 1] - yy + 1}" fill="${i % 2 ? '#2f6a3a' : '#3a7a44'}"/>`));
    s.add(`<path d="M0 336H800" stroke="#e8e0cc" stroke-width="1.5" opacity=".5"/>`);
    // ball + bat in the foreground
    s.add(`<g transform="translate(560 400) rotate(-14)"><path d="M0 0H130" stroke="#c9985a" stroke-width="9" stroke-linecap="round"/><path d="M110 -2H150" stroke="#8a5a2c" stroke-width="5" stroke-linecap="round"/></g><circle cx="210" cy="404" r="12" fill="#f6f1e2"/><path d="M203 396Q208 404 203 412M217 396Q212 404 217 412" stroke="#c8382f" stroke-width="1.6" fill="none" stroke-dasharray="2.4 2"/>`);
    bird(s, 470, 150, 1); bird(s, 494, 162, 0.8);
    return s.svg({ label: 'Fenway Park at dusk: the Green Monster wall, scoreboard, foul pole, light towers and the triangle sign beyond' });
  };

  /* ---------------- Isabella Stewart Gardner Museum courtyard ---------------- */
  scenes.gardner = (uid = '') => {
    const s = new Scene(uid + 'gardner', { seed: 505 });
    s.add(`<rect width="800" height="450" fill="#e6c9a2"/>`);
    // glass roof with light
    s.add(`<path d="M0 0H800L712 88H88Z" fill="${s.lin(['#fff8e4', '#f3e2bd'])}"/>`);
    let lat = '';
    for (let i = 0; i <= 12; i++) lat += `M${i * 66.7} 0L${88 + i * 52} 88`;
    for (let j = 1; j < 4; j++) lat += `M${j * 22 * 0.9} ${j * 22}H${800 - j * 22 * 0.9}`;
    s.add(`<path d="${lat}" stroke="#b9a782" stroke-width="1.4" fill="none" opacity=".7"/>`);
    // side walls (perspective) + back wall
    s.add(`<path d="M0 0L88 88V362L0 450Z" fill="#c78a63"/><path d="M800 0L712 88V362L800 450Z" fill="#b97b57"/>`);
    s.add(`<rect x="88" y="88" width="624" height="274" fill="#dca97d"/>`);
    // plaster mottling
    const plId = s.gid('pl');
    s.def(`<pattern id="${plId}" patternUnits="userSpaceOnUse" width="40" height="34"><circle cx="8" cy="9" r="9" fill="#fff" opacity=".07"/><circle cx="28" cy="24" r="11" fill="#7a3d1e" opacity=".07"/></pattern>`);
    s.add(`<rect x="88" y="88" width="624" height="274" fill="url(#${plId})"/><rect x="0" y="0" width="88" height="450" fill="url(#${plId})" opacity=".0"/>`);
    // string courses + balconies
    s.add(`<rect x="88" y="184" width="624" height="6" fill="#f0dcb6"/><rect x="88" y="276" width="624" height="6" fill="#f0dcb6"/><rect x="88" y="354" width="624" height="8" fill="#e6cf9f"/>`);
    // balustrades
    const balId = s.gid('bl');
    s.def(`<pattern id="${balId}" patternUnits="userSpaceOnUse" width="9" height="14"><rect x="3" y="0" width="3" height="14" rx="1.4" fill="#f6ecd2"/></pattern>`);
    s.add(`<rect x="88" y="168" width="624" height="14" fill="url(#${balId})"/><rect x="88" y="166" width="624" height="3" fill="#f6ecd2"/><rect x="88" y="260" width="624" height="14" fill="url(#${balId})"/><rect x="88" y="258" width="624" height="3" fill="#f6ecd2"/>`);
    // top floor: pointed-arch window pairs
    let w1 = '', w2 = '', w3 = '';
    for (let i = 0; i < 6; i++) {
      const cx = 140 + i * 104;
      w1 += `M${cx - 24} 164V122Q${cx - 24} 106 ${cx - 12} 96Q${cx} 106 ${cx} 122V164ZM${cx} 164V122Q${cx} 106 ${cx + 12} 96Q${cx + 24} 106 ${cx + 24} 122V164Z`;
    }
    // middle floor: wide arches with columns
    for (let i = 0; i < 4; i++) {
      const cx = 168 + i * 154;
      w2 += `M${cx - 44} 256V218Q${cx - 44} 194 ${cx} 194Q${cx + 44} 194 ${cx + 44} 218V256Z`;
      w3 += `M${cx - 15} 256V214M${cx + 15} 256V214`;
    }
    s.add(`<path d="${w1}" fill="#4d566c" stroke="#f0e2bc" stroke-width="5" stroke-linejoin="round"/><path d="${w2}" fill="#4d566c" stroke="#f0e2bc" stroke-width="6" stroke-linejoin="round"/><path d="${w3}" stroke="#f6ecd2" stroke-width="5" stroke-linecap="round"/>`);
    // ground-floor doors and the empty gilded frame
    s.add(`<path d="M130 354V300Q130 280 158 280Q186 280 186 300V354Z M614 354V300Q614 280 642 280Q670 280 670 300V354Z" fill="#6b3f2a"/><path d="M138 354V303Q138 288 158 288Q178 288 178 303V354Z M622 354V303Q622 288 642 288Q662 288 662 303V354Z" fill="#1f2a33"/>`);
    {
      const x = 340, y = 288, fw = 76, fh = 62;
      s.add(`<rect x="${x - 8}" y="${y - 8}" width="${fw + 16}" height="${fh + 16}" rx="4" fill="#cf9f35"/><rect x="${x - 3}" y="${y - 3}" width="${fw + 6}" height="${fh + 6}" rx="2" fill="#f2d57a"/><rect x="${x}" y="${y}" width="${fw}" height="${fh}" fill="#e9cfa6"/><rect x="${x}" y="${y}" width="${fw}" height="${fh}" fill="${s.lin(['#fff2cf', '#c79a68'], { x2: 1, y2: 1 })}" opacity=".55"/><path d="M${x - 8} ${y - 8}q10 0 10 10M${x + fw + 8} ${y - 8}q-10 0 -10 10M${x - 8} ${y + fh + 8}q10 0 10 -10M${x + fw + 8} ${y + fh + 8}q-10 0 -10 -10" stroke="#8a6a1c" stroke-width="2" fill="none"/><circle cx="${x + fw / 2}" cy="${y - 8}" r="4" fill="#f2d57a" stroke="#8a6a1c" stroke-width="1.2"/><rect x="${x + fw / 2 - 8}" y="${y + fh + 12}" width="16" height="6" rx="1" fill="#f6ecd2"/>`);
    }
    // light shafts from the glass roof
    s.add(`<path d="M250 88L420 362H300L190 88Z M520 88L690 362H600L470 88Z" fill="#fff6d0" opacity=".16"/>`);
    // hanging vines from balcony
    let vn = '';
    [[130, 40], [330, 54], [470, 36], [660, 48]].forEach(([x, l]) => {
      vn += `<path d="M${x} 274q${x % 2 ? 5 : -5} ${l / 2} 0 ${l}" stroke="#44713f" stroke-width="2" fill="none"/>`;
      for (let i = 0; i < 5; i++) vn += `<circle cx="${x + (i % 2 ? 3 : -3)}" cy="${274 + i * (l / 5)}" r="3.4" fill="${i % 2 ? '#5d8a45' : '#44713f'}"/>`;
    });
    s.add(vn + `<g fill="#e8913a"><circle cx="133" cy="296" r="2.4"/><circle cx="328" cy="312" r="2.4"/><circle cx="663" cy="306" r="2.4"/></g>`);
    // mosaic floor
    s.add(`<path d="M0 450L88 362H712L800 450Z" fill="#c8b48c"/>`);
    s.add(`<ellipse cx="400" cy="408" rx="230" ry="30" fill="#e8d8b4"/><ellipse cx="400" cy="408" rx="190" ry="22" fill="none" stroke="#a44a38" stroke-width="3"/><ellipse cx="400" cy="408" rx="150" ry="16" fill="#5f7d6a" opacity=".5"/><ellipse cx="400" cy="408" rx="110" ry="11" fill="#e8d8b4"/><path d="M170 408H630M400 380V436" stroke="#b9996a" stroke-width="1.4" stroke-dasharray="3 5"/>`);
    // central statue pedestal + garden beds
    s.add(`<rect x="388" y="360" width="24" height="34" fill="#efe8d8"/><rect x="384" y="392" width="32" height="6" fill="#d9d0bc"/><path d="M394 360Q400 336 406 360Z" fill="#efe8d8"/><circle cx="400" cy="334" r="6" fill="#efe8d8"/>`);
    const bed = (x, w) => {
      s.add(`<path d="M${x} 430Q${x + w / 2} 404 ${x + w} 430Z" fill="#355f3a"/><path d="M${x + 6} 430Q${x + w * 0.3} 408 ${x + w * 0.5} 430Z" fill="#4a7a45"/>`);
      let f = '';
      for (let i = 0; i < 9; i++) f += `<circle cx="${n1(x + w * (0.15 + 0.7 * ((i * 0.37) % 1)))}" cy="${n1(418 - ((i * 7) % 12))}" r="3" fill="${['#e8913a', '#f2c14e', '#d6453d', '#e87a9a'][i % 4]}"/>`;
      s.add(f);
    };
    bed(150, 120); bed(530, 120); bed(262, 80); bed(458, 80);
    // big ferns + terracotta pots in the corners
    const fern = (x, y, k) => {
      let d = '';
      for (let i = -4; i <= 4; i++) d += `M${x} ${y}Q${x + i * 11 * k} ${y - 36 * k} ${x + i * 20 * k} ${y - (28 - Math.abs(i) * 3) * k}`;
      s.add(`<g class="sway-s"><path d="${d}" stroke="#3f6e3f" stroke-width="${3 * k}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="#6a9a52" stroke-width="${1.2 * k}" fill="none" stroke-linecap="round" transform="translate(0 -2)"/></g><path d="M${x - 14 * k} ${y}H${x + 14 * k}L${x + 10 * k} ${y + 18 * k}H${x - 10 * k}Z" fill="#b8643a"/><rect x="${x - 15 * k}" y="${y - 3 * k}" width="${30 * k}" height="${5 * k}" fill="#c9774a"/>`);
    };
    fern(50, 410, 1.5); fern(752, 412, 1.5); fern(92, 438, 1); fern(712, 440, 1);
    return s.svg({ label: 'Isabella Stewart Gardner Museum: Venetian palazzo courtyard with arched windows, garden and an empty gilded frame' });
  };

  /* ---------------- Faneuil Hall & the waterfront ---------------- */
  scenes.harbor = (uid = '') => {
    const s = new Scene(uid + 'harbor', { seed: 506 });
    s.sky(SKY.cold, { sun: { x: 690, y: 190, r: 18, c: '#fff4d0', glow: '#ffd9a0' } });
    s.cloud(130, 80, 1.3, { cls: 'cl cl1', c: '#fff', o: 0.8 }).cloud(500, 60, 1, { cls: 'cl cl2', c: '#fff', o: 0.7 });
    city(s, { x0: 300, x1: 800, base: 300, hmin: 24, hmax: 100, colors: ['#9fb2c6', '#8fa4ba', '#aebdcc'], op: 0.35, wmin: 14, wmax: 28 });
    const Y = 352, bp = brickPat(s);
    // harbour on the right: water, pier and boats
    sea(s, 300, '#8fb0c4', '#4f7792', { n: 6, caps: 4, x0: 560 });
    s.add(`<rect x="560" y="300" width="240" height="6" fill="#d9e6ee" opacity=".5"/>`);
    sailboat(s, 650, 336, 0.8, { sails: false });
    sailboat(s, 740, 330, 0.7, { sails: true });
    lobsterBoat(s, 626, 392, 0.7, {});
    // pier bollards
    s.add(`<g fill="#3a3a42">${[600, 660, 720, 780].map((x) => `<rect x="${x}" y="${Y - 8}" width="7" height="12" rx="2"/>`).join('')}</g>`);
    // Quincy Market: granite hall with a centre rotunda and low dome
    s.add(`<rect x="330" y="${Y - 70}" width="240" height="70" fill="#cfc7b6"/><rect x="330" y="${Y - 70}" width="240" height="5" fill="#e6dfce"/>`);
    let col = '';
    for (let i = 0; i < 9; i++) col += `<rect x="${340 + i * 26}" y="${Y - 62}" width="7" height="62" fill="#efe9da"/>`;
    s.add(col);
    s.add(`<rect x="334" y="${Y - 40}" width="232" height="40" fill="#3f4a56" opacity=".35"/>`);
    s.add(`<rect x="402" y="${Y - 112}" width="96" height="44" fill="#d9d1bf"/><path d="M402 ${Y - 112}Q450 ${Y - 160} 498 ${Y - 112}Z" fill="#7d9a8e"/><path d="M450 ${Y - 146}Q490 ${Y - 134} 498 ${Y - 112}H450Z" fill="#668579"/><rect x="448" y="${Y - 158}" width="4" height="14" fill="#7d9a8e"/><path d="M452 ${Y - 158}h14v6h-14z" fill="#c8382f" class="sway-s"/>`);
    let rw = '';
    for (let i = 0; i < 5; i++) rw += `<path d="M${412 + i * 18} ${Y - 70}v-26q4 -6 8 0v26z" fill="#4f5d6a"/>`;
    s.add(rw);
    // Faneuil Hall: red brick, white trim, two-stage cupola with the grasshopper
    s.add(`<rect x="30" y="${Y - 96}" width="280" height="96" fill="#a2493a"/><rect x="30" y="${Y - 96}" width="280" height="96" fill="${bp}"/><path d="M24 ${Y - 96}L70 ${Y - 124}H270L316 ${Y - 96}Z" fill="#4a4048"/><rect x="24" y="${Y - 99}" width="292" height="5" fill="#f1e9d6"/>`);
    let fw = '';
    for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) fw += `<rect x="${44 + i * 29}" y="${Y - 84 + r * 36}" width="12" height="22" fill="${(i + r) % 3 ? '#3d4a5a' : '#ffd88a'}"/><rect x="${42 + i * 29}" y="${Y - 87 + r * 36}" width="16" height="3" fill="#f1e9d6"/>`;
    s.add(fw + `<rect x="152" y="${Y - 30}" width="36" height="30" fill="#2f3945"/><path d="M152 ${Y - 30}Q170 ${Y - 44} 188 ${Y - 30}Z" fill="#f1e9d6"/>`);
    // cupola
    s.add(`<rect x="146" y="${Y - 150}" width="48" height="28" fill="#f1e9d6"/><rect x="142" y="${Y - 127}" width="56" height="5" fill="#fff"/><rect x="152" y="${Y - 176}" width="36" height="30" fill="#f6f0df"/><path d="M158 ${Y - 148}v-18q4 -8 8 0v18zM174 ${Y - 148}v-18q4 -8 8 0v18z" fill="#4f5d6a"/><path d="M148 ${Y - 176}H192L170 ${Y - 196}Z" fill="#6f9a86"/><path d="M170 ${Y - 196}V${Y - 210}" stroke="#d9a42c" stroke-width="2.6"/>`);
    // grasshopper weathervane (big enough to read)
    s.add(`<g transform="translate(170 ${Y - 212}) scale(1.25)" fill="#d9a42c" stroke="#a87d1c" stroke-width=".6"><path d="M-16 0Q-8 -9 6 -5L14 -12L16 -10L9 -2Q6 3 -2 3H-12L-18 8L-20 7Z"/><path d="M-4 3L-8 12L-4 12L0 6M4 2L8 11L11 10L9 2" fill="none" stroke="#d9a42c" stroke-width="1.6"/><path d="M14 -12Q20 -18 26 -17M14 -11Q19 -14 25 -11" fill="none" stroke="#d9a42c" stroke-width=".9"/><circle cx="12" cy="-9" r="1" fill="#2b2b2b" stroke="none"/><path d="M-14 -1L-24 -6" stroke="#d9a42c" stroke-width="1.4" fill="none"/></g>`);
    // plaza: cobbles with brick path
    cobbles(s, `M0 ${Y}H800V450H0Z`, Y, 450, { base: '#8a8176', stone: '#a79c8c', bands: 4 });
    s.add(`<path d="M0 ${Y + 52}Q400 ${Y + 36} 800 ${Y + 56}V${Y + 76}Q400 ${Y + 58} 0 ${Y + 72}Z" fill="#a8523f" opacity=".85"/>`);
    gasLamp(s, 316, Y + 8, 1.2, { glow: '#ffd88a' });
    gasLamp(s, 540, Y + 8, 1.2, { glow: '#ffd88a' });
    bare(s, 14, Y + 12, 120, { c: '#4a3b34', depth: 4 });
    maple(s, 760, Y + 20, 130, '#c9632a', '#e6a43a');
    people(s, [210, 240, 420, 470, 510, 610], Y + 26, 1.4);
    bird(s, 410, 200, 1); bird(s, 434, 214, 0.8); bird(s, 600, 150, 1);
    return s.svg({ label: 'Boston waterfront: Faneuil Hall with its grasshopper weathervane, Quincy Market and the harbor' });
  };
}
