'use client';

import { useForm, ValidationError } from '@formspree/react';

const contactDetails = [
  { label: 'البريد الإلكتروني', value: '3zzoezzo@gmail.com', href: 'mailto:3zzoezzo@gmail.com' },
  { label: 'واتساب الدعم', value: '+966503405496', href: 'https://wa.me/966503405496' },
  { label: 'ساعات العمل', value: 'من 9 صباحاً حتى 5 مساءً (بتوقيت السعودية)' },
];

export default function SupportPage() {
  const [state, handleSubmit] = useForm('mleyqqlg');

  if (state.succeeded) {
    return (
      <div className="page-shell flex min-h-[70vh] items-center justify-center pt-32">
        <div className="glass-panel max-w-2xl px-8 py-16 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">شكراً لتواصلك معنا!</h1>
          <p className="mt-4 text-base leading-7 text-gray-300 sm:text-lg">
            تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن. نقدر ثقتك بفريق Ezzo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative isolate pb-24 pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[20%] top-[-20%] h-80 w-80 rounded-full bg-orange-500/20 blur-[170px]" />
        <div className="absolute bottom-[-25%] right-[15%] h-[360px] w-[360px] rounded-full bg-rose-400/20 blur-[180px]" />
      </div>

      <section className="page-shell text-center">
        <span className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[4px] text-orange-100">
          دعم فني متكامل
        </span>
        <h1 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">يسعدنا مساعدتك في أي وقت</h1>
        <p className="section-subheading mx-auto max-w-3xl">
          أرسل لنا تفاصيل طلبك أو استفسارك وسيقوم فريق Ezzo بالرد عليك خلال ساعات العمل الرسمية.
        </p>
      </section>

      <section className="page-shell mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-bold text-white">أرسل رسالة مباشرة</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            يرجى تزويدنا بأكبر قدر ممكن من التفاصيل لنتمكن من خدمتك بالشكل الأمثل.
          </p>

          <div className="mt-8 space-y-6">
            <div className="text-right">
              <label htmlFor="name" className="block text-sm font-semibold text-orange-200">
                الاسم الكامل
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
              <ValidationError prefix="الاسم" field="name" errors={state.errors} className="mt-2 text-sm text-rose-400" />
            </div>

            <div className="text-right">
              <label htmlFor="email" className="block text-sm font-semibold text-orange-200">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
              <ValidationError prefix="البريد الإلكتروني" field="email" errors={state.errors} className="mt-2 text-sm text-rose-400" />
            </div>

            <div className="text-right">
              <label htmlFor="message" className="block text-sm font-semibold text-orange-200">
                الرسالة
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/60 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500/40"
              />
              <ValidationError prefix="الرسالة" field="message" errors={state.errors} className="mt-2 text-sm text-rose-400" />
            </div>

            <button
              type="submit"
              disabled={state.submitting}
              className="w-full rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-6 py-3 text-sm font-semibold text-black shadow-[0_25px_55px_-25px_rgba(251,146,60,0.95)] transition-transform duration-300 hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {state.submitting ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}
            </button>
          </div>
        </form>

        <div className="glass-panel px-6 py-10 sm:px-10">
          <h2 className="text-2xl font-bold text-white">طرق تواصل إضافية</h2>
          <p className="mt-3 text-sm leading-7 text-gray-300">
            يمكنك الوصول إلينا عبر القنوات التالية خلال ساعات العمل الرسمية.
          </p>
          <ul className="mt-8 space-y-4 text-right text-sm text-gray-200">
            {contactDetails.map(({ label, value, href }) => (
              <li key={label}>
                <span className="block text-xs font-semibold uppercase tracking-widest text-orange-300/80">
                  {label}
                </span>
                {href ? (
                  <a href={href} className="text-base text-orange-100 transition-colors hover:text-orange-200">
                    {value}
                  </a>
                ) : (
                  <span className="text-base text-gray-200">{value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
