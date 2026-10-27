// Build the LA trip guide (single edition):
//   node src/la/build.mjs        writes la.html
// Same look and widgets as the New England page (src/ne/build.mjs); shared CSS / JS / icons / art are imported, not copied.
// Card covers: if images/la/art/<key>.jpg|png|webp exists (hand-drawn by the external illustrator), it is inlined base64;
// otherwise the procedural placeholder from src/la/scenes.mjs is used and the key is listed at the end of the build.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as S from './scenes.mjs';
import * as F from './food-icons.mjs';
import { SHARED_DEFS } from '../art.mjs';
import * as C from './content.mjs';
import { PHOTOS } from './photos.mjs';
import { cssCompat } from '../sea/compat.mjs';
import { ico } from '../icons.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const imgDir = path.join(root, '..', 'images', 'la');
const artDir = path.join(imgDir, 'art');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const scenes = S.scenes || {};
const food = F.food || (() => '');

/* Chinese typography: ASCII punctuation in running text → full-width (keep 1,000 and 16:00; skip <pre>).
   Marks are converted when Chinese text is near (12 characters, looking across inline tags); ( ) are converted as a PAIR. */
const FW = { ',': '，', ';': '；', ':': '：', '?': '？', '!': '！', '(': '（', ')': '）' };
const CJK = /[一-鿿　-〿＀-￯]/;
const near = (str, i, from, to) => CJK.test(str.slice(Math.max(0, i - from), i + to));
function fwText(t) {
  t = t.replace(/&(#?\w+);/g, '$1');
  t = t.replace(/\(([^()]*)\)/g, (m, inner, i, str) => (CJK.test(inner) || near(str, i, 12, 0) || near(str, i + m.length, 0, 13) ? `（${inner}）` : m));
  t = t.replace(/[,;:?!]/g, (c, i, str) => {
    if ((c === ',' || c === ':') && /\d/.test(str[i - 1] || '') && /\d/.test(str[i + 1] || '')) return c;
    if (c === ',' && /[A-Za-z0-9)]\s*$/.test(str.slice(Math.max(0, i - 3), i)) && /^\s*[A-Za-z(]/.test(str.slice(i + 1, i + 4))) return c; // "Boston, MA" (English)
    return near(str, i, 12, 13) ? FW[c] : c;
  });
  t = t.replace(/[()]/g, (c, i, str) => (near(str, i, 12, 13) ? FW[c] : c));
  return t.replace(/(#?\w+)/g, '&$1;');
}
// text nodes are normalised together with the tags replaced by a neutral placeholder, so "<b>同一天</b>:Epsom" counts as Chinese next to the colon
const fwHtml = (h) => {
  const parts = h.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<pre[\s\S]*?<\/pre>|<[^>]*>)/);
  const tags = [];
  const joined = parts.map((p, i) => (i % 2 ? (tags.push(p), '') : p)).join('');
  let k = 0;
  return fwText(joined).replace(//g, () => tags[k++]);
};
// US phone numbers (401-849-3600) become tel: links (iOS auto-detection is switched off on purpose)
const linkify = (h) => h.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<pre[\s\S]*?<\/pre>|<a [\s\S]*?<\/a>|<[^>]*>)/).map((p, i) => (i % 2 ? p : p
  .replace(/(?<![\d-])\d{3}-\d{3}-\d{4}(?![\d-])/g, (m) => `<a href="tel:+1${m.replace(/-/g, '')}">${m}</a>`))).join('');
const fwJs = (j) => j.replace(/'([^'\\\n]*[一-鿿][^'\\\n]*)'/g, (m, a) => `'${fwText(a)}'`);
// The shared app.js carries widgets of the other pages (the wildlife game, the Vancouver route map, seasons, lake colours,
// the gastown steam clock). They do nothing here, so they are cut out of this page's copy; clocks, tip / currency and the quiz stay in.
function trimApp(src) {
  for (const name of ['wildlife game', 'route map', 'seasons', 'lake colour widget', 'gastown clock \\+ bridge']) {
    const re = new RegExp(`  /\\* =+ ${name} =+ \\*/[\\s\\S]*?(?=  /\\* =+ )`);
    if (!re.test(src)) throw new Error('app.js block not found: ' + name);
    src = src.replace(re, '');
  }
  const rules = "    [/C\\$\\s?([\\d.,]+)/g, '$1加元'],\n    [/US\\$\\s?([\\d.,]+)/g, '$1美元'],\n    [/S\\$\\s?([\\d.,]+)/g, '$1新元'],\n    [/RM\\s?([\\d.,]+)/g, '$1令吉'],\n    [/IDR\\s?([\\d.,]+)/g, '$1印尼盾'],\n    [/UTC\\+8/g, '东八区'],\n";
  if (!src.includes(rules)) throw new Error('app.js read-aloud rules changed');
  // "$45" is read as 45 dollars
  return src.replace(rules, "    [/\\$\\s?([\\d.,]+)/g, '$1美元'],\n    [/¥\\s?([\\d.,]+)/g, '$1人民币'],\n");
}
const js = fwJs(trimApp(fs.readFileSync(path.join(root, 'app.js'), 'utf8'))) + '\n' + fwJs(fs.readFileSync(path.join(here, 'app-la.js'), 'utf8'));

/* ---------- illustrations: hand-drawn file first, procedural placeholder otherwise ---------- */
const missingScenes = new Set();
const missingArt = [];
let uidN = 0;
const BLANK = '<svg class="art" viewBox="0 0 1600 900" role="img" aria-label="插图"><rect width="1600" height="900" fill="#c9bfa9"/></svg>';
const scene = (key, ...a) => {
  const fn = scenes[key];
  if (!fn) { missingScenes.add(key); return BLANK; }
  return fn(`u${uidN++}-`, ...a);
};
const MIME = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' };
function artCover(key) {
  for (const ext of Object.keys(MIME)) {
    const f = path.join(artDir, `${key}.${ext}`);
    if (fs.existsSync(f)) return `<span class="photo artfile" style="background-image:url(data:${MIME[ext]};base64,${fs.readFileSync(f).toString('base64')})" role="img" aria-label="手绘插画"></span>`;
  }
  missingArt.push(key);
  return scene(key);
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- real photos (credits live in the collapsed box at the end of the page) ---------- */
// Photos are embedded in the page itself (one CSS class per photo, base64, written once and reused by every card that shows it),
// so the built page is fully self-contained. Card covers are the hand-drawn illustrations; the real photos are inside the cards.
const usedPhotos = new Set();
const ph = (k) => (k && PHOTOS[k] && fs.existsSync(path.join(imgDir, PHOTOS[k].file)) ? PHOTOS[k] : null);
const coverCss = new Map();
function coverClass(k) {
  if (!coverCss.has(k)) {
    const small = path.join(imgDir, 'cover', PHOTOS[k].file);
    const file = fs.existsSync(small) ? small : path.join(imgDir, PHOTOS[k].file);
    coverCss.set(k, `.pg-${k}{background-image:url(data:image/jpeg;base64,${fs.readFileSync(file).toString('base64')})}`);
  }
  return `pg-${k}`;
}
function phGallery(keys = []) {
  const figs = [...new Set(keys.filter(Boolean))].map((k) => {
    const p = ph(k);
    if (!p) return '';
    usedPhotos.add(k);
    return `<figure class="ph"><span class="ph-img ${coverClass(k)}" role="button" tabindex="0" aria-label="${esc(p.alt)}(点击放大)"></span><figcaption>${esc(p.alt)}</figcaption></figure>`;
  }).join('');
  return figs ? `<div class="ph-row nosay">${figs}</div>` : '';
}
const capLine = (drawn) => (drawn ? `<p class="cap nosay">插图:${drawn}</p>` : '');
const pad2 = (n) => String(n).padStart(2, '0');
const NOW = new Date();
const STAMP = `${NOW.getFullYear()}-${pad2(NOW.getMonth() + 1)}-${pad2(NOW.getDate())} ${pad2(NOW.getHours())}:${pad2(NOW.getMinutes())}`;
const PHOTO_CSS = `
/* ---- text never pushes its box wider than the screen ---- */
.st > div, .kv dt, .kv dd, .tl-x, .dday > *, .sx-main, .infobox, .card-body, .card-body > *, .sec-body, .sec-body > *, .assume > div, .need li, .wl, .ck span, .dbox { min-width: 0; }
.st p, .st b, .boxout, .tl-x, .kv dd, .pts li, .lead, .note, .ck span, .dbox, .need li, .wl p, .cap, .infobox, .glance p, .ch-intro, figcaption { overflow-wrap: anywhere; }
/* ---- phones / WebKit ---- */
html { -webkit-text-size-adjust: 100%; text-size-adjust: 100%; }
button, summary, .dchip, .pill, .stab, .botnav a { touch-action: manipulation; -webkit-tap-highlight-color: transparent; }
@media (max-width: 760px) { input, select, textarea { font-size: max(16px, 1rem) !important; } } /* iOS zooms into smaller form fields */
.sea-map { display: block; width: 100%; height: auto; }
.mp-vehicle, .mp-key { pointer-events: none; }
.mp-pin { cursor: pointer; } .mp-pin:focus { outline: none; } .mp-pin:focus-visible circle { stroke: var(--gold); stroke-width: 3; }
@media (max-width: 760px) {
  .mapbox .sea-map { min-width: 760px; }                 /* keep the labels readable: the map scrolls sideways (and follows the vehicle) */
  .sea-map .mp-l { font-size: 19px; } .sea-map .mp-s, .sea-map .mp-d, .sea-map .mp-key text, .sea-map .mp-note { font-size: 13px; }
}
footer .stamp { font-size: .72rem; opacity: .6; }
details.ph-box[open] > summary small { display: none; }
.ds .nb { display: inline-block; max-width: 100%; }
.ov-t { min-width: 0; }
.ov-t .en, .hero .sub { text-wrap: balance; }
a[href^="tel:"] { white-space: nowrap; }
.totop { box-shadow: 0 0 0 2px rgba(255, 255, 255, .55), 0 4px 12px rgba(0, 0, 0, .25); }
.tbtn { min-height: 44px; }
.pl-r { min-width: 0; } .pl-r select { min-width: 0; max-width: 34vw; text-overflow: ellipsis; }
.ov-t .tt { text-wrap: balance; }
.mp-pin:hover circle:first-child, .mp-pin.on circle:first-child { r: 13px; }
.fs-row button, .fs-presets button { text-align: center; }
.tbtn { min-width: 44px; }
.daysum a { display: inline-block; padding: 10px 0; }
/* safe areas (notched phones in landscape) */
.wrap { padding-left: max(var(--gut), env(safe-area-inset-left)); padding-right: max(var(--gut), env(safe-area-inset-right)); }
.botnav { padding-left: env(safe-area-inset-left); padding-right: env(safe-area-inset-right); }
.totop { right: max(14px, env(safe-area-inset-right)); }
@media (min-width: 900px) { .totop { right: 10px; bottom: 24px; } }
/* landscape phones: a compact icon-only chapter bar */
@media (orientation: landscape) and (max-height: 500px) {
  .botnav a { padding: 4px 0 3px; } .botnav .ic { width: 18px; height: 18px; }
  .botnav a span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  body { padding-bottom: calc(34px + env(safe-area-inset-bottom)); }
  .totop { bottom: calc(46px + env(safe-area-inset-bottom)); } .player { bottom: calc(44px + env(safe-area-inset-bottom)); }
}
/* touch screens: hover effects would stay "stuck" after a tap */
@media (hover: none) { .card .acc-h:hover .banner .photo { transform: none; } .dchip:hover { transform: none; } }
/* phones */
@media (max-width: 640px) {
  .card .acc-h { display: grid; grid-template-columns: minmax(0, 1fr); grid-template-rows: auto 1fr; }
  .card .acc-h > .banner { grid-area: 1 / 1 / 3 / 2; }
  .card .acc-h > .tag { position: relative; top: auto; left: auto; grid-area: 1 / 1; justify-self: start; align-self: start; margin: 14px 64px 0 14px; max-width: calc(100% - 78px); }
  .card .acc-h > .ov { grid-area: 2 / 1; }
  .pl-btns button { width: 44px; height: 44px; }
  .card .acc-h > .banner { aspect-ratio: auto; min-height: 56.25vw; }
  .card .acc-h > .ov { position: relative; inset: auto; align-self: end; padding-top: 10px; }
  .player { row-gap: 6px; }
  .pl-btns { grid-column: 1; grid-row: 1; } .pl-r { grid-column: 3; grid-row: 1; } .pl-txt { grid-column: 1 / -1; grid-row: 2; }
}
@media (max-width: 760px) {
  .mapbox svg.sea-map { min-width: 820px; }
  .sea-map .mp-l { font-size: 20px; } .sea-map .mp-s, .sea-map .mp-d, .sea-map .mp-key text, .sea-map .mp-note { font-size: 14px; }
  .ph-credits a { display: inline-block; padding: 4px 0; }
}
@media (max-width: 480px) {
  .days-row { grid-template-columns: repeat(4, 1fr) !important; }
  .tl::before { left: calc(3.2em + 10px); }
  .tl-i { grid-template-columns: 3.2em minmax(0, 1fr); gap: 0 22px; }
  .tl-x::before { left: -17px; }
  .status-h.acc-h { flex-wrap: wrap; } .status-h .ic { order: 2; } .status-h small { order: 3; flex-basis: 100%; padding-left: 20px; }
}
@media (max-width: 480px) { .kick { letter-spacing: .12em; } }
@media (max-width: 340px) { .brand .mk { display: none; } }
/* comfortable tap targets on phones (>= 44px, or a larger invisible hit area) */
@media (max-width: 760px) {
  .ck { min-height: 44px; align-items: center; }
  .spk::after { content: ""; position: absolute; inset: -6px; }
  footer .src a { display: block; padding: 7px 0; }
  .pill { min-height: 44px; }
  .dchip { min-height: 48px; }
}
.pace.lv1 i.on { background: var(--forest); }
.pace.lv2 i.on { background: var(--gold); }
.pace.lv3 i.on { background: var(--red); }
.lvl { display: inline-flex; align-items: center; gap: 4px; }
.lvl b { font-weight: 800; }
.lvl.lv1 b { color: var(--forest); } .lvl.lv2 b { color: var(--gold); } .lvl.lv3 b { color: var(--red); }
.banner .photo { z-index: 0; background-size: cover; background-position: center; background-repeat: no-repeat; background-color: var(--paper-2); transition: transform .8s cubic-bezier(.2, .7, .2, 1); }
.card .acc-h:hover .banner .photo { transform: scale(1.04); }
.day-meta span > span, .day-meta span > b { padding: 0; border: 0; background: none; border-radius: 0; }
@media (min-width: 900px) and (max-width: 1300px) { main .wrap, footer .wrap { padding-right: 62px; } }
.banner::after { z-index: 1; }
.ph-row { display: grid; gap: 14px; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); }
.ph { margin: 0; background: var(--paper-2); border: 1px solid var(--rule); }
.ph .ph-img { display: block; width: 100%; height: 0; padding-bottom: 66.67%; background-size: cover; background-position: center; background-repeat: no-repeat; background-color: var(--paper-2); }
.ph figcaption { padding: 8px 10px; font-size: .72rem; line-height: 1.55; color: var(--ink-3); }
.ph figcaption a, .cap a { color: inherit; }
:root { --sp: #0a6a6e; }
:root[data-theme="dark"] { --sp: #5cd2cf; }
.tl-x b.sp, .dbox b.sp, .boxout b.sp { font-weight: 800; color: var(--sp); }
.hotel { display: grid; gap: 4px; }
.hotel .h-top { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 10px; }
.hotel .h-n { font-size: 1rem; color: var(--ink); }
.hotel .h-night { font-size: .74rem; font-weight: 700; color: var(--c); padding: 1px 9px; border: 1px solid color-mix(in srgb, var(--c) 45%, transparent); border-radius: 99px; }
.hotel .h-en { font-size: .8rem; color: var(--ink-3); }
.hotel .h-pts { margin: 2px 0 0; padding-left: 1.15em; }
.hotel .h-pts li { margin: 1px 0; line-height: 1.6; }
.hotel .h-addr { margin-top: 8px; padding: 8px 10px; background: var(--paper-2); border-left: 3px solid var(--c); display: grid; gap: 2px; font-size: .82rem; line-height: 1.55; }
.hotel .h-ad-l { font-size: .7rem; font-weight: 800; letter-spacing: .1em; color: var(--c); }
.hotel .h-ad { color: var(--ink); user-select: all; -webkit-user-select: all; }
.hotel .h-zh { color: var(--ink-3); }
.hotel .h-addr .pill { justify-self: start; margin-top: 4px; }
.ph .ph-img { cursor: zoom-in; }
.ph .ph-img:focus-visible { outline: 3px solid var(--c, #c0392b); outline-offset: -3px; }
.lb { position: fixed; inset: 0; z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(8, 8, 10, .97); -webkit-user-select: none; user-select: none; }
.lb[hidden] { display: none; }
.lb-img { flex: 1 1 auto; width: 100%; min-height: 0; background-size: contain; background-position: center; background-repeat: no-repeat; cursor: zoom-out; }
.lb-cap { flex: 0 0 auto; max-width: 52em; padding: 12px 64px 18px; font-size: .85rem; line-height: 1.6; color: #e8e8e8; text-align: center; }
.lb button { position: absolute; width: 44px; height: 44px; border-radius: 50%; background: rgba(0, 0, 0, .55); border: 1px solid rgba(255, 255, 255, .45); color: #fff; font-size: 1.5rem; line-height: 1; cursor: pointer; }
.lb button:hover, .lb button:focus-visible { background: rgba(0, 0, 0, .8); }
.lb-x { top: 12px; right: 12px; }
.lb-p, .lb-n { top: 50%; margin-top: -22px; }
.lb-p { left: 10px; }
.lb-n { right: 10px; }
.lb-n[hidden], .lb-p[hidden] { display: none; }
@media (max-width: 760px) { .lb-cap { padding: 10px 16px 16px; } .lb-p, .lb-n { top: auto; bottom: 64px; margin-top: 0; } }
footer details.ph-box { margin: 18px 0 8px; border: 1px solid color-mix(in srgb, currentColor 28%, transparent); border-radius: 10px; padding: 0 16px; max-width: 52em; }
footer details.ph-box > summary { cursor: pointer; padding: 12px 0; font-weight: 700; font-size: .92rem; list-style-position: inside; }
footer details.ph-box > summary small { font-weight: 500; opacity: .7; margin-left: 4px; }
footer details.ph-box[open] > summary { border-bottom: 1px solid color-mix(in srgb, currentColor 20%, transparent); margin-bottom: 10px; }
footer .ph-credits { margin: 6px 0 16px; padding-left: 1.2em; font-size: .78rem; line-height: 1.7; opacity: .9; }
footer .ph-credits li { margin: 2px 0; }
/* ---- LA page ---- */
.food .dsn { color: var(--red); } .food .la { color: var(--blue); }
.food[hidden] { display: none; }
.food-filter { margin: 0 0 14px; }
.foods + .note { margin-top: 10px; }
.eats { list-style: none; margin: 0; padding: 0; display: grid; }
.eat { display: grid; gap: 2px 18px; padding: 12px 0; border-bottom: 1px solid var(--rule-2); grid-template-columns: minmax(0, 1fr); }
.eat:last-child { border-bottom: 0; }
.eat .e-n { font-family: var(--serif); font-weight: 900; font-size: 1rem; line-height: 1.4; color: var(--ink); }
.eat .e-a { font-size: .78rem; color: var(--ink-3); line-height: 1.5; }
.eat .e-t { font-size: .88rem; color: var(--ink-2); line-height: 1.7; }
.eat .e-w { justify-self: start; margin-top: 4px; font-size: .74rem; font-weight: 700; color: var(--c); padding: 1px 10px; border: 1px solid color-mix(in srgb, var(--c) 45%, transparent); border-radius: 99px; line-height: 1.6; }
.eat.alt .e-n { font-weight: 700; color: var(--ink-2); }
.eat.alt { opacity: .92; }
@media (min-width: 760px) {
  .eat { grid-template-columns: minmax(10em, 1.1fr) minmax(0, 2.2fr) minmax(7em, .8fr); align-items: start; }
  .eat .e-main { grid-column: 1; } .eat .e-t { grid-column: 2; margin: 0; } .eat .e-w { grid-column: 3; justify-self: end; margin: 0; text-align: right; }
}
.eat .e-main, .eat .e-t, .eat .e-w { min-width: 0; overflow-wrap: anywhere; }
@media (min-width: 560px) { .glance.glance3 { grid-template-columns: repeat(3, 1fr); } }
.stats .stat { min-width: 0; }
.manners .kv { grid-template-columns: 6em 1fr; }
@media (max-width: 560px) { .manners .kv, .kvl .kv { grid-template-columns: minmax(0, 1fr); gap: 2px; } }
.banner .artfile { position: absolute; inset: 0; z-index: 0; }
.hero-art img.art { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.plan2 { display: grid; gap: 18px; }
@media (min-width: 860px) { .plan2 { grid-template-columns: 1fr 1fr; } }
.plan2 h4.mini { margin: 0 0 10px; }
.mp-vehicle.plane { fill: var(--blue); filter: drop-shadow(0 2px 3px rgba(0, 0, 0, .35)); }
`;

const spk = (target) => `<button class="spk" type="button" data-speak="${target}" aria-label="朗读这一部分" title="朗读这一部分">${ico('speaker')}</button>`;
function sec({ id, no, title, sub = '', body, open = false }) {
  return `<div class="acc sec${open ? ' open' : ''}" id="${id}">
  <h3><button class="acc-h sec-h" type="button" aria-expanded="${open}" aria-controls="${id}-b"><span class="no">${no}</span><span class="t"><span class="lbl">${title}</span>${sub ? `<small>${sub}</small>` : ''}</span>${ico('chevron', { cls: 'chev' })}</button></h3>
  ${spk(id + '-b')}
  <div class="acc-b" id="${id}-b" role="region"><div class="acc-in"><div class="sec-body">${body}</div></div></div>
</div>`;
}
// "A · B · C" → each part as a non-breaking chunk, the bullet stays at the end of the previous chunk
const nbParts = (t) => String(t).split(' · ').map((x, i, a) => `<span class="nb">${x}${i < a.length - 1 ? ' ·' : ''}</span>`).join(' ');
function card({ id, art, badge, tags = '', title, en = '', desc = '', body }) {
  return `<article class="acc card" id="${id}">
  <h3><button class="acc-h" type="button" aria-expanded="false" aria-controls="${id}-b">
    <span class="banner">${art}</span>
    <span class="tag">${tags}</span>
    <span class="ov"><span class="badge" aria-hidden="true">${badge}</span><span class="ov-t"><span class="tt lbl">${title}</span>${en ? `<span class="en nosay">${en}</span>` : ''}${desc ? `<span class="ds">${nbParts(desc)}</span>` : ''}</span>${ico('chevron', { cls: 'chev' })}</span>
  </button></h3>
  ${spk(id + '-b')}
  <div class="acc-b" id="${id}-b" role="region"><div class="acc-in"><div class="card-body">${body}</div></div></div>
</article>`;
}
const box = (cls, label, icon, html) => `<div class="boxout ${cls}"><b class="lbl">${ico(icon)}${label}</b>${html}</div>`;
const RATE = { must: ['must', '必看'], worth: ['', '值得'], opt: ['', '备选'] };
const CITY = { DCA: '加州冒险乐园', DL: '迪士尼乐园', LA: '洛杉矶市区' };
const chead = (id, num, eyebrow, title, intro) => `<div class="ch-head rv"><span class="ch-num" aria-hidden="true">${num}</span><p class="eyebrow">${eyebrow}</p><h2 class="h2" id="${id}-h">${title}</h2>
    ${intro ? `<p class="ch-intro say">${intro}</p>` : ''}
    <div class="ch-tools"><button class="pill" type="button" data-expand="${id}">${ico('expand')}全部展开</button><button class="pill" type="button" data-collapse="${id}">${ico('collapse')}全部收起</button><button class="pill" type="button" data-speak-ch="${id}">${ico('speaker')}朗读本章</button></div></div>`;

/* ---------- reusable widgets ---------- */
function checklist(id, groups, label = '已确认') {
  const total = groups.reduce((a, g) => a + g.i.length, 0);
  return `<div class="ckl" data-ckl="${id}"><div class="packbar"><span>${label} <b data-n>0</b> / <span data-t>${total}</span></span><span class="bar"><i data-bar></i></span><button class="pill" type="button" data-reset>清空</button></div>
  <div class="pack">${groups.map((g, gi) => `<div class="pk"><h4>${g.g}</h4>${g.i.map((x, xi) => `<label class="ck"><input type="checkbox" data-k="${gi}-${xi}"><span>${x}</span></label>`).join('')}</div>`).join('')}</div></div>`;
}
// intensity: three levels (轻松 / 中等 / 高强度); the data keeps a 1–3 effort score
const LEVELS = ['轻松', '中等', '高强度'];
const meter = (l) => `<span class="pace lv${l}" role="img" aria-label="强度:${LEVELS[l - 1]}">${[1, 2, 3].map((i) => `<i class="${i <= l ? 'on' : ''}"></i>`).join('')}</span>`;
const intensity = (n) => `<span class="lvl lv${n}">强度 ${meter(n)}<b>${LEVELS[n - 1]}</b></span>`;
const kvl = (rows) => `<dl class="kvl">${rows.map(([k, v]) => `<div class="kv say"><dt class="lbl">${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

/* ---------- overview ---------- */
function glance() {
  const g = [
    ['route', 'var(--red)', '路线', C.ROUTE_NOTE.shape],
    ['clock', 'var(--gold)', '节奏', C.ROUTE_NOTE.pace],
    ['cal', 'var(--forest)', '倒计时', '距 2/9 起飞还有 <b data-cd="2027-02-09T09:01:00-07:00">…</b>;距 2/10 迪士尼还有 <b data-cd="2027-02-10T08:00:00-08:00">…</b>。'],
  ];
  return `<div class="glance glance3">${g.map(([i, c, t, p]) => `<div class="gl rv" style="--g:${c}">${ico(i)}<h3>${t}</h3><p>${p}</p></div>`).join('')}</div>`;
}
function stats() {
  return `<div class="stats rv" style="margin-top:18px">${C.STATS.map((s) => `<div class="stat rv say"><div class="n lbl">${s.t}</div><div class="l lbl">${s.l}</div><div class="s">${s.s}</div></div>`).join('')}</div>`;
}
function assumptions() {
  const body = `<div class="assume">
    <div><h4 class="mini">我先按这些默认假设来排(不对请告诉我)</h4>${kvl(C.ASSUME)}</div>
    <div><h4 class="mini">还需要你告诉我</h4><ol class="need say">${C.PENDING.map((t) => `<li>${t}</li>`).join('')}</ol></div></div>`;
  return sec({ id: 'p-assume', no: '必读', title: '计划假设与待确认', sub: '请先看这一块', body, open: true });
}
function status() {
  const items = C.STATUS.map((s) => `<div class="st ${s.k}">${ico(s.k === 'warn' ? 'warn' : s.k === 'ok' ? 'check' : 'info')}<div><b>${s.t}</b><p>${s.d}</p></div></div>`).join('');
  return `<div class="status acc open" id="status">
  <button class="status-h acc-h" type="button" aria-expanded="true" aria-controls="status-b"><span class="dot"></span>最新状态与提醒<small>截至 ${C.META.cn} · ${C.STATUS.length} 条</small>${ico('chevron')}</button>
  <div class="acc-b" id="status-b"><div class="acc-in"><div class="st-list">${items}</div></div></div>
</div>`;
}
function mapSection() {
  const m = S.laMap();
  const CHIP = ['到达', '迪士尼', '市区', '回家'];
  const chips = C.DAYS.map((d) => `<button class="dchip" type="button" data-day="${d.n}" data-title="${fwText(d.title)}" data-sub="${fwText(d.sub)}" data-move="${fwText(d.move)}" data-d="${fwText(d.d)}" aria-label="第 ${d.n} 天:${d.title}"><b>${d.n}</b><span>${CHIP[d.n - 1] || ''}</span></button>`).join('');
  return `<section class="block wrap" id="map" aria-labelledby="map-h" style="padding-top:clamp(28px,5vw,56px)">
  <div class="rv"><p class="eyebrow" style="--c:var(--gold)">路线总览</p><h2 class="h2" id="map-h" style="margin:6px 0 18px">一张图看完 ${C.DAYS.length} 天</h2></div>
  <div class="mapbox rv" id="mapbox">${m.svg}</div><p class="map-hint">地图可左右滑动。</p>
  <div class="days-row rv" role="group" aria-label="选择第几天" style="grid-template-columns:repeat(${C.DAYS.length},1fr)">${chips}</div>
  <div class="daysum" id="daysum" aria-live="polite"><h4>点上面的数字,看这一天怎么走</h4><p>飞机和小车跟着行程走:第 1 天飞 LAX、开到迪士尼边上;第 2 天车不动,坐班车;第 3 天市区一圈;第 4 天还车飞回家。也可以点地图上的圆点。</p></div>
</section>`;
}

/* ---------- 01 disney ---------- */
function chDisney() {
  const tickets = `<table class="price"><caption class="sr">票与价格</caption>${C.TICKETS.map(([a, b, c]) => `<tr class="say"><td class="lbl">${a}</td><td>${b}</td><td>${c}</td></tr>`).join('')}</table>
  <h4 class="mini" style="margin:16px 0 8px">买完票要做的 4 件事</h4><ul class="pts">${C.TICKET_STEPS.map((t) => `<li>${t}</li>`).join('')}</ul>`;
  const flips = `<div class="flips">${C.LINGO.map((c) => `<button class="flip rv say" type="button" aria-pressed="false"><span class="flip-in"><span class="fc f">${ico(c.ico)}<span class="k lbl">${c.k}</span><span class="s">${c.s}</span><span class="hint nosay">点击翻面 ↻</span></span><span class="fc b">${c.back.map((t) => `<span class="bp">${t}</span>`).join('')}</span></span></button>`).join('')}</div>`;
  const planRows = (rows) => `<dl class="kvl">${rows.map(([a, b, c]) => `<div class="kv say"><dt class="lbl">${a}<br>${b}</dt><dd>${c}</dd></div>`).join('')}</dl>`;
  const plans = `<div class="plan2"><div><h4 class="mini">上午 · 加州冒险乐园(DCA)</h4>${planRows(C.DCA_PLAN)}<p class="note">${C.DCA_NOTE}</p></div>
  <div><h4 class="mini">下午到晚上 · 迪士尼乐园(DL)</h4>${planRows(C.DL_PLAN)}</div></div>`;
  const shuttle = kvl(C.SHUTTLE);
  const filter = `<div class="food-filter nosay"><div class="chipsel" id="food-filter" role="group" aria-label="按区域筛选"><button type="button" class="on" aria-pressed="true" data-w="all">全部 ${C.FOODS.length}</button>${Object.entries(C.FOOD_REGION).map(([k, v]) => `<button type="button" aria-pressed="false" data-w="${k}">${v} ${C.FOODS.filter((f) => f.w === k).length}</button>`).join('')}</div></div>`;
  const foods = `${filter}<div class="foods" id="foods">${C.FOODS.map((f) => `<div class="food rv" data-w="${f.w}">${food(f.i)}<div><h4>${f.n}<span class="${f.w.toLowerCase()}">${C.FOOD_REGION[f.w] || f.w}</span></h4><p>${f.d}</p></div></div>`).join('')}</div>`;
  const eats = C.EATS.map((e) => `<h4 class="mini" style="margin:14px 0 4px">${C.FOOD_REGION[e.c]}</h4><ul class="eats">${e.list.map(([n, a, t, w]) => `<li class="eat${/^备选/.test(n) ? ' alt' : ''}"><div class="e-main"><div class="e-n lbl">${n}</div>${a ? `<div class="e-a nosay">${a}</div>` : ''}</div><div class="e-t">${t}</div>${w ? `<div class="e-w">${w}</div>` : ''}</li>`).join('')}</ul>`).join('\n');
  const quiz = `<div class="quiz">${C.QUIZ.map((q, i) => `<div class="q" data-a="${q.a}"><h4><span>Q${i + 1}</span>${q.q}</h4><div class="opts">${q.o.map((o, j) => `<button class="opt" type="button" data-i="${j}">${o}</button>`).join('')}</div><p class="why nosay">${q.why}</p></div>`).join('')}</div>`;
  return `<section class="block wrap ch-culture" id="disney" aria-labelledby="disney-h">
  ${chead('disney', '01', '第一部分 · 迪士尼攻略与吃喝', '迪士尼攻略与吃喝', '一天两园怎么打、票怎么买、园里吃什么;顺手把市区几顿也排了。第 2 天的行程卡片里有按小时的时间线。')}
  ${sec({ id: 'd-ticket', no: '1.1', title: '票、预约与当天要买什么', sub: '价格已核实,还没买', body: tickets, open: true })}
  ${sec({ id: 'd-lingo', no: '1.2', title: '八个迪士尼黑话', sub: '点卡片翻面', body: flips })}
  ${sec({ id: 'd-plan', no: '1.3', title: '两园打法', sub: '上午 DCA → 下午 Disneyland', body: plans })}
  ${sec({ id: 'd-shuttle', no: '1.4', title: '班车与打车', sub: '当天早上才定', body: shuttle })}
  ${sec({ id: 'd-food', no: '1.5', title: '吃什么', sub: `${C.FOODS.length} 样,可按园区 / 市区筛选`, body: foods })}
  ${sec({ id: 'd-eat', no: '1.6', title: '去哪吃', sub: '地址、营业提醒、排在哪一天', body: eats })}
  ${sec({ id: 'd-quiz', no: '1.7', title: '开园小测验', sub: '4 道题,记住就少踩坑', body: quiz })}
</section>`;
}

/* ---------- 02 days ---------- */
function stayBox(h) {
  return `<div class="hotel"><div class="h-top"><b class="h-n">${h.name}</b>${h.night ? `<span class="h-night">${h.night}</span>` : ''}</div>
  <ul class="h-pts">${h.pts.map((x) => `<li>${x}</li>`).join('')}</ul></div>`;
}
function dayBody(d) {
  return `<div class="dday">
  <div class="day-meta"><span>${ico('cal')}${d.d}</span><span>${ico('pin')}${d.area}</span><span>${ico(d.n === 1 || d.n === 4 ? 'plane' : 'car')}${d.move}</span><span class="nosay">${intensity(d.pace)}</span>${d.tags.map((t) => `<span>${t}</span>`).join('')}</div>
  ${phGallery([d.photo, ...(d.gallery || [])])}
  <ol class="tl">${d.steps.map(([t, x]) => `<li class="tl-i say"><span class="tl-t lbl">${t}</span><div class="tl-x">${x}</div></li>`).join('')}</ol>
  <div class="dgrid"><div class="dbox"><b class="l lbl">${ico('car')}交通</b>${d.drive}</div>${d.stay ? `<div class="dbox"><b class="l lbl">${ico('bed')}住</b>${stayBox(d.stay)}</div>` : ''}<div class="dbox"><b class="l lbl">${ico('eat')}吃</b>${d.eat}</div></div>
  ${box('warn', '小心', 'warn', d.warn)}
  ${box('alt', '备选方案', 'shuffle', d.alt)}
  ${box('fun', '小 Tip', 'info', d.fun)}
  </div>`;
}
function chRoute() {
  const days = C.DAYS.map((d) => card({ id: `d${d.n}`, art: artCover(d.scene), badge: d.n, tags: `<span>第 ${d.n} 天 · ${d.d}</span>`, title: d.title, desc: d.sub, body: dayBody(d) })).join('');
  return `<section class="block wrap ch-route" id="route" aria-labelledby="route-h">
  ${chead('route', '02', `第二部分 · ${C.DAYS.length} 日行程`, `${C.DAYS.length} 日行程`, '')}
  <div class="legend rv nosay"><span>强度:</span>${meter(1)} 轻松 ${meter(2)} 中等 ${meter(3)} 高强度</div>
  ${days}
</section>`;
}

/* ---------- 03 sights ---------- */
function sightBody(s) {
  const f = s.facts;
  return `<div class="sx"><div class="sx-main">
    ${capLine(s.cap)}
    <p class="lead say">${s.blurb}</p>
    ${phGallery([s.photo, ...(s.gallery || [])])}
    <ul class="pts">${s.pts.map((p) => `<li>${p}</li>`).join('')}</ul>
    ${s.news ? box('news', '最新', 'info', s.news) : ''}
    ${s.tip ? box('tip', '提醒', 'check', s.tip) : ''}
    ${s.fun ? box('fun', '小 Tip', 'info', s.fun) : ''}
  </div>
  <aside class="infobox"><h4>实用信息</h4><dl style="margin:0">
    <div class="kv say"><dt class="lbl">耗时</dt><dd>${f.time}</dd></div>
    <div class="kv say"><dt class="lbl">最佳时间</dt><dd>${f.when}</dd></div>
    <div class="kv say"><dt class="lbl">费用</dt><dd>${f.cost}</dd></div>
    <div class="kv say"><dt class="lbl">怎么去</dt><dd>${f.how}</dd></div>
  </dl></aside></div>`;
}
function chSights() {
  const groups = [['DCA', '上午 · 加州冒险乐园', 'Disney California Adventure'], ['DL', '下午 · 迪士尼乐园', 'Disneyland Park'], ['LA', '第 3 天 · 洛杉矶市区', 'Los Angeles']];
  const body = groups.map(([k, zh, en]) => `<h3 class="sub-h">${zh} <small>${en}</small></h3>` + C.SIGHTS.filter((s) => s.c === k).map((s) => {
    const [rc, rl] = RATE[s.r];
    return card({ id: `s-${s.id}`, art: artCover(s.scene), badge: s.n, tags: `<span>${CITY[s.c] || s.c}</span><span class="${rc}">${rc ? ico('star', { fill: true }) : ''}${rl}</span>`, title: s.name, en: s.en, body: sightBody(s) });
  }).join('')).join('');
  return `<section class="block wrap ch-sights" id="sights" aria-labelledby="sights-h">
  ${chead('sights', '03', '第三部分 · 景点', `${C.SIGHTS.length} 处景点`, '按游玩顺序排,行程卡片里提到的地方都在这。卡片封面是手绘插画,点开里面是真实照片。')}
  ${body}
</section>`;
}

/* ---------- 04 drive + prep ---------- */
function tipCalc() {
  return `<div class="calc" id="tipcalc"><h4>${ico('coin')}小费计算器</h4>
  <div class="fld"><label for="tip-bill">税前账单(美元)</label><input id="tip-bill" type="number" inputmode="decimal" min="0" step="0.01" placeholder="例如 86.50"></div>
  <div class="fld"><label>小费比例</label><div class="chipsel" id="tip-pcts"><button type="button" data-p="15">15%</button><button type="button" data-p="18">18%</button><button type="button" class="on" data-p="20">20%</button><button type="button" data-p="25">25%</button></div></div>
  <div class="fld"><label for="tip-n">几个人分</label><input id="tip-n" type="number" inputmode="numeric" min="1" step="1" value="2"></div>
  <div class="out"><span>小费 <b id="tip-v">0.00</b></span><span>总计 <b id="tip-t">0.00</b></span><span>每人 <b id="tip-e">0.00</b></span></div></div>`;
}
function curCalc() {
  return `<div class="calc" id="curcalc"><h4>${ico('wallet')}美元 ⇄ 加元</h4>
  <div class="fld"><label for="cur-rate">汇率(1 美元 = ? 加元)</label><input id="cur-rate" type="number" inputmode="decimal" step="0.001" min="0" placeholder="填入当天汇率,例如 1.4"></div>
  <div class="fld"><label for="cur-cad">美元</label><input id="cur-cad" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0"></div>
  <div class="fld"><label for="cur-cny">加元</label><input id="cur-cny" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0"></div>
  <p class="note">页面不内置汇率(会过时)。出发前查一下银行或支付软件的实时汇率,填进来即可,下次打开会记住。</p></div>`;
}
function chPlan() {
  const drive = `<dl class="manners">${C.DRIVE.map(([k, v]) => `<div class="kv say"><dt class="lbl">${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;
  const flights = `<table class="price"><caption class="sr">航班</caption>${C.FLIGHTS.map(([a, b, c]) => `<tr class="say"><td class="lbl">${a}</td><td>${b}</td><td>${c}</td></tr>`).join('')}</table><p class="note" style="margin-top:10px">${C.FLIGHT_NOTE}</p>`;
  const timeline = `<div class="when-line">${C.TIMELINE.map(([a, b]) => `<div class="wl say"><b class="lbl">${a}</b><p>${b}</p></div>`).join('')}</div>`;
  const costs = `<table class="price"><caption class="sr">花销汇总</caption>${C.COSTS.map(([a, b, c]) => `<tr class="say"><td class="lbl">${a}</td><td>${b}</td><td>${c}</td></tr>`).join('')}</table><p class="note" style="margin-top:10px">${C.COST_NOTE}</p>`;
  const tools = `<p class="note say">全程太平洋时间(PT)。埃德蒙顿(山地时间)2 月比 LA 快 1 小时。</p><div class="clocks">
    ${[['la', '洛杉矶', 'America/Los_Angeles', '基准(太平洋时间)'], ['yeg', '埃德蒙顿', 'America/Edmonton', '']]
      .map(([k, n, tz, b]) => `<div class="clk" data-tz="${tz}" data-k="${k}"${b ? ` data-base="${b}"` : ''}><div class="z">${n}</div><div class="tm" aria-live="off">--:--</div><div class="dt">&nbsp;</div><div class="df">&nbsp;</div></div>`)
      .join('')}</div>
  <div class="calcs" style="margin-top:16px">${tipCalc()}${curCalc()}</div>`;
  return `<section class="block wrap ch-plan" id="plan" aria-labelledby="plan-h">
  ${chead('plan', '04', '第四部分 · 开车与出发前', '开车与出发前', '开车停车的规矩、航班与行李、什么时候订什么、一共要花多少。')}
  ${sec({ id: 'p-drive', no: '4.1', title: '开车与停车', sub: '取车、高速、加油、每一处停车费', body: drive, open: true })}
  ${sec({ id: 'p-fly', no: '4.2', title: '航班与行李', sub: '两段飞机 + 两次转机', body: flights })}
  ${sec({ id: 'p-time', no: '4.3', title: '倒计时', sub: '什么时候订什么', body: timeline })}
  ${sec({ id: 'p-cost', no: '4.4', title: '花销汇总', sub: '已知的先列上,房费待补', body: costs })}
  ${sec({ id: 'p-pack', no: '4.5', title: '打包清单', sub: '只带手提行李;可勾选,会记住', body: checklist('pack', C.PACK, '已准备') })}
  ${sec({ id: 'p-tools', no: '4.6', title: '小工具', sub: '两地时钟、小费与汇率', body: tools })}
</section>`;
}

/* ---------- shell ---------- */
const nav = [
  ['top', '概览', 'pin', 'var(--ink)'],
  ['disney', '迪士尼', 'star', 'var(--red)'],
  ['route', '行程', 'route', 'var(--gold)'],
  ['sights', '景点', 'star', 'var(--teal)'],
  ['plan', '实用', 'car', 'var(--forest)'],
];
const TITLE = `${C.META.title} · 洛杉矶 × 迪士尼 4 日游`;
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%2331418a'/%3E%3Cpath fill='%23fff' d='M5 20v-7l1.6-1.6V7.5h2.2v2.5h1.4V7.5h1.8V10h1.4V7.5h2.2v3.9l1.6 1.6v7h-4v-3a2.3 2.3 0 0 0-4.6 0v3z'/%3E%3C/svg%3E";
const head = () => `<!doctype html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="format-detection" content="telephone=no">
<meta name="theme-color" content="#faf7f1">
<title>${TITLE}</title>
<meta name="description" content="${C.META.hero}${C.META.cn}整理。">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap" media="print" onload="this.media='all'">
<style>${cssCompat(css + PHOTO_CSS)}</style>
<script>
(function(){try{var t=localStorage.getItem('yvr7:theme');t=t?JSON.parse(t):(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);var f=localStorage.getItem('yvr7:fs');if(f)document.documentElement.style.setProperty('--fs',JSON.parse(f));}catch(e){}})();
</script>
</head>`;

const topbar = `<a class="skip" href="#main">跳到正文</a>
<header class="topbar" id="topbar">
  <a class="brand" href="#top" aria-label="回到顶部"><svg class="mk" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="#fff" d="M5 20v-7l1.6-1.6V7.5h2.2v2.5h1.4V7.5h1.8V10h1.4V7.5h2.2v3.9l1.6 1.6v7h-4v-3a2.3 2.3 0 0 0-4.6 0v3z"/></svg><span>${C.META.title}</span><small>4 日游</small></a>
  <nav class="tnav" aria-label="章节">${nav.map(([id, n]) => `<a href="#${id}" data-nav="${id}">${n}</a>`).join('')}</nav>
  <div class="tools">
    <button class="tbtn" id="btn-aa" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="pop-aa" title="文字大小与朗读速度"><span>A<span class="sm">a</span></span><span class="sr">文字大小</span></button>
    <button class="tbtn" id="btn-read" type="button" title="朗读当前章节" aria-label="朗读当前章节">${ico('speaker')}</button>
    <button class="tbtn" id="btn-theme" type="button" title="深色 / 浅色" aria-label="切换深色或浅色">${ico('moon', { cls: 'i-moon' })}${ico('sun', { cls: 'i-sun' })}</button>
    <button class="tbtn" id="btn-all" type="button" title="展开或收起全部" aria-label="展开或收起全部">${ico('expand')}</button>
  </div>
  <div class="progress" aria-hidden="true"><i id="progress"></i></div>
</header>
<div class="pop" id="pop-aa" role="dialog" aria-label="阅读设置" hidden>
  <div class="pop-t">文字大小<output id="fs-out">100%</output></div>
  <div class="fs-row"><button type="button" data-fs="-" aria-label="缩小">A−</button><input type="range" id="fs-range" min="85" max="170" step="5" aria-label="文字大小"><button type="button" data-fs="+" aria-label="放大">A+</button></div>
  <div class="fs-presets"><button type="button" data-fsv="90">小</button><button type="button" data-fsv="100">标准</button><button type="button" data-fsv="125">大</button><button type="button" data-fsv="150">特大</button></div>
  <div class="pop-t">朗读速度<output id="rate-out">1.0×</output></div>
  <input type="range" id="rate-range" min="0.6" max="1.6" step="0.1" aria-label="朗读速度">
</div>
<nav class="sidetabs" aria-label="章节">${nav.map(([id, n, , c]) => `<a class="stab" href="#${id}" data-nav="${id}" style="--tc:${c}">${n}</a>`).join('')}</nav>
<nav class="botnav" aria-label="章节" style="--navn:${nav.length}">${nav.map(([id, n, i, c]) => `<a href="#${id}" data-nav="${id}" style="--tc:${c}">${ico(i)}<span>${n}</span></a>`).join('')}</nav>
<div class="player" id="player" role="region" aria-label="朗读控制" hidden>
  <div class="pl-btns"><button type="button" id="pl-prev" aria-label="上一段">${ico('prev', { fill: true })}</button><button type="button" id="pl-play" class="main" aria-label="暂停">${ico('pause', { fill: true })}</button><button type="button" id="pl-next" aria-label="下一段">${ico('next', { fill: true })}</button></div>
  <div class="pl-txt"><b>正在朗读</b><span id="pl-text">…</span></div>
  <div class="pl-r"><select id="pl-voice" aria-label="选择声音" hidden></select><button type="button" class="x" id="pl-stop" aria-label="停止并关闭">${ico('close')}</button></div>
</div>
<button class="totop" id="totop" type="button" aria-label="回到顶部">${ico('top')}</button>`;

// falling sparks (reuses the hero's falling-petal effect, in firework colours)
const fxSparks = (n) => {
  let r = 7;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, () => `<i style="--x:${(rnd() * 100).toFixed(1)}%;--s:${(6 + rnd() * 8).toFixed(0)}px;--d:${(9 + rnd() * 9).toFixed(1)}s;--dl:-${(rnd() * 14).toFixed(1)}s;--dx:${(rnd() * 160 - 80).toFixed(0)}px;--fc:${['#ffd88a', '#f0a5c0', '#9ad0f0', '#fff3c8'][Math.floor(rnd() * 4)]}"></i>`).join('');
};
function heroArt() {
  for (const ext of Object.keys(MIME)) {
    const f = path.join(artDir, `hero.${ext}`);
    if (fs.existsSync(f)) return `<img class="art" src="data:${MIME[ext]};base64,${fs.readFileSync(f).toString('base64')}" alt="手绘横幅插画">`;
  }
  missingArt.push('hero');
  return scene('hero');
}
const hero = `<section class="hero" id="top">
  <div class="hero-art">${heroArt()}<div class="fx" aria-hidden="true">${fxSparks(14)}</div></div>
  <div class="wrap hero-card"><div class="cover rv in">
    <p class="kick">旅行指南 · ${C.META.cn} 更新</p>
    <h1><span>天使之城</span><span class="b">四日</span></h1>
    <p class="sub">${C.META.hero}</p>
    <p class="lead say">${C.META.dates} · ${C.META.tag}</p>
    <ul class="chips"><li>4 天</li><li>3 晚</li><li>2 个乐园</li><li>1 间房</li></ul>
    <div class="cta"><a class="btn pri" href="#route">直接看行程</a><a class="btn" href="#p-assume" data-open="p-assume">先看待确认事项</a></div>
  </div></div>
</section>`;

const foot = () => `<footer>
  <div class="wrap">
    <h3>来源与说明</h3>
    <p>营业时间、价格、开放日期和票务规则变化很快。本页内容按 ${C.META.cn}能查到的公开信息整理,<b>出发前请再看一次官方页面,或打电话确认</b>。带「(估)」「以官网为准」字样的信息未经官方核实。</p>
    <div class="src">${C.SOURCES.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${n}</a>`).join('')}</div>
    <p>地图为示意图,非严格比例;卡片封面为手绘插画(Sonnet 5.5 绘制;未交付前用程序生成的占位插画,只是示意,不代表实际样貌)。</p>
    <p class="stamp">页面构建于 ${STAMP}</p>
    ${usedPhotos.size ? `<details class="ph-box"><summary>图片来源与版权说明<small>(点击展开)</small></summary>
      <p>页面里的真实照片来自 Wikimedia Commons,按各自的授权署名(CC BY / CC BY-SA / CC0 / 公有领域)。这是自用的旅行指南,请不要用于商业用途。</p>
      <ul class="ph-credits">${[...usedPhotos].map((k) => { const p = PHOTOS[k]; return `<li>${esc(p.alt)} · ${esc(p.author)} · <a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a> · <a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.license)}</a></li>`; }).join('')}</ul></details>` : ''}
  </div>
</footer>`;

// build the body first: it registers which photos are used (covers, credits) before the footer is written
const bodyMain = `<main id="main">
${hero}
<div class="wrap" id="overview">${glance()}${stats()}${assumptions()}${status()}</div>
${mapSection()}
${chDisney()}
${chRoute()}
${chSights()}
${chPlan()}
</main>`;
const bodyFoot = foot();
const html = `${head()}
<body data-page="la">
${SHARED_DEFS}
${topbar}
${bodyMain}
${bodyFoot}
<style id="photos">${[...coverCss.values()].join('')}</style>
<script>${js}</script>
</body>
</html>`;

const out = path.join(root, '..', 'la.html');
fs.writeFileSync(out, linkify(fwHtml(html)));
console.log('wrote', out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB;', usedPhotos.size, 'photos');
if (missingScenes.size) console.warn('missing scenes (fallback used):', [...missingScenes].join(', '));
if (missingArt.length) console.warn('hand-drawn art still pending (placeholder used):', missingArt.join(', '));
