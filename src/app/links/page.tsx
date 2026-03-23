"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import WorldGlobe from "@/components/WorldGlobe";

import Image from "next/image";
import arTranslations from "@/locales/ar.json";

// ─── SVG Icons ────────────────────────────────────────────────────────────────

const TelegramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
);

const WebsiteIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const ChartIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

const BotIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="5" r="2" />
    <path d="M12 7v4" />
    <circle cx="8" cy="16" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
  </svg>
);

const StoreIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const DiscussIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CourseIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

const SnapchatIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.166 3c-.57 0-2.541.14-3.682 1.978-.382.614-.321 1.67-.286 2.456l.01.21c-.336.09-.74.046-1.098-.069-.088-.029-.17-.043-.245-.043-.28 0-.46.153-.514.43-.064.33.13.57.396.693.054.026.688.283 1.52.316-.28.49-.716 1.144-1.505 1.79-.197.161-.298.38-.264.594.024.154.116.295.26.39.362.236.917.36 1.648.369-.099.25-.137.521-.113.786.042.458.285.851.68 1.107.413.267.98.401 1.683.401.614 0 1.134-.104 1.543-.309.32.205.84.309 1.543.309.703 0 1.27-.134 1.683-.401.395-.256.638-.649.68-1.107.024-.265-.014-.537-.113-.786.73-.009 1.286-.133 1.648-.37.144-.094.236-.235.26-.389.034-.215-.067-.433-.264-.594-.789-.646-1.225-1.3-1.505-1.79.832-.033 1.466-.29 1.52-.316.266-.123.46-.363.396-.693-.054-.277-.234-.43-.514-.43-.075 0-.157.014-.245.043-.358.115-.762.158-1.099.07l.011-.211c.035-.786.096-1.842-.286-2.456C14.707 3.14 12.737 3 12.166 3z" />
  </svg>
);

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.78a4.85 4.85 0 0 1-1.01-.09z" />
  </svg>
);

const WhatsAppIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
  </svg>
);

const PersonIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

// ─── Link definitions ─────────────────────────────────────────────────────────

function getLinks() {
  return [
    { key: "website" as const,           url: "https://3zzo.com/",                                                                              icon: <WebsiteIcon size={20} />,  color: "#f97316", glowColor: "#f97316" },
    { key: "optionBot" as const,         url: "https://t.me/ezzospxbot",                                                                       icon: <BotIcon size={20} />,      color: "#fbbf24", glowColor: "#fbbf24" },
    { key: "indicator" as const,         url: "https://3zzo.com/Indicator",                                                                    icon: <ChartIcon size={20} />,    color: "#facc15", glowColor: "#facc15" },
    { key: "store" as const,             url: "https://3zzo.aryaf.sa/",                                                                        icon: <StoreIcon size={20} />,    color: "#fb923c", glowColor: "#fb923c" },
    { key: "telegramChannel" as const,   url: "https://t.me/ezzo_trading",                                                                     icon: <TelegramIcon size={20} />, color: "#38bdf8", glowColor: "#38bdf8" },
    { key: "telegramDiscussions" as const, url: "https://t.me/ezzo_discussions",                                                               icon: <DiscussIcon size={20} />,  color: "#60a5fa", glowColor: "#60a5fa" },
    { key: "telegramCourse" as const,    url: "https://t.me/ezzo_course",                                                                      icon: <CourseIcon size={20} />,   color: "#a78bfa", glowColor: "#a78bfa" },
    { key: "whatsapp" as const,          url: "https://api.whatsapp.com/send/?phone=966503405496&text&type=phone_number&app_absent=0",         icon: <WhatsAppIcon size={20} />,  color: "#4ade80", glowColor: "#4ade80" },
    { key: "tiktok" as const,            url: "https://www.tiktok.com/@3zzo.com",                                                              icon: <TikTokIcon size={20} />,   color: "#e2e8f0", glowColor: "#94a3b8" },
    { key: "instagram" as const,         url: "https://www.instagram.com/3zzoezzo/",                                                           icon: <InstagramIcon size={20} />, color: "#f472b6", glowColor: "#f472b6" },
    { key: "snapchat" as const,          url: "https://www.snapchat.com/@ezzo.com",                                                            icon: <SnapchatIcon size={20} />,  color: "#facc15", glowColor: "#facc15" },
    { key: "personalTelegram" as const,  url: "https://t.me/ezzo3zzo3",                                                                        icon: <PersonIcon size={20} />,    color: "#f97316", glowColor: "#f97316" },
  ] as const;
}

// ─── Loading screen (matches main site style) ─────────────────────────────────

function LinksLoadingScreen({ exiting }: { exiting: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`loading-screen ${exiting ? 'loading-screen-exit' : ''}`}
      aria-hidden="true"
    >
      <div className="loading-logo-wrapper">
        <div className="loading-ring loading-ring-outer">
          <svg viewBox="0 0 200 200" className="loading-ring-svg">
            <defs>
              <linearGradient id="lrg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="90" fill="none" stroke="url(#lrg1)" strokeWidth="2" strokeLinecap="round" strokeDasharray="150 400" />
          </svg>
        </div>
        <div className="loading-ring loading-ring-inner">
          <svg viewBox="0 0 200 200" className="loading-ring-svg">
            <defs>
              <linearGradient id="lrg2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fb923c" stopOpacity="0" />
                <stop offset="50%" stopColor="#f97316" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="70" fill="none" stroke="url(#lrg2)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="100 350" />
          </svg>
        </div>
        <div className="loading-logo-glow" />
        <div className="loading-logo-container">
          <div className="loading-logo-circle">
            <Image src="/img/logo.webp" alt="" width={80} height={80} priority className="loading-logo" />
          </div>
        </div>
      </div>
      <div className="loading-text-container" dir="ltr">
        <span className="loading-domain">
          <span className="loading-number">3zzo</span>
          <span className="loading-rest">.com</span>
        </span>
      </div>
      <div className="loading-bar-container">
        <div className="loading-bar" />
      </div>
    </motion.div>
  );
}

// ─── Action bar ───────────────────────────────────────────────────────────────

function ActionBar({ t }: { t: typeof arTranslations }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      await navigator.share({ title: "EZZO", url: window.location.href });
    } else {
      handleCopy();
    }
  };

  const btnBase =
    "flex items-center justify-center px-6 py-2.5 rounded-xl border text-sm font-semibold transition-all duration-300 min-w-[120px]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.5 }}
      className="flex items-center gap-3 justify-center"
    >
      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`${btnBase}`}
        style={{
          borderColor: copied ? "rgba(74,222,128,0.4)" : "rgba(255,255,255,0.1)",
          background: copied ? "rgba(74,222,128,0.08)" : "rgba(255,255,255,0.04)",
          color: copied ? "#4ade80" : "rgba(255,255,255,0.6)",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={copied ? "c" : "n"}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.18 }}
          >
            {copied ? t.copied : t.copyLink}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      <motion.button
        onClick={handleShare}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`${btnBase}`}
        style={{
          borderColor: "rgba(249,115,22,0.25)",
          background: "rgba(249,115,22,0.06)",
          color: "rgba(251,191,36,0.75)",
        }}
      >
        {t.share}
      </motion.button>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LinksPage() {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 900);
    const hideTimer = setTimeout(() => setLoading(false), 1250);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const t = arTranslations;
  const links = getLinks();

  return (
    <>
      <AnimatePresence>
        {loading && <LinksLoadingScreen exiting={exiting} />}
      </AnimatePresence>

      {/* Globe */}
      <WorldGlobe />

      {/* ── Background layers ──────────────────────────────────── */}

      {/* Radial ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(249,115,22,0.1) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 35% at 90% 90%, rgba(251,191,36,0.06) 0%, transparent 50%), " +
            "radial-gradient(ellipse 40% 30% at 10% 70%, rgba(249,115,22,0.05) 0%, transparent 50%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.025) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(249,115,22,0.025) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      {/* Content */}
      <main
        className="relative min-h-screen flex flex-col items-center px-4 py-12 pb-20"
        style={{ zIndex: 10 }}
        dir="rtl"
      >
        <div className="w-full max-w-[420px] flex flex-col gap-5">

          <ProfileHeader
            brand={t.brand}
            subtitle={t.subtitle}
            description={t.description}
            pageNote={t.pageNote}
            dir="rtl"
          />

          {/* Link cards */}
          <div className="flex flex-col gap-2.5">
            {links.map((link, index) => {
              const linkData = t.links[link.key];
              return (
                <LinkCard
                  key={link.key}
                  title={linkData.title}
                  description={linkData.description}
                  url={link.url}
                  icon={link.icon}
                  color={link.color}
                  glowColor={link.glowColor}
                  index={index}
                  dir="rtl"
                />
              );
            })}
          </div>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(249,115,22,0.2), rgba(251,191,36,0.35), rgba(249,115,22,0.2), transparent)",
            }}
          />

        </div>
      </main>

      {/* Fixed copyright bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="fixed bottom-0 inset-x-0 z-30 flex items-center justify-center py-3 px-4"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 70%, transparent 100%)",
          backdropFilter: "blur(4px)",
        }}
      >
        <p className="text-center text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
          © 2025 EZZO. جميع الحقوق محفوظة.
        </p>
      </motion.div>
    </>
  );
}
