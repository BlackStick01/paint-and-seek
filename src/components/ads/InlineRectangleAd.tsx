import { AdFrame } from './AdFrame';

export function InlineRectangleAd() {
  return (
    <div className="mx-auto my-8 flex w-full justify-center px-4">
      <AdFrame src="/ads/rectangle-300x250.html" width={300} height={250} title="Advertisement" />
    </div>
  );
}
