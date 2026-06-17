import LocaleHomePage, { generateMetadata as generateLocaleMetadata } from './[locale]/page';
import { EnglishShell } from '@/components/EnglishShell';

export function generateMetadata() {
  return generateLocaleMetadata({ params: Promise.resolve({ locale: 'en' }) });
}

export default function HomePage() {
  return (
    <EnglishShell>
      <LocaleHomePage params={Promise.resolve({ locale: 'en' })} />
    </EnglishShell>
  );
}
