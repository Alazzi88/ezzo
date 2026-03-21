import type { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem, HoverCard } from '@/components/animations/MotionComponents';

export const metadata: Metadata = {
  title: 'EZZO SPX BOT | إشارات عقود خيارات SPX على تيليجرام',
  description:
    'بوت EZZO SPX BOT يرصد مؤشر S&P 500 ويرسل إشارات CALL وPUT مع سعر الدخول والهدف مباشرةً على تيليجرام. تعلم أساسيات عقود الخيارات وابدأ التداول بثقة.',
  keywords: [
    'EZZO SPX BOT', 'بوت الخيارات', 'عقود خيارات SPX', 'إشارات خيارات',
    'SPX options bot', 'اشارات تداول', 'S&P 500 options', 'CALL PUT signals',
    'تيليجرام تداول', 'بوت تيليجرام تداول', 'خيارات SPX', 'عقود مشتقة',
    'تداول الخيارات', 'Options trading Arabic', 'Ezzo options',
  ],
  alternates: { canonical: 'https://3zzo.com/Options' },
  openGraph: {
    title: 'EZZO SPX BOT | إشارات عقود خيارات S&P 500',
    description: 'إشارات CALL وPUT على SPX مباشرةً على تيليجرام — مع سعر الدخول والهدف وتحليل فني واضح.',
    url: 'https://3zzo.com/Options',
    images: [{ url: 'https://3zzo.com/img/spx.webp', width: 1200, height: 630 }],
  },
};

const BOT_LINK = 'https://t.me/ezzospxbot';

// ─── Feature Card ─────────────────────────────────────────────────────────────

function FeatureCard({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <HoverCard className="gradient-card h-full px-6 py-7 text-center">
      <div className="mb-4 flex justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-400/20 text-3xl border border-orange-500/20">
          {icon}
        </span>
      </div>
      <h3 className="mb-2 text-base font-bold text-orange-300">{title}</h3>
      <p className="text-sm leading-7 text-gray-400">{desc}</p>
    </HoverCard>
  );
}

// ─── Option Type Card ─────────────────────────────────────────────────────────

function OptionTypeCard({
  type,
  color,
  arrow,
  title,
  desc,
  when,
}: {
  type: string;
  color: string;
  arrow: string;
  title: string;
  desc: string;
  when: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 ${color}`}>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-current/10 text-2xl font-black">
          {arrow}
        </div>
        <div>
          <span className="text-xl font-black">{type}</span>
          <p className="text-sm font-semibold opacity-80">{title}</p>
        </div>
      </div>
      <p className="text-sm leading-7 opacity-70">{desc}</p>
      <div className="mt-4 rounded-xl bg-black/20 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-wider opacity-50">متى يُستخدم</p>
        <p className="mt-0.5 text-xs opacity-80">{when}</p>
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/3 px-5 py-4">
      <p className="font-semibold text-orange-300">{q}</p>
      <p className="mt-2 text-sm leading-7 text-gray-400">{a}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OptionsPage() {
  return (
    <div className="relative isolate pb-16">
      {/* bg glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 hidden sm:block">
        <div className="absolute -top-32 right-[25%] h-96 w-96 rounded-full bg-orange-500/20 blur-[130px]" />
        <div className="absolute top-1/2 left-[5%] h-72 w-72 rounded-full bg-amber-500/15 blur-[100px]" />
      </div>

      <div className="page-shell">

        {/* ── Hero ─────────────────────────────────────────── */}
        <FadeIn direction="up">
          <div className="mb-14 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-orange-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
              EZZO SPX BOT
            </div>

            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              عقود{' '}
              <span className="bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                الخيارات
              </span>
              <br />
              مع بوت ايزو
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              تعلّم أساسيات عقود الخيارات واستفد من إشارات{' '}
              <span className="font-bold text-orange-300">EZZO SPX BOT</span>{' '}
              المباشرة على مؤشر S&P 500.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href={BOT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3.5 font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.7)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.8)]"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                انضم للبوت على تيليجرام
              </a>
              <a
                href="#learn"
                className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 font-semibold text-gray-200 transition-all duration-300 hover:border-orange-400/40 hover:text-white"
              >
                تعلّم الخيارات أولاً ↓
              </a>
            </div>
          </div>
        </FadeIn>

        {/* ── What is Options ───────────────────────────────── */}
        <div id="learn">
        <FadeIn direction="up" delay={0.1}>
          <div className="glass-panel mb-10 px-6 py-8 sm:px-10">
            <div className="mb-6 text-center">
              <h2 className="section-heading">ما هي عقود الخيارات؟</h2>
              <p className="section-subheading mx-auto max-w-3xl">
                عقود الخيارات (Options) هي أدوات مالية مشتقة تمنحك الحق — لا الالتزام — في شراء أو بيع أصل ما بسعر محدد قبل تاريخ انتهاء محدد.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <OptionTypeCard
                type="CALL"
                color="border-green-500/20 bg-green-500/5 text-green-300"
                arrow="▲"
                title="خيار الشراء"
                desc="يمنحك حق شراء الأصل بسعر تنفيذ محدد. تربح عندما يرتفع السعر فوق سعر التنفيذ قبل الانتهاء."
                when="عندما تتوقع ارتفاع السوق أو الأصل"
              />
              <OptionTypeCard
                type="PUT"
                color="border-red-500/20 bg-red-500/5 text-red-300"
                arrow="▼"
                title="خيار البيع"
                desc="يمنحك حق بيع الأصل بسعر تنفيذ محدد. تربح عندما ينخفض السعر تحت سعر التنفيذ قبل الانتهاء."
                when="عندما تتوقع انخفاض السوق أو الأصل"
              />
            </div>
          </div>
        </FadeIn>
        </div>

        {/* ── Key Terms ─────────────────────────────────────── */}
        <FadeIn direction="up" delay={0.15}>
          <div className="glass-panel mb-10 px-6 py-8 sm:px-10">
            <h2 className="section-heading mb-6 text-center">المصطلحات الأساسية</h2>
            <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" staggerChildren={0.06}>
              {[
                { icon: '🎯', title: 'Strike Price', desc: 'سعر التنفيذ — السعر الذي يحق لك فيه تنفيذ العقد.' },
                { icon: '📅', title: 'Expiration Date', desc: 'تاريخ انتهاء الخيار — بعده يصبح العقد لاغياً.' },
                { icon: '💵', title: 'Premium', desc: 'قيمة العقد التي تدفعها عند شراء الخيار.' },
                { icon: '📊', title: 'In the Money', desc: 'عندما يكون سعر السوق مواتياً لتنفيذ الخيار بربح.' },
                { icon: '📉', title: 'Out of the Money', desc: 'عندما لا يكون من المفيد تنفيذ الخيار حالياً.' },
                { icon: '⚡', title: 'SPX Options', desc: 'خيارات على مؤشر S&P 500 — أكثر الأسواق سيولةً وشهرةً.' },
              ].map((item) => (
                <StaggerItem key={item.title}>
                  <FeatureCard {...item} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </FadeIn>

        {/* ── About the Bot ─────────────────────────────────── */}
        <FadeIn direction="up" delay={0.2}>
          <div className="glass-panel mb-10 overflow-hidden px-6 py-8 sm:px-10">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              {/* Bot visual */}
              <div className="flex flex-col items-center gap-4">
                <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 via-amber-400 to-yellow-300 shadow-[0_0_80px_-10px_rgba(249,115,22,0.7)]">
                  <span className="text-6xl font-black text-black">E</span>
                  <div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-400 shadow-lg text-sm font-black text-black">
                    BOT
                  </div>
                </div>
                <p className="text-center text-xl font-black text-white">EZZO SPX BOT</p>
                <div className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  البوت نشط
                </div>
              </div>

              {/* Description */}
              <div className="space-y-5 text-right">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  كيف يعمل{' '}
                  <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                    البوت؟
                  </span>
                </h2>
                <p className="text-sm leading-8 text-gray-400">
                  يراقب EZZO SPX BOT مؤشر S&P 500 باستمرار، ويرصد فرص التداول بناءً على التحليل الفني والزخم السعري، ثم يرسل الإشارة مباشرةً على قناة تيليجرام.
                </p>
                <ul className="space-y-3 text-sm text-gray-300">
                  {[
                    'إشارات CALL وPUT واضحة مع سعر الدخول',
                    'سعر التنفيذ وتاريخ الانتهاء لكل صفقة',
                    'ملاحظات تحليلية تشرح سبب الإشارة',
                    'تحديثات فورية عند تغير حالة الصفقة',
                    'تاريخ موثّق لجميع الإشارات السابقة',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-0.5 text-orange-400 flex-shrink-0">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={BOT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-400 px-7 py-3 text-sm font-bold text-black shadow-[0_10px_30px_-10px_rgba(249,115,22,0.6)] transition-all duration-300 hover:-translate-y-1"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  انضم للبوت الآن
                </a>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── FAQ ───────────────────────────────────────────── */}
        <FadeIn direction="up" delay={0.25}>
          <div className="glass-panel mb-10 px-6 py-8 sm:px-10">
            <h2 className="section-heading mb-6 text-center">أسئلة شائعة</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {
                  q: 'هل أحتاج خبرة مسبقة في الخيارات؟',
                  a: 'لا، البوت يشرح كل إشارة بالتفصيل مع سعر الدخول والهدف. يُنصح بقراءة هذه الصفحة أولاً لفهم المبادئ الأساسية.',
                },
                {
                  q: 'ما هو مؤشر SPX؟',
                  a: 'SPX هو مؤشر S&P 500 الذي يضم أكبر 500 شركة أمريكية. خياراته هي الأكثر سيولةً في العالم.',
                },
                {
                  q: 'كيف أستلم الإشارات؟',
                  a: 'انضم لقناة تيليجرام الخاصة بالبوت، وستصلك الإشارات فور نشرها مع جميع التفاصيل.',
                },
                {
                  q: 'هل الخيارات مضمونة الربح؟',
                  a: 'لا. تداول الخيارات ينطوي على مخاطر عالية. هذه الإشارات للأغراض التعليمية ولا تمثل نصيحة مالية.',
                },
              ].map((faq) => (
                <FaqItem key={faq.q} {...faq} />
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── CTA ───────────────────────────────────────────── */}
        <ScaleIn delay={0.3}>
          <div className="relative overflow-hidden rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-black/60 to-amber-500/10 px-6 py-10 text-center">
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute -top-12 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-orange-500/20 blur-[60px]" />
            </div>
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              جاهز للبدء مع{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                EZZO SPX BOT
              </span>
              ؟
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-gray-400">
              انضم الآن واستلم إشارات الخيارات مباشرةً على هاتفك.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-4">
              <a
                href={BOT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3.5 font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.8)] transition-all duration-300 hover:-translate-y-1"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
                انضم للبوت على تيليجرام
              </a>
              <Link
                href="/Support"
                prefetch={false}
                className="inline-flex items-center rounded-full border border-white/15 px-7 py-3.5 font-semibold text-gray-200 transition-all duration-300 hover:border-orange-400/40 hover:text-white"
              >
                تواصل معنا
              </Link>
            </div>

            <p className="mt-6 text-[11px] text-gray-600">
              ⚠️ تداول الخيارات ينطوي على مخاطر. لا تستثمر ما لا تستطيع تحمّل خسارته.
            </p>
          </div>
        </ScaleIn>

      </div>
    </div>
  );
}
