import Link from 'next/link';

const highlights = [
  'خصومات حصرية للمتداولين',
  'أدوات جاهزة للاستخدام الفوري',
  'خدمة عملاء تدعمك خطوة بخطوة',
];

const Advertisement: React.FC = () => {
  return (
    <section className="relative mt-16">
      <div className="page-shell">
        <div className="gradient-card overflow-hidden px-7 py-10 sm:px-10 sm:py-12">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-28 left-1/3 h-72 w-72 rounded-full bg-orange-500/25 blur-[140px] animate-gradient-move" />
            <div className="absolute bottom-[-40%] right-[-10%] h-80 w-80 rounded-full bg-amber-400/25 blur-[160px] animate-gradient-move" />
          </div>

          <div className="relative z-10 grid gap-12 lg:grid-cols-[2.2fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex h-9 items-center rounded-full border border-white/15 bg-white/10 px-4 text-xs font-semibold uppercase tracking-widest text-orange-200">
                متجر Ezzo
              </span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                أدوات تداول متكاملة
              </h2>
              <p className="max-w-xl text-sm leading-7 text-gray-200 sm:text-base">
                جهّز نفسك بأفضل الاستراتيجيات والدورات والخدمات الداعمة لمنهجيتك في التداول. اختر الخطة المناسبة وابدأ باستثمار معرفي مدروس يرفع من أداء حسابك الفعلي أو الممول.
              </p>

              <ul className="flex flex-wrap gap-3 text-sm text-orange-200/90">
                {highlights.map((item) => (
                  <li key={item} className="rounded-full border border-orange-300/20 bg-orange-500/10 px-4 py-2 backdrop-blur-sm">
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-start gap-5 lg:items-end">
              <div className="rounded-2xl border border-white/10 bg-black/50 px-6 py-5 text-right text-sm text-gray-200 shadow-lg backdrop-blur-md">
                <p className="text-xl font-semibold text-orange-300">
                  خصومات حتى 50%
                </p>
                <p className="mt-2 leading-6 text-gray-300">
                  خلال مواسم العروض تصل التخفيضات إلى 50٪ مع حزم تشمل المحتوى التعليمي، الاستراتيجيات اللحظية، والدعم الأسبوعي من فريق Ezzo.
                </p>
              </div>

              <Link
                href="https://3zzo.aryaf.sa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3 text-base font-semibold text-black shadow-[0_15px_45px_-15px_rgba(251,146,60,0.85)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_22px_60px_-18px_rgba(248,113,37,0.9)]"
              >
                تسوّق الآن
                <span className="text-lg">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advertisement;
