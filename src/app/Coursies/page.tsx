import Image from 'next/image';
import Link from 'next/link';

const courseModules = [
  'مقدمة في أسواق الفيوتشر والحسابات الممولة',
  'قراءة حركة السعر باستخدام التحليل الفني',
  'رسم مناطق العرض والطلب ومستويات السيولة',
  'استراتيجية Ezzo للدخول والخروج مع إدارة المخاطر',
  'تطبيق عملي على منصة TradingView وتنبيهات تلجرام',
  'خطوات اجتياز اختبارات الحسابات الممولة بثقة',
];

export default function CourseList() {
  return (
    <div className="relative isolate pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[15%] top-[-18%] h-80 w-80 rounded-full bg-orange-500/22 blur-[170px]" />
        <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-amber-400/18 blur-[190px]" />
      </div>

      <section className="page-shell text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
          برنامج تدريبي واحد شامل
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
          دورة التحليل الفني والفيوتشر
        </h1>
        <p className="section-subheading mx-auto max-w-3xl">
          منهج متكامل يربط بين الأساسيات والتطبيق العملي على أسواق الفيوتشر والحسابات الممولة مع أدوات Ezzo الاحترافية.
        </p>
      </section>

      <section className="page-shell mt-16">
        <div className="gradient-card overflow-hidden px-6 py-8 sm:px-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="relative h-64 w-full overflow-hidden rounded-3xl sm:h-80">
              <Image
                src="/img/cource.webp"
                alt="دورة التحليل الفني والفيوتشر"
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-6 text-right">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[4px] text-orange-200">
                  تحليل فني + تطبيق عملي
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
                  تجربة تعليمية متكاملة من فريق Ezzo
                </h2>
                <p className="mt-4 text-base leading-8 text-gray-100">
                  تم تصميم هذه الدورة لتمنحك منهجاً واضح المعالم في قراءة السوق والتعامل مع الحسابات الممولة. سنبدأ من فهم البنية السعريّة للمؤشرات، مروراً برسم مناطق العرض والطلب، وانتهاءً بخطط دخول وخروج مدروسة.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-black/55 px-6 py-7 shadow-inner">
                <h3 className="text-xl font-bold text-orange-200">محتويات الدورة</h3>
                <p className="mt-3 text-sm leading-7 text-gray-200">
                  وحدات تدريبية متسلسلة تساعدك على الانتقال من الجانب النظري إلى التطبيق العملي بثقة:
                </p>
                <ul className="mt-5 space-y-3 text-base leading-7 text-gray-100">
                  {courseModules.map((module) => (
                    <li key={module} className="relative pr-7">
                      <span className="absolute right-0 top-2 h-2 w-2 rounded-full bg-orange-400" />
                      {module}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col items-end gap-3 text-right">
                <Link
                  href="https://t.me/ezzo_trading"
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-7 py-3 text-sm font-semibold text-black shadow-[0_20px_40px_-20px_rgba(251,146,60,0.9)] transition-transform duration-300 hover:-translate-y-1"
                >
                  انضم للقناة العامة
                </Link>
                <p className="text-xs leading-6 text-gray-200">
                  ستجد رابط الدورة في القناة العامة <span className="font-semibold text-orange-200">@ezzo_trading</span> (الرابط مثبت).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
