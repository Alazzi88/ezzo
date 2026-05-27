'use client';

import { useForm, ValidationError } from '@formspree/react';
import { FadeIn, ScaleIn } from '@/components/animations/MotionComponents';

const contactDetails = [
  { label: 'البريد الإلكتروني', value: '3zzoezzo@gmail.com', href: 'mailto:3zzoezzo@gmail.com', icon: '✉️' },
  { label: 'واتساب الدعم', value: '+966503405496', href: 'https://wa.me/966503405496', icon: '💬' },
  { label: 'ساعات العمل', value: 'من 9 صباحاً حتى 5 مساءً (بتوقيت السعودية)', icon: '⏰' },
];

export default function SupportPage() {
  const [state, handleSubmit] = useForm('mleyqqlg');

  if (state.succeeded) {
    return (
      <div className="page-shell flex min-h-[70vh] items-center justify-center pt-32">
        <ScaleIn>
          <div className="glass-panel max-w-2xl px-8 py-16 text-center shadow-[0_20px_50px_rgba(249,115,22,0.1)] border-orange-500/20">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-3xl mx-auto mb-6">
              ✓
            </div>
            <h1 className="text-3xl font-black text-white sm:text-4xl">شكراً لتواصلك معنا!</h1>
            <p className="mt-4 text-base leading-7 text-gray-300 sm:text-lg">
              تم استلام رسالتك بنجاح وسنقوم بالرد عليك في أقرب وقت ممكن. نقدر ثقتك بفريق Ezzo.
            </p>
          </div>
        </ScaleIn>
      </div>
    );
  }

  return (
    <div className="relative isolate pb-24 pt-12">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[20%] top-[-10%] h-96 w-96 rounded-full bg-orange-500/15 blur-[150px]" />
        <div className="absolute bottom-[-10%] right-[15%] h-[360px] w-[360px] rounded-full bg-rose-400/10 blur-[150px]" />
      </div>

      <section className="page-shell text-center">
        <FadeIn direction="up">
          <span className="inline-flex items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-300">
            دعم فني متكامل
          </span>
          <h1 className="mt-6 text-4xl font-extrabold text-white sm:text-5xl">يسعدنا مساعدتك في أي وقت</h1>
          <p className="section-subheading mx-auto max-w-3xl text-gray-400 mt-4 leading-8">
            أرسل لنا تفاصيل طلبك أو استفسارك وسيقوم فريق Ezzo بالرد عليك خلال ساعات العمل الرسمية.
          </p>
        </FadeIn>
      </section>

      <section className="page-shell mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Contact Form */}
        <FadeIn direction="right">
          <form onSubmit={handleSubmit} className="glass-panel px-6 py-10 sm:px-10 h-full">
            <h2 className="text-2xl font-black text-white">أرسل رسالة مباشرة</h2>
            <p className="mt-2 text-sm leading-7 text-gray-400">
              يرجى تزويدنا بأكبر قدر ممكن من التفاصيل لنتمكن من خدمتك بالشكل الأمثل.
            </p>

            <div className="mt-8 space-y-6">
              <div className="text-right">
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-orange-400">
                  الاسم الكامل
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-orange-500/40 focus:bg-black/60 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 text-right"
                  dir="rtl"
                />
                <ValidationError prefix="الاسم" field="name" errors={state.errors} className="mt-2 text-sm text-rose-400" />
              </div>

              <div className="text-right">
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-orange-400">
                  البريد الإلكتروني
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-orange-500/40 focus:bg-black/60 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 text-right"
                  dir="rtl"
                />
                <ValidationError prefix="البريد الإلكتروني" field="email" errors={state.errors} className="mt-2 text-sm text-rose-400" />
              </div>

              <div className="text-right">
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-orange-400">
                  الرسالة
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3.5 text-sm text-white placeholder:text-gray-600 focus:border-orange-500/40 focus:bg-black/60 focus:outline-none focus:ring-4 focus:ring-orange-500/10 transition-all duration-300 text-right"
                  dir="rtl"
                />
                <ValidationError prefix="الرسالة" field="message" errors={state.errors} className="mt-2 text-sm text-rose-400" />
              </div>

              <button
                type="submit"
                disabled={state.submitting}
                className="w-full rounded-full bg-gradient-to-r from-orange-500 via-orange-400 to-amber-300 px-6 py-3.5 font-bold text-black shadow-[0_15px_40px_-15px_rgba(249,115,22,0.8)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-15px_rgba(249,115,22,0.9)] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {state.submitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
              </button>
            </div>
          </form>
        </FadeIn>

        {/* Additional Contact Methods */}
        <FadeIn direction="left">
          <div className="glass-panel px-6 py-10 sm:px-10 h-full flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">طرق تواصل إضافية</h2>
              <p className="mt-2 text-sm leading-7 text-gray-400">
                يمكنك الوصول إلينا عبر القنوات التالية خلال ساعات العمل الرسمية.
              </p>
              
              <div className="mt-8 space-y-4">
                {contactDetails.map(({ label, value, href, icon }) => (
                  <div key={label} className="relative overflow-hidden rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5 transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.04]">
                    <div className="flex items-start gap-4 flex-row-reverse text-right">
                      {/* Contact Channel Icon */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-lg flex-shrink-0">
                        {icon}
                      </div>
                      {/* Info details */}
                      <div className="flex-1 space-y-1">
                        <span className="block text-xs font-bold uppercase tracking-wider text-orange-400">
                          {label}
                        </span>
                        {href ? (
                          <a href={href} className="text-base font-black text-white hover:text-orange-300 transition-colors">
                            {value}
                          </a>
                        ) : (
                          <span className="text-sm font-semibold text-gray-300 leading-normal block">{value}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.05] text-right">
              <p className="text-xs text-gray-500 leading-relaxed">
                ⚠️ يرجى التأكد من كتابة بريدك الإلكتروني أو رقم الهاتف الصحيح لنتمكن من الرد عليك في أسرع وقت.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
