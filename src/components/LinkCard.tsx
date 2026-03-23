"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

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
}: LinkCardProps) {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay: index * 0.065, ease: "easeOut" }}
      whileHover={{ scale: 1.022, y: -2 }}
      whileTap={{ scale: 0.975 }}
      className="group relative flex items-center gap-4 w-full rounded-2xl cursor-pointer overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.033)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        padding: "14px 18px",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = `${glowColor}55`;
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px ${glowColor}18, 0 8px 32px rgba(0,0,0,0.4)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Radial glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none rounded-2xl transition-opacity duration-500"
        style={{
          background: `radial-gradient(ellipse at ${dir === "rtl" ? "85% 50%" : "15% 50%"}, ${glowColor}16 0%, transparent 65%)`,
        }}
      />

      {/* Side accent bar */}
      <div
        className="absolute top-0 bottom-0 w-[3px] rounded-full opacity-40 group-hover:opacity-90 transition-opacity duration-300"
        style={{
          background: `linear-gradient(180deg, transparent, ${color}, transparent)`,
          [dir === "rtl" ? "right" : "left"]: 0,
        }}
      />

      {/* Icon */}
      <div
        className="relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${glowColor}14`,
          border: `1px solid ${glowColor}35`,
          color: glowColor,
        }}
      >
        {icon}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0" dir={dir}>
        <p className="text-white font-bold text-[15px] leading-tight truncate">{title}</p>
        <p className="text-white/45 text-[12.5px] mt-0.5 truncate font-normal">{description}</p>
      </div>

      {/* Arrow */}
      <div
        className="flex-shrink-0 transition-all duration-300 opacity-30 group-hover:opacity-70"
        style={{ color: glowColor }}
      >
        <ExternalLinkIcon size={15} />
      </div>
    </motion.a>
  );
}
