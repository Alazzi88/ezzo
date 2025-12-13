"use client";

import { useState } from "react";
import Image from "next/image";
import FAQs from "@/components/FAQs";

type Video = {
  embedSrc: string;
  title: string;
  thumbnail: string;
};

const sectionVideos: Record<"pro", Video> = {
  pro: {
    embedSrc:
      "https://player.vimeo.com/video/1146169599?context=Vimeo%5CController%5CApi%5CResources%5CVideoController.&h=ac10a1d18d&s=f315a039a934276c5187f4384bbcc6c6ec265a88_1765724774",
    title: "شرح المؤشر البرو",
    thumbnail: "/img/ezzoind.webp",
  },
};

type VideoCardProps = {
  embedSrc: string;
  title: string;
  thumbnail: string;
};

const VideoCard: React.FC<VideoCardProps> = ({ embedSrc, title, thumbnail }) => {
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
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <Image src={thumbnail} alt={title} fill className="rounded-3xl object-cover" />
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

const Indicator: React.FC = () => (
  <div className="relative isolate pb-24 pt-28">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-[18%] top-[-18%] h-80 w-80 rounded-full bg-orange-500/20 blur-[160px]" />
      <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-rose-500/18 blur-[190px]" />
    </div>

    <section className="page-shell text-center">
      <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
        مؤشرات Ezzo الاحترافية
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
        تعرف على كيفية عمل مؤشراتنا واستراتيجياتنا
      </h1>
      <p className="section-subheading mx-auto max-w-3xl">
        أدوات تحليلية متقدمة تعتمد على منهجية ICT وتكملها تنبيهات لحظية وخطط تنفيذ دقيقة لأسواق الفيوتشر وناسداك.
      </p>
    </section>

    <section className="page-shell mt-16 space-y-16">
      <div className="glass-panel px-6 py-10 sm:px-10">
        <h2 className="text-2xl font-bold text-orange-300 text-center">المؤشر البرو</h2>
        <p className="mt-4 text-center text-sm leading-7 text-gray-300">
          المؤشر البرو مبني على مفاهيم ICT ويركز على رصد الفجوات السعرية، كتل الأوامر، وتحديد أهداف واضحة مع وقف خسارة محسوب لكل صفقة.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <VideoCard {...sectionVideos.pro} />
          <ul className="list-disc space-y-3 pr-5 text-sm leading-7 text-gray-200">
            <li>نقاط دخول مبنية على مناطق سيولة مؤكدة.</li>
            <li>تحديد أهداف ووقف خسارة ديناميكي.</li>
            <li>تنبيهات فورية عبر الايميل او التطبيق.</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="page-shell mt-20">
      <div className="glass-panel px-6 py-10 sm:px-10 text-center">
        <h2 className="text-2xl font-bold text-orange-300">أسئلة شائعة</h2>
        <p className="mt-3 text-sm leading-7 text-gray-300">
          إجابات سريعة على أكثر الاستفسارات تكراراً حول مؤشراتنا، أنظمة التنبيه، وخطط الاشتراك.
        </p>
        <div className="mt-8 text-right">
          <FAQs />
        </div>
      </div>
    </section>
  </div>
);

export default Indicator;
