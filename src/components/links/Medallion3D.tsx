'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { spring } from '@/lib/motion';

// Logo coin floating in 3D: pointer-driven tilt + orbiting rings with satellites.
export default function Medallion3D() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotY = useSpring(px, spring.tilt);
  const rotX = useSpring(py, spring.tilt);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const dx = (e.clientX - (r.left + r.width / 2)) / window.innerWidth;
      const dy = (e.clientY - (r.top + r.height / 2)) / window.innerHeight;
      px.set(Math.max(-1, Math.min(1, dx * 2.2)) * 26);
      py.set(Math.max(-1, Math.min(1, dy * 2.2)) * -22);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [px, py]);

  return (
    <div ref={ref} className="medallion-stage" aria-hidden={false}>
      <div className="medallion-sway">
        <m.div className="medallion-body" style={{ rotateX: rotX, rotateY: rotY }}>
          {/* orbit rings */}
          <div className="orbit-ring" style={{ ['--tilt' as string]: '72deg', ['--dur' as string]: '9s', width: 188, height: 188 }}>
            <span className="orbit-dot" />
          </div>
          <div className="orbit-ring orbit-ring-b" style={{ ['--tilt' as string]: '72deg', ['--tiltY' as string]: '60deg', ['--dur' as string]: '13s', width: 214, height: 214 }}>
            <span className="orbit-dot orbit-dot-gold" />
          </div>
          <div className="orbit-ring orbit-ring-c" style={{ ['--tilt' as string]: '72deg', ['--tiltY' as string]: '-60deg', ['--dur' as string]: '17s', width: 240, height: 240 }}>
            <span className="orbit-dot" />
          </div>

          {/* glow behind the coin */}
          <div className="medallion-glow" />

          {/* coin stack: back plate, edge, face */}
          <div className="coin-layer" style={{ transform: 'translateZ(-14px)' }} />
          <div className="coin-layer" style={{ transform: 'translateZ(-7px)' }} />
          <div className="coin-face" style={{ transform: 'translateZ(10px)' }}>
            <Image src="/img/logo.webp" alt="Ezzo" fill priority sizes="120px" className="object-cover" />
            <div className="coin-shine" />
          </div>
        </m.div>
      </div>
    </div>
  );
}
