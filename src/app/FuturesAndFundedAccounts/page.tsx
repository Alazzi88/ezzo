import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';
import { CompanyCard } from './CompanyCard';
import { Simulator } from './Simulator';
import { RecommendationWizard } from './RecommendationWizard';
import { futuresCompanies as companies } from '@/data/futuresCompanies';

export const metadata: Metadata = {
  title: 'الفيوتشر والحسابات الممولة | مقارنة 15 شركة تمويل عالمية',
  description:
    'اجتز اختبار التقييم واحصل على رأس مال يصل إلى 1.5M$ مع نسبة أرباح تصل لـ 90%. مقارنة تفصيلية لـ 15 شركة حسابات ممولة تشمل السعر، وقف الخسارة، عدد العقود، شرط الاتساق، ومدة السحب: Topstep, AquaFuture, Earn2Trade, FundedNext, E8 Markets, Alpha Futures, Tradeify, My Funded Futures, Blue Guardian, Futures Elite, Funded Futures Family, The Trading Pit, Hola Prime, TradeDay, FunderPro.',
  keywords: [
    'حسابات ممولة', 'فيوتشر', 'Topstep', 'AquaFuture', 'Earn2Trade', 'FundedNext', 'E8 Markets',
    'Alpha Futures', 'Tradeify', 'My Funded Futures', 'Blue Guardian', 'Futures Elite',
    'prop firm', 'اختبار حسابات ممولة', 'تداول فيوتشر ممول', 'funded trading account',
    'futures prop firm', 'best prop firm Arabic', 'حساب ممول فيوتشر', 'وقف الخسارة',
    'اجتياز اختبار prop firm', 'نسبة أرباح 90%', 'شرط الاتساق', 'عدد العقود',
  ],
  alternates: { canonical: 'https://3zzo.com/FuturesAndFundedAccounts' },
  openGraph: {
    title: 'الفيوتشر والحسابات الممولة | Ezzo',
    description: 'ابدأ بحساب ممول دون مخاطرة بأموالك — مقارنة تفصيلية لأفضل 15 شركة prop firm للفيوتشر.',
    url: 'https://3zzo.com/FuturesAndFundedAccounts',
    images: [{ url: 'https://3zzo.com/img/funded.webp', width: 1200, height: 630 }],
  },
};

const BOT_LINK = 'https://t.me/ezzo3zzo3';


const successTips = [
  { icon: '📋', text: 'التزم بخطة تداول مكتوبة وحدود خسارة يومية واضحة.' },
  { icon: '⚖️', text: 'لا تخاطر بأكثر من 1–2% من رأس المال في الصفقة الواحدة.' },
  { icon: '🛑', text: 'استخدم أوامر وقف الخسارة دائماً وتجنب ملاحقة السوق.' },
  { icon: '📈', text: 'وثّق أداءك أسبوعياً لتعديل حجم العقود وفق النتائج الفعلية.' },
];

export default function FuturesAndFundedAccountsPage() {
  return (
    <div className="relative isolate pb-16">
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute -top-32 right-[20%] h-96 w-96 rounded-full bg-orange-500/20 blur-[130px]" />
        <div className="absolute top-1/2 left-[5%] h-72 w-72 rounded-full bg-amber-500/15 blur-[100px]" />
      </div>

      <div className="page-shell">

        {/* ── Hero ───────────────────────────────────────────── */}
        <FadeIn direction="up">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
              الفيوتشر والحسابات الممولة
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              ابدأ بحساب{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                ممول
              </span>
              <br />
              دون مخاطرة بأموالك
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              اجتز اختبار التقييم واحصل على رأس مال يصل إلى{' '}
              <span className="font-bold text-orange-300">1.5M$</span>{' '}
              مع نسبة أرباح تصل لـ 90%.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { value: '80–90%', label: 'نسبة الأرباح' },
                { value: '15', label: 'شركة موثوقة' },
                { value: '1.5M$', label: 'أقصى تمويل' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3"
                >
                  <span className="text-2xl font-extrabold text-orange-300">{stat.value}</span>
                  <span className="mt-0.5 text-xs text-gray-400">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Recommendation Wizard ────────────────────────────── */}
        <FadeIn direction="up" delay={0.07}>
          <RecommendationWizard />
        </FadeIn>

        {/* ── Companies Grid ─────────────────────────── */}
        <FadeIn direction="up" delay={0.1}>
          <div className="mb-10">
            <div className="mb-7 text-center">
              <h2 className="section-heading mb-2">شركات الحسابات الممولة</h2>
              <p className="section-subheading mx-auto max-w-2xl">
                مقارنة تفصيلية حية لكل شركة: تقاسم الأرباح، وقف الخسارة، شرط الاتساق، أيام التداول الدنيا، مدة السحب، رسوم التفعيل، وأقصى مبلغ سحب — وكل الخطط والأسعار.
              </p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-[10.5px] text-gray-600">
                <span className="flex items-center gap-1"><span>💰</span> تقاسم الأرباح</span>
                <span className="flex items-center gap-1"><span>📉</span> وقف الخسارة</span>
                <span className="flex items-center gap-1"><span>⚖️</span> شرط الاتساق</span>
                <span className="flex items-center gap-1"><span>📅</span> أيام التداول</span>
                <span className="flex items-center gap-1"><span>💸</span> مدة السحب</span>
                <span className="flex items-center gap-1"><span>🔓</span> رسوم التفعيل</span>
                <span className="flex items-center gap-1"><span>🏦</span> أقصى سحب</span>
              </div>
            </div>
            <StaggerContainer className="grid grid-cols-1 gap-4 lg:grid-cols-2" staggerChildren={0.05}>
              {companies.map((company) => (
                <StaggerItem key={company.name}>
                  <CompanyCard company={company} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* ── Simulator (placed below the funded companies list) ── */}
        <FadeIn direction="up" delay={0.12}>
          <Simulator />
        </FadeIn>

        {/* ── Success Tips ────────────────────────────────── */}
        <FadeIn direction="up" delay={0.15}>
          <div className="glass-panel mb-10 px-6 py-8 sm:px-10">
            <h2 className="section-heading mb-6 text-center">4 نصائح للنجاح</h2>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2" staggerChildren={0.07}>
              {successTips.map((tip) => (
                <StaggerItem key={tip.text}>
                  <div className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/3 px-5 py-4">
                    <span className="text-2xl flex-shrink-0">{tip.icon}</span>
                    <p className="text-sm leading-7 text-gray-300">{tip.text}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* ── Free Consultation CTA ────────────────────────── */}
        <ScaleIn delay={0.2}>
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-black/60 to-amber-500/10 px-6 py-10 text-center">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-12 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-500/20 blur-[60px]" />
            </div>

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 px-4 py-1.5 text-xs font-semibold text-green-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
              استشارة مجانية
            </div>

            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              هل جربت إحدى هذه الشركات؟
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-400">
              شاركنا تجربتك واحصل على استشارة مجانية من فريق Ezzo لمساعدتك في اختيار الحساب المناسب وبناء خطة تداول واضحة.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-4">
              <a
                href={BOT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3.5 font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.8)] transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                تواصل مباشرة على تيليجرام
              </a>
              <Link
                href="/Support"
                prefetch={false}
                className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 font-semibold text-gray-200 transition-all duration-300 hover:border-orange-400/40 hover:text-white"
              >
                صفحة الدعم
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-gray-600">
              ⚠️ تداول الفيوتشر ينطوي على مخاطر. لا تستثمر ما لا تستطيع تحمّل خسارته.
            </p>
          </div>
        </ScaleIn>

      </div>
    </div>
  );
}
