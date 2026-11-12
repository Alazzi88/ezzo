'use client';

import { useEffect, useRef } from 'react';
import { m, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { spring } from '@/lib/motion';

type Tilt3DProps = {
  children: React.ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  disabled?: boolean;
  /** corner radius of the glare layer, match the child card */
  radius?: string;
  glare?: boolean;
};

// Pointer-driven 3D tilt with a moving specular glare. Children can use translateZ()
// to float above the plate (the inner layer keeps preserve-3d).
export function Tilt3D({ children, className = '', max = 8, scale = 1.015, disabled = false, radius = '1.5rem', glare = true }: Tilt3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring.tilt);
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring.tilt);
  const springScale = useSpring(1, spring.tilt);
  const glareOpacity = useSpring(0, { stiffness: 200, damping: 26 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glareBg = useMotionTemplate`radial-gradient(260px circle at ${gx} ${gy}, rgba(255,226,196,0.16), transparent 70%)`;

  useEffect(() => {
    if (disabled) {
      px.set(0.5);
      py.set(0.5);
      springScale.set(1);
      glareOpacity.set(0);
    }
  }, [disabled, px, py, springScale, glareOpacity]);

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || e.pointerType === 'touch') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }

  function handleEnter(e: React.PointerEvent<HTMLDivElement>) {
    if (disabled || e.pointerType === 'touch') return;
    springScale.set(scale);
    glareOpacity.set(1);
  }

  function handleLeave() {
    px.set(0.5);
    py.set(0.5);
    springScale.set(1);
    glareOpacity.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
      className={className}
      style={{ perspective: 1200 }}
    >
      <m.div style={{ rotateX, rotateY, scale: springScale, transformStyle: 'preserve-3d' }} className="relative h-full w-full">
        {children}
        {glare && !disabled && (
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{ background: glareBg, opacity: glareOpacity, borderRadius: radius, transform: 'translateZ(1px)' }}
          />
        )}
      </m.div>
    </div>
  );
}
