// Writes a scratch HTML gallery of every New England scene, the route map and every food icon.
//   node src/ne/preview-art.mjs [--only=boston,beacon] [--out=/path/file.html]
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SHARED_DEFS } from '../art.mjs';
import { scenes, neMap } from './scenes.mjs';
import { NE_FOODS, food } from './food-icons.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').slice(k.length + 3) || d;
const out = arg('out', '/tmp/claude-0/-root-my-trip/afd56109-85ee-4242-8114-c47d8d456023/scratchpad/ne-art-preview.html');
const only = arg('only', '').split(',').filter(Boolean);
const css = fs.readFileSync(path.join(here, '..', 'style.css'), 'utf8');

let n = 0;
const keys = Object.keys(scenes).filter((k) => !only.length || only.includes(k));
const cards = keys
  .map((k) => {
    const svg = scenes[k](`p${n++}-`);
    return `<figure><div class="pic">${svg}</div><figcaption>${k} <small>${(svg.length / 1024).toFixed(1)} KB</small></figcaption></figure>`;
  })
  .join('');
const map = !only.length || only.includes('map') ? neMap() : null;
const icons = !only.length || only.includes('icons')
  ? Object.keys(NE_FOODS).map((k) => `<div class="ic1">${food(k)}<span>${k}</span></div>`).join('')
  : '';

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  `<!doctype html><html lang="en" data-theme="${arg('theme', 'light')}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>NE art preview</title><style>${css}
body{padding:16px}h2{margin:18px 0 8px}
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(${arg('min', '420')}px),1fr);gap:14px}
figure{margin:0}.pic{position:relative;aspect-ratio:16/9;overflow:hidden;border-radius:8px}.pic svg.art{position:absolute;inset:0;width:100%;height:100%}
figcaption{font:600 13px/1.4 system-ui;padding:4px 2px}figcaption small{opacity:.6;font-weight:400}
.icons{display:grid;grid-template-columns:repeat(auto-fill,minmax(112px,1fr));gap:10px}.ic1{text-align:center;font:12px system-ui;background:var(--card);padding:8px;border-radius:8px}.ic1 svg{width:96px;height:96px}
.mapbox svg.sea-map{min-width:0}
</style></head><body>${SHARED_DEFS}<h2>Scenes (${keys.length})</h2><div class="grid">${cards}</div>${map ? `<h2>Route map</h2><div class="mapbox" id="mapbox">${map.svg}</div>` : ''}${icons ? `<h2>Food icons</h2><div class="icons">${icons}</div>` : ''}</body></html>`
);
console.log('wrote', out, `(${keys.length} scenes)`);
