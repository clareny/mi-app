import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const esPath = path.join(root, 'src/i18n/es.json');
const enPath = path.join(root, 'src/i18n/en.json');
const hashPath = path.join(root, 'src/i18n/.es-hash.json');

const KEEP = new Set([
  'Clareny',
  'GRAYKIDS',
  'Combo',
  'Beats',
  'Google',
  'Discord',
  'WhatsApp',
  'FormSubmit',
  'Spotify',
  'bio',
  'remake',
  'Remake',
  'Custom beat',
  'Upgrade beat',
]);

const flatten = (tree, prefix = '') => {
  const rows = [];
  for (const [key, value] of Object.entries(tree)) {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      rows.push(...flatten(value, next));
    } else {
      rows.push([next, typeof value === 'string' ? value : '']);
    }
  }
  return rows;
};

const setPath = (tree, key, value) => {
  const parts = key.split('.');
  let node = tree;
  for (const part of parts.slice(0, -1)) {
    if (!node[part] || typeof node[part] !== 'object') node[part] = {};
    node = node[part];
  }
  node[parts.at(-1)] = value;
};

const hashOf = (text) => createHash('sha1').update(text).digest('hex');

const protect = (text) => {
  let masked = text;
  const tokens = [];
  KEEP.forEach((word, index) => {
    const mark = `__K${index}__`;
    if (masked.includes(word)) {
      tokens.push([mark, word]);
      masked = masked.split(word).join(mark);
    }
  });
  return { masked, tokens };
};

const restore = (text, tokens) => tokens.reduce((acc, [mark, word]) => acc.split(mark).join(word), text);

const translate = async (text) => {
  if (!text.trim()) return '';
  if (KEEP.has(text.trim())) return text.trim();

  const { masked, tokens } = protect(text);
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(masked)}&langpair=es|en`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Translate failed: ${response.status}`);
  }
  const data = await response.json();
  const translated = data?.responseData?.translatedText;
  if (!translated || /QUERY LENGTH|MYMEMORY WARNING/i.test(translated)) {
    throw new Error(translated || 'Empty translation');
  }
  return restore(translated, tokens);
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const es = JSON.parse(await readFile(esPath, 'utf8'));
const en = JSON.parse(await readFile(enPath, 'utf8'));
let hashes = {};
try {
  hashes = JSON.parse(await readFile(hashPath, 'utf8'));
} catch {
  hashes = {};
}

let changed = 0;
for (const [key, spanish] of flatten(es)) {
  const previous = hashes[key];
  const already = flatten(en).find(([item]) => item === key)?.[1] ?? '';
  if (previous === hashOf(spanish) && already) continue;

  const english = await translate(spanish);
  setPath(en, key, english);
  hashes[key] = hashOf(spanish);
  changed += 1;
  console.log(`${key}: ${spanish} → ${english}`);
  await wait(180);
}

await writeFile(enPath, `${JSON.stringify(en, null, 2)}\n`);
await writeFile(hashPath, `${JSON.stringify(hashes, null, 2)}\n`);
console.log(changed ? `Updated ${changed} English strings.` : 'English already matches Spanish.');
