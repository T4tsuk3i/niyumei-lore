import { getCollection, type CollectionEntry } from 'astro:content';
import { AGES, SECTIONS } from '../site.config';

export type LoreEntry = CollectionEntry<'lore'>;
export type Page = CollectionEntry<'pages'>;

// Drafts show up in `bun run dev` but never on the deployed site.
const visible = ({ data }: { data: { draft: boolean } }) => !import.meta.env.PROD || !data.draft;

const ageIndex = (age: string) => AGES.findIndex((a) => a.name === age);

/** Every published lore entry, in chronological order (age, then `order`). */
export async function getLore(): Promise<LoreEntry[]> {
  const all = await getCollection('lore', visible);
  return all.sort(
    (a, b) => ageIndex(a.data.age) - ageIndex(b.data.age) || a.data.order - b.data.order
  );
}

/** Lore grouped by age, keeping only ages that have entries. */
export async function getLoreByAge() {
  const lore = await getLore();
  return AGES.map((age) => ({
    ...age,
    entries: lore.filter((e) => e.data.age === age.name),
  })).filter((g) => g.entries.length > 0);
}

export async function getPages(): Promise<Page[]> {
  return getCollection('pages', visible);
}

export async function getNavPages(): Promise<Page[]> {
  const pages = await getPages();
  return pages.filter((p) => p.data.nav).sort((a, b) => a.data.navOrder - b.data.navOrder);
}

export const loreUrl = (entry: LoreEntry | string) =>
  `/lore/${typeof entry === 'string' ? entry : entry.id}`;

export const sectionKey = (entry: LoreEntry) => entry.id.split('/')[0];

export const sectionName = (key: string) =>
  SECTIONS[key] ?? key.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export const ageNumeral = (age: string) => AGES.find((a) => a.name === age)?.numeral ?? '';

/** A CSS-safe name used to morph an image between pages during navigation. */
export const transitionName = (entry: LoreEntry) => `art-${entry.id.replace(/[^a-z0-9]/gi, '-')}`;

export function readingMinutes(body = '') {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Markdown → plain text, good enough for search snippets. */
export function plainText(md = '') {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_`~|]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
