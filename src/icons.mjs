// Small line icons (24px grid) + flat food illustrations (64px grid).

const L = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  cal: '<rect x="4" y="5" width="16" height="15" rx="2"/><path d="M4 10h16M9 3v4M15 3v4"/>',
  wallet: '<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M16 14.5h2"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a3.5 3.5 0 0 0 0-7h-4a3.5 3.5 0 0 1 0-7h6"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
  totem: '<rect x="8" y="3" width="8" height="18" rx="1"/><path d="M8 9h8M8 15h8M4 8l4 2M20 8l-4 2"/>',
  bubble: '<path d="M4 5h16v11h-9l-4 4v-4H4z"/>',
  people: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3 19c0-3.5 3-5.5 6-5.5s6 2 6 5.5M15 14.5c3 0 6 1.6 6 4.5"/>',
  boot: '<path d="M8 3v9l-4 3v4h14v-3l-5-2V3z"/>',
  hockey: '<path d="M5 3l9 15h5v3h-7L3 5z"/><ellipse cx="19" cy="7" rx="2.4" ry="1.3"/>',
  coin: '<circle cx="12" cy="12" r="8"/><path d="M12 7.5v9M9.5 10c0-1.6 5-1.6 5 0s-5 2-5 4 5 1.6 5 0"/>',
  speaker: '<path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11"/>',
  moon: '<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/>',
  expand: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  collapse: '<path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/>',
  star: '<path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  warn: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.5"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  pin: '<path d="M12 21s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/>',
  plane: '<path d="M21 15v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V8l-8 5v2l8-2.5V18l-2 1.5V21l3.5-1 3.5 1v-1.5L13 18v-5.5z"/>',
  car: '<path d="M5 16V11l2-5h10l2 5v5M3 16h18v3H3zM7 19v2M17 19v2"/><circle cx="7.5" cy="13.5" r=".8"/><circle cx="16.5" cy="13.5" r=".8"/>',
  eat: '<path d="M7 3v8a2 2 0 0 0 2 2v8M5 3v6M9 3v6M17 21V3c-2.2 1.2-3 4-3 7 0 2 1 3 3 3"/>',
  bed: '<path d="M3 18V7M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="1.6"/>',
  list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.5M4 12h.5M4 18h.5"/>',
  top: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  prev: '<rect x="5" y="5" width="3" height="14" rx="1"/><path d="M19 5L9 12l10 7z"/>',
  next: '<path d="M5 5l10 7-10 7z"/><rect x="16" y="5" width="3" height="14" rx="1"/>',
  play: '<path d="M7 4l13 8-13 8z"/>',
  pause: '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="1"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  shuffle: '<path d="M3 7h4l10 10h4M3 17h4l3-3M14 10l3-3h4M18 4l3 3-3 3M18 14l3 3-3 3"/>',
};

export function ico(name, { cls = '', fill = false, w = 24 } = {}) {
  const d = L[name];
  if (!d) throw new Error('icon ' + name);
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" width="${w}" height="${w}" aria-hidden="true" focusable="false" ${fill ? 'fill="currentColor" stroke="none"' : 'fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"'}>${d}</svg>`;
}

const F = {
  salmon: '<ellipse cx="30" cy="34" rx="22" ry="12" fill="#f28b6b"/><path d="M50 34l12-10v20z" fill="#e0694a"/><path d="M14 30q14-8 30 0" fill="none" stroke="#f9c3b0" stroke-width="3"/><circle cx="18" cy="31" r="2.4" fill="#222"/><path d="M26 24q4 10 0 20M34 24q4 10 0 20" stroke="#d9553a" stroke-width="2" fill="none" opacity=".6"/>',
  hotdog: '<rect x="6" y="34" width="52" height="14" rx="7" fill="#e2a65a"/><rect x="4" y="26" width="56" height="12" rx="6" fill="#c8402f"/><path d="M8 30q6-5 12 0t12 0 12 0 12 0" fill="none" stroke="#f6c83d" stroke-width="3"/><path d="M10 40h44" stroke="#2c4a3a" stroke-width="3" opacity=".8"/>',
  dimsum: '<ellipse cx="32" cy="46" rx="26" ry="9" fill="#b67a45"/><path d="M6 46v-8h52v8" fill="#c98d56"/><path d="M14 38q18-26 36 0z" fill="#fff6e5"/><path d="M22 31q2 5 0 7M28 28q2 6 0 10M34 28q-2 6 0 10M40 31q-2 5 0 7" stroke="#e5d4b5" stroke-width="1.6" fill="none"/>',
  nanaimo: '<rect x="8" y="14" width="48" height="12" rx="2" fill="#5a3320"/><rect x="8" y="26" width="48" height="10" fill="#f4dd8b"/><rect x="8" y="36" width="48" height="14" rx="2" fill="#a86a3c"/><path d="M12 20h40" stroke="#7a4a2e" stroke-width="1.6"/>',
  beef: '<path d="M12 36C10 22 24 14 38 16C52 18 56 30 50 40C44 50 20 52 12 36Z" fill="#a8412f"/><path d="M18 32q10-8 24-6M20 40q12-4 24-2" stroke="#6b2418" stroke-width="2" fill="none"/><circle cx="42" cy="34" r="5" fill="#f4e7cc"/>',
  caesar: '<path d="M18 14h28l-4 38a3 3 0 0 1-3 3H25a3 3 0 0 1-3-3z" fill="#e9eef3" opacity=".9"/><path d="M20 24h24l-2.6 28H22.6z" fill="#c8302d"/><path d="M36 8l-4 26" stroke="#5aa64a" stroke-width="4" stroke-linecap="round"/><circle cx="46" cy="16" r="6" fill="#9bcf4a"/>',
  ginger: '<ellipse cx="32" cy="42" rx="26" ry="10" fill="#eee2c8"/><path d="M6 42q26 22 52 0z" fill="#c9553a"/><g fill="#b4561f"><rect x="14" y="26" width="12" height="6" rx="3" transform="rotate(-18 20 29)"/><rect x="28" y="22" width="14" height="6" rx="3" transform="rotate(12 35 25)"/><rect x="34" y="30" width="12" height="6" rx="3" transform="rotate(-8 40 33)"/></g><circle cx="22" cy="24" r="3" fill="#f2c94c"/><circle cx="44" cy="24" r="3" fill="#f2c94c"/>',
  beavertail: '<path d="M8 36C8 20 28 12 44 16C58 20 60 40 46 46C32 52 8 50 8 36Z" fill="#d9a15b"/><path d="M18 26l8 4M26 20l8 6M36 20l6 6M20 38l10 3M32 40l9-2" stroke="#8a5a2b" stroke-width="2.4" stroke-linecap="round"/><g fill="#fff6e8"><circle cx="30" cy="30" r="1.6"/><circle cx="40" cy="36" r="1.6"/><circle cx="22" cy="34" r="1.6"/></g>',
  poutine: '<path d="M8 32h48l-6 18a4 4 0 0 1-4 3H18a4 4 0 0 1-4-3z" fill="#e6e1d5"/><g stroke="#f2c14e" stroke-width="5" stroke-linecap="round"><path d="M18 30L22 14M26 30L28 12M34 30L34 12M42 30L40 14M48 30L44 16"/></g><path d="M12 30q8 6 16 0t16 0 8 0v4H12z" fill="#7a4a2b"/><g fill="#fff7e0"><circle cx="24" cy="26" r="3"/><circle cx="36" cy="24" r="3"/><circle cx="44" cy="28" r="3"/></g>',
  coffee: '<path d="M12 22h34l-3 28a4 4 0 0 1-4 3H19a4 4 0 0 1-4-3z" fill="#d6342c"/><rect x="10" y="16" width="38" height="8" rx="3" fill="#f3efe6"/><path d="M46 28h4a6 6 0 0 1 0 12h-5" fill="none" stroke="#d6342c" stroke-width="4"/><path d="M22 10q-3-4 0-8M32 10q-3-4 0-8" stroke="#b6b0a4" stroke-width="2" fill="none" stroke-linecap="round"/>',
};

export function food(key) {
  return `<svg class="food-art" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">${F[key]}</svg>`;
}
