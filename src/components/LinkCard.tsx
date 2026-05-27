"use client";

import { motion } from "framer-motion";
import { ReactNode, useState } from "react";

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

export default function LinkCard({
  title,
  description,
  url,
  icon,
  color,
  glowColor,
  index,
  dir = "rtl",
  badge,
  badgeColor,
}: LinkCardProps) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.018 }}
      whileTap={{ scale: 0.98 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-4 w-full rounded-2xl cursor-pointer overflow-hidden border"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.035) 0%, rgba(255,255,255,0.008) 100%)",
        borderColor: isHovered ? `${glowColor}45` : "rgba(255,255,255,0.06)",
        boxShadow: isHovered ? `0 0 28px ${glowColor}12, 0 12px 36px rgba(0,0,0,0.55)` : "none",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        padding: "16px 20px",
        transition: "border-color 0.35s ease, box-shadow 0.35s ease",
      }}
    >
      {/* Dynamic Cursor-Tracking Radial Glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(140px circle at ${coords.x}px ${coords.y}px, ${glowColor}18 0%, transparent 80%)`,
        }}
      />

      {/* Side accent bar */}
      <div
        className="absolute top-0 bottom-0 w-[3px] rounded-full opacity-45 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
          [dir === "rtl" ? "right" : "left"]: 0,
        }}
      />

      {/* Icon with micro-animation */}
      <div
        className="relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110"
        style={{
          background: `${glowColor}12`,
          border: `1px solid ${glowColor}25`,
          color: glowColor,
          boxShadow: isHovered ? `0 0 12px ${glowColor}30` : "none",
          transition: "border-color 0.4s, background-color 0.4s, box-shadow 0.4s",
        }}
      >
        <motion.div
          animate={isHovered ? { rotate: [0, -8, 8, -5, 0], scale: 1.05 } : { rotate: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {icon}
        </motion.div>
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0" dir={dir}>
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-white font-bold text-[15px] leading-tight transition-colors duration-300 group-hover:text-white/95">{title}</p>
          {badge && (
            <span
              className="text-[9.5px] font-black px-2 py-0.5 rounded-full tracking-wider animate-pulse"
              style={{
                background: badgeColor ? `${badgeColor}18` : `${glowColor}18`,
                border: `1px solid ${badgeColor || glowColor}40`,
                color: badgeColor || glowColor,
                textShadow: `0 0 4px ${badgeColor || glowColor}30`,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <p className="text-white/45 text-[12.5px] mt-1 truncate font-normal leading-normal transition-colors duration-300 group-hover:text-white/60">{description}</p>
      </div>

      {/* Arrow with micro-translation */}
      <div
        className="flex-shrink-0 transition-all duration-300 opacity-20 group-hover:opacity-80"
        style={{ 
          color: glowColor,
          transform: isHovered 
            ? (dir === "rtl" ? "translate(-3px, -1px) scale(1.1)" : "translate(3px, -1px) scale(1.1)") 
            : "none",
          transition: "transform 0.3s ease, opacity 0.3s ease",
        }}
      >
        <ExternalLinkIcon size={15} />
      </div>
    </motion.a>
  );
}
