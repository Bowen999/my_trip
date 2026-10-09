/* Interactions that only the Singapore · KL · Bali page needs. Loaded after app.js. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LS = {
    get(k, d) { try { const v = localStorage.getItem('yvr7:sea.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('yvr7:sea.' + k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } },
  };

  /* ================= route map: plane flies between cities ================= */
  (() => {
    const svg = $('.sea-map');
    if (!svg) return;
    const plane = $('#sm-plane'), mb = $('#mapbox');
    const pins = {};
    $$('.mp-pin', svg).forEach((p) => { const m = /translate\(([\d.]+) ([\d.]+)\)/.exec(p.getAttribute('transform')); pins[p.dataset.k] = { el: p, x: +m[1], y: +m[2] }; });
    const LEG = { 1: $('#leg1'), 3: $('#leg2'), 5: $('#leg3'), 7: $('#leg4') };
    const LOC = { 1: 'sin', 2: 'sin', 3: 'kul', 4: 'ns', 5: 'dps', 6: 'dps', 7: 'can' };
    const ON = { 1: ['can', 'sin'], 2: ['sin'], 3: ['sin', 'kul', 'ns'], 4: ['ns', 'kul'], 5: ['kul', 'dps'], 6: ['dps'], 7: ['dps', 'can'] };
    const PIN_DAY = { can: 1, sin: 2, kul: 3, ns: 4, dps: 6 };
    let cur = 0, raf = 0;
    function follow(x) {
      if (!mb || mb.scrollWidth <= mb.clientWidth) return;
      const k = mb.scrollWidth / 900;
      mb.scrollLeft = Math.max(0, Math.min(mb.scrollWidth - mb.clientWidth, x * k - mb.clientWidth / 2));
    }
    function at(key, rot = -30) {
      const p = pins[key];
      plane.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${rot})`);
      follow(p.x);
    }
    function along(path, t) {
      const L = path.getTotalLength(), p = path.getPointAtLength(t * L), q = path.getPointAtLength(Math.min(L, t * L + 2)), q0 = path.getPointAtLength(Math.max(0, t * L - 2));
      plane.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(${(Math.atan2(q.y - q0.y, q.x - q0.x) * 180) / Math.PI})`);
      follow(p.x);
    }
    function tween(ms, fn, done) {
      cancelAnimationFrame(raf);
      if (reduce || ms <= 0) { fn(1); done && done(); return; }
      const t0 = performance.now();
      (function f(t) {
        const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        fn(e);
        if (k < 1) raf = requestAnimationFrame(f); else done && done();
      })(t0);
    }
    function setDay(n, animate = true) {
      if (n === cur) return;
      const prevLoc = n === 1 ? 'can' : LOC[n - 1];
      if (Math.abs(n - cur) !== 1 || cur === 0) at(prevLoc);
      const leg = LEG[n];
      if (leg) tween(animate ? 1600 : 0, (e) => along(leg, e));
      else at(LOC[n]);
      cur = n;
      Object.values(pins).forEach((p) => p.el.classList.remove('on'));
      ON[n].forEach((k) => pins[k] && pins[k].el.classList.add('on'));
      $$('.dchip').forEach((c) => c.classList.toggle('on', +c.dataset.day === n));
      const c = $(`.dchip[data-day="${n}"]`);
      $('#daysum').innerHTML = `<h4>第 ${n} 天 · ${c.dataset.title}</h4><p>${c.dataset.d} · ${c.dataset.sub} · ${c.dataset.move}</p><a href="#d${n}" data-open="d${n}">展开这一天的详细安排 →</a>`;
    }
    $$('.dchip').forEach((c) => c.addEventListener('click', () => setDay(+c.dataset.day)));
    Object.entries(pins).forEach(([k, p]) => p.el.addEventListener('click', () => setDay(PIN_DAY[k])));
    at('can');
    $$('.mp-route', svg).forEach((p) => { p.style.opacity = 0; p.style.transition = reduce ? 'none' : 'opacity 1.2s'; });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      $$('.mp-route', svg).forEach((p) => (p.style.opacity = 1));
      setTimeout(() => setDay(1), 500);
    }), { threshold: 0.35 });
    io.observe(svg);
  })();

  /* ================= copy-to-clipboard ================= */
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-copy]');
    if (!b) return;
    const src = document.getElementById(b.dataset.copy);
    if (!src) return;
    const text = src.textContent;
    const done = () => { const o = b.innerHTML; b.classList.add('ok'); b.textContent = '已复制 ✓'; setTimeout(() => { b.classList.remove('ok'); b.innerHTML = o; }, 1800); };
    const fallback = () => {
      const t = document.createElement('textarea');
      t.value = text; t.style.cssText = 'position:fixed;opacity:0'; document.body.appendChild(t); t.select();
      try { document.execCommand('copy'); done(); } catch (err) { b.textContent = '请手动复制'; }
      t.remove();
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
  });

  /* ================= generic checklists ================= */
  $$('[data-ckl]').forEach((box) => {
    const id = box.dataset.ckl, boxes = $$('input[type="checkbox"]', box), saved = LS.get('ckl.' + id, {});
    const n = $('[data-n]', box), bar = $('[data-bar]', box);
    function upd() {
      const done = boxes.filter((b) => b.checked).length;
      n.textContent = done; bar.style.width = (done / boxes.length) * 100 + '%';
      const o = {}; boxes.forEach((b) => b.checked && (o[b.dataset.k] = 1)); LS.set('ckl.' + id, o);
    }
    boxes.forEach((b) => { b.checked = !!saved[b.dataset.k]; b.addEventListener('change', upd); });
    $('[data-reset]', box).addEventListener('click', () => { boxes.forEach((b) => (b.checked = false)); upd(); });
    upd();
  });

  /* ================= wedding decision matrix ================= */
  (() => {
    const box = $('#dm');
    if (!box) return;
    const ws = $$('.dm-w', box), ss = $$('.dm-s', box), name = $('.dm-name', box);
    const saved = LS.get('dm', { w: {}, s: {}, name: '' });
    ws.forEach((w) => { if (saved.w[w.dataset.r] != null) w.value = saved.w[w.dataset.r]; });
    ss.forEach((s) => { const v = saved.s[s.dataset.r + '-' + s.dataset.c]; if (v != null) s.value = v; });
    if (saved.name) name.value = saved.name;
    function calc() {
      ['alila', 'tirtha', 'other'].forEach((c) => {
        let got = 0, max = 0;
        ws.forEach((w) => {
          const s = ss.find((x) => x.dataset.r === w.dataset.r && x.dataset.c === c), wt = +w.value, sc = +s.value;
          if (sc > 0) { got += wt * sc; max += wt * 5; }
        });
        const all = ws.reduce((a, w) => a + +w.value * 5, 0);
        const pct = all ? Math.round((got / all) * 100) : 0;
        $(`.dm-t[data-c="${c}"]`, box).textContent = pct;
        $(`.dm-bar i[data-c="${c}"]`, box).style.width = pct + '%';
      });
      const o = { w: {}, s: {}, name: name.value };
      ws.forEach((w) => (o.w[w.dataset.r] = +w.value));
      ss.forEach((s) => (o.s[s.dataset.r + '-' + s.dataset.c] = +s.value));
      LS.set('dm', o);
    }
    [...ws, ...ss].forEach((el) => el.addEventListener('change', calc));
    name.addEventListener('input', calc);
    $('#dm-reset').addEventListener('click', () => { ss.forEach((s) => (s.value = 0)); calc(); });
    calc();
  })();

  /* ================= rain mode ================= */
  (() => {
    const btn = $('#rain-btn');
    if (!btn) return;
    const stage = $('#rain-stage'), fx = $('#rain-fx'), note = $('#rain-note');
    for (let i = 0; i < 70; i++) {
      const el = document.createElement('i');
      el.style.cssText = `--x:${Math.random() * 100}%;--d:${0.5 + Math.random() * 0.5}s;--dl:-${Math.random() * 1.5}s;--h:${10 + Math.random() * 16}px`;
      fx.appendChild(el);
    }
    btn.addEventListener('click', () => {
      const on = !stage.classList.contains('on');
      stage.classList.toggle('on', on);
      btn.setAttribute('aria-pressed', on);
      note.hidden = !on;
    });
  })();

  /* ================= three-currency converter ================= */
  (() => {
    const box = $('#cur3');
    if (!box) return;
    const r = { sgd: $('#r-sgd'), myr: $('#r-myr'), idr: $('#r-idr') };
    const loc = $('#c3-loc'), cny = $('#c3-cny'), lab = $('#c3-lab');
    const NAME = { sgd: '新加坡元', myr: '马来西亚林吉特', idr: '印尼盾' };
    let c = 'sgd';
    const saved = LS.get('rates', {});
    Object.keys(r).forEach((k) => { if (saved[k]) r[k].value = saved[k]; r[k].addEventListener('input', () => { const o = {}; Object.keys(r).forEach((x) => (o[x] = parseFloat(r[x].value) || 0)); LS.set('rates', o); fromLoc(); }); });
    const rate = () => { const v = parseFloat(r[c].value); return v > 0 ? (c === 'idr' ? v / 10000 : v) : 0; };
    function fromLoc() { const x = rate(); if (x && loc.value !== '') cny.value = (loc.value * x).toFixed(2); }
    loc.addEventListener('input', fromLoc);
    cny.addEventListener('input', () => { const x = rate(); if (x && cny.value !== '') loc.value = (cny.value / x).toFixed(c === 'idr' ? 0 : 2); });
    $$('#c3-cur button').forEach((b) => b.addEventListener('click', () => {
      c = b.dataset.c;
      $$('#c3-cur button').forEach((x) => x.classList.toggle('on', x === b));
      lab.textContent = NAME[c]; loc.value = ''; cny.value = '';
    }));
  })();
})();
