'use client';

import { useState } from 'react';
import Image from 'next/image';

export const VideoCard: React.FC<{ embedSrc: string; title: string; thumbnail: string }> = ({
  embedSrc,
  title,
  thumbnail,
}) => {
  const [play, setPlay] = useState(false);

  return (
    <div
      className="gradient-card cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)]"
      onClick={() => setPlay(true)}
    >
      {/* macOS style Window Title Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] opacity-80" />
        </div>
        <span className="text-[11px] font-bold text-gray-400">{title}</span>
        <div className="w-10" />
      </div>

      <div className="relative w-full pt-[56.25%] bg-black/80">
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={embedSrc}
            title={title}
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <>
            <Image src={thumbnail} alt={title} fill loading="lazy" className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] hover:backdrop-blur-0 transition-all">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-black shadow-[0_0_20px_rgba(249,115,22,0.5)] transition-transform duration-300 hover:scale-110 active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-8 w-8 text-black fill-current translate-x-[2px] rtl:-translate-x-[2px]">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
