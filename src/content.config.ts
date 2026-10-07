import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lore = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/lore' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
  }),
});

const timeline = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/timeline' }),
  schema: z.object({
    title: z.string(),
    era: z.number(),
    summary: z.string().optional(),
  }),
});

export const collections = { lore, timeline };
