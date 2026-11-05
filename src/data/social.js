// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH FOR ALL LINKS
// Replace the "#" placeholders below as soon as you have the
// real URLs — every button and link in the site reads from here.
// ─────────────────────────────────────────────────────────────

export const PROFILE = {
  name: 'XTREMEZOD',
  displayName: 'XtremeZod',
  username: 'XtremeZod',
  brandName: 'XTREMEZOD',
  roles: [
    'Discord Bot Developer',
    'Web Developer',
    'Open Source Developer',
    'Creative Developer',
  ],
  github: {
    username: 'bxaxtreme',
    url: 'https://github.com/bxaxtreme',
  },
  discord: {
    username: 'XtremeZod',
    server: 'Flame Headquarters',
    url: 'https://discord.gg/ux786R28qj',
  },
};

export const SOCIAL_LINKS = {
  github: 'https://github.com/bxaxtreme',
  discord: 'https://discord.gg/ux786R28qj',
  linkedin: '#',
  instagram: '#',
  youtube: '#',
  twitter: '#',
  email: '#',
};

// Links equal to "#" are not live yet. Use isPlaceholder() to guard
// clicks/navigation so nothing appears broken to a visitor.
export const isPlaceholder = (url) => !url || url === '#';
