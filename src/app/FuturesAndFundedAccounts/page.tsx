import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';
import { CompanyCard } from './CompanyCard';
import type { Company } from './CompanyCard';

export const metadata: Metadata = {
  title: 'الفيوتشر والحسابات الممولة | Topstep, AquaFuture, Earn2Trade, FundedNext, E8 Markets',
  description:
    'اجتز اختبار التقييم واحصل على رأس مال يصل إلى 400K$ مع نسبة أرباح تصل لـ 90%. مقارنة شاملة لأفضل شركات الحسابات الممولة: Topstep, AquaFuture, Earn2Trade, FundedNext, E8 Markets.',
  keywords: [
    'حسابات ممولة', 'فيوتشر', 'Topstep', 'AquaFuture', 'Earn2Trade', 'FundedNext', 'E8 Markets',
    'prop firm', 'اختبار حسابات ممولة', 'تداول فيوتشر ممول', 'funded trading account',
    'futures prop firm', 'best prop firm Arabic', 'حساب ممول فيوتشر',
    'اجتياز اختبار prop firm', 'نسبة أرباح 90%',
  ],
  alternates: { canonical: 'https://3zzo.com/FuturesAndFundedAccounts' },
  openGraph: {
    title: 'الفيوتشر والحسابات الممولة | Ezzo',
    description: 'ابدأ بحساب ممول دون مخاطرة بأموالك — مقارنة أفضل 5 شركات prop firm للفيوتشر.',
    url: 'https://3zzo.com/FuturesAndFundedAccounts',
    images: [{ url: 'https://3zzo.com/img/funded.webp', width: 1200, height: 630 }],
  },
};

const BOT_LINK = 'https://t.me/ezzo3zzo3';

const companies: Company[] = [
  {
    name: 'Topstep',
    logo: '/img/topstep.webp',
    url: 'https://www.topstep.com/',
    keyStats: ['نسبة الأرباح 80–90%', 'Trailing Drawdown', 'اشتراك شهري'],
    plans: [
      { name: '50K', price: '$49/شهر', profit: 'هدف $3,000' },
      { name: '100K', price: '$99/شهر', profit: 'هدف $6,000' },
      { name: '150K', price: '$149/شهر', profit: 'هدف $9,000' },
    ],
    summary:
      'تقييم Trading Combine® بمرحلة واحدة مع حد خسارة متحرك. التداول في 5 أيام كحد أدنى قبل الترقية.',
  },
  {
    name: 'AquaFuture',
    logo: '/img/aqua.webp',
    url: 'https://www.aquafuture.com/',
    keyStats: ['نسبة الأرباح 80–90%', 'حد اتساق 45%', 'خيارات شهرية أو لمرة واحدة'],
    plans: [
      { name: 'Beginner 25K', price: '$45/شهر', profit: 'هدف $1,500' },
      { name: 'Advanced 50K', price: '$95 (مرة واحدة)', profit: 'هدف $3,000' },
    ],
    summary:
      'مسارات تمويل مرنة للمبتدئين والمحترفين. حسابات Beginner تشترط 5 أيام تداول، بينما Advanced بلا حد أدنى للأيام.',
  },
  {
    name: 'Earn2Trade',
    logo: '/img/earn2trade.webp',
    url: 'https://www.earn2trade.com/?a_pid=ezzo',
    keyStats: ['نسبة الأرباح 80%+', 'ترقية حتى $400K', 'إعادة تعيين مجانية'],
    plans: [
      { name: 'TCP25', price: '$60/شهر', profit: 'هدف $1,750' },
      { name: 'TCP50', price: '$76/شهر', profit: 'هدف $3,000' },
      { name: 'TCP100', price: '$140/شهر', profit: 'هدف $6,000' },
    ],
    summary:
      'مسار وظيفي واضح من 25K وصولاً لـ 400K. يشترط 10 أيام تداول والالتزام بسلّم العقود.',
  },
  {
    name: 'FundedNext',
    logo: '/img/fundednext.webp',
    url: 'https://fundednext.com/',
    keyStats: ['نسبة الأرباح 80%+', 'بدون حد خسارة يومي', 'مرحلة واحدة فقط'],
    plans: [
      { name: '25K', price: '$99.99 (مرة واحدة)', profit: 'هدف $1,500' },
      { name: '50K', price: '$149.99 (مرة واحدة)', profit: 'هدف $3,000' },
      { name: '100K', price: '$249.99 (مرة واحدة)', profit: 'هدف $5,000' },
    ],
    summary:
      'تحدي Rapid Challenge يمكن اجتيازه في يوم واحد. لا يوجد حد خسارة يومي — فقط حد إجمالي.',
  },
  {
    name: 'E8 Markets',
    logo: '/img/e8.webp',
    url: 'https://e8markets.com/',
    keyStats: ['نسبة الأرباح 80%', 'سحب أسبوعي', 'مرحلة واحدة'],
    plans: [
      { name: '50K', price: '$88 (مرة واحدة)', profit: 'هدف $3,000 (6%)' },
      { name: '100K', price: '$149 (مرة واحدة)', profit: 'هدف $6,000 (6%)' },
      { name: '150K', price: '$198 (مرة واحدة)', profit: 'هدف $9,000 (6%)' },
    ],
    summary:
      'تقييم E8 Signature بمرحلة واحدة. سحوبات أسبوعية بعد الترقية. لا يُسمح بالاحتفاظ الليلي أو خلال عطلة نهاية الأسبوع.',
  },
];

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
              <span className="font-bold text-orange-300">400K$</span>{' '}
              مع نسبة أرباح تصل لـ 90%.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {[
                { value: '80–90%', label: 'نسبة الأرباح' },
                { value: '5', label: 'شركات موثوقة' },
                { value: '400K$', label: 'أقصى تمويل' },
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

        {/* ── Companies Accordion ─────────────────────────── */}
        <FadeIn direction="up" delay={0.1}>
          <div className="glass-panel mb-10 px-6 py-8 sm:px-10">
            <h2 className="section-heading mb-2 text-center">شركات الحسابات الممولة</h2>
            <p className="section-subheading mb-6 text-center">
              اضغط على أي شركة لرؤية الخطط والتفاصيل.
            </p>
            <div className="space-y-3">
              {companies.map((company) => (
                <CompanyCard key={company.name} company={company} />
              ))}
            </div>
          </div>
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
