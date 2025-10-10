'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Advertisement from './Advertisement';
import TradingViewTicker from './TradingViewTicker';
import TradingViewWidget from './TradingViewWidget';

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
    <div className="gradient-card h-full p-7 text-center">
      <div className="mx-auto flex h-48 w-full max-w-xs items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-inner">
        <Image
          src={img}
          alt={title}
          width={320}
          height={220}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-6 text-2xl font-bold text-orange-300">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-gray-300">{description}</p>
      {link && linkText && (
        <div className="mt-6">
          <Link
            href={link}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noopener noreferrer' : undefined}
            className="inline-flex items-center justify-center rounded-full border border-orange-300/30 bg-orange-500/15 px-5 py-2 text-sm font-semibold text-orange-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-orange-500/25"
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

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const target = 700;
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
    <div ref={counterRef} className="gradient-card flex h-full flex-col items-center justify-center gap-4 px-6 py-8 text-center">
      <p className="text-2xl font-semibold text-orange-200">أكثر من</p>
      <p className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-rose-500">
        {count}+
      </p>
      <p className="text-lg font-medium text-gray-200">عميل يثق في أدوات Ezzo الاحترافية</p>
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

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
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
    <div ref={cardRef} className="gradient-card h-full px-6 py-8 text-center">
      <p className="text-4xl font-extrabold text-orange-300">
        {displayValue}
        {suffix}
      </p>
      <p className="mt-3 text-lg font-semibold text-white">{label}</p>
      <p className="mt-3 text-sm leading-7 text-gray-300">{description}</p>
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
    title: 'مؤشر Ezzo اللحظي',
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

const Welcome: React.FC = () => {
  return (
    <div className="relative isolate pb-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
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
            قناة تيليجرام ezzo_trading ↗
          </Link>
          <Link
            href="https://www.snapchat.com/add/ezzo.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-yellow-300/30 bg-yellow-400/10 px-4 py-1 text-yellow-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-yellow-400/20"
          >
            سناب شات Ezzo ↗
          </Link>
        </div>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          تداول الفيوتشر والحسابات الممولة بذكاء مدعوم بالبيانات
        </h1>
        <p className="section-subheading mx-auto max-w-3xl">
          منصة Ezzo تقدّم لك مزيجاً مثالياً من المؤشرات اللحظية والمحتوى التعليمي المتخصص.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            href="#services"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3 text-sm font-semibold text-black shadow-[0_20px_40px_-18px_rgba(251,146,60,0.9)] transition-transform duration-300 hover:-translate-y-1"
          >
            تعرّف على خدماتنا
          </Link>
          <Link
            href="/Support"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-orange-400/40 px-7 py-3 text-sm font-semibold text-orange-200 transition-all duration-300 hover:-translate-y-1 hover:border-orange-300/80 hover:text-orange-100"
          >
            تواصل مع فريقنا
          </Link>
        </div>
      </section>

      <section className="page-shell mt-12">
        <TradingViewTicker />
      </section>

      <section className="page-shell mt-14">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative h-72 overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_30px_80px_-45px_rgba(251,146,60,0.75)] sm:h-[420px]">
            <Image
              src="/img/trading1.webp"
              alt="غرفة تداول متكاملة بإضاءة احترافية"
              fill
              loading="lazy"
              className="object-cover transition-transform duration-[4000ms] ease-out hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
            <div className="absolute bottom-6 left-6 right-6 text-left">
              <span className="rounded-full border border-orange-400/40 bg-orange-500/20 px-3 py-1 text-[10px] font-semibold uppercase tracking-[3px] text-orange-100">
                رحلة تعلّم موجهة
              </span>
              <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">ابدأ ببناء استراتيجيتك بثقة</h3>
              <p className="mt-2 text-sm text-gray-200 sm:text-base">
                دروس تطبيقية، نماذج جاهزة، ومحتوى تفاعلي يهيئك للانضمام إلى دورتنا المتقدمة عندما ترغب بالانتقال للمرحلة التالية، مع بناء معرفة عملية بالتعلم المستمر واختبار السوق قبل خطوات التنفيذ.
              </p>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="relative h-40 overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_20px_50px_-35px_rgba(251,146,60,0.7)] sm:h-48">
              <Image
                src="/img/trading2.webp"
                alt="جلسة متابعة للأسواق مع أداة تتبع الأداء"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-[4000ms] ease-out hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/20 to-transparent" />
              <div className="absolute left-5 top-5 max-w-[220px]">
                <h4 className="text-lg font-semibold text-white">مؤشر Ezzo اللحظي</h4>
                <p className="mt-1 text-xs text-gray-200">
                  مؤشر Ezzo اللحظي يرصد اتجاهات السيولة ويقدّم تنبيهات معدّة مسبقاً لدعم قرارك، بينما تبقى خطوة التنفيذ بين يديك.
                </p>
              </div>
            </div>
            <div className="relative h-40 overflow-hidden rounded-3xl border border-white/10 bg-black/60 shadow-[0_20px_50px_-35px_rgba(251,146,60,0.7)] sm:h-48">
              <Image
                src="/img/trading3.webp"
                alt="خطة تداول مدونة بخط اليد بجوار جهاز لوحي"
                fill
                loading="lazy"
                className="object-cover transition-transform duration-[4000ms] ease-out hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              <div className="absolute left-5 top-5 max-w-[220px]">
                <h4 className="text-lg font-semibold text-white">توازن بين التحليل والالتزام بالخطة</h4>
                <p className="mt-1 text-xs text-gray-200">
                  خطط تداول مختصة بالفيوتشر تضبط رأس المال قبل التنفيذ وتوثق قراراتك لحظة بلحظة.
                </p>
              </div>
            </div>
          </div>
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
            <h2 className="section-heading">خدمات Ezzo الرئيسية</h2>
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
                انضم إلى محترفي Ezzo، واستفد من الأدوات، التدريب، والدعم المخصص.
              </p>
              <div className="flex flex-wrap justify-end gap-4">
                <Link
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-7 py-3 text-sm font-semibold text-black shadow-[0_25px_55px_-25px_rgba(251,146,60,0.95)] transition-transform duration-300 hover:-translate-y-1"
                >
                  اكتشف خدماتنا
                </Link>
                <Link
                  href="/Support"
                  className="inline-flex items-center rounded-full border border-orange-400/30 px-6 py-3 text-sm font-semibold text-orange-100 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-white"
                >
                  طلب استشارة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="section-heading">لوحة تداول لحظية مدعومة ببيانات TradingView</h2>
            <p className="section-subheading mx-auto max-w-3xl">
              راقب حركة مؤشر ناسداك US100 مباشرة داخل منصتنا مع إعدادات مظبوطة للعرض، واستفد من أدواتنا لتحديد مستويات الدخول والخروج.
            </p>
            <Link
              href="#services"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-6 py-2 text-sm font-semibold text-black shadow-[0_20px_45px_-20px_rgba(251,146,60,0.9)] transition-transform duration-300 hover:-translate-y-1"
            >
              اكتشف خدماتنا
            </Link>
          </div>
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/80 p-4 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]">
            <TradingViewWidget />
          </div>
        </div>
      </section>

    </div>
  );
};

export default Welcome;
