"use client";

import { motion } from "framer-motion";

interface SocialLink {
  label: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

interface SocialIconsProps {
  links: SocialLink[];
}

export default function SocialIcons({ links }: SocialIconsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="flex items-center justify-center flex-wrap gap-3"
    >
      {links.map((link, i) => (
        <motion.a
          key={link.label}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 + i * 0.05, duration: 0.3 }}
          whileHover={{ scale: 1.2, y: -3 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.05] backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all duration-300 shadow-lg"
          style={
            {
              "--hover-glow": link.color,
            } as React.CSSProperties
          }
          title={link.label}
        >
          <span
            className="group-hover:drop-shadow-lg transition-all"
            style={{ color: "inherit" }}
          >
            {link.icon}
          </span>
        </motion.a>
      ))}
    </motion.div>
  );
}
