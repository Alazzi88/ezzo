'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FadeIn } from '@/components/animations/MotionComponents';

const benefits = [
  { title: 'المرونة في التنفيذ', description: 'يمكنك ممارسة الخيار في أي وقت قبل انتهاء الصلاحية، مما يتيح لك تأمين الأرباح أو تقليل الخسائر مبكراً.' },
  { title: 'إدارة مخاطر أوضح', description: 'مع الخيار الأمريكي تعرف مسبقاً أقصى خسارة (قسط الخيار) وتستطيع الخروج عند تحقق هدفك.' },
  { title: 'مناسب للمضاربة والتحوط', description: 'يُستخدم في المضاربة على تحركات السعر أو التحوط ضد مراكزك في الأسهم والفيوتشر.' },
  { title: 'تنوع الاستراتيجيات', description: 'يدعم استراتيجيات متقدمة مثل السبريد، الستردل، والك버د كول/بوت حسب توقعاتك للسوق.' },
];

const comparisonItems = [
  { feature: 'وقت الممارسة', american: 'أي وقت حتى انتهاء الصلاحية', european: 'فقط عند انتهاء الصلاحية' },
  { feature: 'المرونة', american: 'أعلى', european: 'أقل' },
  { feature: 'القسط (السعر)', american: 'عادة أعلى قليلاً', european: 'عادة أقل' },
];

export default function AmericanOptionPage() {
  return (
    <div className="relative isolate pb-24 pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[-18%] h-80 w-80 rounded-full bg-amber-500/20 blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-orange-500/18 blur-[190px]" />
      </div>

      <section className="page-shell text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-amber-100">
          تعليمات التداول
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
          الأوبشن <span className="ezzo-text">الأمريكي</span>
        </h1>
        <p className="section-subheading mx-auto max-w-3xl">
          تعرّف على الخيارات الأمريكية، الفرق بينها وبين الخيار الأوروبي، وكيفية استخدامها في التحوط والمضاربة ضمن استراتيجياتك.
        </p>
      </section>

      <section className="page-shell mt-16">
        <FadeIn direction="up" className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="relative order-2 h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/50 lg:order-1">
              <Image alt="الأوبشن الأمريكي" src="/img/trading-analysis.webp" fill loading="lazy" className="object-cover" />
            </div>
            <div className="order-1 space-y-6 text-right lg:order-2">
              <h2 className="text-2xl font-bold text-amber-300">ما هو الأوبشن الأمريكي؟</h2>
              <p className="text-sm leading-7 text-gray-300 sm:text-base">
                <strong className="text-white">الخيار الأمريكي (American Option)</strong> هو عقد يمنح حامله الحق – وليس الالتزام – في شراء (كول) أو بيع (بوت) أصل معين بسعر تنفيذ محدد، ويمكن <strong className="text-amber-200/90">ممارسة هذا الحق في أي وقت</strong> حتى تاريخ انتهاء الصلاحية. هذا يختلف عن الخيار الأوروبي الذي لا يُمارس إلا عند انتهاء الصلاحية فقط.
              </p>
              <p className="text-sm leading-7 text-gray-300">
                كثير من خيارات الأسهم المتداولة في البورصات الأمريكية هي خيارات أمريكية، وتُستخدم في التحوط والمضاربة وإدارة المخاطر.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="page-shell mt-20">
        <div className="text-center mb-10">
          <h2 className="section-heading">لماذا الأوبشن الأمريكي؟</h2>
          <p className="section-subheading mx-auto max-w-2xl mt-2">مزايا تهم المتداول والمستثمر في الخيارات.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {benefits.map((item, idx) => (
            <FadeIn key={item.title} direction="up" delay={idx * 0.08}>
              <div className="gradient-card group h-full rounded-2xl border border-white/10 p-6 text-right transition-all duration-300 hover:border-amber-400/20">
                <h3 className="text-lg font-bold text-amber-300 group-hover:text-amber-200">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="page-shell mt-20">
        <FadeIn direction="up" className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-bold text-amber-300 text-center mb-8">الأمريكي مقابل الأوروبي</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[320px] text-right">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-4 py-3 text-sm font-semibold text-amber-200">الميزة</th>
                  <th className="px-4 py-3 text-sm font-semibold text-amber-200">الأوبشن الأمريكي</th>
                  <th className="px-4 py-3 text-sm font-semibold text-gray-300">الأوبشن الأوروبي</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((row, i) => (
                  <tr key={row.feature} className={i < comparisonItems.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="px-4 py-3 text-sm font-medium text-white">{row.feature}</td>
                    <td className="px-4 py-3 text-sm text-amber-100/90">{row.american}</td>
                    <td className="px-4 py-3 text-sm text-gray-300">{row.european}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      <section className="page-shell mt-20">
        <FadeIn direction="up" className="glass-panel overflow-hidden px-6 py-10 sm:px-10 text-center">
          <h2 className="text-2xl font-bold text-amber-300">ربط الخيارات باستراتيجيتك</h2>
          <p className="mt-4 text-sm leading-7 text-gray-300 max-w-2xl mx-auto">
            في <span className="ezzo-text">Ezzo</span> نركّز على الفيوتشر والحسابات الممولة، لكن فهم الخيارات الأمريكية يساعدك على قراءة السوق بشكل أوسع. يمكنك دمج هذه المعرفة مع استراتيجية ايزو وبوت باول لاتخاذ قرارات أوضح.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/Indicator" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5">
              استراتيجية ايزو
            </Link>
            <Link href="/BotPaul" className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/15 px-6 py-3 text-sm font-semibold text-amber-200 transition-all hover:bg-amber-500/25">
              بوت باول
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
