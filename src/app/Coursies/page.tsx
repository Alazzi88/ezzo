import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';

export const metadata: Metadata = {
  title: 'دورة التحليل الفني للفيوتشر | تعلم التداول مع Ezzo',
  description:
    'دورة تداول متكاملة من فريق Ezzo — تبدأ من قراءة حركة السعر ومناطق العرض والطلب، وصولاً لاجتياز اختبارات الحسابات الممولة بثقة. منهج ICT تطبيقي بالكامل.',
  keywords: [
    'دورة تداول', 'دورة تحليل فني', 'تعلم الفيوتشر', 'حسابات ممولة',
    'ICT course', 'تعلم التداول', 'دورة Ezzo', 'تحليل فني عربي',
    'تداول SPX', 'دورة فيوتشر', 'Funded accounts course', 'prop firm training',
    'استراتيجية ايزو دورة', 'تداول احترافي',
  ],
  alternates: { canonical: 'https://3zzo.com/Coursies' },
  openGraph: {
    title: 'دورة التحليل الفني للفيوتشر | Ezzo',
    description: 'منهج تدريبي متكامل يبدأ من الأساسيات وينتهي باجتياز اختبارات الحسابات الممولة.',
    url: 'https://3zzo.com/Coursies',
    images: [{ url: 'https://3zzo.com/img/cource.webp', width: 1200, height: 630 }],
  },
};

const courseModules = [
  { num: '01', title: 'مقدمة في أسواق الفيوتشر والحسابات الممولة', desc: 'مدخل شامل لآلية عمل شركات التمويل والقوانين الأساسية لإدارتها والنجاح بها.' },
  { num: '02', title: 'قراءة حركة السعر باستخدام التحليل الفني', desc: 'فهم السلوك السعري المباشر وتحديد الاتجاهات دون مؤشرات متأخرة وبدقة عالية.' },
  { num: '03', title: 'رسم مناطق العرض والطلب ومستويات السيولة', desc: 'تحديد مستويات دخول وخروج صناع السوق والمؤسسات المالية الكبرى وتفسير تحركها.' },
  { num: '04', title: 'استراتيجية Ezzo للدخول والخروج مع إدارة المخاطر', desc: 'تطبيق قواعد صارمة لإدارة رأس المال وتحديد نقاط وقف الخسارة وأهداف الأرباح المثالية.' },
  { num: '05', title: 'تطبيق عملي على منصة TradingView وتنبيهات تلجرام', desc: 'إعداد منصتك الاحترافية وتخصيص المؤشرات وتلقي إشعارات الفرص الحية.' },
  { num: '06', title: 'خطوات اجتياز اختبارات الحسابات الممولة بثقة', desc: 'دليل شامل لتجاوز شروط شركات التمويل والتحكم النفسي خلال تقييمات التداول.' },
];

export default function CourseList() {
  return (
    <div className="relative isolate pb-24 pt-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[15%] top-[-10%] h-96 w-96 rounded-full bg-orange-500/15 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[12%] h-[360px] w-[360px] rounded-full bg-amber-400/10 blur-[150px]" />
      </div>

      {/* Hero section */}
      <section className="page-shell text-center">
        <FadeIn direction="up">
          <span className="inline-flex items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-300">
            برنامج تدريبي واحد شامل
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">
            دورة التحليل الفني والفيوتشر
          </h1>
          <p className="section-subheading mx-auto max-w-3xl text-gray-400 mt-4 leading-8">
            منهج متكامل يربط بين الأساسيات والتطبيق العملي على أسواق الفيوتشر والحسابات الممولة مع أدوات Ezzo الاحترافية.
          </p>
        </FadeIn>
      </section>

      {/* Main Section */}
      <section className="page-shell mt-12">
        <div className="glass-panel overflow-hidden p-6 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            
            {/* Left Column: Image with premium frame */}
            <FadeIn direction="right" className="lg:sticky lg:top-28">
              <div className="gradient-card overflow-hidden shadow-[0_20px_50px_rgba(249,115,22,0.15)] border-white/[0.08]">
                {/* macOS style Window Title Bar */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                  <div className="flex gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] opacity-80" />
                  </div>
                  <span className="text-[11px] font-bold text-gray-400">Course Materials Preview</span>
                  <div className="w-10" />
                </div>
                <div className="relative h-64 w-full sm:h-80 lg:h-[400px]">
                  <Image
                    src="/img/cource.webp"
                    alt="دورة التحليل الفني والفيوتشر"
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-6 right-6 left-6 text-right">
                    <span className="rounded-full bg-orange-500/20 border border-orange-500/30 px-3 py-1 text-xs font-bold text-orange-300">
                      متاح للاشتراك المباشر
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Right Column: Descriptions and modules list */}
            <div className="flex flex-col gap-8 text-right">
              <FadeIn direction="left">
                <span className="text-xs font-semibold uppercase tracking-[3px] text-orange-400">
                  تحليل فني + تطبيق عملي
                </span>
                <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                  تجربة تعليمية متكاملة من فريق Ezzo
                </h2>
                <p className="mt-4 text-sm leading-8 text-gray-300">
                  تم تصميم هذه الدورة لتمنحك منهجاً واضح المعالم في قراءة السوق والتعامل مع الحسابات الممولة. سنبدأ من فهم البنية السعريّة للأسواق، مروراً برسم مناطق العرض والطلب، وانتهاءً بخطط دخول وخروج مدروسة.
                </p>
              </FadeIn>

              {/* Modules Roadmap */}
              <div className="space-y-4">
                <FadeIn direction="up">
                  <h3 className="text-xl font-bold text-orange-300">محتويات الدورة (Roadmap)</h3>
                  <p className="mt-2 text-xs leading-7 text-gray-400">
                    وحدات تدريبية متسلسلة تساعدك على الانتقال من الجانب النظري إلى التطبيق العملي بثقة:
                  </p>
                </FadeIn>

                <StaggerContainer className="grid gap-4 mt-4" staggerChildren={0.05}>
                  {courseModules.map((module) => (
                    <StaggerItem key={module.num}>
                      <div className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.04]">
                        <div className="flex items-start gap-4 flex-row-reverse text-right">
                          {/* Step Number Badge */}
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-black flex-shrink-0">
                            {module.num}
                          </div>
                          {/* Module details */}
                          <div className="flex-1 space-y-1">
                            <h4 className="text-sm font-bold text-white leading-normal">{module.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{module.desc}</p>
                          </div>
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>

              {/* Course CTA */}
              <ScaleIn className="flex flex-col items-stretch sm:items-end gap-3 mt-4">
                <a
                  href="https://t.me/ezzo_course"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3.5 font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.8)]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  انضم لقناة الدورة على تيليجرام
                </a>
              </ScaleIn>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
