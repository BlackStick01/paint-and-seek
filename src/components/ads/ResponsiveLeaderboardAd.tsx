import { AdFrame } from './AdFrame';

export function ResponsiveLeaderboardAd() {
  return (
    <div className="mx-auto my-6 flex w-full justify-center px-4">
      <div className="hidden xl:block">
        <AdFrame src="/ads/banner-728x90.html" width={728} height={90} title="Leaderboard advertisement" />
      </div>

      <div className="hidden md:block xl:hidden">
        <AdFrame src="/ads/banner-468x60.html" width={468} height={60} title="Banner advertisement" />
      </div>
    </div>
  );
}
