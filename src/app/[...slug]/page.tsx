import LocaleSlugPage, {
  generateMetadata as generateLocaleMetadata,
  generateStaticParams as generateLocaleStaticParams
} from '../[locale]/[...slug]/page';
import { EnglishShell } from '@/components/EnglishShell';

type RouteProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateStaticParams() {
  const params = await generateLocaleStaticParams();
  return params.filter((item) => item.locale === 'en').map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: RouteProps) {
  const { slug } = await params;
  return generateLocaleMetadata({ params: Promise.resolve({ locale: 'en', slug }) });
}

export default async function RootSlugPage({ params }: RouteProps) {
  const { slug } = await params;

  return (
    <EnglishShell>
      <LocaleSlugPage params={Promise.resolve({ locale: 'en', slug })} />
    </EnglishShell>
  );
}
