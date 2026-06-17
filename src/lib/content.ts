import fs from 'node:fs/promises';
import path from 'node:path';
import type { ComponentType } from 'react';
import type { ContentType } from '@/config/navigation';
import { CONTENT_TYPES, normalizeContentType } from '@/config/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { CONTENT_MODULES } from './content.generated';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export type ContentMetadata = {
  title: string;
  description: string;
  category: string;
  date?: string;
  lastModified?: string;
  image?: string;
};

export type ContentSummary = {
  contentType: ContentType;
  slug: string;
  segments: string[];
  locale: Locale;
  metadata: ContentMetadata;
};

export type ContentDetail = ContentSummary & {
  MDXContent: ComponentType;
};

type MdxModule = {
  default: ComponentType;
  metadata?: Partial<ContentMetadata>;
};

function asLocale(locale: string): Locale {
  return routing.locales.includes(locale as Locale) ? (locale as Locale) : routing.defaultLocale;
}

export function slugifyFilename(filename: string) {
  return filename
    .replace(/\.mdx?$/i, '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

async function exists(target: string) {
  try {
    await fs.access(target);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir: string): Promise<string[]> {
  if (!(await exists(dir))) return [];

  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return walk(fullPath);
      if (entry.isFile() && entry.name.endsWith('.mdx')) return [fullPath];
      return [];
    })
  );

  return files.flat();
}

function normalizeMetadata(metadata: Partial<ContentMetadata> | undefined, fallbackTitle: string, category: string): ContentMetadata {
  return {
    title: metadata?.title || fallbackTitle,
    description:
      metadata?.description ||
      `Read the ${fallbackTitle} page on Paint and Seek Wiki for Roblox strategies, routes, controls, codes, and progression help.`,
    category: metadata?.category || category,
    date: metadata?.date,
    lastModified: metadata?.lastModified || metadata?.date,
    image: metadata?.image
  };
}

function fileToSummary(filePath: string, locale: Locale, contentType: ContentType, metadata: ContentMetadata): ContentSummary {
  const relative = path.relative(path.join(CONTENT_ROOT, locale, contentType), filePath);
  const segments = relative.split(path.sep).map(slugifyFilename);
  const slug = segments.join('/');

  return {
    contentType,
    slug,
    segments,
    locale,
    metadata
  };
}

async function importContent(locale: Locale, contentType: ContentType, segments: string[]): Promise<{ module: MdxModule; filePath: string } | null> {
  const baseDir = path.join(CONTENT_ROOT, locale, contentType);
  const allFiles = await walk(baseDir);
  const wantedSlug = segments.join('/');
  const filePath = allFiles.find((file) => {
    const relative = path.relative(baseDir, file);
    return relative.split(path.sep).map(slugifyFilename).join('/') === wantedSlug;
  });

  if (!filePath) return null;

  const relative = path.relative(CONTENT_ROOT, filePath).replaceAll(path.sep, '/').replace(/\.mdx$/, '');
  const importer = CONTENT_MODULES[relative];
  if (!importer) return null;

  const module = (await importer()) as MdxModule;

  return { module, filePath };
}

export async function getContent(contentTypeInput: string, slugSegments: string[], localeInput: string): Promise<ContentDetail | null> {
  const contentType = normalizeContentType(contentTypeInput);
  if (!contentType) return null;

  const requestedLocale = asLocale(localeInput);
  const loaded =
    (await importContent(requestedLocale, contentType, slugSegments)) ||
    (requestedLocale !== routing.defaultLocale ? await importContent(routing.defaultLocale, contentType, slugSegments) : null);

  if (!loaded) return null;

  const fallbackTitle = slugSegments.at(-1)?.replace(/-/g, ' ') || contentType;
  const metadata = normalizeMetadata(loaded.module.metadata, fallbackTitle, contentType);
  const summary = fileToSummary(loaded.filePath, requestedLocale, contentType, metadata);

  return {
    ...summary,
    slug: slugSegments.join('/'),
    segments: slugSegments,
    MDXContent: loaded.module.default
  };
}

export async function getAllContent(contentTypeInput: string, localeInput: string): Promise<ContentSummary[]> {
  const contentType = normalizeContentType(contentTypeInput);
  if (!contentType) return [];

  const requestedLocale = asLocale(localeInput);
  const actualLocale = (await exists(path.join(CONTENT_ROOT, requestedLocale, contentType))) ? requestedLocale : routing.defaultLocale;
  const dir = path.join(CONTENT_ROOT, actualLocale, contentType);
  const files = await walk(dir);

  const summaries = await Promise.all(
    files.map(async (file) => {
      const relative = path.relative(dir, file).replaceAll(path.sep, '/');
      const moduleKey = `${actualLocale}/${contentType}/${relative.replace(/\.mdx$/, '')}`;
      const importer = CONTENT_MODULES[moduleKey];
      if (!importer) {
        throw new Error(`Missing generated MDX import for ${moduleKey}`);
      }
      const module = (await importer()) as MdxModule;
      const fallbackTitle = slugifyFilename(path.basename(file)).replace(/-/g, ' ');
      const metadata = normalizeMetadata(module.metadata, fallbackTitle, contentType);
      return fileToSummary(file, requestedLocale, contentType, metadata);
    })
  );

  return summaries.sort((a, b) => a.metadata.title.localeCompare(b.metadata.title));
}

export async function getAllContentPaths(localeInput = routing.defaultLocale) {
  const locale = asLocale(localeInput);
  const paths: Array<{ locale: Locale; contentType: ContentType; slug: string[] }> = [];

  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale);
    for (const item of items) {
      paths.push({ locale, contentType: item.contentType, slug: item.segments });
    }
  }

  return paths;
}

export async function getExistingListTypes(localeInput = routing.defaultLocale) {
  const locale = asLocale(localeInput);
  const output: ContentType[] = [];

  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale);
    if (items.length > 0) output.push(contentType);
  }

  return output;
}
