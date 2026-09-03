import React from 'react';
import Image from 'next/image';

/**
 * معاينة مؤشر «ايزو تيك هنتر» (EZZO TickHunter) — لقطة حقيقية من الشارت
 * موضوعة داخل إطار نافذة بأسلوب TradingView مع مفتاح ألوان يشرح ما يرسمه المؤشر:
 * منطقة الدخول، وقف الخسارة، ومستويات السيولة البيعية والشرائية.
 */

export default function FuturesIndicatorPreview() {
  return (
    <div className="gradient-card overflow-hidden">
      {/* شريط نافذة بأسلوب macOS */}
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-5 py-3">
        <div className="flex gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] opacity-80" />
        </div>
        <span className="font-mono text-[11px] text-gray-400">🏹 3zzo TickHunter · NQ</span>
        <div className="w-10" />
      </div>

      <div className="bg-[#fbfbfd] p-2 sm:p-3">
        <Image
          src="/img/3zzo-tickhunter.png"
          alt="مؤشر 3zzo TickHunter على شارت الناسداك: منطقة دخول خضراء ووقف خسارة وردي ومستويات سيولة بيعية وشرائية"
          width={1320}
          height={1182}
          className="h-auto w-full rounded-lg"
          sizes="(max-width: 768px) 100vw, 560px"
        />
      </div>

      {/* مفتاح الألوان */}
      <div
        dir="rtl"
        className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/[0.06] px-5 py-3 text-[11px] font-semibold text-gray-400"
      >
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#c9efd4]" /> منطقة الدخول (Order Block)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#f7d4dc]" /> وقف الخسارة
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#f0a35a]" /> سيولة بيعية / هدف علوي
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#7aa5ec]" /> سيولة شرائية / دعم
        </span>
      </div>
    </div>
  );
}
