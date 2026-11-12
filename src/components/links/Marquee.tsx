'use client';

const WORDS = ['FUTURES', 'SPX OPTIONS', 'FUNDED ACCOUNTS', 'ICT', 'NASDAQ', 'SIGNALS', 'EZZO'];

export default function Marquee() {
  const row = [...WORDS, ...WORDS];
  return (
    <div className="marquee" aria-hidden dir="ltr">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-row" key={k}>
            {row.map((w, i) => (
              <span key={`${k}-${i}`} className="marquee-item">
                {w}
                <i className="marquee-dot" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
