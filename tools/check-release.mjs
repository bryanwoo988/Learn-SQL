// Run before every push: node tools/check-release.mjs
// Checks that sw.js VERSION matches the newest release note, that the release
// list is well formed, and that every precached file exists.
import { readFileSync, existsSync } from 'node:fs';
import vm from 'node:vm';

const root = new URL('..', import.meta.url).pathname;
const read = f => readFileSync(root + f, 'utf8');
const errors = [];

const ctx = { window: {} };
vm.runInNewContext(read('js/releases.js'), ctx);
const releases = ctx.window.SQL_RELEASES;
const sw = read('sw.js');
const version = (sw.match(/const VERSION = '([^']+)'/) || [])[1];

if (!releases?.length) errors.push('js/releases.js has no releases');
else {
  if (releases[0].v !== version) errors.push(`sw.js VERSION ${version} ≠ newest release ${releases[0].v}`);
  releases.forEach((r, i) => {
    if (!/^\d+\.\d+\.\d+$/.test(r.v)) errors.push(`bad version "${r.v}"`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.date)) errors.push(`v${r.v}: bad date "${r.date}"`);
    for (const l of ['en', 'zh']) if (!r.notes?.[l]?.length) errors.push(`v${r.v}: missing ${l} notes`);
    if (i && r.v === releases[i - 1].v) errors.push(`duplicate version ${r.v}`);
  });
}
const assets = [...sw.matchAll(/^\s+'([^']+)',?$/gm)].map(m => m[1]).filter(a => a !== './');
for (const a of assets) if (!existsSync(root + a)) errors.push(`precached file missing: ${a}`);

if (errors.length) { console.error('✗ ' + errors.join('\n✗ ')); process.exit(1); }
console.log(`✓ v${version}: release notes and ${assets.length} precached files OK`);
