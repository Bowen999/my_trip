import { squeeze } from './kit.mjs';
import { addBoston } from './boston.mjs';
import { addMaine } from './maine.mjs';
import { addRI } from './ri.mjs';
import { addHero } from './hero.mjs';
export { neMap } from './map.mjs';

const raw = {};
addBoston(raw);
addMaine(raw);
addRI(raw);
addHero(raw);
export const scenes = {};
for (const k of Object.keys(raw)) scenes[k] = (uid = '', ...a) => squeeze(raw[k](uid, ...a));
