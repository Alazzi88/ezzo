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
      'استفد من استراتيجيات Ezzo اللحظية ولوحات المتابعة لمزامنة قراراتك مع الاتجاهات الرئيسية في السوق.',
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

const comparisonHeaders = ['الميزة', 'الفيوتشر', 'الأسهم', 'الفوركس'];

const comparisonRows = [
  {
    feature: 'الرافعة المالية',
    futures: 'حتى 1:100 (حسب العقد)',
    stocks: '1:2 غالباً',
    forex: 'حتى 1:500',
  },
  {
    feature: 'السيولة',
    futures: 'مرتفعة جداً',
    stocks: 'مرتفعة',
    forex: 'مرتفعة جداً',
  },
  {
    feature: 'التكلفة / العمولات',
    futures: 'منخفضة (عمولة ثابتة أو متغيرة)',
    stocks: 'عمولة أو سبريد',
    forex: 'سبريد فقط غالباً',
  },
  {
    feature: 'رأس المال الأدنى',
    futures: 'من 500$ إلى 5000$ (حسب الوسيط)',
    stocks: 'من 100$ إلى آلاف الدولارات',
    forex: 'من 10$ إلى 100$ غالباً',
  },
  {
    feature: 'إمكانية البيع على المكشوف',
    futures: 'نعم',
    stocks: 'أحياناً',
    forex: 'نعم',
  },
  {
    feature: 'الأرباح المحتملة',
    futures: 'مرتفعة جداً مع المخاطرة',
    stocks: 'متوسطة إلى مرتفعة',
    forex: 'متوسطة إلى مرتفعة',
  },
  {
    feature: 'الخسارة المحتملة',
    futures: 'قد تتجاوز رأس المال في بعض الحالات',
    stocks: 'محدودة برأس المال',
    forex: 'قد تتجاوز رأس المال (رافعة عالية)',
  },
  {
    feature: 'المخاطرة',
    futures: 'مرتفعة جداً',
    stocks: 'متوسطة',
    forex: 'مرتفعة جداً',
  },
  {
    feature: 'ساعات التداول',
    futures: '23 ساعة تقريباً',
    stocks: '7 - 8 ساعات',
    forex: '24 ساعة',
  },
  {
    feature: 'التعقيد',
    futures: 'متوسط إلى مرتفع',
    stocks: 'منخفض',
    forex: 'متوسط',
  },
];

type FundedCompany = {
  name: string;
  description: string;
  highlight?: string;
  logo: string;
  url: string;
  generalRules: string[];
  plans: {
    name: string;
    metrics: { label: string; value: string }[];
    priceNote?: string;
  }[];
  extraNotes?: string[];
  consistencyRequirement?: string;
};

const fundedCompanies: FundedCompany[] = [
  {
    name: 'Topstep',
    description: 'برنامج Trading Combine الخاص بـ Topstep تم تجربته لدينا لحسابات الفيوتشر ويتميز بخدمة دعم ممتازة وسحب أرباح سلس.',
    highlight: 'تم اختبارها بنجاح',
    logo: '/img/topstep.webp',
    url: 'https://www.topstep.com/',
    consistencyRequirement: '50%',
    generalRules: [
      'التقييم Trading Combine® يعتمد على تحقيق هدف الربح مع الالتزام بالحد الأقصى للخسارة المتحركة لكل خطة شراء (Buying Power).',
      'يجب التداول في خمسة أيام على الأقل قبل الترقية، مع الالتزام بعدد العقود القصوى المحددة لكل حساب.',
      'الحد الأقصى للخسارة يمثل Trailing Drawdown يبدأ من الرصيد الابتدائي ويُراقب مع كل قمة جديدة.',
      'الاشتراك شهري ويمكن إعادة ضبط الحساب بنفس قيمة الاشتراك عند الحاجة مع استمرار الوصول للمنصة والدعم.',
    ],
    plans: [
      {
        name: '50K Buying Power',
        metrics: [
          { label: 'هدف الربح', value: '$3,000' },
          { label: 'الحد الأقصى للخسارة', value: '$2,000 Trailing' },
          { label: 'الحد الأقصى للعقود', value: '5 عقود' },
          { label: 'الاشتراك الشهري', value: '$49' },
        ],
        priceNote: 'إعادة ضبط الحساب متاحة مقابل 49$.',
      },
      {
        name: '100K Buying Power',
        metrics: [
          { label: 'هدف الربح', value: '$6,000' },
          { label: 'الحد الأقصى للخسارة', value: '$3,000 Trailing' },
          { label: 'الحد الأقصى للعقود', value: '10 عقود' },
          { label: 'الاشتراك الشهري', value: '$99' },
        ],
        priceNote: 'إعادة الضبط بنفس قيمة الاشتراك 99$.',
      },
      {
        name: '150K Buying Power',
        metrics: [
          { label: 'هدف الربح', value: '$9,000' },
          { label: 'الحد الأقصى للخسارة', value: '$4,500 Trailing' },
          { label: 'الحد الأقصى للعقود', value: '15 عقداً' },
          { label: 'الاشتراك الشهري', value: '$149' },
        ],
        priceNote: 'إعادة الضبط مقابل 149$ مع نفس مزايا الاشتراك.',
      },
    ],
    extraNotes: [
      'بعد الترقية إلى الحساب الممول، يحصل المتداول على سحوبات أولية حتى 50% ثم ترتفع نسبة حصة الأرباح إلى 80%-90% مع الاستمرارية.',
    ],
  },
  {
    name: 'Earn2Trade',
    description:
      'برنامج المسار الوظيفي للمتداول® (Trader Career Path) من Earn2Trade يقدم مساراً واضحاً للانتقال من تقييم صغير إلى حساب ممول يصل إلى 400K مع قواعد مخاطرة ثابتة.',
    highlight: 'تم اختبارها بنجاح',
    logo: '/img/earn2trade.webp',
    url: 'https://www.earn2trade.com/?a_pid=ezzo',
    consistencyRequirement: '30%',
    generalRules: [
      'التداول لمدة 10 أيام على الأقل.',
      'الالتزام بـ سلم العقود (Progression Ladder).',
      'التداول فقط خلال الأوقات المعتمدة.',
      'تجنب الأخبار عالية التأثير التي يُمنع التداول أثناءها.',
      'لا توجد رسوم إعداد مسبقة.',
      'إعادة تعيين مجانية عند دفع الاشتراك الشهري.',
      'معدل التراجع نهاية اليوم يتحرك مع كل قمة ربحية حتى يصل للحد الثابت في الحسابات الحية.',
    ],
    plans: [
      {
        name: 'حساب TCP25',
        metrics: [
          { label: 'هدف الربح', value: '$1,750' },
          { label: 'الحد المتراجع الأدنى', value: '$1,500' },
          { label: 'الخسارة اليومية القصوى', value: '$550' },
          { label: 'الحد الأقصى للعقود', value: '3 عقود (Mini أو ما يعادلها)' },
        ],
        priceNote: 'اشتراك شهري 60$ بعد الخصم (بدلاً من 159$).',
      },
      {
        name: 'حساب TCP50',
        metrics: [
          { label: 'هدف الربح', value: '$3,000' },
          { label: 'الحد المتراجع الأدنى', value: '$2,000' },
          { label: 'الخسارة اليومية القصوى', value: '$1,100' },
          { label: 'الحد الأقصى للعقود', value: '6 عقود' },
        ],
        priceNote: 'اشتراك شهري 76$ ويوفر بيانات السوق ومنصة NinjaTrader أو Finamark.',
      },
      {
        name: 'حساب TCP100',
        metrics: [
          { label: 'هدف الربح', value: '$6,000' },
          { label: 'الحد المتراجع الأدنى', value: '$3,500' },
          { label: 'الخسارة اليومية القصوى', value: '$2,200' },
          { label: 'الحد الأقصى للعقود', value: '12 عقداً' },
        ],
        priceNote: 'اشتراك شهري 140$ مع إعادة تفعيل مجانية عند التجديد.',
      },
    ],
    extraNotes: [
      'بعد النجاح تنتقل إلى حساب LiveSim أو Live بقيمة 100K، ثم ترقيات إلى 150K و200K وصولاً إلى 400K، بحصة أرباح تبدأ من 80% وترتفع مع الأداء وحد تراجع ثابت عند 388,000$.',
    ],
  },
  {
    name: 'FundedNext',
    description: 'النسخة الخاصة بالفيوتشر من FundedNext تمنحك حرية تداول واسعة مع بنية رسوم منخفضة وتمت تجربتها في أكثر من حساب.',
    highlight: 'تم اختبارها بنجاح',
    logo: '/img/fundednext.webp',
    url: 'https://fundednext.com/',
    consistencyRequirement: '40%',
    generalRules: [
      'تحدي Rapid Challenge بفترة تقييم واحدة ويمكن اجتيازه في يوم واحد، مع أول مكافأة خلال 3 أيام.',
      'لا يوجد حد خسارة يومي منفصل؛ يتم الاعتماد على حد الخسارة الإجمالي بناءً على رصيد نهاية اليوم.',
      'لا توجد رسوم تفعيل أو حد أدنى لأيام التداول، وقاعدة الاتساق 40% تطبق بعد التمويل.',
      'يمكن إعادة التعيين برسوم مخفضة، والتداول أثناء الأخبار مسموح مع الالتزام بإدارة المخاطر.',
    ],
    plans: [
      {
        name: 'خطة 25K',
        metrics: [
          { label: 'هدف الربح', value: '$1,500 (6%)' },
          { label: 'حد الخسارة الإجمالي', value: '$1,250 (5%)' },
          { label: 'حد الخسارة اليومي', value: 'غير مطبق (X)' },
          { label: 'الحد الأقصى للمراكز', value: '2 Mini أو 10 Micro' },
        ],
        priceNote: 'رسوم لمرة واحدة 99.99$ مع خصم 12% لإعادة التعيين.',
      },
      {
        name: 'خطة 50K',
        metrics: [
          { label: 'هدف الربح', value: '$3,000 (6%)' },
          { label: 'حد الخسارة الإجمالي', value: '$2,000 (4%)' },
          { label: 'حد الخسارة اليومي', value: 'غير مطبق' },
          { label: 'الحد الأقصى للمراكز', value: '3 Mini أو 15 Micro' },
        ],
        priceNote: 'رسوم لمرة واحدة 149.99$، وأول مكافأة تدفع خلال 3 أيام بعد الاجتياز.',
      },
      {
        name: 'خطة 100K',
        metrics: [
          { label: 'هدف الربح', value: '$5,000 (5%)' },
          { label: 'حد الخسارة الإجمالي', value: '$2,500 (2.5%)' },
          { label: 'حد الخسارة اليومي', value: 'غير مطبق' },
          { label: 'الحد الأقصى للمراكز', value: '5 Mini أو 25 Micro' },
        ],
        priceNote: 'رسوم لمرة واحدة 249.99$، ومع التمويل يرتفع الحد إلى 7 Mini / 35 Micro.',
      },
    ],
    extraNotes: [
      'قاعدة الاتساق 40% تفترض أن أعلى يوم ربح لا يتجاوز 40% من إجمالي الأرباح قبل السحب.',
      'إمكانية التحويل إلى حساب حقيقي بعد أولين سحوبات ناجحة ومتسقة.',
    ],
  },
  {
    name: 'E8 Markets',
    description: 'اختبار E8 Markets قدم لنا سرعة في الترقية ومرونة في أحجام العقود، وهو خيار قوي لتسريع الوصول لحسابات ممولة كبيرة.',
    highlight: 'تم اختبارها بنجاح',
    logo: '/img/e8.webp',
    url: 'https://e8markets.com/',
    consistencyRequirement: '40%',
    generalRules: [
      'تقييم E8 Signature بمرحلة واحدة، متاح بأحجام 50K و100K و150K مع رسوم تفعيل ثابتة لكل حجم.',
      'هدف الربح ثابت عند 6% من الرصيد وحد التراجع بنهاية اليوم (EOD Drawdown) عند 4%.',
      'التداول أثناء الأخبار مسموح، بينما يمنع الاحتفاظ الليلي أو عبر عطلة نهاية الأسبوع إضافة إلى منع الإكسبرتات الآلية.',
      'بعد اجتياز التقييم تنتقل مباشرة إلى حساب E8 Trader مع سحوبات أسبوعية تصل إلى 80% من الأرباح.',
    ],
    plans: [
      {
        name: 'E8 Signature 50K',
        metrics: [
          { label: 'هدف الربح', value: '6% ($3,000)' },
          { label: 'EOD Drawdown', value: '4% ($2,000)' },
          { label: 'رسوم التفعيل', value: '$88 لمرة واحدة' },
          { label: 'الاحتفاظ الليلي/عطلة', value: 'غير مسموح' },
        ],
        priceNote: 'برنامج مرحلة واحدة مع إمكانية التمديد المجاني حال الحفاظ على نشاط التداول.',
      },
      {
        name: 'E8 Signature 100K',
        metrics: [
          { label: 'هدف الربح', value: '6% ($6,000)' },
          { label: 'EOD Drawdown', value: '4% ($4,000)' },
          { label: 'رسوم التفعيل', value: '$149 لمرة واحدة' },
          { label: 'مسموحية الأخبار / الليل', value: 'الأخبار مسموح، الليل/العطلة غير مسموح' },
        ],
        priceNote: 'الخطة القياسية وتشمل نفس بنود منع الاحتفاظ الليلي والإكسبرتات.',
      },
      {
        name: 'E8 Signature 150K',
        metrics: [
          { label: 'هدف الربح', value: '6% ($9,000)' },
          { label: 'EOD Drawdown', value: '4% ($6,000)' },
          { label: 'رسوم التفعيل', value: '$198 لمرة واحدة' },
          { label: 'الحد الأقصى للعقود', value: 'يُوصى بعدم تجاوز السقف المقترح من الدعم' },
        ],
        priceNote: 'الخطة الاحترافية لمن يرغب في حجم أكبر مع نفس القواعد الصارمة للوقت والأخبار.',
      },
    ],
    extraNotes: [
      'يوصى بإغلاق المراكز قبل الأخبار عالية التقلب حتى مع السماح بالتداول أثناءها.',
    ],
  },
];

const FundedCompanyCard = ({
  name,
  description,
  highlight,
  logo,
  url,
  generalRules,
  plans,
  extraNotes,
  consistencyRequirement,
}: FundedCompany) => {
  return (
    <div className="gradient-card h-full rounded-3xl border border-white/10 bg-black/60 p-6 text-right shadow-[0_22px_55px_-30px_rgba(251,146,60,0.75)]">
      {highlight && (
        <span className="inline-flex items-center justify-center rounded-full border border-orange-400/30 bg-orange-500/15 px-3 py-1 text-[11px] font-semibold text-orange-100">
          {highlight}
        </span>
      )}
      {consistencyRequirement && (
        <span className="mt-3 inline-flex items-center justify-center rounded-full border border-orange-400/20 bg-orange-500/10 px-3 py-1 text-[11px] font-semibold text-orange-200">
          قاعدة الاتساق: {consistencyRequirement}
        </span>
      )}
      <div className="mt-4 flex flex-col gap-3">
        <div className="flex h-20 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5 bg-gradient-to-r from-orange-500/12 via-rose-500/12 to-amber-400/12 p-5 shadow-[0_18px_45px_-28px_rgba(251,146,60,0.55)]">
          <Image
            src={logo}
            alt={`شعار ${name}`}
            width={220}
            height={90}
            className="h-full w-auto max-w-[85%] object-contain drop-shadow-[0_6px_22px_rgba(0,0,0,0.4)]"
          />
        </div>
        <h3 className="text-xl font-bold text-white">{name}</h3>
      </div>
      <p className="mt-2 text-sm leading-7 text-gray-300">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-gray-200">
        {generalRules.map((rule, idx) => (
          <li key={`${name}-rule-${idx}`} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-300" />
            <span className="leading-6">{rule}</span>
          </li>
        ))}
      </ul>
      <div className="mt-5 space-y-4">
        {plans.map((plan) => (
          <div key={`${name}-${plan.name}`} className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-base font-semibold text-white">{plan.name}</h4>
              {plan.priceNote && <span className="text-xs text-orange-200">{plan.priceNote}</span>}
            </div>
            <dl className="mt-3 space-y-2 text-xs sm:text-sm text-gray-200">
              {plan.metrics.map((metric) => (
                <div key={`${plan.name}-${metric.label}`} className="flex items-center justify-between gap-3 border-b border-white/5 pb-1">
                  <dt className="text-gray-300">{metric.label}</dt>
                  <dd className="font-semibold text-orange-100">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
      {extraNotes && (
        <ul className="mt-4 space-y-2 text-xs text-gray-400">
          {extraNotes.map((note, idx) => (
            <li key={`${name}-note-${idx}`} className="flex items-start gap-2">
              <span className="mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-200/70" />
              <span className="leading-6">{note}</span>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-6">
        <Link
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-orange-400/30 px-4 py-2 text-sm font-semibold text-orange-200 transition-colors duration-300 hover:border-orange-300 hover:text-orange-100"
        >
          الموقع الرسمي ↗
        </Link>
      </div>
    </div>
  );
};

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
        <div className="glass-panel px-6 py-10 sm:px-12">
          <div className="text-center">
            <h2 className="section-heading">شركات الفيوتشر الموثوقة للحسابات الممولة</h2>
            <p className="section-subheading mx-auto max-w-4xl">
              هذه الشركات خضعت لاختبارات شخصية من فريق Ezzo بهدف التعلم وتوثيق شروط التقييم، وليست توصية باختيار شركة بعينها بل عرضاً تفصيلياً لمتطلبات كل برنامج.
            </p>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {fundedCompanies.map((company) => (
              <FundedCompanyCard key={company.name} {...company} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell mt-12">
        <div className="glass-panel px-6 py-10 sm:px-12">
          <h3 className="section-heading text-center">فهم القواعد الرئيسية في اختبارات الحسابات الممولة</h3>
          <p className="section-subheading mx-auto max-w-4xl text-center">
            هذه التفسيرات تساعدك على قراءة شروط كل شركة بصورة دقيقة قبل بدء الاختبار، مع إبراز نسب قاعدة الاتساق لكل برنامج قمنا بتجربته.
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-right">
              <h4 className="text-lg font-semibold text-white">قاعدة الاتساق (Consistency Rule)</h4>
              <p className="mt-3 text-sm leading-7 text-gray-200">
                تُلزمك هذه القاعدة بألا يتجاوز أفضل يوم ربح حصة محددة من إجمالي أرباحك خلال التقييم. الهدف منها التأكد من أن ربحك ناتج عن أداء ثابت وليس صفقة واحدة ضخمة.
              </p>
              <p className="mt-3 text-xs text-orange-200">
                عند تجاوز النسبة المسموح بها قد تحتاج لإكمال أيام إضافية أو إعادة الاختبار حسب سياسة الشركة.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-right">
              <h4 className="text-lg font-semibold text-white">التريلينج درو داون (Trailing Drawdown)</h4>
              <p className="mt-3 text-sm leading-7 text-gray-200">
                هو حد خسارة متحرك يرتفع مع كل قمة يحققها رصيدك، لكنه لا ينخفض عند التراجع. إذا هبط رصيدك تحت هذا الحد يتم إيقاف التقييم فوراً.
              </p>
              <p className="mt-3 text-xs text-orange-200">
                بعض الشركات توقف حساب الحد عند الوصول إلى الرصيد الابتدائي، بينما أخرى تبقيه متحركاً حتى اكتمال المرحلة.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 text-right">
              <h4 className="text-lg font-semibold text-white">حد الخسارة اليومي والنهائي</h4>
              <p className="mt-3 text-sm leading-7 text-gray-200">
                الحد اليومي Daily Loss يراقب خسائرك المفتوحة والمغلقة خلال اليوم نفسه، بينما الحد النهائي أو الإجمالي يحدد أكبر خسارة مسموحة طوال الاختبار. كسر أي منهما يعني فشل التقييم.
              </p>
              <p className="mt-3 text-xs text-orange-200">
                بعض البرامج مثل FundedNext لا تعتمد حد خسارة يومي منفصل وتكتفي بالحد الإجمالي بنهاية اليوم.
              </p>
            </div>
          </div>
          <p className="mt-10 text-sm text-gray-300 text-right">
            عند اجتياز أي تقييم يُنصح بالرجوع إلى الموقع الرسمي للشركة للتعرف على أحدث سياسات السحب وتحديثاتها قبل طلب الأرباح.
          </p>
        </div>
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FuturesAndFundedAccounts;
