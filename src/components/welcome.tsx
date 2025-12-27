'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Lazy load heavy components
const Advertisement = dynamic(() => import('./Advertisement'), { ssr: false });
const TradingViewTicker = dynamic(() => import('./TradingViewTicker'), { ssr: false });
const TradingViewWidget = dynamic(() => import('./TradingViewWidget'), { ssr: false });

type ProductCardProps = {
  img: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
};

const ProductCard: React.FC<ProductCardProps> = ({ img, title, description, link, linkText }) => {
  const isExternal = link ? /^https?:\/\//.test(link) : false;

  return (
    <div className="gradient-card group h-full p-7 text-center relative overflow-hidden">

      <div className="relative z-10 mx-auto flex h-48 w-full max-w-xs items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] group-hover:border-orange-400/30 transition-colors duration-300">
        <Image
          src={img}
          alt={title}
          width={320}
          height={220}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="relative z-10 mt-6 text-2xl font-bold text-orange-300 group-hover:text-orange-200 transition-colors duration-300">{title}</h3>
      <p className="relative z-10 mt-4 text-sm leading-7 text-gray-300">{description}</p>
      {link && linkText && (
        <div className="relative z-10 mt-6">
          <Link
            href={link}
            prefetch={false}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center rounded-full border border-orange-300/30 bg-orange-500/15 px-5 py-2 text-sm font-semibold text-orange-200 transition-all duration-300 hover:-translate-y-1 hover:bg-orange-500/30 hover:border-orange-300/50 hover:shadow-[0_10px_25px_-10px_rgba(251,146,60,0.6)] active:scale-95"
          >
            {linkText}
          </Link>
        </div>
      )}
    </div>
  );
};

const AnimatedCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = counterRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const target = 800;
    const duration = 2000;
    const intervalTime = duration / target;
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev < target) {
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, Math.max(intervalTime, 1));

    return () => clearInterval(timer);
  }, [hasAnimated]);

  return (
    <div ref={counterRef} className="gradient-card group flex h-full flex-col items-center justify-center gap-4 px-6 py-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
      <p className="text-2xl font-semibold text-orange-200 relative z-10">أكثر من</p>
      <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500 relative z-10 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]">
        {count}+
      </p>
      <p className="text-lg font-medium text-gray-200 relative z-10">عميل يثق في أدوات <span className="ezzo-text">Ezzo</span> الاحترافية</p>
    </div>
  );
};

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
};

const StatCard: React.FC<StatItem> = ({ value, suffix = '', label, description }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = cardRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const duration = 1200;
    const safeValue = Math.max(value, 1);
    const intervalTime = Math.max(Math.floor(duration / safeValue), 16);
    const timer = setInterval(() => {
      setDisplayValue((prev) => {
        if (prev < value) {
          return prev + 1;
        }
        clearInterval(timer);
        return value;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [hasAnimated, value]);

  return (
    <div ref={cardRef} className="gradient-card group h-full px-6 py-8 text-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
      <p className="text-4xl font-extrabold text-orange-300 relative z-10 group-hover:text-orange-200 transition-colors duration-300 drop-shadow-[0_0_10px_rgba(251,146,60,0.4)]">
        {displayValue}
        {suffix}
      </p>
      <p className="mt-3 text-lg font-semibold text-white relative z-10">{label}</p>
      <p className="mt-3 text-sm leading-7 text-gray-300 relative z-10">{description}</p>
    </div>
  );
};

const stats: StatItem[] = [
  {
    value: 80,
    suffix: '%',
    label: 'نسبة دقة المؤشر البرو',
    description: 'نتائج مثبتة في اختبارات باك-تست حقيقية مع إدارة مخاطر محكمة.',
  },
];

const products: ProductCardProps[] = [
  {
    img: '/img/ezzoind.webp',
    title: 'مؤشر <span className="ezzo-text">Ezzo</span> اللحظي',
    description: 'احصل على نقاط دخول وخروج محسوبة مع تنبيهات لحظية لأسواق الفيوتشر والحسابات الممولة.',
    link: '/Indicator',
    linkText: 'استكشف المؤشر',
  },
  {
    img: '/img/trading-analysis.webp',
    title: 'دورة التحليل الفني للفيوتشر',
    description: 'منهج تدريبي متكامل يبدأ من الأساسيات وينتهي بخطط تنفيذ متقدمة تدعمك في كل جلسة تداول.',
    link: '/Coursies',
    linkText: 'تفاصيل الدورة',
  },
];

type ShowcaseImage = {
  src: string;
  title: string;
};

const SHOWCASE_IMAGES: ShowcaseImage[] = [
  { src: '/img/trading1.webp', title: 'ابدأ ببناء استراتيجيتك بثقة' },
  { src: '/img/trading2.webp', title: 'مؤشر <span className="ezzo-text">Ezzo</span> اللحظي' },
  { src: '/img/trading3.webp', title: 'توازن بين التحليل والالتزام بالخطة' },
];

type WelcomeProps = {
  heroImageSlot?: React.ReactNode;
};

const Welcome: React.FC<WelcomeProps> = ({ heroImageSlot }) => {
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  //  
  return (
    <div className="relative isolate pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute -top-40 right-[20%] h-96 w-96 rounded-full bg-orange-500/25 blur-[160px]" />
        <div className="absolute bottom-[-30%] left-[10%] h-[420px] w-[420px] rounded-full bg-rose-500/20 blur-[180px]" />
      </div>

      <section className="page-shell pt-16 text-center sm:pt-24">
        <div className="flex flex-wrap justify-center gap-3 text-[11px] text-orange-100 sm:text-xs">
          <Link
            href="https://t.me/ezzo_trading"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-4 py-1 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500/25"
          >
            قناة تيليجرام <span className="ezzo-text">Ezzo</span>_trading ↗
          </Link>
          <Link
            href="https://www.snapchat.com/add/ezzo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-400/10 px-4 py-1 text-yellow-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400/20"
          >
            سناب شات <span className="ezzo-text">Ezzo</span> ↗
          </Link>
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-500 to-red-500">
              تداول بذكاء
            </span>
            <br />
            <span className="text-gray-200">مع أدوات <span className="ezzo-text">Ezzo</span> الاحترافية</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in-up delay-100">
            نقدم لك أفضل المؤشرات الفنية وأدوات التحليل لمساعدتك في اتخاذ قرارات تداول مدروسة وتحقيق أرباح مستدامة في أسواق المال.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-200">
            <a
              href="#products"
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              استكشف منتجاتنا
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white rounded-full font-bold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>

      <section className="page-shell mt-12">
        <TradingViewTicker />
      </section>

      <section className="page-shell mt-14">
        <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_30px_80px_-45px_rgba(251,146,60,0.75)] sm:aspect-[21/9]">
          {/* Render Server Component for LCP (first image) */}
          {showcaseIndex === 0 && heroImageSlot ? (
            heroImageSlot
          ) : (
            <>
              <Image
                src={SHOWCASE_IMAGES[showcaseIndex].src}
                alt={SHOWCASE_IMAGES[showcaseIndex].title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
                priority
                loading="eager"
                className="object-cover transition-transform duration-[4000ms] ease-out hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
              <div className="absolute bottom-6 left-6 right-6 text-left">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">{SHOWCASE_IMAGES[showcaseIndex].title}</h3>
              </div>
            </>
          )}
        </div>
      </section>

      <Advertisement />

      <section className="page-shell mt-16">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <AnimatedCounter />
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </section>

      <section id="services" className="page-shell mt-20">
        <div className="glass-panel px-4 py-8 sm:px-8 sm:py-12">
          <div className="text-center">
            <h2 className="section-heading">خدمات <span className="ezzo-text">Ezzo</span> الرئيسية</h2>
            <p className="section-subheading mx-auto max-w-3xl">
              اكتشف مؤشراتنا اللحظية ومساراتنا التعليمية المصممة لتقوية قراراتك وتطوير تداولك بخطوات واضحة.
            </p>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="relative order-2 h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/50 lg:order-1">
              <Image
                alt="ابدأ رحلتك"
                src="/img/money.webp"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="order-1 space-y-6 text-right lg:order-2">
              <span className="inline-flex items-center justify-center rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[3px] text-orange-100">
                ابدأ رحلتك
              </span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                ابدأ رحلتك في عالم الفيوتشر والحسابات الممولة
              </h2>
              <p className="text-sm leading-7 text-gray-300 sm:text-base">
                انضم إلى محترفي <span className="ezzo-text">Ezzo</span>، واستفد من الأدوات، التدريب، والدعم المخصص.
              </p>
              <div className="flex flex-wrap justify-end gap-4">
                <Link
                  href="#services"
                  prefetch={false}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-7 py-3 text-sm font-semibold text-black shadow-[0_25px_55px_-25px_rgba(251,146,60,0.95)] transition-transform duration-300 hover:-translate-y-1"
                >
                  اكتشف خدماتنا
                </Link>
                <Link
                  href="/Support"
                  prefetch={false}
                  className="inline-flex items-center rounded-full border border-orange-400/30 px-6 py-3 text-sm font-semibold text-orange-100 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-white"
                >
                  طلب استشارة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
};

export default Welcome;
