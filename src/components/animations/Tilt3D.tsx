'use client';

import { useEffect, useRef } from 'react';
import { m, useMotionValue, useSpring, useTransform } from 'framer-motion';

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  disabled?: boolean;
};

export function Tilt3D({ children, className = '', max = 8, scale = 1.015, disabled = false }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 260, damping: 24 });
  const springScale = useSpring(1, { stiffness: 260, damping: 24 });

  useEffect(() => {
    if (disabled) {
      px.set(0.5);
      py.set(0.5);
      springScale.set(1);
    }
  }, [disabled, px, py, springScale]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleEnter() {
    if (disabled) return;
    springScale.set(scale);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    springScale.set(1);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={className}
      style={{ perspective: 1200 }}
    >
      <m.div
        style={{ rotateX, rotateY, scale: springScale, transformStyle: 'preserve-3d' }}
        className="h-full w-full"
      >
        {children}
      </m.div>
    </div>
  );
}
