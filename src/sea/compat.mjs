// Older-browser fallbacks, applied to the stylesheet at build time (the shared src/style.css stays untouched).
//  - color-mix():   Safari < 16.2 does not know it. A declaration that contains var() is still accepted at PARSE time, so a plain
//                   "fallback; original" pair does not work (the invalid original wins and computes to `unset`). Instead the original
//                   stays where it is and plain-colour copies of the same declarations are appended at the end, inside
//                   `@supports not (color: color-mix(...))`, with the same selector (same specificity, later in source order).
//  - inset:                    Safari < 14.1  -> longhand top/right/bottom/left
//  - margin/padding-inline|block: Safari < 14.1 -> physical longhands first
//  - overflow:clip:            Safari < 16    -> overflow:hidden first
//  - overflow-wrap:anywhere:   Safari < 15.4  -> overflow-wrap:break-word + word-break:break-word first
//  - aspect-ratio:             Safari < 15 collapses boxes whose children are absolutely positioned -> padding fallback in @supports
// Browsers that support the modern syntax simply override the fallback that comes before it (or ignore the @supports-not block).

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const isEscaped = (s, i) => { let n = 0; while (i - 1 - n >= 0 && s[i - 1 - n] === '\\') n++; return n % 2 === 1; };

// index of the "}" that closes the "{" at position `open` (quotes and parentheses are skipped)
function matchBrace(css, open) {
  let depth = 0, quote = '';
  for (let i = open; i < css.length; i++) {
    const ch = css[i];
    if (quote) { if (ch === quote && !isEscaped(css, i)) quote = ''; continue; }
    if (ch === '"' || ch === "'") { quote = ch; continue; }
    if (ch === '{') depth++;
    else if (ch === '}' && --depth === 0) return i;
  }
  return css.length - 1;
}

// split at top level (outside quotes and parentheses) on `sep` (a single character; ',' ';' or whitespace)
function splitTop(str, sep) {
  const out = [];
  let depth = 0, quote = '', cur = '';
  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (quote) { cur += ch; if (ch === quote && !isEscaped(str, i)) quote = ''; continue; }
    if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue; }
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    const hit = depth === 0 && (sep === ' ' ? /\s/.test(ch) : ch === sep);
    if (hit) { if (sep !== ' ' || cur) out.push(cur); cur = ''; } else cur += ch;
  }
  if (sep !== ' ' || cur) out.push(cur);
  return out.map((s) => s.trim()).filter((s, i, a) => s || sep === ',' || i < a.length);
}

function parseList(css, pos) {
  const nodes = [];
  let i = pos;
  while (i < css.length) {
    while (i < css.length && /\s/.test(css[i])) i++;
    if (i >= css.length) break;
    if (css[i] === '}') return { nodes, pos: i + 1 };
    let j = i, depth = 0, quote = '';
    for (; j < css.length; j++) {
      const ch = css[j];
      if (quote) { if (ch === quote && !isEscaped(css, j)) quote = ''; continue; }
      if (ch === '"' || ch === "'") { quote = ch; continue; }
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      else if (depth === 0 && (ch === '{' || ch === ';' || ch === '}')) break;
    }
    const prelude = css.slice(i, j).trim();
    if (css[j] === ';') { nodes.push({ type: 'raw', text: prelude + ';' }); i = j + 1; continue; }
    if (css[j] !== '{') { if (prelude) nodes.push({ type: 'raw', text: prelude }); i = j; if (css[j] === '}') return { nodes, pos: j + 1 }; continue; }
    const end = matchBrace(css, j);
    const name = (/^@([\w-]+)/.exec(prelude) || [])[1];
    if (name && ['media', 'supports', 'layer', 'container'].includes(name)) {
      const r = parseList(css.slice(0, end), j + 1); // children end at the matching brace
      nodes.push({ type: 'at', prelude, children: r.nodes });
    } else if (name) {
      nodes.push({ type: 'raw', text: css.slice(i, end + 1) }); // @keyframes, @font-face, ...
    } else {
      nodes.push({ type: 'rule', sel: prelude, decls: splitTop(css.slice(j + 1, end), ';').filter(Boolean) });
    }
    i = end + 1;
  }
  return { nodes, pos: i };
}

/* ---------- color-mix(in srgb, A p%, B [q%]) -> the colour that carries more weight ---------- */
function closing(str, open) {
  let depth = 0;
  for (let i = open; i < str.length; i++) {
    if (str[i] === '(') depth++;
    else if (str[i] === ')' && --depth === 0) return i;
  }
  return -1;
}
const isTransparent = (c) => /^transparent$/i.test(c.trim());
function plainColor(inner, prop) {
  const [, a, b] = splitTop(inner, ',');
  const pct = (s) => { const m = /(?:^|\s)(\d+(?:\.\d+)?)%\s*$|^(\d+(?:\.\d+)?)%\s/.exec(s || ''); return m ? parseFloat(m[1] ?? m[2]) : null; };
  const bare = (s) => s.replace(/\s*\d+(?:\.\d+)?%\s*$/, '').replace(/^\d+(?:\.\d+)?%\s+/, '').trim();
  const pa = pct(a), pb = pct(b);
  const wa = pa ?? (pb != null ? 100 - pb : 50);
  const wb = pb ?? (pa != null ? 100 - pa : 50);
  let winner = wa >= wb ? bare(a) : bare(b);
  const other = wa >= wb ? bare(b) : bare(a);
  const otherWeight = wa >= wb ? wb : wa;
  // a faint-but-visible decoration (border, outline, underline, text stroke) must not vanish in the fallback
  if (isTransparent(winner) && !isTransparent(other) && !/^(background|box-shadow)/.test(prop)) winner = other;
  // a plain tinted background (e.g. the read-aloud highlight) gets a neutral tint instead of nothing
  if (isTransparent(winner) && /^background(-color)?$/.test(prop) && !isTransparent(other) && otherWeight >= 15) winner = 'var(--paper-2)';
  return winner;
}
function flattenColorMix(value, prop) {
  let v = value, guard = 0;
  while (v.includes('color-mix(') && guard++ < 20) {
    const i = v.indexOf('color-mix(');
    const open = i + 'color-mix'.length;
    const end = closing(v, open);
    if (end < 0) break;
    v = v.slice(0, i) + plainColor(v.slice(open + 1, end), prop) + v.slice(end + 1);
  }
  return v;
}

/* ---------- one declaration -> declarations (fallbacks first) ---------- */
function expandBox(prefix, parts) {
  const [t, r = t, b = t, l = r] = parts;
  return [`${prefix}top:${t}`, `${prefix}right:${r}`, `${prefix}bottom:${b}`, `${prefix}left:${l}`];
}
function declCompat(decl, fb) {
  const colon = decl.indexOf(':');
  if (colon < 0) return [decl];
  const prop = decl.slice(0, colon).trim();
  let value = decl.slice(colon + 1).trim();
  if (prop.startsWith('--')) return [decl];
  const important = /\s*!important\s*$/i.test(value) ? ' !important' : '';
  const base = important ? value.replace(/\s*!important\s*$/i, '') : value;
  const parts = () => splitTop(base, ' ');
  const out = [];
  if (prop === 'inset') {
    const p = parts();
    return expandBox('', p).map((d) => d + important).map((d) => d.replace(/^top:/, 'top:'));
  }
  if (/^(margin|padding)-(inline|block)$/.test(prop)) {
    const [kind, axis] = prop.split('-');
    const [a, b = a] = parts();
    out.push(...(axis === 'inline' ? [`${kind}-left:${a}${important}`, `${kind}-right:${b}${important}`] : [`${kind}-top:${a}${important}`, `${kind}-bottom:${b}${important}`]));
  }
  if (/^overflow(-x|-y)?$/.test(prop) && /\bclip\b/.test(base)) out.push(`${prop}:${base.replace(/\bclip\b/g, 'hidden')}${important}`);
  if (prop === 'overflow-wrap' && /\banywhere\b/.test(base)) out.push(`overflow-wrap:break-word${important}`, `word-break:break-word${important}`);
  if (value.includes('color-mix(')) fb.push(`${prop}:${flattenColorMix(value, prop)}`);
  out.push(decl);
  return out;
}

/* ---------- serialise ---------- */
function ser(nodes, ctx, fb) {
  let out = '';
  for (const n of nodes) {
    if (n.type === 'raw') out += n.text;
    else if (n.type === 'at') out += `${n.prelude}{${ser(n.children, [...ctx, n.prelude], fb)}}`;
    else {
      const mine = [];
      const decls = n.decls.flatMap((d) => declCompat(d, mine));
      out += `${n.sel}{${decls.join(';')}}`;
      if (mine.length) fb.push({ ctx, sel: n.sel, decls: mine });
    }
  }
  return out;
}

export function cssCompat(css) {
  const nodes = parseList(stripComments(css), 0).nodes;
  const fb = [];
  const main = ser(nodes, [], fb);
  const flat = fb.map((f) => `${f.ctx.map((p) => `${p}{`).join('')}${f.sel}{${f.decls.join(';')}}${'}'.repeat(f.ctx.length)}`).join('');
  return `${main}
/* plain-colour copies for browsers without color-mix() (Safari < 16.2); same selectors, later in the cascade */
@supports not (color: color-mix(in srgb, red 50%, blue)) {${flat}}
@supports not (aspect-ratio: 1 / 1) {
  .banner { height: 0; padding-bottom: 38.75%; }
  .prov .pic { height: 0; padding-bottom: 75%; }
  .s-stage { height: 0; padding-bottom: 62.5%; }
  .rain-stage { height: 0; padding-bottom: 50%; }
}
@supports not (aspect-ratio: 1 / 1) { @media (max-width: 640px) { .banner { padding-bottom: 56.25%; } } }
`;
}
