'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/animations/MotionComponents';
import FAQs from '@/components/FAQs';

const features = [
  { title: 'تداول آلي ذكي', description: 'بوت باول يعمل على تحليل السوق وإرسال إشارات تداول مبنية على استراتيجيات مدروسة.', icon: '🤖' },
  { title: 'متوافق مع الفيوتشر والحسابات الممولة', description: 'صُمم ليعمل مع منصات الفيوتشر والحسابات الممولة الشهيرة.', icon: '📊' },
  { title: 'تنبيهات فورية', description: 'استقبل إشارات الدخول والخروج عبر التطبيق أو البريد دون تأخير.', icon: '⚡' },
  { title: 'إدارة مخاطر مدمجة', description: 'اقتراحات لحجم الصفقة ووقف الخسارة والأهداف لتحسين نسبة المخاطرة إلى العائد.', icon: '🛡️' },
];

const botLink = 'https://t.me/ezzo_trading';

export default function BotPaulPage() {
  return (
    <div className="relative isolate pb-24 pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[-18%] h-80 w-80 rounded-full bg-orange-500/20 blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-rose-500/18 blur-[190px]" />
      </div>

      <section className="page-shell text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
          أدوات Ezzo للتداول
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
          بوت <span className="ezzo-text">باول</span> – مساعدك في التداول التلقائي
        </h1>
        <p className="section-subheading mx-auto max-w-3xl">
          بوت باول يربط بين استراتيجياتنا الاحترافية والتداول التلقائي، ليمنحك إشارات واضحة وتنفيذًا منظمًا في أسواق الفيوتشر والحسابات الممولة.
        </p>
        <FadeIn direction="up" delay={0.1} className="mt-8">
          <a
            href={botLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-4 text-base font-bold text-black shadow-[0_25px_55px_-25px_rgba(251,146,60,0.95)] transition-transform duration-300 hover:-translate-y-1"
          >
            <span>فتح بوت باول على تيليجرام</span>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </FadeIn>
      </section>

      <section className="page-shell mt-16">
        <FadeIn direction="up" className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/50 lg:order-1">
              <Image alt="بوت باول للتداول" src="/img/ezzoind.webp" fill loading="lazy" className="object-cover" />
            </div>
            <div className="order-1 space-y-6 text-right lg:order-2">
              <h2 className="text-2xl font-bold text-orange-300">ما هو بوت باول؟</h2>
              <p className="text-sm leading-7 text-gray-300 sm:text-base">
                بوت باول أداة تداول آلية تابعة لـ <span className="ezzo-text">Ezzo</span>، مصممة لدعم متداولي الفيوتشر والحسابات الممولة. يعتمد على نفس المنهجية الفنية المستخدمة في استراتيجية ايزو، ويوفر إشارات وتنبيهات يمكنك متابعتها أو ربطها بأدوات تنفيذ حسب رغبتك.
              </p>
              <ul className="list-disc space-y-2 pr-5 text-sm leading-7 text-gray-200">
                <li>إشارات دخول وخروج مبنية على التحليل الفني.</li>
                <li>تنبيهات فورية عبر تيليجرام أو البريد.</li>
                <li>مناسب لمتداولي SPX500 وناسداك والحسابات الممولة.</li>
              </ul>
              <a
                href={botLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/15 px-6 py-3 text-sm font-semibold text-orange-200 transition-all duration-300 hover:bg-orange-500/25 hover:border-orange-300/50"
              >
                الذهاب إلى بوت باول
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="page-shell mt-20">
        <div className="text-center mb-10">
          <h2 className="section-heading">مميزات بوت باول</h2>
          <p className="section-subheading mx-auto max-w-2xl mt-2">أدوات وتنبيهات تساعدك على التداول بانتظام ووضوح.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, idx) => (
            <FadeIn key={feature.title} direction="up" delay={idx * 0.08}>
              <div className="gradient-card group h-full rounded-2xl border border-white/10 p-6 text-right transition-all duration-300 hover:border-orange-400/20">
                <span className="text-3xl" role="img" aria-hidden>{feature.icon}</span>
                <h3 className="mt-4 text-lg font-bold text-orange-300 group-hover:text-orange-200">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">{feature.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10 text-center">
          <h2 className="text-2xl font-bold text-orange-300">أسئلة شائعة – بوت باول</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">إجابات سريعة حول طريقة الاستخدام، الربط بالمنصات، والاشتراك.</p>
          <div className="mt-8 text-right">
            <FAQs />
          </div>
          <div className="mt-8">
            <a
              href={botLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
            >
              فتح بوت باول الآن
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
