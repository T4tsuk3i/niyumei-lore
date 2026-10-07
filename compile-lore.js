// Compile every lore entry into a single snapshot md
const fs = require('fs');
const path = require('path');

const base = 'src/content/lore';
const AGE_ORDER = ['The First Ocean', 'The Churning', 'The Drowning', 'The Great Forgetting', 'The Present'];

function walk(dir) {
  let out = [];
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (name.endsWith('.md')) out.push(p);
  }
  return out;
}

// naive frontmatter parser
function parse(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return { meta: {}, body: text };
  const meta = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > -1) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: m[2].trim() };
}

const entries = walk(base).map((p) => {
  const { meta, body } = parse(fs.readFileSync(p, 'utf8'));
  meta.file = p.replace(/\\/g, '/').replace('src/content/lore/', '');
  return { meta, body };
});

const byAge = {};
for (const e of entries) {
  const age = e.meta.age || 'The First Ocean';
  (byAge[age] = byAge[age] || []).push(e);
}
for (const age of Object.keys(byAge)) {
  byAge[age].sort((a, b) => (Number(a.meta.order) || 99) - (Number(b.meta.order) || 99));
}

let out = `# Niyumei — Complete Lore (current state)\n\n`;
out += `Compiled ${new Date().toISOString().slice(0, 10)} from src/content/lore/. Drop lore-update.md in the repo root with new/changed entries and ask me to sync.\n\n`;

for (const age of AGE_ORDER) {
  if (!byAge[age]) continue;
  out += `---\n\n# ${age}\n\n`;
  for (const e of byAge[age]) {
    out += `## ${e.meta.title}\n\n`;
    if (e.meta.description) out += `*${e.meta.description}*\n\n`;
    if (e.meta.quote) out += `> “${e.meta.quote}”\n> — ${e.meta.author}\n\n`;
    if (e.meta.image) out += `![](${e.meta.image.replace('../../../', 'src/')})\n\n`;
    out += `${e.body}\n\n---\n\n`;
  }
}

fs.writeFileSync('lore-now.md', out);
console.log('wrote lore-now.md,', entries.length, 'entries');
