"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ProfileHeader from "@/components/ProfileHeader";
import LinkCard from "@/components/LinkCard";
import WorldGlobe from "@/components/WorldGlobe";
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
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ToolsHeaderIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const CommunityHeaderIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// ─── Section Header ──────────────────────────────────────────────────────────

const SectionHeader = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <div className="flex items-center gap-2 mt-7 mb-3.5 px-1.5" dir="rtl">
    <span style={{ color: '#d4845a', filter: 'drop-shadow(0 0 6px rgba(212,132,90,0.4))' }}>
      {icon}
    </span>
    <h2 className="text-[13px] font-black tracking-wider uppercase" style={{ color: 'rgba(240,235,228,0.6)' }}>{title}</h2>
    <div className="flex-1 h-px ml-2" style={{ background: 'linear-gradient(to left, rgba(212,132,90,0.2), rgba(212,132,90,0.03), transparent)' }} />
  </div>
);

// ─── Action Bar ───────────────────────────────────────────────────────────────

function ActionBar({ t }: { t: typeof arTranslations }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: "EZZO | روابطنا الرسمية", url: window.location.href });
      } catch (err) {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 35, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.75, type: "spring", stiffness: 140, damping: 15 }}
      className="fixed bottom-6 inset-x-4 mx-auto max-w-[340px] z-40 flex items-center justify-between p-1.5 rounded-2xl border"
      style={{
        background: "rgba(13, 11, 9, 0.82)",
        borderColor: "rgba(212, 132, 90, 0.2)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 22px 45px rgba(0,0,0,0.7), 0 0 25px rgba(212,132,90,0.07)",
      }}
    >
      <button
        onClick={handleCopy}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black transition-all duration-300 active:scale-95"
        style={{
          color: copied ? "#4ade80" : "rgba(255,255,255,0.75)",
          background: copied ? "rgba(74,222,128,0.08)" : "transparent",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {copied ? (
            <polyline points="20 6 9 17 4 12" />
          ) : (
            <>
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </>
          )}
        </svg>
        <span>{copied ? t.copied : t.copyLink}</span>
      </button>

      <div className="w-px h-6 bg-white/10" />

      <button
        onClick={handleShare}
        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-black text-amber-400 transition-all duration-300 active:scale-95 hover:text-amber-300"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        <span>{t.share}</span>
      </button>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LinksPage() {
  const t = arTranslations;

  const primaryServices = [
    { key: "website" as const, url: "https://3zzo.com/", icon: <WebsiteIcon size={20} />, color: "#f97316", glowColor: "#f97316" },
    { key: "optionBot" as const, url: "https://t.me/ezzospxbot", icon: <BotIcon size={20} />, color: "#fbbf24", glowColor: "#fbbf24", badge: "رائج", badgeColor: "#fbbf24" },
    { key: "store" as const, url: "https://3zzo.aryaf.sa/", icon: <StoreIcon size={20} />, color: "#fb923c", glowColor: "#fb923c" },
    { key: "telegramCourse" as const, url: "https://t.me/ezzo_course", icon: <CourseIcon size={20} />, color: "#a78bfa", glowColor: "#a78bfa", badge: "مميز", badgeColor: "#a78bfa" },
    { key: "indicator" as const, url: "https://3zzo.com/Indicator", icon: <ChartIcon size={20} />, color: "#facc15", glowColor: "#facc15" },
  ] as const;

  const communities = [
    { key: "telegramChannel" as const, url: "https://t.me/ezzo_trading", icon: <TelegramIcon size={20} />, color: "#38bdf8", glowColor: "#38bdf8" },
  ] as const;

  const socialCircles = [
    { key: "whatsapp" as const, url: "https://api.whatsapp.com/send/?phone=966503405496&text&type=phone_number&app_absent=0", icon: <WhatsAppIcon size={22} />, color: "#4ade80", label: "واتساب" },
    { key: "personalTelegram" as const, url: "https://t.me/ezzo3zzo3", icon: <PersonIcon size={22} />, color: "#38bdf8", label: "تواصل خاص" },
    { key: "tiktok" as const, url: "https://www.tiktok.com/@3zzo.com", icon: <TikTokIcon size={22} />, color: "#e2e8f0", label: "تيك توك" },
    { key: "instagram" as const, url: "https://www.instagram.com/3zzoezzo/", icon: <InstagramIcon size={22} />, color: "#f472b6", label: "انستغرام" },
    { key: "snapchat" as const, url: "https://www.snapchat.com/@ezzo.com", icon: <SnapchatIcon size={22} />, color: "#facc15", label: "سناب شات" },
  ] as const;

  return (
    <>
      {/* Background drifting stars */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-1/4 left-[15%] w-1 h-1 rounded-full blur-[0.5px] animate-pulse" style={{ background: 'rgba(201,168,76,0.25)', animationDuration: '4s' }} />
        <div className="absolute top-1/3 right-[20%] w-1.5 h-1.5 rounded-full blur-[1px] animate-pulse" style={{ background: 'rgba(212,132,90,0.18)', animationDuration: '6s' }} />
        <div className="absolute top-2/3 left-[25%] w-2 h-2 rounded-full blur-[2px] animate-pulse" style={{ background: 'rgba(201,168,76,0.12)', animationDuration: '8s' }} />
        <div className="absolute top-[80%] right-[15%] w-1 h-1 rounded-full blur-[0.5px] animate-pulse" style={{ background: 'rgba(212,132,90,0.22)', animationDuration: '5s' }} />
        <div className="absolute top-24 right-12 w-2.5 h-2.5 rounded-full blur-[3px] animate-ping" style={{ background: 'rgba(212,132,90,0.08)', animationDuration: '12s' }} />
        <div className="absolute bottom-[20%] left-12 w-1.5 h-1.5 rounded-full blur-[1.5px] animate-pulse" style={{ background: 'rgba(201,168,76,0.2)', animationDuration: '7s' }} />
      </div>

      {/* Globe */}
      <WorldGlobe />

      {/* ── Background layers ──────────────────────────────────── */}
      {/* Radial ambient glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(212,132,90,0.09) 0%, transparent 60%), " +
            "radial-gradient(ellipse 50% 35% at 90% 90%, rgba(201,168,76,0.05) 0%, transparent 50%), " +
            "radial-gradient(ellipse 40% 30% at 10% 70%, rgba(212,132,90,0.04) 0%, transparent 50%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,132,90,0.018) 1px, transparent 1px), " +
            "linear-gradient(90deg, rgba(212,132,90,0.018) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <main
        className="relative min-h-screen flex flex-col items-center px-4 pt-10 pb-36"
        style={{ zIndex: 10 }}
        dir="rtl"
      >
        <div className="w-full max-w-[420px] flex flex-col gap-6">

          <ProfileHeader
            brand={t.brand}
            subtitle={t.subtitle}
            description={t.description}
            pageNote={t.pageNote}
            dir="rtl"
          >
            {/* Quick social circles in children */}
            <div className="flex items-center justify-center gap-3.5 my-3 flex-wrap">
              {socialCircles.map((social) => {
                const linkData = t.links[social.key];
                return (
                  <motion.a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center justify-center w-12 h-12 rounded-2xl border transition-all duration-300"
                    style={{
                      background: "rgba(255, 255, 255, 0.025)",
                      borderColor: "rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.65)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = `${social.color}60`;
                      e.currentTarget.style.color = social.color;
                      e.currentTarget.style.boxShadow = `0 0 22px ${social.color}25, inset 0 0 8px ${social.color}15`;
                      e.currentTarget.style.background = `${social.color}08`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.color = "rgba(255, 255, 255, 0.65)";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.025)";
                    }}
                    title={linkData?.title || social.label}
                  >
                    {social.icon}
                  </motion.a>
                );
              })}
            </div>
          </ProfileHeader>

          {/* Section 1: Main services */}
          <div>
            <SectionHeader title="أدوات التداول والخدمات الرسمية" icon={<ToolsHeaderIcon />} />
            <div className="flex flex-col gap-3">
              {primaryServices.map((link, index) => {
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
                    badge={"badge" in link ? link.badge : undefined}
                    badgeColor={"badgeColor" in link ? link.badgeColor : undefined}
                  />
                );
              })}
            </div>
          </div>

          {/* Section 2: Communities */}
          <div>
            <SectionHeader title="مجتمعات وقنوات تلجرام" icon={<CommunityHeaderIcon />} />
            <div className="flex flex-col gap-3">
              {communities.map((link, index) => {
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
                    index={index + primaryServices.length}
                    dir="rtl"
                  />
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div
            className="w-full h-px mt-4"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,132,90,0.14), rgba(201,168,76,0.22), rgba(212,132,90,0.14), transparent)",
            }}
          />

          {/* Copyright text at the end of scrollable content */}
          <p className="text-center text-[11px] text-white/30 font-medium tracking-wide mt-2">
            © 2026 EZZO. جميع الحقوق محفوظة. صُمم لدعم المتداولين.
          </p>

        </div>
      </main>

      {/* Floating Action Bar */}
      <ActionBar t={t} />
    </>
  );
}
