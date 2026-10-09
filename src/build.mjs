// Assemble the single-file guide:  node src/build.mjs  →  index.html
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { scenes, routeMap } from './scenes.mjs';
import { SHARED_DEFS } from './art.mjs';
import * as C from './content.mjs';
import { ico, food } from './icons.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const css = fs.readFileSync(path.join(here, 'style.css'), 'utf8');

/* Chinese typography: convert ASCII punctuation in running text to full-width (keep 1,000 and 16:00). */
const FW = { ',': '\uff0c', ';': '\uff1b', ':': '\uff1a', '?': '\uff1f', '!': '\uff01', '(': '\uff08', ')': '\uff09' };
function fwText(t) {
  t = t.replace(/&(#?\w+);/g, '\u0001$1\u0002');
  t = t.replace(/[,;:?!()]/g, (c, i, str) => ((c === ',' || c === ':') && /\d/.test(str[i - 1] || '') && /\d/.test(str[i + 1] || '') ? c : FW[c]));
  return t.replace(/\u0001(#?\w+)\u0002/g, '&$1;');
}
const fwHtml = (h) => h.split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<[^>]*>)/).map((t, i) => (i % 2 ? t : fwText(t))).join('');
const fwJs = (j) => j.replace(/'([^'\\\n]*[\u4e00-\u9fff][^'\\\n]*)'/g, (m, a) => `'${fwText(a)}'`);
const js = fwJs(fs.readFileSync(path.join(here, 'app.js'), 'utf8'));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ---------- building blocks ---------- */
let uidN = 0;
const scene = (key, ...a) => {
  const fn = scenes[key];
  if (!fn) throw new Error('scene ' + key);
  return fn(`u${uidN++}-`, ...a);
};

const spk = (target) => `<button class="spk" type="button" data-speak="${target}" aria-label="朗读这一部分" title="朗读这一部分">${ico('speaker')}</button>`;

/** text-section accordion */
function sec({ id, no, title, sub = '', body, open = false }) {
  return `<div class="acc sec${open ? ' open' : ''}" id="${id}">
  <h3><button class="acc-h sec-h" type="button" aria-expanded="${open}" aria-controls="${id}-b"><span class="no">${no}</span><span class="t"><span class="lbl">${title}</span>${sub ? `<small>${sub}</small>` : ''}</span>${ico('chevron', { cls: 'chev' })}</button></h3>
  ${spk(id + '-b')}
  <div class="acc-b" id="${id}-b" role="region"><div class="acc-in"><div class="sec-body">${body}</div></div></div>
</div>`;
}

/** banner card accordion (days & sights) */
function card({ id, art, badge, tags = '', title, en = '', desc = '', body }) {
  return `<article class="acc card" id="${id}">
  <h3><button class="acc-h" type="button" aria-expanded="false" aria-controls="${id}-b">
    <span class="banner">${art}</span>
    <span class="tag">${tags}</span>
    <span class="ov"><span class="badge" aria-hidden="true">${badge}</span><span class="ov-t"><span class="tt lbl">${title}</span>${en ? `<span class="en nosay">${en}</span>` : ''}${desc ? `<span class="ds">${desc}</span>` : ''}</span>${ico('chevron', { cls: 'chev' })}</span>
  </button></h3>
  ${spk(id + '-b')}
  <div class="acc-b" id="${id}-b" role="region"><div class="acc-in"><div class="card-body">${body}</div></div></div>
</article>`;
}

const box = (cls, label, icon, html) => `<div class="boxout ${cls}"><b class="lbl">${ico(icon)}${label}</b>${html}</div>`;
const RATE = { must: ['must', '必看'], worth: ['', '值得'], opt: ['', '备选'] };

/* ---------- chapters ---------- */
function status() {
  const items = C.STATUS.map((s) => `<div class="st ${s.k}">${ico(s.k === 'warn' ? 'warn' : s.k === 'ok' ? 'check' : 'info')}<div><b>${s.t}</b><p>${s.d}</p></div></div>`).join('');
  return `<div class="status acc open" id="status">
  <button class="status-h acc-h" type="button" aria-expanded="true" aria-controls="status-b"><span class="dot"></span>最新状态<small>截至 ${C.META.cn} · ${C.STATUS.length} 条</small>${ico('chevron')}</button>
  <div class="acc-b" id="status-b"><div class="acc-in"><div class="st-list">${items}</div></div></div>
</div>`;
}

function glance() {
  const g = [
    ['route', 'var(--red)', '路线', '温哥华 2 天 → 飞卡尔加里 → 班夫 2 天 → 冰原大道 → 贾斯珀 2 天 → 回卡尔加里。'],
    ['plane', 'var(--blue)', '机票', C.ROUTE_NOTE.buy],
    ['car', 'var(--gold)', '租车', C.ROUTE_NOTE.car],
    ['cal', 'var(--forest)', '季节', C.ROUTE_NOTE.base],
  ];
  return `<div class="glance">${g.map(([i, c, t, p]) => `<div class="gl rv" style="--g:${c}">${ico(i)}<h3>${t}</h3><p>${p}</p></div>`).join('')}</div>`;
}

function mapSection() {
  const m = routeMap();
  const chips = C.DAYS.map((d) => `<button class="dchip" type="button" data-day="${d.n}" data-title="${d.title}" data-sub="${d.sub}" data-move="${d.move}" aria-label="第 ${d.n} 天:${d.title}"><b>${d.n}</b><span>${d.area.split(' ')[0]}</span></button>`).join('');
  return `<section class="block wrap" id="map" aria-labelledby="map-h" style="padding-top:clamp(28px,5vw,56px)">
  <div class="rv"><p class="eyebrow" style="--c:var(--gold)">ROUTE AT A GLANCE</p><h2 class="h2" id="map-h" style="margin:6px 0 18px">一张图看完 7 天</h2></div>
  <div class="mapbox rv" id="mapbox">${m.svg}</div><p class="map-hint">地图可左右滑动。</p>
  <div class="days-row rv" role="group" aria-label="选择第几天">${chips}</div>
  <div class="daysum" id="daysum" aria-live="polite"><h4>点上面的数字,地图上的小车会开过去</h4><p>点地图上的圆点也可以。</p></div>
</section>`;
}

/* 1 culture */
function chCulture() {
  const stats = C.STATS.map((s) => `<div class="stat rv say"><div class="n lbl">${s.n != null ? `<span data-count="${s.n}">0</span><small>${s.u}</small>` : s.t}</div><div class="l lbl">${s.l}</div><div class="s">${s.s}</div></div>`).join('');

  const prov = `<div data-tabs>
    <div class="seg" role="tablist" aria-label="选择省份"><button role="tab" aria-selected="true" data-tab="bc">卑诗省 BC</button><button role="tab" aria-selected="false" data-tab="ab">阿尔伯塔 AB</button></div>
    ${['bc', 'ab']
      .map((k, i) => {
        const p = C.PROVINCES[k];
        return `<div class="panel prov" data-panel="${k}"${i ? ' hidden' : ''} style="margin-top:16px">
        <div class="pic">${scene(p.scene)}</div>
        <table class="cmp"><caption class="sr">${p.name}</caption>${p.rows.map(([a, b]) => `<tr><th scope="row" class="lbl">${a}</th><td>${b}</td></tr>`).join('')}</table></div>`;
      })
      .join('')}
  </div>`;

  const flips = `<div class="flips">${C.CULTURE.map(
    (c) => `<button class="flip rv say" type="button" aria-pressed="false"><span class="flip-in"><span class="fc f">${ico(c.ico)}<span class="k lbl">${c.k}</span><span class="s">${c.s}</span><span class="hint nosay">点击翻面 ↻</span></span><span class="fc b">${c.back.map((t) => `<span class="bp">${t}</span>`).join('')}</span></span></button>`
  ).join('')}</div>`;

  const foods = `<div class="foods">${C.FOODS.map((f) => `<div class="food rv">${food(f.i)}<div><h4>${f.n}<span class="${f.w.toLowerCase()}">${{ BC: '卑诗', AB: '阿省', CA: '全国' }[f.w]}</span></h4><p>${f.d}</p></div></div>`).join('')}</div>`;

  const manners = `<dl class="manners">${C.MANNERS.map(([k, v]) => `<div class="kv say"><dt class="lbl">${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  <div class="calcs" style="margin-top:6px">${tipCalc()}${curCalc()}</div>`;

  const wild = `<div class="rules">${C.WILD.rule
    .map((r) => `<div class="ruler say"><h4><b>${r.n}</b>${r.who}</h4><div class="bus-row" data-bus="${r.bus}" aria-label="约 ${r.bus} 辆公交车的长度">${'<i class="bus"></i>'.repeat(r.bus)}</div></div>`)
    .join('')}</div>
  <p class="note">1 辆公交车约 10 米长。Parks Canada 的说法:熊要隔 10 辆公交、其他大型动物隔 3 辆。Jasper 国家公园已把这两个距离写进法规。</p>
  <div><h4 class="sub-h" style="margin:8px 0 12px;font-size:1.1rem;border:0">找一找:路边藏着 5 种动物</h4>
    <div class="wild-scroll" id="wild-scroll"><div class="wild-stage" id="wild">${wildArt()}</div></div>
    <div class="wild-bar"><span class="wild-count">已找到 <b id="wild-n">0</b> / 5</span><button class="pill" type="button" id="wild-hint">给点提示</button><button class="pill" type="button" id="wild-reset">重玩</button></div>
    <div class="wild-info" id="wild-info" aria-live="polite"></div></div>
  <div><h4 class="sub-h" style="margin:8px 0 12px;font-size:1.1rem;border:0">遇到野生动物小测验</h4>
  <div class="quiz">${C.WILD.quiz
    .map((q, i) => `<div class="q" data-a="${q.a}"><h4><span>Q${i + 1}</span>${q.q}</h4><div class="opts">${q.o.map((o, j) => `<button class="opt" type="button" data-i="${j}">${o}</button>`).join('')}</div><p class="why nosay">${q.why}</p></div>`)
    .join('')}</div></div>`;

  const clocks = `<div class="clocks">
    ${[['vc', '温哥华', 'America/Vancouver', ''], ['ab', '班夫 · 卡尔加里', 'America/Edmonton', ''], ['bj', '北京', 'Asia/Shanghai', '']]
      .map(([k, n, tz]) => `<div class="clk" data-tz="${tz}" data-k="${k}"><div class="z">${n}</div><div class="tm" aria-live="off">--:--</div><div class="dt">&nbsp;</div><div class="df">&nbsp;</div></div>`)
      .join('')}</div>
  <p class="note say">阿尔伯塔(山地时间)比温哥华(太平洋时间)快 <b>1 小时</b>。11 月第一个周日,夏令时结束,时钟拨回 1 小时。北京比温哥华快 15 小时(夏令时)或 16 小时。</p>`;

  return `<section class="block wrap ch-culture" id="culture" aria-labelledby="culture-h">
  <div class="ch-head rv"><span class="ch-num" aria-hidden="true">01</span><p class="eyebrow">PART ONE · COUNTRY &amp; CULTURE</p><h2 class="h2" id="culture-h">国家与文化</h2>
    <p class="ch-intro say">先花十分钟,把「去哪个国家、当地人怎么生活、哪些事别踩雷」弄清楚。后面的景点会好懂很多。</p>
    <div class="ch-tools"><button class="pill" type="button" data-expand="culture">${ico('expand')}全部展开</button><button class="pill" type="button" data-collapse="culture">${ico('collapse')}全部收起</button><button class="pill" type="button" data-speak-ch="culture">${ico('speaker')}朗读本章</button></div></div>
  <div class="stats rv" style="margin-bottom:18px">${stats}</div>
  ${sec({ id: 'c-prov', no: '1.1', title: '两个省,两种性格', sub: '温哥华在卑诗省,班夫在阿尔伯塔省', body: prov, open: true })}
  ${sec({ id: 'c-cul', no: '1.2', title: '六个文化关键词', sub: '点卡片翻面', body: flips })}
  ${sec({ id: 'c-food', no: '1.3', title: '吃什么', sub: '十样值得一试的本地味道', body: foods })}
  ${sec({ id: 'c-man', no: '1.4', title: '钱、礼仪与小常识', sub: '含小费与汇率计算器', body: manners })}
  ${sec({ id: 'c-wild', no: '1.5', title: '野生动物守则', sub: '落基山最重要的一课', body: wild })}
  ${sec({ id: 'c-time', no: '1.6', title: '时差', sub: '实时时钟', body: clocks })}
</section>`;
}

function wildArt() {
  let svg = scenes.wildlife('w-');
  // hit targets (viewBox 1000x460)
  const hits = [
    ['bear', 343, 336, 40],
    ['elk', 590, 352, 46],
    ['sheep', 868, 376, 38],
    ['goat', 774, 210, 30],
    ['moose', 162, 398, 44],
  ];
  const hs = hits.map(([k, x, y, r]) => `<circle class="hit" data-a="${k}" cx="${x}" cy="${y}" r="${r}" tabindex="0" role="button" aria-label="找到的动物"/>`).join('');
  svg = svg.replace('</svg>', hs + '</svg>');
  return svg;
}

function tipCalc() {
  return `<div class="calc" id="tipcalc"><h4>${ico('coin')}小费计算器</h4>
  <div class="fld"><label for="tip-bill">税前账单(加元)</label><input id="tip-bill" type="number" inputmode="decimal" min="0" step="0.01" placeholder="例如 86.50"></div>
  <div class="fld"><label>小费比例</label><div class="chipsel" id="tip-pcts"><button type="button" data-p="15">15%</button><button type="button" data-p="18">18%</button><button type="button" class="on" data-p="20">20%</button><button type="button" data-p="25">25%</button></div></div>
  <div class="fld"><label for="tip-n">几个人分</label><input id="tip-n" type="number" inputmode="numeric" min="1" step="1" value="2"></div>
  <div class="out"><span>小费 <b id="tip-v">0.00</b></span><span>总计 <b id="tip-t">0.00</b>(含税前账单与小费,不含税请自行加)</span><span>每人 <b id="tip-e">0.00</b></span></div>
  <p class="note">小费按<b>税前</b>金额算。服务一般才 15%,很好给 20%。</p></div>`;
}
function curCalc() {
  return `<div class="calc" id="curcalc"><h4>${ico('wallet')}加元 ⇄ 人民币</h4>
  <div class="fld"><label for="cur-rate">汇率(1 加元 = ? 人民币)</label><input id="cur-rate" type="number" inputmode="decimal" step="0.001" min="0" placeholder="填入当天汇率,例如 5.1"></div>
  <div class="fld"><label for="cur-cad">加元</label><input id="cur-cad" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0"></div>
  <div class="fld"><label for="cur-cny">人民币</label><input id="cur-cny" type="number" inputmode="decimal" min="0" step="0.01" placeholder="0"></div>
  <p class="note">页面不内置汇率(会过时)。出发前查一下银行或支付软件的实时汇率,填进来即可,下次打开会记住。</p></div>`;
}

/* 2 route */
function dayBody(d) {
  return `<div class="dday">
  <div class="day-meta"><span>${ico('pin')}${d.area}</span><span>${ico(d.n === 3 ? 'plane' : 'car')}${d.move}</span>${d.tags.map((t) => `<span>${t}</span>`).join('')}</div>
  <ol class="tl">${d.steps.map(([t, x]) => `<li class="tl-i say"><span class="tl-t lbl">${t}</span><div class="tl-x">${x}</div></li>`).join('')}</ol>
  <div class="dgrid"><div class="dbox"><b class="l lbl">${ico('eat')}吃</b>${d.eat}</div><div class="dbox"><b class="l lbl">${ico('bed')}住</b>${d.stay}</div></div>
  ${box('warn', '小心', 'warn', d.warn)}
  ${box('alt', '备选方案', 'shuffle', d.alt)}
  ${box('fun', '有意思', 'info', d.fun)}
  </div>`;
}
function chRoute() {
  const cards = C.DAYS.map((d) =>
    card({ id: `d${d.n}`, art: scene(d.scene === 'moraine' ? 'moraine' : d.scene), badge: d.n, tags: `<span>DAY ${d.n}</span>`, title: d.title, desc: d.sub, body: dayBody(d) })
  ).join('');
  return `<section class="block wrap ch-route" id="route" aria-labelledby="route-h">
  <div class="ch-head rv"><span class="ch-num" aria-hidden="true">02</span><p class="eyebrow">PART TWO · 7-DAY ITINERARY</p><h2 class="h2" id="route-h">7 日行程</h2>
    <p class="ch-intro say">每天一张卡。点开看时间线、吃住、容易踩的坑和备选方案。节奏是前两天轻松,中间三天最累(自驾),最后一天回程。</p>
    <div class="ch-tools"><button class="pill" type="button" data-expand="route">${ico('expand')}全部展开</button><button class="pill" type="button" data-collapse="route">${ico('collapse')}全部收起</button><button class="pill" type="button" data-speak-ch="route">${ico('speaker')}朗读本章</button></div></div>
  ${cards}
</section>`;
}

/* 3 sights */
function widgetFor(s) {
  if (s.widget === 'clock') return `<div class="widget nosay"><div class="wt">${ico('speaker')}互动</div><p>点一下上面插画里的蒸汽钟,看它「喷汽」。</p><button class="btn" type="button" data-blow>让它鸣一声</button></div>`;
  if (s.widget === 'bridge') return `<div class="widget nosay"><div class="wt">${ico('route')}互动</div><p>吊桥会不会晃?试试看。</p><button class="btn" type="button" data-shake>摇一摇</button></div>`;
  if (s.widget === 'lakecolor')
    return `<div class="widget nosay"><div class="wt">${ico('cal')}互动 · 哪个月最蓝?</div><input type="range" id="lake-m" min="6" max="10" step="1" value="7" aria-label="选择月份"><div class="mrow"><span>6 月</span><span>7 月</span><span>8 月</span><span>9 月</span><span>10 月</span></div><p id="lake-t"></p></div>`;
  return '';
}
function sightBody(s) {
  const f = s.facts;
  return `<div class="sx"><div class="sx-main">
    <p class="cap nosay">插图:${s.cap}</p>
    <p class="lead say">${s.blurb}</p>
    <ul class="pts">${s.pts.map((p) => `<li>${p}</li>`).join('')}</ul>
    ${widgetFor(s)}
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
function sightCard(s) {
  const [rc, rl] = RATE[s.r];
  const tags = `<span class="${rc}">${rc ? ico('star', { fill: true }) : ''}${rl}</span>${s.status === 'warn' ? `<span class="warn">${ico('warn')}可能封闭</span>` : ''}`;
  return card({ id: `s-${s.id}`, art: scene(s.scene === 'moraine' ? 'moraine' : s.scene), badge: s.n, tags, title: s.name, en: s.en, body: sightBody(s) });
}
function chSights() {
  const van = C.SIGHTS.filter((s) => s.region === 'van');
  const ab = C.SIGHTS.filter((s) => s.region === 'ab');
  const top = [10, 11, 13, 16, 8, 1, 4, 2, 12, 3].map((n) => C.SIGHTS.find((s) => s.n === n));
  const topList = `<ol class="top10">${top.map((s, i) => `<li><a href="#s-${s.id}" data-open="s-${s.id}"><span class="n">${i + 1}</span><span><b>${s.name}</b><small>${s.blurb.split('。')[0]}。</small></span></a></li>`).join('')}</ol>`;
  return `<section class="block wrap ch-sights" id="sights" aria-labelledby="sights-h">
  <div class="ch-head rv"><span class="ch-num" aria-hidden="true">03</span><p class="eyebrow">PART THREE · SIGHTS</p><h2 class="h2" id="sights-h">景点图鉴</h2>
    <p class="ch-intro say">18 个景点,按「必看 / 值得 / 备选」分级。卡片上的数字是编号,点开看亮点、实用信息和一个小知识。</p>
    <div class="ch-tools"><button class="pill" type="button" data-expand="sights">${ico('expand')}全部展开</button><button class="pill" type="button" data-collapse="sights">${ico('collapse')}全部收起</button><button class="pill" type="button" data-speak-ch="sights">${ico('speaker')}朗读本章</button></div></div>
  <h3 class="sub-h" style="margin-top:0">十大必去 <small>TOP 10</small></h3>
  <div class="rv">${topList}</div>
  <h3 class="sub-h">温哥华 <small>Vancouver · 卑诗省</small></h3>
  ${van.map(sightCard).join('')}
  <h3 class="sub-h">阿尔伯塔 <small>Alberta · 落基山</small></h3>
  ${ab.map(sightCard).join('')}
  <h3 class="sub-h">顺路加分 <small>Bonus</small></h3>
  <ul class="pts rv">${C.BONUS.map(([a, b]) => `<li><b>${a}</b>:${b}</li>`).join('')}</ul>
</section>`;
}

/* 4 plan */
function chPlan() {
  const seasonTabs = Object.entries(C.SEASONS).map(([k, v], i) => `<button role="tab" aria-selected="${i === 1}" data-season="${k}">${v.n} · ${v.m}</button>`).join('');
  const seasonPanels = Object.entries(C.SEASONS)
    .map(([k, v]) => `<div class="s-info" data-spanel="${k}"${k === 'summer' ? '' : ' hidden'}><h4>${v.n}季<small>${v.m}</small></h4>
      <div class="s-cols"><div class="pro"><h5>好处</h5><ul>${v.pro.map((x) => `<li>${x}</li>`).join('')}</ul></div><div class="con"><h5>注意</h5><ul>${v.con.map((x) => `<li>${x}</li>`).join('')}</ul></div></div>
      <div class="s-meta say"><span><b class="lbl">怎么穿</b> ${v.wear}</span><span><b class="lbl">大概温度</b> ${v.temp}</span></div></div>`)
    .join('');
  const seasons = `<div data-seasons>
    <div class="seg" role="tablist" aria-label="选择季节" style="margin-bottom:16px">${seasonTabs}</div>
    <div class="season"><div class="s-stage">${['spring', 'summer', 'autumn', 'winter'].map((k) => scenes.season(k, `se-${k}-`).replace('<svg class="art', `<svg data-s="${k}" class="art${k === 'summer' ? ' on' : ''}`)).join('')}<div class="fx" id="s-fx" aria-hidden="true"></div></div>
    <div>${seasonPanels}</div></div></div>`;

  const timeline = `<div class="when-line">${C.TIMELINE.map(([a, b]) => `<div class="wl say"><b class="lbl">${a}</b><p>${b}</p></div>`).join('')}</div>`;
  const price = `<table class="price"><caption class="sr">参考价格</caption>${C.PRICES.map(([a, b, c]) => `<tr class="say"><td class="lbl">${a}</td><td>${b}</td><td>${c}</td></tr>`).join('')}</table>
  <p class="note" style="margin-top:10px">以上均为 2026 年公开信息中的<b>参考价</b>(加元,不含税与手续费),各渠道出入不小。下单前以官网为准。</p>`;
  const pack = `<div class="packbar"><span>已准备 <b id="pk-n">0</b> / <span id="pk-t">0</span></span><span class="bar"><i id="pk-bar"></i></span><button class="pill" type="button" id="pk-reset">清空</button></div>
  <div class="pack">${C.PACK.map((g, gi) => `<div class="pk"><h4>${g.g}</h4>${g.i.map((x, xi) => `<label class="ck"><input type="checkbox" data-k="${gi}-${xi}"><span>${x}</span></label>`).join('')}</div>`).join('')}</div>`;

  return `<section class="block wrap ch-plan" id="plan" aria-labelledby="plan-h">
  <div class="ch-head rv"><span class="ch-num" aria-hidden="true">04</span><p class="eyebrow">PART FOUR · PLAN &amp; PREPARE</p><h2 class="h2" id="plan-h">出发前要做的事</h2>
    <p class="ch-intro say">什么季节来、什么时候订、要花多少钱、行李里放什么。这一章最实用。</p>
    <div class="ch-tools"><button class="pill" type="button" data-expand="plan">${ico('expand')}全部展开</button><button class="pill" type="button" data-collapse="plan">${ico('collapse')}全部收起</button><button class="pill" type="button" data-speak-ch="plan">${ico('speaker')}朗读本章</button></div></div>
  ${sec({ id: 'p-when', no: '4.1', title: '什么季节来', sub: '点季节,看画面和注意事项', body: seasons, open: true })}
  ${sec({ id: 'p-book', no: '4.2', title: '订票倒计时', sub: '先订什么、后订什么', body: timeline })}
  ${sec({ id: 'p-price', no: '4.3', title: '主要花销参考', sub: '2026 年参考价', body: price })}
  ${sec({ id: 'p-pack', no: '4.4', title: '打包清单', sub: '可勾选,会记住', body: pack })}
</section>`;
}

/* ---------- page shell ---------- */
const fxLeaves = (n, seedBase = 3) => {
  let r = seedBase;
  const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
  return Array.from({ length: n }, () => `<i style="--x:${(rnd() * 100).toFixed(1)}%;--s:${(8 + rnd() * 12).toFixed(0)}px;--d:${(9 + rnd() * 9).toFixed(1)}s;--dl:-${(rnd() * 14).toFixed(1)}s;--dx:${(rnd() * 160 - 80).toFixed(0)}px;--fc:${['#e8a925', '#d98a1b', '#c8402f', '#f0c04a'][Math.floor(rnd() * 4)]}"></i>`).join('');
};

const navItems = [
  ['top', '概览', 'pin', 'var(--ink)'],
  ['culture', '文化', 'people', 'var(--red)'],
  ['route', '行程', 'route', 'var(--gold)'],
  ['sights', '景点', 'star', 'var(--teal)'],
  ['plan', '实用', 'list', 'var(--forest)'],
];

const head = `<!doctype html>
<html lang="zh-CN" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#faf7f1">
<title>海与山之间 · 温哥华 × 阿尔伯塔 7 日游</title>
<meta name="description" content="温哥华与阿尔伯塔 7 日游随身指南:国家与文化、7 日行程、18 个景点、出发前清单。可折叠、可调字号、可朗读。${C.META.updated} 更新。">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23c8202f' d='M12 1l2.2 4.4 2.3-1.2-.7 5 2.8-1.3-.9 3.2 3.3.3-3.2 3.5 1.2 1.3-5.2 1.4.5 4.6-1.1-.4V23h-1V19.6l-1.1.4.5-4.6-5.2-1.4 1.2-1.3L3.3 9.2l3.3-.3-.9-3.2 2.8 1.3-.7-5 2.3 1.2z'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@600;900&family=Playfair+Display:ital,wght@0,700;0,900;1,700&display=swap" media="print" onload="this.media='all'">
<style>${css}</style>
<script>
(function(){try{var t=localStorage.getItem('yvr7:theme');t=t?JSON.parse(t):(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);var f=localStorage.getItem('yvr7:fs');if(f)document.documentElement.style.setProperty('--fs',JSON.parse(f));}catch(e){}})();
</script>
</head>`;

const topbar = `<a class="skip" href="#main">跳到正文</a>
<header class="topbar" id="topbar">
  <a class="brand" href="#top" aria-label="回到顶部"><svg class="mk" aria-hidden="true"><use href="#i-maple"/></svg><span>海与山之间</span><small>7 日游</small></a>
  <nav class="tnav" aria-label="章节">${navItems.map(([id, n]) => `<a href="#${id}" data-nav="${id}">${n}</a>`).join('')}</nav>
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
<nav class="sidetabs" aria-label="章节">${navItems.map(([id, n, , c]) => `<a class="stab" href="#${id}" data-nav="${id}" style="--tc:${c}">${n}</a>`).join('')}</nav>
<nav class="botnav" aria-label="章节">${navItems.map(([id, n, i, c]) => `<a href="#${id}" data-nav="${id}" style="--tc:${c}">${ico(i)}<span>${n}</span></a>`).join('')}</nav>
<div class="player" id="player" role="region" aria-label="朗读控制" hidden>
  <div class="pl-btns"><button type="button" id="pl-prev" aria-label="上一段">${ico('prev', { fill: true })}</button><button type="button" id="pl-play" class="main" aria-label="暂停">${ico('pause', { fill: true })}</button><button type="button" id="pl-next" aria-label="下一段">${ico('next', { fill: true })}</button></div>
  <div class="pl-txt"><b>正在朗读</b><span id="pl-text">…</span></div>
  <div class="pl-r"><select id="pl-voice" aria-label="选择声音" hidden></select><button type="button" class="x" id="pl-stop" aria-label="停止并关闭">${ico('close')}</button></div>
</div>
<button class="totop" id="totop" type="button" aria-label="回到顶部">${ico('top')}</button>`;

const hero = `<section class="hero" id="top">
  <div class="hero-art" aria-hidden="false">${scenes.hero('hero-')}<div class="fx" aria-hidden="true">${fxLeaves(16)}</div></div>
  <div class="wrap hero-card"><div class="cover rv in">
    <p class="kick">Travel Guide · ${C.META.cn} 更新</p>
    <h1><span>海与山</span><span class="b">之间</span></h1>
    <p class="sub">温哥华 × 阿尔伯塔 · 7 日游随身指南</p>
    <p class="lead say">不写空话:只放真实去得了的地方、算得出的时间、查得到的价格和确实踩过的坑。内容按 ${C.META.cn}能查到的信息整理。</p>
    <ul class="chips"><li>7 天</li><li>2 个省</li><li>自驾约 900 km</li><li>18 个景点</li></ul>
    <div class="cta"><a class="btn pri" href="#route">直接看 7 日行程</a><a class="btn" href="#culture">先了解国家与文化</a></div>
  </div></div>
</section>`;

const foot = `<footer>
  <div class="wrap">
    <h3>来源与说明</h3>
    <p>价格、开放时间和封路信息变化很快。本页内容按 ${C.META.cn}能查到的公开信息整理,<b>出发前请再看一次官方页面</b>。</p>
    <div class="src">${C.SOURCES.map(([n, u]) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${n}</a>`).join('')}</div>
    <p>插画为原创绘制(程序生成),不是实景照片。</p>
    <p>地图为示意图,非严格比例。</p>
  </div>
</footer>`;

const html = `${head}
<body>
${SHARED_DEFS}
${topbar}
<main id="main">
${hero}
<div class="wrap" id="overview">${glance()}${status()}</div>
${mapSection()}
${chCulture()}
${chRoute()}
${chSights()}
${chPlan()}
</main>
${foot}
<script>${js}</script>
</body>
</html>`;

const out = path.join(here, '..', 'index.html');
fs.writeFileSync(out, fwHtml(html));
console.log('wrote', out, (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
