import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { getLore, getPages, loreUrl, plainText, sectionKey, sectionName } from '../lib/lore';

// Built once at deploy time; the search dialog fetches it on first open.
export const GET: APIRoute = async () => {
  const lore = (await getLore()).map((e) => ({
    url: loreUrl(e),
    title: e.data.title,
    kind: sectionName(sectionKey(e)),
    meta: e.data.age,
    description: e.data.description ?? '',
    text: plainText(`${e.data.quote ?? ''} ${e.body ?? ''}`),
  }));

  const pages = (await getPages()).map((p) => ({
    url: `/${p.id}`,
    title: p.data.title,
    kind: 'Page',
    meta: '',
    description: p.data.description ?? '',
    text: plainText(p.body),
  }));

  const timeline = (await getCollection('timeline')).map((t) => ({
    url: `/timeline#${t.id}`,
    title: t.data.title,
    kind: 'Timeline',
    meta: '',
    description: t.data.summary ?? '',
    text: plainText(t.body),
  }));

  return new Response(JSON.stringify([...lore, ...pages, ...timeline]), {
    headers: { 'Content-Type': 'application/json' },
  });
};
