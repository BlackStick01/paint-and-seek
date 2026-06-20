export const SITE_URL = 'https://paint-and-seek-wiki.wiki';

export const site = {
  name: 'Paint and Seek Wiki',
  url: SITE_URL,
  description:
    'Master Paint and Seek on Roblox with active codes, camouflage tips, hider and seeker strategies, map routes, perks, controls, updates, and beginner guides.',
  image: '/images/hero.webp',
  robloxUrl: 'https://www.roblox.com/'
};

export function absoluteUrl(path = '/') {
  const base = site.url.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

export function localePath(locale: string, path: string) {
  if (locale === 'en') return path;
  return `/${locale}${path === '/' ? '' : path}`;
}
