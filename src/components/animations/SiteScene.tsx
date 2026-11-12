'use client';

import { m, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Site-wide 3D backdrop: a perspective floor rushing toward the viewer and candlesticks
// that drift at different depths as you scroll (parallax = depth). The /links page ships
// its own richer scene, so we step aside there.
const NEAR = [
  { l: '3%', t: '20%', h: 70, w: 15, up: true, d: 0 },
  { l: '95%', t: '34%', h: 88, w: 16, up: false, d: 1.4 },
  { l: '2%', t: '62%', h: 54, w: 12, up: false, d: 2.6 },
];
const FAR = [
  { l: '8%', t: '40%', h: 44, w: 9, up: true, d: 0.8 },
  { l: '91%', t: '70%', h: 52, w: 10, up: true, d: 2 },
  { l: '96%', t: '12%', h: 40, w: 9, up: false, d: 3.2 },
];

export default function SiteScene() {
  const path = usePathname();
  const { scrollY } = useScroll();
  const yNear = useTransform(scrollY, [0, 4000], [0, -620]);
  const yFar = useTransform(scrollY, [0, 4000], [0, -240]);
  const spin = useTransform(scrollY, [0, 4000], [-22, 22]);

  if (path === '/links') return null;

  const render = (list: typeof NEAR, y: typeof yNear, key: string) => (
    <m.div style={{ y }} className="absolute inset-0">
      {list.map((c, i) => (
        <m.div key={`${key}${i}`} className="absolute" style={{ left: c.l, top: c.t, rotateY: spin }}>
          <div
            className="scene-candle"
            style={{
              position: 'relative',
              ['--h' as string]: `${c.h}px`,
              ['--w' as string]: `${c.w}px`,
              animationDelay: `${c.d}s`,
              opacity: key === 'n' ? 0.4 : 0.22,
            }}
          >
            <span className="candle-wick" />
            <span className={`candle-body ${c.up ? 'candle-up' : 'candle-down'}`} />
          </div>
        </m.div>
      ))}
    </m.div>
  );

  return (
    <div className="scene3d site-scene hidden sm:block" aria-hidden>
      <div className="scene-floor">
        <div className="scene-floor-plane" />
      </div>
      {render(FAR, yFar, 'f')}
      {render(NEAR, yNear, 'n')}
    </div>
  );
}
