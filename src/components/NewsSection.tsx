'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FadeIn, StaggerContainer, StaggerItem } from './animations/MotionComponents';

interface Article {
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: { name: string };
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `منذ ${mins} دقيقة`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `منذ ${hrs} ساعة`;
  return `منذ ${Math.floor(hrs / 24)} يوم`;
}

function NewsCardLarge({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-black/60 transition-all duration-300 hover:border-orange-500/30 hover:shadow-[0_25px_60px_-20px_rgba(249,115,22,0.25)] hover:-translate-y-1"
    >
      <div className="relative h-52 w-full overflow-hidden bg-white/5">
        {article.urlToImage ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-4xl opacity-20">📰</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="rounded-full border border-orange-500/30 bg-black/70 px-2.5 py-1 text-[10px] font-semibold text-orange-300 backdrop-blur-sm">
            {article.source.name}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white group-hover:text-orange-200 transition-colors duration-300">
          {article.title}
        </h3>
        {article.description && (
          <p className="line-clamp-2 text-xs leading-relaxed text-gray-400">
            {article.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-[10px] text-gray-600">{timeAgo(article.publishedAt)}</span>
          <span className="text-[10px] font-semibold text-orange-400 group-hover:text-orange-300 transition-colors">
            اقرأ المزيد ↗
          </span>
        </div>
      </div>
    </a>
  );
}

function NewsCardSmall({ article }: { article: Article }) {
  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-3 rounded-2xl border border-white/5 bg-white/3 p-3.5 transition-all duration-300 hover:border-orange-500/20 hover:bg-white/5"
    >
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl bg-white/5">
        {article.urlToImage ? (
          <Image
            src={article.urlToImage}
            alt={article.title}
            fill
            sizes="56px"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xl opacity-20">📰</div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="line-clamp-2 text-xs font-semibold leading-snug text-gray-200 group-hover:text-white transition-colors">
          {article.title}
        </p>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-[9px] font-semibold text-orange-400/80">{article.source.name}</span>
          <span className="text-[9px] text-gray-700">•</span>
          <span className="text-[9px] text-gray-600">{timeAgo(article.publishedAt)}</span>
        </div>
      </div>
    </a>
  );
}

function SkeletonCard({ large }: { large?: boolean }) {
  return (
    <div className="animate-pulse rounded-3xl border border-white/5 bg-white/3 overflow-hidden">
      {large && <div className="h-52 w-full bg-white/5" />}
      <div className={`${large ? 'p-5' : 'p-3.5 flex gap-3'}`}>
        {!large && <div className="h-14 w-14 rounded-xl bg-white/5 flex-shrink-0" />}
        <div className="flex-1 space-y-2">
          <div className="h-3 w-4/5 rounded bg-white/5" />
          <div className="h-3 w-3/5 rounded bg-white/5" />
          <div className="h-2 w-1/4 rounded bg-white/5" />
        </div>
      </div>
    </div>
  );
}

export default function NewsSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/news')
      .then(r => r.json())
      .then(d => {
        const valid = (d.articles || []).filter(
          (a: Article) => a.title && a.title !== '[Removed]' && a.url
        );
        setArticles(valid);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const featured = articles.slice(0, 2);
  const rest = articles.slice(2, 8);

  return (
    <section id="news" className="page-shell mt-20">
      <FadeIn direction="up">
        <div className="glass-panel px-4 py-8 sm:px-8 sm:py-12">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="section-heading flex items-center gap-3">
                <span>أخبار الأسواق المالية</span>
                {!loading && !error && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-green-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                    مباشر
                  </span>
                )}
              </h2>
              <p className="section-subheading">
                آخر أخبار الاقتصاد والأسواق المالية العالمية
              </p>
            </div>
            <a
              href="https://newsapi.org"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start text-[10px] font-semibold uppercase tracking-wider text-gray-600 transition-colors hover:text-gray-400 sm:self-auto"
            >
              Powered by NewsAPI
            </a>
          </div>

          {loading && (
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <SkeletonCard large />
                <SkeletonCard large />
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <span className="text-4xl opacity-40">📡</span>
              <p className="text-sm text-gray-500">تعذّر تحميل الأخبار. حاول مجدداً لاحقاً.</p>
            </div>
          )}

          {!loading && !error && articles.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-12 text-center">
              <span className="text-4xl opacity-40">📰</span>
              <p className="text-sm text-gray-500">لا توجد أخبار متاحة حالياً.</p>
            </div>
          )}

          {!loading && !error && articles.length > 0 && (
            <div className="space-y-5">
              {featured.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {featured.map((article, i) => (
                    <FadeIn key={article.url} direction="up" delay={i * 0.1}>
                      <NewsCardLarge article={article} />
                    </FadeIn>
                  ))}
                </div>
              )}

              {rest.length > 0 && (
                <>
                  <div className="card-divider" />
                  <StaggerContainer className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.05}>
                    {rest.map((article) => (
                      <StaggerItem key={article.url}>
                        <NewsCardSmall article={article} />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                </>
              )}
            </div>
          )}
        </div>
      </FadeIn>
    </section>
  );
}
