import LocaleSlugPage, {
  generateMetadata as generateLocaleMetadata
} from '@/app/[locale]/[...slug]/page';
import { EnglishShell } from '@/components/EnglishShell';
import type { ContentType } from '@/config/navigation';
import { getAllContent } from '@/lib/content';

type OptionalSlugParams = Promise<{ slug?: string[] }>;

export async function generateEnglishContentStaticParams(contentType: ContentType) {
  const items = await getAllContent(contentType, 'en');
  return [{ slug: [] }, ...items.map((item) => ({ slug: item.segments }))];
}

export async function generateEnglishContentMetadata(contentType: ContentType, params: OptionalSlugParams) {
  const { slug = [] } = await params;
  return generateLocaleMetadata({ params: Promise.resolve({ locale: 'en', slug: [contentType, ...slug] }) });
}

export async function EnglishContentPage({ contentType, params }: { contentType: ContentType; params: OptionalSlugParams }) {
  const { slug = [] } = await params;

  return (
    <EnglishShell>
      <LocaleSlugPage params={Promise.resolve({ locale: 'en', slug: [contentType, ...slug] })} />
    </EnglishShell>
  );
}
