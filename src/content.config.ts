import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { AGE_NAMES } from './site.config';

// Lore entries: src/content/lore/<section>/<name>.md
const lore = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lore' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      order: z.number().default(99),
      image: image().optional(),
      age: z.enum(AGE_NAMES).default('The First Ocean'),
      quote: z.string().optional(),
      author: z.string().optional(),
      // draft: true hides the entry from the live site (it still builds locally with `bun run dev`)
      draft: z.boolean().default(false),
    }),
});

// Timeline beats: src/content/timeline/<n>-name.md
const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    title: z.string(),
    era: z.number(),
    summary: z.string().optional(),
    link: z.string().optional(),
  }),
});

// Free-standing pages: src/content/pages/<slug>.md → /<slug>
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      image: image().optional(),
      // nav: true adds the page to the sidebar, sorted by navOrder
      nav: z.boolean().default(false),
      navOrder: z.number().default(99),
      draft: z.boolean().default(false),
    }),
});

export const collections = { lore, timeline, pages };
