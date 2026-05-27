'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { FadeIn, HoverCard, ScaleIn, StaggerContainer, StaggerItem } from './animations/MotionComponents';

// Lazy load heavy components
const Advertisement = dynamic(() => import('./Advertisement'), { ssr: false });
const TradingViewTicker = dynamic(() => import('./TradingViewTicker'), { ssr: false });
const NewsSection = dynamic(() => import('./NewsSection'), { ssr: false });

type ProductCardProps = {
  img: string;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
};

// Beautiful glowing stock sparkline for visual background decoration
const Sparkline: React.FC = () => (
  <svg className="absolute bottom-0 inset-x-0 h-16 w-full opacity-10 pointer-events-none transition-opacity duration-500 group-hover:opacity-20" viewBox="0 0 100 30" preserveAspectRatio="none">
    <defs>
      <linearGradient id="sparkline-grad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M0,25 Q15,10 30,22 T60,5 T90,18 L100,10 L100,30 L0,30 Z" fill="url(#sparkline-grad)" />
    <path d="M0,25 Q15,10 30,22 T60,5 T90,18 L100,10" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ProductCard: React.FC<ProductCardProps> = ({ img, title, description, link, linkText }) => {
  const isExternal = link ? /^https?:\/\//.test(link) : false;

  return (
    <HoverCard className="gradient-card group h-full p-7 text-center relative overflow-hidden flex flex-col justify-between">
      {/* Specular overlay sheen reflection */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none" />
      
      <div>
        <div className="relative z-10 mx-auto flex h-48 w-full max-w-xs items-center justify-center overflow-hidden rounded-2xl border border-white/[0.06] bg-black/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] group-hover:border-orange-500/20 transition-all duration-500">
          <Image
            src={img}
            alt={title}
            width={320}
            height={220}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 320px"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105"
          />
        </div>
        <h3 className="relative z-10 mt-6 text-xl font-bold transition-colors duration-300" style={{ color: '#f0ebe4' }}>{title}</h3>
        <p className="relative z-10 mt-3 text-sm leading-7 font-medium" style={{ color: '#9a8a7e' }}>{description}</p>
      </div>

      {link && linkText && (
        <div className="relative z-10 mt-6">
          <Link
            href={link}
            prefetch={false}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
            style={{ border: '1px solid rgba(212,132,90,0.22)', background: 'rgba(212,132,90,0.08)', color: '#d4845a' }}
          >
            {linkText}
          </Link>
        </div>
      )}
    </HoverCard>
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
    let frameId = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = Math.floor(progress * target);

      setCount((prev) => (prev === nextValue ? prev : nextValue));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasAnimated]);

  return (
    <HoverCard className="gradient-card group flex h-full flex-col items-center justify-center gap-3 px-6 py-10 text-center relative overflow-hidden">
      <div ref={counterRef} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.01]" />
      <p className="text-xl font-bold relative z-10" style={{ color: '#d4845a' }}>أكثر من</p>
      <p className="text-6xl font-black bg-clip-text text-transparent relative z-10" style={{ backgroundImage: 'linear-gradient(135deg, #c9a84c, #d4845a, #e8956a)' }}>
        {count}+
      </p>
      <p className="text-base font-semibold relative z-10" style={{ color: '#b8a89a' }}>عميل يثق في أدوات <span className="ezzo-text">Ezzo</span> الاحترافية</p>
      <Sparkline />
    </HoverCard>
  );
};

type StatItem = {
  value: number;
  suffix?: string;
  label: string;
  description: string;
  description2?: string;
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
    const target = Math.max(value, 0);
    let frameId = 0;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const nextValue = Math.floor(progress * target);

      setDisplayValue((prev) => (prev === nextValue ? prev : nextValue));

      if (progress < 1) {
        frameId = window.requestAnimationFrame(animate);
      }
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, [hasAnimated, value]);

  return (
    <HoverCard className="gradient-card group h-full px-6 py-10 text-center relative overflow-hidden">
      <div ref={cardRef} className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-white/[0.01]" />
      <p className="text-5xl font-black relative z-10 transition-colors duration-300" style={{ color: '#d4845a' }}>
        {displayValue}
        {suffix}
      </p>
      <p className="mt-3 text-lg font-bold relative z-10" style={{ color: '#f0ebe4' }}>{label}</p>
      <p className="mt-3 text-sm leading-7 font-medium relative z-10" style={{ color: '#9a8a7e' }}>{description}</p>
      <Sparkline />
    </HoverCard>
  );
};

const stats: StatItem[] = [
  {
    value: 80,
    suffix: '%',
    label: 'نسبة دقة استراتيجية ايزو',
    description: 'نتائج مثبتة في اختبارات باك-تست حقيقية مع إدارة مخاطر محكمة.',
  },
];

const products: ProductCardProps[] = [
  {
    img: '/img/ezzoind.webp',
    title: 'استراتيجية ايزو',
    description: 'احصل على نقاط دخول وخروج محسوبة مع تنبيهات لحظية لأسواق الفيوتشر والحسابات الممولة.',
    link: '/Indicator',
    linkText: 'استكشف الاستراتيجية',
  },
  {
    img: '/img/trading-analysis.webp',
    title: 'دورة التحليل الفني للفيوتشر',
    description: 'منهج تدريبي متكامل يبدأ من الأساسيات وينتهي بخطط تنفيذ متقدمة تدعمك في كل جلسة تداول.',
    link: '/Coursies',
    linkText: 'تفاصيل الدورة',
  },
  {
    img: '/img/bot.webp',
    title: 'بوت خيارات EZZO SPX BOT',
    description: 'بوت متخصص في عقود خيارات SPX — يرسل إشارات CALL وPUT مع سعر الدخول وهدف الربح مباشرةً.',
    link: '/Options',
    linkText: 'اكتشف البوت',
  },
];

type ShowcaseImage = {
  src: string;
  title: string;
};

const SHOWCASE_IMAGES: ShowcaseImage[] = [
  { src: '/img/trading1.webp', title: 'ابدأ ببناء استراتيجيتك بثقة' },
  { src: '/img/trading3.webp', title: 'توازن بين التحليل والالتزام بالخطة' },
];

const Welcome: React.FC = () => {
  const [showcaseIndex, setShowcaseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowcaseIndex((prev) => (prev + 1) % SHOWCASE_IMAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative isolate pb-10">
      {/* Dynamic background lights */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute -top-40 right-[15%] h-[500px] w-[500px] rounded-full blur-[160px]" style={{ background: 'rgba(212,132,90,0.07)' }} />
        <div className="absolute bottom-[-20%] left-[5%] h-[600px] w-[600px] rounded-full blur-[190px]" style={{ background: 'rgba(201,168,76,0.04)' }} />
      </div>

      <section className="page-shell pt-16 text-center sm:pt-28">
        <StaggerContainer className="flex flex-col items-center">

          {/* Trust badges row */}
          <StaggerItem className="mb-5 flex flex-wrap justify-center gap-3">
            <div className="premium-badge">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: '#c9a84c' }} />
              النسخة الاحترافية 2026
            </div>
            <Link
              href="https://t.me/ezzo_trading"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Join our Telegram channel"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(240,235,228,0.07)', background: 'rgba(240,235,228,0.022)', color: '#9a8a7e' }}
            >
              قناة تيليجرام <span className="ezzo-text">Ezzo</span> ↗
            </Link>
            <Link
              href="https://www.snapchat.com/add/ezzo.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Snapchat"
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold transition-all duration-300 hover:-translate-y-0.5"
              style={{ border: '1px solid rgba(240,235,228,0.07)', background: 'rgba(240,235,228,0.022)', color: '#9a8a7e' }}
            >
              سناب شات <span className="ezzo-text">Ezzo</span> ↗
            </Link>
          </StaggerItem>

          <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center mt-6">
            <StaggerItem>
              <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black mb-7" style={{ letterSpacing: '-0.03em', lineHeight: 1.08, color: '#f0ebe4' }}>
                <span style={{ background: 'linear-gradient(135deg, #f0b07a 0%, #d4845a 50%, #c9a84c 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  تداول بذكاء
                </span>
                <br />
                <span style={{ color: '#f0ebe4' }}>مع أدوات <span className="ezzo-text">Ezzo</span> الاحترافية</span>
              </h1>
            </StaggerItem>

            <StaggerItem>
              <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto font-medium" style={{ lineHeight: 1.85, color: '#9a8a7e' }}>
                نقدم لك أفضل الاستراتيجيات الفنية وأدوات التحليل لمساعدتك في اتخاذ قرارات تداول مدروسة وتحقيق أرباح مستدامة في أسواق المال.
              </p>
            </StaggerItem>

            <StaggerItem>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <a
                  href="#services"
                  className="btn-primary px-9 py-4 text-sm"
                >
                  استكشف منتجاتنا
                </a>
                <a
                  href="/Support"
                  className="btn-ghost px-8 py-4 text-sm"
                >
                  تواصل معنا
                </a>
              </div>
            </StaggerItem>

            {/* Micro trust signal */}
            <StaggerItem className="mt-8">
              <p className="text-[11px] tracking-wide" style={{ color: '#6a5a52' }}>
                أكثر من <span className="font-bold" style={{ color: '#d4845a' }}>800+</span> متداول يثق بأدوات Ezzo · دقة <span className="font-bold" style={{ color: '#d4845a' }}>80%</span> مثبتة بالباك-تست
              </p>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </section>

      <FadeIn direction="up" delay={0.2} className="page-shell mt-14">
        <TradingViewTicker />
      </FadeIn>

      {/* Showcase App Mockup Window */}
      <FadeIn direction="up" delay={0.3} className="page-shell mt-20">
        <div className="relative rounded-[2rem] backdrop-blur-xl overflow-hidden" style={{ border: '1px solid rgba(212,132,90,0.12)', background: 'rgba(17,13,10,0.88)', boxShadow: '0 40px 100px -40px rgba(212,132,90,0.3), 0 0 0 1px rgba(240,235,228,0.025)' }}>
          {/* macOS window title bar */}
          <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(212,132,90,0.08)', background: 'rgba(240,235,228,0.015)' }}>
            <div className="flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: '#6a5a52' }}>Ezzo Trading Terminal</span>
            <div className="w-12" />
          </div>

          <div className="relative aspect-video w-full overflow-hidden bg-black/70 sm:aspect-[21/9]">
            <Image
              src={SHOWCASE_IMAGES[showcaseIndex].src}
              alt={SHOWCASE_IMAGES[showcaseIndex].title}
              fill
              priority={showcaseIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              className="object-cover transition-transform duration-[4500ms] ease-out hover:scale-[1.025]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/15 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-right">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500/70 mb-2">Live Preview</p>
              <h3 className="text-xl font-bold text-white sm:text-2xl" style={{ letterSpacing: '-0.02em' }}>{SHOWCASE_IMAGES[showcaseIndex].title}</h3>
            </div>
          </div>
        </div>
      </FadeIn>

      <Advertisement />

      <section className="page-shell mt-20">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          <FadeIn direction="right" delay={0.1}>
            <AnimatedCounter />
          </FadeIn>
          {stats.map((stat, idx) => (
            <FadeIn key={stat.label} direction="left" delay={0.1 + idx * 0.1}>
              <StatCard {...stat} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="services" className="page-shell mt-28">
        <FadeIn className="glass-panel px-6 py-14 sm:px-12 sm:py-20">
          <div className="text-center mb-14">
            <p className="premium-badge mx-auto mb-5">خدماتنا الاحترافية</p>
            <h2 className="section-heading">خدمات <span className="ezzo-text">Ezzo</span> الرئيسية</h2>
            <p className="section-subheading mx-auto max-w-2xl" style={{ color: '#9a8a7e' }}>
              استراتيجيات لحظية ومسارات تعليمية مصممة لتقوية قراراتك وتطوير تداولك بخطوات واضحة.
            </p>
          </div>
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product, idx) => (
              <ScaleIn key={product.title} delay={idx * 0.1}>
                <ProductCard {...product} />
              </ScaleIn>
            ))}
          </div>
        </FadeIn>
      </section>

      <section className="page-shell mt-28">
        <FadeIn direction="up" className="glass-panel overflow-hidden px-8 py-14 sm:px-14 sm:py-16">
          <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="relative order-2 h-80 w-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-black/50 lg:order-1 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <Image
                alt="ابدأ رحلتك"
                src="/img/money.webp"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-[3000ms] ease-out hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="order-1 space-y-7 text-right lg:order-2">
              <p className="premium-badge">ابدأ رحلتك</p>
              <h2 className="text-3xl font-black sm:text-4xl" style={{ letterSpacing: '-0.03em', lineHeight: 1.15, color: '#f0ebe4' }}>
                ابدأ رحلتك في عالم الفيوتشر<br className="hidden sm:block" /> والحسابات الممولة
              </h2>
              <p className="text-base font-medium" style={{ lineHeight: 1.85, color: '#9a8a7e' }}>
                انضم إلى محترفي <span className="ezzo-text">Ezzo</span>، واستفد من الأدوات، التدريب، والدعم المخصص.
              </p>
              <div className="flex flex-wrap justify-end gap-4 items-center">
                <Link
                  href="#services"
                  prefetch={false}
                  className="btn-primary px-7 py-3.5 text-sm"
                >
                  اكتشف خدماتنا
                </Link>
                <Link
                  href="/Support"
                  prefetch={false}
                  className="btn-ghost px-6 py-3.5 text-sm"
                >
                  طلب استشارة
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <NewsSection />

    </div>
  );
};

export default Welcome;
