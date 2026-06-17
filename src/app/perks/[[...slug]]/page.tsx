import { EnglishContentPage, generateEnglishContentMetadata, generateEnglishContentStaticParams } from '@/lib/english-route';

export function generateStaticParams() {
  return generateEnglishContentStaticParams('perks');
}

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  return generateEnglishContentMetadata('perks', params);
}

export default function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  return <EnglishContentPage contentType="perks" params={params} />;
}
