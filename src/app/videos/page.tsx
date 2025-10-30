'use client';

import Image from 'next/image';
import { useState } from 'react';

type Video = { id: number; title: string; url: string; thumbnail: string };

const videos: Video[] = [
  { id: 1, title: 'الفيديو الأول', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', thumbnail: '/img/trading-analysis.webp' },
  { id: 2, title: 'الفيديو الثاني', url: 'https://www.youtube.com/embed/3JZ_D3ELwOQ', thumbnail: '/img/indic.webp' },
  { id: 3, title: 'الفيديو الثالث', url: 'https://www.youtube.com/embed/tgbNymZ7vqY', thumbnail: '/img/trading3.webp' },
];

export default function VideosPage() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const openModal = (video: Video) => setSelectedVideo(video);
  const closeModal = () => setSelectedVideo(null);

  return (
    <div className="relative isolate pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[-18%] h-80 w-80 rounded-full bg-orange-500/20 blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-rose-500/20 blur-[190px]" />
      </div>

      <section className="page-shell text-center">
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">مكتبة فيديوهات Ezzo</h1>
        <p className="section-subheading mx-auto max-w-2xl">
          مجموعة مختارة من الشروحات المرئية تغطي التحليل الفني، الحسابات الممولة، وأفضل الممارسات التطبيقية.
        </p>
      </section>

      <section className="page-shell mt-16 grid gap-8 lg:grid-cols-3">
        {videos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => openModal(video)}
            className="gradient-card h-full overflow-hidden text-right transition-transform duration-300 hover:-translate-y-1"
          >
            <div className="relative h-48 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60">
              <Image src={video.thumbnail} alt={video.title} fill loading="lazy" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-orange-100 backdrop-blur">
                اضغط للمشاهدة
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-orange-300">{video.title}</h3>
              <p className="mt-3 text-sm text-gray-300">انقر للمشاهدة الفورية</p>
            </div>
          </button>
        ))}
      </section>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="glass-panel relative w-full max-w-3xl px-6 py-8">
            <button
              type="button"
              onClick={closeModal}
              className="absolute left-4 top-4 rounded-full border border-white/15 p-2 text-orange-200 transition-colors hover:border-orange-200 hover:text-white"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold text-orange-300 text-center">{selectedVideo.title}</h2>
            <div className="relative mt-6 w-full pt-[56.25%]">
              <iframe
                className="absolute inset-0 h-full w-full rounded-2xl border border-white/10"
                src={selectedVideo.url}
                title={selectedVideo.title}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
