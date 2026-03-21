import Image from 'next/image';

const sections = [
  {
    title: 'المعلومات التي نجمعها',
    content:
      'نجمع معلومات التعريف الأساسية مثل الاسم والبريد الإلكتروني وبيانات التواصل عندما تقوم بتعبئتها طوعاً أثناء التسجيل أو الاشتراك في خدماتنا.',
  },
  {
    title: 'كيفية استخدام المعلومات',
    content:
      'نستخدم بياناتك لتقديم الخدمات، تحسين تجربة المستخدم، إرسال التحديثات والعروض، والرد على طلبات الدعم والاستفسارات.',
  },
  {
    title: 'مشاركة البيانات',
    content:
      'لا نبيع أو نؤجر بياناتك الشخصية لأي طرف خارجي. قد تتم مشاركة المعلومات مع مزودي خدمات موثوقين بهدف تشغيل الموقع وتحسينه.',
  },
  {
    title: 'أمان المعلومات',
    content:
      'نطبّق تدابير أمنية تقنية وإدارية لحماية بياناتك من الوصول أو التعديل أو الكشف غير المصرح به.',
  },
  {
    title: 'تحديثات سياسة الخصوصية',
    content:
      'قد نقوم بتحديث هذه السياسة عند الحاجة. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ آخر تحديث.',
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="relative isolate pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[18%] top-[-20%] h-80 w-80 rounded-full bg-orange-500/18 blur-[160px]" />
        <div className="absolute bottom-[-25%] right-[12%] h-[380px] w-[380px] rounded-full bg-rose-500/18 blur-[190px]" />
      </div>

      <section className="page-shell text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
          سياسة الخصوصية
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">حماية بياناتك أولوية قصوى</h1>
        <p className="section-subheading mx-auto max-w-3xl">
          في Ezzo نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية وفق أفضل الممارسات والمعايير الأمنية.
        </p>
      </section>

      <section className="page-shell mt-16">
        <div className="glass-panel overflow-hidden px-6 py-10 sm:px-10">
          <div className="relative mb-10 h-48 overflow-hidden rounded-3xl border border-white/10 bg-black/60 sm:h-56">
            <Image
              src="/img/trust.webp"
              alt="التزام Ezzo بحماية البيانات"
              fill
              loading="lazy"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
            <div className="absolute bottom-4 right-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-semibold text-orange-100 backdrop-blur">
              التزام بالخصوصية
            </div>
          </div>
          <div className="space-y-10 text-right">
            {sections.map(({ title, content }) => (
              <div key={title}>
                <h2 className="text-2xl font-bold text-orange-300">{title}</h2>
                <p className="mt-3 text-sm leading-7 text-gray-300">{content}</p>
              </div>
            ))}
          </div>
          <p className="mt-12 text-center text-xs text-gray-400">
            لطرح أي استفسارات حول سياسة الخصوصية يمكنك التواصل عبر البريد: 3zzoezzo@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
