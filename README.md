# Niyumei — Lore Archive

> *"The sea did not rise. The world descended into it."*

Public lore wiki for the game — a static Astro site that maps the canon, the timeline, and the present state of the world. Deployed as a read-only archive; sources of truth are the markdown files under `src/content/lore/`.

## Stack

- **Bun** — runtime & package manager
- **Astro 5** — static site generation
- **Markdown + content collections** — one file per lore entry
- **Vercel** — hosting (auto-deploy on push, branch previews)

## Quick start

```bash
bun install
bun run dev        # local dev at http://localhost:4321
bun run build      # production build to dist/
bun run preview    # serve the production build
```

## Repository layout

```
src/
  content/
    lore/
      prehistory/    # First Ocean → Churning → Flood → Forgetting
      world/         # Kuns, Vāra, regions, connected Kuns
      mythology/     # Amṛta, Prakāśa & Tamas, the Guardian
      factions/      # The Order, the Guardians, the Third
      classes/       # Vox, Vallum, Order Class
    timeline/        # one entry per era, wired to archive pages
  pages/
    index.astro      # cinematic landing
    lore/            # archive index + entry pages
    timeline.astro   # era-by-era chronology
  images/            # generated artwork (optimized by Astro)
public/              # seal.png (favicon) and any static assets
lore-now.md          # compiled snapshot of the whole canon
compile-lore.js      # script that regenerates lore-now.md
```

## Editing lore

Each entry is a single `.md` file with frontmatter:

```markdown
---
title: Kuns
description: Scars left by the Churning — small bodies of water infused with Amṛta
order: 1
image: ../../../images/Bioluminescent Sanctuary Grotto.png
age: The Drowning
quote: "A Kun is not a pond. It is the world's scar that heals by giving."
author: Sister Veya, Warden of the Glowing Wells
---

Body text in markdown…
```

| field       | purpose                                            |
| ----------- | -------------------------------------------------- |
| `title`     | page title / sidebar link text                     |
| `description`| subtitle under the title and on the index          |
| `order`     | sort order within its age                            |
| `image`     | illustration (optional), optimized by Astro at build|
| `age`       | one of: The First Ocean, The Churning, The Drowning, The Great Forgetting, The Present |
| `quote` / `author` | epigraph shown at the top of the page (optional) |

- File location decides the sidebar grouping & section label.
- New entry = new `.md` in the right section folder and it appears everywhere (sidebar, archive, prev/next chain) automatically.
- Timeline entries live in `src/content/timeline/<n>-name.md` with `title`, `era`, `summary`, and `link:` pointing at the archive entry.

## Canon workflow

1. Edit `src/content/lore/**` (or drop in `lore-update.md` and ask me to sync it).
2. `bun run build` to verify.
3. `bun compile-lore.js` to regenerate `lore-now.md`.
4. Commit — Vercel redeploys.

## Assets

- Images live in `src/images/` and are optimized automatically (WebP, resized). Reference them from an entry with `image: ../../../images/name.png`.
- `public/seal.png` is the favicon.
- Videos later: embed unlisted YouTube, or host on Cloudflare R2 — do **not** commit large video files to the repo.

## Deployment

1. Create a GitHub repo and `git push` (see below).
2. Import the repo in Vercel → framework preset **Astro**, install command `bun install`, build command `bun run build`.
3. Every push to `main` deploys to production; every other branch gets a preview URL (handy for `experiment/…` lore branches).

```bash
git remote add origin https://github.com/<you>/<repo>.git
git branch -M main
git push -u origin main
```

## License

All rights reserved — see [LICENSE.md](LICENSE.md).

## Feedback

This site is read-only by design. Feedback belongs in GitHub Discussions or Discord, not in comments baked into the pages.
