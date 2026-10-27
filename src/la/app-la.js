/* Interactions that only the LA page needs. Loaded after app.js. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LS = {
    get(k, d) { try { const v = localStorage.getItem('yvr7:la.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('yvr7:la.' + k, JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } },
  };

  /* ================= countdown ================= */
  (() => {
    const els = $$('[data-cd]');
    if (!els.length) return;
    const upd = () => {
      const now = Date.now();
      els.forEach((el) => {
        const t = new Date(el.dataset.cd).getTime();
        const d = Math.ceil((t - now) / 864e5);
        el.textContent = d > 1 ? d + ' 天' : d === 1 ? '明天' : d === 0 ? '今天' : '已出发';
      });
    };
    upd();
    setInterval(upd, 36e5);
  })();

  /* ================= route map: the car drives each leg; the plane flies in / out of LAX ================= */
  (() => {
    const svg = $('.sea-map');
    if (!svg) return;
    const car = $('#sm-car'), plane = $('#sm-plane'), mb = $('#mapbox');
    const pins = {};
    $$('.mp-pin', svg).forEach((p) => { const m = /translate\(([\d.]+) ([\d.]+)\)/.exec(p.getAttribute('transform')); pins[p.dataset.k] = { el: p, x: +m[1], y: +m[2] }; });
    // D1: fly into LAX (#fly1) then drive leg1 to Disney. D2: shuttle day, car stays. D3: legs 2-6 loop. D4: leg7 to LAX, then the plane takes off.
    const LEG = { 1: [$('#leg1')], 3: [$('#leg2'), $('#leg3'), $('#leg4'), $('#leg5'), $('#leg6')], 4: [$('#leg7')] };
    const FLY = { 1: 1, 4: -1 };   // 1: land at LAX · -1: take off from LAX
    const CITY = { 1: 'dsn', 2: 'dsn', 3: 'usc', 4: 'lax' };   // where the day ends (the car waits there)
    const ON = { 1: ['lax', 'dsn'], 2: ['dsn'], 3: ['dsn', 'usc', 'hw', 'bh', 'getty'], 4: ['usc', 'lax'] };
    const PIN_DAY = { lax: 1, dsn: 2, usc: 3, hw: 3, bh: 3, getty: 3 };
    const PIN_NAME = { lax: '洛杉矶机场', dsn: '迪士尼', usc: 'USC', hw: '好莱坞', bh: '比弗利山庄', getty: 'Getty 中心' };
    let cur = 0, raf = 0, token = 0;
    // on phones the map scrolls sideways and follows the car; once the reader pans the map by hand, it stops following.
    let userPan = false;
    ['touchstart', 'wheel', 'pointerdown'].forEach((ev) => mb && mb.addEventListener(ev, () => { userPan = true; }, { passive: true }));
    function follow(x) {
      if (!mb || userPan || mb.scrollWidth <= mb.clientWidth) return;
      const k = mb.scrollWidth / 900;
      mb.scrollLeft = Math.max(0, Math.min(mb.scrollWidth - mb.clientWidth, x * k - mb.clientWidth / 2));
    }
    function placeCar(x, y, dir = 1, f = true) { car.style.display = ''; car.setAttribute('transform', `translate(${x} ${y - 17}) scale(${dir < 0 ? -1 : 1} 1)`); if (f) follow(x); }
    function placePlane(x, y, deg, f = true) { plane.style.display = ''; plane.setAttribute('transform', `translate(${x} ${y}) rotate(${deg}) scale(1.5)`); if (f) follow(x); }
    function along(path, t, park = true) {
      const L = path.getTotalLength(), p = path.getPointAtLength(t * L), q = path.getPointAtLength(Math.min(L, t * L + 3)), q0 = path.getPointAtLength(Math.max(0, t * L - 3));
      placeCar(p.x + (park ? PARK * t : 0), p.y, q.x - q0.x >= 0 ? 1 : -1);   // on the last leg it drifts to the left of the pin as it arrives, so it never sits on the city label
    }
    function fly(path, t, dir) {
      const L = path.getTotalLength(), at = dir > 0 ? t * L : (1 - t) * L;
      const p = path.getPointAtLength(at), q = path.getPointAtLength(Math.min(L, at + 3 * dir)), q0 = path.getPointAtLength(Math.max(0, at - 3 * dir));
      placePlane(p.x, p.y, Math.atan2(q.y - q0.y, q.x - q0.x) * 180 / Math.PI + 90);
    }
    // still: the frame to show instead of animating (prefers-reduced-motion); ms <= 0 always jumps to the end state
    function tween(ms, fn, done, tk, still = 1) {
      cancelAnimationFrame(raf);
      if (reduce || ms <= 0) { fn(ms <= 0 ? 1 : still); done && done(); return; }
      const t0 = performance.now();
      (function f(t) {
        if (tk !== token) return;
        const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        fn(e);
        if (k < 1) raf = requestAnimationFrame(f); else done && done();
      })(t0);
    }
    const PARK = -30;
    const parkCar = (key) => placeCar(pins[key].x + PARK, pins[key].y, 1);
    // a short loop around the city: the car is out and about (D2 shuttle day: it just cruises the resort area)
    function cruise(key, tk, ms = 2200) {
      const c = { x: pins[key].x + PARK, y: pins[key].y }, r = 17;
      tween(ms, (e) => {
        const a = e * Math.PI * 2, x = c.x + Math.sin(a) * r, y = c.y + (1 - Math.cos(a)) * r * 0.5 - r * 0.5;
        placeCar(x, y, Math.cos(a) >= 0 ? 1 : -1, false); // a small loop: the map must not sway with it
      }, () => parkCar(key), tk);
    }
    function playDay(n, animate, tk) {
      const legs = LEG[n], city = CITY[n], flyDir = FLY[n];
      const drive = (i, done) => {
        const last = i === legs.length - 1;
        tween(animate ? 1800 : 0, (e) => along(legs[i], e, last), () => (last ? done() : drive(i + 1, done)), tk);
      };
      const arrive = () => { plane.style.display = 'none'; parkCar(city); };
      const startDrive = () => { if (legs) drive(0, arrive); else if (animate) { follow(pins[city].x); cruise(city, tk); } else arrive(); };
      if (flyDir && animate) {
        car.style.display = 'none';
        tween(2400, (e) => fly($('#fly1'), e, flyDir), () => {
          if (flyDir > 0) { plane.style.display = 'none'; car.style.display = ''; startDrive(); }
          else arrive();   // took off: keep the plane at the top edge, park the car at LAX
        }, tk, flyDir > 0 ? 1 : 0);
      } else if (flyDir) {
        // no animation: jump straight to the end state
        plane.style.display = 'none';
        startDrive();
      } else startDrive();
    }
    function setDay(n, animate = true) {
      if (n === cur) return;
      animate = animate && !document.hidden; // a background tab pauses requestAnimationFrame: jump to the end state instead
      userPan = false;
      cancelAnimationFrame(raf);
      const tk = ++token;
      cur = n;
      Object.values(pins).forEach((p) => p.el.classList.remove('on'));
      (ON[n] || []).forEach((k) => pins[k] && pins[k].el.classList.add('on'));
      $$('.dchip').forEach((c) => c.classList.toggle('on', +c.dataset.day === n));
      const c = $(`.dchip[data-day="${n}"]`);
      $('#daysum').innerHTML = `<h4>第 ${n} 天 · ${c.dataset.title}</h4><p>${c.dataset.d} · ${c.dataset.sub} · ${c.dataset.move}</p><a href="#d${n}" data-open="d${n}">展开这一天的详细安排 →</a>`;
      playDay(n, animate, tk);
    }
    $$('.dchip').forEach((c) => c.addEventListener('click', () => setDay(+c.dataset.day)));
    Object.entries(pins).forEach(([k, p]) => {
      p.el.addEventListener('click', () => setDay(PIN_DAY[k]));
      p.el.setAttribute('tabindex', '0');
      p.el.setAttribute('role', 'button');
      p.el.setAttribute('aria-label', `${PIN_NAME[k]}:看第 ${PIN_DAY[k]} 天`);
      p.el.addEventListener('keydown', (ev) => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); setDay(PIN_DAY[k]); } });
    });
    parkCar('lax');
    $$('.mp-route', svg).forEach((p) => { p.style.opacity = 0; p.style.transition = reduce ? 'none' : 'opacity 1.2s'; });
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      $$('.mp-route', svg).forEach((p) => (p.style.opacity = 1));
      setTimeout(() => { if (!cur) setDay(1); }, 500); // don't override a day the reader already picked
    }), { threshold: 0.35 });
    io.observe(svg);
  })();

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

  /* ================= food filter (park vs city) ================= */
  (() => {
    const bar = $('#food-filter');
    if (!bar) return;
    const items = $$('#foods .food');
    $$('button', bar).forEach((b) => b.addEventListener('click', () => {
      $$('button', bar).forEach((x) => { const on = x === b; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
      items.forEach((f) => { f.hidden = b.dataset.w !== 'all' && f.dataset.w !== b.dataset.w; f.classList.add('in'); });
    }));
  })();

  /* ================= photo viewer: tap a real photo to enlarge it ================= */
  (() => {
    const lb = document.createElement('div');
    lb.className = 'lb'; lb.hidden = true;
    lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', '照片大图');
    lb.innerHTML = '<div class="lb-img"></div><div class="lb-cap"></div><button type="button" class="lb-x" aria-label="关闭">&times;</button><button type="button" class="lb-p" aria-label="上一张">&#8249;</button><button type="button" class="lb-n" aria-label="下一张">&#8250;</button>';
    document.body.appendChild(lb);
    const img = $('.lb-img', lb), cap = $('.lb-cap', lb), prev = $('.lb-p', lb), next = $('.lb-n', lb);
    let set = [], i = 0, opener = null;
    const bg = (el) => getComputedStyle(el).backgroundImage;
    function render() {
      const el = set[i];
      img.style.backgroundImage = bg(el);
      const fc = el.parentNode.querySelector('figcaption');
      cap.textContent = (set.length > 1 ? (i + 1) + ' / ' + set.length + '  ' : '') + (fc ? fc.textContent : '');
      prev.hidden = next.hidden = set.length < 2;
    }
    function open(el) {
      set = $$('.ph-img', el.closest('.ph-row') || document);
      i = Math.max(0, set.indexOf(el)); opener = el;
      render(); lb.hidden = false;
      document.documentElement.style.overflow = 'hidden';
      $('.lb-x', lb).focus();
    }
    function close() {
      if (lb.hidden) return;
      lb.hidden = true;
      document.documentElement.style.overflow = '';
      if (opener) opener.focus();
    }
    const step = (d) => { if (set.length > 1) { i = (i + d + set.length) % set.length; render(); } };
    document.addEventListener('click', (e) => { const el = e.target.closest('.ph-img'); if (el) open(el); });
    document.addEventListener('keydown', (e) => {
      if (lb.hidden) {
        const el = e.target.closest && e.target.closest('.ph-img');
        if (el && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); open(el); }
        return;
      }
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'ArrowRight') step(1);
    });
    img.addEventListener('click', close);
    cap.addEventListener('click', close);
    $('.lb-x', lb).addEventListener('click', close);
    prev.addEventListener('click', () => step(-1));
    next.addEventListener('click', () => step(1));
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
    lb.addEventListener('touchend', (e) => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); }, { passive: true });
  })();
})();
