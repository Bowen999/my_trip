// Fetch CC-licensed photos from Wikimedia Commons for the LA page cards.
//   node src/la/photo-fetch.mjs           fetch every missing key
//   node src/la/photo-fetch.mjs castle    fetch only that key
// Writes images/la/<key>.jpg (≤1400 px) + images/la/cover/<key>.jpg (760 px, via ffmpeg) and
// prints a photos.mjs entry per key (author / licence / source read from the Commons file page).
// Review the picks afterwards: the script takes the first result that is a JPEG, ≥1200 px wide,
// and under CC0 / public domain / CC BY / CC BY-SA; re-run a key after deleting its file to re-pick.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const imgDir = path.join(here, '..', '..', 'images', 'la');
const coverDir = path.join(imgDir, 'cover');
fs.mkdirSync(coverDir, { recursive: true });

/* key → [Commons search query, 中文 alt] */
const KEYS = {
  innout: ['In-N-Out Burger restaurant', 'In-N-Out 的汉堡与薯条'],
  lax: ['Los Angeles International Airport Theme Building', 'LAX 机场的 Theme Building'],
  castle: ['Sleeping Beauty Castle Disneyland', '迪士尼乐园的睡美人城堡'],
  carsland: ['Radiator Springs Racers', '加州冒险乐园汽车总动员赛车的峡谷造景'],
  galaxysedge: ["Star Wars Galaxy's Edge Disneyland", '星球大战银河边缘园区的千年隼'],
  hollywoodsign: ['Hollywood Sign', '好莱坞标志'],
  tcl: ['TCL Chinese Theatre', 'TCL 中国剧院'],
  rodeodrive: ['Rodeo Drive Beverly Hills', '比弗利山庄罗迪欧大道'],
  getty: ['Getty Center courtyard travertine', 'Getty Center 的白色石灰岩庭院'],
  soarin: ["Soarin' Over California", '飞跃地平线的球幕'],
  avengers: ['Avengers Campus Disney California Adventure', '复仇者联盟园区'],
  pixarpier: ['Pixar Pier', '皮克斯码头的摩天轮'],
  bigthunder: ['Big Thunder Mountain Railroad Disneyland', '大雷山铁路'],
  pirates: ['Pirates of the Caribbean Disneyland', '加勒比海盗:舱内的骷髅宝藏'],
  haunted: ['Haunted Mansion Disneyland', '鬼屋外观'],
  indy: ['Indiana Jones Adventure Temple of the Forbidden Eye entrance', '印第安纳琼斯神庙入口'],
  spacemountain: ['Space Mountain Disneyland', '太空山外观'],
  toontown: ["Mickey's Toontown Disneyland", '米奇卡通城'],
  usc: ['Doheny Library USC campus', 'USC 的 Doheny 图书馆(复古明信片)'],
  walkoffame: ['Hollywood Walk of Fame', '好莱坞星光大道'],
};

const OK_LICENSE = /^(cc0|public domain|cc by( |-sa)?[ -])/i;
const API = 'https://commons.wikimedia.org/w/api.php';
const UA = { 'User-Agent': 'my-trip-la-page/1.0 (personal travel guide; contact via github)' };

const stripHtml = (s) => (s || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function search(query) {
  const u = `${API}?action=query&format=json&prop=imageinfo&iiprop=url%7Cextmetadata%7Csize%7Cmime&iiurlwidth=1400&generator=search&gsrnamespace=6&gsrlimit=12&gsrsearch=${encodeURIComponent(query)}`;
  for (let attempt = 0; ; attempt++) {
    const r = await fetch(u, { headers: UA });
    if (r.status === 429 && attempt < 5) { await sleep(4000 * (attempt + 1)); continue; }
    if (!r.ok) throw new Error(`search ${r.status}`);
    const j = await r.json();
    return Object.values(j.query?.pages || {}).sort((a, b) => a.index - b.index);
  }
}

function pick(pages) {
  for (const p of pages) {
    const ii = p.imageinfo?.[0];
    if (!ii || ii.mime !== 'image/jpeg' || ii.width < 1200) continue;
    const lic = stripHtml(ii.extmetadata?.LicenseShortName?.value);
    if (!OK_LICENSE.test(lic)) continue;
    return { p, ii, lic };
  }
  return null;
}

function esc(s) { return JSON.stringify(s); }

const only = process.argv[2];
const entries = [];
for (const [key, [query, alt]] of Object.entries(KEYS)) {
  if (only && key !== only) continue;
  await sleep(1200);
  const file = path.join(imgDir, `${key}.jpg`);
  try {
    const pages = await search(query);
    const hit = pick(pages);
    if (!hit) { console.log(`!! ${key}: no usable result for "${query}"`); continue; }
    const { p, ii, lic } = hit;
    if (!fs.existsSync(file)) {
      const img = await fetch(ii.thumburl || ii.url, { headers: UA });
      if (!img.ok) throw new Error(`download ${img.status}`);
      fs.writeFileSync(file, Buffer.from(await img.arrayBuffer()));
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', file, '-vf', 'scale=760:-2', '-q:v', '4', path.join(coverDir, `${key}.jpg`)]);
    }
    const author = stripHtml(ii.extmetadata?.Artist?.value) || 'Wikimedia Commons';
    const licUrl = ii.extmetadata?.LicenseUrl?.value || '';
    const title = p.title.replace(/^File:/, '');
    entries.push(`  ${JSON.stringify(key)}: {\n    "file": ${esc(key + '.jpg')},\n    "alt": ${esc(alt)},\n    "author": ${esc(author)},\n    "license": ${esc(lic)},\n    "licenseUrl": ${esc(licUrl)},\n    "sourceUrl": ${esc('https://commons.wikimedia.org/wiki/File:' + encodeURIComponent(title))},\n    "title": ${esc(title)}\n  },`);
    console.log(`ok ${key}: ${title} (${lic}, ${author})`);
  } catch (e) {
    console.log(`!! ${key}: ${e.message}`);
  }
}
console.log('\n// paste into src/la/photos.mjs:\nexport const PHOTOS = {\n' + entries.join('\n') + '\n};');
