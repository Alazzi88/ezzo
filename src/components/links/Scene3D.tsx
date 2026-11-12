'use client';

// Pure-CSS 3D backdrop: perspective floor grid rushing toward the viewer,
// floating candlesticks, drifting depth orbs. Nothing here is pointer-heavy.
const CANDLES = [
  { l: '6%', t: '18%', h: 64, w: 14, up: true, d: 0, dur: 9 },
  { l: '14%', t: '46%', h: 92, w: 16, up: false, d: 1.2, dur: 11 },
  { l: '4%', t: '68%', h: 52, w: 12, up: true, d: 2.4, dur: 8 },
  { l: '90%', t: '22%', h: 84, w: 16, up: true, d: 0.6, dur: 10 },
  { l: '83%', t: '52%', h: 58, w: 12, up: false, d: 1.8, dur: 12 },
  { l: '93%', t: '72%', h: 96, w: 18, up: true, d: 3, dur: 9.5 },
];

export default function Scene3D() {
  return (
    <div className="scene3d" aria-hidden>
      <div className="scene-floor">
        <div className="scene-floor-plane" />
      </div>
      <div className="scene-horizon" />
      {CANDLES.map((c, i) => (
        <div
          key={i}
          className="scene-candle"
          style={{
            left: c.l,
            top: c.t,
            ['--h' as string]: `${c.h}px`,
            ['--w' as string]: `${c.w}px`,
            animationDelay: `${c.d}s`,
            animationDuration: `${c.dur}s`,
          }}
        >
          <span className="candle-wick" />
          <span className={`candle-body ${c.up ? 'candle-up' : 'candle-down'}`} />
        </div>
      ))}
      <div className="scene-orb scene-orb-a" />
      <div className="scene-orb scene-orb-b" />
    </div>
  );
}
