import type { Metadata } from 'next';
import FAQs from '@/components/FAQs';
import { VideoCard } from './VideoCard';

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

const STRATEGY_VIDEO = {
  embedSrc: 'https://player.vimeo.com/video/1173440649?badge=0&autopause=0&player_id=0&app_id=58479',
  title: 'شرح للاستراتيجية',
  thumbnail: '/img/ezzoind.webp',
};

const Indicator: React.FC = () => (
  <div className="relative isolate pb-24 pt-28">
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute left-[18%] top-[-18%] h-80 w-80 rounded-full bg-orange-500/20 blur-[160px]" />
      <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-rose-500/18 blur-[190px]" />
    </div>

    <section className="page-shell text-center">
      <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
        استراتيجيات Ezzo الاحترافية
      </span>
      <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
        تعرف على كيفية عمل استراتيجياتنا
      </h1>
      <p className="section-subheading mx-auto max-w-3xl">
        أدوات تحليلية متقدمة تعتمد على منهجية ICT وتكملها تنبيهات لحظية وخطط تنفيذ دقيقة لأسواق الفيوتشر وناسداك.
      </p>
    </section>

    <section className="page-shell mt-16 space-y-16">
      <div className="glass-panel px-6 py-10 sm:px-10">
        <h2 className="text-2xl font-bold text-orange-300 text-center">استراتيجية ايزو البرو</h2>
        <p className="mt-4 text-center text-sm leading-7 text-gray-300">
          استراتيجية ايزو البرو مبنية على مفاهيم ICT وتركز على رصد الفجوات السعرية، كتل الأوامر، وتحديد أهداف واضحة مع وقف خسارة محسوب لكل صفقة.
        </p>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:items-center">
          <VideoCard {...STRATEGY_VIDEO} />
          <ul className="list-disc space-y-3 pr-5 text-sm leading-7 text-gray-200">
            <li>نقاط دخول مبنية على مناطق سيولة مؤكدة.</li>
            <li>تحديد أهداف ووقف خسارة ديناميكي.</li>
            <li>تنبيهات فورية عبر الايميل او التطبيق.</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="page-shell mt-20">
      <div className="glass-panel px-6 py-10 sm:px-10 text-center">
        <h2 className="text-2xl font-bold text-orange-300">أسئلة شائعة</h2>
        <p className="mt-3 text-sm leading-7 text-gray-300">
          إجابات سريعة على أكثر الاستفسارات تكراراً حول استراتيجياتنا، أنظمة التنبيه، وخطط الاشتراك.
        </p>
        <div className="mt-8 text-right">
          <FAQs />
        </div>
      </div>
    </section>
  </div>
);

export default Indicator;
