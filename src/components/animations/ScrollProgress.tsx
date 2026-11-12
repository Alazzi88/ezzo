'use client';

import { m, useScroll, useSpring } from 'framer-motion';

// Thin copper progress line pinned to the top edge; springs so it never feels linear.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 24, mass: 0.6 });

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-right"
      style={{
        scaleX,
        background: 'linear-gradient(270deg, #f0b07a, #d4845a, #c9a84c)',
        boxShadow: '0 0 12px rgba(212,132,90,0.6)',
      }}
    />
  );
}
