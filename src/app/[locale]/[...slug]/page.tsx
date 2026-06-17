import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, CalendarDays, Home } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { CONTENT_TYPES, NAVIGATION_CONFIG, localizeHref, normalizeContentType } from '@/config/navigation';
import { routing } from '@/i18n/routing';
import { getAllContent, getAllContentPaths, getContent } from '@/lib/content';
import { translate } from '@/lib/messages';
import { absoluteUrl, localePath, site } from '@/lib/site';

type RouteProps = {
  params: Promise<{ locale: string; slug: string[] }>;
};

export async function generateStaticParams() {
  const params: Array<{ locale: string; slug: string[] }> = [];

  for (const locale of routing.locales) {
    for (const type of CONTENT_TYPES) {
      params.push({ locale, slug: [type] });
    }

    const contentPaths = await getAllContentPaths('en');
    for (const item of contentPaths) {
      params.push({ locale, slug: [item.contentType, ...item.slug] });
    }
  }

  return params;
}

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const contentType = normalizeContentType(slug[0] || '');
  if (!contentType) return {};

  if (slug.length === 1) {
    const path = `/${contentType}`;
    const title = translate(locale, `lists.${contentType}.title`);
    const description = translate(locale, `lists.${contentType}.description`);
    return {
      title,
      description,
      alternates: {
        canonical: localePath(locale, path),
        languages: Object.fromEntries(routing.locales.map((item) => [item, localePath(item, path)]))
      },
      openGraph: {
        title,
        description,
        url: localePath(locale, path),
        images: [{ url: absoluteUrl('/images/hero.webp'), width: 1200, height: 630 }]
      }
    };
  }

  const content = await getContent(contentType, slug.slice(1), locale);
  if (!content) return {};

  const path = `/${contentType}/${content.slug}`;
  return {
    title: content.metadata.title,
    description: content.metadata.description,
    alternates: {
      canonical: localePath(locale, path),
      languages: Object.fromEntries(routing.locales.map((item) => [item, localePath(item, path)]))
    },
    openGraph: {
      title: content.metadata.title,
      description: content.metadata.description,
      url: localePath(locale, path),
      type: 'article',
      publishedTime: content.metadata.date,
      modifiedTime: content.metadata.lastModified,
      images: [{ url: absoluteUrl(content.metadata.image || '/images/hero.webp'), width: 1200, height: 630 }]
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metadata.title,
      description: content.metadata.description,
      images: [absoluteUrl(content.metadata.image || '/images/hero.webp')]
    }
  };
}

export default async function SlugPage({ params }: RouteProps) {
  const { locale, slug } = await params;
  const contentType = normalizeContentType(slug[0] || '');
  if (!contentType) notFound();

  if (slug.length === 1) {
    return <NavigationPage locale={locale} contentType={contentType} />;
  }

  const content = await getContent(contentType, slug.slice(1), locale);
  if (!content) notFound();

  const MDXContent = content.MDXContent;
  const articlePath = `/${contentType}/${content.slug}`;
  const articleUrl = absoluteUrl(localePath(locale, articlePath));
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: content.metadata.title,
    description: content.metadata.description,
    image: absoluteUrl(content.metadata.image || '/images/hero.webp'),
    datePublished: content.metadata.date,
    dateModified: content.metadata.lastModified || content.metadata.date,
    author: { '@type': 'Organization', name: site.name },
    publisher: {
      '@type': 'Organization',
      name: site.name,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/android-chrome-512x512.png') }
    },
    mainEntityOfPage: articleUrl
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl(localePath(locale, '/')) },
      { '@type': 'ListItem', position: 2, name: contentType, item: absoluteUrl(localePath(locale, `/${contentType}`)) },
      { '@type': 'ListItem', position: 3, name: content.metadata.title, item: articleUrl }
    ]
  };

  return (
    <>
      <JsonLd data={[articleJsonLd, breadcrumbJsonLd]} />
      <article className="mx-auto max-w-5xl py-4">
        <Breadcrumbs locale={locale} contentType={contentType} current={content.metadata.title} />
        <header className="wiki-card p-6 sm:p-10">
          <p className="text-sm font-black uppercase text-primary">{contentType}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal sm:text-6xl">{content.metadata.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-muted-foreground">{content.metadata.description}</p>
          {content.metadata.date ? (
            <p className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <CalendarDays className="size-4 text-primary" aria-hidden="true" />
              {content.metadata.date}
            </p>
          ) : null}
        </header>
        <div className="prose-panel mt-5">
          <MDXContent />
        </div>
      </article>
    </>
  );
}

async function NavigationPage({ locale, contentType }: { locale: string; contentType: NonNullable<ReturnType<typeof normalizeContentType>> }) {
  const items = await getAllContent(contentType, locale);
  const navItem = NAVIGATION_CONFIG.find((item) => item.key === contentType);
  const Icon = navItem?.icon || Home;
  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: translate(locale, `lists.${contentType}.title`),
    description: translate(locale, `lists.${contentType}.description`),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.metadata.title,
      url: absoluteUrl(localePath(locale, `/${contentType}/${item.slug}`))
    }))
  };

  return (
    <>
      <JsonLd data={itemListJsonLd} />
      <section className="py-4">
        <Breadcrumbs locale={locale} contentType={contentType} />
        <header className="wiki-card p-6 sm:p-10">
          <p className="text-sm font-black uppercase text-primary">Roblox Paint and Seek {translate(locale, `nav.${contentType}`).toLowerCase()}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal sm:text-6xl">{translate(locale, `lists.${contentType}.title`)}</h1>
          <p className="mt-4 max-w-4xl text-lg leading-8 text-muted-foreground">{translate(locale, `lists.${contentType}.intro`)}</p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-bold text-muted-foreground">
            <span>{items.length} current pages</span>
            <span>Web checked: Jun 16, 2026</span>
            <span>Paint and Seek Roblox</span>
          </div>
        </header>

        <section className="mt-6">
          <h2 className="mb-4 flex items-center gap-2 text-3xl font-black">
            <Icon className="size-7 text-primary" aria-hidden="true" />
            All current Paint and Seek {translate(locale, `nav.${contentType}`).toLowerCase()} pages
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {items.map((item) => (
              <Link key={item.slug} href={localizeHref(locale, `/${contentType}/${item.slug}`)} className="wiki-card wiki-link-card grid gap-3 p-5">
                <span className="text-xs font-black uppercase text-primary">{item.metadata.category}</span>
                <h3 className="text-2xl font-black">{item.metadata.title}</h3>
                <p className="text-sm leading-6 text-muted-foreground">{item.metadata.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-black text-primary">
                  {translate(locale, 'shared.readMore')} <ArrowRight className="size-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </>
  );
}

function Breadcrumbs({ locale, contentType, current }: { locale: string; contentType: string; current?: string }) {
  return (
    <nav className="mb-4 flex flex-wrap gap-2 text-sm font-bold text-muted-foreground" aria-label="Breadcrumb">
      <Link className="inline-flex items-center gap-1 hover:text-primary" href={localizeHref(locale, '/')}>
        <Home className="size-4" aria-hidden="true" />
        Home
      </Link>
      <span>/</span>
      <Link className="capitalize hover:text-primary" href={localizeHref(locale, `/${contentType}`)}>
        {contentType}
      </Link>
      {current ? (
        <>
          <span>/</span>
          <span className="text-foreground">{current}</span>
        </>
      ) : null}
    </nav>
  );
}
