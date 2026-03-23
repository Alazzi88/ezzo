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
      className="gradient-card cursor-pointer overflow-hidden p-1 text-right transition-transform duration-300 hover:-translate-y-1"
      onClick={() => setPlay(true)}
    >
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/70">
        <div className="relative w-full pt-[56.25%]">
          {play ? (
            <iframe
              className="absolute inset-0 h-full w-full rounded-3xl"
              src={embedSrc}
              title={title}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <>
              <Image src={thumbnail} alt={title} fill loading="lazy" className="rounded-3xl object-cover" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-16 w-16 text-orange-300">
                  <path fill="currentColor" d="M8 5v14l11-7z" />
                </svg>
              </div>
            </>
          )}
        </div>
        <div className="p-5">
          <p className="text-center text-lg font-bold text-orange-300">{title}</p>
        </div>
      </div>
    </div>
  );
};
