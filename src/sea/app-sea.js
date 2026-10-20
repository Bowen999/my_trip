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

  /* ================= route map: plane on flight legs, car on the ground ================= */
  (() => {
    const svg = $('.sea-map');
    if (!svg) return;
    const plane = $('#sm-plane'), car = $('#sm-car'), mb = $('#mapbox');
    const pins = {};
    $$('.mp-pin', svg).forEach((p) => { const m = /translate\(([\d.]+) ([\d.]+)\)/.exec(p.getAttribute('transform')); pins[p.dataset.k] = { el: p, x: +m[1], y: +m[2] }; });
    // flight days: D1 the three batches fly into Guangzhou, D2 GZ → KL, D5 KL → Singapore, D6 Singapore → Bali
    const LEG = { 1: $('#leg0'), 2: $('#leg1'), 5: $('#leg2'), 6: $('#leg3') };
    // where the day ends (the car waits there); D4 is a round trip KL → Negeri Sembilan → KL by van
    const CITY = { 1: 'can', 2: 'kul', 3: 'kul', 4: 'kul', 5: 'sin', 6: 'dps', 7: 'dps', 8: 'dps', 9: 'dps' };
    const ON = { 1: ['can'], 2: ['can', 'kul'], 3: ['kul'], 4: ['kul', 'ns'], 5: ['kul', 'sin'], 6: ['sin', 'dps'], 7: ['dps'], 8: ['dps'], 9: ['dps'] };
    const PIN_DAY = { can: 1, kul: 3, ns: 4, sin: 5, dps: 7 };
    let cur = 0, raf = 0, token = 0;
    function follow(x) {
      if (!mb || mb.scrollWidth <= mb.clientWidth) return;
      const k = mb.scrollWidth / 900;
      mb.scrollLeft = Math.max(0, Math.min(mb.scrollWidth - mb.clientWidth, x * k - mb.clientWidth / 2));
    }
    function show(kind) { plane.style.display = kind === 'plane' ? '' : 'none'; car.style.display = kind === 'car' ? '' : 'none'; }
    function placePlane(x, y, rot) { show('plane'); plane.setAttribute('transform', `translate(${x} ${y}) rotate(${rot})`); follow(x); }
    function placeCar(x, y, dir = 1) { show('car'); car.setAttribute('transform', `translate(${x} ${y - 13}) scale(${dir < 0 ? -1 : 1} 1)`); follow(x); }
    function along(path, t) {
      const L = path.getTotalLength(), p = path.getPointAtLength(t * L), q = path.getPointAtLength(Math.min(L, t * L + 2)), q0 = path.getPointAtLength(Math.max(0, t * L - 2));
      placePlane(p.x, p.y, (Math.atan2(q.y - q0.y, q.x - q0.x) * 180) / Math.PI);
    }
    function tween(ms, fn, done, tk) {
      cancelAnimationFrame(raf);
      if (reduce || ms <= 0) { fn(1); done && done(); return; }
      const t0 = performance.now();
      (function f(t) {
        if (tk !== token) return;
        const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        fn(e);
        if (k < 1) raf = requestAnimationFrame(f); else done && done();
      })(t0);
    }
    const parkCar = (key) => placeCar(pins[key].x, pins[key].y, 1);
    // a short loop around the city: the van is out and about
    function cruise(key, tk, ms = 2200) {
      const c = pins[key], r = 17;
      tween(ms, (e) => {
        const a = e * Math.PI * 2, x = c.x + Math.sin(a) * r, y = c.y + (1 - Math.cos(a)) * r * 0.5 - r * 0.5;
        placeCar(x, y, Math.cos(a) >= 0 ? 1 : -1);
      }, () => parkCar(key), tk);
    }
    function playDay(n, animate, tk) {
      const leg = LEG[n], city = CITY[n];
      if (n === 4) {
        // D4: out to the schools in Negeri Sembilan and back
        const a = pins.kul, b = pins.ns;
        tween(animate ? 2600 : 0, (e) => {
          const k = e < 0.5 ? e * 2 : (1 - e) * 2;
          placeCar(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, e < 0.5 ? (b.x >= a.x ? 1 : -1) : (b.x >= a.x ? -1 : 1));
        }, () => parkCar('kul'), tk);
      } else if (leg) {
        // flight: the plane flies the leg, then a car waits at the arrival city
        tween(animate ? 1800 : 0, (e) => along(leg, e), () => parkCar(city), tk);
      } else if (n === 9) {
        // return day (not planned on this page): the plane waits in Bali, nose towards Guangzhou
        const d = pins.dps, g = pins.can;
        placePlane(d.x, d.y - 4, (Math.atan2(g.y - d.y, g.x - d.x) * 180) / Math.PI);
      } else if (animate) cruise(city, tk);
      else parkCar(city);
    }
    function setDay(n, animate = true) {
      if (n === cur) return;
      cancelAnimationFrame(raf);
      const tk = ++token;
      cur = n;
      Object.values(pins).forEach((p) => p.el.classList.remove('on'));
      ON[n].forEach((k) => pins[k] && pins[k].el.classList.add('on'));
      $$('.dchip').forEach((c) => c.classList.toggle('on', +c.dataset.day === n));
      const c = $(`.dchip[data-day="${n}"]`);
      $('#daysum').innerHTML = `<h4>第 ${n} 天 · ${c.dataset.title}</h4><p>${c.dataset.d} · ${c.dataset.sub} · ${c.dataset.move}</p><a href="#d${n}" data-open="d${n}">展开这一天的详细安排 →</a>`;
      playDay(n, animate, tk);
    }
    $$('.dchip').forEach((c) => c.addEventListener('click', () => setDay(+c.dataset.day)));
    Object.entries(pins).forEach(([k, p]) => p.el.addEventListener('click', () => setDay(PIN_DAY[k])));
    parkCar('can');
    $$('.mp-route', svg).forEach((p) => { p.style.opacity = 0; p.style.transition = reduce ? 'none' : 'opacity 1.2s'; });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      $$('.mp-route', svg).forEach((p) => (p.style.opacity = 1));
      setTimeout(() => { if (!cur) setDay(1); }, 500); // don't override a day the reader already picked
    }), { threshold: 0.35 });
    io.observe(svg);
  })();

  /* ================= card covers: once a real photo has loaded, hide the drawn art under it ================= */
  $$('.banner img.photo').forEach((im) => {
    const ok = () => im.parentNode.classList.add('ph-ok');
    // switch only when the photo can actually be painted (decode() resolved), otherwise the cover would flash blank
    const ready = () => (im.decode ? im.decode().then(ok, () => {}) : ok());
    if (im.complete && im.naturalWidth) ready(); else im.addEventListener('load', ready, { once: true });
  });

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
