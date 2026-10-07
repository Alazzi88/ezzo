import type { Metadata } from 'next';
import Link from 'next/link';
import FAQs from '@/components/FAQs';
import { VideoCard } from './VideoCard';
import FuturesIndicatorPreview from './FuturesIndicatorPreview';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/MotionComponents';

export const metadata: Metadata = {
  title: 'استراتيجية ايزو البرو | مؤشر تداول فني متقدم للفيوتشر والحسابات الممولة',
  description:
    'استراتيجية ايزو البرو المبنية على مفاهيم ICT — رصد دقيق لمناطق السيولة وكتل الأوامر مع تنبيهات لحظية لأسواق الفيوتشر وناسداك. احصل على نقاط دخول وخروج محسوبة.',
  keywords: [
    'استراتيجية ايزو', 'استراتيجية ايزو البرو', 'مؤشر تداول', 'ICT استراتيجية',
    'فيوتشر', 'ناسداك', 'تداول SPX', 'استراتيجية لحظية', 'نقاط سيولة',
    'كتل أوامر', 'تنبيهات تداول', 'TradingView', 'Ezzo indicator',
    'Ezzo trading strategy', 'futures trading strategy',
  ],
  alternates: { canonical: 'https://3zzo.com/Indicator' },
  openGraph: {
    title: 'استراتيجية ايزو البرو | مؤشر تداول فني متقدم',
    description: 'استراتيجية ايزو البرو مبنية على ICT — نقاط دخول دقيقة وتنبيهات لحظية لأسواق الفيوتشر.',
    url: 'https://3zzo.com/Indicator',
    images: [{ url: 'https://3zzo.com/img/ezzoind.webp', width: 1200, height: 630 }],
  },
};

// ─── Structured data (JSON-LD) ───────────────────────────────────────────────
const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: 'https://3zzo.com' },
        { '@type': 'ListItem', position: 2, name: 'المؤشرات', item: 'https://3zzo.com/Indicator' },
        { '@type': 'ListItem', position: 3, name: '3zzo TickHunter', item: 'https://3zzo.com/Indicator' },
      ],
    },
    {
      '@type': 'Product',
      name: 'مؤشر 3zzo TickHunter',
      alternateName: '3zzo TickHunter Nasdaq Indicator',
      image: 'https://3zzo.com/img/3zzo-tickhunter.png',
      description:
        'مؤشر لعقود الناسداك الآجلة (MNQ · NQ · NAS100 · US100) يحلّل السوق نيابةً عن المتداول ويرسم منطقة الدخول ووقف الخسارة والهدف على الشارت مباشرةً وفق مفاهيم ICT / Smart Money، مع تنبيهات لحظية على منصة TradingView.',
      brand: { '@type': 'Brand', name: 'Ezzo' },
      category: 'Trading Indicator',
      audience: { '@type': 'Audience', audienceType: 'متداولو عقود الناسداك الآجلة' },
      offers: {
        '@type': 'Offer',
        url: 'https://3zzo.aryaf.sa/',
        priceCurrency: 'SAR',
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Ezzo Trading' },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'ما هو مؤشر 3zzo TickHunter؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'مؤشر تداول لعقود الناسداك الآجلة يحلّل حركة السعر والسيولة وفق مفاهيم ICT / Smart Money، ثم يعرض على الشارت صفقة جاهزة: نقطة الدخول، وقف الخسارة، والهدف — دون حاجة لتحليل شخصي.',
          },
        },
        {
          '@type': 'Question',
          name: 'على أي عقود يعمل المؤشر؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'المؤشر مخصّص لمؤشر الناسداك فقط: MNQ و NQ و NAS100 و US100.',
          },
        },
        {
          '@type': 'Question',
          name: 'هل أحتاج خبرة في التحليل الفني لاستخدامه؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'لا. المؤشر يقوم بالتحليل نيابةً عنك ويظهر الصفقة كاملة على الشارت، فتنفّذ الدخول والوقف والهدف كما هي.',
          },
        },
        {
          '@type': 'Question',
          name: 'كيف تصلني التنبيهات؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'عبر نظام تنبيهات TradingView لحظة جاهزية الصفقة — إشعار على الجوال أو بريد إلكتروني.',
          },
        },
        {
          '@type': 'Question',
          name: 'ما الذي يحدّده المؤشر في كل صفقة؟',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'مناطق السيولة البيعية والشرائية، منطقة الدخول (كتلة الأوامر)، وقف الخسارة، والهدف، مع نسبة مخاطرة/عائد لا تقل غالباً عن 1:2.',
          },
        },
      ],
    },
  ],
};

const STRATEGY_VIDEO = {
  embedSrc: 'https://player.vimeo.com/video/1173440649?badge=0&autopause=0&player_id=0&app_id=58479',
  title: 'شرح للاستراتيجية',
  thumbnail: '/img/ezzoind.webp',
};

// مخفي مؤقتاً بطلب من صاحب الموقع — رجّعه إلى true عند الطلب لإظهار قسم 3zzo TickHunter مجدداً
const SHOW_TICKHUNTER = false;

const Indicator: React.FC = () => (
  <div className="relative isolate pb-24 pt-28">
    {SHOW_TICKHUNTER && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
    )}
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-[18%] top-[-18%] h-80 w-80 rounded-full bg-orange-500/20 blur-[160px]" />
      <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-rose-500/18 blur-[190px]" />
    </div>

    <section className="page-shell text-center">
      <FadeIn direction="up">
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
          استراتيجيات Ezzo الاحترافية
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
          تعرف على كيفية عمل استراتيجياتنا
        </h1>
        <p className="section-subheading mx-auto max-w-3xl">
          أدوات تحليلية متقدمة تعتمد على منهجية ICT وتكملها تنبيهات لحظية وخطط تنفيذ دقيقة لأسواق الفيوتشر وناسداك.
        </p>
      </FadeIn>
    </section>

    <section className="page-shell mt-16 space-y-16">
      <FadeIn direction="up" className="glass-panel px-6 py-12 sm:px-10 sm:py-16">
        <h2 className="text-3xl font-black text-white text-center">استراتيجية ايزو البرو</h2>
        <p className="mt-4 text-center text-sm leading-7 text-gray-400 font-medium max-w-2xl mx-auto">
          استراتيجية ايزو البرو مبنية على مفاهيم ICT وتركز على رصد الفجوات السعرية، كتل الأوامر، وتحديد أهداف واضحة مع وقف خسارة محسوب لكل صفقة.
        </p>
        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
          <VideoCard {...STRATEGY_VIDEO} />
          <StaggerContainer className="space-y-4 pr-2 text-sm leading-7 text-gray-300 font-medium" staggerChildren={0.1}>
            <StaggerItem className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 font-bold text-xs flex-shrink-0">✓</span>
              <span>نقاط دخول مبنية على مناطق سيولة مؤكدة (Liquidity Sweeps).</span>
            </StaggerItem>
            <StaggerItem className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 font-bold text-xs flex-shrink-0">✓</span>
              <span>تحديد أهداف ووقف خسارة ديناميكي متناسب مع حركة السوق.</span>
            </StaggerItem>
            <StaggerItem className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/15 text-orange-400 font-bold text-xs flex-shrink-0">✓</span>
              <span>تنبيهات فورية لحظية عبر البريد الإلكتروني أو الجوال.</span>
            </StaggerItem>
          </StaggerContainer>
        </div>
        <div className="mt-12 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">اشترك الآن للحصول على الاستراتيجية</p>
          <Link
            href="https://3zzo.aryaf.sa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-10 py-4 text-base font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.8)] active:scale-98"
          >
            اشترك من المتجر الرسمي ↗
          </Link>
        </div>
      </FadeIn>
    </section>

    {/* ── قسم المؤشرات · مؤشر 3zzo TickHunter (مخفي مؤقتاً — SHOW_TICKHUNTER) ── */}
    {SHOW_TICKHUNTER && (
    <section id="tickhunter" className="page-shell mt-20 scroll-mt-28">
      <FadeIn direction="up" className="glass-panel px-6 py-12 sm:px-10 sm:py-16">
        <div className="text-center">
          <span className="inline-flex items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-200">
            قسم المؤشرات · جديد
          </span>
          <h2 className="mt-5 text-3xl font-black text-white">
            مؤشر <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">3zzo TickHunter</span> 🏹🎯
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-medium leading-7 text-gray-400">
            مؤشر مخصّص لعقود الناسداك الآجلة (MNQ · NQ · NAS100 · US100) <span className="text-orange-300">يحلّل السوق نيابةً عنك</span> ويعطيك
            الصفقة جاهزة مباشرةً على الشارت — دون أن تحلّل بنفسك. يقرأ السيولة وكتل الأوامر وفق مفاهيم
            ICT / Smart Money، ثم يرسم منطقة الدخول ووقف الخسارة والهدف بصياغة صفقة كاملة.
          </p>
        </div>

        <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
          <FuturesIndicatorPreview />
          <StaggerContainer
            className="space-y-4 pr-2 text-sm font-medium leading-7 text-gray-300"
            staggerChildren={0.1}
          >
            {[
              'يحلّل السوق نيابةً عنك ويعطيك الصفقة مباشرةً — بدون تحليل شخصي أو خبرة مسبقة.',
              'صياغة صفقة كاملة على الشارت: دخول، وقف خسارة، وهدف — مع نسبة مخاطرة/عائد لكل إعداد.',
              'تنبيهات لحظية عبر TradingView لحظة جاهزية الصفقة — بريد إلكتروني أو جوال.',
              'مخصّص لمؤشر الناسداك فقط: MNQ، NQ، NAS100، US100.',
              'متوافق مع منصة TradingView ولا يحتاج إعدادات معقّدة.',
            ].map((item) => (
              <StaggerItem key={item} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-500/15 text-xs font-bold text-orange-400">
                  ✓
                </span>
                <span>{item}</span>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: '🤖',
              title: 'صفقة جاهزة بدون تحليل',
              desc: 'المؤشر ينفّذ كل القراءة الفنية عنك ويظهر الصفقة مكتملة على الشارت — تنفّذ الدخول والوقف والهدف كما هي دون اجتهاد شخصي.',
            },
            {
              icon: '💧',
              title: 'تحديد السيولة تلقائياً',
              desc: 'يرصد تجمّعات الأوامر المعلّقة أعلى وأسفل السعر ويعرض حجمها التقريبي كمستويات ملوّنة، فتُعرف الوجهة الأرجح لحركة السعر.',
            },
            {
              icon: '🎯',
              title: 'نقطة الدخول',
              desc: 'بعد كنس السيولة (Liquidity Sweep) وعودة السعر إلى كتلة أوامر صالحة (Order Block)، يحدّد المؤشر منطقة دخول دقيقة مع تأكيد الاتجاه.',
            },
            {
              icon: '🛡️',
              title: 'الوقف والهدف',
              desc: 'الوقف خلف كتلة الأوامر مباشرةً، والهدف عند أقرب تجمّع سيولة معاكس — بنسبة مخاطرة/عائد لا تقل غالباً عن 1:2.',
            },
          ].map((card) => (
            <div
              key={card.title}
              className="gradient-card h-full px-5 py-6 text-center"
            >
              <div className="mb-3 flex justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-500/20 to-amber-400/20 text-2xl">
                  {card.icon}
                </span>
              </div>
              <h3 className="mb-2 text-sm font-bold text-orange-300">{card.title}</h3>
              <p className="text-xs leading-6 text-gray-400">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500">
            احصل على مؤشر 3zzo TickHunter
          </p>
          <Link
            href="https://3zzo.aryaf.sa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-10 py-4 text-base font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.6)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.8)] active:scale-98"
          >
            اشترك من المتجر الرسمي ↗
          </Link>
          <p className="mt-4 text-[11px] text-gray-600">
            ⚠️ التداول ينطوي على مخاطر. المؤشر أداة تحليلية مساعدة ولا يمثّل نصيحة مالية.
          </p>
        </div>
      </FadeIn>
    </section>
    )}

    <section className="page-shell mt-20">
      <FadeIn direction="up" className="glass-panel px-6 py-12 sm:px-10 sm:py-16 text-center">
        <h2 className="text-3xl font-black text-white">الأسئلة الشائعة</h2>
        <p className="mt-3 text-sm leading-7 text-gray-400 font-medium max-w-xl mx-auto">
          إجابات سريعة على أكثر الاستفسارات تكراراً حول استراتيجياتنا، أنظمة التنبيه، وخطط الاشتراك.
        </p>
        <div className="mt-10 text-right">
          <FAQs />
        </div>
      </FadeIn>
    </section>
  </div>
);

export default Indicator;
