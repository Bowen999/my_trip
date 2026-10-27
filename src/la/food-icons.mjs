// LA food icons: 64 x 64 viewBox snippets, same format as src/icons.mjs. No lettering, no brand marks.
import { food as baseFood } from '../icons.mjs';

const shadow = '<ellipse cx="32" cy="54" rx="26" ry="4" fill="#000" opacity=".1"/>';

export const LA_FOODS = {
  // Double-Double style burger
  burger:
    shadow +
    '<path d="M8 28Q8 12 32 12Q56 12 56 28Q32 24 8 28Z" fill="#e2a95c"/><g fill="#fff3d0"><circle cx="20" cy="18" r="1.4"/><circle cx="30" cy="15" r="1.3"/><circle cx="42" cy="17" r="1.4"/><circle cx="26" cy="21" r="1.1"/></g>' +
    '<path d="M7 28Q14 24 20 28T32 28T44 28T57 28Q56 33 50 33H14Q8 33 7 28Z" fill="#7ab648"/>' +
    '<path d="M10 33H54L50 38H14Z" fill="#f2c14e"/><path d="M14 38H50Q52 44 44 44H20Q12 44 14 38Z" fill="#8a4a2a"/>' +
    '<path d="M10 44H54Q54 54 44 54H20Q10 54 10 44Z" fill="#dda35a"/>',
  // Dole Whip style soft serve
  softserve:
    shadow +
    '<path d="M24 34L32 56L40 34Z" fill="#dda35a"/><path d="M26 40L38 44M27.5 46L36.5 49" stroke="#b97a34" stroke-width="1.4"/>' +
    '<path d="M20 34Q20 26 32 26Q44 26 44 34Q42 38 32 38Q22 38 20 34Z" fill="#f6d86a"/><path d="M23 27Q24 20 32 20Q40 20 41 27Q36 24 32 24Q28 24 23 27Z" fill="#f9e27a"/><path d="M27 20Q28 13 33 12Q38 13 37 20Q33 17 27 20Z" fill="#fbe98e"/><circle cx="33" cy="11" r="2.4" fill="#fbe98e"/>',
  // churro with cinnamon sugar
  churro:
    shadow +
    '<g transform="rotate(28 32 32)"><rect x="26" y="8" width="12" height="42" rx="6" fill="#c98a3f"/><path d="M29 10V48M32 10V49M35 10V48" stroke="#a86a22" stroke-width="1.6"/><path d="M26 14H38M26 24H38M26 34H38M26 44H38" stroke="#a86a22" stroke-width="1.1" opacity=".7"/></g><g fill="#8a5a22" opacity=".8"><circle cx="18" cy="46" r="1.2"/><circle cx="46" cy="20" r="1.2"/><circle cx="44" cy="44" r="1.1"/><circle cx="22" cy="22" r="1.1"/></g>',
  // turkey leg
  drumstick:
    shadow +
    '<path d="M14 40Q10 26 24 20Q38 14 46 24Q54 34 46 42Q36 52 24 50Q16 48 14 40Z" fill="#b06a32"/><path d="M16 36Q16 26 28 22" stroke="#d99a58" stroke-width="2.4" fill="none"/>' +
    '<path d="M46 38L56 46" stroke="#e8e0d0" stroke-width="5" stroke-linecap="round"/><circle cx="58" cy="48" r="4" fill="#e8e0d0"/><circle cx="61" cy="44" r="3.4" fill="#e8e0d0"/>',
  // corn dog
  corndog:
    shadow +
    '<path d="M32 44V58" stroke="#c9a23a" stroke-width="3.4" stroke-linecap="round"/>' +
    '<g transform="rotate(-8 32 26)"><rect x="22" y="6" width="20" height="40" rx="10" fill="#e2a95c"/><path d="M26 10Q32 8 38 10M25 20H39M25 30H39" stroke="#c98a3f" stroke-width="1.6" fill="none"/><circle cx="28" cy="15" r="1.2" fill="#b97a34"/><circle cx="35" cy="25" r="1.2" fill="#b97a34"/></g>',
  // sourdough bread bowl with chowder
  breadbowl:
    shadow +
    '<circle cx="32" cy="36" r="22" fill="#dda35a"/><circle cx="32" cy="34" r="17" fill="#b97a34"/><ellipse cx="32" cy="32" rx="14" ry="11" fill="#f6ecd9"/>' +
    '<g fill="#e8dcc4"><circle cx="27" cy="30" r="2.2"/><circle cx="36" cy="33" r="2"/><circle cx="32" cy="27" r="1.8"/></g><path d="M26 18Q24 14 28 12M34 16Q32 12 36 10" stroke="#cfc4b0" stroke-width="2" fill="none" stroke-linecap="round"/>',
  // Monte Cristo style sandwich
  sandwich:
    shadow +
    '<path d="M12 44L32 18L52 44Z" fill="#e2a95c"/><path d="M12 44L32 18L52 44Z" fill="#c98a3f" opacity=".0"/>' +
    '<path d="M16 40L48 40L32 22Z" fill="#f6e9c8"/><path d="M19 36H45" stroke="#e8553f" stroke-width="3"/><path d="M23 31H41" stroke="#f2c14e" stroke-width="3"/><path d="M27 26H37" stroke="#7ab648" stroke-width="3"/>' +
    '<path d="M12 44L32 18L52 44Z" fill="none" stroke="#b97a34" stroke-width="2"/><g fill="#fff" opacity=".9"><circle cx="24" cy="42" r="1.1"/><circle cx="32" cy="43" r="1.1"/><circle cx="40" cy="42" r="1.1"/></g><circle cx="32" cy="14" r="3" fill="#c0392b"/>',
  // street taco
  taco:
    shadow +
    '<path d="M10 44Q10 22 32 22Q54 22 54 44Z" fill="#e8b45a"/><path d="M12 44Q14 26 32 26Q50 26 52 44Z" fill="#d99a3f"/>' +
    '<g fill="#7ab648"><circle cx="20" cy="30" r="3.4"/><circle cx="30" cy="26" r="3.4"/><circle cx="42" cy="29" r="3.4"/></g><g fill="#b06a32"><circle cx="24" cy="34" r="3"/><circle cx="35" cy="31" r="3"/><circle cx="44" cy="35" r="3"/></g><g fill="#c0392b"><circle cx="18" cy="37" r="1.6"/><circle cx="32" cy="35" r="1.6"/><circle cx="47" cy="38" r="1.6"/></g><circle cx="26" cy="27" r="1.6" fill="#fff"/><circle cx="40" cy="26" r="1.6" fill="#fff"/>',
  // Randy's style donut
  donut:
    shadow +
    '<circle cx="32" cy="32" r="22" fill="#dda35a"/><path d="M32 12Q14 12 11 30Q14 26 20 28Q24 18 32 19Q42 16 46 26Q52 25 53 31Q50 14 32 12Z" fill="#c46a8a"/>' +
    '<circle cx="32" cy="32" r="8" fill="#f6efe2"/><g stroke-width="2" stroke-linecap="round"><path d="M20 20l3 2" stroke="#f2c14e"/><path d="M40 16l3 2" stroke="#4aa3d8"/><path d="M47 30l3 2" stroke="#7ab648"/><path d="M16 33l3 2" stroke="#fff"/><path d="M30 12l3 2" stroke="#e8553f"/></g>',
  // French dip: sandwich half + au jus
  dip:
    shadow +
    '<g transform="rotate(-10 26 34)"><rect x="8" y="26" width="36" height="12" rx="6" fill="#e2a95c"/><rect x="10" y="30" width="32" height="6" rx="3" fill="#8a4a2a"/><rect x="8" y="36" width="36" height="8" rx="4" fill="#dda35a"/></g>' +
    '<ellipse cx="47" cy="44" rx="12" ry="7" fill="#f6efe2"/><ellipse cx="47" cy="43" rx="9" ry="4.6" fill="#6b4226"/>',
};

export const KEYS = Object.keys(LA_FOODS);

/** Same signature as icons.mjs food(key); keys not defined here fall back to the base set. */
export function food(key) {
  if (LA_FOODS[key]) return `<svg class="food-art" viewBox="0 0 64 64" width="64" height="64" aria-hidden="true">${LA_FOODS[key]}</svg>`;
  return baseFood(key);
}
