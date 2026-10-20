// Build the Singapore · KL · Bali guide:  node src/sea/build.mjs  →  singapore-malaysia-bali.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scenes, seaMap, nsInset } from './scenes.mjs';
import { SHARED_DEFS } from '../art.mjs';
import * as C from './content.mjs';
import { PHOTOS } from './photos.mjs';
import { ico, food } from '../icons.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');

/* Chinese typography: ASCII punctuation in running text → full-width (keep 1,000 and 16:00; skip <pre>). */
const FW = { ',': '，', ';': '；', ':': '：', '?': '？', '!': '！', '(': '（', ')': '）' };
const CJK = /[\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]/;
function fwText(t) {
  t = t.replace(/&(#?\w+);/g, '\u0001$1\u0002');
  // convert only when Chinese text is within 12 characters; keep English addresses / numbers as they are
  t = t.replace(/[,;:?!()]/g, (c, i, str) => {
    if ((c === ',' || c === ':') && /\d/.test(str[i - 1] || '') && /\d/.test(str[i + 1] || '')) return c;
    return CJK.test(str.slice(Math.max(0, i - 12), i + 13)) ? FW[c] : c;
  });
  return t.replace(/\u0001(#?\w+)\u0002/g, '&$1;');
}
const fwHtml = (h) => h.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<pre[\s\S]*?<\/pre>|<[^>]*>)/).map((t, i) => (i % 2 ? t : fwText(t))).join('');
const fwJs = (j) => j.replace(/'([^'\\\n]*[一-鿿][^'\\\n]*)'/g, (m, a) => `'${fwText(a)}'`);
const js = fwJs(fs.readFileSync(path.join(root, 'app.js'), 'utf8')) + '\n' + fwJs(fs.readFileSync(path.join(here, 'app-sea.js'), 'utf8'));

let uidN = 0;
const scene = (key, ...a) => {
  const fn = scenes[key];
  if (!fn) throw new Error('scene ' + key);
  return fn(`u${uidN++}-`, ...a);
};
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/* ---------- real photos (Wikimedia Commons, credited) ---------- */
// Files live in images/sea/ next to the HTML. If one fails to load, the drawn illustration underneath stays visible.
const usedPhotos = new Set();
const ph = (k) => (k && PHOTOS[k] && fs.existsSync(path.join(root, '..', 'images', 'sea', PHOTOS[k].file)) ? PHOTOS[k] : null);
const phSrc = (p) => `images/sea/${p.file}`;
const phCredit = (p) => `照片:${esc(p.alt)} · ${esc(p.author)} · <a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.license)}</a>(${esc(p.from || 'Wikimedia Commons')})`;
function phBanner(k) {
  const p = ph(k);
  if (!p) return '';
  usedPhotos.add(k);
  // covers load eagerly; app-sea.js hides the drawn art (.ph-ok) only after the photo has decoded; if it fails, the art stays
  return `<img class="photo" src="${phSrc(p)}" alt="${esc(p.alt)}" onerror="this.remove()">`;
}
function phGallery(keys = []) {
  const figs = keys.map((k) => {
    const p = ph(k);
    if (!p) return '';
    usedPhotos.add(k);
    return `<figure class="ph"><img src="${phSrc(p)}" alt="${esc(p.alt)}" loading="lazy" decoding="async" onerror="this.closest('figure').remove()"><figcaption>${phCredit(p)}</figcaption></figure>`;
  }).join('');
  return figs ? `<div class="ph-row nosay">${figs}</div>` : '';
}
const capLine = (k, drawn) => {
  const p = ph(k);
  if (p) return `<p class="cap nosay">封面${phCredit(p)}</p>`;
  return drawn ? `<p class="cap nosay">插图:${drawn}</p>` : '';
};
const PHOTO_CSS = `
.pace.lv1 i.on { background: var(--forest); }
.pace.lv2 i.on { background: var(--gold); }
.pace.lv3 i.on { background: var(--red); }
.lvl { display: inline-flex; align-items: center; gap: 4px; }
.lvl b { font-weight: 800; }
.lvl.lv1 b { color: var(--forest); } .lvl.lv2 b { color: var(--gold); } .lvl.lv3 b { color: var(--red); }
.banner .photo { z-index: 0; }
.banner.ph-ok svg.art { visibility: hidden; }
.day-meta span > span, .day-meta span > b { padding: 0; border: 0; background: none; border-radius: 0; }
/* the fixed side tabs (>= 900px wide) used to sit on top of the right edge of the content on 900–1300px screens */
@media (min-width: 900px) and (max-width: 1300px) { main .wrap, footer .wrap { padding-right: 62px; } }
.banner::after { z-index: 1; }
.ph-row { display: grid; gap: 14px; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); }
.ph { margin: 0; background: var(--paper-2); border: 1px solid var(--rule); }
.ph img { display: block; width: 100%; aspect-ratio: 3 / 2; object-fit: cover; background: var(--paper-2); }
.ph figcaption { padding: 8px 10px; font-size: .72rem; line-height: 1.55; color: var(--ink-3); }
.ph figcaption a, .cap a { color: inherit; }
footer .ph-credits { margin: 6px 0 22px; padding-left: 1.2em; font-size: .78rem; line-height: 1.7; opacity: .9; }
footer .ph-credits li { margin: 2px 0; }
`;

const spk = (target) => `<button class="spk" type="button" data-speak="${target}" aria-label="朗读这一部分" title="朗读这一部分">${ico('speaker')}</button>`;
function sec({ id, no, title, sub = '', body, open = false }) {
  return `<div class="acc sec${open ? ' open' : ''}" id="${id}">
  <h3><button class="acc-h sec-h" type="button" aria-expanded="${open}" aria-controls="${id}-b"><span class="no">${no}</span><span class="t"><span class="lbl">${title}</span>${sub ? `<small>${sub}</small>` : ''}</span>${ico('chevron', { cls: 'chev' })}</button></h3>
  ${spk(id + '-b')}
  <div class="acc-b" id="${id}-b" role="region"><div class="acc-in"><div class="sec-body">${body}</div></div></div>
</div>`;
}
function card({ id, art, photo = '', badge, tags = '', title, en = '', desc = '', body }) {
  return `<article class="acc card" id="${id}">
  <h3><button class="acc-h" type="button" aria-expanded="false" aria-controls="${id}-b">
    <span class="banner">${art}${phBanner(photo)}</span>
    <span class="tag">${tags}</span>
    <span class="ov"><span class="badge" aria-hidden="true">${badge}</span><span class="ov-t"><span class="tt lbl">${title}</span>${en ? `<span class="en nosay">${en}</span>` : ''}${desc ? `<span class="ds">${desc}</span>` : ''}</span>${ico('chevron', { cls: 'chev' })}</span>
  </button></h3>
  ${spk(id + '-b')}
  <div class="acc-b" id="${id}-b" role="region"><div class="acc-in"><div class="card-body">${body}</div></div></div>
</article>`;
}
const box = (cls, label, icon, html) => `<div class="boxout ${cls}"><b class="lbl">${ico(icon)}${label}</b>${html}</div>`;
const RATE = { must: ['must', '必看'], worth: ['', '值得'], opt: ['', '备选'] };
const CTRY = { SG: '新加坡', MY: '马来西亚', ID: '巴厘岛' };
const chead = (id, num, eyebrow, title, intro) => `<div class="ch-head rv"><span class="ch-num" aria-hidden="true">${num}</span><p class="eyebrow">${eyebrow}</p><h2 class="h2" id="${id}-h">${title}</h2>
    <p class="ch-intro say">${intro}</p>
    <div class="ch-tools"><button class="pill" type="button" data-expand="${id}">${ico('expand')}全部展开</button><button class="pill" type="button" data-collapse="${id}">${ico('collapse')}全部收起</button><button class="pill" type="button" data-speak-ch="${id}">${ico('speaker')}朗读本章</button></div></div>`;

/* ---------- reusable widgets ---------- */
function checklist(id, groups, label = '已确认') {
  const total = groups.reduce((a, g) => a + g.i.length, 0);
  return `<div class="ckl" data-ckl="${id}"><div class="packbar"><span>${label} <b data-n>0</b> / <span data-t>${total}</span></span><span class="bar"><i data-bar></i></span><button class="pill" type="button" data-reset>清空</button></div>
  <div class="pack">${groups.map((g, gi) => `<div class="pk"><h4>${g.g}</h4>${g.i.map((x, xi) => `<label class="ck"><input type="checkbox" data-k="${gi}-${xi}"><span>${x}</span></label>`).join('')}</div>`).join('')}</div></div>`;
}
const mail = (id, title, text) => `<div class="mailbox nosay"><div class="mb-h"><b>${ico('mail')}${title}</b><button class="pill" type="button" data-copy="${id}">${ico('copy')}复制</button></div><pre id="${id}">${esc(text)}</pre></div>`;
// intensity: three levels (轻松 / 中等 / 高强度); the data keeps a 1–5 effort score: 1–2 → 轻松, 3 → 中等, 4–5 → 高强度
const LEVELS = ['轻松', '中等', '高强度'];
const levelOf = (n) => (n <= 2 ? 1 : n === 3 ? 2 : 3);
const meter = (l) => `<span class="pace lv${l}" role="img" aria-label="强度:${LEVELS[l - 1]}">${[1, 2, 3].map((i) => `<i class="${i <= l ? 'on' : ''}"></i>`).join('')}</span>`;
const intensity = (n) => { const l = levelOf(n); return `<span class="lvl lv${l}">强度 ${meter(l)}<b>${LEVELS[l - 1]}</b></span>`; };
const kvl = (rows) => `<dl class="kvl">${rows.map(([k, v]) => `<div class="kv say"><dt class="lbl">${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`;

/* ---------- overview ---------- */
function glance() {
  const g = [
    ['route', 'var(--red)', '路线', C.ROUTE_NOTE.shape],
    ['clock', 'var(--gold)', '节奏', C.ROUTE_NOTE.pace],
    ['school', 'var(--blue)', '学校', C.ROUTE_NOTE.schools],
    ['plane', 'var(--forest)', '时区', '广州、吉隆坡、新加坡、巴厘岛都是 <b>UTC+8</b>,三段飞行都没有时差。'],
  ];
  return `<div class="glance">${g.map(([i, c, t, p]) => `<div class="gl rv" style="--g:${c}">${ico(i)}<h3>${t}</h3><p>${p}</p></div>`).join('')}</div>`;
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
  const m = seaMap();
  const CHIP = ['广州', '抵吉隆坡', '老城', '探校', '飞新加坡', '飞巴厘岛', '考察', '自选', '返程'];
  const chips = C.DAYS.map((d) => `<button class="dchip" type="button" data-day="${d.n}" data-title="${d.title}" data-sub="${d.sub}" data-move="${d.move}" data-d="${d.d}" aria-label="第 ${d.n} 天:${d.title}"><b>${d.n}</b><span>${CHIP[d.n - 1]}</span></button>`).join('');
  return `<section class="block wrap" id="map" aria-labelledby="map-h" style="padding-top:clamp(28px,5vw,56px)">
  <div class="rv"><p class="eyebrow" style="--c:var(--gold)">ROUTE AT A GLANCE</p><h2 class="h2" id="map-h" style="margin:6px 0 18px">一张图看完 9 天</h2></div>
  <div class="mapbox rv" id="mapbox">${m.svg}</div><p class="map-hint">地图可左右滑动。</p>
  <div class="days-row rv" role="group" aria-label="选择第几天" style="grid-template-columns:repeat(${C.DAYS.length},1fr)">${chips}</div>
  <div class="daysum" id="daysum" aria-live="polite"><h4>点上面的数字,地图上的飞机会飞过去</h4><p>也可以点地图上的圆点。</p></div>
</section>`;
}

/* ---------- 01 overview of the three places ---------- */
function chCulture() {
  const stats = C.STATS.map((s) => `<div class="stat rv say"><div class="n lbl">${s.t}</div><div class="l lbl">${s.l}</div><div class="s">${s.s}</div></div>`).join('');
  const tabs = ['my', 'sg', 'id'].map((k) => [k, C.COUNTRIES[k]]); // route order: KL → Singapore → Bali
  const ctr = `<div data-tabs><div class="seg" role="tablist" aria-label="选择国家">${tabs.map(([k, v], i) => `<button role="tab" aria-selected="${i === 0}" data-tab="${k}">${v.n}</button>`).join('')}</div>
    ${tabs.map(([k, v], i) => `<div class="panel prov" data-panel="${k}"${i ? ' hidden' : ''} style="margin-top:16px"><div class="pic">${scene(v.scene)}</div><table class="cmp"><caption class="sr">${v.n}</caption>${v.rows.map(([a, b]) => `<tr><th scope="row" class="lbl">${a}</th><td>${b}</td></tr>`).join('')}</table></div>`).join('')}</div>`;
  const flips = `<div class="flips">${C.CULTURE.map((c) => `<button class="flip rv say" type="button" aria-pressed="false"><span class="flip-in"><span class="fc f">${ico(c.ico)}<span class="k lbl">${c.k}</span><span class="s">${c.s}</span><span class="hint nosay">点击翻面 ↻</span></span><span class="fc b">${c.back.map((t) => `<span class="bp">${t}</span>`).join('')}</span></span></button>`).join('')}</div>`;
  const foods = `<div class="foods">${C.FOODS.map((f) => `<div class="food rv">${food(f.i)}<div><h4>${f.n}<span class="${f.w.toLowerCase()}">${{ SG: '新加坡', MY: '马来西亚', ID: '巴厘岛' }[f.w]}</span></h4><p>${f.d}</p></div></div>`).join('')}</div>`;
  const manners = `<dl class="manners">${C.MANNERS.map(([k, v]) => `<div class="kv say"><dt class="lbl">${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  <div class="calcs" style="margin-top:6px">${cur3()}</div>`;
  const clocks = `<div class="clocks">${[['gz', '广州', 'Asia/Shanghai'], ['kl', '吉隆坡', 'Asia/Kuala_Lumpur'], ['sg', '新加坡', 'Asia/Singapore'], ['bali', '巴厘岛', 'Asia/Makassar']].map(([k, n, tz]) => `<div class="clk" data-tz="${tz}" data-k="${k}"${k === 'gz' ? ' data-base="基准"' : ''}><div class="z">${n}</div><div class="tm">--:--</div><div class="dt">&nbsp;</div><div class="df">&nbsp;</div></div>`).join('')}</div>
  <p class="note say">四个城市的时钟一模一样:全程<b>没有时差</b>。巴厘岛属于印尼中部时间(WITA),与新加坡、吉隆坡同为 UTC+8。</p>`;
  return `<section class="block wrap ch-culture" id="culture" aria-labelledby="culture-h">
  ${chead('culture', '01', 'PART ONE · THREE PLACES', '三地速览', '先花十分钟,把三个地方的钱、电、规矩和入境要求弄清楚。后面的行程会好懂很多。')}
  <div class="stats rv" style="margin-bottom:18px">${stats}</div>
  ${sec({ id: 'c-ctry', no: '1.1', title: '三个国家一页看', sub: '点标签切换', body: ctr, open: true })}
  ${sec({ id: 'c-cul', no: '1.2', title: '六个文化关键词', sub: '点卡片翻面', body: flips })}
  ${sec({ id: 'c-food', no: '1.3', title: '吃什么', sub: '十样值得一试的味道', body: foods })}
  ${sec({ id: 'c-man', no: '1.4', title: '钱、电、网、水与急救', sub: '含三种货币换算器', body: manners })}
  ${sec({ id: 'c-time', no: '1.5', title: '时差', sub: '实时时钟', body: clocks })}
</section>`;
}
function cur3() {
  return `<div class="calc" id="cur3"><h4>${ico('wallet')}三种货币换算</h4>
  <div class="fld"><label for="r-sgd">1 新加坡元 = ? 人民币</label><input id="r-sgd" type="number" inputmode="decimal" step="0.001" min="0" placeholder="当天汇率"></div>
  <div class="fld"><label for="r-myr">1 马来西亚林吉特 = ? 人民币</label><input id="r-myr" type="number" inputmode="decimal" step="0.001" min="0" placeholder="当天汇率"></div>
  <div class="fld"><label for="r-idr">1 万印尼盾 = ? 人民币</label><input id="r-idr" type="number" inputmode="decimal" step="0.001" min="0" placeholder="当天汇率"></div>
  <div class="fld"><label>选择币种</label><div class="chipsel" id="c3-cur"><button type="button" class="on" data-c="sgd">新元 SGD</button><button type="button" data-c="myr">令吉 MYR</button><button type="button" data-c="idr">印尼盾 IDR</button></div></div>
  <div class="fld"><label for="c3-loc" id="c3-lab">新加坡元</label><input id="c3-loc" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0"></div>
  <div class="fld"><label for="c3-cny">人民币</label><input id="c3-cny" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0"></div>
  <p class="note">页面不内置汇率(会过时)。出发前查银行或支付软件的实时汇率,填进来即可,下次打开会记住。</p></div>`;
}

/* ---------- 02 route + sights ---------- */
function dayBody(d) {
  return `<div class="dday">
  ${capLine(d.photo, '')}
  <div class="day-meta"><span>${ico('cal')}${d.d}</span><span>${ico('pin')}${d.area}</span><span>${ico(d.plane ? 'plane' : 'car')}${d.move}</span><span class="nosay">${intensity(d.pace)}</span>${d.tags.map((t) => `<span>${t}</span>`).join('')}</div>
  ${phGallery(d.gallery)}
  <ol class="tl">${d.steps.map(([t, x]) => `<li class="tl-i say"><span class="tl-t lbl">${t}</span><div class="tl-x">${x}</div></li>`).join('')}</ol>
  <div class="dgrid"><div class="dbox"><b class="l lbl">${ico('eat')}吃</b>${d.eat}</div><div class="dbox"><b class="l lbl">${ico('bed')}住</b>${d.stay}</div></div>
  ${box('warn', '小心', 'warn', d.warn)}
  ${box('alt', '备选方案', 'shuffle', d.alt)}
  ${box('fun', '有意思', 'info', d.fun)}
  </div>`;
}
function sightBody(s) {
  const f = s.facts;
  return `<div class="sx"><div class="sx-main">
    ${capLine(s.photo, s.cap)}
    <p class="lead say">${s.blurb}</p>
    ${phGallery(s.gallery)}
    <ul class="pts">${s.pts.map((p) => `<li>${p}</li>`).join('')}</ul>
    ${s.news ? box('news', '最新', 'info', s.news) : ''}
    ${box('tip', '小贴士', 'check', s.tip)}
    ${box('fun', '有意思', 'info', s.fun)}
  </div>
  <aside class="infobox"><h4>实用信息</h4>
    <div class="kv say"><dt class="lbl">耗时</dt><dd>${f.time}</dd></div>
    <div class="kv say"><dt class="lbl">最佳时间</dt><dd>${f.when}</dd></div>
    <div class="kv say"><dt class="lbl">费用</dt><dd>${f.cost}</dd></div>
    <div class="kv say"><dt class="lbl">怎么去</dt><dd>${f.how}</dd></div>
  </aside></div>`;
}
function chRoute() {
  const days = C.DAYS.map((d) => card({ id: `d${d.n}`, art: scene(d.scene), photo: d.photo, badge: d.n, tags: `<span>DAY ${d.n} · ${d.d}</span>`, title: d.title, desc: d.sub, body: dayBody(d) })).join('');
  const sights = C.SIGHTS.map((s) => {
    const [rc, rl] = RATE[s.r];
    return card({ id: `s-${s.id}`, art: scene(s.scene), photo: s.photo, badge: s.n, tags: `<span>${CTRY[s.c]}</span><span class="${rc}">${rc ? ico('star', { fill: true }) : ''}${rl}</span>`, title: s.name, en: s.en, body: sightBody(s) });
  }).join('');
  return `<section class="block wrap ch-route" id="route" aria-labelledby="route-h">
  ${chead('route', '02', 'PART TWO · 9-DAY ITINERARY', '9 日行程', '每天一张卡:按小时排的时间线、吃住、容易踩的坑和备选方案。「强度」分轻松、中等、高强度三档,是体力消耗的参考。卡片头图优先用真实照片,没有照片的用手绘插画。下面还有沿途 9 个景点的小卡片。')}
  <div class="legend rv nosay"><span>强度:</span>${meter(1)} 轻松 ${meter(2)} 中等 ${meter(3)} 高强度</div>
  ${days}
  <h3 class="sub-h">沿途景点 <small>Sights</small></h3>
  ${sights}
</section>`;
}

/* ---------- 03 schools ---------- */
function chSchools() {
  const cards = C.SCHOOLS.map((s) =>
    card({
      id: `sc-${s.id}`, art: scene(s.scene), photo: s.photo, badge: s.n, tags: `<span>${s.when}</span>`, title: s.name, en: s.en,
      body: `<div class="dday">${capLine(s.photo, s.cap)}<p class="lead say">${s.blurb}</p>${kvl(s.facts)}${box('news', '备注', 'info', s.note)}</div>`,
    })
  ).join('');
  const steps = `<ol class="steps say">
    <li><b class="lbl">先发邮件</b>下面有英文模板。每所学校发一封,写明日期、人数、孩子年级和想问的事。</li>
    <li><b class="lbl">等回复</b>学校通常工作日回复。1–2 周没回,再发一封,或用官网的在线表单。</li>
    <li><b class="lbl">定顺序</b>三所都放在 D4(1/27 周三)一天:Epsom 09:00 → Adcote Matrix 11:00 → Seremban 午饭 13:00 → KTJ 15:00,每所约 90 分钟。要请三所都给出这一天的具体时段;约不到就先舍掉最远的 KTJ,再订包车。</li>
    <li><b class="lbl">出发前一周</b>再确认一次时间和地点,让孩子把想问的问题写在小本子上。</li></ol>`;
  return `<section class="block wrap ch-school" id="schools" aria-labelledby="schools-h">
  ${chead('schools', '03', 'PART THREE · SCHOOL VISITS', '森美兰探校', '三所学校都在森美兰州,排在 1 月 27 日(周三)一天走完:每所约 90 分钟,校园参观 + 招生咨询。真正要花功夫的是预约,所以这一章先教你怎么约、怎么问。')}
  <div class="rv"><h3 class="sub-h" style="margin-top:0">位置与车程 <small>Map</small></h3><div class="mapbox ns" id="nsbox">${nsInset()}</div></div>
  <h3 class="sub-h">三所学校 <small>Schools</small></h3>
  ${cards}
  ${sec({ id: 'sc-how', no: '3.1', title: '怎么预约', sub: '四步走', body: steps + mail('mail-school', '邮件模板(英文)', C.MAIL_SCHOOL), open: true })}
  ${sec({ id: 'sc-ask', no: '3.2', title: '探校提问清单', sub: '可勾选,会记住', body: checklist('school', C.SCHOOL_CHECK, '已问到') })}
  ${sec({ id: 'sc-docs', no: '3.3', title: '要带的东西', sub: '', body: `<ul class="pts say">${C.SCHOOL_DOCS.map((x) => `<li>${x}</li>`).join('')}</ul>` })}
</section>`;
}

/* ---------- 04 wedding ---------- */
function dm() {
  const cols = ['alila', 'tirtha', 'other'];
  const head = `<tr><th>评分项</th><th>权重</th><th>Alila Villas Uluwatu</th><th>Tirtha Uluwatu</th><th><input class="dm-name" type="text" value="候选 3" aria-label="候选 3 的名称" maxlength="24"></th></tr>`;
  const sel = (cls, extra, max, def) => `<select class="${cls}" ${extra} aria-label="评分">${Array.from({ length: max + 1 }, (_, i) => `<option value="${i}"${i === def ? ' selected' : ''}>${i === 0 && max === 5 ? '–' : i}</option>`).join('')}</select>`;
  const rows = C.DM_CRITERIA.map(([n, w], r) => `<tr data-r="${r}"><th scope="row">${n}</th><td>${sel('dm-w', `data-r="${r}"`, 3, w)}</td>${cols.map((c) => `<td>${sel('dm-s', `data-r="${r}" data-c="${c}"`, 5, 0)}</td>`).join('')}</tr>`).join('');
  const tot = `<tr class="tot"><th scope="row">加权总分</th><td></td>${cols.map((c) => `<td><b class="dm-t" data-c="${c}">0</b><span class="dm-bar"><i data-c="${c}"></i></span></td>`).join('')}</tr>`;
  return `<div class="dm" id="dm"><p class="note" style="margin-bottom:8px">考察完当场打分:每项 1–5 分,「–」表示还没打分,按 0 分计。权重可调,总分满分 100。会记住你的打分。</p><div class="dm-wrap"><table class="dmt"><thead>${head}</thead><tbody>${rows}${tot}</tbody></table></div><div class="ch-tools" style="margin-top:10px"><button class="pill" type="button" id="dm-reset">${ico('collapse')}清空打分</button></div></div>`;
}
function rainWidget() {
  const q = '<ul class="pts"><li>仪式在哪里改?有顶的位置能不能容下全部宾客?</li><li>谁在什么时候决定「改室内」?有没有书面的时间点?</li><li>改期和退款规则是什么?</li></ul>';
  return `<div class="rain-wrap"><div class="rain-stage" id="rain-stage">${scene('tirtha')}<div class="rain-fx" id="rain-fx" aria-hidden="true"></div></div>
  <div class="rain-bar"><button class="pill" type="button" id="rain-btn" aria-pressed="false">${ico('rain')}下雨模式</button><span class="note">1 月是雨季:雨多为短阵雨,午后和傍晚更常见。</span></div>
  <div class="rain-note" id="rain-note" hidden>${box('warn', '下雨时要问的三件事', 'umbrella', q)}</div></div>`;
}
function chWedding() {
  const hotels = C.HOTELS.map((h, i) =>
    card({
      id: `w-${h.id}`, art: scene(h.scene), photo: h.photo, badge: i + 1, tags: `<span>${h.when}</span>`, title: h.name, en: h.en,
      body: `<div class="dday">${capLine(h.photo, h.cap)}<p class="lead say">${h.blurb}</p>${kvl(h.facts)}${box('news', '要问清', 'info', h.note)}</div>`,
    })
  ).join('');
  const more = `<ul class="pts say">${C.HOTEL_MORE.map(([a, b]) => `<li><b>${a}</b>:${b}</li>`).join('')}</ul>`;
  return `<section class="block wrap ch-wedding" id="wedding" aria-labelledby="wedding-h">
  ${chead('wedding', '04', 'PART FOUR · WEDDING VENUES', '巴厘岛婚礼酒店考察', '你们已有两家候选,都在 Pecatu / 乌鲁瓦图,第 7 天(1/30 周六)一天就能看完;周六可能有真实婚礼,1/31 当备选日。这一章给你对比、考察清单和打分表,当场用。')}
  <h3 class="sub-h" style="margin-top:0">两家候选 <small>Candidates</small></h3>
  ${hotels}
  ${sec({ id: 'w-rain', no: '4.1', title: '雨季怎么办', sub: '点按钮,看看下雨天的样子', body: rainWidget(), open: true })}
  ${sec({ id: 'w-more', no: '4.2', title: '其他可以顺路加看的场地', sub: '来源为婚礼博客,未核实', body: more })}
  ${sec({ id: 'w-ask', no: '4.3', title: '考察清单', sub: '可勾选,会记住', body: checklist('wedding', C.WED_CHECK, '已问到') })}
  ${sec({ id: 'w-dm', no: '4.4', title: '当场打分表', sub: '帮你们做决定', body: dm() })}
  ${sec({ id: 'w-mail', no: '4.5', title: '考察邮件模板', sub: '发给两家的婚礼团队', body: mail('mail-wed', '邮件模板(英文)', C.MAIL_WED) })}
</section>`;
}

/* ---------- 05 plan ---------- */
function chPlan() {
  const timeline = `<div class="when-line">${C.TIMELINE.map(([a, b]) => `<div class="wl say"><b class="lbl">${a}</b><p>${b}</p></div>`).join('')}</div>`;
  const flights = `<table class="price"><caption class="sr">飞行安排</caption>${C.FLIGHTS.map(([a, b, c]) => `<tr class="say"><td class="lbl">${a}</td><td>${b}</td><td>${c}</td></tr>`).join('')}</table>
  <p class="note" style="margin-top:10px">返程不在本页规划。航班时刻和航司会变,以出票信息为准;7 人尽量订在同一订单,方便改签。</p>`;
  return `<section class="block wrap ch-plan" id="plan" aria-labelledby="plan-h">
  ${chead('plan', '05', 'PART FIVE · PLAN & PREPARE', '出发前要做的事', '什么时候做什么、航班怎么订、行李里放什么。入境要求在页面顶部的「最新状态」。')}
  ${sec({ id: 'p-time', no: '5.1', title: '倒计时', sub: '从现在开始', body: timeline, open: true })}
  ${sec({ id: 'p-fly', no: '5.2', title: '飞行安排', sub: '参考时长与建议', body: flights })}
  ${sec({ id: 'p-pack', no: '5.3', title: '打包清单', sub: '可勾选,会记住', body: checklist('pack', C.PACK, '已准备') })}
</section>`;
}

/* ---------- shell ---------- */
const nav = [
  ['top', '概览', 'pin', 'var(--ink)'],
  ['culture', '速览', 'people', 'var(--red)'],
  ['route', '行程', 'route', 'var(--gold)'],
  ['schools', '探校', 'school', 'var(--blue)'],
  ['wedding', '婚礼', 'ring', 'var(--rose)'],
  ['plan', '准备', 'list', 'var(--forest)'],
];
const TITLE = '南行九日 · 吉隆坡 新加坡 巴厘岛 9 日行程';
const head = `<!doctype html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#faf7f1">
<title>${TITLE}</title>
<meta name="description" content="吉隆坡、新加坡、巴厘岛 9 日行程:含森美兰学校探校与巴厘岛婚礼酒店考察。${C.META.cn}整理。">
<meta name="robots" content="noindex, nofollow">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='10' fill='%23c8202f'/%3E%3Cpath fill='%23fff' d='M12 5l2 5 5 .5-3.8 3.4 1.2 5L12 16.3 7.6 18.9l1.2-5L5 10.5 10 10z'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap" media="print" onload="this.media='all'">
<style>${css}${PHOTO_CSS}</style>
<script>
(function(){try{var t=localStorage.getItem('yvr7:theme');t=t?JSON.parse(t):(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);var f=localStorage.getItem('yvr7:fs');if(f)document.documentElement.style.setProperty('--fs',JSON.parse(f));}catch(e){}})();
</script>
</head>`;

const topbar = `<a class="skip" href="#main">跳到正文</a>
<header class="topbar" id="topbar">
  <a class="brand" href="#top" aria-label="回到顶部"><svg class="mk" aria-hidden="true"><use href="#i-maple"/></svg><span>南行九日</span><small>7 人团</small></a>
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

const fxPetals = (n) => {
  let r = 7;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, () => `<i style="--x:${(rnd() * 100).toFixed(1)}%;--s:${(8 + rnd() * 10).toFixed(0)}px;--d:${(9 + rnd() * 9).toFixed(1)}s;--dl:-${(rnd() * 14).toFixed(1)}s;--dx:${(rnd() * 160 - 80).toFixed(0)}px;--fc:${['#f4a6c0', '#f7c6d6', '#ffd6a5', '#fff1c4'][Math.floor(rnd() * 4)]}"></i>`).join('');
};
const hero = `<section class="hero" id="top">
  <div class="hero-art">${scenes.hero('hero-')}<div class="fx" aria-hidden="true">${fxPetals(14)}</div></div>
  <div class="wrap hero-card"><div class="cover rv in">
    <p class="kick">Travel Guide · ${C.META.cn} 更新</p>
    <h1><span>南行</span><span class="b">九日</span></h1>
    <p class="sub">吉隆坡 · 新加坡 · 巴厘岛 · 7 人团</p>
    <p class="lead say">${C.META.dates}。为 7 个人设计:4 位长辈、2 位 30 岁、1 位初中生。两件必做的事:森美兰三所学校探校(周三一天走完),巴厘岛婚礼酒店考察(周六)。</p>
    <ul class="chips"><li>9 天</li><li>3 个国家</li><li>3 所学校</li><li>2 家婚礼候选</li></ul>
    <div class="cta"><a class="btn pri" href="#route">直接看行程</a><a class="btn" href="#p-assume" data-open="p-assume">先看待确认事项</a></div>
  </div></div>
</section>`;

const foot = () => `<footer>
  <div class="wrap">
    <h3>来源与说明</h3>
    <p>入境政策、航班时刻、价格、人数和开放时间变化很快。本页内容按 ${C.META.cn}能查到的公开信息整理,<b>出发前请再看一次官方页面</b>。带「第三方」「来源为博客」字样的信息未经官方核实。</p>
    <div class="src">${C.SOURCES.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${n}</a>`).join('')}</div>
    <p>手绘插画为原创绘制(程序生成);学校和酒店的插画只是示意,不代表实际样貌。真实照片大部分来自 Wikimedia Commons(按各自的授权署名);Epsom、KTJ 的校园图取自学校官网,Tirtha 的两张取自 NOW! Bali 的文章,仅供自用。照片文件在 images/sea 文件夹。地图为示意图,非严格比例。</p>
    ${usedPhotos.size ? `<h3 style="margin-top:18px">图片来源</h3><ul class="ph-credits">${[...usedPhotos].map((k) => { const p = PHOTOS[k]; return `<li>${esc(p.alt)}:${esc(p.author)} · <a href="${esc(p.sourceUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.title)}</a> · <a href="${esc(p.licenseUrl)}" target="_blank" rel="noopener noreferrer">${esc(p.license)}</a></li>`; }).join('')}</ul>` : ''}
  </div>
</footer>`;

const html = `${head}
<body data-page="sea">
${SHARED_DEFS}
${topbar}
<main id="main">
${hero}
<div class="wrap" id="overview">${glance()}${assumptions()}${status()}</div>
${mapSection()}
${chCulture()}
${chRoute()}
${chSchools()}
${chWedding()}
${chPlan()}
</main>
${foot()}
<script>${js}</script>
</body>
</html>`;

const out = path.join(root, '..', 'singapore-malaysia-bali.html');
fs.writeFileSync(out, fwHtml(html));
console.log('wrote', out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
