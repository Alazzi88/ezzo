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
  isCall,
  arrow,
  title,
  desc,
  when,
}: {
  type: string;
  isCall: boolean;
  arrow: string;
  title: string;
  desc: string;
  when: string;
}) {
  const accentColor = isCall ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/[0.02]' : 'text-rose-400 border-rose-500/20 bg-rose-500/[0.02]';
  const glowShadow = isCall ? 'hover:shadow-[0_15px_40px_rgba(16,185,129,0.1)]' : 'hover:shadow-[0_15px_40px_rgba(244,63,94,0.1)]';
  const badgeColor = isCall ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20';

  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${accentColor} ${glowShadow}`}>
      <div className="absolute inset-0 -z-10 bg-radial-gradient opacity-[0.03]" />
      
      <div className="mb-4 flex items-center gap-3">
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl font-black text-2xl border ${badgeColor}`}>
          {arrow}
        </div>
        <div>
          <span className="text-xl font-black tracking-wide text-white">{type}</span>
          <p className="text-sm font-semibold opacity-90">{title}</p>
        </div>
      </div>
      <p className="text-sm leading-7 text-gray-300">{desc}</p>
      <div className="mt-5 rounded-xl bg-white/[0.02] border border-white/[0.04] p-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">متى يُستخدم</p>
        <p className="mt-1 text-xs text-gray-300 font-semibold">{when}</p>
      </div>
    </div>
  );
}

// ─── FAQ Item ─────────────────────────────────────────────────────────────────

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/3 px-5 py-4 transition-all duration-300 hover:border-orange-500/10 hover:bg-white/[0.04]">
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
                isCall={true}
                arrow="▲"
                title="خيار الشراء"
                desc="يمنحك حق شراء الأصل بسعر تنفيذ محدد. تربح عندما يرتفع السعر فوق سعر التنفيذ قبل الانتهاء."
                when="عندما تتوقع ارتفاع السوق أو الأصل"
              />
              <OptionTypeCard
                type="PUT"
                isCall={false}
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
              {/* Bot visual (Simulated live Feed UI) */}
              <div className="flex flex-col items-stretch w-full max-w-md mx-auto">
                <div className="gradient-card overflow-hidden shadow-[0_20px_50px_rgba(249,115,22,0.15)] border-white/[0.08] hover:shadow-[0_20px_50px_rgba(249,115,22,0.25)] transition-all duration-300">
                  {/* macOS style Window Title Bar */}
                  <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06] bg-white/[0.02]">
                    <div className="flex gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] opacity-80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f] opacity-80" />
                    </div>
                    <span className="text-[11px] font-mono text-gray-400">Telegram Live Alert Feed</span>
                    <div className="w-10" />
                  </div>
                  
                  {/* Terminal / Chat window content */}
                  <div className="p-5 font-mono text-xs space-y-4 bg-black/60 min-h-[220px]">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-black text-xs font-black shadow-[0_0_10px_rgba(249,115,22,0.4)] flex-shrink-0">
                        EZ
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-orange-300">EZZO SPX BOT</span>
                          <span className="rounded bg-orange-500/10 border border-orange-500/20 px-1 py-0.5 text-[9px] text-orange-400">BOT</span>
                          <span className="text-[9px] text-gray-500">10:42 AM</span>
                        </div>
                        
                        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-4 text-[13px] text-emerald-400 space-y-2 leading-relaxed text-right" dir="rtl">
                          <div className="flex justify-between items-center border-b border-emerald-500/10 pb-1.5 font-bold">
                            <span>🚨 إشارة شراء جديدة (NEW SIGNAL)</span>
                            <span className="text-xs bg-emerald-500/15 px-2 py-0.5 rounded-full">CALL</span>
                          </div>
                          <div className="grid grid-cols-2 gap-y-1.5 gap-x-4 pt-1 font-sans text-gray-300">
                            <div>الأصل: <span className="font-mono font-bold text-white">SPX (S&P 500)</span></div>
                            <div>سعر التنفيذ: <span className="font-mono font-bold text-white">5250</span></div>
                            <div>سعر الدخول: <span className="font-mono font-bold text-white">$3.20</span></div>
                            <div>التاريخ: <span className="font-mono font-bold text-white">اليوم (0DTE)</span></div>
                          </div>
                          <div className="pt-2 border-t border-emerald-500/10 flex justify-between font-sans text-xs">
                            <span className="text-gray-400">الهدف الأول: <strong className="text-emerald-400">$4.50</strong></span>
                            <span className="text-gray-400">وقف الخسارة: <strong className="text-red-400">$1.80</strong></span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-black text-xs font-black shadow-[0_0_10px_rgba(249,115,22,0.4)] flex-shrink-0">
                        EZ
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-orange-300">EZZO SPX BOT</span>
                          <span className="rounded bg-orange-500/10 border border-orange-500/20 px-1 py-0.5 text-[9px] text-orange-400">BOT</span>
                          <span className="text-[9px] text-gray-500">10:48 AM</span>
                        </div>
                        
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.01] p-3 text-[12px] text-gray-300 space-y-1 text-right" dir="rtl">
                          <p className="font-sans">📈 تحديث الصفقة:</p>
                          <p className="font-sans text-emerald-400 font-bold">✓ تم تحقيق الهدف الأول بسعر $4.50 (+40.6%) 🎯</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center justify-between px-2">
                  <div className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                    البوت نشط ويعمل على مدار الساعة
                  </div>
                  <span className="text-[11px] text-gray-500">معدل الدقة: +85%</span>
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
