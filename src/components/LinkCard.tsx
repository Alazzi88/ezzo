"use client";

import { m, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ReactNode, useRef } from "react";
import { ease, spring } from "@/lib/motion";

const ExternalLinkIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

interface LinkCardProps {
  title: string;
  description: string;
  url: string;
  icon: ReactNode;
  color: string;
  glowColor: string;
  index: number;
  dir?: "ltr" | "rtl";
  badge?: string;
  badgeColor?: string;
}

// 3D link card: spring tilt toward the pointer, layered depth (icon and text float
// above the plate), a glare that follows the cursor and a rotating light border.
export default function LinkCard({ title, description, url, icon, color, glowColor, index, dir = "rtl", badge, badgeColor }: LinkCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(nx, [0, 1], [-11, 11]), spring.tilt);
  const rotateX = useSpring(useTransform(ny, [0, 1], [9, -9]), spring.tilt);
  const lift = useSpring(0, spring.tilt);
  const gx = useTransform(nx, (v) => `${v * 100}%`);
  const gy = useTransform(ny, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(220px circle at ${gx} ${gy}, ${glowColor}30 0%, transparent 70%)`;

  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType === "touch") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    nx.set((e.clientX - r.left) / r.width);
    ny.set((e.clientY - r.top) / r.height);
  };
  const onEnter = () => lift.set(1);
  const onLeave = () => {
    nx.set(0.5);
    ny.set(0.5);
    lift.set(0);
  };
  const z = useTransform(lift, [0, 1], [0, 26]);

  return (
    <m.div
      initial={{ opacity: 0, y: 48, rotateX: -28, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.35 + index * 0.11, ease: ease.out }}
      style={{ transformPerspective: 1000 }}
    >
      <m.a
        ref={ref}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onPointerMove={onMove}
        onPointerEnter={onEnter}
        onPointerLeave={onLeave}
        whileTap={{ scale: 0.97 }}
        className="card3d group relative block w-full rounded-2xl"
        style={{
          rotateX,
          rotateY,
          z,
          transformStyle: "preserve-3d",
          ["--c" as string]: glowColor,
        }}
      >
        {/* rotating light border */}
        <span className="card3d-border" />

        {/* plate */}
        <div
          className="relative flex items-center gap-4 overflow-hidden rounded-2xl"
          style={{
            background: "linear-gradient(135deg, rgba(34,27,21,0.92) 0%, rgba(16,13,10,0.94) 100%)",
            padding: "16px 20px",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06), 0 18px 40px -18px rgba(0,0,0,0.9)",
          }}
        >
          <m.div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
          <span className="card3d-sheen" />

          <div
            className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
            style={{
              background: `${glowColor}16`,
              border: `1px solid ${glowColor}35`,
              color: glowColor,
              transform: "translateZ(42px)",
              boxShadow: `0 10px 22px -8px ${glowColor}66`,
            }}
          >
            {icon}
          </div>

          <div className="min-w-0 flex-1" dir={dir} style={{ transform: "translateZ(26px)" }}>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-[15px] font-bold leading-tight text-white">{title}</p>
              {badge && (
                <span
                  className="animate-pulse rounded-full px-2 py-0.5 text-[9.5px] font-black tracking-wider"
                  style={{ background: `${badgeColor || glowColor}18`, border: `1px solid ${badgeColor || glowColor}40`, color: badgeColor || glowColor }}
                >
                  {badge}
                </span>
              )}
            </div>
            <p className="mt-1 truncate text-[12.5px] font-normal leading-normal text-white/45 transition-colors duration-300 group-hover:text-white/65">{description}</p>
          </div>

          <div
            className="flex-shrink-0 opacity-30 transition-all duration-300 group-hover:opacity-90"
            style={{ color: glowColor, transform: "translateZ(34px)" }}
          >
            <ExternalLinkIcon size={15} />
          </div>
        </div>
      </m.a>
    </m.div>
  );
}
