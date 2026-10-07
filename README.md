# Niyumei — Lore Archive

> *"The sea did not rise. The world descended into it."*

**Live site: [niyumei-lore.vercel.app](https://niyumei-lore.vercel.app/)**

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
  site.config.ts     # ← site title, the Ages, section names. Edit here first.
  content/
    lore/            # one .md per lore entry, grouped by section folder
      prehistory/  world/  mythology/  factions/  classes/
    timeline/        # one .md per era, linked to a lore entry
    pages/           # free-standing pages (About, Glossary…) → /<filename>
  images/            # artwork (optimized automatically at build)
  components/        # header, search, theme toggle, cards (rarely touched)
  layouts/           # page shell: sidebar, footer
  pages/             # routes (rarely touched)
  styles/global.css  # all styling; colors for both themes are at the top
templates/           # copy-paste starters for new entries and pages
public/              # favicons, robots.txt, static files served as-is
scripts/             # build helpers (strip-originals.js)
vercel.json          # security headers for the deployment
lore-now.md          # compiled snapshot of the whole canon
compile-lore.js      # regenerates lore-now.md  (bun run compile)
```

You should almost never need to leave `src/content/`, `src/images/` and `src/site.config.ts`.

## Adding a lore entry

1. Copy `templates/lore-entry.md` to `src/content/lore/<section>/<name>.md`.
   The path becomes the URL: `world/kuns.md` → `/lore/world/kuns`.
2. Fill in the frontmatter and write the body in Markdown.
3. That's it. It shows up in the sidebar, the archive, search, prev/next, and "Also in this age".

| field              | purpose                                                              |
| ------------------ | -------------------------------------------------------------------- |
| `title`            | page title and sidebar link                                          |
| `description`      | one-liner under the title and on cards                               |
| `age`              | must match an age name in `src/site.config.ts` (the build checks)    |
| `order`            | sort order within its age (lower first)                              |
| `image`            | optional banner, e.g. `../../../images/Name.png`                     |
| `quote` / `author` | optional epigraph at the top                                         |
| `draft`            | `true` hides it from the live site; it still shows in `bun run dev`  |

`##` headings inside the body automatically become the "On this page" table of contents.

## Adding a page (About, Glossary, Characters…)

Copy `templates/page.md` to `src/content/pages/<slug>.md`. It's served at `/<slug>`.
Set `nav: true` to list it in the sidebar, the landing page and the footer (`navOrder` sorts them).

## Adding an Age or a section

- **New Age:** add it to `AGES` in `src/site.config.ts` (in chronological order). Entries can then use it.
- **New section:** just create a new folder under `src/content/lore/`. Optionally give it a display
  name in `SECTIONS` in `src/site.config.ts`. It gets its own filter chip on the archive page.

## Timeline

`src/content/timeline/<n>-name.md` with `title`, `era` (100, 200… → Era I, II…), `summary`, and
`link:` pointing at a lore entry id like `world/kuns`. The linked entry supplies the artwork and
decides which Age heading the beat sits under.

## Light & dark mode

The site follows the reader's OS setting until they press the toggle; after that their choice is
remembered. Both palettes are CSS variables at the top of `src/styles/global.css`
(`[data-theme='dark']` = "abyss", `[data-theme='light']` = "vellum"). The landing page cover stays
dark in both modes on purpose.

## Search

Press `/` or `Ctrl/⌘ + K`. The index (`/search.json`) is generated at build time from all entries,
pages and timeline beats, so there's no service or API key involved. It ignores diacritics
(`amrta` finds *Amṛta*).

## Security & content protection

The site is fully static: no server code, database, logins, forms, cookies or API keys, so there is
very little to attack. On top of that:

- **Security headers** (`vercel.json`): HSTS, no framing (`X-Frame-Options` / `frame-ancestors`),
  `nosniff`, a strict referrer policy, browser features (camera, mic, location…) disabled, and
  `Cross-Origin-Resource-Policy: same-origin` so other sites can't embed the artwork.
- **Content Security Policy** (`astro.config.mjs`): Astro hashes every script and style it ships;
  the browser runs nothing else. Avoid inline `style="..."` attributes in new code (set styles from
  a `<script>` instead) or they'll be blocked.
- **Originals never ship:** `scripts/strip-originals.js` runs after each build and deletes the
  full-resolution source PNGs from `dist/`. Visitors only ever get compressed WebP, max 1600px wide.
- **Copy deterrents** (`src/components/Protect.astro`): no right-click, text selection, copy (the
  clipboard gets a copyright notice instead), image dragging, iOS long-press save, Ctrl/⌘+S/U/P, or
  printing.
- **No AI training / image search:** `public/robots.txt` blocks known AI crawlers and Google Images;
  `noai, noimageai` is sent as a meta tag and header.
- **Keep this repo private.** It holds the original artwork and the full canon in `lore-now.md`.

> Honest limit: anything a browser can show, someone determined can still screenshot or pull from
> dev tools. These measures stop casual copying and scraping; the license (`LICENSE.md`) is what
> protects you legally.

## Canon workflow

1. Edit `src/content/**` (or drop in `lore-update.md` and ask me to sync it).
2. `bun run dev` to preview, `bun run build` to verify.
3. `bun run compile` to regenerate `lore-now.md`.
4. Commit and push. Vercel redeploys.

## Assets

- Images live in `src/images/` and are optimized automatically (WebP, responsive sizes). Large PNGs are fine.
- Favicons are `public/favicon.png` and `public/apple-touch-icon.png` (generated from the seal).
- Videos later: embed unlisted YouTube, or host on Cloudflare R2. Do **not** commit large video files.

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
