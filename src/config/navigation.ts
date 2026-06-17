import {
  BookOpen,
  Coins,
  Compass,
  Gamepad2,
  Gift,
  Map,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Swords
} from 'lucide-react';

export type ContentType =
  | 'codes'
  | 'maps'
  | 'guides'
  | 'items'
  | 'perks'
  | 'controls'
  | 'updates'
  | 'community';

export type SourceCategory = 'codes' | 'maps' | 'guide' | 'hider' | 'seeker' | 'perks' | 'controls' | 'official';

export const NAVIGATION_CONFIG = [
  { key: 'codes', path: '/codes', icon: Gift, isContentType: true, sourceCategories: ['codes'] },
  { key: 'maps', path: '/maps', icon: Map, isContentType: true, sourceCategories: ['maps'] },
  { key: 'guides', path: '/guides', icon: BookOpen, isContentType: true, sourceCategories: ['guide', 'hider', 'seeker'] },
  { key: 'items', path: '/items', icon: Coins, isContentType: true, sourceCategories: ['perks'] },
  { key: 'perks', path: '/perks', icon: Sparkles, isContentType: true, sourceCategories: ['perks'] },
  { key: 'controls', path: '/controls', icon: Gamepad2, isContentType: true, sourceCategories: ['controls'] },
  { key: 'updates', path: '/updates', icon: Megaphone, isContentType: true, sourceCategories: ['codes', 'official'] },
  { key: 'community', path: '/community', icon: ShieldCheck, isContentType: true, sourceCategories: ['official'] }
] as const;

export const HOME_ROUTE_CARDS = [
  { key: 'codes', icon: Gift, tag: 'Free rewards', href: '/codes' },
  { key: 'maps', icon: Map, tag: 'Map routes', href: '/maps' },
  { key: 'guides', icon: BookOpen, tag: 'Starter help', href: '/guides' },
  { key: 'items', icon: Coins, tag: 'Coins and shop', href: '/items' },
  { key: 'perks', icon: Sparkles, tag: 'Traits and rolls', href: '/perks' },
  { key: 'controls', icon: Gamepad2, tag: 'Inputs and UI', href: '/controls' },
  { key: 'updates', icon: Megaphone, tag: 'Patch watch', href: '/updates' },
  { key: 'community', icon: ShieldCheck, tag: 'Safe links', href: '/community' }
] as const;

export const STARTING_POINTS = [
  { key: 'beginner', href: '/guides/paint-and-seek-beginner-guide', icon: Compass },
  { key: 'hider', href: '/guides/paint-and-seek-hider-guide', icon: ShieldCheck },
  { key: 'seeker', href: '/guides/paint-and-seek-seeker-guide', icon: Swords },
  { key: 'codes', href: '/codes/paint-and-seek-codes', icon: Gift }
] as const;

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.key);

export function normalizeContentType(value: string): ContentType | null {
  return CONTENT_TYPES.includes(value as ContentType) ? (value as ContentType) : null;
}

export function sourceCategoryToContentType(category: string): ContentType {
  if (category === 'guide' || category === 'hider' || category === 'seeker') return 'guides';
  if (category === 'official') return 'community';
  if (category === 'codes') return 'codes';
  if (category === 'maps') return 'maps';
  if (category === 'controls') return 'controls';
  if (category === 'perks') return 'perks';
  return 'guides';
}

export function localizeHref(locale: string, href: string) {
  if (locale === 'en') return href;
  return `/${locale}${href}`;
}
