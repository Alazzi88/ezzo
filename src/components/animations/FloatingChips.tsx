'use client';

import { useEffect } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ease, spring } from '@/lib/motion';

// Glass chips hovering at different depths around the hero headline.
// Pointer parallax: nearer chips travel further than distant ones.
const CHIPS = [
  { label: 'SPX · CALL', sub: 'خيارات', side: 'r', top: '8%', depth: 1.0, dx: 6, tone: '#f0b07a' },
  { label: 'NASDAQ', sub: 'فيوتشر', side: 'l', top: '14%', depth: 0.7, dx: 3, tone: '#e8c145' },
  { label: 'ICT', sub: 'استراتيجية', side: 'l', top: '31%', depth: 1.2, dx: 3, tone: '#f0b07a' },
  { label: 'FUNDED', sub: 'حسابات ممولة', side: 'r', top: '37%', depth: 0.8, dx: 2, tone: '#d4845a' },
] as const;

export default function FloatingChips() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, spring.tilt);
  const sy = useSpring(my, spring.tilt);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      mx.set((e.clientX / window.innerWidth - 0.5) * 2);
      my.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none absolute inset-0 hidden md:block" aria-hidden style={{ perspective: 900 }}>
      {CHIPS.map((c, i) => (
        <Chip key={c.label} c={c} i={i} sx={sx} sy={sy} />
      ))}
    </div>
  );
}

function Chip({ c, i, sx, sy }: { c: (typeof CHIPS)[number]; i: number; sx: ReturnType<typeof useSpring>; sy: ReturnType<typeof useSpring> }) {
  const x = useTransform(sx, (v) => v * 26 * c.depth);
  const y = useTransform(sy, (v) => v * 18 * c.depth);
  const ry = useTransform(sx, (v) => v * 14 * c.depth);
  const rx = useTransform(sy, (v) => v * -10 * c.depth);
  return (
    <m.div
      className="absolute"
      style={{ ...(c.side === 'r' ? { right: `${c.dx}%` } : { left: `${c.dx}%` }), top: c.top, x, y, rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
      initial={{ opacity: 0, scale: 0.6, z: -200 }}
      animate={{ opacity: 1, scale: 1, z: 0 }}
      transition={{ delay: 0.9 + i * 0.14, duration: 1, ease: ease.out }}
    >
      <div className="chip3d" style={{ ['--tone' as string]: c.tone, animationDelay: `${i * 0.7}s` }}>
        <span className="chip3d-dot" />
        <div>
          <p className="chip3d-label">{c.label}</p>
          <p className="chip3d-sub">{c.sub}</p>
        </div>
      </div>
    </m.div>
  );
}
