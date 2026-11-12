"use client";

import { motion } from "framer-motion";
import Medallion3D from "@/components/links/Medallion3D";
import { ease } from "@/lib/motion";

const LETTER_COLORS = ["#f0b07a", "#e8956a", "#d9a35c", "#c9a84c"];

interface ProfileHeaderProps {
  brand: string;
  subtitle: string;
  description: string;
  pageNote: string;
  dir?: "ltr" | "rtl";
  children?: React.ReactNode;
}

export default function ProfileHeader({
  brand,
  subtitle,
  description,
  pageNote,
  dir = "rtl",
  children,
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-4 pb-2"
      dir={dir}
    >
      <Medallion3D />

      {/* ── Brand name with Verified Badge ────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.22, duration: 0.5 }}
        className="flex flex-col items-center gap-2"
      >
        <div className="flex items-center justify-center gap-2">
          <h1 className="flex text-5xl font-extrabold tracking-widest" dir="ltr" aria-label={brand} style={{ perspective: 600 }}>
            {brand.split("").map((ch, i) => (
              <motion.span
                key={i}
                aria-hidden
                className="inline-block"
                initial={{ opacity: 0, rotateX: -95, y: 18 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.9, ease: ease.out }}
                style={{
                  transformOrigin: "50% 100%",
                  color: LETTER_COLORS[i % LETTER_COLORS.length],
                  textShadow: "0 0 26px rgba(212,132,90,0.55), 0 3px 0 rgba(90,46,24,0.7)",
                }}
              >
                <span className="letter-bob inline-block" style={{ animationDelay: `${i * 0.18}s` }}>{ch}</span>
              </motion.span>
            ))}
          </h1>
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.45, type: "spring", stiffness: 200 }}
            className="flex-shrink-0 mt-1"
          >
            {/* High-end gold verified badge */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.06 16.5L6.56 13L8.06 11.5L10.06 13.5L15.56 8L17.06 9.5L10.06 16.5Z" fill="currentColor"/>
            </svg>
          </motion.div>
        </div>

        {/* Official badge */}
        <div
          className="flex items-center gap-2 px-4 py-1 rounded-full"
          style={{
            background: "rgba(212,132,90,0.07)",
            border: "1px solid rgba(212,132,90,0.25)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#d4845a", boxShadow: "0 0 8px #d4845a" }}
          />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#c9a84c" }}
          >
            Official Profile
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "#d4845a", boxShadow: "0 0 8px #d4845a" }}
          />
        </div>
      </motion.div>

      {/* ── Subtitle ──────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-sm font-bold tracking-wide"
        style={{ color: "rgba(201,168,76,0.8)" }}
      >
        {subtitle}
      </motion.p>

      {/* ── Description ───────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-white/60 text-sm leading-relaxed max-w-sm"
      >
        {description}
      </motion.p>

      {/* ── Inject Quick social / children elements ─────────────── */}
      {children}

      {/* ── Page note banner ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl backdrop-blur-md"
        style={{
          background: "rgba(212,132,90,0.05)",
          border: "1px solid rgba(212,132,90,0.16)",
        }}
      >
        {/* Icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-xs font-medium" style={{ color: "rgba(201,168,76,0.62)" }}>
          {pageNote}
        </p>
      </motion.div>

      {/* ── Gold divider ──────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.8 }}
        className="w-full h-px mt-1"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,132,90,0.35), rgba(201,168,76,0.55), rgba(212,132,90,0.35), transparent)",
        }}
      />
    </motion.div>
  );
}
