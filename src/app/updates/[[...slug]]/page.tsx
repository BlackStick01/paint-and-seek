import { EnglishContentPage, generateEnglishContentMetadata, generateEnglishContentStaticParams } from '@/lib/english-route';

export function generateStaticParams() {
  return generateEnglishContentStaticParams('updates');
}

export function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  return generateEnglishContentMetadata('updates', params);
}

export default function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  return <EnglishContentPage contentType="updates" params={params} />;
}
