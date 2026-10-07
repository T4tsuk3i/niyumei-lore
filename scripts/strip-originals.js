// Astro copies every source image into dist/_astro even when pages only use the
// optimized WebP versions. Delete originals no page refers to, so the full-resolution
// artwork never ends up on the public server.
import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const assets = path.join(dist, '_astro');
const textExt = /\.(html|css|js|json|xml|txt|webmanifest)$/;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    const p = path.join(dir, d.name);
    return d.isDirectory() ? walk(p) : [p];
  });
}

const text = walk(dist)
  .filter((f) => textExt.test(f))
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n');

let removed = 0;
for (const file of fs.readdirSync(assets)) {
  if (!/\.(png|jpe?g|tiff?|bmp)$/i.test(file)) continue;
  const name = encodeURI(file);
  if (text.includes(file) || text.includes(name)) continue;
  fs.rmSync(path.join(assets, file));
  removed++;
}
console.log(`strip-originals: removed ${removed} unreferenced source image(s)`);
