import { AdFrame } from './AdFrame';

export function DesktopSideAds() {
  return (
    <>
      <aside
        className="fixed top-24 z-10 hidden 2xl:block"
        style={{
          left: 'calc((100vw - 1180px) / 2 - 190px)'
        }}
        aria-label="Left advertisement"
      >
        <AdFrame src="/ads/side-160x300.html" width={160} height={300} title="Left advertisement" />
      </aside>

      <aside
        className="fixed top-24 z-10 hidden 2xl:block"
        style={{
          right: 'calc((100vw - 1180px) / 2 - 190px)'
        }}
        aria-label="Right advertisement"
      >
        <AdFrame src="/ads/side-160x600.html" width={160} height={600} title="Right advertisement" />
      </aside>
    </>
  );
}
