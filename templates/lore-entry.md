---
# Copy this file into src/content/lore/<section>/<your-entry>.md
# The filename becomes the URL: src/content/lore/world/kuns.md → /lore/world/kuns
title: Entry Title
description: One line shown under the title and on cards
# Must match an age in src/site.config.ts exactly
age: The Present
# Sort order within its age (lower first)
order: 10
# Optional. Put the picture in src/images/ first.
# image: ../../../images/Your Image.png
# Optional epigraph at the top of the page
# quote: "Something someone in the world said."
# author: Their name, their title
# Hidden on the live site while true; still visible in `bun run dev`
draft: true
---

Opening paragraph. The first letter becomes a drop cap.

## A section heading

Section headings (##) appear in the "On this page" sidebar automatically.

> A pull quote, set apart from the text.
