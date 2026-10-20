(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LS = {
    get(k, d) { try { const v = localStorage.getItem('yvr7:' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('yvr7:' + k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } },
  };
  const BAR = 56;

  /* ================= accordions ================= */
  /* attached first: if a later init block throws (old browser, quirky WebView), folding must still work */
  const hdr = (a) => a.querySelector(':scope > h3 > .acc-h, :scope > .acc-h');
  function setAcc(a, open) {
    a.classList.toggle('open', open);
    const h = hdr(a);
    if (h) h.setAttribute('aria-expanded', open);
  }
  function openUp(el) {
    let a = el.closest('.acc'), changed = false;
    while (a) {
      if (!a.classList.contains('open')) { setAcc(a, true); changed = true; }
      a = a.parentElement && a.parentElement.closest('.acc');
    }
    return changed;
  }
  document.addEventListener('click', (e) => {
    const h = e.target.closest('.acc-h');
    if (!h) return;
    const a = h.closest('.acc');
    setAcc(a, !a.classList.contains('open'));
    if (a.classList.contains('open') && a.id && /^(s-|sc-|w-|d\d)/.test(a.id)) history.replaceState(null, '', '#' + a.id);
  });
  $$('[data-expand]').forEach((b) => b.addEventListener('click', () => $$('.acc', $('#' + b.dataset.expand)).forEach((a) => setAcc(a, true))));
  $$('[data-collapse]').forEach((b) => b.addEventListener('click', () => $$('.acc', $('#' + b.dataset.collapse)).forEach((a) => setAcc(a, false))));
  const btnAll = $('#btn-all');
  if (btnAll) {
    btnAll.addEventListener('click', () => {
      const allOpen = $$('.acc:not(.status)').some((a) => !a.classList.contains('open')); // expand if anything is closed, else collapse (the chapter buttons may have changed things)
      $$('.acc:not(.status)').forEach((a) => setAcc(a, allOpen));
      btnAll.innerHTML = btnAll.dataset[allOpen ? 'c' : 'e'];
      btnAll.setAttribute('aria-pressed', allOpen);
    });
    btnAll.dataset.e = btnAll.innerHTML;
    btnAll.dataset.c = btnAll.innerHTML.replace(/<path[^>]*>/, '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>');
  }

  /* ================= font size ================= */
  const fsRange = $('#fs-range'), fsOut = $('#fs-out');
  function setFs(v, save = true) {
    v = Math.min(1.7, Math.max(0.85, Math.round(v * 100) / 100));
    root.style.setProperty('--fs', v);
    fsRange.value = Math.round(v * 100);
    fsOut.textContent = Math.round(v * 100) + '%';
    $$('[data-fsv]').forEach((b) => b.classList.toggle('on', Math.abs(+b.dataset.fsv - v * 100) < 3));
    if (save) LS.set('fs', v);
  }
  setFs(LS.get('fs', 1), false);
  fsRange.addEventListener('input', () => setFs(fsRange.value / 100));
  $$('[data-fs]').forEach((b) => b.addEventListener('click', () => setFs(parseFloat(getComputedStyle(root).getPropertyValue('--fs')) + (b.dataset.fs === '+' ? 0.05 : -0.05))));
  $$('[data-fsv]').forEach((b) => b.addEventListener('click', () => setFs(+b.dataset.fsv / 100)));

  /* ================= popover ================= */
  const pop = $('#pop-aa'), btnAa = $('#btn-aa');
  function togglePop(open) {
    open = open ?? pop.hidden;
    pop.hidden = !open;
    btnAa.setAttribute('aria-expanded', open);
  }
  btnAa.addEventListener('click', (e) => { e.stopPropagation(); togglePop(); });
  document.addEventListener('click', (e) => { if (!pop.hidden && !pop.contains(e.target)) togglePop(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') togglePop(false); });

  /* ================= theme ================= */
  $('#btn-theme').addEventListener('click', () => {
    const t = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = t;
    LS.set('theme', t);
    document.querySelector('meta[name="theme-color"]').content = t === 'dark' ? '#14171a' : '#faf7f1';
  });
  if (root.dataset.theme === 'dark') document.querySelector('meta[name="theme-color"]').content = '#14171a';

  function goTo(id, smooth = true) {
    const el = document.getElementById(id);
    if (!el) return;
    const changed = openUp(el);
    setTimeout(() => el.scrollIntoView({ behavior: smooth && !reduce ? 'smooth' : 'auto', block: 'start' }), changed ? 80 : 0);
  }
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-open]');
    if (a) { e.preventDefault(); history.replaceState(null, '', '#' + a.dataset.open); goTo(a.dataset.open); }
  });
  window.addEventListener('hashchange', () => { const id = location.hash.slice(1); if (id) goTo(id); });
  if (location.hash.length > 1) setTimeout(() => goTo(location.hash.slice(1), false), 120);

  /* ================= scroll: progress, nav, parallax ================= */
  const prog = $('#progress'), totop = $('#totop');
  const navLinks = $$('[data-nav]');
  const navIds = Array.from(new Set(navLinks.map((a) => a.dataset.nav)));
  const navEls = navIds.map((id) => document.getElementById(id));
  const px = $$('.px');
  const heroEl = $('.hero');
  let ticking = false;
  function onScroll() {
    ticking = false;
    const y = window.scrollY, h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    totop.classList.toggle('show', y > 900);
    let cur = 'top';
    navEls.forEach((el, i) => { if (el && el.getBoundingClientRect().top <= innerHeight * 0.4) cur = navIds[i]; });
    navLinks.forEach((a) => { const on = a.dataset.nav === cur; a.classList.toggle('on', on); if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    if (!reduce && heroEl && y < heroEl.offsetHeight) px.forEach((p) => { p.style.transform = `translate3d(0,${(y * +p.dataset.s).toFixed(1)}px,0)`; });
  }
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', onScroll);
  totop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  onScroll();

  /* ================= reveal + count-up + status ================= */
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add('in');
    $$('[data-count]', e.target).forEach(countUp);
    if (e.target.classList.contains('ruler')) $$('.bus', e.target).forEach((b, i) => (b.style.transitionDelay = i * 70 + 'ms'));
    io.unobserve(e.target);
  }), { threshold: 0.12 });
  $$('.rv, .ruler').forEach((el) => io.observe(el));
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const to = +el.dataset.count;
    if (reduce) { el.textContent = to.toLocaleString(); return; }
    const t0 = performance.now(), D = 1300;
    (function f(t) {
      const k = Math.min(1, (t - t0) / D), e = 1 - Math.pow(1 - k, 3);
      el.textContent = Math.round(to * e).toLocaleString();
      if (k < 1) requestAnimationFrame(f);
    })(t0);
  }

  /* ================= generic tabs ================= */
  $$('[data-tabs]').forEach((box) => {
    const btns = $$('[data-tab]', box), panels = $$('[data-panel]', box);
    const tabsId = 'tabs' + $$('[data-tabs]').indexOf(box);
    btns.forEach((b) => {
      const p = panels.find((x) => x.dataset.panel === b.dataset.tab);
      if (p) { p.id = p.id || `${tabsId}-${b.dataset.tab}`; p.setAttribute('role', 'tabpanel'); b.setAttribute('aria-controls', p.id); b.id = b.id || `${p.id}-tab`; p.setAttribute('aria-labelledby', b.id); }
      b.tabIndex = b.getAttribute('aria-selected') === 'true' ? 0 : -1;
    });
    const select = (b) => {
      btns.forEach((x) => { x.setAttribute('aria-selected', x === b); x.tabIndex = x === b ? 0 : -1; });
      panels.forEach((p) => (p.hidden = p.dataset.panel !== b.dataset.tab));
    };
    btns.forEach((b, i) => {
      b.addEventListener('click', () => select(b));
      b.addEventListener('keydown', (ev) => {
        const j = ev.key === 'ArrowRight' ? (i + 1) % btns.length : ev.key === 'ArrowLeft' ? (i + btns.length - 1) % btns.length : ev.key === 'Home' ? 0 : ev.key === 'End' ? btns.length - 1 : -1;
        if (j < 0) return;
        ev.preventDefault(); btns[j].focus(); select(btns[j]);
      });
    });
  });

  /* ================= flip cards ================= */
  $$('.flip').forEach((f) => f.addEventListener('click', () => { f.classList.toggle('on'); f.setAttribute('aria-pressed', f.classList.contains('on')); }));

  /* ================= clocks ================= */
  const clocks = $$('.clk');
  const offset = (tz) => { const d = new Date(); return (new Date(d.toLocaleString('en-US', { timeZone: tz })) - new Date(d.toLocaleString('en-US', { timeZone: 'UTC' }))) / 60000; };
  function tickClocks() {
    if (!clocks.length) return;
    const now = new Date();
    const base = offset(clocks[0].dataset.tz), baseName = clocks[0].querySelector('.z').textContent;
    clocks.forEach((c, i) => {
      const tz = c.dataset.tz;
      c.querySelector('.tm').textContent = new Intl.DateTimeFormat('zh-CN', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
      c.querySelector('.dt').textContent = new Intl.DateTimeFormat('zh-CN', { timeZone: tz, month: 'long', day: 'numeric', weekday: 'short' }).format(now);
      const diff = (offset(tz) - base) / 60;
      c.querySelector('.df').textContent = i === 0 ? c.dataset.base || '基准' : diff === 0 ? '与' + baseName + '相同' : '比' + baseName + (diff >= 0 ? '快 ' : '慢 ') + Math.abs(diff) + ' 小时';
    });
  }
  tickClocks();
  setInterval(tickClocks, 15000);

  /* ================= tip + currency ================= */
  (() => {
    if (!$('#tip-bill')) return;
    const bill = $('#tip-bill'), n = $('#tip-n'), v = $('#tip-v'), t = $('#tip-t'), e = $('#tip-e');
    let p = 20;
    const f = (x) => x.toFixed(2);
    function calc() {
      const b = parseFloat(bill.value) || 0, k = Math.max(1, parseInt(n.value) || 1);
      const tip = (b * p) / 100;
      v.textContent = f(tip); t.textContent = f(b + tip); e.textContent = f((b + tip) / k);
    }
    $$('#tip-pcts button').forEach((b) => b.addEventListener('click', () => { p = +b.dataset.p; $$('#tip-pcts button').forEach((x) => x.classList.toggle('on', x === b)); calc(); }));
    bill.addEventListener('input', calc); n.addEventListener('input', calc);
    calc();
    const rate = $('#cur-rate'), cad = $('#cur-cad'), cny = $('#cur-cny');
    const saved = LS.get('rate', 0);
    if (saved) rate.value = saved;
    rate.addEventListener('input', () => { LS.set('rate', parseFloat(rate.value) || 0); if (cad.value) cad.dispatchEvent(new Event('input')); });
    cad.addEventListener('input', () => { const r = parseFloat(rate.value); if (r > 0 && cad.value !== '') cny.value = (cad.value * r).toFixed(2); });
    cny.addEventListener('input', () => { const r = parseFloat(rate.value); if (r > 0 && cny.value !== '') cad.value = (cny.value / r).toFixed(2); });
  })();

  /* ================= packing ================= */
  (() => {
    if (!$('#pk-reset')) return;
    const boxes = $$('.ck input'), saved = LS.get('pack', {});
    const nEl = $('#pk-n'), tEl = $('#pk-t'), bar = $('#pk-bar');
    function upd() {
      const done = boxes.filter((b) => b.checked).length;
      nEl.textContent = done; tEl.textContent = boxes.length; bar.style.width = (done / boxes.length) * 100 + '%';
      const o = {}; boxes.forEach((b) => b.checked && (o[b.dataset.k] = 1)); LS.set('pack', o);
    }
    boxes.forEach((b) => { b.checked = !!saved[b.dataset.k]; b.addEventListener('change', upd); });
    $('#pk-reset').addEventListener('click', () => { boxes.forEach((b) => (b.checked = false)); upd(); });
    upd();
  })();

  /* ================= quiz ================= */
  $$('.q').forEach((q) => {
    const ans = +q.dataset.a;
    $$('.opt', q).forEach((o) => o.addEventListener('click', () => {
      if (q.classList.contains('done')) return;
      const i = +o.dataset.i;
      q.classList.add('done');
      o.classList.add(i === ans ? 'ok' : 'no');
      if (i !== ans) $$('.opt', q)[ans].classList.add('ok');
    }));
  });

  /* ================= wildlife game ================= */
  (() => {
    if (!$('#wild')) return;
    const hits = $$('#wild .hit'), info = $('#wild-info'), cnt = $('#wild-n'), sc = $('#wild-scroll');
    const D = {
      bear: ['黑熊', '体型不大,一样危险。别靠近、别喂、别跑;熊喷雾放在手边,不是背包底。距离 100 米以上。'],
      elk: ['麋鹿(Elk)', '9–10 月是发情期,公鹿脾气最大,小镇草坪上的也一样。距离 30 米以上。'],
      sheep: ['大角羊', '常在路边舔盐。别喂、别围成一圈拍。距离 30 米以上。'],
      goat: ['雪山羊', '住在悬崖上,一身白。远远看就好,距离 30 米以上。'],
      moose: ['驼鹿(Moose)', '最大的鹿科动物,常在湖边吃水草。带幼崽时最危险。距离 30 米以上。'],
    };
    const found = new Set();
    function mark(k) {
      if (found.has(k)) return;
      found.add(k);
      const h = hits.find((x) => x.dataset.a === k);
      h.classList.add('found'); h.classList.remove('hint');
      cnt.textContent = found.size;
      const d = document.createElement('div');
      d.className = 'wi say';
      d.innerHTML = `<b>找到了：${D[k][0]}</b>${D[k][1]}`;
      info.prepend(d);
      if (found.size === 5) { const w = document.createElement('div'); w.className = 'wi'; w.innerHTML = '<b>全部找到!</b>真实的路上,它们不会这么好认——你需要更慢的车速和更多的耐心。'; info.prepend(w); }
    }
    hits.forEach((h) => {
      h.addEventListener('click', () => mark(h.dataset.a));
      h.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); mark(h.dataset.a); } });
    });
    $('#wild-hint').addEventListener('click', () => {
      const h = hits.find((x) => !found.has(x.dataset.a));
      if (!h) return;
      h.classList.remove('hint'); void h.getBBox(); h.classList.add('hint');
      const r = h.getBoundingClientRect(), s = sc.getBoundingClientRect();
      if (r.left < s.left || r.right > s.right) sc.scrollTo({ left: sc.scrollLeft + (r.left - s.left) - s.width / 3, behavior: 'smooth' });
    });
    $('#wild-reset').addEventListener('click', () => { found.clear(); hits.forEach((h) => h.classList.remove('found', 'hint')); cnt.textContent = 0; info.innerHTML = ''; });
  })();

  /* ================= route map ================= */
  (() => {
    const svg = $('.map-art');
    if (!svg) return;
    const pins = {};
    $$('.mp-pin', svg).forEach((p) => { const m = /translate\(([\d.]+) ([\d.]+)\)/.exec(p.getAttribute('transform')); pins[p.dataset.k] = { el: p, x: +m[1], y: +m[2] }; });
    const drive = $('#mp-drive'), fly = $('#mp-fly'), plane = $('#mp-plane'), car = $('#mp-car');
    const order = ['yyc', 'banff', 'louise', 'icefield', 'jasper'];
    const cum = { yyc: 0 };
    order.slice(1).forEach((k, i) => { const a = pins[order[i]], b = pins[k]; cum[k] = cum[order[i]] + Math.hypot(b.x - a.x, b.y - a.y); });
    const LD = drive.getTotalLength(), LF = fly.getTotalLength();
    const scale = LD / cum.jasper;
    Object.keys(cum).forEach((k) => (cum[k] *= scale));
    const F = { 1: ['plane', 0], 2: ['plane', 0], 3: ['car', cum.banff], 4: ['car', cum.louise], 5: ['car', cum.jasper], 6: ['car', cum.jasper], 7: ['car', 0] };
    const ON = { 1: ['yvr'], 2: ['yvr'], 3: ['yyc', 'banff'], 4: ['banff', 'louise'], 5: ['louise', 'icefield', 'jasper'], 6: ['jasper'], 7: ['jasper', 'yyc'] };
    const PIN_DAY = { yvr: 1, yyc: 3, banff: 3, louise: 4, icefield: 5, jasper: 6 };
    let curDay = 0, raf = 0;
    const mb = $('#mapbox');
    function follow(x) {
      if (!mb || mb.scrollWidth <= mb.clientWidth) return;
      const k = mb.scrollWidth / 900;
      mb.scrollLeft = Math.max(0, Math.min(mb.scrollWidth - mb.clientWidth, x * k - mb.clientWidth / 2));
    }
    function put(kind, t) {
      if (kind === 'plane') {
        const p = fly.getPointAtLength(t * LF), q = fly.getPointAtLength(Math.min(LF, t * LF + 2)), q0 = fly.getPointAtLength(Math.max(0, t * LF - 2));
        const a = (Math.atan2(q.y - q0.y, q.x - q0.x) * 180) / Math.PI;
        plane.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${a})`);
        follow(p.x);
      } else {
        const p = drive.getPointAtLength(t);
        car.setAttribute('transform', `translate(${p.x} ${p.y})`);
        follow(p.x);
      }
    }
    function show(kind) { plane.style.display = kind === 'plane' ? '' : 'none'; car.style.display = kind === 'car' ? '' : 'none'; }
    function tween(a, b, ms, fn, done) {
      cancelAnimationFrame(raf);
      if (reduce || ms <= 0 || a === b) { fn(b); done && done(); return; }
      const t0 = performance.now();
      (function f(t) {
        const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        fn(a + (b - a) * e);
        if (k < 1) raf = requestAnimationFrame(f); else done && done();
      })(t0);
    }
    function snap(n) { const [k, t] = F[n]; show(k); put(k, k === 'plane' ? 0 : t); }
    function setDay(n, animate = true) {
      if (n === curDay) return;
      const prev = n - 1;
      if (prev >= 1 && Math.abs(n - curDay) !== 1) snap(prev); else if (prev < 1) snap(1);
      const [k, t] = F[n];
      if (n === 3) {
        show('plane');
        tween(0, 1, animate ? 1500 : 0, (v) => put('plane', v), () => { show('car'); put('car', 0); tween(0, t, animate ? 1100 : 0, (v) => put('car', v)); });
      } else if (k === 'plane') { show('plane'); put('plane', 0); }
      else { show('car'); const from = n === 7 ? cum.jasper : F[prev][1]; put('car', from); tween(from, t, animate ? Math.max(500, Math.abs(t - from) / LD * 3600) : 0, (v) => put('car', v)); }
      curDay = n;
      Object.values(pins).forEach((p) => p.el.classList.remove('on'));
      ON[n].forEach((id) => pins[id] && pins[id].el.classList.add('on'));
      $$('.dchip').forEach((c) => c.classList.toggle('on', +c.dataset.day === n));
      const c = $(`.dchip[data-day="${n}"]`);
      $('#daysum').innerHTML = `<h4>第 ${n} 天 · ${c.dataset.title}</h4><p>${c.dataset.sub} · ${c.dataset.move}</p><a href="#d${n}" data-open="d${n}">展开这一天的详细安排 →</a>`;
    }
    $$('.dchip').forEach((c) => c.addEventListener('click', () => setDay(+c.dataset.day)));
    Object.entries(pins).forEach(([k, p]) => p.el.addEventListener('click', () => setDay(PIN_DAY[k])));
    // draw-in
    drive.style.strokeDasharray = LD; drive.style.strokeDashoffset = LD;
    show('plane'); put('plane', 0);
    const mio = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      mio.disconnect();
      drive.style.transition = reduce ? 'none' : 'stroke-dashoffset 2.4s ease'; drive.style.strokeDashoffset = 0;
      setTimeout(() => setDay(1, false), 100);
    }), { threshold: 0.35 });
    mio.observe(svg);
    setDay(1, false);

  })();

  /* ================= seasons ================= */
  (() => {
    const box = $('[data-seasons]');
    if (!box) return;
    const fx = $('#s-fx');
    const FX = { spring: ['#f4a6c0', 18, false], autumn: ['#e8a925', 22, false], winter: ['#ffffff', 40, true], summer: ['', 0, false] };
    function particles(k) {
      const [c, n, snow] = FX[k];
      fx.className = 'fx' + (snow ? ' snow' : '');
      fx.innerHTML = '';
      for (let i = 0; i < n; i++) {
        const el = document.createElement('i');
        el.style.cssText = `--x:${Math.random() * 100}%;--s:${snow ? 3 + Math.random() * 4 : 8 + Math.random() * 8}px;--d:${7 + Math.random() * 8}s;--dl:-${Math.random() * 12}s;--dx:${Math.random() * 120 - 60}px;--fc:${c}`;
        fx.appendChild(el);
      }
    }
    $$('[data-season]', box).forEach((b) => b.addEventListener('click', () => {
      const k = b.dataset.season;
      $$('[data-season]', box).forEach((x) => x.setAttribute('aria-selected', x === b));
      $$('svg[data-s]', box).forEach((s) => s.classList.toggle('on', s.dataset.s === k));
      $$('[data-spanel]', box).forEach((p) => (p.hidden = p.dataset.spanel !== k));
      particles(k);
    }));
  })();

  /* ================= lake colour widget ================= */
  (() => {
    const r = $('#lake-m');
    if (!r) return;
    const T = {
      6: ['6 月:湖面刚化冰,有时还有残冰,颜色偏灰蓝。', 'saturate(.55) brightness(1.1)'],
      7: ['7 月:冰川融水最多,湖水最蓝最亮。最推荐,也最挤。', 'saturate(1.35)'],
      8: ['8 月:仍然很蓝。但野火烟霾偶尔会让天空发灰。', 'saturate(1.2)'],
      9: ['9 月:融水减少,湖色偏绿,人变少,落叶松快变金。', 'hue-rotate(-14deg)'],
      10: ['10 月:湖色变深、天变冷,接驳和很多项目陆续停运。', 'saturate(.8) brightness(.85)'],
    };
    const t = $('#lake-t'), svg = $('#s-louise .banner svg');
    const upd = () => { const [x, f] = T[r.value]; t.textContent = x; if (svg) { svg.style.transition = 'filter .6s'; svg.style.filter = f; } };
    r.addEventListener('input', upd); upd();
  })();

  /* ================= gastown clock + bridge ================= */
  (() => {
    function whistle() {
      try {
        const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
        const ctx = new AC(), t0 = ctx.currentTime;
        const notes = [415.3, 370, 329.6, 246.9]; // Westminster quarters
        notes.forEach((f, i) => {
          const o = ctx.createOscillator(), g = ctx.createGain();
          o.type = 'triangle'; o.frequency.value = f; o.connect(g); g.connect(ctx.destination);
          const s = t0 + i * 0.5;
          g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(0.14, s + 0.04); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.62);
          o.start(s); o.stop(s + 0.7);
        });
        setTimeout(() => ctx.close(), 2800);
      } catch (e) { /* audio is optional */ }
    }
    function blow() {
      const svg = $('#s-gastown .banner svg'); if (!svg) return;
      svg.classList.add('blow'); clearTimeout(blow.t); blow.t = setTimeout(() => svg.classList.remove('blow'), 3200);
      whistle();
    }
    document.addEventListener('click', (e) => { if (e.target.closest('[data-blow]') || e.target.closest('.steam-clock')) { e.preventDefault(); blow(); } });
    function shake(svg) { if (!svg) return; svg.classList.add('shake'); clearTimeout(shake.t); shake.t = setTimeout(() => svg.classList.remove('shake'), 3000); }
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-shake]')) shake($('#s-capilano .banner svg'));
      else if (e.target.closest('#s-capilano .banner svg') && e.target.closest('.sway')) shake($('#s-capilano .banner svg'));
    });
  })();

  /* ================= read aloud ================= */
  const player = $('#player'), plText = $('#pl-text'), plPlay = $('#pl-play'), plVoice = $('#pl-voice');
  const rateRange = $('#rate-range'), rateOut = $('#rate-out');
  const SUP = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const T = { items: [], i: 0, c: 0, state: 'idle', token: 0, rate: Math.min(1.6, Math.max(0.6, +LS.get('speed', 1) || 1)), voices: [], cur: null, errs: 0 };
  rateRange.value = T.rate; rateOut.textContent = T.rate.toFixed(1) + '×';
  const icon = {
    play: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z"/></svg>',
    pause: '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
  };

  function loadVoices() {
    if (!SUP) return;
    const all = speechSynthesis.getVoices();
    T.voices = all.filter((v) => /^zh/i.test(v.lang)).sort((a, b) => (/zh[-_]CN/i.test(b.lang) ? 1 : 0) - (/zh[-_]CN/i.test(a.lang) ? 1 : 0));
    plVoice.innerHTML = T.voices.map((v) => `<option value="${v.voiceURI}">${v.name.replace(/Microsoft |Google /, '')}</option>`).join('');
    const saved = LS.get('voice', null);
    const good = T.voices.find((v) => v.voiceURI === saved) || T.voices.find((v) => /xiaoxiao|yunxi|tingting|ting-ting|huihui|google|普通话|lili|yaoyao/i.test(v.name) && /CN/i.test(v.lang)) || T.voices[0];
    if (good) plVoice.value = good.voiceURI;
    plVoice.hidden = T.voices.length < 2;
  }
  if (SUP) { loadVoices(); speechSynthesis.onvoiceschanged = loadVoices; }
  plVoice.addEventListener('change', () => { LS.set('voice', plVoice.value); if (T.state === 'playing') restartChunk(); });
  rateRange.addEventListener('input', () => { T.rate = +rateRange.value; rateOut.textContent = T.rate.toFixed(1) + '×'; LS.set('speed', T.rate); });
  rateRange.addEventListener('change', () => { if (T.state === 'playing') restartChunk(); });

  const MAP = [
    [/C\$\s?([\d.,]+)/g, '$1加元'],
    [/US\$\s?([\d.,]+)/g, '$1美元'],
    [/S\$\s?([\d.,]+)/g, '$1新元'],
    [/RM\s?([\d.,]+)/g, '$1令吉'],
    [/IDR\s?([\d.,]+)/g, '$1印尼盾'],
    [/UTC\+8/g, '东八区'],
    [/(\d)\s?[–-]\s?(\d)/g, '$1到$2'],
    [/(\d{1,2})\/(\d{1,2})/g, '$1月$2日'],
    [/(\d)\s?km\b/gi, '$1公里'],
    [/(\d)\s?m\b/g, '$1米'],
    [/℃/g, '度'],
    [/×/g, '和'],
    [/→/g, '到'],
    [/[⚠★＋－↻]/g, ''],
    [/\s*[·•]\s*/g, '\uff0c'],
  ];
  function textOf(el) {
    const c = el.cloneNode(true);
    $$('.nosay, svg, script, style', c).forEach((n) => n.remove());
    $$('[data-count]', c).forEach((n) => (n.textContent = n.dataset.count));
    $$('.lbl', c).forEach((n) => n.insertAdjacentText('beforeend', '。'));
    let s = c.textContent.replace(/\s+/g, ' ').trim();
    MAP.forEach(([r, v]) => (s = s.replace(r, v)));
    return s;
  }
  function chunks(s) {
    const out = [];
    (s.match(/[^\u3002\uff01\uff1f\uff1b!?;]+[\u3002\uff01\uff1f\uff1b!?;]*/g) || []).map((x) => x.trim()).filter(Boolean).forEach((p) => {
      if (p.length <= 90) return out.push(p);
      let acc = '';
      (p.match(/[^\uff0c\u3001,]+[\uff0c\u3001,]*/g) || [p]).forEach((q) => { if ((acc + q).length > 80 && acc) { out.push(acc); acc = q; } else acc += q; });
      if (acc) out.push(acc);
    });
    return out;
  }
  const SEL = 'h2, h3, h4, p, li, .say, tr, .kv, .st, .flip, .stat, .boxout, .dbox';
  function collect(rootEl) {
    const items = [];
    let last = null;
    $$(SEL, rootEl).forEach((el) => {
      if (el.closest('.nosay, .player, .pop') || el.classList.contains('spk')) return;
      if (last && last.contains(el)) return;
      if (el.matches('h3') && el.querySelector('.acc-h') && !el.closest('.sec') && !el.closest('.card')) return;
      let txt = el.matches('h3') && el.querySelector('.acc-h') ? textOf(el.querySelector('.sec-h .t') || el.querySelector('.ov-t') || el) : textOf(el);
      if (txt.length < 2) return;
      items.push({ el, chunks: chunks(txt) });
      last = el;
    });
    return items;
  }
  function visible(el) { const r = el.getBoundingClientRect(); return r.height > 0 && r.bottom > BAR + 8; }

  function showPlayer(msg) { player.hidden = false; if (msg) plText.textContent = msg; }
  function mark(el) {
    if (T.cur && T.cur !== el) T.cur.classList.remove('reading');
    T.cur = el; if (el) el.classList.add('reading');
  }
  function stop() {
    T.token++; T.state = 'idle';
    if (SUP) speechSynthesis.cancel();
    mark(null); player.hidden = true;
  }
  function setPlayIcon() { plPlay.innerHTML = T.state === 'playing' ? icon.pause : icon.play; plPlay.setAttribute('aria-label', T.state === 'playing' ? '暂停' : '继续'); }

  function speakCurrent() {
    const tok = ++T.token;
    if (T.i >= T.items.length) { stop(); return; }
    const it = T.items[T.i];
    if (T.c >= it.chunks.length) { T.i++; T.c = 0; return speakCurrent(); }
    const opened = openUp(it.el);
    const go = () => {
      if (tok !== T.token) return;
      if (T.c === 0) { mark(it.el); if (!inView(it.el)) it.el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); }
      plText.textContent = it.chunks[T.c];
      const u = new SpeechSynthesisUtterance(it.chunks[T.c]);
      u.lang = 'zh-CN'; u.rate = T.rate;
      const v = T.voices.find((x) => x.voiceURI === plVoice.value) || T.voices[0];
      if (v) { u.voice = v; u.lang = v.lang; }
      u.onend = () => { if (tok !== T.token) return; T.errs = 0; T.c++; speakCurrent(); };
      u.onerror = (e) => {
        if (tok !== T.token) return;
        if (e.error === 'interrupted' || e.error === 'canceled') return;
        if (++T.errs >= 3 || e.error === 'not-allowed') { stop(); showPlayer('朗读失败:当前浏览器或系统可能没有中文语音。'); setTimeout(() => (player.hidden = true), 4000); return; }
        T.c++; speakCurrent();
      };
      speechSynthesis.cancel();
      setTimeout(() => { if (tok === T.token) speechSynthesis.speak(u); }, 40);
    };
    if (opened) setTimeout(go, 520); else go();
  }
  function inView(el) { const r = el.getBoundingClientRect(); return r.top > BAR + 20 && r.bottom < innerHeight - 90; }
  function restartChunk() { if (T.state === 'playing') speakCurrent(); }
  function begin(items, idx = 0) {
    if (!SUP) { showPlayer('当前浏览器不支持朗读,请换用 Chrome / Edge / Safari。'); setTimeout(() => (player.hidden = true), 4000); return; }
    if (!items.length) return;
    T.items = items; T.i = idx; T.c = 0; T.state = 'playing'; T.errs = 0;
    showPlayer('准备朗读…'); setPlayIcon();
    if (!T.voices.length && speechSynthesis.getVoices().length) plText.textContent = '没有检测到中文语音,将使用系统默认声音尝试。';
    speakCurrent();
  }
  plPlay.addEventListener('click', () => {
    if (T.state === 'playing') { T.state = 'paused'; T.token++; speechSynthesis.cancel(); setPlayIcon(); }
    else if (T.state === 'paused') { T.state = 'playing'; setPlayIcon(); speakCurrent(); }
  });
  $('#pl-next').addEventListener('click', () => { if (T.state === 'idle') return; T.i = Math.min(T.items.length, T.i + 1); T.c = 0; if (T.state === 'paused') { T.state = 'playing'; setPlayIcon(); } speakCurrent(); });
  $('#pl-prev').addEventListener('click', () => { if (T.state === 'idle') return; T.i = Math.max(0, T.i - (T.c > 0 ? 0 : 1)); T.c = 0; if (T.state === 'paused') { T.state = 'playing'; setPlayIcon(); } speakCurrent(); });
  $('#pl-stop').addEventListener('click', stop);
  addEventListener('pagehide', () => SUP && speechSynthesis.cancel());

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-speak]');
    if (b) {
      const tgt = document.getElementById(b.dataset.speak);
      if (T.state !== 'idle' && T.items[0] && T.items[0].el && tgt.contains(T.items[0].el)) { stop(); return; }
      const acc = tgt.closest('.acc'); acc && setAcc(acc, true);
      const title = acc && acc.querySelector(':scope > h3');
      const items = collect(tgt);
      if (title) { const t = textOf(title.querySelector('.t') || title.querySelector('.ov-t') || title); items.unshift({ el: title, chunks: chunks(t) }); }
      setTimeout(() => begin(items), acc && !acc.classList.contains('open') ? 480 : 0);
      return;
    }
    const c = e.target.closest('[data-speak-ch]');
    if (c) { const r = document.getElementById(c.dataset.speakCh); begin(collect(r)); }
  });
  $('#btn-read').addEventListener('click', () => {
    if (T.state !== 'idle') { stop(); return; }
    const secs = $$('main > [id]');
    let cur = secs[0];
    secs.forEach((s) => { if (s.getBoundingClientRect().top <= BAR + 60) cur = s; });
    const rootEl = cur.id === 'top' ? $('.cover') : cur;
    const items = collect(rootEl);
    let idx = items.findIndex((it) => visible(it.el));
    begin(items, idx < 0 ? 0 : idx);
  });
})();
