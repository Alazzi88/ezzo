import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    img: '/img/trading.webp',
    title: 'مزايا تداول الفيوتشر',
    description:
      'استفد من سيولة عالية وإمكانية التداول في الاتجاهين مع رافعة مالية منظمة وخطط تحكم صارمة في إدارة رأس المال.',
  },
  {
    img: '/img/trading1.webp',
    title: 'مزايا الحسابات الممولة',
    description:
      'تداول برأس مال كبير دون المخاطرة بأموالك الخاصة، مع اختبارات تقييم واضحة ونسب أرباح سخية ترتبط بأدائك.',
  },
  {
    img: '/img/trading2.webp',
    title: 'إدارة المخاطر الذكية',
    description: 'التداول ليس بالمجال الصعب، لكننا نوفر لك محتوى تعليمي يوجهك لضبط حجم العقود ووقف الخسارة بثقة.',
  },
  {
    img: '/img/trading3.webp',
    title: 'شركات تمويل موثوقة',
    description:
      'يوجد العديد من شركات التمويل الموثوقة في السوق دون تلاعب كبير كما يحدث في الفوركس، وتقدم عقوداً بلا سبريد مزعج.',
  },
  {
    img: '/img/money.webp',
    title: 'تنوع مستويات الحسابات',
    description:
      'اختر من بين مستويات تقييم متعددة تناسب خبرتك، بدءًا من الحسابات المصغرة وحتى المحافظ الكبيرة.',
  },
  {
    img: '/img/trading-analysis.webp',
    title: 'أدوات تحليل متكاملة',
    description:
      'استفد من مؤشرات Ezzo اللحظية ولوحات المتابعة لمزامنة قراراتك مع الاتجاهات الرئيسية في السوق.',
  },
];

const disadvantages = [
  'مخاطر عالية بسبب الرافعة المالية إذا لم يتم الالتزام بالخطة.',
  'احتمالية خسارة رأس المال بسرعة في حال غياب الانضباط.',
  'تعقيد بعض العقود وصعوبة فهمها للمبتدئين.',
  'الحاجة لمتابعة مستمرة للأخبار وتأثيراتها على الأسواق.',
  'تذبذب الأسعار الحاد خلال الأحداث الاقتصادية الكبرى.',
  'رسوم تقييم وتجديد يمكن أن تتراكم إذا تكررت المحاولات دون استعداد كافٍ.',
];

const successTips = [
  'تعلم التحليل الفني والأساسي بعمق قبل التداول الفعلي.',
  'التزم بخطة تداول مكتوبة وحدود خسارة يومية واضحة.',
  'لا تخاطر بأكثر من 1-2٪ من رأس المال في الصفقة الواحدة.',
  'استخدم أوامر وقف الخسارة دائماً وتجنب ملاحقة السوق.',
  'ابتعد عن التداول العاطفي وركز على القرارات المنطقية.',
  'تابع الأخبار المؤثرة واستعد لسيناريوهات بديلة.',
  'اختبر استراتيجيتك على حساب تجريبي قبل الانتقال للحساب الحقيقي.',
  'طور مهاراتك باستمرار عبر الدورات والمحتوى المتخصص.',
  'قم بتوثيق أداءك أسبوعياً لتعديل حجم العقود والرافعة وفق النتائج الفعلية.',
];

const comparisonHeaders = ['الميزة', 'الفيوتشر', 'الأسهم', 'الفوركس', 'الأوبشن الأمريكي'];

const comparisonRows = [
  {
    feature: 'الرافعة المالية',
    futures: 'حتى 1:100 (حسب العقد)',
    stocks: '1:2 غالباً',
    forex: 'حتى 1:500',
    options: '1:10 إلى 1:20 تقريباً',
  },
  {
    feature: 'السيولة',
    futures: 'مرتفعة جداً',
    stocks: 'مرتفعة',
    forex: 'مرتفعة جداً',
    options: 'مرتفعة (خاصة العقود الرئيسية)',
  },
  {
    feature: 'التكلفة / العمولات',
    futures: 'منخفضة (عمولة ثابتة أو متغيرة)',
    stocks: 'عمولة أو سبريد',
    forex: 'سبريد فقط غالباً',
    options: 'عمولة + سبريد + بريميوم',
  },
  {
    feature: 'رأس المال الأدنى',
    futures: 'من 500$ إلى 5000$ (حسب الوسيط)',
    stocks: 'من 100$ إلى آلاف الدولارات',
    forex: 'من 10$ إلى 100$ غالباً',
    options: 'من 500$ إلى 2000$ (حسب الاستراتيجية)',
  },
  {
    feature: 'إمكانية البيع على المكشوف',
    futures: 'نعم',
    stocks: 'أحياناً',
    forex: 'نعم',
    options: 'نعم (عبر عقود البيع)',
  },
  {
    feature: 'الأرباح المحتملة',
    futures: 'مرتفعة جداً مع المخاطرة',
    stocks: 'متوسطة إلى مرتفعة',
    forex: 'متوسطة إلى مرتفعة',
    options: 'مرتفعة جداً (حسب الاستراتيجية)',
  },
  {
    feature: 'الخسارة المحتملة',
    futures: 'قد تتجاوز رأس المال في بعض الحالات',
    stocks: 'محدودة برأس المال',
    forex: 'قد تتجاوز رأس المال (رافعة عالية)',
    options: 'محدودة بالقسط المدفوع (البريميوم)',
  },
  {
    feature: 'المخاطرة',
    futures: 'مرتفعة جداً',
    stocks: 'متوسطة',
    forex: 'مرتفعة جداً',
    options: 'مرتفعة إذا لم تُدار العقود بشكل صحيح',
  },
  {
    feature: 'ساعات التداول',
    futures: '23 ساعة تقريباً',
    stocks: '7 - 8 ساعات',
    forex: '24 ساعة',
    options: '6.5 ساعة (جلسة السوق الأمريكي)',
  },
  {
    feature: 'التعقيد',
    futures: 'متوسط إلى مرتفع',
    stocks: 'منخفض',
    forex: 'متوسط',
    options: 'مرتفع (يتطلب استراتيجيات متعددة)',
  },
];

const FuturesAndFundedAccounts = () => {
  return (
    <div className="relative isolate pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[12%] top-[-18%] h-96 w-96 rounded-full bg-orange-500/25 blur-[170px]" />
        <div className="absolute bottom-[-30%] right-[15%] h-[420px] w-[420px] rounded-full bg-rose-500/20 blur-[200px]" />
      </div>

      <section className="page-shell pt-16 text-center sm:pt-24">
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
          دليل شامل للفيوتشر والحسابات الممولة
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
          كل ما تحتاجه للنجاح في تداول الفيوتشر والحسابات الممولة
        </h1>
        <p className="section-subheading mx-auto max-w-4xl">
          عقود الفيوتشر تمنحك حرية التداول على جميع الاتجاهات بسيولة عالية، بينما تتيح لك الحسابات الممولة الوصول إلى رأس مال أكبر دون المخاطرة بأموالك الخاصة. اكتشف الفروق، المزايا، والتحديات في هذا الدليل العملي.
        </p>
      </section>

      <section className="page-shell mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(({ img, title, description }) => (
          <div key={title} className="gradient-card p-8 text-center">
            <div className="mx-auto flex h-32 w-32 items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/70">
              <Image src={img} alt={title} width={140} height={140} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-orange-300">{title}</h3>
            <p className="mt-4 text-sm leading-7 text-gray-300">{description}</p>
          </div>
        ))}
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">عيوب يجب الانتباه لها قبل التداول</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            لا يخلو تداول الفيوتشر من التحديات، لكن فهمها مسبقاً يمنحك أفضلية في اتخاذ القرارات بعقلانية وثقة.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {disadvantages.map((item) => (
              <div key={item} className="gradient-card h-full p-6 text-right">
                <p className="text-sm leading-7 text-gray-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="order-2 space-y-6 text-right lg:order-1">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">ما هي الحسابات الممولة؟</h2>
                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
                  الحسابات الممولة تمنح المتداولين فرصة التعامل مع رأس مال كبير بعد اجتياز اختبار تقييم. تحصل على نسبة من الأرباح دون أن تخاطر بأموالك الخاصة، مما يجعلها خياراً مثالياً للمتداول المتمكن الباحث عن دخل إضافي ومستدام.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-orange-300">كيف تعمل في أسواق الفيوتشر؟</h3>
                <p className="mt-4 text-sm leading-7 text-gray-300 sm:text-base">
                  تبدأ الرحلة باجتياز تحدي التقييم الذي يحدد قدرتك على تحقيق أرباح ضمن حدود خسارة محددة. بعد النجاح تحصل على حساب محاكي يحاكي السوق الحقيقي، وتُحتسب أرباحك افتراضياً ثم تُحوّل لك حسب سياسة الشركة. بعض الشركات تسمح بالسحب اليومي أو الأسبوعي حتى أثناء الحساب التجريبي، بينما تشترط شركات أخرى تحقيق عدة سحوبات ناجحة قبل الانتقال إلى حساب لايف بأموال حقيقية.
                </p>
              </div>
            </div>
            <div className="order-1 overflow-hidden rounded-3xl border border-white/10 bg-black/60 lg:order-2">
              <Image src="/img/funded.webp" alt="الحسابات الممولة" width={720} height={540} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">نصائح عملية للنجاح في الحسابات الممولة والفيوتشر</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            التركيز على الانضباط وإدارة رأس المال يمنحك أفضلية تنافسية سواء كنت في حساب ممول أو حسابك الخاص.
          </p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {successTips.map((tip) => (
              <div key={tip} className="gradient-card h-full p-6 text-right">
                <p className="text-sm leading-7 text-gray-200">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-24">
        <div className="glass-panel overflow-hidden px-0 pb-6 pt-8 sm:px-8">
          <h2 className="section-heading text-center">مقارنة تفصيلية بين أهم الأسواق</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            جدول مختصر يساعدك على اختيار السوق الأنسب لأهدافك بناءً على الرافعة، التكاليف، ومستوى التعقيد.
          </p>
          <div className="mt-10 overflow-x-auto px-2">
            <table className="min-w-full divide-y divide-white/10 text-sm text-gray-100">
              <thead>
                <tr className="bg-white/5 text-xs uppercase tracking-widest text-orange-200">
                  {comparisonHeaders.map((header) => (
                    <th key={header} className="whitespace-nowrap px-4 py-3 text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-black/60">
                {comparisonRows.map((row) => (
                  <tr key={row.feature} className="border-b border-white/5 text-center">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-orange-200">{row.feature}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-200">{row.futures}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-200">{row.stocks}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-200">{row.forex}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-200">{row.options}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 text-center sm:px-10">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">جاهز للانتقال إلى المستوى التالي؟</h2>
          <p className="section-subheading mx-auto max-w-3xl">
            فريق Ezzo يرافقك منذ مرحلة التقييم وحتى إدارة الحساب الممول، مع أدوات تحليلية وتنبيهات مخصصة لأسواق الفيوتشر.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/Support"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-8 py-3 text-sm font-semibold text-black shadow-[0_25px_55px_-25px_rgba(251,146,60,0.95)] transition-transform duration-300 hover:-translate-y-1"
            >
              تحدث مع خبيرنا
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-orange-400/40 px-8 py-3 text-sm font-semibold text-orange-200 transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:text-orange-100"
            >
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FuturesAndFundedAccounts;
