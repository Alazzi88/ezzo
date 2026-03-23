"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface ProfileHeaderProps {
  brand: string;
  subtitle: string;
  description: string;
  pageNote: string;
  dir?: "ltr" | "rtl";
}

export default function ProfileHeader({
  brand,
  subtitle,
  description,
  pageNote,
  dir = "rtl",
}: ProfileHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      className="flex flex-col items-center text-center gap-4 pb-2"
      dir={dir}
    >
      {/* ── Logo with rotating glow ring ─────────────────────── */}
      <div className="relative">
        {/* Spinning conic ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: -6,
            background: "conic-gradient(from 0deg, #f97316, #fbbf24, #facc15, #fb923c, #f97316)",
            filter: "blur(10px)",
            opacity: 0.7,
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
        />
        {/* Static softer ring */}
        <div
          className="absolute rounded-full"
          style={{
            inset: -3,
            background: "conic-gradient(from 90deg, #f9731640, #fbbf2440, #f9731640)",
            filter: "blur(5px)",
          }}
        />
        {/* Logo container */}
        <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 shadow-2xl"
          style={{ borderColor: "rgba(249,115,22,0.4)" }}
        >
          <Image
            src="/img/logo.webp"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* ── Brand name ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.22, duration: 0.5 }}
        className="flex flex-col items-center gap-2"
      >
        <h1
          className="text-5xl font-extrabold tracking-widest"
          style={{
            background: "linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #facc15 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            filter: "drop-shadow(0 0 22px rgba(249,115,22,0.55))",
          }}
        >
          {brand}
        </h1>

        {/* Official badge */}
        <div
          className="flex items-center gap-2 px-4 py-1 rounded-full"
          style={{
            background: "rgba(249,115,22,0.1)",
            border: "1px solid rgba(249,115,22,0.3)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }}
          />
          <span
            className="text-xs font-bold tracking-widest uppercase"
            style={{ color: "#fbbf24" }}
          >
            Official
          </span>
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#f97316", boxShadow: "0 0 6px #f97316" }}
          />
        </div>
      </motion.div>

      {/* ── Subtitle ──────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="text-sm font-bold tracking-wide"
        style={{ color: "#fbbf24cc" }}
      >
        {subtitle}
      </motion.p>

      {/* ── Description ───────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="text-white/55 text-sm leading-relaxed max-w-xs"
      >
        {description}
      </motion.p>

      {/* ── Page note banner ──────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl"
        style={{
          background: "rgba(249,115,22,0.07)",
          border: "1px solid rgba(249,115,22,0.2)",
        }}
      >
        {/* Icon */}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <p className="text-xs font-medium" style={{ color: "#fbbf2499" }}>
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
            "linear-gradient(90deg, transparent, rgba(249,115,22,0.4), rgba(251,191,36,0.6), rgba(249,115,22,0.4), transparent)",
        }}
      />
    </motion.div>
  );
}
