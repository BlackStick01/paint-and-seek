import { AlertCircle, Gift, RefreshCcw } from 'lucide-react';
import { CodeCopyButton } from './CodeCopyButton';

const activeCodes = [
  { code: 'omg10kccu', reward: 'Free Coins', status: 'Active report' },
  { code: 'UPDATE1', reward: 'Free Coins', status: 'Official mention' },
  { code: 'SorryForDelay', reward: 'Currency', status: 'Active report' },
  { code: 'ThanksForSupport', reward: 'Currency', status: 'Active report' }
];

export function CodeRewardsPanel() {
  return (
    <section className="code-rewards-panel" aria-labelledby="active-code-list">
      <div className="code-rewards-header">
        <p className="home-template-kicker">Active codes</p>
        <h2 id="active-code-list">Copy Paint and Seek codes</h2>
        <p>Tap a code button to copy it exactly, then paste it into the Paint and Seek rewards or codes box in Roblox.</p>
      </div>

      <div className="code-reward-grid">
        {activeCodes.map((item) => (
          <article className="code-reward-card" key={item.code}>
            <div>
              <span className="code-reward-label">{item.status}</span>
              <strong>{item.code}</strong>
              <p>{item.reward}</p>
            </div>
            <CodeCopyButton code={item.code} />
          </article>
        ))}
      </div>

      <div className="code-help-grid" aria-label="Code redeem tips">
        <article>
          <Gift aria-hidden="true" />
          <strong>Redeem before shopping</strong>
          <p>Claim free rewards before spending Coins on skins, items, or perk rolls.</p>
        </article>
        <article>
          <RefreshCcw aria-hidden="true" />
          <strong>Match capitalization</strong>
          <p>Codes are case-sensitive. Copying is safer than retyping from memory.</p>
        </article>
        <article>
          <AlertCircle aria-hidden="true" />
          <strong>Try a fresh server</strong>
          <p>If a code fails, rejoin a newer server before assuming it expired.</p>
        </article>
      </div>
    </section>
  );
}
