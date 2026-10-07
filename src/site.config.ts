// ─────────────────────────────────────────────────────────────
//  Site-wide settings. This is the one file to touch when you
//  add a new Age, a new lore section folder, or rename things.
// ─────────────────────────────────────────────────────────────

export const SITE = {
  title: 'Niyumei',
  tagline: 'an archive of the drowned world',
  description:
    'The lore archive of Niyumei, an original dark-fantasy setting. The sea did not rise. The world descended into it.',
  epigraph: 'The sea did not rise. The world descended into it.',
};

// The Ages, in chronological order. A lore entry's `age:` field must
// match one of these names exactly (the build will tell you if not).
export const AGES = [
  {
    name: 'The First Ocean',
    numeral: 'I',
    blurb: 'Before land, before light: the medium the world condensed from.',
  },
  {
    name: 'The Churning',
    numeral: 'II',
    blurb: 'Reality was pulled back and forth until the mechanism broke.',
  },
  {
    name: 'The Drowning',
    numeral: 'III',
    blurb: 'The boundary failed. Life gathered around the glowing wells.',
  },
  {
    name: 'The Great Forgetting',
    numeral: 'IV',
    blurb: 'Languages diverged. History hardened into religion.',
  },
  {
    name: 'The Present',
    numeral: 'V',
    blurb: 'Beneath the Kuns the water is moving. The Churning never stopped.',
  },
] as const;

export type AgeName = (typeof AGES)[number]['name'];
export const AGE_NAMES = AGES.map((a) => a.name) as [AgeName, ...AgeName[]];

// Display names for the folders under src/content/lore/.
// A new folder works without being listed here; it just shows its folder name.
export const SECTIONS: Record<string, string> = {
  prehistory: 'Prehistory',
  world: 'The World',
  mythology: 'Mythology',
  factions: 'Factions',
  classes: 'Classes',
};
