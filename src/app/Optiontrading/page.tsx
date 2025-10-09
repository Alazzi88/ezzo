'use client';

import Image from 'next/image';
import OptionDeltaCalculator from '@/components/OptionDeltaCalculator';

const conceptBullets = [
  {
    title: 'Call Option (خيار الشراء)',
    description:
      'يمنح المشتري الحق في شراء الأصل الأساسي بسعر محدد قبل أو عند تاريخ الانتهاء، مع مخاطرة محدودة بالقسط المدفوع.',
  },
  {
    title: 'Put Option (خيار البيع)',
    description:
      'يمنح المشتري الحق في بيع الأصل الأساسي بسعر محدد قبل أو عند تاريخ الانتهاء، ويُستخدم غالباً للتحوط من الهبوط.',
  },
];

const profitExamples = [
  {
    title: 'مثال على Call Option',
    details: [
      'سعر السهم الحالي: 100 دولار',
      'سعر التنفيذ (Strike): 105 دولارات',
      'قيمة القسط (Premium): 2 دولار',
    ],
    outcomes: [
      'إذا ارتفع سعر السهم إلى 110 دولارات: الربح = (110 - 105) - 2 = 3 دولارات.',
      'إذا لم يتجاوز سعر السهم 105 دولارات: الخسارة = 2 دولار (قيمة القسط).',
    ],
  },
  {
    title: 'مثال على Put Option',
    details: [
      'سعر السهم الحالي: 100 دولار',
      'سعر التنفيذ (Strike): 95 دولاراً',
      'قيمة القسط (Premium): 1.5 دولار',
    ],
    outcomes: [
      'إذا انخفض سعر السهم إلى 90 دولاراً: الربح = (95 - 90) - 1.5 = 3.5 دولارات.',
      'إذا لم ينخفض سعر السهم تحت 95 دولاراً: الخسارة = 1.5 دولار (القسط).',
    ],
  },
];

const advantages = [
  'تحقيق أرباح في الأسواق الصاعدة والهابطة.',
  'استخدام الأوبشن كأداة للتحوط من المخاطر.',
  'تحديد مقدار الخسارة مسبقاً من خلال القسط المدفوع.',
  'تنوع استراتيجيات الأوبشن بما يلائم مستويات مختلفة من المخاطرة.',
];

const comparisonRows = [
  {
    feature: 'رأس المال المطلوب',
    option: 'منخفض نسبياً',
    stocks: 'مرتفع',
  },
  {
    feature: 'المخاطر',
    option: 'محدودة بالقسط المدفوع',
    stocks: 'قد تكون كبيرة',
  },
  {
    feature: 'المرونة',
    option: 'عالية بسبب تنوع الاستراتيجيات',
    stocks: 'محدودة',
  },
];

const risks = [
  'إمكانية خسارة القسط بالكامل إذا لم يتحرك السعر كما هو متوقع.',
  'التأثير الكبير لتغير الزمن (Theta) على قيمة العقد.',
  'الحاجة إلى إدارة مخاطر دقيقة، خاصة للمبتدئين.',
];

const strategies = [
  {
    title: '1. استراتيجية Covered Call',
    description: 'امتلاك أسهم وبيع عقود Call لتحصيل قسط إضافي مع الحفاظ على الأصول الأساسية.',
  },
  {
    title: '2. استراتيجية Protective Put',
    description: 'شراء عقود Put لحماية المحفظة من الهبوط دون بيع المراكز الحالية.',
  },
  {
    title: '3. استراتيجية Iron Condor',
    description: 'الجمع بين بيع وشراء Call وPut في وقت واحد للاستفادة من التذبذب المنخفض.',
  },
  {
    title: '4. استراتيجية Straddle',
    description: 'شراء Call وPut بنفس السعر المستهدف وتاريخ الانتهاء للمضاربة على حركة قوية في أي اتجاه.',
  },
];

const profitTips = [
  'Call Options: يتحقق الربح إذا ارتفع سعر الأصل فوق سعر التنفيذ مضافاً إليه القسط.',
  'Put Options: يتحقق الربح إذا انخفض سعر الأصل تحت سعر التنفيذ مطروحاً منه القسط.',
  'استغل استراتيجيات مثل Straddle وStrangle للتعامل مع التقلبات الكبيرة.',
];

const strikeGuidelines = [
  'At-The-Money (ATM) لحركة سعرية معتدلة.',
  'In-The-Money (ITM) لتقليل المخاطر وزيادة احتمالية النجاح.',
  'Out-Of-The-Money (OTM) لحركات كبيرة وبقسط أقل.',
  'استخدم Protective Put كأداة إضافية لحماية الاستثمارات.',
];

const platforms = [
  {
    name: 'دراية جلوبال (Derayah Global)',
    description: 'منصة سعودية معتمدة تتيح تداول الأوبشن مع دعم باللغة العربية ووصول موسّع للأسواق.',
  },
  {
    name: 'منصة سهم',
    description: 'واجهة عربية سهلة الاستخدام مع أدوات جاهزة لتداول عقود الأوبشن الأمريكية.',
  },
];

const tutorials = [
  {
    title: 'كيفية فتح حساب جديد في دراية',
    url: 'https://www.youtube.com/embed/C--tTWoqr4I?si=SUM2ssJkjQx441Bq',
    label: 'كيفية فتح حساب جديد في دراية',
  },
  {
    title: 'كيفية فتح حساب جديد في دراية جلوبال',
    url: 'https://www.youtube.com/embed/CRtCKG0WGzg?si=XjXPkFZb29m1x6R8',
    label: 'حساب دراية جلوبال',
  },
  {
    title: 'كيفية فتح حساب تجريبي في دراية جلوبال',
    url: 'https://www.youtube.com/embed/nYTo6aSIUZ4?si=OwAeA244EOFASlr_',
    label: 'حساب تجريبي دراية جلوبال',
  },
  {
    title: 'إيداع وسحب الأموال',
    url: 'https://www.youtube.com/embed/ALnlQhRK2x4?si=f68cRbI0WeIduNTi',
    label: 'إيداع وسحب الأموال',
  },
  {
    title: 'طريقة تفعيل الأسعار المباشرة',
    url: 'https://www.youtube.com/embed/r5oLATw58LY?si=X_qAThf2rFsGd8PU',
    label: 'تفعيل الأسعار المباشرة',
  },
  {
    title: 'دخول صفقة والخروج منها وأوامر دراية',
    url: 'https://www.youtube.com/embed/6nY_wWcwLbI?si=YVzpld2OvUeXMYV_',
    label: 'أوامر دراية',
  },
  {
    title: 'مفهوم الأوبشن الأمريكي',
    url: 'https://www.youtube.com/embed/MjPDWqQHn-U?si=26JFH6hQJPfiRLLJ',
    label: 'مفهوم الأوبشن الأمريكي',
  },
  {
    title: 'شرح صفقات تطبيق Webull',
    url: 'https://www.youtube.com/embed/nYDU9gTBcJo?si=TwiQhUdgC2vhx7sY',
    label: 'صفقات Webull',
  },
];

const HomePage = () => {
  return (
    <div className="relative isolate pb-28 pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[-20%] h-80 w-80 rounded-full bg-orange-500/20 blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[12%] h-[360px] w-[360px] rounded-full bg-rose-500/18 blur-[190px]" />
      </div>

      <section className="page-shell grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="space-y-6 text-right">
          <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
            دليلك إلى الأوبشن
          </span>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            دليلك إلى الأوبشن الأمريكي بإدارة مخاطر محسوبة
          </h1>
          <p className="section-subheading max-w-xl">
            استكشف كيفية تداول الأوبشن الأمريكي، من المفاهيم الأساسية إلى الاستراتيجيات المتقدمة، مع تسليط الضوء على أهم المخاطر وكيفية إدارتها لتحقيق أكبر استفادة من استثمارك.
          </p>
        </div>
        <div className="relative order-first h-72 w-full overflow-hidden rounded-3xl border border-white/10 bg-black/60 lg:order-last">
          <Image src="/img/trading.webp" alt="التداول بالأوبشن" fill className="object-cover" priority />
        </div>
      </section>

      <section className="page-shell mt-16">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">ما هو الأوبشن؟</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            الأوبشن هو عقد مالي مشتق يمنح المشتري الحق، وليس الالتزام، في شراء أو بيع أصل معين بسعر محدد خلال فترة زمنية معينة. ينقسم إلى نوعين رئيسيين:
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {conceptBullets.map(({ title, description }) => (
              <div key={title} className="gradient-card h-full p-6 text-right">
                <h3 className="text-lg font-bold text-orange-300">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-200">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <h2 className="section-heading text-center">أمثلة واقعية على الربح والخسارة</h2>
        <p className="section-subheading mx-auto max-w-3xl text-center">
          أمثلة عملية توضّح كيفية تغير قيمة العقود حسب حركة الأصل الأساسي وقيمة القسط المدفوع.
        </p>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {profitExamples.map(({ title, details, outcomes }) => (
            <div key={title} className="gradient-card h-full p-8 text-right">
              <h3 className="text-xl font-bold text-orange-300">{title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="card-divider my-6" />
              <ul className="space-y-3 text-sm leading-7 text-gray-200">
                {outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">فوائد التداول بعقود الأوبشن</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {advantages.map((item) => (
              <div key={item} className="gradient-card h-full p-6 text-sm leading-7 text-gray-200">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel overflow-hidden px-0 pb-6 pt-8 sm:px-8">
          <h2 className="section-heading text-center">مقارنة بين الأوبشن والأسهم</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            معرفة الفروقات الأساسية تساعدك على تحديد الأداة الأنسب لأهدافك الاستثمارية.
          </p>
          <div className="mt-8 overflow-x-auto px-2">
            <table className="min-w-full divide-y divide-white/10 text-sm text-gray-100">
              <thead>
                <tr className="bg-white/5 text-xs uppercase tracking-widest text-orange-200">
                  <th className="whitespace-nowrap px-4 py-3 text-right">الميزة</th>
                  <th className="whitespace-nowrap px-4 py-3 text-right">الأوبشن</th>
                  <th className="whitespace-nowrap px-4 py-3 text-right">الأسهم</th>
                </tr>
              </thead>
              <tbody className="bg-black/60">
                {comparisonRows.map(({ feature, option, stocks }) => (
                  <tr key={feature} className="border-b border-white/5">
                    <td className="whitespace-nowrap px-4 py-3 font-semibold text-orange-200">{feature}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-200">{option}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-gray-200">{stocks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">مخاطر يجب الانتباه لها</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {risks.map((risk) => (
              <div key={risk} className="gradient-card h-full p-6 text-sm leading-7 text-gray-200">
                {risk}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <div className="relative mb-8 h-48 overflow-hidden rounded-3xl border border-white/10 bg-black/60 sm:h-56">
            <Image src="/img/tik.webp" alt="لوحة متابعة صفقات الأوبشن" fill loading="lazy" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-orange-100 backdrop-blur">
              تنظيم الاستراتيجيات
            </div>
          </div>
          <h2 className="section-heading text-center">استراتيجيات تداول الأوبشن</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {strategies.map(({ title, description }) => (
              <div key={title} className="gradient-card h-full p-6 text-right">
                <h3 className="text-lg font-bold text-orange-300">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-200">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="glass-panel h-full px-6 py-10 sm:px-10">
            <h2 className="text-2xl font-bold text-white">كيفية تحقيق الربح من العقود</h2>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              يعتمد نجاحك على قراءة حركة السعر المتوقعة ومراقبة القسط المدفوع، إلى جانب اختيار الاستراتيجية التي تتماشى مع خطتك لإدارة المخاطر.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-gray-200">
              {profitTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
          <div className="glass-panel h-full px-6 py-10 sm:px-10">
            <h2 className="text-2xl font-bold text-white">اختيار Strike Price المناسب</h2>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              اختيار السعر المستهدف يعتمد على توقعاتك لحركة الأصل والزمن المتبقي حتى انتهاء العقد، بالإضافة إلى نسبة المخاطرة التي تفضّلها.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-7 text-gray-200">
              {strikeGuidelines.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">حاسبة دلتا الأوبشن</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            استخدم الحاسبة لتقدير السعر المستهدف للعقد بالاعتماد على حركة السهم والدلتا الحالية.
          </p>
          <div className="mt-10 rounded-3xl border border-white/10 bg-black/70 p-6">
            <OptionDeltaCalculator />
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">منصات معتمدة في السعودية</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {platforms.map(({ name, description }) => (
              <div key={name} className="gradient-card h-full p-6 text-right">
                <h3 className="text-lg font-bold text-orange-300">{name}</h3>
                <p className="mt-3 text-sm leading-7 text-gray-200">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-20">
        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="section-heading text-center">شروحات بالفيديو للمبتدئين</h2>
          <p className="section-subheading mx-auto max-w-3xl text-center">
            شاهد قائمة الفيديوهات المختارة لتتبع خطوات الإعداد والتداول من البداية وحتى التطبيق العملي.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {tutorials.map(({ title, url, label }) => (
              <div key={title} className="gradient-card overflow-hidden p-3">
                <div className="relative w-full pt-[56.25%]">
                  <iframe
                    className="absolute inset-0 h-full w-full rounded-2xl"
                    src={url}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-5 text-right">
                  <h3 className="text-lg font-bold text-orange-300">{title}</h3>
                  <p className="mt-2 text-sm text-gray-200">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
